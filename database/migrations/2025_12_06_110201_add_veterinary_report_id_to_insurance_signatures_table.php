<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('insurance_signatures', function (Blueprint $table) {
            $table->foreignId('veterinary_disease_report_id')
                ->nullable()
                ->after('application_id')
                ->constrained('veterinary_disease_reports')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('insurance_signatures', function (Blueprint $table) {
            $table->dropForeign(['veterinary_disease_report_id']);
            $table->dropColumn('veterinary_disease_report_id');
        });
    }
};
