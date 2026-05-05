<?php

// File: app/Models/VetmedClearance.php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Marketplace\MarketplaceListing;
use Carbon\Carbon;

class VetmedClearance extends Model
{
    use SoftDeletes;

    /**
     * Table name (optional because Laravel can auto-detect,
     * but explicit is cleaner for long-term maintenance)
     */
    protected $table = 'vetmed_clearances';

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'user_id',
       
        'verified_by',

        'clearance_number',
        'document_type',

        'veterinarian_name',
        'license_number',
        'issued_by',

        'issue_date',
        'expiry_date',

        'remarks',

        'file_path',
        'file_name',
        'mime_type',
        'file_size',

        'status',
        'verified_at',
        'rejection_reason',
    ];

    /**
     * Auto-cast fields to proper data types
     */
    protected $casts = [
        'issue_date'   => 'date',
        'expiry_date'  => 'date',
        'verified_at'  => 'datetime',
        'file_size'    => 'integer',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /**
     * Seller / uploader of the clearance
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Marketplace listing this clearance belongs to
     */
  

    /**
     * Admin / personnel who verified it
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /*
    |--------------------------------------------------------------------------
    | Query Scopes
    |--------------------------------------------------------------------------
    */

    /**
     * Only verified records
     */
    public function scopeVerified(Builder $query): Builder
    {
        return $query->where('status', 'verified');
    }

    /**
     * Only pending review
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending_review');
    }

    /**
     * Only rejected
     */
    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'rejected');
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    /**
     * Check if clearance is expired
     */
    public function isExpired(): bool
    {
        if (!$this->expiry_date) {
            return false;
        }

        return Carbon::today()->gt($this->expiry_date);
    }

    /**
     * Check if clearance is valid and approved
     */
    public function isActiveVerified(): bool
    {
        return $this->status === 'verified' && !$this->isExpired();
    }

    /**
     * Get human-readable status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending_review' => 'Pending Review',
            'verified'       => 'Verified',
            'rejected'       => 'Rejected',
            'expired'        => 'Expired',
            'needs_revision' => 'Needs Revision',
            default          => 'Unknown',
        };
    }
}