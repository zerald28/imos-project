<?php

namespace App\Http\Controllers\ImosAdmin;

use App\Http\Controllers\Controller;
use App\Models\PDF\LivestockInsuranceApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf; // ✅ Correct import
use Illuminate\Support\Facades\Storage;
use App\Models\InsuranceSignature;
use Illuminate\Support\Facades\Auth;

class InsuranceController extends Controller
{
   public function index(Request $request)
{
    $search = $request->input('search');
    
    $user = Auth::user();
    $userSignature = $user->digitalSignature;

    $applications = LivestockInsuranceApplication::with([
        'animals.veterinaryReport.veterinarian.userInformation', // Load veterinarian relationship
        'animals.veterinaryRequests',
        'farmer',
        'proponentUser.digitalSignature',
        'signature'
    ])
    ->when($search, function ($q) use ($search) {
        $q->where('farmer_name', 'like', "%$search%")
          ->orWhere('cover_type', 'like', "%$search%");
    })
    ->orderBy('updated_at', 'desc')
    ->paginate(10)
    ->withQueryString();

    // Transform signature fields for frontend
    $applications->getCollection()->transform(function($app) {
        $app->proponent_signature_path = optional(optional($app->proponentUser)->digitalSignature)->signature;
        $app->proponent_user_id = optional($app->proponentUser)->id;
        $sig = optional($app->signature);

        $app->signature_x = $sig->x ?? null;
        $app->signature_y = $sig->y ?? null;
        $app->signature_width = $sig->width ?? null;
        $app->signature_height = $sig->height ?? null;

        // Transform animals to include disease report and request info
        $app->animals->transform(function($animal) use ($app) {
            // Disease report info
            $animal->has_disease_report = !is_null($animal->veterinary_report_id);
            $animal->disease_report_status = $animal->veterinaryReport->status ?? null;
            $animal->disease_report_date = $animal->veterinaryReport->created_at ?? null;
            
            // Get veterinarian name from relationship or fallback to stored name
            if ($animal->veterinaryReport) {
                if ($animal->veterinaryReport->veterinarian && $animal->veterinaryReport->veterinarian->userInformation) {
                    $info = $animal->veterinaryReport->veterinarian->userInformation;
                    $animal->veterinarian_name = trim($info->firstname . ' ' . $info->middlename . ' ' . $info->lastname);
                    $animal->veterinary_id = $animal->veterinaryReport->veterinary_id;
                } else {
                    $animal->veterinarian_name = $animal->veterinaryReport->veterinarian_name;
                    $animal->veterinary_id = $animal->veterinaryReport->veterinary_id;
                }
            } else {
                $animal->veterinarian_name = null;
                $animal->veterinary_id = null;
            }
            
            $animal->disease_diagnosis = $animal->veterinaryReport->q4_diagnosis ?? null;
            
            // Veterinary request info
            $animal->has_veterinary_request = $animal->veterinaryRequests->isNotEmpty();
            $animal->latest_veterinary_request = $animal->veterinaryRequests->sortByDesc('created_at')->first();
            $animal->request_status = $animal->latest_veterinary_request->status ?? null;
            $animal->request_title = $animal->latest_veterinary_request->title ?? null;
            $animal->request_description = $animal->latest_veterinary_request->description ?? null;
            $animal->request_created_at = $animal->latest_veterinary_request->created_at ?? null;
            
            // Full disease report data for modal
            $animal->full_disease_report = $animal->veterinaryReport ? [
                'id' => $animal->veterinaryReport->id,
                'veterinary_id' => $animal->veterinaryReport->veterinary_id,
                'veterinarian_name' => $animal->veterinarian_name,
                'policy_holder' => $animal->veterinaryReport->policy_holder,
                'address' => $animal->veterinaryReport->address,
                'province' => $animal->veterinaryReport->province,
                'contact_no' => $animal->veterinaryReport->contact_no,
                'policy_no' => $animal->veterinaryReport->policy_no,
                'q1a_called_date' => $animal->veterinaryReport->q1a_called_date,
                'q1a_called_time' => $animal->veterinaryReport->q1a_called_time,
                'q1b_examined_date' => $animal->veterinaryReport->q1b_examined_date,
                'q1b_examined_time' => $animal->veterinaryReport->q1b_examined_time,
                'q2_preliminary_report' => $animal->veterinaryReport->q2_preliminary_report,
                'q3a_temperature' => $animal->veterinaryReport->q3a_temperature,
                'q3a_breathing' => $animal->veterinaryReport->q3a_breathing,
                'q3a_pulse' => $animal->veterinaryReport->q3a_pulse,
                'q3b_disease_stage' => $animal->veterinaryReport->q3b_disease_stage,
                'q3c_lameness_position_degree' => $animal->veterinaryReport->q3c_lameness_position_degree,
                'q3d_nourishment_state' => $animal->veterinaryReport->q3d_nourishment_state,
                'q3e_diagnostic_aids' => $animal->veterinaryReport->q3e_diagnostic_aids,
                'q4_diagnosis' => $animal->veterinaryReport->q4_diagnosis,
                'q5a_cure_possible' => $animal->veterinaryReport->q5a_cure_possible,
                'q5b_cure_time' => $animal->veterinaryReport->q5b_cure_time,
                'q5c_hospital_cure_possible' => $animal->veterinaryReport->q5c_hospital_cure_possible,
                'q6a_treatment_given' => $animal->veterinaryReport->q6a_treatment_given,
                'q6b_special_instructions' => $animal->veterinaryReport->q6b_special_instructions,
                'q6c_visits_count' => $animal->veterinaryReport->q6c_visits_count,
                'q6c_visits_dates' => $animal->veterinaryReport->q6c_visits_dates,
                'q7_cause_of_disease' => $animal->veterinaryReport->q7_cause_of_disease,
                'q8a_very_sick_before' => $animal->veterinaryReport->q8a_very_sick_before,
                'q8b_symptoms_recognizable_time' => $animal->veterinaryReport->q8b_symptoms_recognizable_time,
                'q8c_first_aid_effective' => $animal->veterinaryReport->q8c_first_aid_effective,
                'q8d_previous_treatment_details' => $animal->veterinaryReport->q8d_previous_treatment_details,
                'q9a_connection_previous_disease' => $animal->veterinaryReport->q9a_connection_previous_disease,
                'q9b_previous_disease_treatment_details' => $animal->veterinaryReport->q9b_previous_disease_treatment_details,
                'q10_other_defects' => $animal->veterinaryReport->q10_other_defects,
                'q11_instructions_followed' => $animal->veterinaryReport->q11_instructions_followed,
                'q12_intentional_destruction_needed' => $animal->veterinaryReport->q12_intentional_destruction_needed,
                'q12a_slaughter_economical' => $animal->veterinaryReport->q12a_slaughter_economical,
                'q12b_slaughter_value' => $animal->veterinaryReport->q12b_slaughter_value,
                'q13_future_use' => $animal->veterinaryReport->q13_future_use,
                'q14_remarks' => $animal->veterinaryReport->q14_remarks,
                'signed_at_location' => $animal->veterinaryReport->signed_at_location,
                'signed_at_date' => $animal->veterinaryReport->signed_at_date,
                'stamp_data' => $animal->veterinaryReport->stamp_data,
                'created_at' => $animal->veterinaryReport->created_at,
                'updated_at' => $animal->veterinaryReport->updated_at,
            ] : null;
            
            return $animal;
        });

        return $app;
    });

    return Inertia::render('admin/insurance/index', [
        'applications' => $applications,
        'filters' => [
            'search' => $search
        ],
        'user' => $user,
        'signature' => $userSignature
    ]);
}



