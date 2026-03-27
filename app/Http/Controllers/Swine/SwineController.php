<?php

namespace App\Http\Controllers\Swine;
use App\Http\Controllers\Controller;
use App\Models\DirectSale;
use App\Models\Swine\Swine;
use App\Models\Swine\Breed;
use App\Models\Swine\SwineTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; // <-- add this at the top of your controller
use Illuminate\Support\Facades\Log;
use App\Models\Swine\SwineGroup;
use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Expense;
use Illuminate\Validation\Rule;

use App\Models\Marketplace\MarketplaceTransaction;

use App\Models\Swine\SwineStageSetting; // add this at top
use Illuminate\Support\Facades\DB;

class SwineController extends Controller
{
    /**
     * Display active swine for the logged-in farmer.
     */
 public function index()
{ 
    // Eager load the blog post relation for events that have blog_id
    $events = Event::with('blogPost')->get();
    
    // Transform events to include blog_slug
    $transformedEvents = $events->map(function($event) {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'date' => $event->date instanceof \DateTime ? $event->date->format('Y-m-d') : $event->date,
            'type' => $event->type,
            'start_time' => $event->start_time instanceof \DateTime ? $event->start_time->format('H:i:s') : $event->start_time,
            'end_time' => $event->end_time instanceof \DateTime ? $event->end_time->format('H:i:s') : $event->end_time,
            'description' => $event->description,
            'blog_slug' => $event->blogPost ? $event->blogPost->slug : null, // Add blog slug
            'blog_id' => $event->blog_id,
        ];
    });
    
    $schedules = Schedule::where('user_id', auth()->id())->get();
    
    $swine = Swine::with('breed','groups',)
        ->where('owner_id', auth()->id())
        ->latest()
        ->get()
        ->append(['category_readable', 'purpose_readable']);

    $breeds = Breed::all(['id', 'name']);
    $groups = SwineGroup::where('owner_id', auth()->id())->get();

    // ✅ For each swine, attach its assigned and available groups
    $swineWithGroups = $swine->map(function($s) use ($groups) {
        $assigned = $s->groups;
        $available = $groups->whereNotIn('id', $assigned->pluck('id'));

        $s->assignedGroups = $assigned->values();
        $s->availableGroups = $available->values();
        return $s;
    });
    
