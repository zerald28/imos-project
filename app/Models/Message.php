<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'conversation_id',
        'sender_id',
        'content',
        'attachment',
        'is_edited',
        'is_read'
    ];

    /** Belongs to one conversation */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    /** Message sender */
   public function sender()
{
    return $this->belongsTo(User::class, 'sender_id');
}

    /** Accessor: return absolute URL for attachment */
    public function getAttachmentUrlAttribute()
    {
        return $this->attachment ? asset('storage/' . $this->attachment) : null;
 
    }

    public function getRecipientIdAttribute()
{
    return $this->sender_id === $this->conversation->user_one_id
        ? $this->conversation->user_two_id
        : $this->conversation->user_one_id;
}



}
