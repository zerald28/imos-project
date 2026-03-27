<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Marketplace\MarketplaceTransaction;

class FarmerRating extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'rater_id',
        'farmer_id',
        'transaction_id',
        'rating',
        'comment',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Add event listener for when a rating is created
        static::created(function ($rating) {
            // Update farmer's average rating when a new rating is added
            $rating->updateFarmerAverageRating();
        });

        // Add event listener for when a rating is updated
        static::updated(function ($rating) {
            // Recalculate farmer's average rating when rating is updated
            $rating->updateFarmerAverageRating();
        });

        // Add event listener for when a rating is deleted
        static::deleted(function ($rating) {
            // Recalculate farmer's average rating when rating is removed
            $rating->updateFarmerAverageRating();
        });
    }

    // ========== RELATIONSHIPS ==========

    /**
     * Get the user who gave the rating (rater).
     */
    public function rater()
    {
        return $this->belongsTo(User::class, 'rater_id');
    }

    /**
     * Get the farmer who received the rating.
     */
    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    /**
     * Get the transaction associated with this rating.
     */
    public function transaction()
    {
        return $this->belongsTo(MarketplaceTransaction::class, 'transaction_id');
    }

    // ========== HELPER METHODS ==========

    /**
     * Update the farmer's average rating.
     */
    public function updateFarmerAverageRating()
    {
        $farmer = $this->farmer;
        
        if ($farmer && $farmer->userInformation) {
            // Calculate average rating for the farmer
            $averageRating = static::where('farmer_id', $farmer->id)
                ->avg('rating');
            
            $totalRatings = static::where('farmer_id', $farmer->id)
                ->count();
            
            // Update the user_information table
            $farmer->userInformation->update([
                'average_rating' => round($averageRating, 2),
                'total_ratings' => $totalRatings,
            ]);
        }
    }

    /**
     * Get the average rating for a specific farmer.
     */
    public static function getFarmerAverageRating($farmerId)
    {
        return static::where('farmer_id', $farmerId)
            ->avg('rating');
    }

    /**
     * Get rating distribution for a farmer.
     */
    public static function getRatingDistribution($farmerId)
    {
        $distribution = [];
        
        for ($i = 1; $i <= 5; $i++) {
            $distribution[$i] = static::where('farmer_id', $farmerId)
                ->where('rating', $i)
                ->count();
        }
        
        return $distribution;
    }

    /**
     * Scope for filtering by rating.
     */
    public function scopeWithRating($query, $minRating = null, $maxRating = null)
    {
        if ($minRating) {
            $query->where('rating', '>=', $minRating);
        }
        
        if ($maxRating) {
            $query->where('rating', '<=', $maxRating);
        }
        
        return $query;
    }

    /**
     * Get formatted rating display (e.g., "4.5 (128 ratings)").
     */
    public static function getFormattedRating($farmerId)
    {
        $average = static::getFarmerAverageRating($farmerId);
        $total = static::where('farmer_id', $farmerId)->count();
        
        if ($total === 0) {
            return 'No ratings yet';
        }
        
        return number_format($average, 1) . ' (' . $total . ' ' . ($total === 1 ? 'rating' : 'ratings') . ')';
    }
}