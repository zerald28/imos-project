<?php
// app/Http/Controllers/CMS/BlogLikeController.php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\BlogPost;
use App\Models\CMS\BlogLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogLikeController extends Controller
{
    public function toggle(BlogPost $post)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $like = BlogLike::where('post_id', $post->id)
                        ->where('user_id', $user->id)
                        ->first();

        if ($like) {
            // Unlike
            $like->delete();
            $liked = false;
        } else {
            // Like
            BlogLike::create([
                'post_id' => $post->id,
                'user_id' => $user->id
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $post->likes()->count()
        ]);
    }

    public function status(BlogPost $post)
{
    $user = Auth::user();
    
    if (!$user) {
        return response()->json(['liked' => false]);
    }

    $liked = $post->isLikedBy($user);
    
    return response()->json([
        'liked' => $liked
    ]);
}


}