<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\BlogComment;
use App\Models\CMS\BlogPost;
use Illuminate\Http\Request;

class BlogCommentController extends Controller
{
  public function store(Request $request, BlogPost $post)
{
    $validated = $request->validate([
        'content' => 'required|string|max:5000',
    ]);

    $comment = BlogComment::create([
        'post_id' => $post->id,
        'user_id' => auth()->id(),
        'content' => $validated['content'],
    ]);

    // load user
    $comment->load('user:id,name'); // only id and name

    // return JSON in same shape as frontend expects
    return response()->json([
        'id' => $comment->id,
        'content' => $comment->content,
        'created_at' => $comment->created_at,
        'user' => [
            'id' => $comment->user->id,
            'name' => $comment->user->name,
        ],
    ], 201);
}


    public function destroy(BlogComment $comment)
{
    if (auth()->id() !== $comment->user_id && auth()->user()->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $comment->delete();

    return response()->json(['message' => 'Comment deleted']);
}

public function update(Request $request, BlogComment $comment)
{
    if (auth()->id() !== $comment->user_id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validated = $request->validate([
        'content' => 'required|string|max:5000',
    ]);

    $comment->update(['content' => $validated['content']]);

    $comment->load('user:id,name');

    return response()->json([
        'id' => $comment->id,
        'content' => $comment->content,
        'created_at' => $comment->created_at,
        'user' => [
            'id' => $comment->user->id,
            'name' => $comment->user->name,
        ],
    ]);
}


}
