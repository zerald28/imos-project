<?php

namespace App\Http\Controllers\CMS;

// File: app/Http/Controllers/CMS/BlogPostController.php
use App\Http\Controllers\Controller;
use App\Models\CMS\BlogPost;
use App\Models\CMS\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;
use App\Http\Requests\CMS\StoreBlogPostRequest;
use App\Http\Requests\CMS\UpdateBlogPostRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\CMS\BlogCategory;
use App\Models\Event;
use App\Models\ImosNotification;
use App\Models\User;
use Inertia\Inertia;

class BlogPostController extends Controller
{

    public function create(Request $request)
{
    // Only allow Admin or Enforcer
    $user = Auth::user();

    // Fetch categories and tags
    $categories = BlogCategory::all(['id', 'name']);
    $tags = BlogTag::all(['id', 'name']);

    return inertia('cms/BlogCreatePage', [
        'categories' => $categories,
        'tags' => $tags,
        'user' => $user,
        'returnTo' => $request->query('returnTo'), // Pass through return URL
        'source' => $request->query('source'),      // Pass through source
    ]);
}

    public function admincreate()
    {
        // Only allow Admin or Enforcer
       $user = Auth::user();

        // Fetch categories and tags
        $categories = BlogCategory::all(['id', 'name']);
        $tags = BlogTag::all(['id', 'name']);

        return inertia('cms/AdminBlogCreatePage', [
            'categories' => $categories,
            'tags' => $tags,
            'user' => $user,
        ]);
    }
    // List posts with optional search/filter
    public function index(Request $request)
    {
        $query = BlogPost::with(['author', 'category', 'tags', 'comments']);

        if ($search = $request->query('search')) {
            $query->whereFullText(['title', 'content'], $search);
        }

        if ($category = $request->query('category')) {
            $query->where('category_id', $category);
        }

        return response()->json($query->orderBy('created_at', 'desc')->paginate(10));
    }

    // Store post
 public function store(StoreBlogPostRequest $request)
{
    $data = $request->validated();
    $data['author_id'] = auth()->id();

    // Create post
    $post = BlogPost::create($data);

    if (!empty($data['tags'])) {
        $tagIds = collect($data['tags'])->map(function ($tag) {
            if (is_numeric($tag)) {
                if ($tag > 0) {
                    // existing tag ID
                    return intval($tag);
                } else {
                    // temporary negative ID from frontend -> create new
                    return BlogTag::firstOrCreate(
                        ['slug' => \Str::slug($tag)],
                        ['name' => $tag]
                    )->id;
                }
            }

            // string tag -> create if not exist
            $newTag = BlogTag::firstOrCreate(
                ['slug' => \Str::slug($tag)],
                ['name' => $tag]
            );

            return $newTag->id;
        })->filter()->toArray();

        $post->tags()->sync($tagIds);
    }

    // Check if the category is DA, Announcement, or Program
    $category = $post->category;
    $eventTypes = ['DA', 'Announcement', 'Program'];
    
    if (in_array($category->name, $eventTypes)) {
        // Combine date and time for proper datetime
        $eventDateTime = null;
        if (!empty($data['event_date'])) {
            $eventDateTime = $data['event_date'];
            if (!empty($data['event_start_time'])) {
                $eventDateTime = $data['event_date'] . ' ' . $data['event_start_time'];
            }
        }
        
        $endDateTime = null;
        if (!empty($data['event_date']) && !empty($data['event_end_time'])) {
            $endDateTime = $data['event_date'] . ' ' . $data['event_end_time'];
        }
        
        // Create event record with type 'da_program'
        Event::create([
            'title' => $post->title,
            'date' => $eventDateTime ?: now(),
            'description' => $data['event_description'] ?? '',
            'type' => 'da_program',
            'is_global' => $data['is_global'] ?? false,
            'year' => now()->year,
            'added_by' => auth()->id(),
            'start_time' => $eventDateTime ?: now(),
            'end_time' => $endDateTime ?: now()->addHours(1),
            'blog_id' => $post->id,
        ]);

        // 🔔 NOTIFICATION: Send notification to ALL farmer users
        $this->sendNotificationToAllFarmers($post, $category->name);
    }

    return response()->json([
        'id' => $post->id,
        'title' => $post->title,
        'slug' => $post->slug,
        'message' => 'Post created successfully' . (in_array($category->name, $eventTypes) ? ' and event recorded' : '')
    ]);
}



 /**
 * Send notification to all farmer users
 * 
 * @param BlogPost $post
 * @param string $categoryName
 * @return void
 */
protected function sendNotificationToAllFarmers($post, $categoryName)
{
    $actor = auth()->user();
    
    // Customize message based on category
    $message = match($categoryName) {
        'DA' => "📢 DA Announcement: {$post->title}",
        'Announcement' => "📣 New Announcement: {$post->title}",
        'Program' => "🎯 New Program: {$post->title}",
        default => "New {$categoryName}: {$post->title}"
    };
    
    // Add event details if available
    if (!empty($post->event_date)) {
        $eventDate = \Carbon\Carbon::parse($post->event_date)->format('M d, Y');
        $message .= " on {$eventDate}";
        
        if (!empty($post->event_start_time)) {
            $startTime = \Carbon\Carbon::parse($post->event_start_time)->format('g:i A');
            $message .= " at {$startTime}";
        }
    }

    $totalSent = 0;
    
    // Process farmers in chunks to avoid memory issues
    User::where('role', 'farmer')->chunk(100, function ($farmers) use ($post, $actor, $message, &$totalSent) {
        foreach ($farmers as $farmer) {
            // Create each notification individually to trigger the created event
            ImosNotification::create([
                'user_id' => $farmer->id,
                'actor_id' => $actor->id,
                'type' => 'announcement',
                'action' => 'announcement_created',
                'message' => $message,
                'url' => "/cms/blog/{$post->slug}",
                'is_read' => false,
            ]);
            $totalSent++;
        }
    });
    
    \Log::info("Sent {$totalSent} notifications for post: {$post->title}");
}

