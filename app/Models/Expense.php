<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Swine\SwineGroup;
use App\Models\SwineExpense;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'swine_group_id',
        'category',
        'description',
        'quantity',
        'unit',
        'amount',
        'date',
    ];

    /** RELATIONSHIPS **/

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function group()
    {
        return $this->belongsTo(SwineGroup::class, 'swine_group_id');
    }

    public function swineExpenses()
    {
        return $this->hasMany(SwineExpense::class);
    }

    protected static function booted()
{
    static::updated(function ($expense) {
        if ($expense->isDirty('amount')) { // Only when amount changes
            $swineCount = $expense->swineExpenses()->count();
            if ($swineCount > 0) {
                $newShare = $expense->amount / $swineCount;
                $expense->swineExpenses()->update(['individual_share' => $newShare]);
            }
        }
    });
}



}

