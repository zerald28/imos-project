<?php
// app/Policies/MessagePolicy.php
namespace App\Policies;

use App\Models\Message;
use App\Models\User;

class MessagePolicy
{
  
    // MessagePolicy.php
public function view(User $user, Message $message) {
    return $user->id === $message->sender_id || in_array($user->id, [$message->conversation->user_one_id, $message->conversation->user_two_id]);
}
public function update(User $user, Message $message) { return $user->id === $message->sender_id; }
public function delete(User $user, Message $message) { return $user->id === $message->sender_id; }
}
