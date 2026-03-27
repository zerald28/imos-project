<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Model;
use App\Models\Marketplace\ListingSwine;
use App\Models\User;
use App\Models\ImosNotification;
use App\Events\ImosNotificationCreated;
use Illuminate\Support\Facades\Log;

class SwineRequest extends Model
{
    protected $fillable = [
        'listing_swine_id',
        'buyer_id',
        'contact',
        'email',
        'address',
        'type',
        'offer_amount',
        'transaction_id',
        'status',
        'final_amount',
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function listingSwine()
    {
        return $this->belongsTo(ListingSwine::class, 'listing_swine_id');
    }

    public function transaction()
    {
        return $this->belongsTo(\App\Models\Marketplace\MarketplaceTransaction::class, 'transaction_id');
    }

    // ---------------- BOOTED EVENTS ----------------
    protected static function booted()
    {
        // NOTE: Created event notifications removed
        // Transaction-level notifications are now handled in the controller
        // This prevents multiple notifications for multiple swine in one transaction

        // When the request status is updated (per-request notifications)
        static::updated(function ($request) {
            if ($request->isDirty('status')) {
                $request->loadMissing(['buyer', 'listingSwine.listing']);

                $buyer = $request->buyer;
                $listingSwine = $request->listingSwine;
                $listing = $listingSwine->listing ?? null;

                if (!$buyer || !$listing) {
                    Log::warning('SwineRequest status updated but buyer/listing missing.', [
                        'swine_request_id' => $request->id,
                        'buyer' => $buyer ? $buyer->id : null,
                        'listing_swine' => $listingSwine ? $listingSwine->id : null,
                    ]);
                    return;
                }

                $listingTitle = $listing->title ?? "Listing #{$listing->id}";

                // Create notification for the buyer about status change
                $notification = ImosNotification::create([
                    'user_id'  => $buyer->id,
                    'actor_id' => auth()->id(),  // seller updating
                    'type'     => 'swine_request_update',
                    'action'   => $request->status,
                    'message'  => "Your swine request for '{$listingTitle}' has been {$request->status} by the seller",
                    'url'      => "/marketplace/requests/{$request->id}",
                ]);

                event(new ImosNotificationCreated($notification));
            }
        });
    }
}