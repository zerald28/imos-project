<?php
// app/Models/VeterinaryRequest.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PDF\LivestockAnimal;
use App\Models\User;
use App\Models\ImosNotification;
use App\Events\ImosNotificationCreated;

class VeterinaryRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'title',
        'description',
        'status',
        'user_id',
        'request_type',
    ];

    // ---------------- RELATIONS ----------------
    public function animal() {
        return $this->belongsTo(LivestockAnimal::class, 'animal_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    // ---------------- BOOTED EVENTS ----------------
    protected static function booted()
    {
        static::created(function ($vetRequest) {

            // ✅ Get all admin & enforcer users
            $targetUsers = User::whereIn('role', ['admin', 'enforcer'])->get();

            foreach ($targetUsers as $user) {

                // ✅ Create notification
                $notification = ImosNotification::create([
                    'user_id' => $user->id,            // target user
                    'actor_id' => $vetRequest->user_id, // who triggered
                    'type' => 'veterinary_request',
                    'action' => 'created',
                    'message' => "New Farmer Request: {$vetRequest->title}",
                    'url'      => "/insurance/farmer/livestocks/{$vetRequest->user_id}", // updated URL
     
                ]);

                // ✅ Broadcast via Reverb
                event(new ImosNotificationCreated($notification));
            }
        });

        static::updated(function ($vetRequest) {
    if ($vetRequest->isDirty('status')) {
        $actorId = auth()->id();
        $targetUsers = User::whereIn('role', ['farmer'])->where('id', $vetRequest->user_id)->get();

        foreach ($targetUsers as $user) {
            $notification = ImosNotification::create([
                'user_id' => $user->id,
                'actor_id' => $actorId,
                'type' => 'veterinary_update',
                'action' => $vetRequest->status, // e.g., approved/rejected
                'message' => "Your Veterinary Request '{$vetRequest->title}' has been {$vetRequest->status}.",
                'url'      => "/veterinary/farmer/list", // updated URL
            ]);

            event(new ImosNotificationCreated($notification));
        }
    }
});

    }
}
