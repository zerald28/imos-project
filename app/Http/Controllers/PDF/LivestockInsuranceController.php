<?php

namespace App\Http\Controllers\PDF;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PDF\LivestockInsuranceApplication;
use Barryvdh\DomPDF\Facade\Pdf; // ✅ Correct import
use Illuminate\Support\Facades\Storage;
use App\Models\PDF\VeterinaryDiseaseReport;

class LivestockInsuranceController extends Controller
{
    // 📌 PREVIEW PDF (open in new tab)
   public function previewPdfs($id)
    {
        // Load report with animals and insurance signatures (and related user)
        $report = VeterinaryDiseaseReport::with([
            'animals',
            'insuranceSignatures.user.digitalSignature', // eager load user's digital signature
        ])->findOrFail($id);

        // Prepare signature data for Blade
        $signatures = $report->insuranceSignatures->map(function ($sig) {
            $imagePath = optional($sig->user->digitalSignature)->signature;

            return [
                'image' => $imagePath ? storage_path("app/public/{$imagePath}") : null,
                'x' => $sig->x,
                'y' => $sig->y,
                'width' => $sig->width,
                'height' => $sig->height,
                'user_name' => optional($sig->user)->fullname ?? '',
            ];
        });

        // Pass report and signatures to Blade
        $pdf = PDF::loadView('vetpdf.veterinaryform', compact('report', 'signatures'))
            ->setPaper('A4', 'portrait');

        return $pdf->stream("Livestock_Insurance_Application_{$id}.pdf");
    }


    public function previewPdf($id)
{
    $application = LivestockInsuranceApplication::with(['animals', 'farmer'])->findOrFail($id);

    $pdf = PDF::loadView('pdf.livestock_insurance', compact('application'))
              ->setPaper('A4', 'portrait');

    return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'inline; filename="Livestock_Insurance_Application_'.$id.'.pdf"');
}


    // 📌 DOWNLOAD PDF
   public function downloadpdf($id)
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

 public function downloadreport($id)
{
    // Load the report with the SAME relationships as preview
    $report = VeterinaryDiseaseReport::with([
        'animals',
        'insuranceSignatures.user.digitalSignature',
    ])->findOrFail($id);

    // Prepare signatures the SAME way as preview
    $signatures = $report->insuranceSignatures->map(function ($sig) {
        $imagePath = optional($sig->user->digitalSignature)->signature;

        return [
            'image' => $imagePath ? storage_path("app/public/{$imagePath}") : null,
            'x' => $sig->x,
            'y' => $sig->y,
            'width' => $sig->width,
            'height' => $sig->height,
            'user_name' => optional($sig->user)->fullname ?? '',
        ];
    });

    // Use the SAME PDF library and method
    $pdf = PDF::loadView('vetpdf.downloadpdf', compact('report', 'signatures'))
        ->setPaper('A4', 'portrait');

    return $pdf->download("Veterinary_Report_{$id}.pdf");
}


public function download($id)
{
    // Load the report with the SAME relationships as preview
    $report = VeterinaryDiseaseReport::with([
        'animals',
        'insuranceSignatures.user.digitalSignature',
    ])->findOrFail($id);

    // Prepare signatures the SAME way as preview
    $signatures = $report->insuranceSignatures->map(function ($sig) {
        $imagePath = optional($sig->user->digitalSignature)->signature;

        return [
            'image' => $imagePath ? storage_path("app/public/{$imagePath}") : null,
            'x' => $sig->x,
            'y' => $sig->y,
            'width' => $sig->width,
            'height' => $sig->height,
            'user_name' => optional($sig->user)->fullname ?? '',
        ];
    });

    // Use the SAME PDF library and method
    $pdf = PDF::loadView('vetpdf.download', compact('report', 'signatures'))
        ->setPaper('A4', 'portrait');

    return $pdf->download("Veterinary_Report_{$id}.pdf");
}


    // 📌 OPTIONAL: Save PDF file in storage
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
}