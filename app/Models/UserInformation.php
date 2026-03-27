<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Location\Province;
use App\Models\Location\Barangay;
use App\Models\Location\Municipal;

class UserInformation extends Model
{
     use SoftDeletes;

    protected $table = 'user_informations';
    protected $primaryKey = 'user_id';
    public $incrementing = false; // because PK is user_id

    protected $fillable = [
        'firstname',
        'middlename',
        'lastname',
        'extension',
        'contact',
        'birthdate',
        'gender',
        'civil_status',
        'occupation',
        'profile_picture',
        'province_id',
        'municipal_id',
        'barangay_id',
        'purok',
        'street',
        'status',
           'farming_type',
              'description',
               'average_rating',
    'total_ratings',
    ];
    
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // --------------LOCATION
     public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function municipal()
    {
        return $this->belongsTo(Municipal::class);
    }

    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

  
}
