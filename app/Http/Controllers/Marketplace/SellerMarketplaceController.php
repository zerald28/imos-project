<?php

namespace App\Http\Controllers\Marketplace;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserInformation;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class SellerMarketplaceController extends Controller
{
    /**
     * Display seller profile info
     */
    public function edit()
    {
        $user = Auth::user()->load([
            'userInformation.province',
            'userInformation.municipal',
            'userInformation.barangay'
        ]);

        return Inertia::render('marketplace/seller/profile', [
            'user' => [
                'id' => $user->id,
                'username' => $user->name,
                'email' => $user->email,
                'profile_picture' => $user->userInformation?->profile_picture
                    ? asset('storage/' . $user->userInformation->profile_picture)
                    : asset('images/default-profile.png'),
                'contact' => $user->userInformation?->contact,
                'address' => [
                    'province' => $user->userInformation?->province?->name,
                    'municipal' => $user->userInformation?->municipal?->name,
                    'barangay' => $user->userInformation?->barangay?->name,
                    'purok' => $user->userInformation?->purok,
                    'street' => $user->userInformation?->street,
                ],
                'full_name' => trim(
                    $user->userInformation?->firstname . ' ' .
                    ($user->userInformation?->middlename ? $user->userInformation->middlename[0] . '. ' : '') .
                    $user->userInformation?->lastname
                ),
            ]
        ]);
    }

    /**
     * Update seller profile info
     */
    public function update(Request $request)
{
    $user = Auth::user();

    $validated = $request->validate([
        'name' => ['nullable', 'string', 'max:255'],
        'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
        'contact' => ['nullable', 'string', 'max:20'],
        'purok' => ['nullable', 'string', 'max:255'],
        'street' => ['nullable', 'string', 'max:255'],
        'province_id' => ['nullable', 'integer', 'exists:provinces,id'],
        'municipal_id' => ['nullable', 'integer', 'exists:municipals,id'],
        'barangay_id' => ['nullable', 'integer', 'exists:barangays,id'],
        'profile_picture' => ['nullable', 'image', 'max:2048'],
    ]);

    // 1️⃣ Update user table
    $user->update([
        'name' => $validated['name'],
        'email' => $validated['email'],
    ]);

    // 2️⃣ Handle profile picture
    $profilePicturePath = null;
    if ($request->hasFile('profile_picture')) {
        $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
    }

    // 3️⃣ Create or update userInformation
    $userInformation = $user->userInformation()->first(); // fetch existing record if exists

    if ($userInformation) {
        // Update existing
        $userInformation->update(array_filter([
            'contact' => $validated['contact'] ?? $userInformation->contact,
            'purok' => $validated['purok'] ?? $userInformation->purok,
            'street' => $validated['street'] ?? $userInformation->street,
            'province_id' => $validated['province_id'] ?? $userInformation->province_id,
            'municipal_id' => $validated['municipal_id'] ?? $userInformation->municipal_id,
            'barangay_id' => $validated['barangay_id'] ?? $userInformation->barangay_id,
            'profile_picture' => $profilePicturePath ?? $userInformation->profile_picture,
        ]));
    } else {
        // Create new
        $user->userInformation()->create([
             'firstname' => $request->input('firstname') ?? 'Unknown',
    'middlename' => $request->input('middlename') ?? null,
    'lastname' => $request->input('lastname') ?? 'Unknown',
            'contact' => $validated['contact'] ?? null,
            'purok' => $validated['purok'] ?? null,
            'street' => $validated['street'] ?? null,
            'province_id' => $validated['province_id'] ?? null,
            'municipal_id' => $validated['municipal_id'] ?? null,
            'barangay_id' => $validated['barangay_id'] ?? null,
            'profile_picture' => $profilePicturePath,
        ]);
    }

    // ✅ Redirect to the intended URL if available
$intendedUrl = session('intended_url');
if ($intendedUrl) {
    session()->forget('intended_url');
    return redirect($intendedUrl)->with('success', 'Profile updated successfully!');
}

// Default fallback
return redirect()->back()->with('success', 'Profile updated successfully!');

//   return redirect(url()->previous())->with('success', 'Profile updated successfully!');
    // return redirect()->back()->with('success', 'Profile updated successfully!');
}

}
