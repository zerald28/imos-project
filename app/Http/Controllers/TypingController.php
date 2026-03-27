<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class TypingController extends Controller
{
    public function store(Request $request, $conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);
        $this->authorize('view', $conversation);

        broadcast(new \App\Events\UserTyping($conversationId, $request->user()->id))->toOthers();

        return response()->json(['message' => 'Typing event sent']);
    }
}
