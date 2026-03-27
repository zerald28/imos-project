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
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\VeterinaryDiseaseReport;
use App\Models\PDF\LivestockAnimal;
use App\Models\ServiceBooking;

class FarmerHomeController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $swineQuery = Swine::where('owner_id', $user->id);

        // BASIC STATS
        $totalSwine   = $swineQuery->count();
        $activeSwine  = $swineQuery->where('status', 'active')->count();
        $deadSwine    = $swineQuery->where('status', 'dead')->count();
        $soldSwine    = $swineQuery->where('status', 'sold')->count();

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

        // RECENT SWINE ACTIVITIES (last week)
        $recentSwineActivities = ActivityLog::where('module', 'swine')
            ->where('created_at', '>=', $oneWeekAgo)
            ->orderBy('created_at', 'desc')
            ->get();

        // TOTAL ACTION COUNTS (last week)
        $swineActionCounts = ActivityLog::where('module', 'swine')
            ->where('created_at', '>=', $oneWeekAgo)
            ->selectRaw('action, COUNT(*) as total')
            ->groupBy('action')
            ->get();

        $groups = \App\Models\Swine\SwineGroup::with(['swine.breed'])
            ->where('owner_id', $user->id)
            ->get()
            ->map(function ($group) {
                $pigsCount = $group->swine->count();
                $avgWeight = round($group->swine->avg('weight') ?? 0, 2);
                $breeds = $group->swine
                    ->pluck('breed.name')
                    ->unique()
                    ->values()
                    ->toArray();
                $maleCount = $group->swine->where('sex', 'male')->count();
                $femaleCount = $group->swine->where('sex', 'female')->count();

                return [
                    'id'           => $group->id,
                    'name'         => $group->name,
                    'pigs_count'   => $pigsCount,
                    'male_count'   => $maleCount,
                    'female_count' => $femaleCount,
                    'avg_weight'   => $avgWeight,
                    'breeds'       => $breeds,
                    'status'       => $group->group_type,
                ];
            });

        $latestMessages = Conversation::where('user_one_id', $user->id)
            ->orWhere('user_two_id', $user->id)
            ->with([
                'userOne:id,name,role',
                'userTwo:id,name,role',
                'latestMessage' => function($q) {
                    $q->withTrashed();
                }
            ])
            ->get()
            ->map(function ($conversation) use ($user) {
                $otherUser = $conversation->user_one_id === $user->id 
                    ? $conversation->userTwo 
                    : $conversation->userOne;

                $latest = $conversation->latestMessage;
                if (!$latest) return null;

                switch ($otherUser->role) {
                    case 'buyer':
                        $prefix = 'from Marketplace';
                        break;
                    case 'admin':
                    case 'enforcer':
                        $prefix = 'from DA';
                        break;
                    case 'farmer':
                    default:
                        $prefix = 'messages you';
                        break;
                }

                return [
                    'id' => $conversation->id,
                    'sender_name' => $otherUser->name,
                    'message_preview' => $latest->content,
                    'prefix' => $prefix,
                    'created_at' => $latest->created_at->toDateTimeString(),
                ];
            })
            ->filter()
            ->sortByDesc('created_at')
            ->values();

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

        return Inertia::render('farmer/index', [
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
            'recentActivities'          => $recentSwineActivities,
            'swineActionCounts'         => $swineActionCounts,
            'swineGroups'               => $groups,
            'messages'                  => $latestMessages,
            'recentMarketplaceActivity' => $recentMarketplaceActivity,
            'blogPosts'                 => $blogPosts,
        ]);
    }
}