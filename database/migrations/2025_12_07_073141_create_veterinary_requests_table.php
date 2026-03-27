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
        Schema::create('veterinary_requests', function (Blueprint $table) {
    $table->id();
    $table->foreignId('animal_id')->constrained('livestock_animals')->cascadeOnDelete();
    $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // requester
    $table->string('title');
     $table->string('request_type');
    $table->text('description')->nullable();
    $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('veterinary_requests');
    }
};
