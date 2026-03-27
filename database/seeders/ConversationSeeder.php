<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $user1 = \App\Models\User::first();
    $user2 = \App\Models\User::skip(1)->first();

    if ($user1 && $user2) {
        $conv = \App\Models\Conversation::create([
            'user_one_id' => $user1->id,
            'user_two_id' => $user2->id,
        ]);

        \App\Models\Message::factory()->count(5)->create([
            'conversation_id' => $conv->id,
            'sender_id' => $user1->id,
        ]);
    }
}

}
