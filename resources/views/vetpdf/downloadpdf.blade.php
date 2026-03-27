<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Veterinary Disease Report</title>
    <meta name="author" content="Veterinarian"/>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }
        
        body {
            font-family: "Times New Roman", serif;
            font-size: 11pt;
            margin-top: 1.28cm;
            margin-left: 1.22cm;
            margin-right: 1.21cm;
            margin-bottom: 0cm;
        }
        
        h1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12pt;
            padding-top: 2.54pt;
            padding-bottom: 2.54pt;
        }
        
        h2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
            padding-top: 2.54pt;
        }
        
        p {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
            margin: 0pt;
            padding-top: 0.79pt;
            line-height: 13pt;
        }
        
        .underline-field {
            text-decoration: none;
            border-bottom: 1pt solid #000;
            display: inline-block;
            min-width: 50pt;
            font-style: italic;
            padding-left: 3pt;
        }
        
        .checkbox {
            display: inline-block;
            width: 8pt;
            text-align: center;
        }
        
        .form-table {
            border-collapse: collapse;
            margin-top: 2.54pt;
            margin-bottom: 2.54pt;
        }
        
        .form-table td, .form-table th {
            border: 0.5pt solid #000;
            padding: 2pt 3pt;
            vertical-align: top;
        }
        
        .form-table th {
            font-weight: bold;
            text-align: center;
            font-size: 10pt;
        }
        
        .section-number {
            font-weight: bold;
            padding-right: 3pt;
        }
        
        .section-sub {
            padding-left: 20pt;
            text-indent: -10pt;
        }
        
        .signature-line {
            border-top: 0.5pt solid #000;
            margin-top: 20pt;
            padding-top: 3pt;
            text-align: center;
            font-size: 10pt;
        }
        
        .page-break {
            page-break-before: always;
          
        }
        
        .dotted-line {
            border-top: 0.5pt dashed #000;
            margin-top: 3pt;
            margin-bottom: 3pt;
        }
        
        .field-label {
            display: inline-block;
            width: 80pt;
        }
        
        .colon {
            display: inline-block;
            width: 5pt;
            text-align: center;
        }
        
        /* For proper spacing in forms */
        .form-row {
            margin-bottom: 2.54pt;
        }
        
        .indent-1 {
            padding-left: 20pt;
        }
        
        .indent-2 {
            padding-left: 40pt;
        }

          .s1 { color: black; font-family:Arial, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }
    
    </style>
</head>
<body>
    <!-- Page 1 -->
     <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: right;">LIV-CAS-03</p>
    <h1 style="text-align: center; padding-top: 0;font-size:14pt;">VETERINARY DISEASE REPORT</h1>
    
    <div style="margin-top: 12pt;">
        <div class="form-row">
            <span class="field-label">Policy holder</span><span class="colon">: </span>
            <span class="underline-field" style="width: 150pt;">{{ $report->policy_holder }}&nbsp;</span>
        </div>
        
        <div class="form-row">
            <span class="field-label">Address</span><span class="colon">:</span>
            <span class="underline-field" style="width: 200pt;">{{$report->address}}&nbsp;</span>
        </div>
        
        <div class="form-row">
            <span class="field-label">Province</span><span class="colon">:</span>
            <span class="underline-field" style="width: 150pt;">{{$report->province}}&nbsp;</span>
            <span >Contact No.</span><span class="colon">:</span>
            <span class="underline-field" style="width: 100pt;">{{$report->contact_no}}&nbsp;</span>
        </div>
        
        <div class="form-row">
            <span class="field-label">Policy No.</span><span class="colon">:</span>
            <span class="underline-field" style="width: 150pt;">{{$report->policy_no}}&nbsp;</span>
        </div>
    </div>
    
    
    
    <h2 style="padding-top: 6pt;">Description of the sick animal</h2>
    
    <table class="form-table" style="width: 100%; margin-top: 3pt;">
    <thead>
        <tr>
            <th style="width: 15%;">Genus</th>
            <th style="width: 15%;">Species</th>
            <th style="width: 10%;">Age</th>
            <th style="width: 10%;">Sex</th>
            <th style="width: 35%;">Name, basic color, identifying marks, earmark no., brand, tattoo</th>
            <th style="width: 15%;">Live Weight (kg)</th>
        </tr>
    </thead>
    <tbody>
        @forelse($report->animals as $animal)
            <tr>
                <td>{{ $animal->genus ?? '' }}</td>
                <td>{{ $animal->breed ?? '' }}</td>
                <td>{{ $animal->age ?? '' }}</td>
                <td>{{ $animal->sex ?? '' }}</td>
                <td>
                    {{ $animal->name ?? '' }},
                    {{ $animal->basic_color ?? '' }},
                    {{ $animal->identifying_marks ?? '' }},
                    {{ $animal->ear_mark ?? '' }},
                    {{ $animal->brand_tattoo ?? '' }}
                </td>
                <td>{{ $animal->live_weight ?? '' }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="6" class="text-center">No animals found for this report.</td>
            </tr>
        @endforelse
    </tbody>
</table>

    
    <div style="margin-top: 12pt;">
        <p><span class="section-number">1.</span> a) When were you first called in to treat the animal?</p>
        <p class="indent-1">On <span class="underline-field" style="width: 80pt;"> {{ $report->q1a_called_date ? $report->q1a_called_date->format('F d') : ' ' }}
