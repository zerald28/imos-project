{{-- resources/views/pdf/LIV-CAS-02.blade.php --}}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>LIV-CAS-02 - Loss Report</title>
    <meta name="author" content="Insured"/>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }
        
        body {
            font-family: "Times New Roman", serif;
            font-size: 10pt;
            margin-top: 1.28cm;
            margin-left: 1.27cm;
            margin-right: 1.29cm;
            margin-bottom: 3.46cm;
        }
        
        .form-code {
            text-align: right;
            font-size: 12pt;
            font-family: Arial, sans-serif;
            margin-bottom: 15px;
        }
        
        .form-title {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            font-family: Arial, sans-serif;
            margin-bottom: 20px;
            margin-top: 10px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 10pt;
        }
        
        .info-table td {
            border: 1px solid #000;
            padding: 0;
            height: 0.5cm;
            vertical-align: middle;
        }
        
        .info-table .label-cell {
            width: 4.33cm;
            padding-left: 5px;
            font-weight: normal;
            vertical-align: middle;
        }
        
        .info-table .value-cell {
            padding-left: 5px;
            vertical-align: middle;
        }
        
        .info-table .policy-cell {
            width: 4.33cm;
            padding-left: 5px;
            vertical-align: middle;
        }
        
        .info-table .middle-cell {
            width: 4.25cm;
            vertical-align: middle;
            padding-left: 5px;
        }
        
        .info-table .period-cell {
            vertical-align: middle;
            padding-left: 5px;
        }
        
        .section {
            margin-bottom: 0;
            margin-top: 12px;
        }
        
        .section:first-of-type {
            margin-top: 0;
        }
        
        .section-number {
            font-weight: normal;
            font-size: 11pt;
        }
        
        .section-text {
            font-weight: normal;
            font-size: 11pt;
            display: inline;
        }
        
        .question {
            margin-top: 0;
            margin-bottom: 0;
            line-height: 1.3;
        }
        
        .question-inline {
            margin-top: 0;
            margin-bottom: 0;
            line-height: 1.3;
        }
        
        .answer-line {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 300px;
            margin-left: 10px;
            font-style: italic;
            padding-left: 5px;
        }
        
        .checkbox {
            display: inline-block;
            width: 12pt;
            text-align: center;
            border: 1px solid #000;
            margin-right: 5px;
        }
        
        .checkbox-label {
            display: inline-block;
            margin-right: 20px;
        }
        
        .form-table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 5px;
            margin-bottom: 10px;
            margin-left: 15px;
            font-size: 10pt;
        }
        
        .form-table td, .form-table th {
            border: 1px solid #000;
              text-align: center;
            vertical-align: top;
        }
        
        .form-table td:first-child,
        .form-table th:first-child {
            width: 6.21cm;
            padding-left: 5px;
        }
        
        .form-table th {
            font-weight: normal;
            text-align: center;
            font-size: 10pt;
        }
        
        .signature-section {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        .signature-line {
            border-top: 0.5pt solid #000;
            margin-top: 30px;
            padding-top: 5px;
            width: 200px;
        }
        
        .claim-amount {
            margin-top: 20px;
        }
        
        .field-row {
            margin-bottom: 0;
             margin-top: 10px;
              margin-left: 50px;
        }
        
        .field-label {
            display: inline-block;
            font-weight: normal;
            font-size: 10pt;
            margin-bottom: 0;
        }
        
        u {
            text-decoration: none;
            border-bottom: 0.5pt solid #000;
            padding-left: 5px;
            padding-right: 5px;
            font-style: italic;
        }
        
        .period-from, .period-to {
            display: inline-block;
            border-bottom: 1px solid #000;
            min-width: 80px;
            margin-left: 5px;
            font-style: italic;
        }
        
        .inline-group {
            margin-bottom: 0;
            margin-left: 5px;
        }
        
        .inline-field {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 110px;
            margin-left: 2px;
            margin-right: 20px;
            font-style: italic;
            font-size: 10pt;
        }
        
        .inline-field-small {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 80px;
            margin-left: 8px;
            margin-right: 15px;
            font-style: italic;
            font-size: 10pt;
        }
        
        .question-with-line {
            margin-bottom: 0;
        }
        
        .question-with-line .section-text {
            display: inline;
        }
        
        .section-spacer {
            margin-top: 10px;
        }
        
        .no-margin-top {
            margin-top: 0;
        }
    </style>
</head>
<body>

@php
    // Handle form data
    $formData = $formData ?? [];
    
    // For multiple forms
    $forms = $forms ?? [$formData];
@endphp

@foreach($forms as $index => $data)
    <div class="form-code">LIV-CAS-02</div>
    
    <div class="form-title">LOSS REPORT</div>
    
    <!-- Information Table - Consistent 3 columns across all rows -->
    <table class="info-table">
        <tr style="height: 0.5cm;">
            <td class="label-cell" style="width: 4.33cm;">Name of Insured</td>
            <td class="value-cell" colspan="2">
                @if(!empty($data['name_of_insured']))
                    {{ $data['name_of_insured'] }}
                @endif
            </td>
        </tr>
        <tr style="height: 0.5cm;">
            <td class="label-cell" style="width: 4.33cm;">Address</td>
            <td class="value-cell" colspan="2">
                @if(!empty($data['address']))
                    {{ $data['address'] }}
                @endif
            </td>
        </tr>
        <tr style="height: 0.5cm;">
            <td class="label-cell" style="width: 4.33cm;">Farm Address</td>
            <td class="value-cell" colspan="2">
                @if(!empty($data['farm_address']))
                    {{ $data['farm_address'] }}
                @endif
            </td>
        </tr>
        <tr style="height: 0.5cm;">
            <td class="label-cell" style="width: 4.33cm;">Contact Number</td>
            <td class="value-cell" colspan="2">
                @if(!empty($data['contact_number']))
                    {{ $data['contact_number'] }}
                @endif
            </td>
        </tr>
        <tr style="height: 0.5cm;">
            <td class="policy-cell" style="width: 4.33cm;">Policy Number</td>
            <td class="middle-cell" style="width: 4.25cm;">
                @if(!empty($data['policy_number']))
                    {{ $data['policy_number'] }}
                @endif
            </td>
            <td class="period-cell">
                Period of Cover: From: 
                <span class="period-from">
                    @if(!empty($data['period_from']))
                        {{ $data['period_from'] }}
                    @endif
                </span> 
                To: 
                <span class="period-to">
                    @if(!empty($data['period_to']))
                        {{ $data['period_to'] }}
                    @endif
                </span>
            </td>
        </tr>
    </table>
    
    <!-- Question 1 -->
    <div class="section">
        <div class="question">
            <span class="section-number">1.</span>
            <span class="section-text">Description of the animals for which indemnification is being required:</span>
        </div>
        
        <div class="inline-group">
            <span class="field-label">Type of Animal:</span>
            <span class="inline-field">
                @if(!empty($data['type_of_animal']))
                    {{ $data['type_of_animal'] }}
                @endif
            </span>
            
            <span class="field-label" style="margin-left: 10px;">Sex:</span>
            <span class="inline-field-small">
                @if(!empty($data['sex']))
                    {{ $data['sex'] }}
                @endif
            </span>
            
            <span class="field-label" style="margin-left: 10px;">Breed:</span>
            <span class="inline-field">
                @if(!empty($data['breed']))
                    {{ $data['breed'] }}
                @endif
            </span>
        </div>
        
        <div class="inline-group">
            <span class="field-label">Ear Tag No.:</span>
            <span class="inline-field">
                @if(!empty($data['ear_tag_no']))
                    {{ $data['ear_tag_no'] }}
                @endif
            </span>
            
            <span class="field-label" style="margin-left: 10px;">Brand No.:</span>
            <span class="inline-field">
                @if(!empty($data['brand_no']))
                    {{ $data['brand_no'] }}
                @endif
            </span>
            
            <span class="field-label" style="margin-left: 10px;">Proof of Ownership:</span>
            <span class="inline-field">
                @if(!empty($data['proof_of_ownership']))
                    {{ $data['proof_of_ownership'] }}
                @endif
            </span>
        </div>
        
        <div class="inline-group">
            <span class="field-label">Age at time of Application:</span>
            <span class="inline-field">
                @if(!empty($data['age_at_application']))
                    {{ $data['age_at_application'] }}
                @endif
            </span>
        </div>
        
        <div class="inline-group">
            <span class="field-label">Age at the time of Death:</span>
            <span class="inline-field">
                @if(!empty($data['age_at_death']))
                    {{ $data['age_at_death'] }}
                @endif
            </span>
        </div>
    </div>
    
    <!-- Question 2 - Inline answer line -->
    <div class="section">
        <div class="question-inline">
            <span class="section-number">2.</span>
            <span class="section-text">Purpose of the animal:</span>
            <span class="answer-line">
                @if(!empty($data['purpose']))
                    <span>{{ $data['purpose'] }}</span>
                @endif
            </span>
        </div>
    </div>
    
    <!-- Question 3 -->
    <div class="section">
        <div class="question">
            <span class="section-number">3.</span>
            <span class="section-text">How many animals of the insured species are on your farm or in your possession today?</span>
        </div>
        
        <table class="form-table">
            <thead>
                <tr>
                    <th rowspan="2">Animal</th>
                    <th colspan="2">Number of head</th>
                </tr>
                <tr>
                    <th>Bull, Stallion, Boar and Buck</th>
                    <th>Heifer, Mare, Sow and Does</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cattle</td>
                    <td>
                        @if(!empty($data['cattle_male']))
                            {{ $data['cattle_male'] }}
                        @endif
                    </td>
                    <td>
                        @if(!empty($data['cattle_female']))
                            {{ $data['cattle_female'] }}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Carabao</td>
                    <td>
                        @if(!empty($data['carabao_male']))
                            {{ $data['carabao_male'] }}
                        @endif
                    </td>
                    <td>
                        @if(!empty($data['carabao_female']))
                            {{ $data['carabao_female'] }}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Swine</td>
                    <td>
                        @if(!empty($data['swine_male']))
                            {{ $data['swine_male'] }}
                        @endif
                    </td>
                    <td>
                        @if(!empty($data['swine_female']))
                            {{ $data['swine_female'] }}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Goat</td>
                    <td>
                        @if(!empty($data['goat_male']))
                            {{ $data['goat_male'] }}
                        @endif
                    </td>
                    <td>
                        @if(!empty($data['goat_female']))
                            {{ $data['goat_female'] }}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Poultry</td>
                    <td>
                        @if(!empty($data['poultry_male']))
                            {{ $data['poultry_male'] }}
                        @endif
                    </td>
                    <td>
                        @if(!empty($data['poultry_female']))
                            {{ $data['poultry_female'] }}
                        @endif
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- Question 4 - Inline answer lines with zero spacing -->
    <div class="section">
        <div class="question-with-line">
            <span class="section-number">4.</span>
            <span class="section-text">When did the animal fall sick?</span>
            <span class="answer-line">
                @if(!empty($data['sickness_date']))
                    <span>{{ $data['sickness_date'] }}</span>
                @endif
            </span>
        </div>
        
        <div class="question-with-line">
            <span style="margin-left:15px;" class="section-text">What disease was involved?</span>
            <span class="answer-line">
                @if(!empty($data['disease']))
                    <span>{{ $data['disease'] }}</span>
                @endif
            </span>
        </div>
    </div>
    
    <!-- Question 5 - Inline answer lines with zero spacing -->
    <div class="section">
        <div class="question-with-line">
            <span class="section-number">5.</span>
            <span class="section-text">When did you first consult a veterinarian/Livestock Technician?</span>
            <span style="border-bottom: 1px solid #000; display: inline-block; min-width: 250px; margin-left: 10px; font-style: italic; padding-left: 5px;">
                @if(!empty($data['first_consultation']))
                    <span>{{ $data['first_consultation'] }}</span>
                @endif
            </span>
        </div>
        
        <div class="question-with-line">
            <span style="margin-left:12" class="section-text">Veterinarian/Livestock Technician Name and address:</span>
            <span class="answer-line">
                @if(!empty($data['veterinarian_name']))
                    <span>{{ $data['veterinarian_name'] }}</span>
                @endif
            </span>
        </div>
        
        <div class="question-with-line">
            <span style="margin-left:12"class="section-text">How soon after he was called in, was he in attendance?</span>
            <span class="answer-line">
                @if(!empty($data['attendance_time']))
                    <span>{{ $data['attendance_time'] }}</span>
                @endif
            </span>
        </div>
        
        <div class="question-with-line">
            <span style="margin-left:12" class="section-text">What subsequent visits did he make?</span>
            <span class="answer-line">
                @if(!empty($data['subsequent_visits']))
                    <span>{{ $data['subsequent_visits'] }}</span>
                @endif
            </span>
        </div>
    </div>
    
    <!-- Question 6 - Inline answer lines with zero spacing -->
    <div class="section">
        <div class="question-with-line">
            <span class="section-number">6.</span>
            <span class="section-text">Had you already given assistance before the veterinarian?</span>
        </div>
        <div class="field-row">
            <span class="checkbox-label">
                <span class="checkbox">
                    @if(!empty($data['assistance_before']) && $data['assistance_before'] == 'yes')
                        /
                    @else
                        &nbsp;
                    @endif
                </span> Yes
            </span>
            <span class="checkbox-label">
                <span class="checkbox">
                    @if(!empty($data['assistance_before']) && $data['assistance_before'] == 'no')
                        /
                    @else
                        &nbsp;
                    @endif
                </span> No
            </span>
        
            <span class="section-text">If yes, give details:</span>
            <span class="answer-line">
                @if(!empty($data['assistance_details']))
                    <span>{{ $data['assistance_details'] }}</span>
                @endif
            </span>
        </div>
    </div>
    
    <!-- Certification Statement -->
   <!-- Certification Statement -->
<div class="signature-section">
    <p style="margin-top: 0px; line-height: 1.4; font-size: 11pt; font-weight: normal;">
        I hereby certify that I have answered the question truthfully, I am aware that any untrue statements, 
        or statements of which I know to be incomplete result in the loss of insurance cover, 
        even if the insurer suffers no disadvantage thereby.
    </p>
    
    <div class="claim-amount" style="margin-top: 20px;">
        <p style="font-weight: normal; font-size: 11pt;">
            I herewith claim indemnification for ₱ P
            <u style="display: inline-block; min-width: 150px;">
                @if(!empty($data['claim_amount']))
                    {{ number_format($data['claim_amount'], 2) }}
                @endif
            </u>
        </p>
    </div>
    
    <div style="margin-top: 40px; width: 100%;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 50%; text-align: center; vertical-align: bottom;">
                    <div style="border-top: 0.5pt solid #000; width: 80%; margin: 0 auto;"></div>
                    <p style="font-size: 10pt; margin-top: 5px; font-weight: normal;">Date</p>
                </td>
                <td style="width: 50%; text-align: center; vertical-align: bottom;">
                    <div style="border-top: 0.5pt solid #000; width: 80%; margin: 0 auto;"></div>
                    <p style="font-size: 10pt; margin-top: 5px; font-weight: normal;">Signature of Assured</p>
                </td>
            </tr>
        </table>
    </div>
</div>
    
    @if(!$loop->last)
        <div style="page-break-before: always;"></div>
    @endif
@endforeach

</body>
</html>