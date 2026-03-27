<?php
// File: app/Http/Controllers/PDF/VeterinaryDiseaseReportController.php

namespace App\Http\Controllers\PDF;

use App\Http\Controllers\Controller;
use App\Models\PDF\VeterinaryDiseaseReport;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class VeterinaryDiseaseReportController extends Controller
{
    /**
     * Display the report in the browser (HTML preview)
     */
    public function show($id)
    {
        $report = VeterinaryDiseaseReport::findOrFail($id);

        return view('vetpdf.veterinaryform', compact('report'));
    }

    /**
     * Generate PDF for the report
     */
    public function generatePdf($id)
    {
        $report = VeterinaryDiseaseReport::findOrFail($id);

        // Load the Blade view and pass the data
        $pdf = Pdf::loadView('vetpdf.report', compact('report'));

        // Optionally, set paper size and orientation
        $pdf->setPaper('A4', 'portrait');

        // Download PDF
        return $pdf->download('veterinary_disease_report_' . $report->id . '.pdf');
    }
}
