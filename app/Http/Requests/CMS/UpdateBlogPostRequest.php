<?php

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogPostRequest extends FormRequest
{
public function authorize(): bool
{
    $postId = $this->route('id'); // <--- also fix here
    $post = \App\Models\CMS\BlogPost::find($postId);

    return $post && auth()->check() && (auth()->user()->role === 'admin' || auth()->id() === $post->author_id);
}



   public function rules(): array
{
    $postId = $this->route('id'); // <--- Use 'id' here

    return [
        'title'       => 'required|string|max:255',
        'slug'        => [
            'required',
            'string',
            'max:255',
            Rule::unique('blog_posts', 'slug')->ignore($postId),
        ],
        'category_id' => 'nullable|exists:blog_categories,id',
        'content'     => 'required|array',
        'tags'        => 'sometimes|array',
        'tags.*'      => 'exists:blog_tags,id',
      'status'      => 'required|in:draft,published,restricted', // updated to include restricted
      'thumbnail' => 'nullable|string',
      'state' => 'nullable|string'
    ];
}

}
