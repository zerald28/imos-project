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
        Schema::table('swine', function (Blueprint $table) {
            $table->uuid('seeder_batch')->nullable()->index();
        });

        Schema::table('marketplace_listings', function (Blueprint $table) {
            $table->uuid('seeder_batch')->nullable()->index();
        });

        Schema::table('listing_swine', function (Blueprint $table) {
            $table->uuid('seeder_batch')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('swine', function (Blueprint $table) {
            $table->dropColumn('seeder_batch');
        });

        Schema::table('marketplace_listings', function (Blueprint $table) {
            $table->dropColumn('seeder_batch');
        });

        Schema::table('listing_swine', function (Blueprint $table) {
            $table->dropColumn('seeder_batch');
        });
    }
};
