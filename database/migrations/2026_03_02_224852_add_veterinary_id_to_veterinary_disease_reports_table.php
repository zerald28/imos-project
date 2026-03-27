<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('veterinary_disease_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('veterinary_id')->nullable()->after('id');
            $table->foreign('veterinary_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('veterinary_disease_reports', function (Blueprint $table) {
            $table->dropForeign(['veterinary_id']);
            $table->dropColumn('veterinary_id');
        });
    }
};