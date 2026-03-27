<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserInformation;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
{
    
    $request->authenticate();
    $request->session()->regenerate();

    $user = $request->user()->load('userInformation');

    if (empty($user->role)) {
        return redirect()->route('profile.prompt')
            ->with('message', 'Please select your role first.');
    }

      // Redirect based on role
    if ($user->role === 'buyer') {
        return redirect()->route('marketplace.index');
    }

      // Redirect based on role
    if ($user->role === 'farmer') {
        return redirect()->route('farmer.home');
    }
    

    if ($user->role === 'admin') {
        return redirect()->route('admin.index');
    }


    if ($user->role === 'enforcer') {
        return redirect()->route('admin.index');
    }


    return redirect()->intended(route('home'));
}



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }


    
}
