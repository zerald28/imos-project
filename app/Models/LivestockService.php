<?php

namespace App\Models;

use App\Models\CMS\BlogPost;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LivestockService extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
        'location',
        'price',
        'is_active',
        'average_rating',
         'blog_post_id', // Add this
    ];

   
    /**
     * Relationship: Service belongs to a user (Farmer/Technician)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all bookings for this service
     */
    public function bookings()
    {
        return $this->hasMany(ServiceBooking::class, 'service_id');
    }

    /**
     * Get completed bookings
     */
    public function completedBookings()
    {
        return $this->bookings()->where('status', 'completed');
    }

    /**
     * Get all ratings for this service
     */
    public function ratings()
    {
        return $this->hasMany(ServiceRating::class, 'service_id');
    }

    /**
     * Get average rating for this service
     */
    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }

    /**
     * Get rating count
     */
    public function getRatingsCountAttribute()
    {
        return $this->ratings()->count();
    }

    /**
     * Check if user can rate this service (has completed booking)
     */
    public function canUserRate($userId)
    {
        return $this->bookings()
            ->where('customer_id', $userId)
            ->where('status', 'completed')
            ->whereDoesntHave('rating')
            ->exists();
    }

    /**
     * Get user's completed booking for this service (if any)
     */
    public function getUserCompletedBooking($userId)
    {
        return $this->bookings()
            ->where('customer_id', $userId)
            ->where('status', 'completed')
            ->whereDoesntHave('rating')
            ->first();
    }

        public function blogPost()
    {
        return $this->belongsTo(BlogPost::class, 'blog_post_id');
    }

    /**
     * Predefined categories for services
     */
    public static function categories(): array
    {
        return [
            'Technical Service', // Vaccination, AI, Injections, etc.
            'Renting Tools',     // Cages, feeders, equipment, etc.
            'Other Services',    // Anything else farmers provide
        ];
    }

}
