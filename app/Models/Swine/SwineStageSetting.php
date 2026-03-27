<?php

namespace App\Models\Swine;

use Illuminate\Database\Eloquent\Model;

class SwineStageSetting extends Model
{
     protected $fillable = [
        'user_id', 'pre_weaning_max', 'post_weaning_max', 'grower_max', 'breeder_min',
    ];
}
