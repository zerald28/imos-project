<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\SwineRequest;
use App\Models\User;
use App\Models\ImosNotification; // Add this
use Carbon\Carbon;
use Exception;
use App\Events\ImosNotificationCreated; // Use this instead of TransactionUpdated
use App\Models\FarmerRating;

class MarketplaceTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'buyer_id',
        'seller_id',
        'amount',
        'quantity',
        'transaction_date',
        'state',
        'payment_method',
        'price_per_unit',
        'price_unit_type',
        'total_weight',
        'total_amount'
    ];

    protected $casts = [
        'amount' => 'float',
        'transaction_date' => 'datetime',
        'transaction_updated_at' => 'datetime',
    ];

    // ---------------- RELATIONSHIPS ----------------
    public function swineRequest()
    {
        return $this->hasMany(SwineRequest::class, 'transaction_id');
    }

    public function listing()
    {
        return $this->belongsTo(MarketplaceListing::class, 'listing_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function swineItems()
    {
        return ListingSwine::where('listing_id', $this->listing_id)
                           ->where('reserved_by', $this->buyer_id)
                           ->with('swine');
    }

    // ---------------- STATE MANAGEMENT ----------------
    public function advanceState(string $nextState)
    {
        $validTransitions = [
            'pending_request'  => ['seller_review', 'cancelled', 'expired', 'listing_deleted', 'unavailable'],
            'seller_review'    => ['seller_approved', 'cancelled', 'expired', 'listing_deleted', 'unavailable'],
            'seller_approved'  => ['buyer_confirmed', 'cancelled', 'expired', 'listing_deleted', 'unavailable'],
            'buyer_confirmed'  => ['in_progress', 'cancelled', 'expired', 'listing_deleted', 'unavailable'],
            'in_progress'      => ['completed', 'cancelled', 'listing_deleted', 'unavailable'],
            'completed'        => [],
            'cancelled'        => [],
            'expired'          => [],
            'unavailable'      => ['listing_deleted'],
            'listing_deleted'  => [],
        ];

        if (!isset($validTransitions[$this->state])) {
            throw new Exception("Invalid state: {$this->state}");
        }

        if (!in_array($nextState, $validTransitions[$this->state])) {
            throw new Exception("Invalid state transition from {$this->state} to {$nextState}");
        }

        $this->update(['state' => $nextState]);
    }

    // ---------------- BOOTED EVENTS ----------------
    protected static function booted()
    {
        static::updated(function ($transaction) {
            // Handle swine status updates based on state
            if ($transaction->state === 'completed') {
                $transaction->swineItems()->update(['status' => 'sold']);
            }

            // Handle cancelled, expired, unavailable, listing_deleted
            if (in_array($transaction->state, ['cancelled', 'expired', 'unavailable', 'listing_deleted'])) {
                $transaction->swineItems()->update([
                    'status' => 'available',
                    'reserved_by' => null,
                    'reservation_expires_at' => null,
                ]);
            }

            // Skip notifications for 'pending_request'
            if ($transaction->state === 'pending_request') {
                return;
            }

            // Create notifications using ImosNotification
            $transaction->createStateNotifications();
        });
    }

    /**
     * Create notifications for both buyer and seller based on state
     */
  /**
 * Create notifications for both buyer and seller based on state
 */
protected function createStateNotifications()
{
    $sellerName = $this->seller->userInformation->farm_name ?: $this->seller->name;
    $buyerName = $this->buyer->name;

    // Define messages for each state (for both parties)
    $messages = [
        'seller_review' => [
            'buyer' => "{$sellerName} is reviewing your request.",
            'seller' => "You are now reviewing {$buyerName}'s request."
        ],
        'seller_approved' => [
            'buyer' => "{$sellerName} has approved your request. Please confirm the transaction.",
            'seller' => "You approved {$buyerName}'s request. Waiting for buyer confirmation."
        ],
        'buyer_confirmed' => [
            'buyer' => "You confirmed the transaction with {$sellerName}.",
            'seller' => "{$buyerName} confirmed the transaction. Transaction is now in progress."
        ],
        'in_progress' => [
            'buyer' => "Your transaction with {$sellerName} is in progress.",
            'seller' => "Your transaction with {$buyerName} is in progress."
        ],
        'completed' => [
            'buyer' => "🎉 Congratulations! You have completed the transaction with {$sellerName}.",
            'seller' => "🎉 Congratulations! You have completed the transaction with {$buyerName}."
        ],
        'cancelled' => [
            'buyer' => "Your transaction with {$sellerName} was cancelled.",
            'seller' => "Your transaction with {$buyerName} was cancelled."
        ],
        'expired' => [
            'buyer' => "Your transaction with {$sellerName} has expired.",
            'seller' => "Your transaction with {$buyerName} has expired."
        ],
        'unavailable' => [
            'buyer' => "The items in this transaction are no longer available.",
            'seller' => "The items in this transaction are no longer available."
        ],
        'listing_deleted' => [
            'buyer' => "The listing for this transaction has been removed by the seller.",
            'seller' => "You removed the listing for this transaction."
        ],
    ];

    // If no specific message for this state, generate a default
    if (!isset($messages[$this->state])) {
        $stateText = ucfirst(str_replace('_', ' ', $this->state));
        $messages[$this->state] = [
            'buyer' => "Transaction with {$sellerName} is now: {$stateText}",
            'seller' => "Transaction with {$buyerName} is now: {$stateText}"
        ];
    }

    // 🔥 NEW: Define different URLs for buyer and seller
    $buyerUrl = route('marketplace.buyer.transaction.setup', $this->id);  // /marketplace/transactions/{id}/buyer
    $sellerUrl = route('marketplace.transaction.setup', $this->id);       // /marketplace/transaction/{id}/setup

    // Create notification for BUYER (user_id = buyer, actor_id = seller)
    $buyerNotification = ImosNotification::create([
        'user_id'   => $this->buyer_id,
        'actor_id'  => $this->seller_id,
        'type'      => 'marketplace',
        'action'    => $this->state,
        'message'   => $messages[$this->state]['buyer'],
        'url'       => $buyerUrl,  // 👈 Buyer gets buyer URL
    ]);

    // Broadcast the buyer notification
    broadcast(new ImosNotificationCreated($buyerNotification));

    // Create notification for SELLER (user_id = seller, actor_id = buyer)
    $sellerNotification = ImosNotification::create([
        'user_id'   => $this->seller_id,
        'actor_id'  => $this->buyer_id,
        'type'      => 'marketplace',
        'action'    => $this->state,
        'message'   => $messages[$this->state]['seller'],
        'url'       => $sellerUrl,  // 👈 Seller gets seller URL
    ]);

    // Broadcast the seller notification
    broadcast(new ImosNotificationCreated($sellerNotification));
}

    // ---------------- HELPER METHODS ----------------
    
  /**
 * Create a notification for a specific user (flexible method)
 */
public function notifyUser($userId, $actorId, $message, $action = null)
{
    // 🔥 Determine which URL to use based on who the user is
    $isBuyer = ($userId === $this->buyer_id);
    
    $url = $isBuyer 
        ? route('marketplace.buyer.transaction.setup', $this->id)  // Buyer URL
        : route('marketplace.transaction.setup', $this->id);       // Seller URL

    $notification = ImosNotification::create([
        'user_id'   => $userId,
        'actor_id'  => $actorId,
        'type'      => 'marketplace',
        'action'    => $action ?? $this->state,
        'message'   => $message,
        'url'       => $url,
    ]);

    broadcast(new ImosNotificationCreated($notification));
    
    return $notification;
}

    /**
     * Checks if the transaction is expired based on reservation expiry
     */
    public function checkExpiry()
    {
        $now = Carbon::now();
        $swineItems = $this->swineItems()->get();

        foreach ($swineItems as $item) {
            if ($item->reservation_expires_at && $now->gt(Carbon::parse($item->reservation_expires_at))) {
                $this->advanceState('expired');
                break;
            }
        }
    }

    /**
     * Creates a transaction automatically for a reserved swine
     */
    public static function createForReservation($listingSwine)
    {
        if ($listingSwine->reserved_by) {
            return self::create([
                'listing_id' => $listingSwine->listing_id,
                'buyer_id' => $listingSwine->reserved_by,
                'seller_id' => $listingSwine->seller_id,
                'amount' => $listingSwine->listing->price_per_unit,
                'quantity' => 1,
                'transaction_date' => now(),
                'state' => 'pending_request'
            ]);
        }

        return null;
    }

    public function scopeBetweenUsers($query, int $userA, int $userB)
    {
        return $query->where(function ($q) use ($userA, $userB) {
            $q->where('buyer_id', $userA)
              ->where('seller_id', $userB);
        })->orWhere(function ($q) use ($userA, $userB) {
            $q->where('buyer_id', $userB)
              ->where('seller_id', $userA);
        });
    }


    // In App\Models\Marketplace\MarketplaceTransaction.php

/**
 * Get the ratings for this transaction.
 */
public function ratings()
{
    return $this->hasMany(FarmerRating::class, 'transaction_id');
}

/**
 * Check if a user can rate this transaction.
 */
public function canBeRatedBy($userId)
{
    if ($this->state !== 'completed') {
        return false;
    }
    
    // Check if user is part of this transaction
    if ($this->buyer_id != $userId && $this->seller_id != $userId) {
        return false;
    }
    
    // Check if user hasn't rated yet
    return !FarmerRating::where('transaction_id', $this->id)
        ->where('rater_id', $userId)
        ->exists();
}

/**
 * Get the rating given by a specific user.
 */
public function getRatingByUser($userId)
{
    return FarmerRating::where('transaction_id', $this->id)
        ->where('rater_id', $userId)
        ->first();
}
}