<?php

namespace App\Http\Controllers\Form;

use App\Models\PDF\LivestockInsuranceApplication;
use App\Http\Controllers\Controller;
use App\Models\PDF\LivestockAnimal;
use App\Models\User;
use App\Models\Swine\SwineGroup;
use App\Models\Swine\Swine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Auth;
class LivestockInsuranceApplicationController extends Controller
{
  public function create()
{
    $usedSwineIds = \DB::table('livestock_animals')
    ->pluck('livestock_id')
    ->toArray();

    $groups = SwineGroup::with('swine')->get();

   $farmers = User::with([
    'userInformation.province',
    'userInformation.municipal',
    'userInformation.barangay',
    'swine.breed'
])
->where('role', 'farmer')
->get()
->map(function($farmer) use ($usedSwineIds) {

    return [
        'id' => $farmer->id,
        'name' => trim(
            ($farmer->userInformation->firstname ?? '') . ' ' .
            ($farmer->userInformation->middlename ?? '') . ' ' .
            ($farmer->userInformation->lastname ?? '')
        ),
        'address' => optional($farmer->userInformation->province)->name . ', ' .
                     optional($farmer->userInformation->municipal)->name . ', ' .
                     optional($farmer->userInformation->barangay)->name . ', ' .
                     ($farmer->userInformation->purok ?? ''),

        'contact' => $farmer->userInformation->contact ?? '',

        // ✔ Only include swine NOT in livestock_animals
        'swine' => $farmer->swine
    ->reject(fn($s) => in_array($s->id, $usedSwineIds))
    ->map(function($sw) {
        // Calculate age in days from birthdate
        $ageInDays = null;
        if ($sw->birthdate) {
            $birthdate = Carbon::parse($sw->birthdate);
            $ageInDays = Carbon::now()->diffInDays($birthdate); // age in days
        }

        return [
            'id' => $sw->id,
            'sex' => $sw->sex,
            'breed' => optional($sw->breed)->name,
            'tag_number' => $sw->tag_number,
            'description' => $sw->description,
            'age' => $sw->age_in_days, // ✅ accessor used here
        ];
    })
    ->values(),
    ];
});

$proponents = User::with('userInformation')
    ->whereIn('role', ['admin', 'enforcer'])
    ->get()
    ->map(function ($user) {
        return [
            'id' => $user->id,
            'name' => $user->userInformation
                ? trim($user->userInformation->firstname . ' ' . $user->userInformation->middlename . ' ' . $user->userInformation->lastname)
                : $user->name,
        ];
    });




    return Inertia::render('insurance/application', [
        'farmers' => $farmers,
         'proponents' => $proponents,  // ✅ add this
        'groups' => $groups, // ✅ pass groups here
        'authUserName' => auth()->user()->userInformation
            ? auth()->user()->userInformation->firstname . ' ' .
              auth()->user()->userInformation->middlename . ' ' .
              auth()->user()->userInformation->lastname
            : auth()->user()->name,
    ]);
}


