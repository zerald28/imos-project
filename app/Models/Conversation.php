<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['user_one_id', 'user_two_id'];

    /** Relationship: messages in this conversation */
   public function messages()
{
    return $this->hasMany(Message::class);
}



    /** User A (initiator) */
    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    /** User B (receiver) */
    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }

    /**
     * Helper: returns true if given user participates in this conversation.
     */
    public function involvesUser($userId): bool
    {
        return $this->user_one_id === $userId || $this->user_two_id === $userId;
    }

    public function latestMessage()
{
    return $this->hasOne(Message::class)->latestOfMany();
}

public function marketplaceConversations()
{
    return $this->hasMany(MarketplaceConversation::class, 'conversation_id');
}

}
