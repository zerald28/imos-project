<?php
// File: app/Models/PDF/VeterinaryDiseaseReport.php

namespace App\Models\PDF;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Add this import

class VeterinaryDiseaseReport extends Model
{
    use HasFactory;

    protected $table = 'veterinary_disease_reports';

    protected $fillable = [
        // Basic policy info
        'veterinary_id',
        'policy_holder',
        'address',
        'province',
        'contact_no',
        'policy_no',

        // Q1
        'q1a_called_date',
        'q1a_called_time',
        'q1b_examined_date',
        'q1b_examined_time',

        // Q2
        'q2_preliminary_report',

        // Q3
        'q3a_temperature',
        'q3a_breathing',
        'q3a_pulse',
        'q3b_disease_stage',
        'q3c_lameness_position_degree',
        'q3d_nourishment_state',
        'q3e_diagnostic_aids',

        // Q4
        'q4_diagnosis',

        // Q5
        'q5a_cure_possible',
        'q5b_cure_time',
        'q5c_hospital_cure_possible',

        // Q6
        'q6a_treatment_given',
        'q6b_special_instructions',
        'q6c_visits_count',
        'q6c_visits_dates',

        // Q7
        'q7_cause_of_disease',

        // Q8
        'q8a_very_sick_before',
        'q8b_symptoms_recognizable_time',
        'q8c_first_aid_effective',
        'q8d_previous_treatment_details',

        // Q9
        'q9a_connection_previous_disease',
        'q9b_previous_disease_treatment_details',

        // Q10
        'q10_other_defects',

        // Q11
        'q11_instructions_followed',

        // Q12
        'q12_intentional_destruction_needed',
        'q12a_slaughter_economical',
        'q12b_slaughter_value',

        // Q13
        'q13_future_use',

        // Q14
        'q14_remarks',
        'signed_at_location',
        'signed_at_date',
        'veterinarian_name',
        'stamp_data',
    ];

    protected $casts = [
        // Booleans
        'q5a_cure_possible' => 'boolean',
        'q5c_hospital_cure_possible' => 'boolean',
        'q8a_very_sick_before' => 'boolean',
        'q8c_first_aid_effective' => 'boolean',
        'q9a_connection_previous_disease' => 'boolean',
        'q11_instructions_followed' => 'boolean',
        'q12_intentional_destruction_needed' => 'boolean',
        'q12a_slaughter_economical' => 'boolean',
        'q12b_slaughter_value' => 'boolean',

        // JSON
        'q6c_visits_dates' => 'array',
        'stamp_data' => 'array',

        // Dates
        'q1a_called_date' => 'date',
        'q1b_examined_date' => 'date',
        'signed_at_date' => 'date',

        // Times
        'q1a_called_time' => 'string',
        'q1b_examined_time' => 'string',
    ];

    /**
     * Get the veterinarian (user) who created this report
     */
    public function veterinarian()
    {
        return $this->belongsTo(User::class, 'veterinary_id');
    }

    /**
     * Get the animals associated with this report
     */
    public function animals()
    {
        return $this->hasMany(LivestockAnimal::class, 'veterinary_report_id');
    }

    /**
     * Get the insurance signatures for this report
     */
    public function insuranceSignatures()
    {
        return $this->hasMany(\App\Models\InsuranceSignature::class, 'veterinary_disease_report_id');
    }

    /**
     * Helper method to get the veterinarian's full name
     */
    public function getVeterinarianFullNameAttribute()
    {
        if (!$this->veterinarian || !$this->veterinarian->userInformation) {
            return $this->veterinarian_name; // Fallback to the stored name
        }
        
        $info = $this->veterinarian->userInformation;
        return trim($info->firstname . ' ' . $info->middlename . ' ' . $info->lastname);
    }
}