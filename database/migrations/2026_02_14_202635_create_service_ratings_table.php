<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('service_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('livestock_services')->onDelete('cascade');
            $table->foreignId('reviewer_id')->constrained('users')->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned()->comment('1-5 stars');
            $table->text('comment')->nullable();
            $table->timestamps();
            
            // Ensure a user can only rate a service once
            $table->unique(['service_id', 'reviewer_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_ratings');
    }
};