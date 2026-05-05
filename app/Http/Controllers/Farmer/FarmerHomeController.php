<?php

namespace App\Http\Controllers\Farmer;

use App\Http\Controllers\Controller;
use App\Models\Marketplace\ListingSwine;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ActivityLog;
use App\Models\Expense;
use Carbon\Carbon;
use App\Models\Conversation;
use App\Models\CMS\BlogPost;
use App\Models\CMS\BlogCategory;
use App\Models\Event;
use App\Models\FarmCompliance;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\VeterinaryDiseaseReport;
use App\Models\PDF\LivestockAnimal;
use App\Models\Schedule;
use App\Models\ServiceBooking;

class FarmerHomeController extends Controller
{
    public function index(Request $request)
    { 
        $user = Auth::user();
// OR Option B: Single efficient query
$swineStats = Swine::where('owner_id', $user->id)
    ->selectRaw('
        COUNT(*) as total,
        COUNT(CASE WHEN status = "active" THEN 1 END) as active,
        COUNT(CASE WHEN status = "dead" THEN 1 END) as dead,
        COUNT(CASE WHEN status = "sold" THEN 1 END) as sold
    ')
    ->first();

$totalSwine = $swineStats->total;
$activeSwine = $swineStats->active;
$deadSwine = $swineStats->dead;
$soldSwine = $swineStats->sold; 

        // BOOKING STATS
$totalPendingBookings = ServiceBooking::where('provider_id', $user->id)
    ->where('status', 'pending')
    ->count();

$totalAcceptedBookings = ServiceBooking::where('provider_id', $user->id)
    ->where('status', 'accepted')
    ->count();

$totalCompletedBookings = ServiceBooking::where('provider_id', $user->id)
    ->where('status', 'completed')
    ->count();

$totalCancelledBookings = ServiceBooking::where('provider_id', $user->id)
    ->where('status', 'cancelled')
    ->count();


        // MARKETPLACE
        $totalMarketplaceListings = MarketplaceListing::where('seller_id', $user->id)->count();
        $totalListingSwine = ListingSwine::where('seller_id', $user->id)
            ->where('status', 'available')
            ->count();

        // Get recent marketplace activity
   // In your FarmerHomeController, update the marketplace stats:

// Get total pending transactions (buy requests)
$totalBuyRequests = MarketplaceTransaction::where('seller_id', $user->id)
    ->whereIn('state', ['pending_request', 'seller_review'])
    ->count();

// Get counts by state
$pendingRequestCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'pending_request')
    ->count();

$sellerReviewCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'seller_review')
    ->count();

$sellerApprovedCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'seller_approved')
    ->count();

$buyerConfirmedCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'buyer_confirmed')
    ->count();

$inProgressCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'in_progress')
    ->count();

$completedCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'completed')
    ->count();

$cancelledCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'cancelled')
    ->count();

$expiredCount = MarketplaceTransaction::where('seller_id', $user->id)
    ->where('state', 'expired')
    ->count();

// Get all pending transactions (for display)
$recentMarketplaceActivity = MarketplaceTransaction::where('seller_id', $user->id)
    ->with(['buyer', 'listing'])
    ->whereIn('state', ['pending_request', 'seller_review', 'seller_approved', 'buyer_confirmed', 'in_progress'])
    ->latest('transaction_date')
    ->get() // Remove limit to get all for scrollable area
    ->map(function ($transaction) {
        return [
            'id' => $transaction->id,
            'listing_id' => $transaction->listing_id,
            'buyer_name' => $transaction->buyer->name,
            'amount' => $transaction->amount,
            'quantity' => $transaction->quantity,
            'state' => $transaction->state,
            'created_at' => $transaction->transaction_date ?? $transaction->created_at,
            'type' => 'purchase_request',
            'listing_title' => $transaction->listing->title ?? 'Listing #' . $transaction->listing_id
        ];
    });

        // TOTAL EXPENSES
        $totalExpenses = Expense::where('owner_id', $user->id)->sum('amount');

        // TOTAL REQUESTS
        $totalRequests = ListingSwine::where('seller_id', $user->id)
            ->withCount('requests')
            ->get()
            ->sum('requests_count');

        // INSURANCE STATS - Using correct enum values
        $totalInsuranceApplications = LivestockInsuranceApplication::where('farmer_id', $user->id)->count();
        
        $submittedApplications = LivestockInsuranceApplication::where('farmer_id', $user->id)
            ->where('status', 'submitted')
            ->count();
            
        $reviewedApplications = LivestockInsuranceApplication::where('farmer_id', $user->id)
            ->where('status', 'reviewed')
            ->count();
            
        $completedApplications = LivestockInsuranceApplication::where('farmer_id', $user->id)
            ->where('status', 'completed')
            ->count();
            
        $incompleteApplications = LivestockInsuranceApplication::where('farmer_id', $user->id)
            ->where('status', 'incomp.')
            ->count();

        // VETERINARY REPORT STATS
        // Get all animals owned by the user
        $userAnimals = LivestockAnimal::whereHas('application', function($query) use ($user) {
            $query->where('farmer_id', $user->id);
        })->get();

        $totalAnimalsWithReports = $userAnimals->whereNotNull('veterinary_report_id')->count();
        $totalVeterinaryReports = VeterinaryDiseaseReport::whereIn('id', 
            $userAnimals->pluck('veterinary_report_id')->unique()->filter()
        )->count();

        // LAST WEEK FILTER
        $oneWeekAgo = Carbon::now()->subWeek();

     

        // FETCH BLOG POSTS
        // Get DA and Announcement category
        $daCategory = BlogCategory::where('name', 'LIKE', '%DA%')
            ->orWhere('name', 'LIKE', '%Announcement%')
            ->first();
        
        // Get the latest blog post from DA/Announcement category
        $latestDaPost = null;
        if ($daCategory) {
            $latestDaPost = BlogPost::with(['author', 'category'])
                ->where('category_id', $daCategory->id)
                ->where('status', 'published')
                ->latest()
                ->first();
        }

        // Get the latest 2 blog posts from other categories
        $otherCategoriesPosts = BlogPost::with(['author', 'category'])
            ->where('status', 'published')
            ->when($daCategory, function($query) use ($daCategory) {
                return $query->where('category_id', '!=', $daCategory->id);
            })
            ->latest()
            ->limit(2)
            ->get();
            

        // Add date check for blog titles
        $oneWeekAgoForBlog = Carbon::now()->subWeek();
        
        $blogPosts = [
            'latestDaPost' => $latestDaPost ? [
                'id' => $latestDaPost->id,
                'title' => $latestDaPost->title,
                'slug' => $latestDaPost->slug,
                'content' => $latestDaPost->content,
                'thumbnail' => $latestDaPost->thumbnail,
                'created_at' => $latestDaPost->created_at,
                'author' => $latestDaPost->author,
                'category' => $latestDaPost->category,
                'is_recent' => Carbon::parse($latestDaPost->created_at)->greaterThanOrEqualTo($oneWeekAgoForBlog)
            ] : null,
            'otherPosts' => $otherCategoriesPosts->map(function($post) use ($oneWeekAgoForBlog) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'content' => $post->content,
                    'thumbnail' => $post->thumbnail,
                    'created_at' => $post->created_at,
                    'author' => $post->author,
                    'category' => $post->category,
                    'is_recent' => Carbon::parse($post->created_at)->greaterThanOrEqualTo($oneWeekAgoForBlog)
                ];
            }),
        ];

         $events = Event::with('blogPost')->get();
    
    // Transform events to include blog_slug
    $transformedEvents = $events->map(function($event) {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'date' => $event->date instanceof \DateTime ? $event->date->format('Y-m-d') : $event->date,
            'type' => $event->type,
            'start_time' => $event->start_time instanceof \DateTime ? $event->start_time->format('H:i:s') : $event->start_time,
            'end_time' => $event->end_time instanceof \DateTime ? $event->end_time->format('H:i:s') : $event->end_time,
            'description' => $event->description,
            'blog_slug' => $event->blogPost ? $event->blogPost->slug : null, // Add blog slug
            'blog_id' => $event->blog_id,
        ];
    });
    
    $schedules = Schedule::where('user_id', auth()->id())->get();


    $farmCompliance = FarmCompliance::where('user_id', $user->id)->first();

