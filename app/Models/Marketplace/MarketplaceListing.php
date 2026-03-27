<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Swine\Swine;
use App\Models\Marketplace\ListingSwine;
use App\Models\Marketplace\Reservation;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\UserInformation;
use Carbon\Carbon;

class MarketplaceListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'title',
        'breed',
        'category',
        'description',
        'price_per_unit',
        'price_unit_type',
        'image',
        'province_id',
        'municipal_id',
        'barangay_id',
        'purok',
        'street',
        'sex_summary',
        'age_range',
        'available_quantity',
    ];

    // 🧩 Relationships
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function userInformation()
{
    return $this->hasOne(UserInformation::class);
}


  public function listingSwine()
{
    return $this->hasMany(ListingSwine::class, 'listing_id')
        ->with('swine'); // make sure it eager loads the related Swine
}


    public function swine()
    {
        return $this->belongsToMany(Swine::class, 'listing_swine', 'listing_id', 'swine_id')
            ->withPivot([
                'seller_id',
                'status',
                'scaled_weight',
                'estimated_weight',
                'sex',
                'birthdate',
                'breed',
                'thumbnail',
                'remarks',
                'is_reserved',
                'reserved_by',
                'reservation_expires_at',
                'da_approval_status',
                'da_remarks',
                'approved_by',
            ])
            ->withTimestamps();
    }

    public function transactions()
    {
        return $this->hasMany(MarketplaceTransaction::class, 'listing_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'listing_id');
    }

    public function province()
    {
        return $this->belongsTo(\App\Models\Location\Province::class);
    }

    public function municipal()
    {
        return $this->belongsTo(\App\Models\Location\Municipal::class);
    }

    public function barangay()
    {
        return $this->belongsTo(\App\Models\Location\Barangay::class);
    }

    // 🧠 Computed Attributes
    public function getAvailableCountAttribute()
    {
        return $this->listingSwine()->where('status', 'available')->count();
    }

    public function getReservedCountAttribute()
    {
        return $this->listingSwine()->where('status', 'reserved')->count();
    }

    public function getSoldCountAttribute()
    {
        return $this->listingSwine()->where('status', 'sold')->count();
    }

    // 🧩 MarketplaceListing.php
// protected static function booted()
// {
//     static::created(function ($listingSwine) {
//         $listingSwine->syncFromSwine();
//         $listingSwine->listing?->syncAggregateAttributes();
//     });

//     static::updated(function ($listingSwine) {
//         // If status changed (e.g. available → sold), resync listing summary
//         if ($listingSwine->wasChanged('status')) {
//             $listingSwine->listing?->syncAggregateAttributes();
//         } else {
//             // Still resync for other relevant field changes
//             $listingSwine->listing?->syncAggregateAttributes();
//         }
//     });

//     static::deleted(function ($listingSwine) {
//         $listingSwine->listing?->syncAggregateAttributes();
//     });
// }

protected static function booted()
{
    // When a MarketplaceListing is created → only aggregate attributes
    static::created(function ($listing) {
        $listing->syncAggregateAttributes();
    });

    // When MarketplaceListing updated → recalc aggregates
    static::updated(function ($listing) {
        $listing->syncAggregateAttributes();
    });

    // When MarketplaceListing deleted → recalc (optional)
    static::deleted(function ($listing) {
        $listing->syncAggregateAttributes();
    });
}





    // ✅ Aggregate Swine Attributes
    public function syncAggregateAttributes()
{
    $swine = ListingSwine::where('listing_id', $this->id)
        ->whereIn('status', ['available', 'reserved'])
        ->where(function ($q) {
            $q->approved()->orWhereNull('da_approval_status');
        })
        ->get();

    // Aggregate breed
    $breedSummary = $swine->pluck('breed')->unique()->join(', ');

    // Aggregate sex
  $sexSummary = $swine->groupBy('sex')
    ->map(fn($group, $sex) => ucfirst($sex) . ': ' . $group->count())
    ->join(' | ');



    // Aggregate age range (in days)
    $ages = $swine->pluck('birthdate')
        ->filter()
        ->map(fn($date) => intval(Carbon::parse($date)->diffInDays(Carbon::now())));

    $ageRange = null;
    if ($ages->isNotEmpty()) {
        $minAge = $ages->min();
        $maxAge = $ages->max();
        $ageRange = ($minAge === $maxAge)
            ? "{$minAge} days"
            : "{$minAge} - {$maxAge} days";
    }

    $this->updateQuietly([
        'breed' => $breedSummary,
        'sex_summary' => $sexSummary,
        'age_range' => $ageRange,
        'available_quantity' => $this->listingSwine()->where('status', 'available')->count(),
    ]);
}



public function getCardImageAttribute()
{
    if ($this->image) return asset('storage/' . $this->image);

    $firstSwine = $this->listingSwine()->whereNotNull('thumbnail')->first();
    if ($firstSwine) return asset('storage/' . $firstSwine->thumbnail);

    return asset('images/no-image.png');
}


    // ✅ Helper: assign address from user_information
    public static function assignAddressFromUser(User $user)
    {
        $info = UserInformation::find($user->id);

        return [
            'province_id' => $info?->province_id,
            'municipal_id' => $info?->municipal_id,
            'barangay_id' => $info?->barangay_id,
            'purok' => $info?->purok,
            'street' => $info?->street,
        ];
    }

   // ✅ Smart Search scope
    public function scopeSmartSearch($query, $search)
    {
        $search = strtolower($search); // 🔽 normalize to lowercase

        // Filipino/local mappings → standardized category
        $categoryMappings = [
            'piglet' => ['baktin', 'bakten', 'baboy-baktin'],
            'fattening' => ['karnehon', 'letchonon', 'karne'],
            'breeder' => ['barako', 'butakal','anay'],
        ];

        foreach ($categoryMappings as $category => $keywords) {
            foreach ($keywords as $keyword) {
                if (str_contains($search, strtolower($keyword))) {
                    $query->orWhere('category', 'like', "%{$category}%");
                    break; // stop after the first match
                }
            }
        }

        return $query;
    }

    public function photos()
{
    return $this->hasMany(ListingPhoto::class, 'listing_id');
}



}
