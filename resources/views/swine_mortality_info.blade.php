{{-- File: resources/views/swine_mortality_info.blade.php --}}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swine Mortality Insurance - IMOS</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f9fafb;
            color: #111827;
            margin: 0;
            padding: 0;
            line-height: 1.7;
        }

        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 2rem;
        }

        .swine-header {
            color: #15803d;
            text-align: center;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 2rem;
        }

        .section-title {
            color: #16a34a;
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
        }

        .paragraph {
            margin-bottom: 1rem;
        }

        ol, ul {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        .note {
            font-style: italic;
            color: #6b7280;
            margin-top: 1rem;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        th, td {
            border: 1px solid #065f46;
            padding: 0.75rem;
            text-align: center;
        }

        th {
            background-color: #16a34a;
            color: #ffffff;
            font-weight: 600;
        }

        tr:nth-child(even) {
            background-color: #dcfce7;
        }

        tr:hover {
            background-color: #bbf7d0;
        }

        @media (max-width: 900px) {
            .swine-header {
                font-size: 2rem;
            }

            .section-title {
                font-size: 1.25rem;
            }

            th, td {
                font-size: 0.875rem;
                padding: 0.5rem;
            }
        }
    </style>
</head>

<body>
    
    <div class="container">
        {{-- <div class="flex items-center justify-between bg-green-900 text-white px-4 py-2 rounded-md shadow-md mb-4">
    <a href="{{ $backUrl }}" class="flex items-center gap-1 text-white hover:text-gray-200 transition">
        &#8592; Back
    </a>
    <h1 class="text-lg font-bold">{{ $title }}</h1>
    <div></div>
</div> --}}

        <h1 class="swine-header">
            GENERAL INFORMATION ON THE SWINE MORTALITY INSURANCE
        </h1>

        <p class="paragraph">
            The <strong> Crop Insurance Corporation (PCIC)</strong> provides insurance cover for livestock such as pigs,
            cattle, carabao, horses, goats, sheep, and poultry. This program helps farmers mitigate financial losses due
            to unexpected livestock mortality.
        </p>

        <h2 class="section-title">I. Types of Insurance Cover</h2>
        <ol>
            <li>Non-Commercial Mortality Insurance Cover</li>
            <li>Commercial Mortality Insurance Cover</li>
            <li>Special Cover for livestock dispersal</li>
        </ol>

        <h2 class="section-title">II. Insurance Cover Details</h2>
        <p class="paragraph">
            These policies provide coverage for deaths caused by accidents, diseases, and other covered risks.
        </p>

        <h2 class="section-title">III. Eligibility</h2>
        <table>
            <thead>
                <tr>
                    <th>Insurance Cover</th>
                    <th>Purpose</th>
                    <th>No. of Heads per Farmer</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="2">Non-Commercial Mortality Insurance</td>
                    <td>Breeder</td>
                    <td>Maximum of 10</td>
                    <td>Max. total sum insured of PhP 200,000 per farmer</td>
                </tr>
                <tr>
                    <td>Fattener</td>
                    <td>Maximum of 20</td>
                    <td>A minimum total sum insured of PhP 110,001</td>
                </tr>
                <tr>
                    <td rowspan="2">Commercial Mortality Insurance</td>
                    <td>Breeder</td>
                    <td>11 (minimum)</td>
                    <td>Max. total sum insured of PhP 200,000 per farmer</td>
                </tr>
                <tr>
                    <td>Fattener</td>
                    <td>21 (minimum)</td>
                    <td>A minimum total sum insured of PhP 110,001</td>
                </tr>
            </tbody>
        </table>
        <p class="note">
            NOTE: For Non-Commercial Mortality Insurance - A farmer can insure multiple types of animals,
            but the total sum insured shall not exceed PhP 200,000 per farmer.
        </p>

        <h2 class="section-title">IV. Insurable Age</h2>
        <table>
            <thead>
                <tr>
                    <th rowspan="2">Animal</th>
                    <th rowspan="2">Purpose</th>
                    <th colspan="2">Insurance Age</th>
                    <th rowspan="2">Remarks</th>
                </tr>
                <tr>
                    <th>From</th>
                    <th>To</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="2">Swine</td>
                    <td>Breeder</td>
                    <td>6th month</td>
                    <td>2 years</td>
                    <td>Can be renewed annually up to 4th year of life</td>
                </tr>
                <tr>
                    <td>Fattener</td>
                    <td>45th day</td>
                    <td>6th month</td>
                    <td>Until sold, whichever comes earlier</td>
                </tr>
            </tbody>
        </table>

        <h2 class="section-title">V. Acceptance Age, Sum Insured and Premium Rate</h2>
        <h3 class="section-title">a. Non-Commercial: Swine</h3>
        <table>
            <thead>
                <tr>
                    <th>Purpose</th>
                    <th>Sum Insured and Premium Rate (%)</th>
                    <th>Deductibles (% of Sum Insured)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Breeder</td>
                    <td>
                        TSI shall be 70% of the value of swine at the time of purchase but not to exceed:<br>
                        F1: PhP 14,500<br>
                        Parent Stock: PhP 34,000<br>
                        Grand Parent Stock: PhP 72,500
                    </td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Fattener</td>
                    <td>TSI shall be 70% of the value of swine at selling/slaughter time in the locality but not to exceed PhP 10,000/head</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>

        <p>Applicable Premium Rates (Normal Cover and Extended Cover):</p>
        <table>
            <thead>
                <tr>
                    <th>Covered Diseases (Normal Cover)</th>
                    <th colspan="2">Extended Cover (Rider Perils)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>3.00</td>
                    <td>0.50 (Natural Calamities)</td>
                    <td>0.25 – 2.00 (Other Diseases)</td>
                </tr>
                <tr>
                    <td>1.50</td>
                    <td>0.25 (Natural Calamities)</td>
                    <td>0.25 – 2.00 (Other Diseases)</td>
                </tr>
            </tbody>
        </table>

        <h3 class="section-title">b. Commercial: Swine</h3>
        <table>
            <thead>
                <tr>
                    <th>Purpose</th>
                    <th>Sum Insured (PhP) per Head/Batch</th>
                    <th>Premium Rate (%)</th>
                    <th>Deductible</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fattener</td>
                    <td>70% market value</td>
                    <td>3–6%</td>
                    <td>10–20%</td>
                </tr>
                <tr>
                    <td>Breeder</td>
                    <td>70% market value</td>
                    <td>Same as non-commercial</td>
                    <td>10–20%</td>
                </tr>
            </tbody>
        </table>

        <h2 class="section-title">VI. Covered Risks</h2>
        <table>
            <thead>
                <tr>
                    <th>Insurance Cover</th>
                    <th>#</th>
                    <th>Covered Risks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="5">Non-Commercial</td>
                    <td>1.</td>
                    <td>Diseases like liver fluke, verminous bronchitis, leptospirosis, swine enzootic pneumonia, colibacillosis, streptococcosis, tetanus, aflatoxicosis, cancerous diseases, foot rot, rabies, poisoning, heat stroke, heart attack, and all other diseases except those in exclusions.</td>
                </tr>
                <tr>
                    <td>2.</td>
                    <td>Accidental drowning, strangulation, snakebites, other accidental events (except vehicular accidents)</td>
                </tr>
                <tr>
                    <td>3.</td>
                    <td>Fire and/or lightning</td>
                </tr>
                <tr>
                    <td>4.</td>
                    <td>Volcanic eruptions, earthquakes, typhoon, hurricane, cyclone, and other acts of God</td>
                </tr>
                <tr>
                    <td>5.</td>
                    <td>Accidents arising from transport of animals to/from farm and place of treatment</td>
                </tr>
                <tr>
                    <td>Commercial</td>
                    <td>1.</td>
                    <td>All diseases covered in Non-Commercial Cover including accidents except Fire and/or Lightning arising from transport of animals to/from farm</td>
                </tr>
            </tbody>
        </table>

        <h2 class="section-title">VII. Excluded Risks</h2>
        <ol>
            <li>Destruction of the animal by an administrative order of the government</li>
            <li>Unskillful treatment by the animal raiser, his agent and employees, overloading, improper use, willful or malicious injury</li>
            <li>Emergency slaughter / Government Slaughter Order</li>
            <li>Pillage, strike or labor disputes, war, rebellion, terrorism, radioactive contamination</li>
            <li>Diseases or injuries already existing at commencement of insurance or during waiting period</li>
            <li>Disappearance, theft, robbery, confiscation by order of government</li>
            <li>African Swine Fever (ASF), hog cholera, hoof and mouth disease, erysipelas, swine plague, salmonellosis, dysentery</li>
            <li>Losses occurring prior to effectivity and after expiry of insurance coverage</li>
            <li>Losses due to mismanagement</li>
            <li>Losses due to vehicular accidents</li>
            <li>Other excluded risks indicated in policy</li>
            <li>Fire, lightning, typhoon, and flood under commercial cover</li>
        </ol>

        <h2 class="section-title">VIII. Conditions for Extended Coverage</h2>
        <p>Additional risks and diseases excluded in the basic cover can be covered as extended cover subject to conditions:</p>
        <ol>
            <li>Personal inspection of all animals to be insured must be conducted</li>
            <li>Vaccination of susceptible animals against epidemic diseases as evidenced by a Veterinary Certificate submitted to PCIC RO</li>
            <li>All losses caused by epidemic diseases, if covered, shall be indemnified up to 60% of Total Sum Insured. For ASF, cover up to 100%</li>
            <li>Additional premium rates as follows:</li>
        </ol>

        <table>
            <thead>
                <tr>
                    <th>Risk / Peril</th>
                    <th>Premium Rate (%)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Animal Disease / Allied Perils</td>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <td>Erysipelas</td>
                    <td>0.50%</td>
                </tr>
                <tr>
                    <td>Hog Cholera</td>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <td>Hoof and Mouth Disease</td>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <td>Salmonellosis</td>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <td>Swine Plague</td>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <td>Natural Calamities</td>
                    <td>0.50%</td>
                </tr>
                <tr>
                    <td>Fattener</td>
                    <td>0.50%</td>
                </tr>
                <tr>
                    <td>Breeder</td>
                    <td>0.50%</td>
                </tr>
                <tr>
                    <td>African Swine Fever (ASF)</td>
                    <td>0.50%</td>
                </tr>
                <tr>
                    <td>Fire and Lightning</td>
                    <td>0.50%</td>
                </tr>
            </tbody>
        </table>

        <p>Transport Risk: Optional transport insurance cover is limited to inland transport at 0.75–1.5% depending on distance, time, and road conditions, excluding hijacking and theft.</p>

        <h2 class="section-title">IX. Waiting Period</h2>
        <p>The waiting period is the time elapsed between effectivity of coverage and occurrence of disease within which no insurance compensation shall be paid. It does not apply to accidents or renewed policies. Generally, 21 calendar days except for certain diseases, which is 3 months.</p>
        <table>
            <thead>
                <tr>
                    <th>Diseases</th>
                    <th>Type of Animal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Swine</td>
                    <td>Rickets, tuberculosis, brucellosis, and leucosis</td>
                </tr>
            </tbody>
        </table>

        <h2 class="section-title">X. Application Procedure</h2>
        <ol>
            <li>Submit filled-out application for PCIC Livestock Mortality Insurance Form</li>
            <li>Pay the corresponding premium and other charges</li>
        </ol>

        <h2 class="section-title">XI. Issuance of Policy</h2>
        <p>Official Receipt (OR) shall be issued by the Insurance Underwriter (IU) upon receipt of premium. Copy of Insurance Policy/Contract released by PCIC RO upon remittance by IU.</p>

        <h2 class="section-title">XII. Claim for Indemnity Procedure</h2>
        <ol>
            <li>
                Written notice of loss (NL) form LIV CAS-01 must be filed to PCIC RO/PEO within 7 calendar days from death of the animal. Abnormally large deaths must be reported within 24 hours.
            </li>
            <li>
                Loss report and other required documents filed within 30 days to PCIC RO/PEO from death of insured animals:
                <ol type="a">
                    <li>Loss Report (LIV CAS–02) duly signed by assured animal raiser</li>
                    <li>Veterinary Disease Report signed by authorized Veterinarian or Livestock Technician/Inspector</li>
                    <li>Affidavit of two disinterested persons with valid IDs if cause of death is not disease</li>
                    <li>Result of Veterinary Dissection (Necropsy Report)</li>
                    <li>Photograph of animal’s carcass showing identity or ownership marks</li>
                    <li>Proof of salvage value, if any</li>
                </ol>
            </li>
        </ol>

        <h2 class="section-title">XIII. Percentage Loss Assessment</h2>
        <table>
            <thead>
                <tr>
                    <th>Insurance Cover</th>
                    <th>Percentage (%) Loss Assessment / Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Non-Commercial</td>
                    <td>The assessment shall be 100% of the value of animal at time of loss based on table of assessment, less applicable deductible and salvage value.</td>
                </tr>
                <tr>
                    <td>Commercial</td>
                    <td>The assessment shall be based on market value of swine at the time of loss, less applicable deductible and salvage value.</td>
                </tr>
            </tbody>
        </table>

        <h2 class="section-title">XIV. Policy Renewal</h2>
        <p>Policies may be renewed annually subject to inspection, vaccination compliance, and payment of premium before expiry. Renewal ensures continuity of coverage and compliance with PCIC regulations.</p>

    </div>
</body>
</html>
