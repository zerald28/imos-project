<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use SerializesModels;

    public $user;
    public $conversationId;
    public $message;

    public function __construct($user, $conversationId, Message $message)
    {
        $this->user = $user;
        $this->conversationId = $conversationId;
        $this->message = $message;
    }

    public function broadcastOn()
    {
         return [
        new PresenceChannel('conversation.' . $this->message->conversation_id),
        new PresenceChannel('user.' . $this->message->recipient_id),
    ];
        
        
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
