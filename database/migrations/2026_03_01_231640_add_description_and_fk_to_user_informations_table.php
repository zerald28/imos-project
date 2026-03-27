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
        Schema::table('user_informations', function (Blueprint $table) {

            // Add optional description field
            $table->text('description')
                ->nullable()
                ->after('farming_type')
                ->comment('Optional profile or farm description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_informations', function (Blueprint $table) {

            // Remove description column if rolled back
            $table->dropColumn('description');
        });
    }
};