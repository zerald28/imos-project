<?php
// File: app/Http/Controllers/Form/VeterinaryDiseaseReportController.php

namespace App\Http\Controllers\Form;

use App\Http\Controllers\Controller;
use App\Models\PDF\VeterinaryDiseaseReport;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\LivestockAnimal;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\InsuranceSignature;
use App\Models\VeterinaryRequest;

class VeterinaryDiseaseReportController extends Controller
{
    /**
     * Store a new Veterinary Disease Report
     * 
     */

    // VeterinaryDiseaseReportController.php
public function apiList(Request $request)
{
    $search = $request->query('search');

    // Fetch all applications with farmer info
    $applications = LivestockInsuranceApplication::with(['farmer.userInformation'])
        ->orderBy('id', 'DESC');

    if ($search) {
        $applications->whereHas('farmer', function ($q) use ($search) {
            $q->whereHas('userInformation', function ($q2) use ($search) {
                $q2->whereRaw("CONCAT(firstname, ' ', middlename, ' ', lastname) LIKE ?", ["%$search%"])
                   ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ["%$search%"])
                   ->orWhere('firstname', 'LIKE', "%$search%")
                   ->orWhere('lastname', 'LIKE', "%$search%");
            });
        });
    }

    // Get all applications first
    $allApps = $applications->get();

    // Group by farmer_id
    $grouped = $allApps->groupBy('farmer_id')->map(function ($items, $farmer_id) {
        return [
            'farmer_id' => $farmer_id,
            'farmer' => $items->first()->farmer, // pick any, all same
            'cover_type' => $items->pluck('cover_type')->filter()->unique()->implode(', '),
            'number_of_heads' => $items->sum('number_of_heads'),
        ];
    })->values(); // reset keys

    // Manual pagination
    $perPage = 10;
    $page = (int) request()->query('page', 1);
    $total = $grouped->count();
    $paginated = $grouped->slice(($page - 1) * $perPage, $perPage)->values();

    return response()->json([
        'data' => $paginated,
        'current_page' => $page,
        'last_page' => ceil($total / $perPage),
        'total' => $total,
    ]);
}

// VeterinaryDiseaseReportController.php

public function getFarmerAnimals($farmerId)
{
    $applications = LivestockInsuranceApplication::with(['animals.livestock'])
        ->where('farmer_id', $farmerId)
        ->get();

    $animals = $applications->flatMap(fn($app) => $app->animals); // combine all animals from all applications

    return response()->json($animals);
}