 public function store(Request $request)
{
    $data = $request->validate([
        // Application-level fields
        'farmer_id' => 'required|exists:users,id',
        'farmer_name' => 'required|string|max:255',
        'proponent' => 'nullable|exists:users,id',
        'proponent_name' => 'nullable|string|max:255',
        'cover_type' => 'required|string',
        'is_indigenous' => 'boolean',
        'tribe' => 'nullable|string',
        'is_pwd' => 'boolean',
        'spouse_name' => 'nullable|string',
        'address' => 'required|string',
        'farm_address' => 'required|string',
        'contact_no' => 'required|string',
        'animal_type' => 'required|string',
        'purpose' => 'nullable|string',
        'source_of_stock' => 'nullable|string',
        'no_of_housing_units' => 'nullable|integer',
        'birds_per_unit' => 'nullable|integer',
        'date_of_purchase' => 'nullable|date',
        'desired_sum_insured' => 'nullable|numeric',
        'total_sum_insured' => 'nullable|numeric',
        'epidemic_1' => 'nullable|string',
        'epidemic_2' => 'nullable|string',
        'epidemic_3' => 'nullable|string',
        'assignee' => 'nullable|string',
        'assignee_address' => 'nullable|string',
        'assignee_contact' => 'nullable|string',
        'pdf_path' => 'nullable|string',

        // Animal entries
        'animals' => 'required|array|min:1',
        'animals.*.livestock_id' => 'nullable|exists:swine,id',
        'animals.*.sex' => 'nullable|string',
        'animals.*.age' => 'nullable|string',
        'animals.*.breed' => 'nullable|string',
        'animals.*.ear_mark' => 'nullable|string',
        'animals.*.color' => 'nullable|string',
        'animals.*.proof_of_ownership' => 'nullable|string',
    ]);

    // 1. Create main application
    $applicationData = collect($data)->except('animals')->toArray();
    $application = LivestockInsuranceApplication::create($applicationData);

    // 2. Create animals safely
    foreach ($data['animals'] as $animal) {
        $swine = $animal['livestock_id'] ? Swine::with('breed')->find($animal['livestock_id']) : null;

        $ageInDays = null;
        $breedName = $animal['breed'] ?? null;

        if ($swine) {
            // Calculate age in days if birthdate exists
            $ageInDays =$swine->birthdate ? Carbon::parse($swine->birthdate)->diffInDays(now()) : null;
            

            // Use swine breed if not provided
            $breedName = $breedName ?? ($swine->breed->name ?? $swine->cuztom_breed ?? null);
        }

        LivestockAnimal::create([
            'application_id' => $application->id,
            'livestock_id' => $animal['livestock_id'] ?? null,
            'sex' => $animal['sex'] ?? ($swine->sex ?? null),
            'age' =>$swine->birthdate ? Carbon::parse($swine->birthdate)->diffInDays(now()) : null,
            'breed' => $breedName,
            'ear_mark' => $animal['ear_mark'] ?? ($swine->tag_number ?? null),
            'color' => $animal['color'] ?? ($swine->description ?? null),
            'proof_of_ownership' => $animal['proof_of_ownership'] ?? null,
        ]);
    }

    // Update head count safely
    try {
        $application->updateHeadCount();
    } catch (\Exception $e) {
        \Log::error("Failed to update head count for application {$application->id}: ".$e->getMessage());
    }

    return redirect()
        ->route('insurance.application.show', $application->id)
        ->with('success', 'Application submitted successfully.');
}

