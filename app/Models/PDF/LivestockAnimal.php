<?php

namespace App\Models\PDF;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LivestockAnimal extends Model
{
    use HasFactory;

    // The table associated with the model (optional if follows convention)
    protected $table = 'livestock_animals';

    // Mass assignable attributes
    protected $fillable = [
        'application_id',
        'livestock_id',
        'sex',
        'age',
        'breed',
        'ear_mark',
        'color',
        'proof_of_ownership',
        // new added
         'veterinary_report_id',
        'name',
        'genus',
        'species',
        'basic_color',
        'identifying_marks',
        'brand_tattoo',   // match DB column
    'live_weight',    // match DB column
    ];

    /**
     * Get the insurance application that owns this animal.
     */
    public function application()
    {
        return $this->belongsTo(LivestockInsuranceApplication::class, 'application_id');
    }

     public function veterinaryReport()
    {
        return $this->belongsTo(\App\Models\PDF\VeterinaryDiseaseReport::class, 'veterinary_report_id');
    }
    
    protected static function booted()
{
    static::created(function ($animal) {
        $animal->application->updateHeadCount();
    });

    static::deleted(function ($animal) {
        $animal->application->updateHeadCount();
    });

    static::updated(function ($animal) {
        $animal->application->updateHeadCount();
    });
}



public function livestock()
{
    return $this->belongsTo(\App\Models\Swine\Swine::class, 'livestock_id');
}

 public function veterinaryRequests()
    {
        return $this->hasMany(\App\Models\VeterinaryRequest::class, 'animal_id');
    }


}