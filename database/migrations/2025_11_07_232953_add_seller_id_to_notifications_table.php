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
         Schema::table('notifications', function (Blueprint $table) {
        $table->unsignedBigInteger('seller_id')->nullable()->after('buyer_id');
        $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
        
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            //
        });
    }
};
