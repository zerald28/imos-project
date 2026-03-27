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
        Schema::table('livestock_animals', function (Blueprint $table) {
              // Add new foreign key column for swine/livestock table
        $table->foreignId('livestock_id')
              ->nullable()
              ->constrained('swine')
              ->onDelete('cascade')
              ->after('application_id');
   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('livestock_animals', function (Blueprint $table) {
        $table->dropForeign(['livestock_id']);
        $table->dropColumn('livestock_id');
    });
    }
};
