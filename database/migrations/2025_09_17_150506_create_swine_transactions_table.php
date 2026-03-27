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
        Schema::create('swine_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('swine_id')
                ->constrained('swine')
                ->onDelete('cascade');

            $table->foreignId('from_owner_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('to_owner_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->enum('transaction_type', [
                'registration',
                'transfer',
                'sale',
                'death',
                'slaughter',
                'deactivation'
            ])->index();

            $table->text('notes')->nullable();

            $table->foreignId('performed_by_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();


            // ✅ Extra useful indexes
            $table->index(['swine_id', 'transaction_type']);        // all transactions for a swine by type
            $table->index(['transaction_type', 'created_at']);      // reports by type + timeframe
            $table->index(['from_owner_id', 'transaction_type']);   // transactions by old owner
            $table->index(['to_owner_id', 'transaction_type']);     // transactions by new owner
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('swine_transactions');
    }
};
