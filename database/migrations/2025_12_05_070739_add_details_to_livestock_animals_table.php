<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('livestock_animals', function (Blueprint $table) {
               $table->unsignedBigInteger('veterinary_report_id')->nullable()->after('application_id');

            // Assuming veterinary_disease_reports has id as PK
            $table->foreign('veterinary_report_id')
                  ->references('id')
                  ->on('veterinary_disease_reports')
                  ->onDelete('set null'); // optional: set null if report deleted
        
            $table->string('genus')->nullable();
            $table->string('species')->nullable();
            $table->string('name')->nullable();
            $table->string('basic_color')->nullable();
            $table->string('identifying_marks')->nullable();
            $table->string('brand_tattoo')->nullable(); // combine brand, tattoo, earmark no.
            $table->decimal('live_weight', 8, 2)->nullable(); // in kg
        });
    }

    public function down(): void
    {
        Schema::table('livestock_animals', function (Blueprint $table) {
            $table->dropColumn([
                'genus',
                'species',
                'name',
                'basic_color',
                'identifying_marks',
                'brand_tattoo',
                'veterinary_report_id',
                'live_weight'
            ]);
              $table->dropForeign(['veterinary_report_id']);
           
        });
    }
};
