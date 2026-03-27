<?php

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogPostRequest extends FormRequest
{
   public function authorize(): bool
{
    return auth()->check() && in_array(auth()->user()->role, [
        'admin',
        'farmer',
        'enforcer'
    ]);
}


  public function rules(): array
{
    return [
        'title' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:blog_posts,slug',
        'content' => 'required|array',
        'category_id' => 'required|exists:blog_categories,id',
        'tags' => 'nullable|array',
        'tags.*' => 'sometimes', // allow any value (existing ID or string)
         'status'      => 'required|in:draft,published,restricted', // updated to include restricted
         'thumbnail' => 'nullable|string',
         
  'event_date' => 'nullable|date',
            'event_start_time' => 'nullable|date_format:H:i',
            'event_end_time' => 'nullable|date_format:H:i',
            'is_global' => 'nullable|boolean',
            'event_description' => 'nullable|string|max:500', // Add event description
    ];
}

}
