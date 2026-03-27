{{-- resources/views/pdf/LIV-CAS-01.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LIV-CAS-01 - Notice of Loss (Livestock)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            margin-top: 1.28cm;
            margin-left: 1.26cm;
            margin-right: 1.26cm;
            margin-bottom: 1.28cm;
        }

        .form-container {
            width: 100%;
            page-break-after: avoid;
        }

        .form-code {
            text-align: right;
            font-size: 12pt;
            font-family: Arial, sans-serif;
        }

        .form-title {
            text-align: center;
            font-weight: bold;
            text-decoration: underline;
            font-size: 12pt;
            margin-bottom: 30px;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        td {
            border: 1px solid #00000000;
            padding: 10px 8px;
            vertical-align: top;
        }

        .label-cell {
            width: 40%;
            font-weight: normal;
            font-size: 12pt;
        }

        .value-cell {
            width: 60%;
            font-size: 12pt;
        }

        .bottom-border {
            border-bottom: 1px solid #00000000;
            min-height: 20px;
            padding-bottom: 5px;
        }

        .value-cell .line {
            border-bottom: 1px solid #000;
            min-height: 20px;
            width: 80%;
            display: inline-block;
            margin-left: 15px;
        }

        .value-cell span {
            font-style: italic;
        }

        .signature-line {
            margin-top: 5px;
        }

        .page-break {
            page-break-before: always;
        }
        
        /* Remove border for signature row cells if needed */
        .signature-row td {
            border: 1px solid #00000000;
        }
        
        .broken-line {
            border-top: 1px dashed #000;
            margin: 20px 0;
        }
        
        .duplicate-table {
            margin-top: 20px;
        }
    </style>
</head>
<body>

@php
    // Handle single form data
    $formData = $formData ?? [];
    
    // For multiple forms
    $forms = $forms ?? [$formData];
@endphp

@foreach($forms as $index => $data)
    <div class="form-container">
     
        
       
        <table>
            <tr>
                <td></td>
                <td>
                    <div style="font-size: 12pt; margin-left: 250px; font-weight:normal; font-family: Arial, sans-serif;">LIV-CAS-01</div>
                    
                </td>
            </tr>
            <tr>
                <td></td>
                <td> 
                    <div style="font-weight:bold">NOTICE OF LOSS </div>
                    <div style="margin-left:20px">(LIVESTOCK)</div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">NAME OF INSURED :</td>
                
                <td class="value-cell">
                   :
                    <div class="line">
                        @if(!empty($data['name_of_insured']))
                            <span>{{ $data['name_of_insured'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">ADDRESS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['address']))
                            <span>{{ $data['address'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">POLICY NUMBER  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['policy_number']))
                            <span>{{ $data['policy_number'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">LIVESTOCK INSURED  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['livestock_insured']))
                            <span>{{ $data['livestock_insured'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">CAUSE OF DEATH  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['cause_of_death']))
                            <span>{{ $data['cause_of_death'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">NUMBER OF HEADS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['number_of_heads']))
                            <span>{{ $data['number_of_heads'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">DATE OF OCCURRENCE OF LOSS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['date_of_occurrence']))
                            <span>{{ $data['date_of_occurrence'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr class="signature-row">
                <td class="label-cell">SIGNATURE  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['signature']))
                            <span>{{ $data['signature'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Broken Line -->
        <div class="broken-line"></div>
        
        <!-- Duplicate Table -->
        <table class="duplicate-table">
            <tr>
                <td></td>
                <td>
                    <div style="font-size: 12pt; margin-left: 250px; font-weight:normal; font-family: Arial, sans-serif;">LIV-CAS-01</div>
                    
                </td>
            </tr>
            <tr>
                <td></td>
                <td> 
                    <div style="font-weight:bold">NOTICE OF LOSS </div>
                    <div style="margin-left:20px">(LIVESTOCK)</div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">NAME OF INSURED :</td>
                
                <td class="value-cell">
                   :
                    <div class="line">
                        @if(!empty($data['name_of_insured']))
                            <span>{{ $data['name_of_insured'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">ADDRESS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['address']))
                            <span>{{ $data['address'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">POLICY NUMBER  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['policy_number']))
                            <span>{{ $data['policy_number'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">LIVESTOCK INSURED  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['livestock_insured']))
                            <span>{{ $data['livestock_insured'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">CAUSE OF DEATH  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['cause_of_death']))
                            <span>{{ $data['cause_of_death'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">NUMBER OF HEADS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['number_of_heads']))
                            <span>{{ $data['number_of_heads'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label-cell">DATE OF OCCURRENCE OF LOSS  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['date_of_occurrence']))
                            <span>{{ $data['date_of_occurrence'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
            <tr class="signature-row">
                <td class="label-cell">SIGNATURE  :</td>
                <td class="value-cell">
                    :
                    <div class="line">
                        @if(!empty($data['signature']))
                            <span>{{ $data['signature'] }}</span>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
    @if(!$loop->last)
        <div class="page-break"></div>
    @endif
@endforeach

</body>
</html>