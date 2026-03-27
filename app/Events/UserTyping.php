<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserTyping implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $conversationId;
    public $userId;
public $userName;

public function __construct($user, $conversationId)
{
    $this->userId = $user->id;
    $this->userName = $user->name;
    $this->conversationId = $conversationId;
}



    public function broadcastOn()
    {
        // Use PresenceChannel to track participants
        return new PresenceChannel("conversation.{$this->conversationId}");
        
    }

    public function broadcastAs()
    {
        return 'user.typing';
    }
}
