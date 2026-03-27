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
        Schema::table('swine_requests', function (Blueprint $table) {
            // Add 'final_amount' field to store the total cost or agreed price for the request
            // Use decimal for currency to maintain precision (12 digits, 2 decimal places)
            $table->decimal('final_amount', 12, 2)->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('swine_requests', function (Blueprint $table) {
            $table->dropColumn('final_amount');
        });
    }
};
