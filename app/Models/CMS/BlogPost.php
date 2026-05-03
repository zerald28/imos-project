<?php
// app/Models/CMS/BlogPost.php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class BlogPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'author_id',
        'category_id',
        'thumbnail',
        'status',
        'state'
    ];

    protected $casts = [
        'content' => 'array',
    ];

    // Author of the post
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Category of the post
    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    // Tags for the post
    public function tags()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag', 'post_id', 'tag_id');
    }

    // Comments for the post
    public function comments()
    {
        return $this->hasMany(BlogComment::class, 'post_id')->latest();
    }

    // Likes for the post
    public function likes()
    {
        return $this->hasMany(BlogLike::class, 'post_id');
    }

    // Check if post is liked by a specific user
    public function isLikedBy(User $user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    // Get likes count
    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }


// app/Models/CMS/BlogPost.php

// Add this relationship to get posts liked by a user
public function likedByUsers()
{
    return $this->belongsToMany(User::class, 'blog_likes', 'post_id', 'user_id')
                ->withTimestamps();
}

// Add a scope for posts liked by a specific user
public function scopeLikedByUser($query, $userId)
{
    return $query->whereHas('likes', function($q) use ($userId) {
        $q->where('user_id', $userId);
    });
}


    /**
     * Delete all images associated with this post
     */
    public function deleteImages()
    {
        // 1. Delete the thumbnail if it exists
        if ($this->thumbnail && Storage::disk('public')->exists($this->thumbnail)) {
            Storage::disk('public')->delete($this->thumbnail);
        }

        // 2. Extract and delete images from the content JSON
        $images = $this->extractImagesFromContent();
        
        foreach ($images as $imagePath) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }
    }

    /**
     * Extract all image URLs from the content JSON
     */
    protected function extractImagesFromContent()
    {
        $images = [];
        
        if (empty($this->content)) {
            return $images;
        }

        // Decode content if it's a string
        $content = is_string($this->content) 
            ? json_decode($this->content, true) 
            : $this->content;

        if (!is_array($content)) {
            return $images;
        }

        // Recursively find all image nodes
        $this->findImagesRecursively($content, $images);
        
        // Clean up URLs to get just the storage path
        return array_map(function($url) {
            // Remove domain and convert to storage path
            $parsedUrl = parse_url($url);
            $path = $parsedUrl['path'] ?? $url;
            
            // Remove /storage/ prefix to get actual path
            $path = preg_replace('#^/storage/#', '', $path);
            
            return $path;
        }, $images);
    }

    /**
     * Recursively search for image nodes in the content
     */
    protected function findImagesRecursively($nodes, &$images)
    {
        if (!is_array($nodes)) {
            return;
        }

        foreach ($nodes as $node) {
            // Check if this is an image node
            if (isset($node['type']) && $node['type'] === 'img' && isset($node['url'])) {
                $images[] = $node['url'];
            }
            
            // Recursively check children
            if (isset($node['children']) && is_array($node['children'])) {
                $this->findImagesRecursively($node['children'], $images);
            }
        }
    }

    /**
     * Override the delete method to clean up images
     */
    public function delete()
    {
        // Delete images before soft deleting the post
        $this->deleteImages();
        
        // Call the parent delete method (which handles soft delete)
        return parent::delete();
    }

    /**
     * Force delete with images (for permanent deletion)
     */
    public function forceDeleteWithImages()
    {
        $this->deleteImages();
        return parent::forceDelete();
    }

}