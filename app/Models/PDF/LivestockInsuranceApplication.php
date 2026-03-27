<?php

namespace App\Models\PDF;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\InsuranceSignature;

class LivestockInsuranceApplication extends Model
{
    use HasFactory;

    // The table associated with the model (optional if follows convention)
    protected $table = 'livestock_insurance_applications';

    // Mass assignable attributes
  protected $fillable = [
    'status',
    'farmer_id',
    'farmer_name',
    'proponent',
    'proponent_name',
    'cover_type',
    'is_indigenous',
    'tribe',
    'is_pwd',
    'spouse_name',
    'address',
    'farm_address',
    'contact_no',
    'animal_type',
    'purpose',
    'number_of_heads',
    'source_of_stock',
    'no_of_housing_units',
    'birds_per_unit',
    'date_of_purchase',
    'desired_sum_insured',
    'total_sum_insured',
    'epidemic_1',
    'epidemic_2',
    'epidemic_3',
    'assignee',
    'assignee_address',
    'assignee_contact',
    'pdf_path',
];


    protected $casts = [
    'date_of_purchase' => 'datetime',
];


    /**
     * Get the animals associated with this insurance application.
     */
    public function animals()
    {
        return $this->hasMany(LivestockAnimal::class, 'application_id');
    }

    public function updateHeadCount()
{
    $total = $this->animals()->count(); // every row = 1 head

    $this->update([
        'number_of_heads' => $total
    ]);
}

    public function farmer(){
         return $this->belongsTo(User::class, 'farmer_id', 'id'); // make explicit
    }

public function proponentUser()
{
    return $this->belongsTo(User::class, 'proponent');
}
// In LivestockInsuranceApplication model
public function signature()
{
    return $this->hasOne(InsuranceSignature::class, 'application_id');
}



}
