<?php

namespace App\Http\Controllers\ImosAdmin;

use App\Http\Controllers\Controller;
use App\Models\Marketplace\ListingSwine;
use App\Models\User;
use App\Models\Swine\Swine;
use App\Models\UserInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\VeterinaryRequest; // or whatever your model is
use Symfony\Component\HttpFoundation\StreamedResponse;
use Carbon\Carbon;
use App\Models\Location\Barangay;
use Illuminate\Support\Facades\Response;
use App\Models\Swine\Breed;


class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Basic counts (indexed columns used)
        $totalFarmers = User::where('role', 'farmer')->count();
        $totalSwine = ListingSwine::where('status', 'available')->count();
        $activeSwine = Swine::where('status', 'active')->count();
        $deadSwine = Swine::where('status', 'dead')->count();
        $soldSwine = Swine::where('status', 'sold')->count();

        // Most common purpose
        $purposeCounts = Swine::select('purpose', DB::raw('count(*) as total'))
            ->groupBy('purpose')
            ->orderByDesc('total')
            ->get();

        // Monthly mortality: using updated_at as death timestamp (replace if you have a dedicated death_date)
        $monthlyMortality = Swine::where('status', 'dead')
            ->selectRaw("YEAR(updated_at) as year, MONTH(updated_at) as month, COUNT(*) as total")
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()
            ->map(function($r){
                return [
                    'year' => (int)$r->year,
                    'month' => (int)$r->month,
                    'total' => (int)$r->total
                ];
            });

        // Barangay distribution (join user_informations)
       $barangayDistribution = DB::table('users')
    ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
    ->join('barangays', 'user_informations.barangay_id', '=', 'barangays.id')
    ->where('users.role', 'farmer')
    ->select('barangays.name as barangay_name', DB::raw('COUNT(*) as total'))
    ->groupBy('barangays.name')
    ->orderByDesc('total')
    ->limit(20)
    ->get();

    // Swine count per barangay
