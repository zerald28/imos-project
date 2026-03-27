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
        Schema::create('direct_sales', function (Blueprint $table) {
            $table->id();

            // Farmer who made the sale
            $table->foreignId('farmer_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Optional swine reference (inventory-based sale)
            $table->foreignId('swine_id')
                ->nullable()
                ->constrained('swine')
                ->nullOnDelete();

            // Financials
            $table->decimal('price', 10, 2); // price per unit
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('total_amount', 10, 2);

            // Sale info
            $table->date('sold_at');
            $table->string('buyer_name')->nullable(); // optional real-world buyer
            $table->string('payment_method')->nullable(); // cash, gcash, etc.
            $table->text('notes')->nullable();

            $table->timestamps();

            // Indexes for performance
            $table->index(['farmer_id', 'sold_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direct_sales');
    }
};
