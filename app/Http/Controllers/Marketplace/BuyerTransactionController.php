<?php



namespace App\Http\Controllers\Marketplace;


use App\Http\Controllers\Controller;
use App\Models\FarmerRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\ListingSwine;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Marketplace\SwineRequest;

class BuyerTransactionController extends Controller
{
    /**
     * Confirm the transaction by the buyer
     */
public function setup($id)
{
    $transaction = MarketplaceTransaction::with([
        'listing.listingSwine',
        'buyer',
        'seller',
        'swineRequest.listingSwine', // Include swine requests with their final_amount
    ])->findOrFail($id);

    if ($transaction->buyer_id !== auth()->id()) {
        abort(403, 'Unauthorized access.');
    }

    // ✅ If transaction is completed, redirect to receipt page
    // if ($transaction->state === 'completed') {
    //     return redirect()->route('marketplace.transaction.receipt', $id);
    // }

    $swineRequest = $transaction->swineRequest->first();
    
    $formattedType = $swineRequest?->type
        ? ucwords(str_replace('_', ' ', $swineRequest->type))
        : 'N/A';

    $formattedStatus = $transaction->state
        ? ucwords(str_replace('_', ' ', $transaction->state))
        : 'N/A';

    // ✅ Get IDs of swine in this transaction
    $transactionSwineIds = $transaction->swineRequest
        ->pluck('listing_swine_id')
        ->toArray();

    // ✅ Create a map of swine_id => final_amount for quick lookup
    $finalAmountMap = $transaction->swineRequest
        ->mapWithKeys(function($request) {
            return [$request->listing_swine_id => $request->final_amount];
        })
        ->toArray();

    // ✅ Get ALL swine from the listing with their status
    $allSwineList = $transaction->listing->listingSwine->map(function ($swine) use ($transactionSwineIds, $finalAmountMap) {
        $birthDate = $swine->birthdate ? \Carbon\Carbon::parse($swine->birthdate) : null;
        $ageDays = $birthDate ? intval($birthDate->diffInDays(now())) : 'N/A';

        $weight = $swine->scaled_weight ?? $swine->estimated_weight ?? 'N/A';

        $status = $swine->status ?? 'unknown';
        $statusDisplay = ucfirst(str_replace('_', ' ', $status));
        
        $statusVariant = match($status) {
            'available' => 'success',
            'reserved' => 'warning',
            'sold' => 'secondary',
            'pending_approval' => 'info',
            'inactive' => 'destructive',
            default => 'default'
        };

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
            'status_variant' => $statusVariant,
            'is_in_transaction' => $isInTransaction,
            'final_amount' => $isInTransaction ? ($finalAmountMap[$swine->id] ?? null) : null, // Include final_amount
        ];
    })->values();

    $sellerInfo = $transaction->seller?->userInformation;

    $fullAddress = collect([
        $sellerInfo?->street,
        $sellerInfo?->purok,
        $sellerInfo?->barangay?->name,
        $sellerInfo?->municipal?->name,
        $sellerInfo?->province?->name,
    ])->filter()->join(', ');

    // ✅ Calculate totals ONLY from swine in this transaction
    $transactionSwine = $allSwineList->filter(function($item) {
        return $item['is_in_transaction'];
    });

    $transactionQuantity = $transactionSwine->count();
    $transactionTotalWeight = $transactionSwine->sum(function($item) {
        return is_numeric($item['weight']) ? (float)$item['weight'] : 0;
    });

    // Get price information from transaction with fallback to listing
    $pricePerUnit = $transaction->price_per_unit ?? $transaction->listing?->price_per_unit ?? 0;
    $priceUnitType = $transaction->price_unit_type ?? $transaction->listing?->price_unit_type ?? 'per_head';
    $priceLabel = $priceUnitType;

    $existingRating = FarmerRating::where('transaction_id', $transaction->id)
    ->where('rater_id', auth()->id())
    ->first();

