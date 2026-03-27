<?php

// File: app/Models/DirectSale.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Swine\Swine;


class DirectSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'farmer_id',
        'swine_id',
        'price',
        'quantity',
        'total_amount',
        'sold_at',
        'buyer_name',
        'payment_method',
        'notes',
    ];

    protected $casts = [
        'sold_at' => 'date',
    ];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    public function swine()
    {
        return $this->belongsTo(Swine::class);
    }
}
