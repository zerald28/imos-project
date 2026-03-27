<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Marketplace\ListingSwine;
use App\Models\Marketplace\MarketplaceListing;


class MarketplaceConversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'listing_id',
        'listing_swine_id',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function listing()
    {
        return $this->belongsTo(MarketplaceListing::class);
    }

  public function listingSwine()
{
    return $this->belongsTo(ListingSwine::class, 'listing_swine_id');
}

}