  public function show($id)
{
    $application = LivestockInsuranceApplication::findOrFail($id);

    $animals = LivestockAnimal::where('application_id', $application->id)->get();

    $globallyUsedSwineIds = LivestockAnimal::pluck('livestock_id')
    ->filter()
    ->toArray();


    $farmer = User::with('userInformation', 'swine')->find($application->farmer_id);

    $farmerProfile = $farmer->userInformation && $farmer->userInformation->profile_picture
        ? asset('storage/' . $farmer->userInformation->profile_picture)
        : asset('default.png');

    $proponent = User::find($application->proponent);

    // Only show swine that are not yet added in this application
   $ownedSwine = $farmer->swine()
    ->whereNotIn('id', $globallyUsedSwineIds)
    ->with('breed')
    ->get();

       $user = Auth::user();

    return Inertia::render('insurance/applicationShow', [
        'application' => $application,
        'animals' => $animals,
        'farmer' => [
            'id' => $farmer->id,
            'name' => $farmer->name,
            'profile' => $farmerProfile,
            'address' => $farmer->userInformation->address ?? '',
            'contact_no' => $farmer->userInformation->contact ?? '',
        ],
        'proponent' => $proponent,
        'availableSwine' => $ownedSwine,
         'authUser' => $user,
    ]);
}



// Add a swine to an existing application
public function addAnimal(Request $request, $applicationId)
{
    $application = LivestockInsuranceApplication::findOrFail($applicationId);

    $data = $request->validate([
        'livestock_id' => 'nullable|exists:swine,id',
        'sex' => 'nullable|string',
        'breed' => 'nullable|string',
        'ear_mark' => 'nullable|string',
        'color' => 'nullable|string',
        'proof_of_ownership' => 'nullable|string',
    ]);

    $swine = $data['livestock_id'] ? Swine::find($data['livestock_id']) : null;

    $ageInDays = null;
    if ($swine && $swine->birthdate) {
        $ageInDays = Carbon::parse($swine->birthdate)->diffInDays(Carbon::now());
    }

    $animal = LivestockAnimal::create([
        'application_id' => $application->id,
        'livestock_id' => $data['livestock_id'] ?? null,
        'sex' => $data['sex'] ?? ($swine->sex ?? null),
        'breed' => $data['breed'] ?? ($swine->breed->name ?? null),
        'ear_mark' => $data['ear_mark'] ?? ($swine->tag_number ?? null),
        'color' => $data['color'] ?? ($swine->description ?? null),
        'age' => $ageInDays,
        'proof_of_ownership' => $data['proof_of_ownership'] ?? null,
    ]);

    // Update total head count
    $application->updateHeadCount();

    return response()->json([
        'success' => true,
        'animal' => $animal,
        'number_of_heads' => $application->number_of_heads,
    ]);
}
public function addMultipleAnimals(Request $request, $applicationId)
{
    $application = LivestockInsuranceApplication::findOrFail($applicationId);

    // Validate input
    $data = $request->validate([
        'swine_ids' => 'required|array',
        'swine_ids.*' => 'exists:swine,id',
        'proof_of_ownership' => 'nullable|string',
    ]);

    $createdAnimals = [];
    $skippedDuplicates = []; // Track swine already added

    foreach ($data['swine_ids'] as $swineId) {

        // Prevent duplicate livestock_id for this application
        $alreadyExists = LivestockAnimal::where('application_id', $application->id)
            ->where('livestock_id', $swineId)
            ->exists();

        if ($alreadyExists) {
            $skippedDuplicates[] = $swineId;
            continue;
        }

        // Fetch swine with breed
        $swine = Swine::with('breed')->find($swineId);

        if (!$swine) {
            \Log::warning("Swine ID $swineId not found for application $applicationId");
            continue;
        }

        // Determine breed name
        $breedName = $swine->breed ? $swine->breed->name : ($swine->cuztom_breed ?? null);

        $createdAnimals[] = LivestockAnimal::create([
            'application_id' => $application->id,
            'livestock_id' => $swine->id,
            'sex' => $swine->sex,
            'breed' => $breedName,
            'ear_mark' => $swine->tag_number,
            'color' => $swine->description,
            'age' => $swine->birthdate ? Carbon::parse($swine->birthdate)->diffInDays(now()) : null,
            'proof_of_ownership' => $data['proof_of_ownership'],
        ]);
    }

    // Update total head count safely
    try {
        $application->updateHeadCount();
    } catch (\Exception $e) {
        \Log::error("Failed to update head count for application $applicationId: ".$e->getMessage());
    }

    return response()->json([
        'success' => true,
        'animals' => $createdAnimals,
        'skipped_duplicates' => $skippedDuplicates, // ← NEW
        'number_of_heads' => $application->number_of_heads,
    ]);
}



// Delete an animal
public function deleteAnimal($id)
{
    $animal = LivestockAnimal::findOrFail($id);
    $application = $animal->application;
    $animal->delete();

    // Update total head count
    $application->updateHeadCount();

    return response()->json([
        'success' => true,
        'number_of_heads' => $application->number_of_heads,
    ]);
}

public function updateAnimal(Request $request, $id)
{
    $animal = LivestockAnimal::findOrFail($id);

    $validated = $request->validate([
        'sex' => 'required|string',
        'breed' => 'nullable|string',
        'ear_mark' => 'nullable|string',
        'color' => 'nullable|string',
        'age' => 'nullable|integer',
        'proof_of_ownership' => 'nullable|string',
    ]);

    $animal->update($validated);

    return response()->json([
        'success' => true,
        'animal' => $animal
    ]);
}

public function edit($id)
{
    $insurance = LivestockInsuranceApplication::with([
        'farmer.userInformation'
    ])->findOrFail($id);

    $proponents = User::with('userInformation')
    ->whereIn('role', ['admin', 'enforcer'])
    ->get()
    ->map(function ($user) {
        return [
            'id' => $user->id,
            'name' => $user->userInformation
                ? trim($user->userInformation->firstname . ' ' . $user->userInformation->middlename . ' ' . $user->userInformation->lastname)
                : $user->name,
        ];
    });

    return inertia('insurance/applicationEdit', [
        'insurance' => $insurance,
        'authUserName' => auth()->user()->userInformation 
            ? auth()->user()->userInformation->firstname.' '.auth()->user()->userInformation->lastname 
            : auth()->user()->name,
         'proponents' => $proponents,  // ✅ add this
    ]);
}


public function update(Request $request, $id)
{
    // Validate input
    $data = $request->validate([
        'farmer_name' => 'required|string|max:255',
        'address' => 'required|string|max:500',
        'farm_address' => 'required|string|max:500',
        'contact_no' => 'nullable|string|max:20',
        'spouse_name' => 'nullable|string|max:255',
        'is_indigenous' => 'nullable|boolean',
        'tribe' => 'nullable|string|max:255',
        'is_pwd' => 'nullable|boolean',
        'cover_type' => 'required|string|in:commercial,non-commercial,special',
        'purpose' => 'required|string|in:breeding,fattening',
        'source_of_stock' => 'nullable|string|max:255',
        'no_of_housing_units' => 'nullable|integer|min:0',
        'birds_per_unit' => 'nullable|integer|min:0',
        'date_of_purchase' => 'nullable|date',
        'desired_sum_insured' => 'nullable|numeric|min:0',
        'total_sum_insured' => 'nullable|numeric|min:0',
        'epidemic_1' => 'nullable|string|max:255',
        'epidemic_2' => 'nullable|string|max:255',
        'epidemic_3' => 'nullable|string|max:255',
        'assignee' => 'nullable|string|max:255',
        'assignee_address' => 'nullable|string|max:500',
        'assignee_contact' => 'nullable|string|max:20',

        // Proponent
        'proponent' => 'nullable|exists:users,id',
        'proponent_name' => 'nullable|string|max:255',
    ]);

    // Find the insurance application
    $insurance = LivestockInsuranceApplication::findOrFail($id);

    // Update the record
    $insurance->update([
        'farmer_name' => $data['farmer_name'],
        'address' => $data['address'],
        'farm_address' => $data['farm_address'],
        'contact_no' => $data['contact_no'],
        'spouse_name' => $data['spouse_name'],
        'is_indigenous' => $data['is_indigenous'] ?? false,
        'tribe' => $data['tribe'] ?? null,
        'is_pwd' => $data['is_pwd'] ?? false,
        'cover_type' => $data['cover_type'],
        'purpose' => $data['purpose'],
        'source_of_stock' => $data['source_of_stock'],
        'no_of_housing_units' => $data['no_of_housing_units'],
        'birds_per_unit' => $data['birds_per_unit'],
        'date_of_purchase' => $data['date_of_purchase'],
        'desired_sum_insured' => $data['desired_sum_insured'],
        'total_sum_insured' => $data['total_sum_insured'],
        'epidemic_1' => $data['epidemic_1'],
        'epidemic_2' => $data['epidemic_2'],
        'epidemic_3' => $data['epidemic_3'],
        'assignee' => $data['assignee'],
        'assignee_address' => $data['assignee_address'],
        'assignee_contact' => $data['assignee_contact'],

        // Proponent fields
        'proponent' => $data['proponent'],
        'proponent_name' => $data['proponent_name'],
    ]);

  return redirect()->route('insurance.application.show', $insurance->id)
    ->with('success', 'Insurance application updated successfully.');


}


}
