<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('livestock_services', function (Blueprint $table) {
            $table->string('location')->nullable()->after('category')
                ->comment('Location of the service provider (no FK)');
        });
    }

    public function down(): void
    {
        Schema::table('livestock_services', function (Blueprint $table) {
            $table->dropColumn('location');
        });
    }
};
