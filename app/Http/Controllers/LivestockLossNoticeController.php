<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class LivestockLossNoticeController extends Controller
{
    /**
     * Display the LIV-CAS-01 PDF form
     */
    public function show()
    {
        // Sample data - you can replace this with data from database or request
        $formData = [
            'name_of_insured'   => '',
            'address'           => '',
            'policy_number'     => '',
            'livestock_insured' => '',
            'cause_of_death'    => '',
            'number_of_heads'   => '',
            'date_of_occurrence'=> '',
            'signature'         => '',
        ];

        // Load the view from the 'nl' folder - note the 'nl.' prefix
        $pdf = Pdf::loadView('nl.LIV-CAS-01', ['formData' => $formData]);
        
        // Display the PDF in browser
        return $pdf->stream('LIV-CAS-01_Notice_of_Loss.pdf');
    }

    /**
     * Display PDF with filled data (optional - for viewing submitted claims)
     */
    public function showWithData(Request $request)
    {
        // Get data from request or database
        $formData = [
            'name_of_insured'   => $request->input('name', 'Sample Ranch'),
            'address'           => $request->input('address', '123 Farm Road'),
            'policy_number'     => $request->input('policy', 'LIV-2024-001'),
            'livestock_insured' => $request->input('livestock', 'Angus Cattle'),
            'cause_of_death'    => $request->input('cause', 'Accident'),
            'number_of_heads'   => $request->input('heads', '10'),
            'date_of_occurrence'=> $request->input('date', now()->format('Y-m-d')),
            'signature'         => $request->input('signature', ''),
        ];

        $pdf = Pdf::loadView('nl.LIV-CAS-01', ['formData' => $formData]);
        
        return $pdf->stream('LIV-CAS-01_Notice_of_Loss.pdf');
    }

    /**
     * Download the PDF instead of viewing in browser
     */
    public function download()
    {
        $formData = [
            'name_of_insured'   => '',
            'address'           => '',
            'policy_number'     => '',
            'livestock_insured' => '',
            'cause_of_death'    => '',
            'number_of_heads'   => '',
            'date_of_occurrence'=> '',
            'signature'         => '',
        ];

        $pdf = Pdf::loadView('nl.LIV-CAS-01', ['formData' => $formData]);
        
        return $pdf->download('LIV-CAS-01_Notice_of_Loss.pdf');
    }

    /**
     * Display PDF with multiple forms (for batch processing)
     */
    public function showMultiple()
    {
        // Example multiple claims
        $forms = [
            [
                'name_of_insured'   => 'John Doe Farm',
                'address'           => '123 Main St',
                'policy_number'     => 'POL-001',
                'livestock_insured' => 'Cattle',
                'cause_of_death'    => 'Disease',
                'number_of_heads'   => '3',
                'date_of_occurrence'=> '2024-01-15',
                'signature'         => 'John Doe',
            ],
            [
                'name_of_insured'   => 'Jane Smith Ranch',
                'address'           => '456 Oak Ave',
                'policy_number'     => 'POL-002',
                'livestock_insured' => 'Sheep',
                'cause_of_death'    => 'Predator',
                'number_of_heads'   => '5',
                'date_of_occurrence'=> '2024-01-20',
                'signature'         => 'Jane Smith',
            ],
        ];

        $pdf = Pdf::loadView('nl.LIV-CAS-01', ['forms' => $forms]);
        
        return $pdf->stream('LIV-CAS-01_Multiple_Notices.pdf');
    }
}