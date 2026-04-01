<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Events\UserOnline;
use Illuminate\Support\Facades\Broadcast;
use App\Events\UserStatusUpdated;

class UpdateLastSeen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // inside handle()


if (Auth::check()) {
    $user = Auth::user();
    $user->update(['last_seen' => now()]);
    broadcast(new UserStatusUpdated($user->id, $user->last_seen))->toOthers();
}

        return $next($request);
    }
}