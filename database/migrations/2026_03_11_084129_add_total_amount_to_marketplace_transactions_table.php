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
        Schema::table('marketplace_transactions', function (Blueprint $table) {
            $table->decimal('price_per_unit', 10, 2)->after('amount')->nullable();
            $table->string('price_unit_type')->after('price_per_unit')->nullable();;
            $table->decimal('total_weight', 10, 2)->nullable()->after('quantity');
            $table->decimal('total_amount', 15, 2)->nullable()->after('price_unit_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('marketplace_transactions', function (Blueprint $table) {
            $table->dropColumn([
                'price_per_unit', 
                'price_unit_type', 
                'total_weight', 
                'total_amount'
            ]);
        });
    }
};