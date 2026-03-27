<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\UserInformation;
use Illuminate\Support\Facades\Auth;

class UserInformationController extends Controller
{

   public function create()
{
    $user = Auth::user();
    $userInfo = UserInformation::where('user_id', $user->id)->first();

    // ✅ Explicitly return null if no info exists
    return Inertia::render('UserProfile/Create', [
        'userInformation' => $userInfo ?: null, // This ensures null instead of empty array
    ]);
}

    public function storeOrUpdate(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'extension' => 'nullable|string|max:10',
            'contact' => 'nullable|string|max:20',
            'birthdate' => 'required|date',
            'gender' => 'nullable|in:male,female,other',
            'civil_status' => 'nullable|string|max:50',
            'occupation' => 'nullable|string|max:100',
            'profile_picture' => 'nullable|image|max:2048',
            'province_id' => 'nullable|exists:provinces,id',
            'municipal_id' => 'nullable|exists:municipals,id',
            'barangay_id' => 'nullable|exists:barangays,id',
            'purok' => 'nullable|string|max:100',
            'street' => 'nullable|string|max:255',
              'farming_type' => 'required|in:backyard,commercial', // ✅ ADD THIS
        ]);

        // ✅ Handle file upload (optional)
        if ($request->hasFile('profile_picture')) {
            $validated['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $userInfo = UserInformation::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return redirect()->back()->with('success', $userInfo->wasRecentlyCreated
            ? 'Profile created successfully.'
            : 'Profile updated successfully.'
        );
    }

    public function updateProfileInformation(Request $request, $id)
    {
        // Fetch the record using user_id (PK & FK)
        $userInfo = UserInformation::where('user_id', $id)->first();

        if (!$userInfo) {
            return back()->with('error', 'User information not found.');
        }

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'extension' => 'nullable|string|max:10',
            'contact' => 'nullable|string|max:20',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'civil_status' => 'nullable|string|max:50',
            'occupation' => 'nullable|string|max:100',
            'province_id' => 'nullable|exists:provinces,id',
            'municipal_id' => 'nullable|exists:municipals,id',
            'barangay_id' => 'nullable|exists:barangays,id',
            'purok' => 'nullable|string|max:100',
            'street' => 'nullable|string|max:255',
        ]);

        $userInfo->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

   public function store(Request $request)
{
    $request->validate([
        'firstname' => 'required|string|max:255',
        'middlename' => 'nullable|string|max:255',
        'lastname' => 'required|string|max:255',
        'extension' => 'nullable|string|max:10',
        'contact' => 'nullable|string|max:20',
        'birthdate' => 'required|date',
        'gender' => 'nullable|in:male,female,other',
        'civil_status' => 'nullable|string|max:50',
        'occupation' => 'nullable|string|max:100',
        'profile_picture' => 'nullable|image|max:2048',
        'province_id' => 'nullable|exists:provinces,id',
        'municipal_id' => 'nullable|exists:municipals,id',
        'barangay_id' => 'nullable|exists:barangays,id',
        'purok' => 'nullable|string|max:100',
        'street' => 'nullable|string|max:255',
          'farming_type' => 'required|in:backyard,commercial', // ✅ ADD THISs
    ]);

    $data = $request->all();

    // Handle profile picture upload
    if ($request->hasFile('profile_picture')) {
    $path = $request->file('profile_picture')->store('profile_pictures', 'public');
    $data['profile_picture'] = $path;
} else {
    // Remove profile_picture from $data to prevent overwriting
    unset($data['profile_picture']);
}

    // Create or update the user information
    $userInfo = $request->user()->userInformation()->updateOrCreate(
        ['user_id' => $request->user()->id],
        $data
    );

    // Update user role
    $request->user()->update(['role' => 'farmer']);

    // Log the activity
    log_activity(
        'Profile completed and role updated to Farmer',
        'User Profile',
        [
            'user_id' => $request->user()->id,
            'user_info_id' => $userInfo->user_id, // <- primary key is user_id
            'new_role' => 'farmer'
        ]
    );

    return redirect()->route('dashboard')->with('success', 'Profile completed and role updated to Farmer!');
}


    public function show()
    {
        $user = auth()->user();

        // Load user information (with address relations if needed)
        $userInfo = $user->userInformation()
            ->with(['province', 'municipal', 'barangay'])
            ->first();

        return Inertia::render('UserProfile/Show', [
            'user' => $userInfo
        ]);
    }
}