public function index(Request $request)
{
    $animalIds = $request->query('animal_ids', []);
    $animals = [];

    if (!empty($animalIds)) {
        $animals = \App\Models\PDF\LivestockAnimal::whereIn('id', $animalIds)
            ->with('livestock', 'application')
            ->get();
    }

    // Check if any animal already has a report
    $animalsWithReport = $animals->filter(fn($a) => $a->veterinary_report_id);
    
    // If ANY animal already has a report, redirect to edit that report
    if ($animalsWithReport->isNotEmpty()) {
        // Get the first animal with a report
        $firstAnimalWithReport = $animalsWithReport->first();
        
        // Use the correct route name from your routes file
        return redirect()->route('veterinary.report.edit', 
            ['id' => $firstAnimalWithReport->veterinary_report_id]
        );
    }

    // Filter only animals without a report (for creating new report)
    $animalsWithoutReport = $animals->filter(fn($a) => !$a->veterinary_report_id);

    // Get authenticated user's information
    $user = auth()->user();
    $veterinarianName = '';
    
    if ($user && $user->userInformation) {
        $veterinarianName = trim(
            ($user->userInformation->firstname ?? '') . ' ' .
            ($user->userInformation->middlename ?? '') . ' ' .
            ($user->userInformation->lastname ?? '')
        );
    }

    // Get farmer name from the first animal's application (if available)
    $policyHolder = '';
    if ($animalsWithoutReport->isNotEmpty()) {
        $firstAnimal = $animalsWithoutReport->first();
        if ($firstAnimal->application && !empty($firstAnimal->application->farmer_name)) {
            $policyHolder = $firstAnimal->application->farmer_name;
        }
    }

    return Inertia::render('insurance/VeterinaryForm', [
        'title' => 'Veterinary Disease Report Form',
        'animals' => $animalsWithoutReport,
        'veterinarian_name' => $veterinarianName,
        'policy_holder' => $policyHolder,
    ]);
}



    public function store(Request $request)
    {
        // Validate user inputs (server-side security)
        $validated = $request->validate([

            // Basic policy info
            'policy_holder' => 'required|string|max:255',
            'address' => 'nullable|string',
            'province' => 'nullable|string|max:255',
            'contact_no' => 'nullable|string|max:50',
            'policy_no' => 'nullable|string|max:100',

            // Q1
            'q1a_called_date' => 'nullable|date',
            'q1a_called_time' => 'nullable',
            'q1b_examined_date' => 'nullable|date',
            'q1b_examined_time' => 'nullable',

            // Q2
            'q2_preliminary_report' => 'nullable|string',

            // Q3
            'q3a_temperature' => 'nullable|string|max:100',
            'q3a_breathing' => 'nullable|string|max:100',
            'q3a_pulse' => 'nullable|string|max:100',
            'q3b_disease_stage' => 'nullable|string|max:50',
            'q3c_lameness_position_degree' => 'nullable|string',
            'q3d_nourishment_state' => 'nullable|string',
            'q3e_diagnostic_aids' => 'nullable|string',

            // Q4
            'q4_diagnosis' => 'nullable|string',

            // Q5
            'q5a_cure_possible' => 'nullable|boolean',
            'q5b_cure_time' => 'nullable|string|max:255',
            'q5c_hospital_cure_possible' => 'nullable|boolean',

            // Q6
            'q6a_treatment_given' => 'nullable|string',
            'q6b_special_instructions' => 'nullable|string',
            'q6c_visits_count' => 'nullable|integer|min:0',
            'q6c_visits_dates' => 'array',
'q6c_visits_dates.*' => 'date',


            // Q7
            'q7_cause_of_disease' => 'nullable|string',

            // Q8
            'q8a_very_sick_before' => 'nullable|boolean',
            'q8b_symptoms_recognizable_time' => 'nullable|string',
            'q8c_first_aid_effective' => 'nullable|boolean',
            'q8d_previous_treatment_details' => 'nullable|string',

            // Q9
            'q9a_connection_previous_disease' => 'nullable|boolean',
            'q9b_previous_disease_treatment_details' => 'nullable|string',

            // Q10–14
            'q10_other_defects' => 'nullable|string',
            'q11_instructions_followed' => 'nullable|boolean',
            'q12_intentional_destruction_needed' => 'nullable|boolean',
            'q12a_slaughter_economical' => 'nullable|boolean',
            'q12b_slaughter_value' => 'nullable|boolean',
            'q13_future_use' => 'nullable|string',
            'q14_remarks' => 'nullable|string',
            'signed_at_location' => 'nullable|string|max:255',
            'signed_at_date' => 'nullable|date',
            'veterinarian_name' => 'nullable|string|max:255',
            'stamp_data' => 'nullable|array',

             // ...all your existing validations
        'animals' => 'array',
        'animals.*.id' => 'required|integer|exists:livestock_animals,id',
        'animals.*.name' => 'nullable|string|max:255',
        'animals.*.breed' => 'nullable|string|max:255',
        'animals.*.age' => 'nullable|integer',
        'animals.*.sex' => 'nullable|string|max:50',
        'animals.*.basic_color' => 'nullable|string|max:100',
        'animals.*.identifying_marks' => 'nullable|string|max:255',
        'animals.*.brand_tattoo' => 'nullable|string|max:255',
        'animals.*.live_weight' => 'nullable|numeric',
        'animals.*.genus' => 'nullable|string|max:100',
        
        ]);
    $validated['veterinary_id'] = auth()->id();


// Create the veterinary report
    $report = VeterinaryDiseaseReport::create($validated);
    

    // Update each animal with the report id and the new data
    $farmerId = null;
    $processedApplications = []; // Track unique application IDs
    $animalIds = []; // Track all animal IDs for updating requests
    
    if (!empty($validated['animals'])) {
        foreach ($validated['animals'] as $animalData) {
            $animal = LivestockAnimal::find($animalData['id']);
            
            if ($animal) {
                // Track animal ID
                $animalIds[] = $animal->id;
                
                // Update animal with report ID and new data
                $animal->update([
                    'name' => $animalData['name'] ?? $animal->name,
                    'breed' => $animalData['breed'] ?? $animal->breed,
                    'age' => $animalData['age'] ?? $animal->age,
                    'sex' => $animalData['sex'] ?? $animal->sex,
                    'basic_color' => $animalData['basic_color'] ?? $animal->basic_color,
                    'identifying_marks' => $animalData['identifying_marks'] ?? $animal->identifying_marks,
                    'brand_tattoo' => $animalData['brand_tattoo'] ?? $animal->brand_tattoo,
                    'live_weight' => $animalData['live_weight'] ?? $animal->live_weight,
                    'genus' => $animalData['genus'] ?? $animal->genus,
                    'veterinary_report_id' => $report->id,
                ]);

                // Get farmer_id from first animal's application
                if (!$farmerId && $animal->application) {
                    $farmerId = $animal->application->farmer_id;
                }

                // Track unique application IDs for creating InsuranceSignature rows
                if ($animal->application_id && !in_array($animal->application_id, $processedApplications)) {
                    $processedApplications[] = $animal->application_id;
                }
            }
        }
    }

    // ✅ Create InsuranceSignature rows for each unique application
    foreach ($processedApplications as $applicationId) {
        InsuranceSignature::create([
            'application_id' => $applicationId,
            'veterinary_disease_report_id' => $report->id,
            'user_id' => auth()->id(),
            'x' => 0, // Default position
            'y' => 0, // Default position
            'width' => 200, // Default width
            'height' => 80, // Default height
            'signature' => null, // No actual signature image stored here
        ]);
    }

    // ✅ Update veterinary request status to 'in_progress' for the selected animals
    if (!empty($animalIds)) {
        VeterinaryRequest::whereIn('animal_id', $animalIds)
            ->where('status', 'pending') // Only update pending requests
            ->update(['status' => 'in_progress']);
    }

    return response()->json([
        'success' => true,
        'message' => 'Veterinary Disease Report submitted successfully!',
        'report_id' => $report->id,
        'farmer_id' => $farmerId,
        'created_signatures' => count($processedApplications),
        'updated_requests' => count($animalIds), // Optional: count of updated requests
    ]);
}


    // File: app/Http/Controllers/VeterinaryDiseaseReportController.php
