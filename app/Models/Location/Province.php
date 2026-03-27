<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;
use App\Models\Location\SoftDeletes;


class Province extends Model
{
     

    protected $fillable = ['name'];

    public function municipalities()
    {
        return $this->hasMany(Municipal::class);
    }
}
