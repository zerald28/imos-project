<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marketplace\Notification;

class NotificationController extends Controller
{
    // Get all notifications for logged-in buyer
    public function index(Request $request)
    {
        $notifications = Notification::with('seller.userInformation') // eager-load seller data
        ->where('buyer_id', $request->user()->id)
        ->orderByDesc('created_at')
        ->get();

        return response()->json($notifications);
    }

    // Mark notification as read
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::where('buyer_id', $request->user()->id)
            ->findOrFail($id);

        $notification->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    // Optional: mark all as read
    public function markAllAsRead(Request $request)
    {
        Notification::where('buyer_id', $request->user()->id)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