// In your controller (e.g., InsuranceController.php)

public function allVeterinaryReports()
{
    $user = Auth::user();
    $userSignature = optional($user->digitalSignature)->signature;

    // Fetch all animals that have veterinary reports
    $animals = LivestockAnimal::with([
            'application.farmer.userInformation.barangay',
            'application.signature', 
            'veterinaryReport'
        ])
        ->whereNotNull('veterinary_report_id')
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function ($animal) use ($userSignature) {
            $app = $animal->application;
            $farmerInfo = $app->farmer->userInformation ?? null;
            $sig = optional($app->signature);

            return [
                'id' => $animal->id,
                'breed' => $animal->breed,
                'age' => $animal->age,
                'sex' => $animal->sex,
                'ear_mark' => $animal->ear_mark,
                'cover_type' => $app->cover_type ?? null,
                'veterinary_report_id' => $animal->veterinary_report_id,
                'veterinarian_name' => $animal->veterinaryReport->veterinarian_name ?? null,
                'updated_at' => $animal->updated_at,
                'proponent_signature_path' => $userSignature,
                'signature_x' => $sig->x ?? null,
                'signature_y' => $sig->y ?? null,
                'signature_width' => $sig->width ?? null,
                'signature_height' => $sig->height ?? null,
                
                // Farmer information
                'farmer' => $farmerInfo ? [
                    'id' => $app->farmer->id,
                    'firstname' => $farmerInfo->firstname,
                    'middlename' => $farmerInfo->middlename,
                    'lastname' => $farmerInfo->lastname,
                    'profile' => $farmerInfo->profile_picture,
                    'barangay' => $farmerInfo->barangay->name ?? null,
                    'contact' => $farmerInfo->contact,
                    'username' => $app->farmer->name,
                ] : null,
            ];
        });

    return inertia('insurance/AllVeterinaryReports', [
        'animals' => $animals,
        'signature' => $userSignature,
    ]);
}




    public function edit($id)
{
      $report = VeterinaryDiseaseReport::with(['animals.livestock'])->findOrFail($id);
        
    // Load all animals linked to this report
    $animals = $report->animals ?? [];

    return Inertia::render('insurance/VeterinaryForm', [
        'title' => 'Edit Veterinary Disease Report',
        'report' => $report,
        'animals' => $animals,
    ]);
}

