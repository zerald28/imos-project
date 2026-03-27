<?php
// app/Models/CMS/BlogPost.php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

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
}