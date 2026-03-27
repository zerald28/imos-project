<?php

namespace App\Events;

use App\Models\Marketplace\MarketplaceTransaction;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use App\Models\Marketplace\Notification;

class TransactionUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    public function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('buyer-notifications.' . $this->notification->buyer_id);
    }

    public function broadcastAs(): string
    {
        return 'TransactionUpdated';
    }

    public function broadcastWith(): array
{
    return [
        'notification' => [
            'id' => $this->notification->id,
            'buyer_id' => $this->notification->buyer_id,
            'seller_id' => $this->notification->buyer_id,
            'message' => $this->notification->message,
            'url' => $this->notification->url,
            'is_read' => $this->notification->is_read,
            'created_at' => $this->notification->created_at->toDateTimeString(),
        ],
    ];
}

}