public function update(Request $request, $id)
{
    $report = VeterinaryDiseaseReport::findOrFail($id);

    $validated = $request->validate([
        // Basic policy info
        'policy_holder' => 'required|string|max:255',
        'address' => 'nullable|string',
        'province' => 'nullable|string|max:255',
        'contact_no' => 'nullable|string|max:50',
        'policy_no' => 'nullable|string|max:100',

        // Q1
        'q1a_called_date' => 'nullable|date',
        'q1a_called_time' => 'nullable',
        'q1b_examined_date' => 'nullable|date',
        'q1b_examined_time' => 'nullable',

        // Q2
        'q2_preliminary_report' => 'nullable|string',

        // Q3
        'q3a_temperature' => 'nullable|string|max:100',
        'q3a_breathing' => 'nullable|string|max:100',
        'q3a_pulse' => 'nullable|string|max:100',
        'q3b_disease_stage' => 'nullable|string|max:50',
        'q3c_lameness_position_degree' => 'nullable|string',
        'q3d_nourishment_state' => 'nullable|string',
        'q3e_diagnostic_aids' => 'nullable|string',

        // Q4
        'q4_diagnosis' => 'nullable|string',

        // Q5
        'q5a_cure_possible' => 'nullable|boolean',
        'q5b_cure_time' => 'nullable|string|max:255',
        'q5c_hospital_cure_possible' => 'nullable|boolean',

        // Q6
        'q6a_treatment_given' => 'nullable|string',
        'q6b_special_instructions' => 'nullable|string',
        'q6c_visits_count' => 'nullable|integer|min:0',
        'q6c_visits_dates' => 'nullable|array',
        'q6c_visits_dates.*' => 'nullable|date',

        // Q7
        'q7_cause_of_disease' => 'nullable|string',

        // Q8
        'q8a_very_sick_before' => 'nullable|boolean',
        'q8b_symptoms_recognizable_time' => 'nullable|string',
        'q8c_first_aid_effective' => 'nullable|boolean',
        'q8d_previous_treatment_details' => 'nullable|string',

        // Q9
        'q9a_connection_previous_disease' => 'nullable|boolean',
        'q9b_previous_disease_treatment_details' => 'nullable|string',

        // Q10–14
        'q10_other_defects' => 'nullable|string',
        'q11_instructions_followed' => 'nullable|boolean',
        'q12_intentional_destruction_needed' => 'nullable|boolean',
        'q12a_slaughter_economical' => 'nullable|boolean',
        'q12b_slaughter_value' => 'nullable|boolean',
        'q13_future_use' => 'nullable|string',
        'q14_remarks' => 'nullable|string',
        'signed_at_location' => 'nullable|string|max:255',
        'signed_at_date' => 'nullable|date',
        'veterinarian_name' => 'nullable|string|max:255',
        'stamp_data' => 'nullable|array',

        // Animals array
        'animals' => 'nullable|array',
        'animals.*.id' => 'required_with:animals|integer|exists:livestock_animals,id',
        'animals.*.name' => 'nullable|string|max:255',
        'animals.*.breed' => 'nullable|string|max:255',
        'animals.*.age' => 'nullable|integer',
        'animals.*.sex' => 'nullable|string|max:50',
        'animals.*.basic_color' => 'nullable|string|max:100',
        'animals.*.identifying_marks' => 'nullable|string|max:255',
        'animals.*.brand_tattoo' => 'nullable|string|max:255',
        'animals.*.live_weight' => 'nullable|numeric',
        'animals.*.genus' => 'nullable|string|max:100',
    ]);
    $validated['veterinary_id'] = auth()->id();
    // Handle array fields that might come as JSON string
    if (isset($validated['q6c_visits_dates']) && is_string($validated['q6c_visits_dates'])) {
        $validated['q6c_visits_dates'] = json_decode($validated['q6c_visits_dates'], true);
    }
    
    if (isset($validated['stamp_data']) && is_string($validated['stamp_data'])) {
        $validated['stamp_data'] = json_decode($validated['stamp_data'], true);
    }

    // Update the report
    $report->update($validated);

    $updatedFarmerId = null;
    $processedApplications = [];
    $animalIds = [];

    // Update each animal and get farmer_id from the first updated animal
    if (!empty($validated['animals'])) {
        foreach ($validated['animals'] as $index => $animalData) {
            $animal = LivestockAnimal::find($animalData['id']);
            
            if ($animal) {
                $animalIds[] = $animal->id;
                
                $animal->update([
                    'name' => $animalData['name'] ?? $animal->name,
                    'breed' => $animalData['breed'] ?? $animal->breed,
                    'age' => $animalData['age'] ?? $animal->age,
                    'sex' => $animalData['sex'] ?? $animal->sex,
                    'basic_color' => $animalData['basic_color'] ?? $animal->basic_color,
                    'identifying_marks' => $animalData['identifying_marks'] ?? $animal->identifying_marks,
                    'brand_tattoo' => $animalData['brand_tattoo'] ?? $animal->brand_tattoo,
                    'live_weight' => $animalData['live_weight'] ?? $animal->live_weight,
                    'genus' => $animalData['genus'] ?? $animal->genus,
                    'veterinary_report_id' => $report->id,
                ]);

                // Grab farmer_id from the first updated animal
                if (!$updatedFarmerId && $animal->application) {
                    $updatedFarmerId = $animal->application->farmer_id;
                }

                // Track unique application IDs
                if ($animal->application_id && !in_array($animal->application_id, $processedApplications)) {
                    $processedApplications[] = $animal->application_id;
                }
            }
        }
    }

    // Ensure InsuranceSignature exists for updated applications
    foreach ($processedApplications as $applicationId) {
        $existingSignature = InsuranceSignature::where('application_id', $applicationId)
            ->where('veterinary_disease_report_id', $report->id)
            ->first();
            
        if (!$existingSignature) {
            InsuranceSignature::create([
                'application_id' => $applicationId,
                'veterinary_disease_report_id' => $report->id,
                'user_id' => auth()->id(),
                'x' => 0,
                'y' => 0,
                'width' => 200,
                'height' => 80,
                'signature' => null,
            ]);
        }
    }

    // Update veterinary request status if needed
    if (!empty($animalIds)) {
        // Check if any of these animals have pending requests
        VeterinaryRequest::whereIn('animal_id', $animalIds)
            ->where('status', 'pending')
            ->update(['status' => 'in_progress']);
    }

    // Return JSON for SPA with the farmer_id from updated animals
    return response()->json([
        'success' => true,
        'message' => 'Veterinary Disease Report updated successfully!',
        'report' => $report->load('animals'),
        'farmer_id' => $updatedFarmerId,
        'updated_applications' => count($processedApplications),
        'updated_animals' => count($animalIds),
    ]);
}









 public function indexPage(Request $request)
{
    $search = $request->query('search');
    $status = $request->query('status');

    $applications = LivestockInsuranceApplication::with(['farmer.userInformation'])
        ->orderBy('id', 'DESC');

    if ($search) {
        $applications->whereHas('farmer', function ($q) use ($search) {
            $q->whereHas('userInformation', function ($q2) use ($search) {
                $q2->whereRaw("CONCAT(firstname, ' ', middlename, ' ', lastname) LIKE ?", ["%$search%"])
                   ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ["%$search%"])
                   ->orWhere('firstname', 'LIKE', "%$search%")
                   ->orWhere('lastname', 'LIKE', "%$search%");
            });
        });
    }

    // Get ALL requests to calculate totals (unfiltered)
    $allRequests = VeterinaryRequest::with(['user' => function($query) {
        $query->with('userInformation.barangay');
    }])->get();

    // Calculate status counts from ALL requests
    $statusCounts = [
        'all' => $allRequests->count(),
        'pending' => $allRequests->where('status', 'pending')->count(),
        'in_progress' => $allRequests->where('status', 'in_progress')->count(),
        'completed' => $allRequests->where('status', 'completed')->count(),
    ];

    // Get filtered requests for the table
    $filteredQuery = VeterinaryRequest::with(['user' => function($query) {
        $query->with('userInformation.barangay');
    }]);

    if ($status) {
        $filteredQuery->where('status', $status);
    }

    $veterinaryRequests = $filteredQuery
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->map(function($vr) {
            return [
                'id' => $vr->id,
                'animal_id' => $vr->animal_id,
                'request_type' => $vr->request_type,
                'description' => $vr->description,
                'status' => $vr->status,
                'created_at' => $vr->created_at,
                'user_id' => $vr->user_id,
                'user' => $vr->user && $vr->user->userInformation ? [
                    'firstname' => $vr->user->userInformation->firstname,
                    'middlename' => $vr->user->userInformation->middlename,
                    'lastname' => $vr->user->userInformation->lastname,
                    'contact' => $vr->user->userInformation->contact,
                    'purok' => $vr->user->userInformation->purok,
                    'barangay' => $vr->user->userInformation->barangay?->name ?? null,
                ] : null,
            ];
        });

    return Inertia::render('admin/insurance/veterinaryReport', [
        'pageTitle' => 'Farmers Insurance List',
        'veterinaryRequests' => $veterinaryRequests,
        'applications' => $applications->paginate(10),
        'tab' => $request->query('tab', null),
        'selectedStatus' => $status,
        // Pass the status counts separately
        'statusCounts' => $statusCounts,
        'totalRequests' => $allRequests->count(), // Also pass total for convenience
    ]);
}


    
//   public function listFarmers(Request $request)
//     {
//         $search = $request->query('search');

