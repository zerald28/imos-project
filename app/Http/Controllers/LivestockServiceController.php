<?php

namespace App\Http\Controllers;

use App\Models\LivestockService;
use App\Models\UserInformation;
use App\Http\Requests\StoreLivestockServiceRequest;
use App\Models\ImosNotification;
use App\Models\ServiceBooking;
use App\Models\ServiceRating;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LivestockServiceController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $search = $request->input('search');
        $location = $request->input('location');
        $user = Auth::user();

        $query = LivestockService::with(['user', 'user.userInformation', 'blogPost']) // Added blogPost
            ->withCount('ratings')
            ->withAvg('ratings', 'rating')
            ->where('is_active', true)
            ->when($search, function($q) use ($search) {
                $q->where(function($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('user', function($q2) use ($search) {
                            $q2->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($location, function ($q) use ($location) {
                $q->where(function ($query) use ($location) {
                    $query->where('location', 'like', "%{$location}%")
                        ->orWhereHas('user.userInformation', function ($q2) use ($location) {
                            $q2->where('province_id', 'like', "%{$location}%")
                                ->orWhere('municipal_id', 'like', "%{$location}%")
                                ->orWhere('barangay_id', 'like', "%{$location}%")
                                ->orWhere('purok', 'like', "%{$location}%")
                                ->orWhere('street', 'like', "%{$location}%");
                        });
                });
            })
            ->latest();

        $services = $query->paginate(10)->withQueryString();
        
        $services->getCollection()->transform(function ($service) use ($user) {
            if ($service->user && $service->user->userInformation) {
                $service->user->contact = $service->user->userInformation->contact;
                $service->user->profile_picture = $service->user->userInformation->profile_picture 
                    ? asset('storage/' . $service->user->userInformation->profile_picture)
                    : null;
            }
            
            $service->average_rating = $service->ratings_avg_rating ?? 0;
            $service->ratings_count = $service->ratings_count ?? 0;
            
            if ($user) {
                $existingBooking = ServiceBooking::where('service_id', $service->id)
                    ->where('customer_id', $user->id)
                    ->whereIn('status', ['pending', 'accepted'])
                    ->first();
                
                $service->has_pending_booking = !is_null($existingBooking);
                
                $completedBooking = ServiceBooking::where('service_id', $service->id)
                    ->where('customer_id', $user->id)
                    ->where('status', 'completed')
                    ->whereDoesntHave('rating')
                    ->first();
                
                $service->can_rate = !is_null($completedBooking);
                $service->pending_rating_booking_id = $completedBooking?->id;
                
                $userRating = ServiceRating::where('service_id', $service->id)
                    ->where('reviewer_id', $user->id)
                    ->first();
                
                $service->user_rating = $userRating;
            } else {
                $service->has_pending_booking = false;
                $service->can_rate = false;
                $service->pending_rating_booking_id = null;
                $service->user_rating = null;
            }
            
            return $service;

            // In your index method, when setting user_rating
$userRating = ServiceRating::where('service_id', $service->id)
    ->where('reviewer_id', $user->id)
    ->first();

if ($userRating) {
    $service->user_rating = [
        'id' => $userRating->id,
        'rating' => $userRating->rating,
        'comment' => $userRating->comment,
        'booking_id' => $userRating->booking_id, // 👈 Add this
    ];
} else {
    $service->user_rating = null;
}
        });


        

        return Inertia::render('marketplace/services/index', [
            'services' => $services,
            'filters' => $request->only('search', 'location'),
            'auth' => $user ? ['user' => $user] : null
        ]);
    }

   public function create(Request $request)
{
    $user = auth()->user();

    // Only allow non-buyers
    if ($user->role === 'buyer') {
        abort(403, 'You are not authorized to create services.');
    }

    // Check if user information exists
    if (!$user->userInformation) {
        return redirect()->route('user-informations.create')
            ->with('info', 'Please complete your profile before posting a service.');
    }

    $userInfo = $user->userInformation;

    $location = collect([
        $userInfo->street,
        $userInfo->purok,
        optional($userInfo->barangay)->name,
        optional($userInfo->municipal)->name,
        optional($userInfo->province)->name,
    ])->filter()->implode(', ');

    // Get user's blog posts
    $blogPosts = $user->blogPosts()
        ->with('category')
        ->latest()
        ->get(['id', 'title', 'slug', 'content', 'thumbnail', 'created_at', 'category_id']);

    // Check for new blog post from query parameter
    $newBlogPost = null;
    if ($request->has('new_blog_post')) {
        $newBlogPost = json_decode($request->new_blog_post, true);
    }

    return Inertia::render('marketplace/services/create', [
        'categories' => LivestockService::categories(),
        'location' => $location,
        'blogPosts' => $blogPosts,
        'newBlogPost' => $newBlogPost,
    ]);
}

    public function store(StoreLivestockServiceRequest $request)
    {
        $service = $request->user()->services()->create([
            ...$request->validated(),
            'location' => $request->location,
            'blog_post_id' => $request->blog_post_id, // Added
        ]);

        return redirect()
            ->route('marketplace.services.edit', $service)
            ->with('success', 'Service created successfully.');
    }

    public function show(LivestockService $service)
    {
        $service->load(['user', 'user.userInformation', 'blogPost']);
        
        $service->user->contact = $service->user->userInformation?->contact;
        $service->user->profile_picture = $service->user->userInformation?->profile_picture 
            ? asset('storage/' . $service->user->userInformation->profile_picture)
            : null;

        return Inertia::render('marketplace/services/show', [
            'service' => $service,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null
        ]);
    }

    public function edit(LivestockService $service)
    {
        $this->authorize('update', $service);

        $user = auth()->user();
        $userInfo = $user->userInformation;

        $location = collect([
            $userInfo->street,
            $userInfo->purok,
            optional($userInfo->barangay)->name,
            optional($userInfo->municipal)->name,
            optional($userInfo->province)->name,
        ])->filter()->implode(', ');

        // Get user's blog posts
        $blogPosts = $user->blogPosts()
            ->with('category')
            ->latest()
            ->get(['id', 'title', 'slug', 'content', 'thumbnail', 'created_at', 'category_id']);

        return Inertia::render('marketplace/services/create', [
            'categories' => LivestockService::categories(),
            'location' => $location,
            'service' => $service,
            'blogPosts' => $blogPosts,
        ]);
    }

    public function update(StoreLivestockServiceRequest $request, LivestockService $service)
    {
        $this->authorize('update', $service);

        $service->update([
            ...$request->validated(),
            'location' => $request->location,
            'blog_post_id' => $request->blog_post_id, // Added
        ]);

        return redirect()->route('marketplace.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(LivestockService $service)
    {
        // Check if user is authorized
        if ($service->user_id !== Auth::id()) {
            return back()->with('error', 'You are not authorized to delete this service.');
        }

        // Get all customers who have booked this service for notifications
        $customers = ServiceBooking::where('service_id', $service->id)
            ->whereIn('status', ['pending', 'accepted'])
            ->pluck('customer_id');

        // Store service title before deletion
        $serviceTitle = $service->title;

        // Delete the service
        $service->delete();

        // 🔔 NOTIFICATION: Notify all customers with active bookings
        foreach ($customers as $customerId) {
            if (class_exists('App\Models\ImosNotification')) {
                ImosNotification::createNotification(
                    $customerId,
                    Auth::id(),
                    'marketplace',
                    'service_deleted',
                    'The service "' . $serviceTitle . '" you booked has been deleted by the provider.',
                    route('bookings.my-bookings')
                );
            }
        }

        return back()->with('success', 'Service deleted successfully!');
    }
}