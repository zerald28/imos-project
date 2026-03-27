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
      Schema::create('swine_requests', function (Blueprint $table) {
    $table->id();
    $table->foreignId('listing_swine_id')
          ->constrained('listing_swine', 'id')
          ->onDelete('cascade');
    $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
    $table->string('contact');
    $table->string('email');
    $table->string('address');
    $table->enum('type', ['purchase', 'reservation']);
    $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
    $table->timestamps();
});



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('swine_request');
    }
};
