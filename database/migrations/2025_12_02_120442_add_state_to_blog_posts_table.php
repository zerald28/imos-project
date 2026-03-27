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
        Schema::table('blog_posts', function (Blueprint $table) {
        $table->enum('state', ['pending', 'approve'])
              ->default('pending')
              ->after('status'); // or place wherever you want
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('blog_posts', function (Blueprint $table) {
        $table->dropColumn('state');
    });
    }
};
