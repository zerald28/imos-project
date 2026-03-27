<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'message',
        'url',
        'is_read',
    ];

    public function buyer()
    {
        return $this->belongsTo(\App\Models\User::class, 'buyer_id');
    }
    public function seller()
{
    return $this->belongsTo(\App\Models\User::class, 'seller_id');
}

}
