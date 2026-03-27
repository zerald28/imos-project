<?php

namespace App\Models\CMS;
// File: app/Models/CMS/BlogCategory.php



use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    // A category has many posts
    public function posts()
    {
        return $this->hasMany(BlogPost::class, 'category_id');
    }
}
