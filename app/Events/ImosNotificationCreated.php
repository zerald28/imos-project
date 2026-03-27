<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\ImosNotification;

class ImosNotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    public function __construct(ImosNotification $notification)
    {
        $this->notification = $notification;
    }

   public function broadcastOn()
{
    return new \Illuminate\Broadcasting\PrivateChannel('user-notifications.' . $this->notification->user_id);
}


    public function broadcastAs(): string
    {
        return 'ImosNotificationCreated';
    }

    public function broadcastWith(): array
    {
        return [
            'notification' => [
                'id' => $this->notification->id,
                'user_id' => $this->notification->user_id,
                'actor' => $this->notification->actor ? ['name' => $this->notification->actor->name] : null,
                'type' => $this->notification->type,
                'action' => $this->notification->action,
                'message' => $this->notification->message,
                'url' => $this->notification->url,
                'is_read' => $this->notification->is_read,
                'created_at' => $this->notification->created_at->toDateTimeString(),
            ],
        ];
    }
}
