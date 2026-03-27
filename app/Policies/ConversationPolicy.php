<?php
// app/Policies/ConversationPolicy.php
namespace App\Policies;

use App\Models\Conversation;
use App\Models\User;

class ConversationPolicy
{
   // ConversationPolicy.php
public function view(User $user, Conversation $conversation)
{
    return in_array($user->id, [$conversation->user_one_id, $conversation->user_two_id]);
}

}
