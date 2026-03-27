<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
 public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'role' => 'nullable|string|max:255',
    ]);

    // Create user
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => null, // <-- IMPORTANT
    ]);

    // Fire registered event
    event(new Registered($user));

    // Log activity
    log_activity('created', 'users', [
        'user_id' => $user->id,
        'email' => $user->email,
        'role' => $user->role,
    ]);

    // Login the user
    Auth::login($user);

    // Optionally, log the login too
    log_activity('login', 'auth', [
        'user_id' => $user->id,
        'ip' => $request->ip(),
    ]);

    // Redirect
    // return redirect()->intended(route('profile.prompt', absolute: false));
    return redirect()->route('profile.prompt');

}

}
