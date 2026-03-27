<?php

namespace App\Http\Controllers\Swine;
use App\Http\Controllers\Controller;
use App\Models\Swine\Swine;
use App\Models\Swine\Breed;
use App\Models\Swine\SwineTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; // <-- add this at the top of your controller
use Illuminate\Support\Facades\Log;
use App\Models\Swine\SwineGroup;
use App\Models\Swine\SwineGroupMember;
use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Support\Str;
use Inertia\Inertia;

use App\Models\Swine\SwineStageSetting; // add this at top
use Illuminate\Support\Facades\DB;

class SwineMultiController extends Controller
{
    /**
     * Display active swine for the logged-in farmer.
     */
    private function classifyCategory($sex, $birthdate, $purpose)
{
    $birthdate = Carbon::parse($birthdate)->timezone('Asia/Manila');
    $today = Carbon::now('Asia/Manila');
    $ageInDays = $birthdate->diffInDays($today);
    
    $userId = Auth::id();
    $settings = \App\Models\Swine\SwineStageSetting::where('user_id', $userId)->first();
    
    $preWeaningMax = $settings->pre_weaning_max ?? 28;
    $postWeaningMax = $settings->post_weaning_max ?? 70;
    $growerMax = $settings->grower_max ?? 150;
    $breederMin = $settings->breeder_min ?? 150;
    
    // PIGLET: 70 days and below (post-weaning max)
    if ($ageInDays <= $postWeaningMax) {
        return 'piglet';
    }
    
    // For older than 70 days, categorize by sex
    if ($sex === 'male') {
        // MALE: 71-150 days = barrow, 150+ days = boar
        if ($ageInDays <= $growerMax) {
            return 'barrow'; // Young male
        } else {
            return 'boar'; // Adult male
        }
    } else { // female
        // FEMALE: 71-150 days = gilt, 150+ days = sow
        if ($ageInDays <= $growerMax) {
            return 'gilt'; // Young female
        } else {
            return 'sow'; // Adult female
        }
    }
}

public function index()
{
    $breeds = \App\Models\Swine\Breed::all();
    $today = now()->toDateString();

    $ownerId = auth()->id();

    // Get all tag numbers for this owner
    $ownerTagNumbers = \App\Models\Swine\Swine::where('owner_id', $ownerId)
        ->pluck('tag_number')
        ->toArray();

    // Find the highest numeric suffix used
    $lastNumber = 0;
    foreach ($ownerTagNumbers as $tag) {
        if (preg_match('/SWN-(\d{3})$/', $tag, $matches)) {
            $num = (int) $matches[1];
            $lastNumber = max($lastNumber, $num);
        }
    }

    $nextTag = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);

    return Inertia::render('swine/multicreate', [
        'breeds' => $breeds,
        'today' => $today,
        'nextTag' => $nextTag,
        'ownerTagNumbers' => $ownerTagNumbers,
        'maxSwineLimit' => 50,
    ]);
}



    /**
     * Show form for creating swine.
     */
//   public function create()
// {
  
   
//     $breeds = \App\Models\Swine\Breed::all();
    
//     return Inertia::render('swine/multicreate', [
//         'breeds' => $breeds,
//         'today' => now()->toDateString(), // Server time in Asia/Manila
       
//     ]);
// }

  
    
    /**
     * Helper: Calculate stage from birthdate + purpose.
     */
   // File: app/Http/Controllers/SwineController.php

private function calculateStage($birthdate, $purpose)
{
    $birthdate = Carbon::parse($birthdate)->timezone('Asia/Manila');
$today = Carbon::now('Asia/Manila');
$ageInDays = $birthdate->diffInDays($today);

    $userId = Auth::id();

    $settings = \App\Models\Swine\SwineStageSetting::where('user_id', $userId)->first();

    // Defaults if no settings
    $preWeaningMax = $settings->pre_weaning_max ?? 28;
    $postWeaningMax = $settings->post_weaning_max ?? 70;
    $growerMax = $settings->grower_max ?? 150;
    $breederMin = $settings->breeder_min ?? 150;

    // Breeder logic
    if (in_array($purpose, ['breeding_sow', 'breeding_boar']) && $ageInDays >= $breederMin) {
        return 'Breeder';
    }

    // ✅ Fixed range comparisons
    if ($ageInDays <= $preWeaningMax) {
        return 'Pre-Weaning';
    } elseif ($ageInDays <= $postWeaningMax) {
        return 'Post-Weaning';
    } elseif ($ageInDays <= $growerMax) {
        return 'Grower';
    } else {
        return 'Finisher';
    }
}

