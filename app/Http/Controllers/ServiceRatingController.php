<?php

namespace App\Http\Controllers;

use App\Models\ServiceRating;
use App\Models\ServiceBooking;
use App\Models\ImosNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceRatingController extends Controller
{
    /**
     * Show page for rating a specific booking
     */
    public function showRatingPage($bookingId)
    {
        $booking = ServiceBooking::with(['service', 'service.user', 'provider'])
            ->where('customer_id', Auth::id())
            ->where('id', $bookingId)
            ->where('status', 'completed')
            ->whereDoesntHave('rating')
            ->firstOrFail();

        return Inertia::render('marketplace/services/ratings/create', [
            'booking' => $booking
        ]);
    }

    /**
     * Show page for editing a rating
     */
    public function editRating(ServiceRating $rating)
    {
        if ($rating->reviewer_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('ratings/edit', [
            'rating' => $rating->load(['service', 'booking'])
        ]);
    }

    /**
     * Store a new rating
     */
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:service_bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000'
        ]);

        $booking = ServiceBooking::with('service')->findOrFail($request->booking_id);

        // Verify the user is the customer
        if ($booking->customer_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot rate this booking.'
            ], 403);
        }

        // Verify the booking is completed
        if ($booking->status !== 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'You can only rate completed bookings.'
            ], 400);
        }

        // Verify not already rated
        if ($booking->rating()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'This booking has already been rated.'
            ], 400);
        }

        // Create the rating
        $rating = ServiceRating::create([
            'service_id' => $booking->service_id,
            'booking_id' => $booking->id,
            'reviewer_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        // 🔔 NOTIFICATION: Notify provider about new rating
        // user_id = provider_id (receiver), actor_id = customer_id (reviewer)
        ImosNotification::create([
            'user_id' => $booking->provider_id,        // Provider receives notification
            'actor_id' => Auth::id(),                   // Customer gave rating
            'type' => 'marketplace',
            'action' => 'rating_received',
            'message' => Auth::user()->name . ' rated your service "' . $booking->service->title . '" ' . $request->rating . ' stars',
            'url' => route('marketplace.services.bookings.provider-bookings'), // Provider sees their bookings
        ]);

        // If rating is 4 or 5 stars, maybe send a special notification
        if ($request->rating >= 4) {
            ImosNotification::create([
                'user_id' => $booking->provider_id,
                'actor_id' => Auth::id(),
                'type' => 'marketplace',
                'action' => 'high_rating_received',
                'message' => '🎉 ' . Auth::user()->name . ' gave you a ' . $request->rating . '-star rating! Great job!',
                'url' => route('marketplace.services.bookings.provider-bookings'),
            ]);
        }

        // If rating is low, maybe notify admin or just provider
        if ($request->rating <= 2) {
            ImosNotification::create([
                'user_id' => $booking->provider_id,
                'actor_id' => Auth::id(),
                'type' => 'marketplace',
                'action' => 'low_rating_received',
                'message' => 'You received a ' . $request->rating . '-star rating. Please review the feedback to improve your service.',
                'url' => route('marketplace.services.bookings.provider-bookings'),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your rating!',
            'rating' => $rating
        ]);
    }

    /**
     * Update a rating
     */
   // app/Http/Controllers/ServiceRatingController.php

public function update(Request $request, ServiceRating $rating)
{
    $request->validate([
        'rating' => 'required|integer|min:1|max:5',
        'comment' => 'nullable|string|max:1000'
    ]);

    if ($rating->reviewer_id !== Auth::id()) {
        return response()->json([
            'success' => false,
            'message' => 'You can only edit your own ratings.'
        ], 403);
    }

    $oldRating = $rating->rating;
    $rating->update([
        'rating' => $request->rating,
        'comment' => $request->comment
    ]);

    // 🔔 NOTIFICATION: Notify provider about rating update
    $booking = ServiceBooking::with('service')->find($rating->booking_id);
    
    // Check if provider-bookings route exists, if not use a fallback
    $providerUrl = null;
    if (app('router')->has('marketplace.services.bookings.provider-bookings')) {
        $providerUrl = route('marketplace.services.bookings.provider-bookings');
    } else {
        $providerUrl = route('marketplace.services.index'); // Fallback to services index
    }

    // Create notification
    ImosNotification::create([
        'user_id' => $booking->provider_id,
        'actor_id' => Auth::id(),
        'type' => 'marketplace',
        'action' => 'rating_updated',
        'message' => Auth::user()->name . ' updated their rating for "' . $booking->service->title . '" from ' . $oldRating . ' to ' . $request->rating . ' stars',
        'url' => $providerUrl,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Rating updated successfully!',
        'rating' => $rating
    ]);
}

    /**
     * Delete a rating
     */
    public function destroy(ServiceRating $rating)
    {
        if ($rating->reviewer_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You can only delete your own ratings.'
            ], 403);
        }

        $booking = ServiceBooking::with('service')->find($rating->booking_id);
        $serviceTitle = $booking->service->title;
        $providerId = $booking->provider_id;
        $oldRating = $rating->rating;

        $rating->delete();

        // 🔔 NOTIFICATION: Notify provider about rating deletion
        ImosNotification::create([
            'user_id' => $providerId,                   // Provider receives notification
            'actor_id' => Auth::id(),                    // Customer deleted rating
            'type' => 'marketplace',
            'action' => 'rating_deleted',
            'message' => Auth::user()->name . ' deleted their ' . $oldRating . '-star rating for "' . $serviceTitle . '"',
            'url' => route('marketplace.services.bookings.provider-bookings'),
        ]);

        // Also notify the customer that they can rate again if they want
        ImosNotification::create([
            'user_id' => Auth::id(),                     // Customer receives notification
            'actor_id' => Auth::id(),                    // Self notification
            'type' => 'marketplace',
            'action' => 'rating_removed',
            'message' => 'Your rating has been deleted. You can rate this service again if you\'d like.',
            'url' => route('marketplace.services.bookings.my-bookings'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rating deleted successfully!'
        ]);
    }
}