<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /* -----------------------------------------
        | 1. Blog Categories
        |------------------------------------------*/
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        /* -----------------------------------------
        | 2. Blog Posts
        |------------------------------------------*/
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();

            $table->string('title')->index();
            $table->string('slug')->unique();

            $table->longText('content');

            $table->foreignId('author_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('category_id')
                ->nullable()
                ->constrained('blog_categories')
                ->nullOnDelete();

           $table->enum('status', ['draft', 'published', 'restricted', 'archived'])->default('draft');


            $table->timestamps();
            $table->softDeletes(); // Optional: undelete posts

            // Enable if using MySQL full-text search:
            $table->fullText(['title', 'content']);
        });

        /* -----------------------------------------
        | 3. Blog Tags
        |------------------------------------------*/
        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            // $table->timestamps();
        });

        /* -----------------------------------------
        | 4. Blog Post - Tag Pivot (with timestamps)
        |------------------------------------------*/
        Schema::create('blog_post_tag', function (Blueprint $table) {
            $table->foreignId('post_id')
                ->constrained('blog_posts')
                ->onDelete('cascade');

            $table->foreignId('tag_id')
                ->constrained('blog_tags')
                ->onDelete('cascade');

            $table->primary(['post_id', 'tag_id']);

            // Optional timestamps (helps track tagging history)
            // $table->timestamps();
        });

        /* -----------------------------------------
        | 5. Blog Comments
        |------------------------------------------*/
        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('post_id')
                ->constrained('blog_posts')
                ->onDelete('cascade');

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->text('content');

            $table->timestamps();
            // $table->softDeletes(); // Optional undelete comments

            // Improve speed when loading comments per post
            $table->index('post_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_post_tag');
        Schema::dropIfExists('blog_comments');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('blog_categories');
    }
};
