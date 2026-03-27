<?php
namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\MessageEdited;
use App\Events\MessageDeleted;
use App\Events\UserTyping;
use App\Events\MessagesRead; // Create this event
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSents;

class MessageController extends Controller
{
    use AuthorizesRequests;

    /**
     * Paginated messages for a conversation
     * Returns messages ascending for TSX
     */
     public function index($conversationId)
    {
        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        
        return response()->json([
            'data' => $messages
        ]);
    }

    /**
     * Mark messages as read for the current user
     */
    public function markAsRead(Request $request, $conversationId)
    {
        $userId = auth()->id();
        
        // Get all unread messages in this conversation that were sent to the current user
        $messages = Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $userId)
            ->where('is_read', false)
            ->get();
        
        if ($messages->isNotEmpty()) {
            // Update messages as read
            Message::whereIn('id', $messages->pluck('id'))
                ->update(['is_read' => true]);
            
            // Broadcast read receipts
            broadcast(new MessagesRead($conversationId, $userId, $messages->pluck('id')))->toOthers();
        }
        
        return response()->json(['success' => true, 'count' => $messages->count()]);
    }

    /**
     * Send new message - SINGLE METHOD for sending messages
     */
    public function send(Request $request, $conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);
        $this->authorize('view', $conversation);

        if (!$request->content && !$request->hasFile('attachment')) {
            return response()->json(['message' => 'Cannot send empty message'], 422);
        }

        $request->validate([
            'content' => 'nullable|string|max:1000',
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:10240',
        ]);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('chat_attachments', 'public');
        }

        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => auth()->id(),
            'content' => $request->input('content', ''),
            'attachment' => $attachmentPath,
            'is_read' => false,
        ]);

        // 🔴 IMPORTANT: Update conversation timestamps
        $conversation->touch(); // This updates the updated_at timestamp
        // Or if you have last_message_at field:
        // $conversation->update(['last_message_at' => now()]);

        $message->load('sender:id,name');

        if ($message->attachment) {
            $message->attachment_url = Storage::url($message->attachment);
        }

        broadcast(new MessageSent(auth()->user(), $conversationId, $message))->toOthers();

        return response()->json([
            'status' => 'success',
            'data' => $message
        ]);
    }

    /**
     * Edit a message
     */
    public function update(Request $request, Message $message)
    {
        $this->authorize('update', $message);

        $request->validate(['content' => 'required|string|max:1000']);

        $message->update([
            'content' => $request->content,
            'is_edited' => true,
        ]);

        broadcast(new MessageEdited($message))->toOthers();

        return response()->json([
            'status' => 'success',
            'data' => $message->load('sender')
        ]);
    }

    /**
     * Delete message (soft)
     */
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $conversationId = $message->conversation_id;
        $messageId = $message->id;

        $message->delete();

        broadcast(new MessageDeleted($conversationId, $messageId))->toOthers();

        return response()->json(['success' => true]);
    }

    /**
     * Typing notify
     */
    public function typing(Conversation $conversation)
    {
        $this->authorize('view', $conversation);
        broadcast(new UserTyping(auth()->user(), $conversation->id))->toOthers();
        
        return response()->json(['status' => 'ok']);
    }

        public function store(Request $request, $conversationId)
    {
        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => auth()->id(),
            'content' => $request->content,
            'attachment' => $path ?? null,
            'is_read' => false, // New messages start as unread
        ])->load('sender:id,name');

        broadcast(new MessageSent(auth()->user(), $conversationId, $message))->toOthers();
        broadcast(new MessageSents($message))->toOthers();

        return response()->json([
            'data' => $message
        ]);
    }



     public function startConversation(Request $request)
    {
        $senderId = auth()->id(); // currently logged-in user
        $receiverId = $request->receiver_id;

        // Check if conversation already exists
        $conversation = Conversation::where(function ($q) use ($senderId, $receiverId) {
            $q->where('user_one_id', $senderId)->where('user_two_id', $receiverId);
        })->orWhere(function ($q) use ($senderId, $receiverId) {
            $q->where('user_one_id', $receiverId)->where('user_two_id', $senderId);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $senderId,
                'user_two_id' => $receiverId
            ]);
        }

        return response()->json(['data' => $conversation]);
    }

    
}