&nbsp;</span>,<span class="underline-field" style="width: 25pt;">{{ $report->q1a_called_date ? $report->q1a_called_date->format('Y') : ''}}
&nbsp;</span> at <span class="underline-field" style="width: 60pt;">{{ $report->q1a_called_time ? \Carbon\Carbon::parse($report->q1a_called_time)->format('h:i A') : '' }}

&nbsp;</span></p>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">&nbsp;</span> b) When did you examine the animal and begin treatment?</p>
        <p class="indent-1">On <span class="underline-field" style="width: 80pt;">{{ $report->q1b_examined_date ? $report->q1b_examined_date->format('F d') : '' }}&nbsp;</span>,<span class="underline-field" style="width: 25pt;">{{ $report->q1b_examined_date ? $report->q1b_examined_date->format('Y') : '' }}&nbsp;</span> at <span class="underline-field" style="width: 60pt;">{{ $report->q1a_examined_time ? \Carbon\Carbon::parse($report->q1a_examined_time)->format('h:i A') : ' ' }}&nbsp;</span></p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>
        <p style="padding-top: 2.54pt;"><span class="section-number">2.</span> Preliminary report from the insured on time and characteristics of disease</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{$report->q2_preliminary_report ? $report->q2_preliminary_report : ''}}
&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">3.</span> Result of examination</p>
        <p class="indent-1"><span class="section-number">a)</span> Temperature, breathing, pulse?
        <span style="padding-left: 100pt;">Temperature : <span class="underline-field" style="width: 60pt;">{{ $report->q3a_temperature  ? $report->q3a_temperature : ' ' }}&nbsp;</span></span>
    </p>
        
        <p style="padding-left: 275pt">Breathing : <span class="underline-field" style="width: 60pt;">{{ $report->q3a_breathing ? $report->q3a_breathing : ''}}&nbsp;</span></p>
        <p style="padding-left: 275pt">Pulse : <span class="underline-field" style="width: 60pt;">{{ $report->q3a_pulse ? $report->q3a_pulse : '' }}&nbsp;</span></p>
        
        <p class="indent-1"><span class="section-number">b)</span> In what stage was the disease when you arrived (acute, chronic)?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q3b_disease_stage }}&nbsp;</span></p>

        <p class="indent-1"><span class="section-number">c)</span> Position and degree of lameness, if any?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q3c_lameness_position_degree }}&nbsp;</span></p>
        
        <p class="indent-1"><span class="section-number">d)</span> State of nourishment at the first examination?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q3d_nourishment_state }}&nbsp;</span></p>

        <p class="indent-1"><span class="section-number">e)</span> What aids were used for the diagnosis (such as X-ray, laryngoscope)?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q3e_diagnostic_aids }}&nbsp;</span></p>
        
        <p class="indent-2" style="font-size: 10pt; font-style: italic;">(if X-rays were taken, please attach)</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>

        <p style="padding-top: 2.54pt;"><span class="section-number">4.</span> Diagnosis</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{ $report->q4_diagnosis }}