//         $applications = LivestockInsuranceApplication::with([
//     'farmer.userInformation:user_id,firstname,middlename,lastname'
// ])
// ->select('id', 'farmer_id', 'animal_type', 'number_of_heads', 'date_of_purchase')
// ->orderBy('id', 'DESC');

// if ($search) {
//     $applications->whereHas('farmer.userInformation', function ($q) use ($search) {
//         $q->whereRaw("CONCAT(firstname, ' ', middlename, ' ', lastname) LIKE ?", ["%$search%"])
//           ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ["%$search%"])
//           ->orWhere('firstname', 'LIKE', "%$search%")
//           ->orWhere('lastname', 'LIKE', "%$search%");
//     });
// }

// return Inertia::render('admin/insurance/veterinaryReport', [
//     'pageTitle' => 'Farmers Insurance List',
//     'applications' => $applications->get()
// ]);

//     }


  public function showLivestocks($farmerId)
{
    $farmer = User::with('userInformation.barangay')->findOrFail($farmerId);

    $user = Auth::user();
    $userSignature = optional($user->digitalSignature)->signature;

    // Fetch all animals
    $animals = LivestockAnimal::with(['application.signature', 'veterinaryReport'])
        ->whereHas('application', fn ($q) => $q->where('farmer_id', $farmerId))
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function ($animal) use ($userSignature) {
            $app = $animal->application;
            $sig = optional($app->signature);

            return [
                'id' => $animal->id,
                'breed' => $animal->breed,
                'age' => $animal->age,
                'sex' => $animal->sex,
                'ear_mark'=> $animal->ear_mark,
                'cover_type' => $app->cover_type ?? null,
                'veterinary_report_id' => $animal->veterinary_report_id,
                'veterinarian_name' => $animal->veterinaryReport->veterinarian_name ?? null,
                'veterinarian_id' => $animal->veterinaryReport->veterinarian_id ?? null, // Add this
                'updated_at' => $animal->updated_at,
                'proponent_signature_path' => $userSignature,
                'signature_x' => $sig->x ?? null,
                'signature_y' => $sig->y ?? null,
                'signature_width' => $sig->width ?? null,
                'signature_height' => $sig->height ?? null,
            ];
        });

    // Fetch veterinary requests for this farmer
    $vetRequests = VeterinaryRequest::where('user_id', $farmerId)
        ->with('animal')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($request) {
            return [
                'id' => $request->id,
                'title' => $request->title,
                'animal_id' => $request->animal_id,
                'request_type' => $request->request_type,
                'description' => $request->description,
                'status' => $request->status,
                'created_at' => $request->created_at,
                'animal' => $request->animal ? [
                    'id' => $request->animal->id,
                    'breed' => $request->animal->breed,
                    'veterinary_report_id' => $request->animal->veterinary_report_id,
                ] : null,
            ];
        });

    return inertia('insurance/FarmerLivestocks', [
        'farmer' => [
            'id' => $farmer->id,
            'firstname' => $farmer->userInformation->firstname,
            'middlename' => $farmer->userInformation->middlename,
            'lastname' => $farmer->userInformation->lastname,
            'profile' => $farmer->userInformation->profile_picture,
            'barangay' => $farmer->userInformation->barangay->name,
            'contact' => $farmer->userInformation->contact,
            'username' => $farmer->name,
        ],
        'animals' => $animals,
        'veterinaryRequests' => $vetRequests,
        'signature' => $userSignature,
        'currentUserId' => $user->id, // Add current user ID
    ]);
}

