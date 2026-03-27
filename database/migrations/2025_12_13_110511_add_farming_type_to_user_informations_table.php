<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('user_informations', function (Blueprint $table) {
           $table->enum('farming_type', ['backyard', 'commercial'])
      ->nullable()
      ->after('street');

            // adjust 'after()' to the column you prefer
        });
    }

    public function down(): void
    {
        Schema::table('user_informations', function (Blueprint $table) {
            $table->dropColumn('farming_type');
        });
    }
};
