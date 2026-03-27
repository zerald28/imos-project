<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Swine\Swine;

class ScheduleAssignSwine extends Model
{
    protected $table= 'schedule_assign_swine';
    protected $fillable = ['schedule_id', 'swine_id'];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function swine()
    {
        return $this->belongsTo(Swine::class);
    }
}
