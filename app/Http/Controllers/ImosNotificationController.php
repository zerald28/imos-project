<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImosNotification;
use App\Events\ImosNotificationCreated;

class ImosNotificationController extends Controller
{
    // Get all notifications for the logged-in user
   // In your controller
public function index(Request $request)
{
    $notifications = ImosNotification::with(['actor.userInformation']) // <-- Eager load userInformation
        ->where('user_id', $request->user()->id)
        ->orderByDesc('created_at')
        ->get();

    return response()->json($notifications);
}

    // Mark single notification as read
    public function markAsRead(Request $request, $id)
    {
        $notification = ImosNotification::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $notification->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    // Mark all notifications as read
    public function markAllAsRead(Request $request)
    {
        ImosNotification::where('user_id', $request->user()->id)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