   public function saveSignatures(Request $request, $applicationId)
{
    $request->validate([
        'x' => 'required|numeric',
        'y' => 'required|numeric',
        'width' => 'required|numeric',
        'height' => 'required|numeric',
        'veterinary_disease_report_id' => 'nullable|numeric', // allow null
    ]);

    $signature = InsuranceSignature::updateOrCreate(
        [
           'veterinary_disease_report_id' => $applicationId, // <- now this identifies the row
            'user_id' => auth()->id(),
        ],
        [
            'x' => $request->x,
            'y' => $request->y,
            'width' => $request->width,
            'height' => $request->height,
            'veterinary_disease_report_id' => $request->veterinary_disease_report_id, // save report ID
        ]
    );

    return response()->json(['success' => true, 'signature' => $signature]);
}
public function saveSignature(Request $request, $applicationId)
{
    $request->validate([
        'x' => 'required|numeric',
        'y' => 'required|numeric',
        'width' => 'required|numeric',
        'height' => 'required|numeric',
        'veterinary_disease_report_id' => 'nullable|numeric', // allow null
    ]);

    $signature = InsuranceSignature::updateOrCreate(
        [
            'application_id' => $applicationId,
            'user_id' => auth()->id(),
        ],
        [
            'x' => $request->x,
            'y' => $request->y,
            'width' => $request->width,
            'height' => $request->height,
            'veterinary_disease_report_id' => $request->veterinary_disease_report_id, // save report ID
        ]
    );

    return response()->json(['success' => true, 'signature' => $signature]);
}

public function previewImage($id)
{
    $pdf = LivestockInsuranceApplication::with('signature')->findOrFail($id);

    // Render PDF to Dompdf
    $dompdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.livestock_insurance', compact('pdf'))
        ->setPaper('A4', 'portrait');

    // Convert PDF to base64 for preview
    $output = $dompdf->output();
    $base64 = base64_encode($output);

    return response()->json([
        'image' => 'data:application/pdf;base64,' . $base64
    ]);
}

public function preview($id)
{
    $application = LivestockInsuranceApplication::with('signature')->findOrFail($id);

    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.livestock_insurance', compact('application'))
        ->setPaper('A4', 'portrait');

    // Stream without browser PDF viewer toolbar
    return $pdf->stream("insurance.pdf", ["Attachment" => false]);
}


public function download($id)
{
      $application = LivestockInsuranceApplication::with('animals')->findOrFail($id);
    $pdf = LivestockInsuranceApplication::findOrFail($id);
    

    $signature = $pdf->signature ? $pdf->signature->path : null;

    $dompdf = Pdf::loadView('pdf.insurance', [
        'pdf' => $pdf,
        'application' => $application,
        'signaturePath' => $signature,
        
    ]);

    return $dompdf->download('insurance.pdf');
}


public function save(Request $request, LivestockInsuranceApplication $application)
    {
        $request->validate([
            'x' => 'required|numeric',
            'y' => 'required|numeric',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
        ]);

        $signature = InsuranceSignature::updateOrCreate(
            [
                'application_id' => $application->id,
                'user_id' => Auth::id(),
            ],
            [
                'x' => $request->x,
                'y' => $request->y,
                'width' => $request->width,
                'height' => $request->height,
            ]
        );

        return response()->json(['success' => true, 'signature' => $signature]);
    }


 public function savePdf($id)
    {
        $application = LivestockInsuranceApplication::with('animals')->findOrFail($id);

        $pdf = PDF::loadView('pdf.livestock_insurance', compact('application'))
                ->setPaper('A4', 'portrait');

        $filePath = "insurance_pdfs/{$id}.pdf";

        Storage::disk('public')->put($filePath, $pdf->output());

        $application->update(['pdf_path' => $filePath]);

        return response()->json(['message' => 'PDF saved successfully']);
    }

    public function getSignature($applicationId)
{
    $signature = InsuranceSignature::where('application_id', $applicationId)
        ->where('user_id', auth()->id())
        ->first();

    return response()->json($signature);
}

public function signatureEditor($id)
{
    $application = LivestockInsuranceApplication::with('animals')
        ->findOrFail($id);
    
    return Inertia::render('admin/insurance/signatureEditor', [
        'application' => $application,
    ]);
}



}
