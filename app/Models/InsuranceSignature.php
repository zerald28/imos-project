<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\VeterinaryDiseaseReport;

class InsuranceSignature extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'user_id',
        'veterinary_disease_report_id', // <-- new
        'signature',
        'x',
        'y',
        'width',
        'height',
    ];

    public function application()
    {
        return $this->belongsTo(LivestockInsuranceApplication::class, 'application_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function veterinaryReport()
    {
        return $this->belongsTo(VeterinaryDiseaseReport::class, 'veterinary_disease_report_id');
    }
}
