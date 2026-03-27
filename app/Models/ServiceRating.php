<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'booking_id',
        'reviewer_id',
        'rating',
        'comment'
    ];

    protected $casts = [
        'rating' => 'integer'
    ];

    /**
     * Get the service being rated
     */
    public function service()
    {
        return $this->belongsTo(LivestockService::class, 'service_id');
    }

    /**
     * Get the booking this rating is for
     */
    public function booking()
    {
        return $this->belongsTo(ServiceBooking::class, 'booking_id');
    }

    /**
     * Get the user who wrote the review
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}