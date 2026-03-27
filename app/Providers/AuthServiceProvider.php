<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

// ✅ Add these
use App\Models\Conversation;
use App\Models\Message;
use App\Policies\ConversationPolicy;
use App\Policies\MessagePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     */
    protected $policies = [
    \App\Models\Message::class => \App\Policies\MessagePolicy::class,
    \App\Models\Conversation::class => \App\Policies\ConversationPolicy::class,
];


    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Optional Gate
        Gate::define('view-chat', function ($user, $conversation) {
            return $conversation->user_one_id === $user->id || 
                   $conversation->user_two_id === $user->id;
        });
    }
}