    return Inertia::render('marketplace/buyer/transaction-setup', [
        'transaction' => [
            'id' => $transaction->id,
            'seller_id' => $transaction->seller?->id,
            'listing_id' => $transaction->listing?->id,
            'seller_name' => $transaction->seller?->name ?? 'N/A',
            'buyer_name' => $transaction->buyer?->name ?? 'N/A',
            'email' => $transaction->seller?->email ?? 'N/A',
            'contact' => $transaction->seller->userInformation->contact ?? 'N/A',
            'address' => $fullAddress ?: 'N/A',
            'request_type' => $formattedType,
            'quantity' => $transactionQuantity,
            'offer_amount' => $swineRequest?->offer_amount,
            'original_amount' => $transaction->amount,
            'price_per_unit' => $pricePerUnit,
            'price_unit_type' => $priceUnitType,
            'total_weight' => $transactionTotalWeight,
            'price_label' => $priceLabel,
            'status' => $formattedStatus,
            'transaction_date' => $transaction->transaction_date->format('Y-m-d'),
            'listing_title' => $transaction->listing?->title ?? 'N/A',
             'has_rating' => $existingRating !== null,
        'rating' => $existingRating ? [
            'rating' => $existingRating->rating,
            'comment' => $existingRating->comment,
        ] : null,
        ],
        'all_swine_list' => $allSwineList,
        'transaction_swine_ids' => $transactionSwineIds,
    ]);
}

public function updatePrice(Request $request, $transactionId)
{
    $request->validate([
        'price_per_unit' => 'required|numeric|min:0',
        'price_unit_type' => 'required|in:per_head,per_kg',
    ]);

    $transaction = MarketplaceTransaction::with('swineRequest')->findOrFail($transactionId);

    // Check if user owns this transaction
    // if ($transaction->buyer_id !== auth()->id()) {
    //     abort(403, 'Unauthorized');
    // }

    // Check if transaction is in a state where price can be updated
    $allowedStates = ['pending_request', 'seller_review', 'seller_approved'];
    if (!in_array($transaction->state, $allowedStates)) {
        return response()->json([
            'message' => 'Cannot update price in current transaction state'
        ], 422);
    }

    // If switching to per_head, clear all final_amount values
    if ($request->price_unit_type === 'per_head') {
        // Update all swine requests in this transaction to have null final_amount
        $transaction->swineRequest()->update(['final_amount' => null]);
    }

    $transaction->update([
        'price_per_unit' => $request->price_per_unit,
        'price_unit_type' => $request->price_unit_type,
    ]);

    return response()->json([
        'message' => 'Price updated successfully',
        'price_per_unit' => $request->price_per_unit,
        'price_unit_type' => $request->price_unit_type,
    ]);
}


public function updateFinalAmount(Request $request, $listingSwineId)
{
    $request->validate([
        'final_amount' => 'required|numeric|min:0'
    ]);

    $swineRequest = SwineRequest::where('listing_swine_id', $listingSwineId)
        // ->where('buyer_id', auth()->id())
        ->first();

    if (!$swineRequest) {
        return response()->json(['message' => 'Swine request not found'], 404);
    }

    $swineRequest->update([
        'final_amount' => $request->final_amount
    ]);

    return response()->json([
        'message' => 'Final amount updated successfully',
        'final_amount' => $request->final_amount
    ]);
}

// In your BuyerTransactionController.php