public function detachReport($animalId)
{
    $animal = LivestockAnimal::findOrFail($animalId);

    // Set veterinary_report_id to NULL
    $animal->veterinary_report_id = null;
    $animal->save();

    return response()->json(['message' => 'Veterinary report removed from animal.']);
}



// VeterinaryDiseaseReportController.php
// public function showAnimalReport($animalId)
// {
//     $animal = LivestockAnimal::with([
//         'application.signature',
//         'veterinaryReport', 
//         'application.farmer.userInformation.barangay'
//     ])->findOrFail($animalId);

//     $app = $animal->application;
//     $report = $animal->veterinaryReport;
//     $farmer = $animal->application->farmer;
    
//     if (!$report) {
//         abort(404, 'No veterinary report found for this animal');
//     }

//     $user = Auth::user();
//     $userSignature = optional($user->digitalSignature)->signature;

//     $sig = optional($app->signature);

//     return inertia('insurance/AnimalDiseaseReport', [
//         'animal' => [
//             'id' => $animal->id,
//             'breed' => $animal->breed,
//             'age' => $animal->age,
//             'sex' => $animal->sex,
//             'ear_mark' => $animal->ear_mark,
//             'cover_type' => $app->cover_type ?? null,
//             'updated_at' => $animal->updated_at,
//             'veterinary_report_id' => $animal->veterinary_report_id,
//         ],
//         'farmer' => [
//             'id' => $farmer->id,
//             'firstname' => $farmer->userInformation->firstname,
//             'middlename' => $farmer->userInformation->middlename,
//             'lastname' => $farmer->userInformation->lastname,
//             'profile' => $farmer->userInformation->profile_picture,
//             'barangay' => $farmer->userInformation->barangay->name,
//             'contact' => $farmer->userInformation->contact,
//             'username' => $farmer->name,
//         ],
//         'report' => $report,
//         'signature' => [
//             'proponent_signature_path' => $userSignature,
//             'signature_x' => $sig->x ?? null,
//             'signature_y' => $sig->y ?? null,
//             'signature_width' => $sig->width ?? null,
//             'signature_height' => $sig->height ?? null,
//         ],
//     ]);
// }



