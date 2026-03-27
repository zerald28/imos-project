<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingPhoto extends Model
{
    use HasFactory;

    protected $fillable = ['listing_id', 'path'];

    // Each photo belongs to one listing
    public function listing()
    {
        return $this->belongsTo(MarketplaceListing::class, 'listing_id');
    }
}