$swinePerBarangay = DB::table('swine')
    ->join('users', 'swine.owner_id', '=', 'users.id')
    ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
    ->join('barangays', 'user_informations.barangay_id', '=', 'barangays.id')
      ->whereIn('swine.status', ['active', 'available']) // ✅ IMPORTANT
    ->select('barangays.name as barangay_name', DB::raw('COUNT(swine.id) as total_swine'))
    ->groupBy('barangays.name')
    ->orderByDesc('total_swine')
    ->limit(20)
    ->get();



        // Recent activity logs (assumes activity_logs table: action, user_id, module, created_at)
        $recentActivities = DB::table('activity_logs')
            ->leftJoin('users','activity_logs.user_id','=','users.id')
            ->select('activity_logs.*','users.name as user_name')
            ->orderByDesc('activity_logs.created_at')
            ->limit(10)
            ->get();

             $veterinaryRequests = VeterinaryRequest::with('user') // assuming you have a relation to farmer
        ->orderByDesc('created_at')
        ->limit(10)
        ->get();

        // Format the data for front-end
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalFarmers' => $totalFarmers,
                'totalSwine' => $totalSwine,
                'activeSwine' => $activeSwine,
                'deadSwine' => $deadSwine,
                'soldSwine' => $soldSwine,
            ],
            'charts' => [
                'purposeCounts' => $purposeCounts,
                'monthlyMortality' => $monthlyMortality,
                'barangayDistributionFarmers' => $barangayDistribution,
        'barangayDistributionSwine' => $swinePerBarangay,
            ],
            'recentActivities' => $recentActivities,
               'veterinaryRequests' => $veterinaryRequests, // pass to frontend 
        ]);
    }




    public function show(Request $request)
{
    $from = $request->query('from');
    $to = $request->query('to');
    $duration = $request->query('duration');
      $month = $request->query('month'); // optional month filter
    $year  = $request->query('year');  // optional year filter
    

    /**
     * Base filtered query
     */
    $baseQuery = Swine::query();

    $priceQuery = ListingSwine::query()
    ->with('listing') // eager load MarketplaceListing for price
    ->whereHas('listing', function($q) use ($request) {
        if ($request->price_unit_type) {
            $q->where('price_unit_type', $request->price_unit_type);
        }
    });


    // 🔹 Apply duration filter (Last N days)
    if ($duration) {
        $baseQuery->whereDate(
            'swine.birthdate',
            '>=',
            now()->subDays((int) $duration)
        );
    }

    // 🔹 Apply date range filter
    if ($from && $to) {
        $baseQuery->whereBetween('swine.birthdate', [
            $from . ' 00:00:00',
            $to . ' 23:59:59',
        ]);
    }

    // Optional: filter by month/year
if ($month) {
    $priceQuery->whereMonth('created_at', $month);
}

if ($year) {
    $priceQuery->whereYear('created_at', $year);
}



// Aggregate by month
$monthlyPrice = ListingSwine::query()
    ->join('marketplace_listings as listings', 'listing_swine.listing_id', '=', 'listings.id')
    ->selectRaw('
        YEAR(listings.created_at) as year,
        MONTH(listings.created_at) as month,
        listings.category,
        AVG(listings.price_per_unit) as avg_price
    ')
    ->when($request->price_unit_type, fn($q) => $q->where('listings.price_unit_type', $request->price_unit_type))
    ->when($month, fn($q) => $q->whereMonth('listings.created_at', $month))
    ->when($year, fn($q) => $q->whereYear('listings.created_at', $year))
    ->groupByRaw('YEAR(listings.created_at), MONTH(listings.created_at), listings.category')
    ->orderBy('month')
    ->get();


    /**
     * Stats
     */
    $stats = [
        'total'  => (clone $baseQuery)->count(),
        'dead'   => (clone $baseQuery)->where('status', 'dead')->count(),
        'sold'   => (clone $baseQuery)->where('status', 'sold')->count(),
        'active' => (clone $baseQuery)->where('status', 'active')->count(),
    ];

    /**
     * Monthly Mortality (filtered)
     */
    $monthlyMortality = (clone $baseQuery)
        ->where('status', 'dead')
        ->selectRaw('YEAR(birthdate) as year, MONTH(birthdate) as month, COUNT(*) as total')
        ->groupByRaw('YEAR(birthdate), MONTH(birthdate)')
        ->orderBy('year')
        ->orderBy('month')
        ->get();

    /**
     * Weight Trend (filtered)
     */
    $weightTrend = (clone $baseQuery)
        ->whereNotNull('weight')
        ->orderBy('birthdate')
        ->get(['birthdate', 'weight']);

    /**
     * Records table (filtered + paginated)
     */
    $records = (clone $baseQuery)
        ->latest()
        ->paginate(15)
        ->withQueryString();
        

      $ageFrom = $request->query('age_from', 4); // default 4 months
$ageTo   = $request->query('age_to', 6);   // default 6 months

// Filter by purpose and status
$forecastQuery = Swine::query()
    // ->whereIn('swine.purpose', ['slaughter', 'fattening', 'undecided'])
    ->whereIn('swine.status', ['active', 'available']);

// Optional duration or date filters
// if ($duration) {
//     $forecastQuery->whereDate('created_at', '>=', now()->subDays((int) $duration));
// }
// if ($from && $to) {
//     $forecastQuery->whereBetween('created_at', [$from . ' 00:00:00', $to . ' 23:59:59']);
// }

$today = Carbon::today();
$forecast = [];

for ($i = 0; $i < 6; $i++) {
    $monthStart = $today->copy()->addMonths($i)->startOfMonth();
    $monthEnd   = $today->copy()->addMonths($i)->endOfMonth();

    $birthdateFrom = $monthEnd->copy()->subMonths($ageTo)->startOfDay();
    $birthdateTo   = $monthStart->copy()->subMonths($ageFrom)->endOfDay();

    $rows = (clone $forecastQuery)
       ->whereBetween('swine.birthdate', [$birthdateFrom, $birthdateTo])
        ->join('users', 'swine.owner_id', '=', 'users.id')
        ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
        ->join('barangays', 'user_informations.barangay_id', '=', 'barangays.id')
        ->select(
            'barangays.name as barangay',
            DB::raw('COUNT(swine.id) as total')
        )
        ->groupBy('barangays.name')
        ->get();

    $barangayData = [];
    $total = 0;

    foreach ($rows as $row) {
        $barangayData[$row->barangay] = $row->total;
        $total += $row->total;
    }

    $forecast[] = [
        'month' => $monthStart->format('F Y'),
        'meat_ready' => $total,
        'barangays' => $barangayData,
        'description' =>
            "Active swine for slaughter/fattening aged {$ageFrom}-{$ageTo} months, grouped by barangay."
    ];
}


// 🔹 Prepare breed-wise production table
     $monthsOffset = (int) $request->query('offset', 0); // 0 = current 6 months

    $today = Carbon::today()->startOfMonth();
    $startMonth = $today->copy()->addMonths($monthsOffset);
    $columns = [];
    for ($i=0; $i<6; $i++) {
        $month = $startMonth->copy()->addMonths($i);
        $columns[] = $month->format('M Y');
    }

    // Get all breeds + distinct custom breeds
    $breeds = Breed::select('id','name')->get()->pluck('name')->toArray();

    $customBreeds = Swine::whereNotNull('cuztom_breed')
        ->distinct('cuztom_breed')
        ->pluck('cuztom_breed')
        ->toArray();

    $allBreeds = array_merge($breeds, $customBreeds);

    $breedProduction = [];

    foreach ($allBreeds as $breedName) {
        $row = ['breed' => $breedName];
        $total = 0;

        foreach ($columns as $col) {
            $start = Carbon::parse('first day of '.$col)->startOfDay();
            $end   = Carbon::parse('last day of '.$col)->endOfDay();

            $count = (clone $baseQuery)
                ->where(function($q) use ($breedName) {
                    $q->whereHas('breed', function($b) use ($breedName) {
                        $b->where('name', $breedName);
                    })->orWhere('cuztom_breed', $breedName);
                })
                ->whereBetween('birthdate', [$start, $end])
                ->count();

            $row[$col] = $count;
            $total += $count;
        }

        $row['total'] = $total;
        $breedProduction[] = $row;
    }

    /**
 * Total Swine Inventory by Farm Type (filtered)
 */
$totalInventoryByFarmType = (clone $baseQuery)
    ->where('swine.status', 'active') // only live swine
    ->join('users', 'swine.owner_id', '=', 'users.id')
    ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
    ->selectRaw("
        COALESCE(user_informations.farming_type, 'unknown') as farming_type,
        COUNT(swine.id) as total
    ")
    ->groupBy('user_informations.farming_type')
    ->get()
    ->map(function ($row) {
        return [
            'farming_type' => ucfirst($row->farming_type),
            'total' => (int) $row->total,
        ];
    });


$veterinaryQuery = VeterinaryRequest::query();

// Apply duration filter
if ($duration) {
    $veterinaryQuery->whereDate('created_at', '>=', now()->subDays((int) $duration));
}

// Apply date range filter
if ($from && $to) {
    $veterinaryQuery->whereBetween('created_at', [$from . ' 00:00:00', $to . ' 23:59:59']);
}

// Get total veterinary requests
$totalVetRequests = (clone $veterinaryQuery)->count();

// Get request type ranking
$requestTypeRanking = (clone $veterinaryQuery)
    ->selectRaw('request_type, COUNT(*) as total')
    ->groupBy('request_type')
    ->orderBy('total', 'DESC')
    ->get()
    ->map(function($item) use ($totalVetRequests) {
        return [
            'type' => $item->request_type,
            'total' => $item->total,
            'percentage' => $totalVetRequests > 0 
                ? round(($item->total / $totalVetRequests) * 100, 1) 
                : 0
        ];
    });



    return inertia('admin/productionData', [
        'stats' => $stats,
        'monthlyMortality' => $monthlyMortality,
        'weightTrend' => $weightTrend,
        'records' => $records,
         'forecast' => $forecast,
        'filters' => [
            'from' => $from,
            'to' => $to,
            'duration' => $duration,
              'age_from' => $ageFrom, // ✅ send back the selected age_from
        'age_to'   => $ageTo,   // ✅ send back the selected age_to
        ],
         'breedProduction' => $breedProduction,
        'breedColumns' => $columns,
        'offset' => $monthsOffset,
        'monthlyPrice' => $monthlyPrice, // ✅ new chart data
        'totalInventoryByFarmType' => $totalInventoryByFarmType,
         'vetRequests' => [
        'total' => $totalVetRequests,
        'ranking' => $requestTypeRanking,
    ],
    ]);
}



// public function export(Request $request)
// {
//     $from = $request->query('from');
//     $to = $request->query('to');
//     $duration = $request->query('duration');

//     $query = Swine::query();

//     // Apply filters
//     if ($duration) {
//         $query->whereDate('created_at', '>=', now()->subDays((int) $duration));
//         $title = "Swine Data for Last $duration Days";
//     } elseif ($from && $to) {
//         $query->whereBetween('created_at', [
//             $from . ' 00:00:00',
//             $to . ' 23:59:59',
//         ]);

//         $start = Carbon::parse($from)->format('F j, Y');
//         $end = Carbon::parse($to)->format('F j, Y');
//         $title = "Swine Data from $start - $end";
//     } else {
//         $title = "Swine Data (All Time)";
//     }

//     // CSV headers
//     $fileName = 'swine-production-' . now()->format('Ymd-His') . '.csv';
//     $headers = [
//         'Content-Type' => 'text/csv',
//         'Content-Disposition' => "attachment; filename=\"$fileName\"",
//     ];

//     $columns = ['ID', 'Tag Number', 'Farmer', 'Status', 'Weight', 'Purpose', 'Created At'];

//     $response = new StreamedResponse(function() use ($query, $columns, $title) {
//         $handle = fopen('php://output', 'w');

//         // Add title row
//         fputcsv($handle, [$title]);
//         // Empty row
//         fputcsv($handle, []);
//         // Column headers
//         fputcsv($handle, $columns);

//         $query->with('owner')->chunk(100, function($swines) use ($handle) {
//             foreach ($swines as $swine) {
//                 fputcsv($handle, [
//                     $swine->id,
//                     $swine->tag_number,
//                     $swine->owner->name ?? '-',
//                     $swine->status,
//                     $swine->weight,
//                     $swine->purpose,
//                     $swine->created_at,
//                 ]);
//             }
//         });

//         fclose($handle);
//     }, 200, $headers);

//     return $response;
// }

public function exportForecast(Request $request)
{
    $ageFrom = $request->query('age_from', 4);
    $ageTo   = $request->query('age_to', 6);

    // Filter by purpose and status
    $forecastQuery = Swine::query()
        // ->whereIn('swine.purpose', ['slaughter', 'fattening', 'undecided'])
        ->whereIn('swine.status', ['active', 'available']);

    $today = Carbon::today();

    $response = new StreamedResponse(function() use ($forecastQuery, $ageFrom, $ageTo, $today) {
        $handle = fopen('php://output', 'w');

        // CSV headers
        fputcsv($handle, [
            'Month', 
            'Barangay', 
            'Age (days)', 
            'Status', 
            'Purpose', 
            'Owner Name', 
            'Owner Contact'
        ]);

        // Loop over next 6 months
        for ($i = 0; $i < 6; $i++) {
            $monthStart = $today->copy()->addMonths($i)->startOfMonth();
            $monthEnd   = $today->copy()->addMonths($i)->endOfMonth();

            $birthdateFrom = $monthEnd->copy()->subMonths($ageTo)->startOfDay();
            $birthdateTo   = $monthStart->copy()->subMonths($ageFrom)->endOfDay();

            $swines = (clone $forecastQuery)
                ->whereBetween('swine.birthdate', [$birthdateFrom, $birthdateTo])
                ->join('users', 'swine.owner_id', '=', 'users.id')
                ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
                ->join('barangays', 'user_informations.barangay_id', '=', 'barangays.id')
                ->select(
                    'swine.birthdate',
                    'swine.status',
                    'swine.purpose',
                    'users.name as owner_name',
                    'user_informations.contact as owner_contact',
                    'barangays.name as barangay'
                )
                ->get();

            foreach ($swines as $swine) {
                $ageInDays = Carbon::parse($swine->birthdate)->diffInDays(Carbon::today());

                fputcsv($handle, [
                    $monthStart->format('F Y'), // Forecast month
                    $swine->barangay,
                    $ageInDays,
                    $swine->status,
                    $swine->purpose,
                    $swine->owner_name,
                    $swine->owner_contact,
                ]);
            }
        }

        fclose($handle);
    });

    $response->headers->set('Content-Type', 'text/csv');
    $response->headers->set('Content-Disposition', 'attachment; filename="food_security_forecast.csv"');

    return $response;
}

public function exportbreed(Request $request)
{
    $year = $request->query('year', date('Y')); // default current year
    $baseQuery = Swine::query()->whereIn('status', ['active','available']);

    $breeds = Breed::select('id','name')->get()->pluck('name')->toArray();
    $customBreeds = Swine::whereNotNull('cuztom_breed')
        ->distinct('cuztom_breed')
        ->pluck('cuztom_breed')
        ->toArray();
    $allBreeds = array_merge($breeds, $customBreeds);

    $columns = [];
    for ($m = 1; $m <= 12; $m++) {
        $columns[] = Carbon::createFromDate($year, $m, 1)->format('M');
    }

    $data = [];
    foreach ($allBreeds as $breedName) {
        $row = ['Breed' => $breedName];
        $total = 0;

        foreach ($columns as $index => $monthName) {
            $start = Carbon::create($year, $index + 1, 1)->startOfMonth();
            $end   = Carbon::create($year, $index + 1, 1)->endOfMonth();

            $count = (clone $baseQuery)
                ->where(function($q) use ($breedName) {
                    $q->whereHas('breed', function($b) use ($breedName) {
                        $b->where('name', $breedName);
                    })->orWhere('cuztom_breed', $breedName);
                })
                ->whereBetween('birthdate', [$start, $end])
                ->count();

            $row[$monthName] = $count;
            $total += $count;
        }

        $row['Total'] = $total;
        $data[] = $row;
    }

    // Convert to CSV
    $filename = "swine_production_{$year}.csv";
    $headers = ['Content-Type' => 'text/csv', 'Content-Disposition' => "attachment; filename=\"$filename\""];
    $callback = function() use ($data, $columns) {
        $file = fopen('php://output', 'w');
        fputcsv($file, array_merge(['Breed'], $columns, ['Total']));
        foreach ($data as $row) {
            fputcsv($file, array_merge([$row['Breed']], array_map(fn($col) => $row[$col], $columns), [$row['Total']]));
        }
        fclose($file);
    };
    return response()->stream($callback, 200, $headers);
}

public function exportCSVLast6Years()
{
    $baseQuery = Swine::query()->whereIn('status', ['active','available']);

    // Get last 6 years
    $years = collect(range(date('Y')-5, date('Y')))->reverse()->toArray();

    // Get all breeds + custom breeds
    $breeds = Breed::select('id','name')->get()->pluck('name')->toArray();
    $customBreeds = Swine::whereNotNull('cuztom_breed')
        ->distinct('cuztom_breed')
        ->pluck('cuztom_breed')
        ->toArray();
    $allBreeds = array_merge($breeds, $customBreeds);

    $data = [];
    foreach ($allBreeds as $breedName) {
        $row = ['Breed' => $breedName];
        foreach ($years as $year) {
            $start = Carbon::create($year, 1, 1)->startOfYear();
            $end   = Carbon::create($year, 12, 31)->endOfYear();

            $count = (clone $baseQuery)
                ->where(function($q) use ($breedName) {
                    $q->whereHas('breed', function($b) use ($breedName) {
                        $b->where('name', $breedName);
                    })->orWhere('cuztom_breed', $breedName);
                })
                ->whereBetween('birthdate', [$start, $end])
                ->count();

            $row[$year] = $count;
        }
        $data[] = $row;
    }

    $filename = "swine_production_last6years.csv";
    $headers = ['Content-Type' => 'text/csv', 'Content-Disposition' => "attachment; filename=\"$filename\""];
    $callback = function() use ($data, $years) {
        $file = fopen('php://output', 'w');
        fputcsv($file, array_merge(['Breed'], $years));
        foreach ($data as $row) {
            fputcsv($file, array_merge([$row['Breed']], array_map(fn($year) => $row[$year], $years)));
        }
        fclose($file);
    };

    return response()->stream($callback, 200, $headers);
}

public function exportCSV(Request $request)
{
    $from = $request->query('from');
    $to = $request->query('to');
    $duration = $request->query('duration');
    $priceUnitType = $request->query('price_unit_type');

    // 1️⃣ ListingSwine + Listing data
    $listingQuery = ListingSwine::query()
        ->with('listing')
        ->join('marketplace_listings as listings', 'listing_swine.listing_id', '=', 'listings.id')
        ->select(
            'listing_swine.id',
            'listing_swine.swine_id',
            'listing_swine.status as listing_swine_status',
            'listings.title',
            'listings.category',
            'listings.price_per_unit',
            'listings.price_unit_type',
            'listings.created_at as listing_created_at'
        )
        ->when($priceUnitType, fn($q) => $q->where('listings.price_unit_type', $priceUnitType));

    if ($duration) {
        $listingQuery->whereDate('listings.created_at', '>=', now()->subDays((int)$duration));
    }
    if ($from && $to) {
        $listingQuery->whereBetween('listings.created_at', [$from.' 00:00:00', $to.' 23:59:59']);
    }

    $listings = $listingQuery->get();

    // 2️⃣ Total Inventory by Farm Type
    $inventoryQuery = Swine::query()
        ->where('status', 'active') // only live swine
        ->join('users', 'swine.owner_id', '=', 'users.id')
        ->join('user_informations', 'users.id', '=', 'user_informations.user_id')
        ->selectRaw("COALESCE(user_informations.farming_type, 'unknown') as farming_type, COUNT(swine.id) as total");

    // Apply same timeline filter
    if ($duration) {
        $inventoryQuery->whereDate('swine.birthdate', '>=', now()->subDays((int)$duration));
    }
    if ($from && $to) {
        $inventoryQuery->whereBetween('swine.birthdate', [$from.' 00:00:00', $to.' 23:59:59']);
    }

    $inventoryQuery->groupBy('user_informations.farming_type');
    $inventory = $inventoryQuery->get();

    $filename = 'swine_production_' . now()->format('Ymd_His') . '.csv';

    $headers = [
        'Content-Type' => 'text/csv',
        'Content-Disposition' => "attachment; filename={$filename}",
    ];

    $callback = function() use ($listings, $inventory) {
        $file = fopen('php://output', 'w');

        // --- Section 1: Listings ---
        fputcsv($file, ['Listing Data']);
        fputcsv($file, ['ID', 'Swine ID', 'Swine Status', 'Title', 'Category', 'Price per Unit', 'Price Unit Type', 'Listing Date']);
        foreach ($listings as $row) {
            fputcsv($file, [
                $row->id,
                $row->swine_id,
                $row->listing_swine_status,
                $row->title,
                $row->category,
                $row->price_per_unit,
                $row->price_unit_type,
                $row->listing_created_at,
            ]);
        }

        fputcsv($file, []); // empty line

        // --- Section 2: Total Inventory by Farm Type ---
        fputcsv($file, ['Total Swine Inventory by Farm Type']);
        fputcsv($file, ['Farming Type', 'Total']);
        foreach ($inventory as $row) {
            fputcsv($file, [
                ucfirst($row->farming_type),
                $row->total,
            ]);
        }

        fclose($file);
    };

    return response()->stream($callback, 200, $headers);
}



}
