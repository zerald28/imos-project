<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;

class UserStatusUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets;

    public $userId;
    public $lastSeen;

    public function __construct($userId, $lastSeen)
    {
        $this->userId = $userId;
        $this->lastSeen = $lastSeen;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('presence.chat');
    }

    public function broadcastAs()
    {
        return 'UserStatusUpdated';
    }

    public function broadcastWith()
    {
        return [
            'user_id' => $this->userId,
            'last_seen' => $this->lastSeen,
        ];
    }
}
