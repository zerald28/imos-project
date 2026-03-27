<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\DirectSale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\ListingSwine;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\Marketplace\SwineRequest;
use App\Models\Swine\Expense;
use Illuminate\Support\Facades\Auth;

class SellerTransactionController extends Controller
{
    // Render setup page
  // Render setup page
public function setup($id)
{
    $transaction = MarketplaceTransaction::with([
        'listing.listingSwine',
        'buyer',
        'seller',
        'swineRequest.listingSwine',
    ])->findOrFail($id);

    // If still pending, update to seller_review
    if ($transaction->state === 'pending_request') {
        $transaction->state = 'seller_review';
        $transaction->save();
    }

    $swineRequest = $transaction->swineRequest->first();

    $formattedType = $swineRequest?->type
        ? ucwords(str_replace('_', ' ', $swineRequest->type))
        : 'N/A';

    $formattedStatus = $transaction->state
        ? ucwords(str_replace('_', ' ', $transaction->state))
        : 'N/A';

    // Get IDs of swine in this transaction
    $transactionSwineIds = $transaction->swineRequest
        ->pluck('listing_swine_id')
        ->toArray();

    // Create a map of swine_id => final_amount for quick lookup
    $finalAmountMap = $transaction->swineRequest
        ->mapWithKeys(function($request) {
            return [$request->listing_swine_id => $request->final_amount];
        })
        ->toArray();

    // Get ALL swine from the listing with their status
    $allSwineList = $transaction->listing->listingSwine->map(function ($swine) use ($transactionSwineIds, $finalAmountMap) {
        $birthDate = $swine->birthdate ? \Carbon\Carbon::parse($swine->birthdate) : null;
        $ageDays = $birthDate ? intval($birthDate->diffInDays(now())) : 'N/A';

        $weight = $swine->scaled_weight ?? $swine->estimated_weight ?? 'N/A';

        $status = $swine->status ?? 'unknown';
        $statusDisplay = ucfirst(str_replace('_', ' ', $status));
        
        // Check if this swine is in the current transaction
        $isInTransaction = in_array($swine->id, $transactionSwineIds);

        return [
            'listing_swine_id' => $swine->id,
            'sex' => ucfirst($swine->sex ?? 'N/A'),
            'breed' => $swine->breed ?? 'N/A',
            'age_days' => is_numeric($ageDays) ? "{$ageDays} days" : 'N/A',
            'weight' => $weight,
            'status' => $status,
            'status_display' => $statusDisplay,
            'is_in_transaction' => $isInTransaction,
            'final_amount' => $isInTransaction ? ($finalAmountMap[$swine->id] ?? null) : null,
        ];
    })->values();

    // Calculate totals from transaction swine
    $transactionSwine = $allSwineList->filter(function($item) {
        return $item['is_in_transaction'];
    });

    $transactionQuantity = $transactionSwine->count();
    $transactionTotalWeight = $transactionSwine->sum(function($item) {
        return is_numeric($item['weight']) ? (float)$item['weight'] : 0;
    });

    // Count sold items in transaction
    $soldInTransaction = $transactionSwine->filter(function($item) {
        return $item['status'] === 'sold';
    })->count();

    // Get price information
    $pricePerUnit = $transaction->price_per_unit ?? $transaction->listing?->price_per_unit ?? 0;
    $priceUnitType = $transaction->price_unit_type ?? $transaction->listing?->price_unit_type ?? 'per_head';
    $priceLabel = $priceUnitType;

    // ✅ Add rating data for the seller
    $existingRating = \App\Models\FarmerRating::where('transaction_id', $transaction->id)
        ->where('rater_id', $transaction->buyer_id) // The buyer rates the seller
        ->first();

    return Inertia::render('marketplace/seller/transaction-setup', [
        'transaction' => [
            'id' => $transaction->id,
            'listing_id' => $transaction->listing_id,
            'seller_id' => $transaction->seller_id,
            'buyer_id' => $transaction->buyer_id,
            'seller_name' => $transaction->seller?->name ?? 'N/A',
            'buyer_name' => $transaction->buyer?->name ?? 'N/A',
            'email' => $transaction->buyer?->email ?? 'N/A',
            'contact' => $swineRequest?->contact ?? 'N/A',
            'address' => $swineRequest?->address ?? 'N/A',
            'request_type' => $formattedType,
            'quantity' => $transactionQuantity,
            'offer_amount' => $swineRequest?->offer_amount,
            'original_amount' => $pricePerUnit,
            'price_per_unit' => $pricePerUnit,
            'price_unit_type' => $priceUnitType,
            'total_weight' => $transactionTotalWeight,
            'price_label' => $priceLabel,
            'status' => $formattedStatus,
            'transaction_date' => $transaction->transaction_date->format('Y-m-d'),
            'sold_in_transaction_count' => $soldInTransaction,
            'listing_title' => $transaction->listing?->title ?? 'N/A',
            // ✅ Add rating data
            'has_rating' => $existingRating !== null,
            'rating' => $existingRating ? [
                'rating' => $existingRating->rating,
                'comment' => $existingRating->comment,
                'created_at' => $existingRating->created_at,
            ] : null,
        ],
        'all_swine_list' => $allSwineList,
        'transaction_swine_ids' => $transactionSwineIds,
    ]);
}