public function addSwineToTransaction(Request $request, $transactionId)
{
    $request->validate([
        'listing_swine_ids' => 'required|array',
        'listing_swine_ids.*' => 'exists:listing_swine,id'
    ]);

    return DB::transaction(function () use ($request, $transactionId) {
        $transaction = MarketplaceTransaction::with(['buyer.userInformation'])->findOrFail($transactionId);
        
        // Check if user owns this transaction
        if ($transaction->buyer_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Check if transaction is in a state where adding is allowed
        if (in_array($transaction->state, ['completed', 'cancelled', 'expired', 'unavailable', 'listing_deleted'])) {
            return response()->json([
                'message' => 'Cannot add swine to a completed or cancelled transaction'
            ], 422);
        }

        // Get the buyer's information
        $buyer = $transaction->buyer;
        $userInfo = $buyer->userInformation;

        // Build full address from user information
        $addressParts = [];
        if ($userInfo) {
            if ($userInfo->street) $addressParts[] = $userInfo->street;
            if ($userInfo->purok) $addressParts[] = $userInfo->purok;
            if ($userInfo->barangay && $userInfo->barangay->name) $addressParts[] = $userInfo->barangay->name;
            if ($userInfo->municipal && $userInfo->municipal->name) $addressParts[] = $userInfo->municipal->name;
            if ($userInfo->province && $userInfo->province->name) $addressParts[] = $userInfo->province->name;
        }
        $fullAddress = !empty($addressParts) ? implode(', ', $addressParts) : 'N/A';

        // Get contact and email
        $contact = $userInfo->contact ?? 'N/A';
        $email = $buyer->email ?? 'N/A';

        // Get the listing swine to add - only those that are available
        $listingSwine = ListingSwine::whereIn('id', $request->listing_swine_ids)
            ->where('listing_id', $transaction->listing_id)
            ->where('status', 'available') // Only available swine can be added
            ->get();

        if ($listingSwine->count() !== count($request->listing_swine_ids)) {
            return response()->json([
                'message' => 'Some swine are not available for addition'
            ], 422);
        }

        // Get the existing request type from the first swine request in this transaction
        $existingRequest = SwineRequest::where('transaction_id', $transaction->id)->first();
        $requestType = $existingRequest ? $existingRequest->type : 'purchase';

        // Create swine requests for each selected listing swine
        foreach ($listingSwine as $swine) {
            SwineRequest::create([
                'listing_swine_id' => $swine->id,
                'buyer_id' => $transaction->buyer_id,
                'contact' => $contact,
                'email' => $email,
                'address' => $fullAddress,
                'type' => $requestType,
                'offer_amount' => null, // No offer amount for added swine
                'transaction_id' => $transaction->id,
                'status' => 'pending' // Status for the request, not the swine
            ]);

            // ✅ Update ONLY the listing_swine status, NOT the main swine table
            // $swine->update([
            //     'status' => 'reserved', // This is valid for listing_swine table
            //     'reserved_by' => $transaction->buyer_id,
            //     'is_reserved' => true
            // ]);
            
            // Note: We DO NOT update the main swine table here
            // The main swine table keeps its original status (likely 'available')
        }

        // Calculate total weight of added swine
        $addedWeight = $listingSwine->sum(function($swine) {
            return $swine->scaled_weight ?? $swine->estimated_weight ?? 0;
        });

        // Update transaction quantity and total weight
        $newQuantity = $transaction->quantity + $listingSwine->count();
        $newWeight = ($transaction->total_weight ?? 0) + $addedWeight;

        $transaction->update([
            'quantity' => $newQuantity,
            'total_weight' => $newWeight
        ]);

        return response()->json([
            'message' => count($request->listing_swine_ids) . ' swine added successfully',
            'quantity' => $newQuantity,
            'total_weight' => $newWeight
        ]);
    });
}

public function removeSwineFromTransaction(Request $request, $transactionId)
{
    $request->validate([
        'listing_swine_id' => 'required|exists:listing_swine,id'
    ]);

    return DB::transaction(function () use ($request, $transactionId) {
        $transaction = MarketplaceTransaction::findOrFail($transactionId);
        
        // Check if user owns this transaction
        if ($transaction->buyer_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Check if transaction is in a state where removal is allowed
        if (in_array($transaction->state, ['completed', 'cancelled', 'expired'])) {
            return response()->json([
                'message' => 'Cannot remove swine from a completed or cancelled transaction'
            ], 422);
        }

        // Find the swine request
        $swineRequest = SwineRequest::where('transaction_id', $transaction->id)
            ->where('listing_swine_id', $request->listing_swine_id)
            ->first();

        if (!$swineRequest) {
            return response()->json([
                'message' => 'Swine not found in this transaction'
            ], 404);
        }

        // Get the listing swine
        $listingSwine = ListingSwine::find($request->listing_swine_id);
        
        // Only update status if it's not sold to another buyer
        // If it's sold to another buyer, we don't want to change its status back to available
        if ($listingSwine->status !== 'sold') {
            $listingSwine->update([
                'status' => 'available',
                'reserved_by' => null
            ]);
        }

        // Delete the swine request
        $swineRequest->delete();

        // Update transaction quantity and total weight
        $newQuantity = max(0, $transaction->quantity - 1);
        $newWeight = max(0, $transaction->total_weight - ($listingSwine->scaled_weight ?? 0));

        $transaction->update([
            'quantity' => $newQuantity,
            'total_weight' => $newWeight
        ]);

        $message = $listingSwine->status === 'sold' 
            ? 'Sold item removed from transaction successfully'
            : 'Swine removed successfully';

        return response()->json([
            'message' => $message,
            'quantity' => $newQuantity,
            'total_weight' => $newWeight
        ]);
    });
}


public function receipt($id)
{
    $transaction = MarketplaceTransaction::with([
        'listing',
        'buyer.userInformation.province',
        'buyer.userInformation.municipal',
        'buyer.userInformation.barangay',
        'seller.userInformation.province',
        'seller.userInformation.municipal',
        'seller.userInformation.barangay',
        'swineRequest.listingSwine',
    ])->findOrFail($id);

    // Check if user is authorized (buyer or seller)
    if ($transaction->buyer_id !== auth()->id() && $transaction->seller_id !== auth()->id()) {
        abort(403, 'Unauthorized access.');
    }

    // Check if transaction is completed
  if ($transaction->state !== 'done' && $transaction->state !== 'completed') {
    return redirect()->route('marketplace.transaction.setup', $id)
        ->with('error', 'Receipt is only available for completed transactions.');
}

    $swineRequest = $transaction->swineRequest->first();
    
    $formattedType = $swineRequest?->type
        ? ucwords(str_replace('_', ' ', $swineRequest->type))
        : 'N/A';

    // Get all swine in this transaction
    $swineList = $transaction->swineRequest->map(function ($request) {
        $swine = $request->listingSwine;

        if (!$swine) {
            return null;
        }

        $birthDate = $swine->birthdate ? \Carbon\Carbon::parse($swine->birthdate) : null;
        $ageDays = $birthDate ? intval($birthDate->diffInDays(now())) : 'N/A';
        $ageMonths = $birthDate ? intval($birthDate->diffInMonths(now())) : 'N/A';

        $weight = $swine->scaled_weight ?? $swine->estimated_weight ?? 'N/A';

        return [
            'listing_swine_id' => $swine->id,
            'sex' => ucfirst($swine->sex ?? 'N/A'),
            'breed' => $swine->breed ?? 'N/A',
            'age_days' => is_numeric($ageDays) ? "{$ageDays} days" : 'N/A',
            'age_months' => is_numeric($ageMonths) ? "{$ageMonths} months" : 'N/A',
            'weight' => $weight,
            'formatted_weight' => is_numeric($weight) ? number_format($weight, 2) . ' kg' : $weight,
        ];
    })->filter();

    // Build full addresses
    $buyerInfo = $transaction->buyer?->userInformation;
    $sellerInfo = $transaction->seller?->userInformation;

    $buyerAddress = $this->buildFullAddress($buyerInfo);
    $sellerAddress = $this->buildFullAddress($sellerInfo);

    // Calculate totals
    $subtotal = $transaction->amount;
    $totalWeight = $transaction->total_weight ?? 0;

    // Get buyer and seller full names
    $buyerFullName = $this->getFullName($buyerInfo, $transaction->buyer);
    $sellerFullName = $this->getFullName($sellerInfo, $transaction->seller);

    return Inertia::render('marketplace/buyer/transaction-receipt', [
        'transaction' => [
            'id' => $transaction->id,
            'transaction_number' => 'TRX-' . str_pad($transaction->id, 8, '0', STR_PAD_LEFT),
            'date' => $transaction->transaction_date->format('F j, Y'),
            'time' => $transaction->transaction_date->format('g:i A'),
            'status' => ucwords(str_replace('_', ' ', $transaction->state)),
            'request_type' => $formattedType,
            'payment_method' => $transaction->payment_method ?? 'Not specified',
            
            // Buyer information
            'buyer' => [
                'id' => $transaction->buyer_id,
                'full_name' => $buyerFullName,
                'email' => $transaction->buyer?->email ?? 'N/A',
                'contact' => $buyerInfo->contact ?? 'N/A',
                'address' => $buyerAddress,
            ],
            
            // Seller information
            'seller' => [
                'id' => $transaction->seller_id,
                'full_name' => $sellerFullName,
                'email' => $transaction->seller?->email ?? 'N/A',
                'contact' => $sellerInfo->contact ?? 'N/A',
                'address' => $sellerAddress,
                'farm_name' => $sellerInfo->farm_name ?? null,
            ],
            
            // Listing information
            'listing' => [
                'id' => $transaction->listing?->id,
                'title' => $transaction->listing?->title ?? 'N/A',
                'description' => $transaction->listing?->description ?? 'N/A',
                'category' => $transaction->listing?->category ?? 'N/A',
            ],
            
            // Pricing information
            'pricing' => [
                'price_per_unit' => $transaction->price_per_unit ?? $transaction->listing?->price_per_unit ?? 0,
                'price_unit_type' => $transaction->price_unit_type ?? $transaction->listing?->price_unit_type ?? 'per_head',
                'quantity' => $transaction->quantity,
                'total_weight' => $totalWeight,
                'subtotal' => $subtotal,
                'offer_amount' => $swineRequest?->offer_amount,
                'final_amount' => $swineRequest?->offer_amount ?? $subtotal,
            ],
            
            // Items
            'items' => $swineList->values(),
            'item_count' => $swineList->count(),
        ],
    ]);
}

private function buildFullAddress($userInfo)
{
    if (!$userInfo) return 'N/A';
    
    $addressParts = [];
    if ($userInfo->street) $addressParts[] = $userInfo->street;
    if ($userInfo->purok) $addressParts[] = $userInfo->purok;
    if ($userInfo->barangay && $userInfo->barangay->name) $addressParts[] = $userInfo->barangay->name;
    if ($userInfo->municipal && $userInfo->municipal->name) $addressParts[] = $userInfo->municipal->name;
    if ($userInfo->province && $userInfo->province->name) $addressParts[] = $userInfo->province->name;
    
    return !empty($addressParts) ? implode(', ', $addressParts) : 'N/A';
}

private function getFullName($userInfo, $user)
{
    if (!$userInfo) return $user->name ?? 'N/A';
    
    $nameParts = [];
    if ($userInfo->firstname) $nameParts[] = $userInfo->firstname;
    if ($userInfo->middlename) $nameParts[] = $userInfo->middlename;
    if ($userInfo->lastname) $nameParts[] = $userInfo->lastname;
    if ($userInfo->extension) $nameParts[] = $userInfo->extension;
    
    return !empty($nameParts) ? implode(' ', $nameParts) : ($user->name ?? 'N/A');
}


    public function confirm(Request $request, $id)
    {
        $user = $request->user();

        try {
            DB::beginTransaction();

            $transaction = MarketplaceTransaction::lockForUpdate()->findOrFail($id);

            // ✅ Prevent duplicate actions
            if ($transaction->status !== 'Approved') {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction cannot be confirmed. Current status: ' . $transaction->status,
                ], 400);
            }

            // ✅ Ensure only buyer can confirm
            if ($transaction->buyer_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: Only the assigned buyer can confirm this transaction.',
                ], 403);
            }

            // ✅ Update status to Completed
            $transaction->update([
                'status' => 'Completed',
                'confirmed_at' => now(),
            ]);

            // ✅ Update related listing (mark sold)
            if ($transaction->listing_id) {
                MarketplaceListing::where('id', $transaction->listing_id)->update([
                    'status' => 'Sold',
                ]);

                // ✅ Mark all associated swine as sold
                ListingSwine::where('listing_id', $transaction->listing_id)->update([
                    'status' => 'Sold',
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Transaction confirmed successfully.',
                'status' => $transaction->status,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error confirming transaction: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while confirming the transaction.',
            ], 500);
        }
    }

    /**
     * Cancel the transaction by the buyer
     */
    // public function cancel(Request $request, $id)
    // {
    //     $user = $request->user();

    //     try {
    //         DB::beginTransaction();

    //         $transaction = MarketplaceTransaction::lockForUpdate()->findOrFail($id);

    //         // ✅ Prevent cancelling once completed or already cancelled
    //         if (in_array($transaction->status, ['Completed', 'Cancelled'])) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Transaction cannot be cancelled. Current status: ' . $transaction->status,
    //             ], 400);
    //         }

    //         // ✅ Ensure only buyer can cancel
    //         if ($transaction->buyer_id !== $user->id) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Unauthorized: Only the buyer can cancel this transaction.',
    //             ], 403);
    //         }

    //         // ✅ Update status
    //         $transaction->update([
    //             'status' => 'Cancelled',
    //             'cancelled_at' => now(),
    //         ]);

    //         // ✅ Revert listing status to Available (if not sold yet)
    //         if ($transaction->listing_id) {
    //             MarketplaceListing::where('id', $transaction->listing_id)
    //                 ->where('status', '!=', 'Sold')
    //                 ->update(['status' => 'Available']);

    //             // ✅ Revert swine statuses
    //             ListingSwine::where('listing_id', $transaction->listing_id)
    //                 ->where('status', '!=', 'Sold')
    //                 ->update(['status' => 'Available']);
    //         }

    //         DB::commit();

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Transaction has been cancelled successfully.',
    //             'status' => $transaction->status,
    //         ]);
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         Log::error('Error cancelling transaction: ' . $e->getMessage());

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Something went wrong while cancelling the transaction.',
    //         ], 500);
    //     }
    // }

    /**
     * Show all transactions for the authenticated buyer
     */
    public function index(Request $request)
{
    $user = $request->user();

    // Fetch transactions where user is buyer
    $transactions = MarketplaceTransaction::with([
        'seller',
        'seller.userInformation',
        'swineRequest',
        'listing',
        'listing.listingSwine',
    ])
    ->where('buyer_id', $user->id)
    ->orderBy('updated_at', 'desc')
    ->get();

    // Transform data for frontend display
    $transactions = $transactions->map(function ($transaction) {
        // Convert state like "pending_request" → "Pending Request"
        $formattedState = Str::of($transaction->state)
            ->replace('_', ' ')
            ->title(); // Converts to Title Case

        return [
            'id' => $transaction->id,
            'quantity' => $transaction->quantity,
            'state' => $formattedState,
            'amount' => $transaction->amount,
            'transaction_date' => $transaction->transaction_date,
            'updated_at' => $transaction->updated_at->format('l, M j'),
           'listing' => [
    'id' => $transaction->listing->id ?? null,
    'image' => $transaction->listing && $transaction->listing->image
        ? asset('storage/' . $transaction->listing->image)
        : null,
    'description' => $transaction->listing->description ?? '[Listing Deleted by Seller]',
    'category' => $transaction->listing->category ?? 'Unknown',
    'price_per_unit' => $transaction->listing->price_per_unit ?? null,
    'seller_id' => $transaction->listing->seller_id ?? $transaction->seller_id,
],
            'seller' => [
                'id' => $transaction->seller->id,
                'name' => $transaction->seller->name
                    ?? $transaction->seller->userInformation->full_name
                    ?? '',
            ],
            'swineRequest' => $transaction->swineRequest,
        ];
    });

    return inertia('marketplace/buyer/buyertransactions', [
        'transactions' => $transactions,
    ]);
}

