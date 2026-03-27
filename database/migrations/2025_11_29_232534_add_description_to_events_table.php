<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
               $table->foreignId('blog_id')
                  ->nullable()
                  ->constrained('blog_posts')
                  ->nullOnDelete()
                  ->after('description');
                   $table->text('description')->nullable()->after('title');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
             $table->dropForeign(['blog_id']);
            $table->dropColumn('blog_id');
            $table->dropColumn('description');
        });
    }
};
