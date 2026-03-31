<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Events\UserOnline;
use App\Events\UserStatusUpdated;

class UpdateLastSeen
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $user->update(['last_seen' => now()]);

            try {
                broadcast(new UserStatusUpdated($user->id, $user->last_seen))->toOthers();
            } catch (\Exception $e) {
                // Broadcasting unavailable in this environment — skip silently
            }
        }

        return $next($request);
    }
}