  // Approve transaction
public function approve(Request $request, $id)
{
    $request->validate([
        'final_quantity' => 'required|numeric|min:1',
        'final_amount' => 'required|numeric|min:0', // this is the selected base price per unit
    ]);

    $transaction = MarketplaceTransaction::with('swineRequest')->findOrFail($id);

    // 🧮 Update only quantity and the per-unit amount the seller selected
    $transaction->quantity = $request->final_quantity;
    $transaction->amount = $request->final_amount; // ✅ store selected price per unit (offer or original)
    $transaction->state = 'seller_approved';

    $transaction->save();

    // Optionally, you can also update timestamps or add transaction logs here
    // Example: Log::info("Seller approved transaction #{$transaction->id}");

    return redirect()
        ->route('marketplace.seller.index')
        ->with('success', 'Transaction approved successfully.');
}

// ✅ Update individual swine weight via AJAX
public function updateWeight(Request $request, $id)
{
    $request->validate([
        'scaled_weight' => 'required|numeric|min:0',
    ]);

    $swine = ListingSwine::findOrFail($id);

    // ✅ Clear the estimated weight first, then update the scaled weight
    $swine->update([
        'estimated_weight' => null,
        'scaled_weight' => $request->scaled_weight,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Weight updated successfully',
        'updated_weight' => $swine->scaled_weight,
    ]);
}


// ✅ Complete transaction
public function completeTransaction(Request $request, $id)
{
    $request->validate([
        'quantity' => 'required|numeric|min:1',
        'selected_amount' => 'required|numeric|min:0',
        'total_weight' => 'nullable|numeric|min:0', // Add this for per-kg calculations
    ]);

    $transaction = MarketplaceTransaction::with(['swineRequest.listingSwine'])->findOrFail($id);

    DB::transaction(function () use ($transaction, $request) {
        // Calculate the final transaction amount
        $finalAmount = 0;
        
        if ($transaction->price_unit_type === 'per_kg') {
            // For per kg: Use total weight × price per kg
            $finalAmount = ($request->total_weight ?? 0) * $request->selected_amount;
            
            // Update each swine request with its individual final amount (weight × price)
            foreach ($transaction->swineRequest as $swineRequest) {
                if ($swineRequest->listingSwine) {
                    $weight = $swineRequest->listingSwine->scaled_weight ?? 
                             $swineRequest->listingSwine->estimated_weight ?? 0;
                    
                    // Calculate final amount for this specific pig
                    $individualFinalAmount = $weight * $request->selected_amount;
                    
                    // Save to swine_requests table
                    $swineRequest->update([
                        'final_amount' => $individualFinalAmount
                    ]);
                }
            }
        } else {
            // For per head: Use quantity × selected price OR sum of existing final_amounts
            $hasFinalAmounts = $transaction->swineRequest()
                ->whereNotNull('final_amount')
                ->where('final_amount', '>', 0)
                ->exists();
            
            if ($hasFinalAmounts) {
                // Sum all individual final amounts
                $finalAmount = $transaction->swineRequest()
                    ->sum('final_amount');
            } else {
                // Use quantity × selected price
                $finalAmount = $request->quantity * $request->selected_amount;
            }
        }

        // Update the main transaction
        $transaction->update([
            'amount' => $finalAmount,
            'state' => 'completed',
        ]);

        // Mark all related swine as sold
        $transaction->swineRequest()
            ->with('listingSwine')
            ->get()
            ->each(function ($req) {
                if ($req->listingSwine) {
                    $req->listingSwine->update(['status' => 'sold']);
                }
            });
    });

    return redirect()
        ->route('marketplace.seller.index')
        ->with('success', 'Transaction completed successfully.');
}

public function activityLog(Request $request)
{
    $userId = Auth::id();
    
    // Get all activities
    $expenses = Expense::where('owner_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($expense) {
            return [
                'id' => $expense->id,
                'type' => 'expense',
                'title' => "Expense - " . $expense->category,
                'description' => $expense->description,
                'amount' => $expense->amount,
                'date' => $expense->date,
                'category' => $expense->category,
                'created_at' => $expense->created_at,
            ];
        });
    
    $marketplaceTransactions = MarketplaceTransaction::where('seller_id', $userId)
        ->with(['listing', 'buyer'])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($transaction) {
            return [
                'id' => $transaction->id,
                'type' => 'marketplace',
                'title' => $transaction->listing?->title ?: 'Marketplace Sale',
                'description' => 'Sold to ' . ($transaction->buyer?->name ?: 'customer'),
                'amount' => $transaction->amount * $transaction->quantity,
                'date' => $transaction->transaction_date,
                'status' => $transaction->state,
                'buyer' => $transaction->buyer?->name,
                'created_at' => $transaction->created_at,
            ];
        });
    
    $directSales = DirectSale::where('farmer_id', $userId)
        ->with(['swine'])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($sale) {
            return [
                'id' => $sale->id,
                'type' => 'direct_sale',
                'title' => 'Direct Sale - ' . ($sale->swine?->tag_number ?: 'Swine'),
                'description' => 'Sold to ' . $sale->buyer_name,
                'amount' => $sale->total_amount,
                'date' => $sale->sold_at,
                'buyer' => $sale->buyer_name,
                'created_at' => $sale->created_at,
            ];
        });
    
    // Combine and sort all activities
    $allActivities = $expenses->merge($marketplaceTransactions)
        ->merge($directSales)
        ->sortByDesc('created_at')
        ->values()
        ->all();
    
    return Inertia::render('Activitylog', [
        'activities' => $allActivities,
    ]);
}

}