&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">5.</span> Prognosis</p>
        <p class="indent-1"><span class="section-number">a)</span> Does a cure seem possible? 
            Yes <span class="underline-field" style="width: 20pt;">{{ $report->q5a_cure_possible ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">&nbsp;</span>
        </p>
        
        <p class="indent-1"><span class="section-number">b)</span> Probable time the cure will take. <span class="underline-field" style="width: 100pt;">{{ $report->q5b_cure_time }}&nbsp;</span></p>
        
        <p class="indent-1"><span class="section-number">c)</span> Does it seem possible that treatment in an animal hospital will cure the animal?</p>
         <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q5c_hospital_cure_possible ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q5c_hospital_cure_possible ? '' : '/' }}&nbsp;</span>
        </p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>

        <p style="padding-top: 2.54pt;"><span class="section-number">6.</span> Therapy</p>
        <p class="indent-1"><span class="section-number">a)</span> What treatment was given? (medicaments)</p>
        <p class="indent-1"><span class="underline-field" style="width: 400pt;">{{ $report->q6a_treatment_given }}&nbsp;</span></p>
         </div>

    <!-- Page Break for Page 2 -->
    <div class="page-break">
        <!-- Page 2 Content -->
        <p class="indent-1"><span class="section-number">b)</span> Were special instructions given? (e.g. rest, some movement, etc.)?</p>
       <p class="indent-1"><span class="underline-field" style="width: 400pt;">{{ $report->q6b_special_instructions }}&nbsp;</span></p> 
        <p class="indent-1"  style="padding-top: 2.54pt;"><span class="section-number">c)</span> How many visits were necessary? 
            <span class="underline-field" style="width: 40pt;">{{ $report->q6c_visits_count }}&nbsp;</span> visits on 
            <span class="underline-field" style="width: 80pt;">@foreach($report->q6c_visits_dates as $date)
    {{ $date }}
@endforeach &nbsp;</span>
        </p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">7.</span> Cause of the disease?</p>
       <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{ $report->q7_cause_of_disease }}
&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">8.</span></p>
        <p class="indent-1"><span class="section-number">a)</span> Was the animal already very sick before you were called in?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q8a_very_sick_before ? 'Yes' : 'No' }}&nbsp;</span></p>

        <p class="indent-1"><span class="section-number">b)</span> How long beforehand must the symptoms have been recognizable for the owner?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q8b_symptoms_recognizable_time }}&nbsp;</span></p>

        <p class="indent-1"><span class="section-number">c)</span> Was the First Aid given at a difficult birth effective?</p>
         <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;text:center;">{{ $report->q8c_first_aid_effective ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q8c_first_aid_effective ? '' : '/' }}&nbsp;</span>
        </p>
        
        <p class="indent-1"><span class="section-number">d)</span> Was the animal treated because of this disease before you were called in and if so by whom?</p>
       <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q8d_previous_treatment_details }}&nbsp;</span></p>
       <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>


        <p style="padding-top: 2.54pt;"><span class="section-number">9.</span> Previous diseases</p>
        <p class="indent-1"><span class="section-number">a)</span> Is there a connection between this disease and a previous one?</p>
       <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q9a_connection_previous_disease ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q9a_connection_previous_disease ? '' : '/' }}&nbsp;</span>
        </p>
        
        <p class="indent-1"><span class="section-number">b)</span> When and by whom was previous disease treated?</p>
        <p class="indent-2"><span class="underline-field" style="width: 400pt;">{{ $report->q9b_previous_disease_treatment_details }}&nbsp;</span></p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>

        <p style="padding-top: 2.54pt;"><span class="section-number">10.</span> Animal's other defects</p>
        <p class="indent-1" style="font-style: italic;">(blindness, vices, blemishes, etc.)</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{ $report->q10_other_defects }}
&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">11.</span> Are your instructions followed carefully?</p>
         <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q11_instructions_followed ? '/' : '' }}
