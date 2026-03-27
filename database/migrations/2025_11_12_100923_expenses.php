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
       Schema::create('expenses', function (Blueprint $table) {
    $table->id();

    // Who owns this expense
    $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();

    // Optional group association
    $table->foreignId('swine_group_id')->nullable()->constrained('swine_groups')->cascadeOnDelete();

    // Expense details
    $table->enum('category', [
        'feed', 'medicine', 'labor', 'utilities',
        'maintenance', 'equipment', 'transportation', 'other'
    ])->default('other');

    $table->text('description')->nullable();
    $table->decimal('amount', 10, 2);
    $table->decimal('quantity', 10, 2)->nullable();
    $table->string('unit')->nullable();
    $table->date('date')->useCurrent();

    $table->timestamps();
});

Schema::create('swine_expenses', function (Blueprint $table) {
    $table->id();

    $table->foreignId('expense_id')->constrained('expenses')->cascadeOnDelete();
    $table->foreignId('swine_id')->constrained('swine')->cascadeOnDelete();

    // Optional additional tracking fields
    $table->decimal('individual_share', 10, 2)->nullable(); // e.g., share of total cost per swine
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
         Schema::dropIfExists('swine_expenses');
    }
};
