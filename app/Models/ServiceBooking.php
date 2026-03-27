<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'customer_id',
        'provider_id',
        'status',
        'scheduled_date',
        'notes',
        'completed_at'
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'completed_at' => 'datetime'
    ];

    /**
     * Get the service being booked
     */
    public function service()
    {
        return $this->belongsTo(LivestockService::class, 'service_id');
    }

    /**
     * Get the customer who booked the service
     */
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the provider (service owner)
     */
    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    /**
     * Get the rating for this booking (if any)
     */
    public function rating()
    {
        return $this->hasOne(ServiceRating::class, 'booking_id');
    }

    /**
     * Check if booking can be rated
     */
    public function canBeRated()
    {
        return $this->status === 'completed' && !$this->rating()->exists();
    }

    /**
     * Scope for completed bookings
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope for pending bookings
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}