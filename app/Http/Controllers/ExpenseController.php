<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Swine\SwineGroup;
use Illuminate\Support\Facades\DB;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    /** Display all expenses for the authenticated user */
    // public function index()
    // {
    //     $expenses = Expense::with(['swine', 'group.members'])
    //         ->where('owner_id', auth()->id())
    //         ->latest()
    //         ->paginate(10);

    //     return Inertia::render('expenses/index', [
    //         'expenses' => $expenses
    //     ]);
    // }
public function index(Request $request) 
{
    $user = Auth::user();

  $expenses = Expense::with('swineExpenses')
    ->where('owner_id', $user->id)
    ->latest()
    ->get()
    ->map(function ($expense) {
        $expense->swine_ids = $expense->swineExpenses
            ->pluck('swine_id')
            ->toArray();
        return $expense;
    });
    $groups = SwineGroup::with(['swine' => function ($query) use ($user) {
        $query->where('owner_id', $user->id);
    }])->get();
    $swine = Swine::where('owner_id', $user->id)->get();

    $totalExpenses = Expense::where('owner_id', $user->id)->sum('amount');
    $categoryBreakdown = Expense::where('owner_id', $user->id)
        ->select('category', DB::raw('SUM(amount) as total'))
        ->groupBy('category')
        ->get()
        ->map(function ($item) use ($totalExpenses) {
            $item->percentage = $totalExpenses > 0 ? round(($item->total / $totalExpenses) * 100, 2) : 0;
            return $item;
        });

    $latestExpenses = Expense::where('owner_id', $user->id)
        ->latest()
        ->take(5)
        ->get(['category', 'description', 'quantity', 'unit', 'amount', 'date']);

    // Get the selected expense if provided
    $selectedExpenseId = $request->input('expense_id');
$selectedExpense = null;

if ($selectedExpenseId) {
    $selectedExpense = Expense::with('swineExpenses.swine')
        ->where('owner_id', $user->id) // 🔒 security: prevent accessing others' expenses
        ->find($selectedExpenseId);

    if ($selectedExpense) {
        // Attach swine_ids manually for frontend
        $selectedExpense->swine_ids = $selectedExpense->swineExpenses
            ->pluck('swine_id')
            ->toArray();
    }
}

    return Inertia::render('expenses/index', [
        'expenses' => $expenses,
        'groups' => $groups,
        'swine' => $swine,
        'summary' => [
            'total' => $totalExpenses,
            'breakdown' => $categoryBreakdown,
            'latest' => $latestExpenses,
        ],
        'selected_group_id' => $request->input('group_id'),
        'selected_swine_ids' => $request->input('swine_ids', []),
        'selected_expense' => $selectedExpense,
    ]);
}



public function store(ExpenseRequest $request)
{
    $userId = auth()->id();
    $validated = $request->validated();

    $swineIds = $validated['swine_ids'] ?? [];
    $groupId = $validated['group_id'] ?? null;

    if ($groupId) {
        $groupSwineIds = \App\Models\Swine\SwineGroup::find($groupId)
            ->swine()
            ->where('owner_id', $userId)
            ->pluck('id')
            ->toArray();

        $swineIds = array_unique(array_merge($swineIds, $groupSwineIds));
    }

    // 1️⃣ Create main expense
    $expense = \App\Models\Expense::create([
        'owner_id' => $userId,
        'swine_group_id' => $groupId,
        'category' => $validated['category'],
        'description' => $validated['description'] ?? null,
        'quantity' => $validated['quantity'] ?? null,
        'unit' => $validated['unit'] ?? null,
        'amount' => $validated['amount'],
        'date' => $validated['date'],
    ]);

    // 2️⃣ Assign to swines
    if (!empty($swineIds)) {
        $share = $validated['amount'] / count($swineIds);

        $swineExpenses = collect($swineIds)->map(fn($id) => [
            'expense_id' => $expense->id,
            'swine_id' => $id,
            'individual_share' => $share,
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray();

        \App\Models\SwineExpense::insert($swineExpenses);
    }

    return redirect()->back()->with('success', 'Expense recorded successfully!');
}

public function update(ExpenseRequest $request, Expense $expense)
{
    $validated = $request->validated();
    $userId = auth()->id();

    $swineIds = $validated['swine_ids'] ?? [];
    $groupId = $validated['group_id'] ?? null;

    if ($groupId) {
        $groupSwineIds = \App\Models\Swine\SwineGroup::find($groupId)
            ->swine()
            ->where('owner_id', $userId)
            ->pluck('id')
            ->toArray();

        $swineIds = array_unique(array_merge($swineIds, $groupSwineIds));
    }

    $expense->update([
        'swine_group_id' => $groupId,
        'category' => $validated['category'],
        'description' => $validated['description'] ?? null,
        'quantity' => $validated['quantity'] ?? null,
        'unit' => $validated['unit'] ?? null,
        'amount' => $validated['amount'],
        'date' => $validated['date'],
    ]);

    // Update swine shares
    \App\Models\SwineExpense::where('expense_id', $expense->id)->delete();
    if (!empty($swineIds)) {
        $share = $validated['amount'] / count($swineIds);

        $swineExpenses = collect($swineIds)->map(fn($id) => [
            'expense_id' => $expense->id,
            'swine_id' => $id,
            'individual_share' => $share,
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray();

        \App\Models\SwineExpense::insert($swineExpenses);
    }

    return redirect()->back()->with('success', 'Expense updated successfully!');
}




    /** Delete expense */
   public function destroy(Expense $expense)
{
    try {
        $expense->delete();

        return response()->json([
            'success' => true,
            'message' => 'Expense deleted successfully.'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete expense.',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
