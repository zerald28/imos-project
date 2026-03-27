<?php

namespace App\Models\CMS;



use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BlogComment extends Model
{
    use HasFactory;

    protected $fillable = ['post_id', 'user_id', 'content'];

    // The post this comment belongs to
    public function post()
    {
        return $this->belongsTo(BlogPost::class, 'post_id');
    }

    // The user who made the comment
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

