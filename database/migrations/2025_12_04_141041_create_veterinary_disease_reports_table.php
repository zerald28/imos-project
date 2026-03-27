<?php

// File: database/migrations/2025_01_01_000000_create_veterinary_disease_reports_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('veterinary_disease_reports', function (Blueprint $table) {
            $table->id();

            // Basic policy info
            $table->string('policy_holder');
            $table->text('address')->nullable();
            $table->string('province')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('policy_no')->nullable();

            // Question 1
            $table->date('q1a_called_date')->nullable();
            $table->time('q1a_called_time')->nullable();
            $table->date('q1b_examined_date')->nullable();
            $table->time('q1b_examined_time')->nullable();

            // Question 2
            $table->text('q2_preliminary_report')->nullable();

            // Question 3
            $table->string('q3a_temperature')->nullable();
            $table->string('q3a_breathing')->nullable();
            $table->string('q3a_pulse')->nullable();
            $table->string('q3b_disease_stage')->nullable(); // acute/chronic
            $table->text('q3c_lameness_position_degree')->nullable();
            $table->text('q3d_nourishment_state')->nullable();
            $table->text('q3e_diagnostic_aids')->nullable();

            // Question 4
            $table->text('q4_diagnosis')->nullable();

            // Question 5
            $table->boolean('q5a_cure_possible')->nullable();
            $table->string('q5b_cure_time')->nullable();
            $table->boolean('q5c_hospital_cure_possible')->nullable();

            // Question 6
            $table->text('q6a_treatment_given')->nullable();
            $table->text('q6b_special_instructions')->nullable();
            $table->integer('q6c_visits_count')->nullable();
            $table->json('q6c_visits_dates')->nullable();

            // Question 7
            $table->text('q7_cause_of_disease')->nullable();

            // Question 8
            $table->boolean('q8a_very_sick_before')->nullable();
            $table->text('q8b_symptoms_recognizable_time')->nullable();
            $table->boolean('q8c_first_aid_effective')->nullable();
            $table->text('q8d_previous_treatment_details')->nullable();

            // Question 9
            $table->boolean('q9a_connection_previous_disease')->nullable();
            $table->text('q9b_previous_disease_treatment_details')->nullable();

            // Question 10
            $table->text('q10_other_defects')->nullable();

            // Question 11
            $table->boolean('q11_instructions_followed')->nullable();

            // Question 12
            $table->boolean('q12_intentional_destruction_needed')->nullable();
            $table->boolean('q12a_slaughter_economical')->nullable();
            $table->boolean('q12b_slaughter_value')->nullable();

            // Question 13
            $table->text('q13_future_use')->nullable();

            // Question 14
            $table->text('q14_remarks')->nullable();
            $table->string('signed_at_location')->nullable();
            $table->date('signed_at_date')->nullable();
            $table->string('veterinarian_name')->nullable();
            $table->json('stamp_data')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('veterinary_disease_reports');
    }
};
