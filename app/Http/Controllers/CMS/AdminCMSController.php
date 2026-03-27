<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CMS\BlogPost;
use App\Models\ImosNotification;
use Inertia\Inertia;
use App\Models\User;
use Auth;

class AdminCMSController extends Controller
{
  public function index(Request $request)
{
    $user = Auth::user();

    // Base query
    $otherAuthorsQuery = BlogPost::with('author')
        ->whereHas('author', fn ($q) =>
            $q->whereNotIn('role', ['admin', 'enforcer'])
        );

    // Apply search filter
    if ($request->search) {
        $search = $request->search;
        $otherAuthorsQuery->where(function ($q) use ($search) {
            $q->where('title', 'LIKE', "%{$search}%")
              ->orWhereHas('author', fn ($a) => 
                  $a->where('name', 'LIKE', "%{$search}%")
              );
        });
    }

    // Filter by status
    if ($request->status && $request->status !== 'all') {
        $otherAuthorsQuery->where('status', $request->status);
    }

    // Filter by state
    if ($request->state && $request->state !== 'all') {
        $otherAuthorsQuery->where('state', $request->state);
    }

    // Filter by author
    if ($request->author && $request->author !== 'all') {
        $otherAuthorsQuery->where('author_id', $request->author);
    }

    // Get results
    $otherAuthors = $otherAuthorsQuery->latest()->get();

    return Inertia::render('cms/AdminBlog', [
        'adminEnforcerPosts' => BlogPost::with('author')
            ->whereHas('author', fn ($q) =>
                $q->whereIn('role', ['admin', 'enforcer'])
            )
            ->latest()->get(),

        'otherAuthorPosts' => $otherAuthors,

        'authorsList' => User::whereNotIn('role', ['admin', 'enforcer'])
            ->select('id', 'name')->get(),

        'authUser' => $user,
    ]);
}



 public function updateStatus(Request $request, $id)
{
    $post = BlogPost::findOrFail($id);
    $user = auth()->user();

    // Only admin or enforcer can update other authors
    if (!in_array($user->role, ['admin', 'enforcer'])) {
        abort(403);
    }

    $action = $request->action;
    $oldStatus = $post->status;
    $oldState = $post->state;

    if ($action === 'toggle_restrict') {
        // Toggle between restricted and published
        $newStatus = $post->status === 'restricted' ? 'published' : 'restricted';
        $post->status = $newStatus;
        $post->save();

        // 🔔 NOTIFICATION: Notify the author about status change
        $this->sendBlogPostStatusNotification($post, $user, $newStatus, 'status');

        return back()->with('success', 'Post status updated.');
    }

    if ($action === 'approve') {
        // Approve the post (state)
        $post->state = 'approve';
        $post->save();

        // 🔔 NOTIFICATION: Notify the author about approval
        $this->sendBlogPostStatusNotification($post, $user, 'approve', 'state');

        return back()->with('success', 'Post state approved.');
    }

    return back()->with('error', 'Invalid action.');
}

/**
 * Send notification to blog post author about status/state change
 * 
 * @param BlogPost $post
 * @param User $actor
 * @param string $newValue
 * @param string $type ('status' or 'state')
 * @return void
 */
protected function sendBlogPostStatusNotification($post, $actor, $newValue, $type)
{
    $author = $post->author;
    
    // Don't send notification if author is the same as actor
    if ($author->id === $actor->id) {
        return;
    }

    // Determine the notification message based on the action
    if ($type === 'status') {
        if ($newValue === 'published') {
            $message = "📢 Your blog post \"{$post->title}\" has been published and is now visible to the public.";
            $action = 'post_published';
        } else {
            $message = "⚠️ Your blog post \"{$post->title}\" has been restricted and is no longer publicly visible.";
            $action = 'post_restricted';
        }
    } else { // state change (approve)
        $message = "✅ Your blog post \"{$post->title}\" has been approved by {$actor->name}.";
        $action = 'post_approved';
    }

    // Create notification for the author
    ImosNotification::create([
        'user_id' => $author->id,
        'actor_id' => $actor->id,
        'type' => 'blog',
        'action' => $action,
        'message' => $message,
        'url' => "/cms/blog/{$post->slug}",
        'is_read' => false,
    ]);

    \Log::info("Notification sent to author {$author->name} for post: {$post->title} - Action: {$action}");
}


    // delete
    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);

        $user = Auth::user();

        if ($user->role !== 'admin' &&
            $user->role !== 'enforcer' &&
            $post->author_id !== $user->id
        ) {
            abort(403, 'Not authorized to delete this post.');
        }

        $post->delete();

        return back()->with('success', 'Post deleted.');
    }

    // app/Http/Controllers/CMS/BlogPostController.php

public function homeFeatured()
{
    // replace 1 with the ID of the blog post you want to show
    $post = BlogPost::findOrFail(1);

    return inertia('cms/BlogStatic', [
        'content' => $post->content, // only send PlateJS content
    ]);
}

public function welcomePage()
{
    $post = BlogPost::findOrFail(1);
    
    // Get statistics
    $stats = [];
    
    // Farmers registered (only if user is logged in and role is farmer, otherwise show general count)
    if (auth()->check() && auth()->user()->role === 'farmer') {
        $stats['farmers_registered'] = User::where('role', 'farmer')->count();
    } else {
        $stats['farmers_registered'] = User::where('role', 'farmer')->count(); // Still show count but maybe with different label
    }
    
    // Insurance applications total
    $stats['insurance_applications'] = \App\Models\PDF\LivestockInsuranceApplication::count();
    
    // Marketplace available listings (swine with status 'available')
    $stats['marketplace_available'] = \App\Models\Marketplace\ListingSwine::where('status', 'available')->count();

    return inertia('welcome', [
        'blogContent' => $post->content, // PlateJS JSON
        'stats' => $stats, // Pass stats to frontend
    ]);
}


}
