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
        Schema::table('marketplace_listings', function (Blueprint $table) {

            // ✅ Add nullable column first (safe for existing data)
            $table->foreignId('vetmed_clearance_id')
                ->nullable()
                ->after('seller_id');

            // ✅ Add foreign key constraint
            $table->foreign('vetmed_clearance_id')
                ->references('id')
                ->on('vetmed_clearances')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('marketplace_listings', function (Blueprint $table) {

            // Drop FK first
            $table->dropForeign(['vetmed_clearance_id']);

            // Then drop column
            $table->dropColumn('vetmed_clearance_id');
        });
    }
};