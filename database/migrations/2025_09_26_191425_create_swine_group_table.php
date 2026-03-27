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
       // swine_groups
Schema::create('swine_groups', function (Blueprint $table) {
    $table->id();
    $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
    $table->string('name');
    $table->text('description')->nullable();
    $table->enum('group_type', ['feeding', 'breeding', 'scheduling','quarantine', 'expense-sharing'])->default('feeding');
    $table->timestamps();

    
});

// swine_group_members
Schema::create('swine_group_members', function (Blueprint $table) {
    $table->id();
    $table->foreignId('swine_group_id')->constrained('swine_groups')->cascadeOnDelete();
    $table->foreignId('swine_id')->constrained('swine')->cascadeOnDelete();
    $table->timestamp('joined_at')->useCurrent();
    $table->timestamp('left_at')->nullable();
    $table->timestamps();
      // Ensure a swine cannot join the same group twice
    $table->unique(['swine_group_id', 'swine_id']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('swine_group');
         Schema::dropIfExists('swine_group_members');
    }
};
