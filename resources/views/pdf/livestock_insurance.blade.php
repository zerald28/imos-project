{{-- resources/views/pdf/livestock_insurance.blade.php --}}
<!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>PHILIPPINE CROP INSURANCE CORPORATION</title>
    <meta name="author" content="Owner"/>
    <style type="text/css">
        * {margin:0; padding:0; text-indent:0; }
          body {
        /* font-family: Arial, sans-serif; 
        font-size: 12pt;  */
        margin-top: 1.28cm;
        margin-left: 1.91cm;
        margin-right: 1.26cm;
        margin-bottom: 0cm;
    }
        .s1 { color: black; font-family:Arial, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }
        .s2 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: underline; font-size: 12pt; }
        h1 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt; }
        .s3 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }
        .s4 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 11pt; }
        .s5 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt;}
        h2 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 11pt; }
        p { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 11pt; margin:0pt; }
        li {display: block; }
        #l1 {padding-left: 0pt;counter-reset: c1 0; }
       #l1 > li > h2:before {
    counter-increment: c1;
    content: counter(c1, upper-roman) ". ";
    font-weight: bold;
}

        #l1> li:first-child>*:first-child:before {counter-increment: c1 0;  }
      #l2 { counter-reset: c2 1; }

#l2 > li > p:before,
#l2 > li > h2:before {
    counter-increment: c2;
    content: counter(c2, decimal) ". ";
    font-family: "Times New Roman", serif;
    font-size: 11pt;
   
}

        table, tbody {vertical-align: top; overflow: visible; }
        /* Ensure DOMPDF prints as expected */
        u { text-decoration: none; border-bottom: .5pt solid #000; }
        .table-border td, .table-border th {
    border: 0.5pt solid #000;
}


    </style>
</head>
<body>
    <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: right;">LIV-UPI-01</p>
    <p style="text-indent: 0pt;text-align: left;"><br/></p>

    <p class="s2" style="text-indent: 0pt;text-align: center;">APPLICATION FORM FOR LIVESTOCK MORTALITY INSURANCE</p>
    <p style="text-indent: 0pt;text-align: left;"><br/></p>

    <p style="text-indent: 0pt;text-align: center; font-weight:bold;">
        [<span style=" width:8pt; text-align:center;"> {!! ($application->cover_type ?? '') === 'commercial' ? '/' : '&nbsp;' !!}
             </span>]COMMERCIAL COVER
        &nbsp;
        [ <span style=" width:8pt; text-align:center;">{!! ($application->cover_type ?? '') === 'non-commercial' ? '/' : '&nbsp;' !!} 
            </span>]NON-COMMERCIAL COVER
        &nbsp;
         [<span style=" width:8pt; text-align:center;">
            {!! ($application->cover_type ?? '') === 'special' ? '/' : '&nbsp;' !!} 
        </span>] SPECIAL COVER
    </p>

    <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br/></p>

   <table class="table-border" style="border-collapse: collapse; margin-left:23.075pt;" cellspacing="0">

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Name of Farmer</p>
            </td>
           <td style="width:369pt;" colspan="3">
    <p style="padding-left: 8pt; text-indent: 0pt; text-align: left; font-style: italic;">
        {{ $application->farmer->userInformation->firstname ?? '' }}
        {{ $application->farmer->userInformation->middlename ?? '' }}
        {{ $application->farmer->userInformation->lastname ?? '' }}
    </p>
</td>

        </tr>

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Indigenous People</p>
            </td>
          <td style="width:135pt;">
    <p class="s4" style="padding-left: 8pt; text-indent: 0pt; line-height: 13pt; text-align: left;">
        [<span style=" width:8pt; text-align:center;">
            {!! ($application->is_indigenous ?? false) ? '/' : '&nbsp;' !!}
        </span>] <span class="s5">Yes</span>
        [<span style=" width:8pt; text-align:center;">
            {!! !($application->is_indigenous ?? false) ? '/' : '&nbsp;' !!}
        </span>] <span class="s5">No</span>
    </p>
</td>

            <td style="width:45pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Tribe</p>
            </td>
            <td style="width:189pt;">
                <p style="padding-left: 8pt;font-style: italic;text-indent: 0pt;text-align: left;">{{ $application->tribe ?? '' }}</p>
            </td>
        </tr>

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">PWD</p>
            </td>
            <td style="width:369pt;" colspan="3">
                 <p class="s4" style="padding-left: 8pt; text-indent: 0pt; line-height: 13pt; text-align: left;">
        [<span style=" width:8pt; text-align:center;">
            {!! ($application->is_pwd ?? false) ? '/' : '&nbsp;' !!}
        </span>] <span class="s5">Yes</span>
        [<span style=" width:8pt; text-align:center;">
            {!! !($application->is_pwd?? false) ? '/' : '&nbsp;' !!}
        </span>] <span class="s5">No</span>
    </p>
            </td>
        </tr>

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Name of Spouse</p>
            </td>
            <td style="width:369pt;" colspan="3">
                <p style="padding-left: 8pt;text-indent: 0pt;text-align: left;font-style: italic;">{{ $application->spouse_name ?? '' }}</p>
            </td>
        </tr>

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Address</p>
            </td>
            <td style="width:369pt;" colspan="3">
                <p style="padding-left: 8pt;text-indent: 0pt;text-align: left;font-style: italic;">{{ $application->address ?? '' }}</p>
            </td>
        </tr>

        <tr style="height:14pt">
            <td style="width:99pt">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Farm Address</p>
            </td>
            <td style="width:369pt;" colspan="3">
                <p style="padding-left: 8pt;text-indent: 0pt;text-align: left;font-style: italic;">{{ $application->farm_address ?? '' }}</p>
            </td>
        </tr>

        <tr style="height:14pt">
            <td style="width:99pt;">
                <p class="s3" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Contact Number</p>
            </td>
            <td style="width:369pt;" colspan="3">
                <p style="padding-left: 8pt;text-indent: 0pt;text-align: left;font-style: italic;">{{ $application->contact_no ?? '' }}</p>
            </td>
        </tr>
    </table>

    <ol id="l1">
      <li data-list-text="I.">
    <h2 style="padding-top: 12pt;padding-left: 40pt;text-indent: -35pt;line-height: 13pt;text-align: left;">
        Type of animal (Choose one only):
    </h2>

    <table style="border-collapse:collapse;margin-left:38.525pt" cellspacing="0">
        <tr style="height:13pt">
            <td style="width:79pt"><p class="s4" style="padding-left: 2pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                [ {!! ($application->animal_type ?? '') === 'cattle' ? '/' : '&nbsp;&nbsp;' !!} ] Cattle
            </p></td>
            <td style="width:91pt"><p class="s4" style="padding-left: 13pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                [ {!! ($application->animal_type ?? '') === 'carabao' ? '/' : '&nbsp;&nbsp;' !!} ] Carabao
            </p></td>
            <td style="width:40pt"><p class="s4" style="padding-right: 5pt;text-indent: 0pt;line-height: 12pt;text-align: right;">[</p></td>
           <td style="width:73pt">
    <p class="s4" style="text-indent: 0pt;line-height: 12pt;text-align: left;">
         {!! ($application->animal_type ?? '') === 'swine' ? '/' : '&nbsp;&nbsp;' !!} ] Swine
    </p>
</td>

            <td style="width:105pt"><p class="s4" style="padding-left: 25pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                [ {!! ($application->animal_type ?? '') === 'poultry' ? '/' : '&nbsp;&nbsp;' !!} ] Poultry
            </p></td>
        </tr>
        <tr style="height:13pt">
            <td style="width:79pt"><p class="s4" style="padding-left: 2pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                [ {!! ($application->animal_type ?? '') === 'horse' ? '/' : '&nbsp;&nbsp;' !!} ] Horse
            </p></td>
            <td style="width:91pt"><p class="s4" style="padding-left: 13pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                [ {!! ($application->animal_type ?? '') === 'goat' ? '/' : '&nbsp;&nbsp;' !!} ] Goat
            </p></td>
            <td style="width:40pt"><p class="s4" style="padding-right: 5pt;text-indent: 0pt;line-height: 12pt;text-align: right;">[</p></td>
            <td style="width:73pt"><p class="s4" style="padding-left: 5pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                ] Other
                @if(($application->animal_type ?? '') === 'other')
                    &nbsp;&nbsp; Specify: {{ $application->animal_type_other ?? '' }}
                @endif
            </p></td>
            <td style="width:105pt"><p class="s4">&nbsp;</p></td> {{-- Empty cell for alignment --}}
        </tr>
    </table>
</li>



        <li data-list-text="II.">
            <h2 style="padding-top: 12pt;padding-left: 40pt;text-indent: -35pt;text-align: left;">Purpose (Choose one only):</h2>

            <table style="border-collapse:collapse;margin-left:38.525pt" cellspacing="0">
                <tr style="height:13pt">
                    <td style="width:79pt"><p class="s4" style="padding-left: 2pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'fattening' ? '&nbsp;/' : '&nbsp;&nbsp;' !!} ] Fattening</p></td>
                    <td style="width:91pt"><p class="s4" style="padding-left: 13pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'draft' ? '/' : '&nbsp;&nbsp;' !!} ] Draft</p></td>
                    <td style="width:40pt"><p class="s4" style="padding-right: 5pt;text-indent: 0pt;line-height: 12pt;text-align: right;">[</p></td>
                    <td style="width:73pt"><p class="s4" style="padding-left: 5pt;text-indent: 0pt;line-height: 12pt;text-align: left;">] Broilers</p></td>
                    <td style="width:105pt"><p class="s4" style="padding-left: 25pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'pullets' ? '/' : '&nbsp;&nbsp;' !!} ] Pullets</p></td>
                </tr>
                <tr style="height:13pt">
                    <td style="width:79pt"><p class="s4" style="padding-left: 2pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'breeding' ? '&nbsp;/' : '&nbsp;&nbsp;' !!} ] Breeding</p></td>
                    <td style="width:91pt"><p class="s4" style="padding-left: 13pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'dairy' ? '/' : '&nbsp;&nbsp;' !!} ] Dairy</p></td>
                    <td style="width:40pt"><p class="s4" style="padding-right: 5pt;text-indent: 0pt;line-height: 12pt;text-align: right;">[</p></td>
                    <td style="width:73pt"><p class="s4" style="padding-left: 5pt;text-indent: 0pt;line-height: 12pt;text-align: left;">] Layers</p></td>
                    <td style="width:105pt"><p class="s4" style="padding-left: 25pt;text-indent: 0pt;line-height: 12pt;text-align: left;">[ {!! ($application->purpose ?? '') === 'parent Stock' ? '/' : '&nbsp;&nbsp;' !!} ] Parent Stock</p></td>
                </tr>
            </table>
        </li>

        <li data-list-text="III.">
            <h2 style="padding-top: 12pt;padding-left: 40pt;text-indent: -35pt;text-align: left;">Description of Animals to be insured:</h2>

            <table style="border-collapse:collapse;margin-left:41.275pt" cellspacing="0">
                <tr style="height:24pt">
                    <td style="width:99pt;border:.5pt solid #000;" colspan="2"><p class="s4" style="padding-left: 5pt;padding-bottom:10pt;text-indent: 0pt;text-align: center;">No. of heads/Birds</p></td>
                    <td style="width:48pt;border:.5pt  solid #000;" rowspan="2"><p class="s4" style="padding-left: 13pt;text-indent: 0pt;text-align: left;">Age</p></td>
                    <td style="width:75pt;border:.5pt  solid #000;" rowspan="2"><p class="s4" style="padding-left: 24pt;text-indent: 0pt;text-align: left;">Breed</p></td>
                    <td style="width:55pt;border:.5pt  solid #000;" rowspan="2"><p class="s4" style="padding-left: 5pt;padding-right: 3pt;text-indent: 0pt;text-align: left;">Ear Mark/ Tag No.</p></td>
                    <td style="width:40pt;border:.5pt  solid #000;" rowspan="2"><p class="s4" style="padding-left: 5pt;padding-right: 9pt;text-indent: 0pt;text-align: left;">Basic Color</p></td>
                    <td style="width:142pt;border:.5pt  solid #000;" rowspan="2"><p class="s4" style="padding-left: 5pt;padding-right: 1pt;text-indent: 0pt;text-align: left;">Proof of Ownership for Cattle, Carabao and Horse only</p></td>
                </tr>

                <tr style="height:13pt">
                    <td style="width:48pt;border:.5pt  solid #000;"><p class="s4" style="padding-left: 5pt;text-indent: 0pt;line-height: 12pt;text-align: left;">Male</p></td>
                    <td style="width:51pt;border:.5pt solid #000;"><p class="s4" style="padding-left: 5pt;text-indent: 0pt;line-height: 12pt;text-align: left;">Female</p></td>
                </tr>

                {{-- DYNAMIC ROWS: loop only through animals provided --}}
                @if(!empty($application->animals) && count($application->animals) > 0)
                    @foreach($application->animals as $animal)
                        <tr style="height:13pt">
                            <td style="width:48pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;">
                                    {!! (isset($animal->sex) && strtolower($animal->sex) === 'male') ? '/' : '&nbsp;&nbsp;' !!}
                                </p>
                            </td>
                            <td style="width:51pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;">
                                    {!! (isset($animal->sex) && strtolower($animal->sex) === 'female') ? '/' : '&nbsp;&nbsp;' !!}
                                </p>
                            </td>
                            <td style="width:48pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;font-style: italic;">{{ $animal->age ?? '' }}</p>
                            </td>
                            <td style="width:75pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;font-style: italic;">{{ $animal->breed ?? '' }}</p>
                            </td>
                            <td style="width:55pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;font-style: italic;">{{ $animal->ear_mark ?? '' }}</p>
                            </td>
                            <td style="width:40pt;border:.5pt solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;font-style: italic;">{{ $animal->color ?? '' }}</p>
                            </td>
                            <td style="width:142pt;border:.5pt  solid #000;">
                                <p style="text-indent: 0pt;text-align: center;padding-top:3pt;padding-bottom:3pt;font-style: italic;">{{ $animal->proof_of_ownership ?? '' }}</p>
                            </td>
                        </tr>
                    @endforeach
                @else
                    {{-- No animals: show one empty row to keep layout consistent --}}
                    <tr style="height:13pt">
                        <td style="width:48pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                        <td style="width:51pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                        <td style="width:48pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                        <td style="width:75pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                        <td style="width:55pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                        <td style="width:40pt;border:.5pt solid #000;"><p>&nbsp;</p></td>
                        <td style="width:142pt;border:.5pt  solid #000;"><p>&nbsp;</p></td>
                    </tr>
                @endif

            </table>

  <!-- START: Total number and related fields aligned with 3.1 -->
<table style="margin-left: 58pt; margin-top: 0pt; border-collapse: collapse;">
    <tr>
        <!-- First column with padding and bold text -->
        <td style="width:160pt; padding-left:0pt; text-indent:-18pt; font-family:'Times New Roman', serif; font-size:11pt; line-height:13pt; font-weight:bold;">
            Total number of heads for enrollment
        </td>
        <!-- Colon column -->
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size:11pt; line-height:13pt;">
            :
        </td>
        <!-- Data column with underline -->
        <td style="font-style: italic;width:140pt; border-bottom:.5pt solid #000;padding-left: 5pt;font-family:'Times New Roman', serif; font-size:11pt; line-height:13pt;">
            {{ $application->number_of_heads ?? '' }}
        </td>
    </tr>
</table>


<table style="margin-left: 58pt; margin-top: 0pt; border-collapse: collapse;">
    <tr>
        <td style="width:140pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Source of Stock
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt; border-bottom:.5pt solid #000;padding-left: 5pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->source_of_stock ?? '' }}
        </td>
    </tr>
    <tr>
        <td style="width:140pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            No. of Housing Units
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt; border-bottom:.5pt solid #000;padding-left: 5pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->no_of_housing_units ?? '' }}
        </td>
    </tr>
    <tr>
        <td style="width:140pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            No. of Birds per Housing Unit
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt; border-bottom:.5pt solid #000;padding-left: 5pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->birds_per_unit ?? '' }}
        </td>
    </tr>
    <tr>
        <td style="width:140pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Date of Purchase
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt; border-bottom:.5pt solid #000;padding-left: 5pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ isset($application->date_of_purchase ) ? $application->date_of_purchase->format('F d, Y') : '' }}
            
        </td>
    </tr>
</table>


<!-- END: Total number and related fields -->

        </li>

        <li data-list-text="IV.">
            <h2 style="padding-top: 12pt;padding-left: 40pt;text-indent: -35pt;line-height: 13pt;text-align: left;">Coverage:</h2>
            <ol id="l2">
                <li data-list-text="1.">
                    <p style="padding-left: 58pt;text-indent: -17pt;line-height: 13pt;text-align: left;">
                        Desired  Sum  Insured  per  head  P  <u style="font-style: italic;">{{ isset($application->desired_sum_insured) ? number_format($application->desired_sum_insured,2) : '_____________________________' }}</u>
                     {{-- {{ isset($application->desired_sum_insured) ? number_format($application->desired_sum_insured,2) : '____________________' }} --}}
              </p>
                </li>
                <li data-list-text="2.">
                    <p style="padding-left: 58pt;text-indent: -17pt;line-height: 13pt;text-align: left;">
                        Total   Sum   Insured   P   <u style="font-style: italic;">{{ isset($application->total_sum_insured) ? number_format($application->total_sum_insured,2) : '____________________________' }}</u>
                     {{ isset($application->total_sum_insured) ? number_format($application->total_sum_insured,2) : '____________________' }}
                   </p>
                </li>
                <li data-list-text="3.">
                    <p style="padding-left: 58pt;text-indent: -17pt;line-height: 13pt;text-align: left;">Extended Coverage for Epidemic Diseases :</p>
                </li>
            </ol>
        </li>
    </ol>

    <p style="padding-left: 59pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
        3.1 &nbsp;&nbsp; <u>{{ $application->epidemic_1 ?? '' }}</u>
    </p>
    <p style="padding-left: 59pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
        3.2 &nbsp;&nbsp; <u>{{ $application->epidemic_2 ?? '' }}</u>
    </p>
    <p style="padding-left: 59pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
        3.3 &nbsp;&nbsp; <u>{{ $application->epidemic_3 ?? '' }}</u>
    </p>

 <table style="margin-left: 0pt; margin-top: 3pt; border-collapse: collapse;">
    <tr>
        <td style="width:57pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Assignee
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt;padding-left: 5pt;border-bottom:0.5pt solid #000; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->assignee ?? '' }}
        </td>
    </tr>
    <tr style="">
        <td style="width:57pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Address
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt;padding-left: 5pt; border-bottom:0.5pt solid #000; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->assignee_address ?? '' }}
        </td>
    </tr>
    <tr>
        <td style="width:57pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Contact No.
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt;padding-left: 5pt; border-bottom:0.5pt solid #000; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ $application->assignee_contact ?? '' }}
        </td>
    </tr>
    <tr>
        <td style="width:57pt; font-family:'Times New Roman', serif; font-size: 11pt;">
            Date
        </td>
        <td style="width:5pt; text-align:center; font-family:'Times New Roman', serif; font-size: 11pt;">
            :
        </td>
        <td style="font-style: italic;width:200pt; padding-left: 5pt;border-bottom:0.5pt solid #000; font-family:'Times New Roman', serif; font-size: 11pt;">
            {{ isset($application->updated_at) ? $application->updated_at->format('F d, Y') : '' }}
        </td>
    </tr>
</table>
<br>
<br>
<br>
<br>
<!-- Additional lines and Name of Proponent -->
<!-- Proponent line and label -->
<table style="width:100%; border-collapse: collapse; margin-top: 12pt;">
    <tr>
        <td style="width:70%;"></td> <!-- Push content to right -->
        <td style="width:30%; text-align:center; font-family:'Times New Roman', serif; font-size:12pt; font-weight:bold;">
            <!-- Line container -->
             <div style="border-bottom: 0.5pt solid #000; width:100%; padding-bottom:1pt; position: relative;">
              {{-- @if(auth()->id() === $application->proponent && $application->proponentUser->digitalSignature)
    @php
        // Full local path for DomPDF
        $signaturePath = storage_path('app/public/' . $application->proponentUser->digitalSignature->signature);
    @endphp

    <img src="{{ $signaturePath }}" 
         style="position: absolute; top: -25px; left: 0;  width: 100%; height: auto; max-height: 120px; object-fit: contain;" />
@endif --}}





               
                <!-- Optional fallback name -->
                <span style="font-style: italic; opacity:.8">{{ $application->proponentUser->userInformation->firstname ?? '' }}
                    {{ $application->proponentUser->userInformation->middlename ?? '' }}
                    {{ $application->proponentUser->userInformation->lastname ?? '' }}
                </span>

                 {{-- @if($application->proponent_signature_path ?? false)
                    <img src="{{ public_path($application->proponent_signature_path) }}" 
                         style="position: absolute; top: 0; left: 0; width: 100%; height: auto; max-height: 50px; object-fit: contain;" />
                @endif --}}

                    <!-- Signature image overlay -->
                      </div>
            <!-- Label below -->
            Name of Proponent
        </td>
    </tr>
</table>

@if(auth()->id() === $application->proponent && $application->proponentUser->digitalSignature)
    @php
        // Always use the digital signature image
        $signaturePath = storage_path('app/public/' . $application->proponentUser->digitalSignature->signature);
    @endphp

    <!-- First image, static -->
   @if($application->signature && $application->proponentUser->digitalSignature)
    @php
        // Use EXACT stored coordinates - NO OFFSETS
        $x = $application->signature->x - 120 ?? 0;
        $y = $application->signature->y - 60?? 0; //why does in the chrome browser i need to add - 60 to fit the actual postion of the image and -20 for microsoft edge browser
        $width = $application->signature->width ?? 100; 
        $height = $application->signature->height ?? 40;
        
        $signaturePath = storage_path('app/public/' . $application->proponentUser->digitalSignature->signature);
        
        // Debug output
        // echo "<!-- Signature Position: X=$x, Y=$y, W=$width, H=$height -->";
    @endphp

    <!-- Absolute positioned signature image -->
    {{-- <div style="position: absolute; left: {{ $x }}px; top: {{ $y }}px; width: {{ $width }}px; height: {{ $height }}px; z-index: 9999;">
        <img src="{{ $signaturePath }}" 
             style="width: 100%; height: 100%; object-fit: contain;" 
             alt="Signature" />
    </div> --}}
@endif
@endif





</body>
</html>