$farmComplianceData = [
    'exists' => false,
];

if ($farmCompliance) {
    $farmComplianceData = [
        'exists' => true,
        'registration_number' => $farmCompliance->registration_number,
        'date_registered' => $farmCompliance->date_registered ? $farmCompliance->date_registered->format('Y-m-d') : null,
        'valid_until' => $farmCompliance->valid_until ? $farmCompliance->valid_until->format('Y-m-d') : null,
        'status' => $farmCompliance->status,
        'lgu_name' => $farmCompliance->lgu_name,
        'barangay_name' => $farmCompliance->barangay_name,
    ];
}

        return Inertia::render('farmer/index', [
              'events' => $transformedEvents, // Use transformed events instead of raw events
        'schedules' => $schedules,
            'stats' => [
                'totalSwine'               => $totalSwine,
                'activeSwine'              => $activeSwine,
                'deadSwine'                => $deadSwine,
                'soldSwine'                => $soldSwine,
                'totalMarketplaceListings' => $totalMarketplaceListings,
                'availableListingSwine'    => $totalListingSwine,
                'totalRequests'            => $totalRequests,
                'totalExpenses'            => $totalExpenses,
                'totalPendingBookings'     => $totalPendingBookings,
        'totalAcceptedBookings'    => $totalAcceptedBookings,
        'totalCompletedBookings'   => $totalCompletedBookings,
        'totalCancelledBookings'   => $totalCancelledBookings,

         'pendingRequestCount' => $pendingRequestCount,
        'sellerReviewCount' => $sellerReviewCount,
        'sellerApprovedCount' => $sellerApprovedCount,
        'buyerConfirmedCount' => $buyerConfirmedCount,
        'inProgressCount' => $inProgressCount,
        'completedCount' => $completedCount,
        'cancelledCount' => $cancelledCount,
        'expiredCount' => $expiredCount,
            ],
            'insuranceStats' => [
                'totalApplications'     => $totalInsuranceApplications,
                'submittedApplications' => $submittedApplications,
                'reviewedApplications'  => $reviewedApplications,
                'completedApplications' => $completedApplications,
                'incompleteApplications'=> $incompleteApplications,
                'animalsWithReports'    => $totalAnimalsWithReports,
                'totalReports'          => $totalVeterinaryReports,
            ],
            // 'recentActivities'          => $recentSwineActivities,
            // 'swineActionCounts'         => $swineActionCounts,
            // 'swineGroups'               => $groups,
            // 'messages'                  => $latestMessages,
            'recentMarketplaceActivity' => $recentMarketplaceActivity,
            'blogPosts'                 => $blogPosts,
             'farmCompliance' => $farmComplianceData,
        ]);
        
    }


    public function showFarmCompliance()
{
    $compliance = FarmCompliance::where('user_id', Auth::id())->first();
    
    if (!$compliance) {
        return redirect()->back()->with('error', 'No farm compliance record found.');
    }
    
    return Inertia::render('farmer/FarmComplianceDetails', [
        'compliance' => $compliance,
    ]);
}
}