public function cancel($id)
{
    try {
        DB::transaction(function () use ($id) {
            $transaction = MarketplaceTransaction::findOrFail($id);
            
            // Check if transaction can be cancelled
            if (in_array($transaction->state, ['completed', 'shipped', 'delivered'])) {
                throw new \Exception('Cannot cancel a transaction that is already ' . $transaction->state);
            }
            
            if ($transaction->state === 'cancelled') {
                throw new \Exception('Transaction is already cancelled');
            }

            $transaction->update(['state' => 'cancelled']);

            SwineRequest::where('transaction_id', $id)
                ->update(['status' => 'cancelled']);
        });

        return response()->json(['message' => 'Transaction cancelled successfully.']);
        
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 400);
    }
}

public function delete($id)
{
    DB::transaction(function () use ($id) {
        SwineRequest::where('transaction_id', $id)->delete();
        MarketplaceTransaction::findOrFail($id)->delete();
    });

    return redirect()
        ->route('marketplace.buyer.transactions')
        ->with('success', 'Transaction deleted successfully!');
}

    
public function markAsDone($id)
{
    $transaction = MarketplaceTransaction::findOrFail($id);
    
    // Add any validation logic here (check if user is authorized, etc.)
    // Update the status to "Done"
    $transaction->state = "done";
    $transaction->save();
    
    return response()->json(['message' => 'Transaction marked as done successfully']);
}
    
}
