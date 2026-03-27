<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CMS\BlogPost;

class Event extends Model
{
    protected $fillable = [
        'title',
        'date',
        'description',
        'type',
        'is_global',
        'year',
        'added_by',
        'start_time',
        'end_time',
        'blog_id',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_global' => 'boolean',
    ];

    protected $appends = ['blog_slug']; // Add this to automatically include blog_slug in JSON

    public function blogPost()
    {
        return $this->belongsTo(BlogPost::class, 'blog_id');
    }

    public function author()
    {
        return $this->belongsTo(\App\Models\User::class, 'added_by');
    }

    public function getBlogSlugAttribute()
    {
        return $this->blogPost ? $this->blogPost->slug : null;
    }
}