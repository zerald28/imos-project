<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Mail\ImosNotificationMail;

class ImosNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'actor_id',
        'type',
        'action',
        'message',
        'url',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    /**
     * Check if email is valid and has a valid domain
     */
    protected function isValidEmail($email)
    {
        if (empty($email)) {
            return false;
        }

        // Basic email format validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        // Extract domain
        $domain = substr(strrchr($email, "@"), 1);
        
        // Skip local/test domains
        $invalidDomains = [
            'localhost',
            'example.com',
            'test.com',
            'domain.com',
            'yourdomain.com',
            'gmail.test',
            'imos.test', // Add your test domain here
        ];
        
        if (in_array($domain, $invalidDomains)) {
            return false;
        }
        
        // Check if domain has MX records (optional, but helps reduce bounces)
        // Note: This might slow down email sending
        // if (!checkdnsrr($domain, 'MX')) {
        //     return false;
        // }
        
        return true;
    }

    protected static function booted()
    {
        static::created(function ($notification) {
            // Load user relationship
            $notification->load('user');

            // Only send email if user exists and has valid email
            if ($notification->user && $notification->user->email) {
                if ($notification->isValidEmail($notification->user->email)) {
                    Mail::to($notification->user->email)
                        ->queue(new ImosNotificationMail($notification));
                } else {
                    \Log::warning("Skipping email to invalid email address: {$notification->user->email}");
                }
            }
        });
    }
}