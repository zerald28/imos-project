<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Events\MessageEdited;   // ✅ Add this
use App\Events\MessageDeleted;  // ✅ Add this

class ChatController extends Controller
{
    /**
     * Send a message (text or attachment)
     */
    public function send(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'nullable|string|max:1000',
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:10240', // 10MB max
        ]);

        $conversation = Conversation::findOrFail($request->conversation_id);

        // Optional file upload
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('chat_attachments', 'public');
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $request->user()->id,
            'content' => $request->content,
            'attachment' => $attachmentPath,
        ]);

        // Broadcast to receiver
        $receiverId = $conversation->user_one_id === $request->user()->id
            ? $conversation->user_two_id
            : $conversation->user_one_id;

        broadcast(new MessageSent($request->user(), $receiverId, $message))->toOthers();

        return response()->json([
            'status' => 'Message sent!',
            'message' => $message->load('sender')
        ]);
    }

    /**
     * Fetch messages for a conversation
     */
    public function fetchMessages(Conversation $conversation)
    {
        $this->authorize('view', $conversation); // Add policy later

        $messages = $conversation->messages()->with('sender')->latest()->get();

        return response()->json($messages);
    }

    /**
 * Edit a message
 */
// Edit
public function edit(Request $request, Message $message)
{
    $this->authorize('update', $message);

    $request->validate([
        'content' => 'required|string|max:1000',
    ]);

    $message->update([
        'content' => $request->content,
        'is_edited' => true,
    ]);

    broadcast(new MessageEdited($message))->toOthers();

    return response()->json($message);
}

// Delete
public function destroy(Message $message)
{
    $this->authorize('delete', $message);

    $message->delete();

    // broadcast(new MessageDeleted($message))->toOthers();

    // return response()->json(['status' => 'Message deleted']);
}

}
