<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Swine\Swine;

class Schedule extends Model
{
        use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'date',
        'category',
        'time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assignedSwine()
{
    return $this->hasMany(ScheduleAssignSwine::class);
}

   public function swine()
    {
        return $this->belongsToMany(Swine::class, 'schedule_assign_swine', 'schedule_id', 'swine_id');
    }

}
