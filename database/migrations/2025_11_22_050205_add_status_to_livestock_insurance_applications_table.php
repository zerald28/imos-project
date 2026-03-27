<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('livestock_insurance_applications', function (Blueprint $table) {
        $table->enum('status', [
            'pending',
            'for_review',
            'approved',
            'rejected',
            'cancelled'
        ])->default('pending')->after('id');
    });
}

public function down()
{
    Schema::table('livestock_insurance_applications', function (Blueprint $table) {
        $table->dropColumn('status');
    });
}

};
