<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('livestock_services', function (Blueprint $table) {
            $table->foreignId('blog_post_id')
                  ->nullable()
                  ->constrained('blog_posts')
                  ->nullOnDelete()
                  ->after('location');
        });
    }

    public function down()
    {
        Schema::table('livestock_services', function (Blueprint $table) {
            $table->dropForeign(['blog_post_id']);
            $table->dropColumn('blog_post_id');
        });
    }
};