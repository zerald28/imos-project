<?php

namespace App\Http\Controllers;

use App\Models\ServiceBooking;
use App\Models\LivestockService;
use App\Models\ImosNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceBookingController extends Controller
{
    /**
     * Simple booking - just click book/avail
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'service_id' => 'required|exists:livestock_services,id'
            ]);

            $service = LivestockService::findOrFail($request->service_id);

            // Check if user is trying to book their own service
            if ($service->user_id === Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'You cannot book your own service.'
                ], 400);
            }

            // Check for existing pending/accepted booking
            $existingBooking = ServiceBooking::where('service_id', $service->id)
                ->where('customer_id', Auth::id())
                ->whereIn('status', ['pending', 'accepted'])
                ->first();

            if ($existingBooking) {
                return response()->json([
                    'success' => false,
                    'message' => 'You already have an active booking for this service.'
                ], 400);
            }

            // Create booking with default scheduled_date (tomorrow)
            $booking = ServiceBooking::create([
                'service_id' => $service->id,
                'customer_id' => Auth::id(),
                'provider_id' => $service->user_id,
                'scheduled_date' => now()->addDay(),
                'notes' => 'Booked via quick booking',
                'status' => 'pending'
            ]);

            // 🔔 NOTIFICATION: Notify provider that someone booked their service
            // user_id = provider_id (receiver), actor_id = customer_id (who booked)
            ImosNotification::create([
                'user_id' => $service->user_id,        // Provider receives notification
                'actor_id' => Auth::id(),               // Customer triggered it
                'type' => 'marketplace',
                'action' => 'booking_created',
                'message' => Auth::user()->name . ' has booked your service: ' . $service->title,
                'url' => route('marketplace.services.bookings.provider-bookings'), // Provider sees all bookings
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Service booked successfully! The provider will contact you soon.',
                'booking' => $booking
            ]);

        } catch (\Exception $e) {
            \Log::error('Booking failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred. Please try again.'
            ], 500);
        }
    }

    /**
     * Update booking status (accept/cancel/complete)
     */
   public function updateStatus(Request $request, ServiceBooking $booking)
{
    $request->validate([
        'status' => 'required|in:accepted,cancelled,completed'
    ]);

    // Verify the user is authorized
    if ($request->status === 'cancelled') {
        // Allow both customer AND provider to cancel
        if ($booking->customer_id !== Auth::id() && $booking->provider_id !== Auth::id()) {
            return back()->with('error', 'You are not authorized to cancel this booking.');
        }
    }
    elseif ($request->status === 'accepted' && $booking->provider_id !== Auth::id()) {
        return back()->with('error', 'Only the provider can accept bookings.');
    }
    elseif ($request->status === 'completed' && $booking->provider_id !== Auth::id()) {
        return back()->with('error', 'Only the provider can mark bookings as complete.');
    }

    // Only pending bookings can be accepted/cancelled
    if (in_array($request->status, ['accepted', 'cancelled']) && $booking->status !== 'pending') {
        return back()->with('error', 'This booking cannot be updated.');
    }

    // Only accepted bookings can be completed
    if ($request->status === 'completed' && $booking->status !== 'accepted') {
        return back()->with('error', 'Only accepted bookings can be marked as complete.');
    }

    $oldStatus = $booking->status;
    $booking->update(['status' => $request->status]);

    // Send notifications
    if ($request->status === 'cancelled') {
        // Determine who cancelled and notify the other party
        if (Auth::id() === $booking->customer_id) {
            // Customer cancelled - notify provider
            ImosNotification::create([
                'user_id' => $booking->provider_id,
                'actor_id' => Auth::id(),
                'type' => 'marketplace',
                'action' => 'booking_cancelled',
                'message' => Auth::user()->name . ' has cancelled their booking for: ' . $booking->service->title,
                'url' => route('marketplace.services.bookings.provider-bookings'),
            ]);
        } else {
            // Provider cancelled - notify customer
            ImosNotification::create([
                'user_id' => $booking->customer_id,
                'actor_id' => Auth::id(),
                'type' => 'marketplace',
                'action' => 'booking_cancelled',
                'message' => 'Your booking for "' . $booking->service->title . '" has been cancelled by the provider.',
                'url' => route('marketplace.services.bookings.my-bookings'),
            ]);
        }
    }
    
    $message = $request->status === 'completed' 
        ? 'Booking marked as completed successfully!' 
        : 'Booking updated successfully!';
        
    return back()->with('success', $message);
}

    /**
     * Get provider's bookings (for service owners)
     */
    public function providerBookings()
    {
        $bookings = ServiceBooking::with([
            'service',
            'customer.userInformation.barangay',
            'rating'
        ])
        ->where('provider_id', Auth::id())
        ->orderByRaw("FIELD(status, 'pending', 'accepted', 'completed', 'cancelled')")
        ->latest('created_at')
        ->paginate(10);

        // Get all services created by this user with blogPost relationship
        $services = LivestockService::with('blogPost')
            ->withCount('bookings')
            ->withAvg('ratings', 'rating')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('marketplace/services/provider-bookings', [
            'bookings' => $bookings,
            'services' => $services
        ]);
    }

    /**
     * Get customer's bookings
     */
    public function myBookings()
    {
        $bookings = ServiceBooking::with([
            'service.user',
            'provider',
            'rating'
        ])
        ->where('customer_id', Auth::id())
        ->orderByRaw("FIELD(status, 'pending', 'accepted', 'completed', 'cancelled')")
        ->latest('created_at')
        ->paginate(10);

        return Inertia::render('marketplace/services/my-bookings', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Mark as completed (for customer)
     */
    public function complete(ServiceBooking $booking)
    {
        if ($booking->customer_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Only the customer can mark bookings as completed.'
            ], 403);
        }

        if ($booking->status !== 'accepted') {
            return response()->json([
                'success' => false,
                'message' => 'Only accepted bookings can be completed.'
            ], 400);
        }

        $booking->update([
            'status' => 'completed',
            'completed_at' => now()
        ]);

        // 🔔 NOTIFICATION: Notify provider that customer completed the service
        ImosNotification::create([
            'user_id' => $booking->provider_id,     // Provider receives notification
            'actor_id' => Auth::id(),                // Customer completed
            'type' => 'marketplace',
            'action' => 'booking_completed_by_customer',
            'message' => Auth::user()->name . ' has marked the service as completed: ' . $booking->service->title,
            'url' => route('marketplace.services.bookings.provider-bookings'), // Provider sees their bookings
        ]);

        return redirect()->back()->with('success', 'Service completed! You can now rate this service.');
    }

    /**
     * Delete a booking (permanent delete)
     */
    public function destroy(ServiceBooking $booking)
    {
        \Log::info('Delete booking attempt', [
            'booking_id' => $booking->id,
            'user_id' => Auth::id(),
            'customer_id' => $booking->customer_id,
            'status' => $booking->status
        ]);

        // Check if user is authorized (only the customer who made the booking can delete)
        if ($booking->customer_id !== Auth::id()) {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to delete this booking.'
                ], 403);
            }
            return back()->with('error', 'You are not authorized to delete this booking.');
        }

        // Only allow deletion of cancelled bookings
        if ($booking->status !== 'cancelled') {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only cancelled bookings can be deleted.'
                ], 400);
            }
            return back()->with('error', 'Only cancelled bookings can be deleted.');
        }

        // Store info before deletion for notification
        $serviceTitle = $booking->service->title;
        $providerId = $booking->provider_id;

        // Delete the booking
        $booking->delete();

        // 🔔 NOTIFICATION: Notify provider that booking was deleted
        ImosNotification::create([
            'user_id' => $providerId,                // Provider receives notification
            'actor_id' => Auth::id(),                  // Customer deleted
            'type' => 'marketplace',
            'action' => 'booking_deleted',
            'message' => Auth::user()->name . ' has deleted their cancelled booking for: ' . $serviceTitle,
            'url' => route('marketplace.services.bookings.provider-bookings'), // Provider sees their bookings
        ]);

        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Booking deleted successfully!'
            ]);
        }

        return back()->with('success', 'Booking deleted successfully!');
    }
}