    // Show single post
    public function show(BlogPost $post)
    {
        return response()->json($post->load(['author', 'category', 'tags', 'comments.user']));
    }
// app/Http/Controllers/BlogPostController.php

public function edit($id)
{
    $post = BlogPost::with('tags', 'category')->findOrFail($id);

    $categories = BlogCategory::all(['id', 'name']);
    $tags = BlogTag::all(['id', 'name']); // all tags for selection

  return inertia('cms/BlogEdit', [
   'post' => [
    'id' => $post->id,
    'title' => $post->title,
    'slug' => $post->slug,
    'content' => $post->content,
    'category_id' => $post->category_id,
    'tags' => $post->tags, // full objects with id & name
    'state'=>$post->state,
],

    'categories' => BlogCategory::all(['id', 'name']),
    'allTags'    => BlogTag::all(['id', 'name']), // for lookup and adding new tags
]);

}

public function update(UpdateBlogPostRequest $request, $id)
{
    $post = BlogPost::findOrFail($id);
    $data = $request->validated();

    // Generate unique slug
    $slug = Str::slug($data['title']);
    $originalSlug = $slug;
    $counter = 1;
    while (BlogPost::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
        $slug = $originalSlug . '-' . $counter++;
    }

    // Update main fields
    $post->update([
        'title'       => $data['title'],
        'slug'        => $slug,
        'content'     => $data['content'],
        'status'      => $data['status'] ?? 'draft',
        'category_id' => $data['category_id'] ?? null,
        'thumbnail'   => $data['thumbnail'] ?? $post->thumbnail, // update thumbnail if sent
          'state'     => $data['state'],
    ]);

    // Handle tags
    if (!empty($data['tags'])) {
        $tagIds = collect($data['tags'])->map(function ($tag) {
            if (is_numeric($tag) && $tag > 0) return intval($tag);

            // Negative ID or string → create if not exist
            return BlogTag::firstOrCreate(
                ['slug' => Str::slug($tag)],
                ['name' => $tag]
            )->id;
        })->filter()->toArray();

        // Sync tags: replace old with new
        $post->tags()->sync($tagIds);
    }

    return response()->json(
        $post->fresh()->load(['author', 'category', 'tags'])
    );
}


    // Update post
    public function updates(UpdateBlogPostRequest $request, BlogPost $post)
    {
        $data = $request->validated();
        $post->update($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        return response()->json($post->load(['author', 'category', 'tags']));
    }

    // Delete post
public function destroy($id, Request $request)
{
    $post = BlogPost::findOrFail($id);
    
    // Delete the post (this will trigger the deleteImages method via the model)
    $post->delete();

    return response()->json([
        'success' => true,
        'message' => 'Blog post and associated images deleted successfully!',
        'post_id' => $id,
    ]);
}

// Optional: Add a force delete method for permanent deletion
public function forceDestroy($id)
{
    $post = BlogPost::withTrashed()->findOrFail($id);
    $post->forceDeleteWithImages();
    
    return response()->json([
        'success' => true,
        'message' => 'Blog post permanently deleted!',
    ]);
}

public function publicShow($slug)
{
    $post = BlogPost::where('slug', $slug)
        ->with(['author', 'category', 'tags', 'comments.user'])
        ->withCount('likes') // This adds likes_count attribute
        ->firstOrFail();

    // Check if the authenticated user has liked this post
    $user = auth()->user();
    $isLiked = false;
    
    if ($user) {
        $isLiked = $post->likes()->where('user_id', $user->id)->exists();
    }

    return inertia('cms/BlogShow', [
        'post' => [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'comments' => $post->comments,
            'author' => $post->author,
            'likes_count' => $post->likes_count, // Now available from withCount
        ],
        'auth' => [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
            ] : null,
        ],
        'initialLiked' => $isLiked, // Pass initial like status
    ]);
}

// 5120

public function uploadImage(Request $request) {
    $request->validate(['file' => 'required|image|max:5620']);
    $path = $request->file('file')->store('uploads', 'public');
    return response()->json(['url' => "/storage/{$path}"]);
}
 public function storeImage(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,webp,avif,svg|max:10240'
        ]);

        $file = $request->file('file');

        $filename = Str::random(20).'_'.time().'.'.$file->getClientOriginalExtension();

        // stores to storage/app/public/uploads
        $path = $file->storeAs('uploads', $filename, 'public');

        // publicly accessible URL -> /storage/uploads/filename.ext
        $url = Storage::disk('public')->url($path);

        return response()->json([
            'key'  => $path,
            'url'  => url($url),
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'type' => $file->getMimeType(),
            'appUrl' => url($url),
        ]);
    }

      public function __invoke()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect('/login');
        }

        switch ($user->role) {
            case 'admin':
            case 'enforcer':
                return redirect('/admin/dashboard');

            case 'farmer':
                return redirect('/farmer/home');

            case 'buyer':
                return redirect('/marketplace');

            default:
                return redirect('/'); // fallback
        }
    }

}
