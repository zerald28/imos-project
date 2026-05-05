<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\FarmCompliance;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

     use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
           'last_seen', // ✅ Add this
           'email_verified_at',
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }



    // ------------------------------USER PROFILE
     public function profile():HasOne
    {
        return $this->hasOne(UserInformation::class, 'user_id');
    }

   protected static function booted()
{
    /**
     * ✅ Auto-create Farm Compliance when user is created
     */
    static::created(function ($user) {
        FarmCompliance::create([
            'user_id' => $user->id,
            'status' => 'pending',
        ]);
    });

    /**
     * ✅ Handle soft delete (profile)
     */
    static::deleting(function ($user) {
        if ($user->isForceDeleting()) {
            $user->profile()->forceDelete();
        } else {
            $user->profile()->delete();
        }
    });

    /**
     * ✅ Restore profile when user is restored
     */
    static::restoring(function ($user) {
        $user->profile()->withTrashed()->restore();
    });
}

 // User.php
public function userInformation()
{
    return $this->hasOne(UserInformation::class, 'user_id', 'id');
}

public function swine()
{
    return $this->hasMany(\App\Models\Swine\Swine::class, 'owner_id');
}


public function marketplaceListings()
{
    return $this->hasMany(\App\Models\Marketplace\MarketplaceListing::class, 'seller_id');

}

public function swineRequest()
{
    return $this->hasMany(\App\Models\Marketplace\SwineRequest::class, 'buyer_id');
}

public function transactions()
{
    return $this->hasMany(\App\Models\Marketplace\MarketplaceTransaction::class, 'buyer_id');
}

public function listedSwine()
{
    return $this->hasManyThrough(
        \App\Models\Swine\Swine::class,
        \App\Models\Marketplace\ListingSwine::class,
        'seller_id', // Foreign key on listing_swine
        'id',        // Local key on swine
        'id',        // Local key on user
        'swine_id'   // Foreign key on listing_swine
    );
}

public function sales()
{
    return $this->hasMany(\App\Models\Marketplace\MarketplaceTransaction::class, 'seller_id');
}

public function conversations() {
    return Conversation::where('user_one_id', $this->id)
        ->orWhere('user_two_id', $this->id);
}

public function digitalSignature()
{
    return $this->hasOne(DigitalSignature::class);
}



    public function livestockInsuranceApplications()
    {
        return $this->hasMany(\App\Models\PDF\LivestockInsuranceApplication::class, 'farmer_id');
    }

// app/Models/User.php

public function veterinaryRequests()
{
    return $this->hasMany(VeterinaryRequest::class, 'user_id', 'id');
}

// In User.php - add these relationships

/**
 * Bookings where user is the customer
 */
public function customerBookings()
{
    return $this->hasMany(ServiceBooking::class, 'customer_id');
}

/**
 * Bookings where user is the provider
 */
public function providerBookings()
{
    return $this->hasMany(ServiceBooking::class, 'provider_id');
}

/**
 * Services offered by this user
 */
public function services()
{
    return $this->hasMany(LivestockService::class, 'user_id');
}

/**
 * Reviews written by this user
 */
public function serviceReviews()
{
    return $this->hasMany(ServiceRating::class, 'reviewer_id');
}

 public function blogPosts()
    {
        return $this->hasMany(\App\Models\CMS\BlogPost::class, 'author_id');
    }
    

    // Add these relationships to your existing User model (App\Models\User)

/**
 * Get the ratings given by this user.
 */
public function ratingsGiven()
{
    return $this->hasMany(FarmerRating::class, 'rater_id');
}

/**
 * Get the ratings received by this user (as a farmer).
 */
public function ratingsReceived()
{
    return $this->hasMany(FarmerRating::class, 'farmer_id');
}

/**
 * Get the average rating for this user as a farmer.
 */
public function getAverageRatingAttribute()
{
    return $this->userInformation ? $this->userInformation->average_rating : null;
}

/**
 * Get the total number of ratings for this user as a farmer.
 */
public function getTotalRatingsAttribute()
{
    return $this->userInformation ? $this->userInformation->total_ratings : 0;
}


public function farmCompliance()
{
    return $this->hasOne(FarmCompliance::class);
}

}