// File: app/Http/Controllers/VeterinaryDiseaseReportController.php
public function viewAnimalReport(\App\Models\PDF\VeterinaryDiseaseReport $report)
{
    $user = Auth::user();
    $userSignature = optional($user->digitalSignature)->signature;

    // Load related animals and their applications
    $report->load([
        'animals.application.farmer.userInformation.barangay',
        'animals.application.signature'
    ]);

    // For simplicity, pick the first animal in the report
    $animal = $report->animals->first();

    if (!$animal) {
        abort(404, "No animal found for this veterinary report.");
    }

    $farmer = $animal->application->farmer;

    return inertia('insurance/VeterinaryDiseaseReportView', [
        'farmer' => [
            'id' => $farmer->id,
            'firstname' => $farmer->userInformation->firstname,
            'middlename' => $farmer->userInformation->middlename,
            'lastname' => $farmer->userInformation->lastname,
            'username' => $farmer->name,
            'profile' => $farmer->userInformation->profile_picture,
            'barangay' => $farmer->userInformation->barangay->name,
            'contact' => $farmer->userInformation->contact,
        ],
        'animal' => [
            'id' => $animal->id,
            'breed' => $animal->breed,
            'age' => $animal->age,
            'sex' => $animal->sex,
            'ear_mark'=> $animal->ear_mark,
            'cover_type' => $animal->application->cover_type ?? null,
            'veterinary_report_id' => $report->id,
            'veterinarian_name' => $report->veterinarian_name ?? null,
        ],
        'report' => $report,
        'userSignature' => $userSignature,
        'signature' => optional($animal->application->signature),
    ]);
}



