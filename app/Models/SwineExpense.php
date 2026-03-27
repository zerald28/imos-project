<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Swine\Swine;

class SwineExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'expense_id',
        'swine_id',
        'individual_share',
    ];

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function swine()
    {
        return $this->belongsTo(Swine::class);
    }
}
