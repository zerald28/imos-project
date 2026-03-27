<?php

namespace App\Models\CMS;




use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogTag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

      public $timestamps = false; // <-- disable timestamps

    // A tag belongs to many posts
    public function posts()
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tag', 'tag_id', 'post_id');
    }

}
