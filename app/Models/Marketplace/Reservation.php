<?php
namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Swine\Swine;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id', 'listing_id', 'total_amount', 'status', 'expires_at'
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function listing()
    {
        return $this->belongsTo(MarketplaceListing::class, 'listing_id');
    }
}
