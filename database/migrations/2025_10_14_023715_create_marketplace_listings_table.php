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
        Schema::create('marketplace_listings', function (Blueprint $table) {
               $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
           $table->enum('category', ['breeder', 'piglet', 'fattening'])->default('fattening');
            $table->string('breed')->nullable(); // 🆕 main breed indicator
            $table->text('description')->nullable();
            $table->decimal('price_per_unit', 10, 2);
            $table->enum('price_unit_type', ['per_head', 'per_kg'])->default('per_head');
            $table->string('image')->nullable();
         

             // 🏠 Address fields (with proper FK references)
    $table->foreignId('province_id')->nullable()->constrained('provinces')->nullOnDelete();
    $table->foreignId('municipal_id')->nullable()->constrained('municipals')->nullOnDelete();
    $table->foreignId('barangay_id')->nullable()->constrained('barangays')->nullOnDelete();
    $table->string('purok')->nullable();
    $table->string('street')->nullable();

             $table->string('sex_summary')->nullable();
    $table->string('age_range')->nullable();
             $table->unsignedInteger('available_quantity')->default(0); // 🆕 for quick filter

            $table->timestamps();
            $table->softDeletes();

            $table->index('seller_id');
$table->index('province_id');
$table->index('municipal_id');
$table->index('barangay_id');
$table->index('category');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_listings');
    }
};
