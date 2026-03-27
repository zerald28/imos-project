<?php

namespace App\Http\Controllers;

use App\Models\Location\Barangay;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // List all users except the current logged-in user
    public function index()
    {
        $users = User::select('id', 'name', 'last_seen')->get();
        return response()->json(['data' => $users]);
    }

 public function ping()
{
    $user = auth()->user();

    // Force DB update and reload fresh value
    $user->forceFill(['last_seen' => now()])->save();

    return response()->json([
        'status' => 'ok',
        'last_seen' => $user->fresh()->last_seen,
    ]);
}

public function chooseRole(Request $request)
{
    $request->validate([
        'role' => 'required|in:buyer,farmer',
    ]);

    $user = $request->user();

    
    $user->role = $request->role;
    $user->save();

    // Log the role change activity
    log_activity('choose role', 'user', [
        'user_id' => $user->id,
        'role' => $user->role
    ]);

    // Return redirect URL as JSON
    return response()->json([
        'redirect' => $user->role === 'buyer'
            ? route('marketplace.profile.own')
            : route('user_informations.create')
    ]);
}


// app/Http/Controllers/DAPersonnelController.php

public function da_personel()
{
    // Get all admin and enforcer users with their user information
    $personnel = User::whereIn('role', ['admin', 'enforcer'])
        ->with(['userInformation' => function($query) {
            $query->with(['barangay', 'municipal', 'province']);
        }])
        ->get()
        ->map(function($user) {
            $userInfo = $user->userInformation;
            
            return [
                'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'firstname' => $userInfo->firstname ?? null,
                    'middlename' => $userInfo->middlename ?? null,
                    'lastname' => $userInfo->lastname ?? null,
                    'extension' => $userInfo->extension ?? null,
                    'full_name' => $userInfo ? trim(
                        ($userInfo->firstname ?? '') . ' ' . 
                        ($userInfo->middlename ?? '') . ' ' . 
                        ($userInfo->lastname ?? '') . ' ' . 
                        ($userInfo->extension ?? '')
                    ) : $user->name,
                    'contact' => $userInfo->contact ?? 'Not provided',
                    'description' => $userInfo->description ?? 'No description provided',
                    'barangay' => $userInfo && $userInfo->barangay ? [
                        'id' => $userInfo->barangay->id,
                        'name' => $userInfo->barangay->name,
                    ] : null,
                    'municipal' => $userInfo && $userInfo->municipal ? [
                        'id' => $userInfo->municipal->id,
                        'name' => $userInfo->municipal->name,
                    ] : null,
                    'province' => $userInfo && $userInfo->province ? [
                        'id' => $userInfo->province->id,
                        'name' => $userInfo->province->name,
                    ] : null,
                    'profile_picture' => $userInfo->profile_picture ?? null,
                ];
            });

    // Get all barangays for Bunawan municipal (ID: 2)
    $bunawanBarangays = Barangay::where('municipal_id', 2)
        ->orderBy('name')
        ->get(['id', 'name']);

    return Inertia::render('insurance/personnel', [
        'personnel' => $personnel,
        'bunawanBarangays' => $bunawanBarangays
    ]);
}



}