//store batch swine
// File: app/Http/Controllers/Swine/SwineMultiController.php

public function store(Request $request)
{
    $data = $request->validate([
        'total_swine' => 'required|integer|min:1',
        'male_count' => 'required|integer|min:0',
        'female_count' => 'required|integer|min:0',
        'birthdate' => 'required|date',
        'breed_id' => 'nullable|exists:breeds,id|required_without:cuztom_breed',
        'cuztom_breed' => 'nullable|string|max:255|required_without:breed_id',
        // Remove 'category' from validation
        'purpose' => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
        'weight' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
        'tag_numbers' => 'array',
        'tag_numbers.*' => [
            'nullable',
            'string',
            'max:50',
            function ($attribute, $value, $fail) {
                if (!empty($value)) {
                    $exists = \App\Models\Swine\Swine::where('tag_number', $value)
                        ->where('owner_id', Auth::id())
                        ->exists();

                    if ($exists) {
                        $fail("The tag number '{$value}' already exists under your account.");
                    }
                }
            },
        ],
    ], [
        'breed_id.required_without' => 'Please select or enter a breed.',
        'cuztom_breed.required_without' => 'Please select or enter a breed.',
    ]);

    if ($data['male_count'] + $data['female_count'] != $data['total_swine']) {
        return back()->withErrors(['male_count' => 'The total of male and female counts must equal the total swine count.']);
    }

    $common = [
        'owner_id' => Auth::id(),
        'birthdate' => $data['birthdate'],
        'breed_id' => $data['breed_id'] ?? null,
        'cuztom_breed' => $data['cuztom_breed'] ?? null,
        // Remove 'category' from common array - will be set per swine
        'purpose' => $data['purpose'],
        'weight' => $data['weight'] ?? null,
        'description' => $data['description'] ?? null,
        'status' => 'active',
    ];

    DB::transaction(function () use ($data, $common) {
        $tagNumbers = $data['tag_numbers'] ?? [];

        // Create the Swine Group
        $group = \App\Models\Swine\SwineGroup::create([
            'owner_id' => Auth::id(),
            'name' => 'Temporary',
            'description' => $data['description'] ?? null,
            'group_type' => 'feeding',
        ]);

        $group->update([
            'name' => 'Batch ' . $group->id,
        ]);

        // Register male swine with auto-classified category
        for ($i = 0; $i < $data['male_count']; $i++) {
            $category = $this->classifyCategory('male', $common['birthdate'], $common['purpose']);
            
            $swine = \App\Models\Swine\Swine::create(array_merge($common, [
                'sex' => 'male',
                'category' => $category, // Auto-classified
                'tag_number' => $data['tag_numbers'][$i] ?? Str::upper(Str::random(6)),
                'stage' => $this->calculateStage($common['birthdate'], $common['purpose']),
            ]));

            \App\Models\Swine\SwineGroupMember::create([
                'swine_group_id' => $group->id,
                'swine_id' => $swine->id,
            ]);

            \App\Models\Swine\SwineTransaction::create([
                'swine_id' => $swine->id,
                'to_owner_id' => Auth::id(),
                'transaction_type' => 'registration',
                'notes' => 'Initial swine registration',
                'performed_by_id' => Auth::id(),
            ]);
        }

        // Register female swine with auto-classified category
        for ($i = 0; $i < $data['female_count']; $i++) {
            $category = $this->classifyCategory('female', $common['birthdate'], $common['purpose']);
            
            $swine = \App\Models\Swine\Swine::create(array_merge($common, [
                'sex' => 'female',
                'category' => $category, // Auto-classified
                'tag_number' => $data['tag_numbers'][$data['male_count'] + $i] ?? Str::upper(Str::random(6)),
                'stage' => $this->calculateStage($common['birthdate'], $common['purpose']),
            ]));

            \App\Models\Swine\SwineGroupMember::create([
                'swine_group_id' => $group->id,
                'swine_id' => $swine->id,
            ]);

            \App\Models\Swine\SwineTransaction::create([
                'swine_id' => $swine->id,
                'to_owner_id' => Auth::id(),
                'transaction_type' => 'registration',
                'notes' => 'Initial swine registration',
                'performed_by_id' => Auth::id(),
            ]);
        }
    });

    return redirect()->route('swine.index')->with('success', 'Swine group and members registered successfully.');
}





}
