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

        // Add cover_type (string)
        $table->string('cover_type')->nullable()->after('purpose');

        // Add proponent (foreign key referencing users.id)
        $table->foreignId('proponent')
              ->nullable()
              ->constrained('users')
              ->onDelete('cascade')
              ->after('assignee_contact');
              $table->string('farmer_name')->nullable()->after('farmer_id');
               $table->string('proponent_name')->nullable()->after('proponent');
            
    });
}

public function down()
{
    Schema::table('livestock_insurance_applications', function (Blueprint $table) {

        // Drop foreign key + column
        $table->dropForeign(['proponent']);
        $table->dropColumn('proponent');

        // Drop cover_type
        $table->dropColumn('cover_type');
    });
}

};
