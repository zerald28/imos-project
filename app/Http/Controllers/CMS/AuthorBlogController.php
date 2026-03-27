<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\BlogPost;
use App\Models\CMS\BlogLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorBlogController extends Controller
{
    public function index()
    {
        $authorId = Auth::id();

        // Get posts authored by the user
        $authoredPosts = BlogPost::with('category')
            ->where('author_id', $authorId)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function($post) {
                $post->likes_count = $post->likes()->count();
                return $post;
            });

        // Get posts liked by the user (excluding their own posts)
        $likedPosts = BlogPost::with('category', 'author')
            ->whereHas('likes', function($q) use ($authorId) {
                $q->where('user_id', $authorId);
            })
            ->where('author_id', '!=', $authorId) // Exclude own posts
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function($post) {
                $post->likes_count = $post->likes()->count();
                return $post;
            });

        return inertia('cms/Author', [
            'authoredPosts' => $authoredPosts,
            'likedPosts' => $likedPosts,
            'userRole' => Auth::user()->role,
            'userName' => Auth::user()->name,
            'stats' => [
                'total_authored' => $authoredPosts->count(),
                'total_liked' => $likedPosts->count(),
                'total_likes_received' => BlogPost::where('author_id', $authorId)
                    ->withCount('likes')
                    ->get()
                    ->sum('likes_count'),
            ],
        ]);
    }
}