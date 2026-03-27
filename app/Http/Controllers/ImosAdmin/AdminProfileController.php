<?php
namespace App\Http\Controllers\ImosAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\DigitalSignature;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\VeterinaryDiseaseReport;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
public function index()
{
    $user = Auth::user()->load('userInformation', 'digitalSignature');
    
    // Get veterinary disease reports where user is the veterinarian
    $veterinaryReports = VeterinaryDiseaseReport::where('veterinary_id', $user->id)
        ->with(['animals' => function($query) {
            $query->with('application.farmer');
        }])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($report) {
            // Get the first animal's application to get farmer info
            $firstAnimal = $report->animals->first();
            $farmer = $firstAnimal?->application?->farmer;
            
            return [
                'id' => $report->id,
                'policy_holder' => $report->policy_holder,
                'diagnosis' => $report->q4_diagnosis,
                'created_at' => $report->created_at,
                'animal_count' => $report->animals->count(),
                'farmer_name' => $farmer ? 
                    trim(($farmer->userInformation->firstname ?? '') . ' ' . 
                         ($farmer->userInformation->middlename ?? '') . ' ' . 
                         ($farmer->userInformation->lastname ?? '')) : 
                    $report->policy_holder,
            ];
        });
    
    // Get livestock insurance applications where user is the proponent
    $insuranceApplications = LivestockInsuranceApplication::where('proponent', $user->id)
        ->with(['farmer.userInformation', 'animals'])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($application) {
            $farmer = $application->farmer;
            $farmerName = $farmer && $farmer->userInformation ? 
                trim(($farmer->userInformation->firstname ?? '') . ' ' . 
                     ($farmer->userInformation->middlename ?? '') . ' ' . 
                     ($farmer->userInformation->lastname ?? '')) : 
                $application->farmer_name;
            
            // Get animals with veterinary reports
            $animalsWithReports = $application->animals->filter(function($animal) {
                return !is_null($animal->veterinary_report_id);
            });
            
            return [
                'id' => $application->id,
                'farmer_name' => $farmerName,
                'cover_type' => $application->cover_type,
                'number_of_heads' => $application->number_of_heads,
                'created_at' => $application->created_at,
                'animals_with_reports' => $animalsWithReports->count(),
                'total_animals' => $application->animals->count(),
            ];
        });
    
    return Inertia::render('admin/profile/index', [
        'user' => [
            'id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
            'user_information' => $user->userInformation,
            'digital_signature' => $user->digitalSignature,
        ],
        'veterinaryReports' => $veterinaryReports,
        'insuranceApplications' => $insuranceApplications,
    ]);
}

   public function uploadSignature(Request $request)
{
    $request->validate([
        'signature' => 'required|image|mimes:png,jpg,jpeg|max:2048',
    ]);

    $user = Auth::user();
    $signature = $user->digitalSignature;

    // Delete old file if exists
    if ($signature && \Storage::disk('public')->exists($signature->signature)) {
        \Storage::disk('public')->delete($signature->signature);
    }

    $path = $request->file('signature')->store('signatures', 'public');

    DigitalSignature::updateOrCreate(
        ['user_id' => $user->id],
        ['signature' => $path]
    );

    return redirect()->back()->with('success', 'Signature uploaded successfully.');
}

    
}