&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q11_instructions_followed ? '' : '/' }}
&nbsp;</span>
        </p>
         <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>

        <p style="padding-top: 2.54pt;"><span class="section-number">12.</span> Is, as a result of the present disease, intentional destruction necessary, as the death</p>
        <p class="indent-1">of the animal is almost certain to occur shortly?</p>
        <p class="indent-1 " style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q12_intentional_destruction_needed ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q12_intentional_destruction_needed ? '' : '/' }}&nbsp;</span>
        </p>
        
        <p class="indent-1">If not, is it advisable to slaughter the animal?</p>
        <p class="indent-2"><span class="section-number">a)</span> since it is no longer economical to keep it?</p>
        <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q12a_slaughter_economical ? '/' : '' }}&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q12a_slaughter_economical ? '' : '/' }}&nbsp;</span>
        </p>
        
        <p class="indent-2"><span class="section-number">b)</span> In order to guarantee the slaughter value?</p>
        <p class="indent-1" style="margin-left: 175pt;"> Yes <span class="underline-field" style="width: 20pt;">{{ $report->q12b_slaughter_value ? '/' : '' }}
&nbsp;</span>
            No <span class="underline-field" style="width: 20pt;">{{ $report->q12b_slaughter_value ? '' : '/' }}
&nbsp;</span>
        </p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">&nbsp;</div>

        <p style="padding-top: 2.54pt;"><span class="section-number">13.</span> If it is not necessary to effect intentional destruction, for what purpose can the Animal be used?</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{ $report->q13_future_use }}
&nbsp;</div>
        
        <p style="padding-top: 2.54pt;"><span class="section-number">14.</span> Further supplementary remarks on the report:</p>
        <div class="underline-field" style="width: 100%; height: 15pt; margin-top: 3pt;">{{ $report->q14_remarks }}
&nbsp;</div>
        
        <div style="margin-top: 10pt;">
            <p>Signed at <span class="underline-field" style="width: 100pt;">{{ $report->signed_at_location }}&nbsp;</span>, this 
                <span class="underline-field" style="width: 30pt;"> 
&nbsp;{{ $report->signed_at_date ? \Carbon\Carbon::parse($report->signed_at_date)->format('F') : '' }}</span> day of 
                <p><span class="underline-field" style="width: 80pt;">{{ \Carbon\Carbon::parse($report->signed_at_date)->format('l') }}
&nbsp;</span>,
                <span class="underline-field" style="width: 25pt;">{{ \Carbon\Carbon::parse($report->signed_at_time)->format('Y') }}&nbsp;</span></p>
            </p>
            
           <div style="margin-top: 40pt;">
    <div style="float: left; width: 40%;">
        <div style="position: relative; width: 150pt; margin: 0 auto;">
            <!-- Data above the line -->
            <div style="position: absolute; top: -15pt; left: 0; width: 100%; text-align: center; font-style: italic; height: 15pt;">
                {{-- Stamp data goes here --}}
                &nbsp;
            </div>
            <!-- The line with label below -->
            <div style="border-top: 0.5pt solid #000; width: 100%; padding-top: 3pt; text-align: center; font-size: 10pt;">
                Stamps
            </div>
        </div>
    </div>
    
    <div style="float: right; width: 40%;">
        <div style="position: relative; width: 150pt; margin: 0 auto;">
            <!-- Data above the line -->
            <div style="position: absolute; top: -15pt; left: 0; width: 100%; text-align: center; font-style: italic; height: 15pt;">
                {{ $report->veterinarian_name }}
                &nbsp;
            </div>
            <!-- The line with label below -->
            <div style="border-top: 0.5pt solid #000; width: 100%; padding-top: 3pt; text-align: center; font-size: 10pt;">
                Signature of the Veterinarian
            </div>
        </div>
    </div>
    
    <div style="clear: both;"></div>
</div>
@foreach($signatures as $sig)
    @if($sig['image'])
        <div style="position: absolute; 
                    left: {{ $sig['x'] + 510 }}px; 
                    top: {{ $sig['y'] + 930}}px; 
                    width: {{ $sig['width'] }}px; 
                    height: {{ $sig['height'] }}px;">
            <img src="{{ $sig['image'] }}" style="width: 100%; height: 100%;" />
        </div>
    @endif
@endforeach



        </div>
    </div>
</body>
</html>