<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $categoryFilter = $request->query('category', 'DA');
        $search = $request->query('search', '');
        $user = Auth::user();

        // Category groups
        $categories = match($categoryFilter) {
            'DA' => ['Program', 'Announcements', 'DA'],
            'Livestock' => ['Farmer Tips', 'Farm Exploration', 'Community Sharing'],
            default => []
        };

        $query = BlogPost::with([
            'author', 
            'category:id,name'
        ])
        ->select(
            'id', 
            'title', 
            'slug', 
            'created_at', 
            'updated_at', 
            'category_id', 
            'author_id', 
            'thumbnail',
            'status'
        )
        ->withCount('likes')
        ->orderBy('created_at', 'desc')
        ->where('category_id', '!=', 8)
        // Filter out restricted posts
        ->where('status', '!=', 'restricted');

        // Apply category filter
        if (!empty($categories)) {
            $query->whereHas('category', function ($c) use ($categories) {
                $c->whereIn('name', $categories);
            });
        }

        // Apply search filter
        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $posts = $query->paginate(20)->withQueryString();

        // Add user's like status to each post if user is logged in
        if ($user) {
            $posts->getCollection()->transform(function ($post) use ($user) {
                $post->user_has_liked = $post->isLikedBy($user);
                return $post;
            });
        } else {
            $posts->getCollection()->transform(function ($post) {
                $post->user_has_liked = false;
                return $post;
            });
        }

        return Inertia::render('cms/BlogIndex', [
            'posts' => $posts,
            'categoryFilter' => $categoryFilter,
            'search' => $search,
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                ] : null
            ]
        ]);
    }
}