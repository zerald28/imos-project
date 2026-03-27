<?php

namespace App\Events;
// app/Events/MessageSent.php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\PrivateChannel;

class MessageSents implements ShouldBroadcast
{
    use InteractsWithSockets;

    public Message $message;

    public function __construct(Message $message)
    {
        $this->message = $message->load('sender');
    }

    public function broadcastOn()
    {
        return new PrivateChannel("user." . $this->message->recipient_id);
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
