<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    
    protected $fillable = ['municipal_id', 'name'];

    public function municipalities()
    {
        return $this->belongsTo(Municipal::class);
    }
}
