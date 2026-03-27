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
        Schema::create('farmer_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rater_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('farmer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('transaction_id')->constrained('marketplace_transactions')->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned()->comment('Rating from 1 to 5 stars');
            $table->text('comment')->nullable();
            $table->timestamps();
            
            // Add unique constraint to ensure one rating per transaction per rater
            $table->unique(['transaction_id', 'rater_id'], 'unique_transaction_rating');
            
            // Add indexes for faster queries
            $table->index(['farmer_id', 'rating']);
            $table->index(['rater_id']);
            $table->index(['transaction_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_ratings');
    }
};