public function showSingle($reportId)
    {
        $user = Auth::user();
        $userSignature = optional($user->digitalSignature)->signature;

        // Load report + related animal + application + farmer
        $report = VeterinaryDiseaseReport::with([
            'animals.application.farmer.userInformation.barangay',
            'animals.application.signature',
        ])->findOrFail($reportId);

        // We assume one main animal per report
        $animal = $report->animals->first();
        $application = $animal?->application;
        $farmer = $application?->farmer;
        $signature = optional($application?->signature);

        return inertia('insurance/VeterinaryDiseaseReportView', [
            'farmer' => [
                'id' => $farmer?->id,
                'firstname' => $farmer?->userInformation?->firstname,
                'lastname' => $farmer?->userInformation?->lastname,
                'barangay' => $farmer?->userInformation?->barangay?->name,
                'contact' => $farmer?->userInformation?->contact,
            ],

            'animal' => [
                'id' => $animal?->id,
                'ear_mark' => $animal?->ear_mark,
                'breed' => $animal?->breed,
                'age' => $animal?->age,
                'sex' => $animal?->sex,
            ],

            'report' => [
                'id' => $report->id,
                'veterinarian_name' => $report->veterinarian_name, // ✅ STRING FIELD
            ],

            'signature' => [
                'path' => $userSignature,
                'x' => $signature?->x ?? 0,
                'y' => $signature?->y ?? 0,
                'width' => $signature?->width ?? 200,
                'height' => $signature?->height ?? 80,
            ],
        ]);
    }




    
}
