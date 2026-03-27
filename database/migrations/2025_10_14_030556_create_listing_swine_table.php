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
        Schema::create('listing_swine', function (Blueprint $table) {
             $table->id();
            $table->foreignId('listing_id')->constrained('marketplace_listings')->onDelete('cascade');
             $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('swine_id')->constrained('swine')->onDelete('cascade');
            $table->enum('da_approval_status', ['approved', 'restrained'])->nullable();
            $table->text('da_remarks')->nullable();
           $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('status', ['available', 'reserved', 'sold_pending', 'sold', 'removed'])->default('available');
            $table->decimal('scaled_weight', 8, 2)->nullable();
            $table->string('estimated_weight')->nullable();
            $table->enum('sex', ['male', 'female'])->nullable();
            $table->date('birthdate')->nullable();
            $table->string('breed')->nullable();
             $table->text('remarks')->nullable();
            $table->string('thumbnail')->nullable();    
            $table->foreignId('reserved_by')->nullable()->constrained('users')->nullOnDelete();
             $table->boolean('is_reserved')->default(false);
            $table->timestamp('reservation_expires_at')->nullable();
            $table->timestamps();
            $table->index(['listing_id', 'status']);
            $table->index(['seller_id', 'status']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listing_swine');
    }
};