    return Inertia::render('swine/index', [
        'breeds' => $breeds,
        'groups' => $groups,
        'swine' => $swineWithGroups,
        'events' => $transformedEvents, // Use transformed events instead of raw events
        'schedules' => $schedules,
    ]);
}

    /**
     * Show form for creating swine.
     */
  public function create()
{
  
    $breeds = \App\Models\Swine\Breed::all();
    
    return Inertia::render('swine/create', [
        'breeds' => $breeds,
        'today' => now()->toDateString(), // Server time in Asia/Manila
       
    ]);
}



    /**
     * Store a new swine + log transaction.
     */
   public function store(Request $request)
{
    $data = $request->validate([
        'tag_number' => 'nullable|string|max:50|unique:swine,tag_number',
        'sex' => 'required|in:male,female',
        'birthdate' => 'required|date',
        'breed_id' => 'nullable|exists:breeds,id|required_without:cuztom_breed',
        'cuztom_breed' => 'nullable|string|max:255|required_without:breed_id',
        'category' => 'nullable|in:barrow,gilt,boar,sow,piglet',
        'purpose' => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
        'weight' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
    ], [
        'breed_id.required_without' => 'Please select or enter a breed.',
        'cuztom_breed.required_without' => 'Please select or enter a breed.',
    ]);

    $data['owner_id'] = Auth::id();
    $data['stage'] = $this->calculateStage($data['birthdate'], $data['purpose']);
    $data['status'] = 'active';
    $data['tag_number'] = $data['tag_number'] ?: null;

    return DB::transaction(function () use ($data) {
        $swine = Swine::create($data);

        SwineTransaction::create([
            'swine_id' => $swine->id,
            'to_owner_id' => Auth::id(),
            'transaction_type' => 'registration',
            'notes' => 'Initial swine registration',
            'performed_by_id' => Auth::id(),
        ]);

        return redirect()
            ->route('swine.create')
            ->with('success', 'Swine registered successfully.');
    });
}


    /**
     * Show edit form.
     */
    public function edit(Swine $swine)
    {
        $this->authorize('update', $swine);

          $breeds = Breed::all(['id', 'name']); // fetch breeds list
    return Inertia::render('Swine/Edit', [
        'swine' => $swine,
        'breeds' => $breeds,
    ]);
    }

    /**
     * Update swine info.
     */
    public function update(Request $request, Swine $swine)
    {
       

        $data = $request->validate([
          'tag_number' => [
    'nullable',
    'string',
    'max:50',
    Rule::unique('swine', 'tag_number')
        ->where(function ($query) {
            return $query->where('owner_id', Auth::id());
        })
        ->ignore($swine->id), // 🔥 THIS IS THE FIX
],
   'sex' => 'required|in:male,female',
            'birthdate' => 'nullable|date',
            'breed_id' => 'nullable|exists:breeds,id',
            'cuztom_breed' => 'nullable|string|max:255',
            'category' => 'nullable|in:barrow,gilt,boar,sow,piglet',
            'purpose' => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
            'weight' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $data['stage'] = $this->calculateStage($data['birthdate'], $data['purpose']);
        $breeds = Breed::all(); // fetch all from breeds table
        $swine->update($data);

      return back()->with('success', 'Swine updated successfully.');

    }

    /**
     * Soft delete (move to archive).
     */
    public function destroy(Swine $swine)
    {
       

        $swine->update(['status' => 'inactive']);
        $swine->delete();

        SwineTransaction::create([
            'swine_id' => $swine->id,
            'from_owner_id' => $swine->owner_id,
            'to_owner_id' => null,
            'transaction_type' => 'deactivation',
            'notes' => 'Swine deactivated by farmer',
            'performed_by_id' => Auth::id(),
        ]);

        return redirect()->route('swine.index')->with('success', 'Swine moved to archive.');
    }

    public function multidelete(Request $request)
{
    $swineIds = $request->input('swine_ids') ?: [$request->input('swine_id')];

    if (empty($swineIds)) {
        return redirect()->back()->with('error', 'No swine selected.');
    }

    $swines = Swine::whereIn('id', $swineIds)->get();

    foreach ($swines as $swine) {
        $swine->update(['status' => 'inactive']);
        $swine->delete();

        SwineTransaction::create([
            'swine_id' => $swine->id,
            'from_owner_id' => $swine->owner_id,
            'to_owner_id' => null,
            'transaction_type' => 'deactivation',
            'notes' => 'Swine deactivated by farmer',
            'performed_by_id' => Auth::id(),
        ]);
    }

    return redirect()->route('swine.index')->with('success', count($swines) . ' swine(s) deleted.');
}


    /**
     * Archive/History view.
     */
    public function archive()
    {
        $swine = Swine::where('owner_id', Auth::id())
            ->whereIn('status', ['sold', 'dead', 'slaughtered', 'inactive'])
            ->with('breed')
            ->latest()
            ->paginate(10);

        return inertia('Swine/Archive', [
            'swine' => $swine
        ]);
    }

    /**
     * Helper: Calculate stage from birthdate + purpose.
     */
   // File: app/Http/Controllers/SwineController.php

private function calculateStage($birthdate, $purpose)
{
    $birthdate = Carbon::parse($birthdate)->timezone('Asia/Manila');
$today = Carbon::now('Asia/Manila');
$ageInDays = $birthdate->diffInDays($today);

    $userId = Auth::id();

    $settings = \App\Models\Swine\SwineStageSetting::where('user_id', $userId)->first();

    // Defaults if no settings
    $preWeaningMax = $settings->pre_weaning_max ?? 28;
    $postWeaningMax = $settings->post_weaning_max ?? 70;
    $growerMax = $settings->grower_max ?? 150;
    $breederMin = $settings->breeder_min ?? 150;

    // Breeder logic
    if (in_array($purpose, ['breeding_sow', 'breeding_boar']) && $ageInDays >= $breederMin) {
        return 'Breeder';
    }

    // ✅ Fixed range comparisons
    if ($ageInDays <= $preWeaningMax) {
        return 'Pre-Weaning';
    } elseif ($ageInDays <= $postWeaningMax) {
        return 'Post-Weaning';
    } elseif ($ageInDays <= $growerMax) {
        return 'Grower';
    } else {
        return 'Finisher';
    }
}

//store batch swine
public function storebatch(Request $request)
{
    $data = $request->validate([
        'total_swine' => 'required|integer|min:1',
        'male_count' => 'required|integer|min:0',
        'female_count' => 'required|integer|min:0',
        'birthdate' => 'required|date',
        'breed_id' => 'nullable|exists:breeds,id|required_without:cuztom_breed',
        'cuztom_breed' => 'nullable|string|max:255|required_without:breed_id',
        'category' => 'nullable|in:barrow,gilt,boar,sow,piglet',
        'purpose' => 'required|in:fattening,slaughter,sale_as_piglet,breeding_sow,breeding_boar,undecided',
        'weight' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
        'tag_numbers' => 'array',
        'tag_numbers.*' => 'nullable|string|max:50|unique:swine,tag_number',
    ], [
        'breed_id.required_without' => 'Please select or enter a breed.',
        'cuztom_breed.required_without' => 'Please select or enter a breed.',
    ]);

    if ($data['male_count'] + $data['female_count'] != $data['total_swine']) {
        return back()->withErrors(['male_count' => 'The total of male and female counts must equal the total swine count.']);
    }

    $common = [
        'owner_id' => Auth::id(),
        'birthdate' => $data['birthdate'],
        'breed_id' => $data['breed_id'] ?? null,
        'cuztom_breed' => $data['cuztom_breed'] ?? null,
        'category' => $data['category'] ?? 'piglet',
        'purpose' => $data['purpose'],
        'weight' => $data['weight'] ?? null,
        'description' => $data['description'] ?? null,
        'status' => 'active',
    ];

    DB::transaction(function () use ($data, $common) {
        $tagNumbers = $data['tag_numbers'] ?? [];

        // Register males
        for ($i = 0; $i < $data['male_count']; $i++) {
            $swine = Swine::create(array_merge($common, [
                'sex' => 'male',
                'tag_number' => $tagNumbers[$i] ?? Str::upper(Str::random(6)),
                'stage' => $this->calculateStage($common['birthdate'], $common['purpose']),
            ]));

            SwineTransaction::create([
                'swine_id' => $swine->id,
                'to_owner_id' => Auth::id(),
                'transaction_type' => 'registration',
                'notes' => 'Initial swine registration',
                'performed_by_id' => Auth::id(),
            ]);
        }

        // Register females
        for ($i = 0; $i < $data['female_count']; $i++) {
            $swine = Swine::create(array_merge($common, [
                'sex' => 'female',
                'tag_number' => $tagNumbers[$data['male_count'] + $i] ?? Str::upper(Str::random(6)),
                'stage' => $this->calculateStage($common['birthdate'], $common['purpose']),
            ]));

            SwineTransaction::create([
                'swine_id' => $swine->id,
                'to_owner_id' => Auth::id(),
                'transaction_type' => 'registration',
                'notes' => 'Initial swine registration',
                'performed_by_id' => Auth::id(),
            ]);
        }
    });

    return redirect()->route('swine.create')->with('success', 'Swine registered successfully.');
}

public function show($id)
{
    $swine = Swine::with([
        'owner.userInformation',
        'breed',
        'transactions',
        'groups',
        'listings.seller.userInformation'
    ])->findOrFail($id);

    // 🔥 Get ENUM values directly from DB
    $categoryEnum = DB::select("SHOW COLUMNS FROM swine LIKE 'category'")[0]->Type;
    $purposeEnum = DB::select("SHOW COLUMNS FROM swine LIKE 'purpose'")[0]->Type;
    $sexEnum = DB::select("SHOW COLUMNS FROM swine LIKE 'sex'")[0]->Type;

    // Extract values from enum('a','b','c')
    $extract = function ($enum) {
        preg_match('/^enum\((.*)\)$/', $enum, $matches);
        return array_map(
            fn($value) => trim($value, "'"),
            explode(',', $matches[1])
        );
    };

    return Inertia::render('swine/eachSwine', [
        'swine' => $swine,
        'enums' => [
            'category' => $extract($categoryEnum),
            'purpose' => $extract($purposeEnum),
            'sex' => $extract($sexEnum),
        ],
        'breeds' => \App\Models\Swine\Breed::select('id','name')->get(),
    ]);
}



public function update_swine(Request $request, $id)
{
    $swine = Swine::findOrFail($id);
    
    // Manually check for duplicates
    $existing = Swine::where('tag_number', $request->tag_number)
        ->where('id', '!=', $id)
        ->whereNull('deleted_at')
        ->first();
    
    if ($existing) {
        return back()->withErrors([
            'tag_number' => 'This tag number is already used by swine #' . $existing->id . ' (owner: ' . $existing->owner_id . ')'
        ])->withInput();
    }

    $validated = $request->validate([
        'tag_number' => 'required|string|max:255',
        'sex' => 'required|in:male,female',
        'birthdate' => 'required|date',
        'weight' => 'nullable|numeric',
        'stage' => 'nullable|string',
        'purpose' => 'nullable|string',
        'category' => 'nullable|string',
        'description' => 'nullable|string',
        'breed_id' => 'nullable|exists:breeds,id',
        'cuztom_breed' => 'nullable|string|max:255',
    ]);

    $swine->update($validated);

    return redirect()->route('swine.show', $swine->id)
        ->with('success', 'Swine updated successfully');
}

public function updateListingSwine(Request $request, $swine_id, $listing_id)
{
    $swine = Swine::findOrFail($swine_id);

    $listing = $swine->listings()->findOrFail($listing_id);

    $validated = $request->validate([
        'scaled_weight' => 'nullable|numeric|required_without:estimated_weight',
          'estimated_weight' => [
            'nullable',
            'required_without:scaled_weight',
            'regex:/^\d+(-\d+)?$/', // allows 50 or 50-60
        ],
        'remarks' => 'nullable|string|max:255',
    ]);

    $swine->listings()->updateExistingPivot($listing_id, $validated);

    return redirect()->back()->with('success', 'Listing pivot updated successfully');
}

public function dashboard(Request $request)
{
    $userId = Auth::id();
    
    // Get total expenses
    $totalExpenses = Expense::where('owner_id', $userId)
        ->sum('amount');
    
    // Get revenue from marketplace transactions (total for all swine)
  $marketplaceRevenue = MarketplaceTransaction::where('seller_id', $userId)
    ->whereIn('state', ['completed', 'done'])
    ->selectRaw('
        SUM(amount) as total_revenue,
        COUNT(*) as total_transactions
    ')
    ->first();
    
    // Get revenue from direct sales
    $directSaleRevenue = DirectSale::where('farmer_id', $userId)
        ->selectRaw('
            SUM(total_amount) as total_revenue,
            COUNT(*) as total_transactions
        ')
        ->first();
    
    // Combine revenues
    $totalRevenue = ($marketplaceRevenue->total_revenue ?? 0) + ($directSaleRevenue->total_revenue ?? 0);
    $totalTransactions = ($marketplaceRevenue->total_transactions ?? 0) + ($directSaleRevenue->total_transactions ?? 0);
    
    // Get recent data for activity feed
    $recentExpenses = Expense::where('owner_id', $userId)
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get();
    
    $recentMarketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
        ->with(['listing', 'buyer'])
        ->whereIn('state', ['completed', 'done'])
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get();
    
    $recentDirectSales = DirectSale::where('farmer_id', $userId)
        ->with(['swine'])
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get();
    
    // Get monthly summary for chart
    $year = $request->input('year', now()->year);
    $monthlySummary = $this->getMonthlySummary($userId, $year);
        
    // Get expense breakdown by category
    $expenseByCategory = Expense::where('owner_id', $userId)
        ->selectRaw('category, SUM(amount) as total')
        ->groupBy('category')
        ->get()
        ->mapWithKeys(fn ($item) => [
            $item->category => (float) $item->total
        ])
        ->toArray();

    return Inertia::render('swinemanagement', [
        'financialStats' => [
            'totalExpenses' => (float) $totalExpenses,
            'totalRevenue' => (float) $totalRevenue,
            'totalProfit' => (float) ($totalRevenue - $totalExpenses),
            'totalTransactions' => (int) $totalTransactions,
            'marketplaceRevenue' => (float) ($marketplaceRevenue->total_revenue ?? 0),
            'directSaleRevenue' => (float) ($directSaleRevenue->total_revenue ?? 0),
            'marketplaceTransactions' => (int) ($marketplaceRevenue->total_transactions ?? 0),
            'directSales' => (int) ($directSaleRevenue->total_transactions ?? 0),
        ],
        'selectedYear' => $year,
        'monthlySummary' => $monthlySummary,
        'expenseByCategory' => $expenseByCategory,
        'recentExpenses' => $recentExpenses,
        'recentMarketplaceTransactions' => $recentMarketplaceTransactions,
        'recentDirectSales' => $recentDirectSales,
    ]);
}



private function getMonthlySummary($userId, $year)
{
    $monthlyExpenses = Expense::where('owner_id', $userId)
        ->whereYear('date', $year)
        ->selectRaw('MONTH(date) as month, SUM(amount) as total')
        ->groupBy('month')
        ->pluck('total', 'month')
        ->toArray();

    // Marketplace revenue by month - use amount directly (not amount * quantity)
    $monthlyMarketplaceRevenue = MarketplaceTransaction::where('seller_id', $userId)
        ->whereIn('state', ['completed', 'done'])
        ->whereYear('transaction_date', $year)
        ->selectRaw('MONTH(transaction_date) as month, SUM(amount) as total') // ✅ Just SUM(amount)
        ->groupBy('month')
        ->pluck('total', 'month')
        ->toArray();

    // Direct sale revenue by month
    $monthlyDirectSaleRevenue = DirectSale::where('farmer_id', $userId)
        ->whereYear('sold_at', $year)
        ->selectRaw('MONTH(sold_at) as month, SUM(total_amount) as total')
        ->groupBy('month')
        ->pluck('total', 'month')
        ->toArray();

    $summary = [];

    for ($month = 1; $month <= 12; $month++) {
        $marketplaceRev = (float) ($monthlyMarketplaceRevenue[$month] ?? 0);
        $directSaleRev = (float) ($monthlyDirectSaleRevenue[$month] ?? 0);
        $totalRevenue = $marketplaceRev + $directSaleRev;
        $expenses = (float) ($monthlyExpenses[$month] ?? 0);
        
        $summary[] = [
            'month' => Carbon::create()->month($month)->format('M'),
            'expenses' => $expenses,
            'marketplace_revenue' => $marketplaceRev,
            'direct_sale_revenue' => $directSaleRev,
            'total_revenue' => $totalRevenue,
            'profit' => $totalRevenue - $expenses,
        ];
    }

    return $summary;
}


public function financialPerformance(Request $request)
{
    $userId = Auth::id();
    $viewMode = $request->input('view', 'individual');
    $selectedId = $request->input('id', null);
    $dateRange = $request->input('date_range', 'all');
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');

    // Base query builder for date filtering
    $dateFilter = function ($query) use ($dateRange, $startDate, $endDate) {
        switch ($dateRange) {
            case 'this_month':
                return $query->whereMonth('created_at', now()->month)
                             ->whereYear('created_at', now()->year);
            case 'this_year':
                return $query->whereYear('created_at', now()->year);
            case 'custom':
                if ($startDate && $endDate) {
                    return $query->whereBetween('created_at', [$startDate, $endDate]);
                }
                return $query;
            default:
                return $query;
        }
    };

    if ($viewMode === 'individual') {
        // Get all swine for the user for the dropdown
        $allSwine = Swine::where('owner_id', $userId)
            ->with('groups')
            ->select('id', 'tag_number', 'sex', 'birthdate', 'breed_id', 'cuztom_breed', 
                     'category', 'purpose', 'stage', 'status', 'weight', 'description')
            ->orderBy('tag_number')
            ->get()
            ->map(function ($swine) {
                return [
                    'id' => $swine->id,
                    'tag_number' => $swine->tag_number,
                    'category' => $swine->category_readable ?? 'Not Set',
                    'purpose' => $swine->purpose_readable ?? 'Not Set',
                    'stage' => $swine->stage_readable ?? 'Not Set',
                    'status' => $swine->status ?? 'unknown',
                    'birthdate' => $swine->birthdate,
                    'age_in_days' => $swine->age_in_days ? (int) $swine->age_in_days : 0,
                    'breed' => $swine->breed_name ?? 'Unknown',
                    'groups' => $swine->groups->map(function ($group) {
                        return [
                            'id' => $group->id,
                            'name' => $group->name,
                        ];
                    }),
                ];
            });
        
        $selectedSwine = null;
        $financialData = null;

        if ($selectedId) {
            $selectedSwine = Swine::with(['breed', 'groups'])
                ->where('owner_id', $userId)
                ->find($selectedId);

            if ($selectedSwine) {
                // Get expenses for this specific swine
                $expenses = Expense::where('owner_id', $userId)
                    ->whereHas('swineExpenses', function ($q) use ($selectedId) {
                        $q->where('swine_id', $selectedId);
                    })
                    ->when($dateRange !== 'all', $dateFilter)
                    ->get();

                $totalExpenses = $expenses->sum(function ($expense) use ($selectedId) {
                    $swineExpense = $expense->swineExpenses()
                        ->where('swine_id', $selectedId)
                        ->first();
                    return $swineExpense ? $swineExpense->individual_share : 0;
                });

                // Get revenue from direct sales for this swine
                $directSales = DirectSale::where('farmer_id', $userId)
                    ->where('swine_id', $selectedId)
                    ->when($dateRange !== 'all', $dateFilter)
                    ->get();

                $directSaleRevenue = $directSales->sum('total_amount');
                $directSaleCount = $directSales->count();

                // ✅ FIXED: Get marketplace revenue using final_amount from swine_requests
                $marketplaceRevenue = 0;
                $marketplaceCount = 0;
                
                $marketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
                    ->whereIn('state', ['completed', 'done'])
                    ->whereHas('swineRequest.listingSwine', function ($q) use ($selectedId) {
                        $q->where('swine_id', $selectedId);
                    })
                    ->with(['swineRequest' => function($q) use ($selectedId) {
                        $q->whereHas('listingSwine', function($sq) use ($selectedId) {
                            $sq->where('swine_id', $selectedId);
                        });
                    }])
                    ->when($dateRange !== 'all', $dateFilter)
                    ->get();

                foreach ($marketplaceTransactions as $transaction) {
                    foreach ($transaction->swineRequest as $request) {
                        // Only count if this request is for the selected swine
                        if ($request->listingSwine && $request->listingSwine->swine_id == $selectedId) {
                            $marketplaceRevenue += $request->final_amount ?? 0;
                            $marketplaceCount++;
                        }
                    }
                }

                $totalRevenue = $directSaleRevenue + $marketplaceRevenue;
                $totalProfit = $totalRevenue - $totalExpenses;

                // Expense breakdown by category
                $expenseByCategory = [];
                foreach ($expenses as $expense) {
                    $swineExpense = $expense->swineExpenses()
                        ->where('swine_id', $selectedId)
                        ->first();
                    
                    if ($swineExpense) {
                        $category = $expense->category;
                        if (!isset($expenseByCategory[$category])) {
                            $expenseByCategory[$category] = 0;
                        }
                        $expenseByCategory[$category] += $swineExpense->individual_share;
                    }
                }

                // Monthly summary for charts
                $monthlySummary = $this->getSwineMonthlySummary($userId, $selectedId, $dateRange, $startDate, $endDate);

                $financialData = [
                    'totalExpenses' => $totalExpenses,
                    'totalRevenue' => $totalRevenue,
                    'totalProfit' => $totalProfit,
                    'directSaleRevenue' => $directSaleRevenue,
                    'marketplaceRevenue' => $marketplaceRevenue,
                    'directSaleCount' => $directSaleCount,
                    'marketplaceCount' => $marketplaceCount,
                    'expenseByCategory' => $expenseByCategory,
                    'monthlySummary' => $monthlySummary,
                    'recentExpenses' => $expenses->take(5),
                    'recentDirectSales' => $directSales->take(5),
                    'recentMarketplaceTransactions' => $marketplaceTransactions->take(5),
                ];
            }
        }

        return Inertia::render('swine-financial-performance', [
            'viewMode' => $viewMode,
            'allSwine' => $allSwine,
            'selectedSwine' => $selectedSwine ? [
                'id' => $selectedSwine->id,
                'tag_number' => $selectedSwine->tag_number,
                'category' => $selectedSwine->category_readable,
                'purpose' => $selectedSwine->purpose_readable,
                'stage' => $selectedSwine->stage_readable,
                'status' => $selectedSwine->status,
                'birthdate' => $selectedSwine->birthdate,
                'age_in_days' => $selectedSwine->age_in_days,
                'breed' => $selectedSwine->breed_name,
                'groups' => $selectedSwine->groups->map(function ($group) {
                    return [
                        'id' => $group->id,
                        'name' => $group->name,
                    ];
                }),
            ] : null,
            'financialData' => $financialData,
            'dateRange' => $dateRange,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
   } else {
    // Group view mode
    $allGroups = SwineGroup::where('owner_id', $userId)
        ->withCount('members')
        ->orderBy('name')
        ->get();

    $selectedGroup = null;
    $groupFinancialData = null;

    if ($selectedId) {
        $selectedGroup = SwineGroup::with(['swine'])
            ->where('owner_id', $userId)
            ->find($selectedId);

        if ($selectedGroup) {
            $swineIds = $selectedGroup->swine->pluck('id')->toArray();

            // Get expenses for all swine in the group
            $expenses = Expense::where('owner_id', $userId)
                ->whereHas('swineExpenses', function ($q) use ($swineIds) {
                    $q->whereIn('swine_id', $swineIds);
                })
                ->when($dateRange !== 'all', $dateFilter)
                ->with(['swineExpenses' => function ($q) use ($swineIds) {
                    $q->whereIn('swine_id', $swineIds);
                }])
                ->get();

            $totalExpenses = 0;
            $expenseByCategory = [];

            foreach ($expenses as $expense) {
                foreach ($expense->swineExpenses as $swineExpense) {
                    if (in_array($swineExpense->swine_id, $swineIds)) {
                        $totalExpenses += $swineExpense->individual_share;
                        
                        $category = $expense->category;
                        if (!isset($expenseByCategory[$category])) {
                            $expenseByCategory[$category] = 0;
                        }
                        $expenseByCategory[$category] += $swineExpense->individual_share;
                    }
                }
            }

            // Get direct sales for swine in group
            $directSales = DirectSale::where('farmer_id', $userId)
                ->whereIn('swine_id', $swineIds)
                ->when($dateRange !== 'all', $dateFilter)
                ->get();

            $directSaleRevenue = $directSales->sum('total_amount');
            $directSaleCount = $directSales->count();

            // ✅ FIXED: Get marketplace transactions using final_amount from swine_requests
            $marketplaceRevenue = 0;
            $marketplaceCount = 0;
            
            $marketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
                ->whereIn('state', ['completed', 'done'])
                ->whereHas('swineRequest.listingSwine', function ($q) use ($swineIds) {
                    $q->whereIn('swine_id', $swineIds);
                })
                ->with(['swineRequest' => function($q) use ($swineIds) {
                    $q->whereHas('listingSwine', function($sq) use ($swineIds) {
                        $sq->whereIn('swine_id', $swineIds);
                    });
                }])
                ->when($dateRange !== 'all', $dateFilter)
                ->get();

            // Create a map to track revenue per swine for individual performance
            $swineMarketplaceRevenue = [];
            foreach ($swineIds as $id) {
                $swineMarketplaceRevenue[$id] = 0;
            }

            foreach ($marketplaceTransactions as $transaction) {
                foreach ($transaction->swineRequest as $request) {
                    if ($request->listingSwine && in_array($request->listingSwine->swine_id, $swineIds)) {
                        $amount = $request->final_amount ?? 0;
                        $marketplaceRevenue += $amount;
                        $marketplaceCount++;
                        
                        // Track per-swine revenue
                        $swineId = $request->listingSwine->swine_id;
                        if (isset($swineMarketplaceRevenue[$swineId])) {
                            $swineMarketplaceRevenue[$swineId] += $amount;
                        }
                    }
                }
            }

            $totalRevenue = $directSaleRevenue + $marketplaceRevenue;
            $totalProfit = $totalRevenue - $totalExpenses;

            // ✅ FIXED: Get individual swine performance within group using final_amount
            $individualPerformance = [];
            foreach ($swineIds as $swineId) {
                $swine = Swine::find($swineId);
                
                // Expenses for this swine
                $swineExpenses = $expenses->filter(function ($expense) use ($swineId) {
                    return $expense->swineExpenses->contains('swine_id', $swineId);
                })->sum(function ($expense) use ($swineId) {
                    $se = $expense->swineExpenses->firstWhere('swine_id', $swineId);
                    return $se ? $se->individual_share : 0;
                });

                // Revenue for this swine
                $swineDirectSales = $directSales->where('swine_id', $swineId)->sum('total_amount');
                $swineMarketplace = $swineMarketplaceRevenue[$swineId] ?? 0;

                $swineRevenue = $swineDirectSales + $swineMarketplace;

                $individualPerformance[] = [
                    'swine_id' => $swineId,
                    'tag_number' => $swine->tag_number,
                    'expenses' => $swineExpenses,
                    'revenue' => $swineRevenue,
                    'profit' => $swineRevenue - $swineExpenses,
                ];
            }

            // Monthly summary for group
            $monthlySummary = $this->getGroupMonthlySummary($userId, $swineIds, $dateRange, $startDate, $endDate);

            $groupFinancialData = [
                'totalExpenses' => $totalExpenses,
                'totalRevenue' => $totalRevenue,
                'totalProfit' => $totalProfit,
                'directSaleRevenue' => $directSaleRevenue,
                'marketplaceRevenue' => $marketplaceRevenue,
                'directSaleCount' => $directSaleCount,
                'marketplaceCount' => $marketplaceCount,
                'expenseByCategory' => $expenseByCategory,
                'monthlySummary' => $monthlySummary,
                'individualPerformance' => $individualPerformance,
                'swineCount' => count($swineIds),
                'recentExpenses' => $expenses->take(5),
                'recentDirectSales' => $directSales->take(5),
                'recentMarketplaceTransactions' => $marketplaceTransactions->take(5),
            ];
        }
    }

    return Inertia::render('swine-financial-performance', [
        'viewMode' => $viewMode,
        'allGroups' => $allGroups,
        'selectedGroup' => $selectedGroup ? [
            'id' => $selectedGroup->id,
            'name' => $selectedGroup->name,
            'description' => $selectedGroup->description,
            'group_type' => $selectedGroup->group_type,
            'members_count' => $selectedGroup->members_count,
        ] : null,
        'financialData' => $groupFinancialData,
        'dateRange' => $dateRange,
        'startDate' => $startDate,
        'endDate' => $endDate,
    ]);
}
}

/**
 * Get monthly summary for a specific swine
 */
private function getSwineMonthlySummary($userId, $swineId, $dateRange, $startDate, $endDate)
{
    $months = [];
    $year = now()->year;
    
    // Determine date range for query
    $queryStartDate = $startDate;
    $queryEndDate = $endDate;
    
    if ($dateRange === 'this_year') {
        $queryStartDate = now()->startOfYear()->toDateString();
        $queryEndDate = now()->endOfYear()->toDateString();
    } elseif ($dateRange === 'this_month') {
        $queryStartDate = now()->startOfMonth()->toDateString();
        $queryEndDate = now()->endOfMonth()->toDateString();
    } elseif ($dateRange === 'all') {
        $queryStartDate = null;
        $queryEndDate = null;
    }

    // Get all months in range
    if ($queryStartDate && $queryEndDate) {
        $start = \Carbon\Carbon::parse($queryStartDate);
        $end = \Carbon\Carbon::parse($queryEndDate);
        
        while ($start <= $end) {
            $monthKey = $start->format('Y-m');
            $months[$monthKey] = [
                'month' => $start->format('M Y'),
                'expenses' => 0,
                'direct_sale_revenue' => 0,
                'marketplace_revenue' => 0,
                'total_revenue' => 0,
                'profit' => 0,
            ];
            $start->addMonth();
        }
    } else {
        // Default to last 12 months
        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthKey = $date->format('Y-m');
            $months[$monthKey] = [
                'month' => $date->format('M Y'),
                'expenses' => 0,
                'direct_sale_revenue' => 0,
                'marketplace_revenue' => 0,
                'total_revenue' => 0,
                'profit' => 0,
            ];
        }
    }

    // Get expenses by month (existing code)
    $expenses = Expense::where('owner_id', $userId)
        ->whereHas('swineExpenses', function ($q) use ($swineId) {
            $q->where('swine_id', $swineId);
        })
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('created_at', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('created_at', '<=', $queryEndDate);
        })
        ->get()
        ->groupBy(function ($expense) {
            return \Carbon\Carbon::parse($expense->created_at)->format('Y-m');
        });

    foreach ($expenses as $monthKey => $monthExpenses) {
        if (isset($months[$monthKey])) {
            $total = 0;
            foreach ($monthExpenses as $expense) {
                $swineExpense = $expense->swineExpenses()
                    ->where('swine_id', $swineId)
                    ->first();
                if ($swineExpense) {
                    $total += $swineExpense->individual_share;
                }
            }
            $months[$monthKey]['expenses'] = $total;
        }
    }

    // Get direct sales by month (existing code)
    $directSales = DirectSale::where('farmer_id', $userId)
        ->where('swine_id', $swineId)
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('sold_at', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('sold_at', '<=', $queryEndDate);
        })
        ->get()
        ->groupBy(function ($sale) {
            return \Carbon\Carbon::parse($sale->sold_at)->format('Y-m');
        });

    foreach ($directSales as $monthKey => $sales) {
        if (isset($months[$monthKey])) {
            $months[$monthKey]['direct_sale_revenue'] = $sales->sum('total_amount');
        }
    }

    // ✅ FIX: Get marketplace transactions by month using final_amount
    $marketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
        ->whereIn('state', ['completed', 'done'])
        ->whereHas('swineRequest.listingSwine', function ($q) use ($swineId) {
            $q->where('swine_id', $swineId);
        })
        ->with(['swineRequest' => function($q) use ($swineId) {
            $q->whereHas('listingSwine', function($sq) use ($swineId) {
                $sq->where('swine_id', $swineId);
            });
        }])
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('transaction_date', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('transaction_date', '<=', $queryEndDate);
        })
        ->get()
        ->groupBy(function ($transaction) {
            return \Carbon\Carbon::parse($transaction->transaction_date)->format('Y-m');
        });

    foreach ($marketplaceTransactions as $monthKey => $transactions) {
        if (isset($months[$monthKey])) {
            $total = 0;
            foreach ($transactions as $transaction) {
                // Use final_amount from swine_request
                $swineRequest = $transaction->swineRequest->first();
                if ($swineRequest && $swineRequest->final_amount) {
                    $total += $swineRequest->final_amount;
                }
            }
            $months[$monthKey]['marketplace_revenue'] = $total;
        }
    }

    // Calculate totals and profit for each month
    foreach ($months as $monthKey => &$monthData) {
        $monthData['total_revenue'] = $monthData['direct_sale_revenue'] + $monthData['marketplace_revenue'];
        $monthData['profit'] = $monthData['total_revenue'] - $monthData['expenses'];
    }

    return array_values($months);
}

/**
 * Get monthly summary for a group of swine
 */
private function getGroupMonthlySummary($userId, $swineIds, $dateRange, $startDate, $endDate)
{
    $months = [];
    $year = now()->year;
    
    // Determine date range for query (same as before)
    $queryStartDate = $startDate;
    $queryEndDate = $endDate;
    
    if ($dateRange === 'this_year') {
        $queryStartDate = now()->startOfYear()->toDateString();
        $queryEndDate = now()->endOfYear()->toDateString();
    } elseif ($dateRange === 'this_month') {
        $queryStartDate = now()->startOfMonth()->toDateString();
        $queryEndDate = now()->endOfMonth()->toDateString();
    } elseif ($dateRange === 'all') {
        $queryStartDate = null;
        $queryEndDate = null;
    }

    // Get all months in range (same as before)
    if ($queryStartDate && $queryEndDate) {
        $start = \Carbon\Carbon::parse($queryStartDate);
        $end = \Carbon\Carbon::parse($queryEndDate);
        
        while ($start <= $end) {
            $monthKey = $start->format('Y-m');
            $months[$monthKey] = [
                'month' => $start->format('M Y'),
                'expenses' => 0,
                'direct_sale_revenue' => 0,
                'marketplace_revenue' => 0,
                'total_revenue' => 0,
                'profit' => 0,
            ];
            $start->addMonth();
        }
    } else {
        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthKey = $date->format('Y-m');
            $months[$monthKey] = [
                'month' => $date->format('M Y'),
                'expenses' => 0,
                'direct_sale_revenue' => 0,
                'marketplace_revenue' => 0,
                'total_revenue' => 0,
                'profit' => 0,
            ];
        }
    }

    // Get expenses by month (existing code)
    $expenses = Expense::where('owner_id', $userId)
        ->whereHas('swineExpenses', function ($q) use ($swineIds) {
            $q->whereIn('swine_id', $swineIds);
        })
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('created_at', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('created_at', '<=', $queryEndDate);
        })
        ->with(['swineExpenses' => function ($q) use ($swineIds) {
            $q->whereIn('swine_id', $swineIds);
        }])
        ->get()
        ->groupBy(function ($expense) {
            return \Carbon\Carbon::parse($expense->created_at)->format('Y-m');
        });

    foreach ($expenses as $monthKey => $monthExpenses) {
        if (isset($months[$monthKey])) {
            $total = 0;
            foreach ($monthExpenses as $expense) {
                foreach ($expense->swineExpenses as $swineExpense) {
                    $total += $swineExpense->individual_share;
                }
            }
            $months[$monthKey]['expenses'] = $total;
        }
    }

    // Get direct sales by month (existing code)
    $directSales = DirectSale::where('farmer_id', $userId)
        ->whereIn('swine_id', $swineIds)
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('sold_at', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('sold_at', '<=', $queryEndDate);
        })
        ->get()
        ->groupBy(function ($sale) {
            return \Carbon\Carbon::parse($sale->sold_at)->format('Y-m');
        });

    foreach ($directSales as $monthKey => $sales) {
        if (isset($months[$monthKey])) {
            $months[$monthKey]['direct_sale_revenue'] = $sales->sum('total_amount');
        }
    }

    // ✅ FIX: Get marketplace transactions by month using final_amount
    $marketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
        ->whereIn('state', ['completed', 'done'])
        ->whereHas('swineRequest.listingSwine', function ($q) use ($swineIds) {
            $q->whereIn('swine_id', $swineIds);
        })
        ->with(['swineRequest' => function($q) use ($swineIds) {
            $q->whereHas('listingSwine', function($sq) use ($swineIds) {
                $sq->whereIn('swine_id', $swineIds);
            });
        }])
        ->when($queryStartDate, function ($q) use ($queryStartDate) {
            return $q->whereDate('transaction_date', '>=', $queryStartDate);
        })
        ->when($queryEndDate, function ($q) use ($queryEndDate) {
            return $q->whereDate('transaction_date', '<=', $queryEndDate);
        })
        ->get()
        ->groupBy(function ($transaction) {
            return \Carbon\Carbon::parse($transaction->transaction_date)->format('Y-m');
        });

    foreach ($marketplaceTransactions as $monthKey => $transactions) {
        if (isset($months[$monthKey])) {
            $total = 0;
            foreach ($transactions as $transaction) {
                // Sum all final_amount for swine in this group
                foreach ($transaction->swineRequest as $request) {
                    if (in_array($request->listingSwine->swine_id, $swineIds)) {
                        $total += $request->final_amount ?? 0;
                    }
                }
            }
            $months[$monthKey]['marketplace_revenue'] = $total;
        }
    }

    // Calculate totals and profit for each month
    foreach ($months as $monthKey => &$monthData) {
        $monthData['total_revenue'] = $monthData['direct_sale_revenue'] + $monthData['marketplace_revenue'];
        $monthData['profit'] = $monthData['total_revenue'] - $monthData['expenses'];
    }

    return array_values($months);
}


    }
