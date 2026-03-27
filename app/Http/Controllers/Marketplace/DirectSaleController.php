<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DirectSale;
use Inertia\Inertia;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\Auth;

class DirectSaleController extends Controller
{
    //
 public function storeDirectSale(Request $request)
{
    $validated = $request->validate([
        'swine_id' => 'required|exists:swine,id',
        'price' => 'required|numeric|min:0',
        'quantity' => 'required|integer|min:1',
        'sold_at' => 'required|date',
        'buyer_name' => 'required|string|max:255',
        'payment_method' => 'required|string|in:cash,bank_transfer,check,mobile_payment',
        'notes' => 'nullable|string',
    ]);

    // Calculate total amount
    $totalAmount = $validated['price'] * $validated['quantity'];
    
    // Create the direct sale
    $directSale = DirectSale::create([
        'farmer_id' => Auth::id(),
        'swine_id' => $validated['swine_id'],
        'price' => $validated['price'],
        'quantity' => $validated['quantity'],
        'total_amount' => $totalAmount,
        'sold_at' => $validated['sold_at'],
        'buyer_name' => $validated['buyer_name'],
        'payment_method' => $validated['payment_method'],
        'notes' => $validated['notes'],
    ]);

    // Update swine status to 'sold'
    Swine::where('id', $validated['swine_id'])->update(['status' => 'sold']);

    // Load the fresh data with relationships
    $directSale->load('swine');

    // Redirect to edit page with proper data
    return redirect()->route('marketplace.seller.direct-sale.edit', $directSale->id)
        ->with([
            'success' => 'Direct sale recorded successfully! You can now edit the sale details.',
            'directSale' => $directSale
        ]);
}

    /**
     * Show direct sale form
     */
    public function createDirectSale(Request $request)
{
    $user = $request->user();

    $availableSwine = Swine::where('owner_id', $user->id)
        ->where('status', 'active')
        ->doesntHave('listings')
        ->get();

    return Inertia::render('marketplace/seller/directsale', [
        'availableSwine' => $availableSwine,
        'selectedSwineIds' => $request->query('swine_ids', []),
        'authUser' => [
            'id' => $user->id,
            'role' => $user->role,
        ],
        // Pass any flash messages from redirects
       
    ]);
}

    /**
     * Show direct sale form (for edit)
     */
  public function editDirectSale($id)
{
    $directSale = DirectSale::with('swine')
        ->where('farmer_id', Auth::id())
        ->findOrFail($id);

    // Get available swine for editing (include the already sold swine)
    $availableSwine = Swine::where('owner_id', Auth::id())
        ->where('id', $directSale->swine_id)
        ->get();

    // Format the date properly
    $directSaleData = [
        'id' => $directSale->id,
        'swine_id' => $directSale->swine_id,
        'price' => (float) $directSale->price,
        'quantity' => (int) $directSale->quantity,
        'total_amount' => (float) $directSale->total_amount,
        'sold_at' => $directSale->sold_at->format('Y-m-d'),
        'buyer_name' => $directSale->buyer_name,
        'payment_method' => $directSale->payment_method,
        'notes' => $directSale->notes,
        'swine' => $directSale->swine ? [
            'id' => $directSale->swine->id,
            'name' => $directSale->swine->name,
            'tag_number' => $directSale->swine->tag_number,
            'sex' => $directSale->swine->sex,
            'birthdate' => $directSale->swine->birthdate,
            'breed_name' => $directSale->swine->breed_name,
            'category' => $directSale->swine->category,
            'status' => $directSale->swine->status,
        ] : null,
    ];

    return Inertia::render('marketplace/seller/directsale', [
        'directSale' => $directSaleData,
        'availableSwine' => $availableSwine,
        'selectedSwineIds' => [$directSale->swine_id],
        'authUser' => [
            'id' => Auth::id(),
            'role' => Auth::user()->role,
        ],
        'isEdit' => true,
    ]);
}

    /**
     * Store a new direct sale
     */
    // public function storeDirectSale(Request $request)
    // {
    //     $validated = $request->validate([
    //         'swine_id' => 'required|exists:swines,id',
    //         'price' => 'required|numeric|min:0',
    //         'quantity' => 'required|integer|min:1',
    //         'sold_at' => 'required|date',
    //         'buyer_name' => 'required|string|max:255',
    //         'payment_method' => 'required|string|in:cash,bank_transfer,check,mobile_payment',
    //         'notes' => 'nullable|string',
    //     ]);

    //     // Calculate total amount
    //     $totalAmount = $validated['price'] * $validated['quantity'];
        
    //     // Create the direct sale
    //     $directSale = DirectSale::create([
    //         'farmer_id' => Auth::id(),
    //         'swine_id' => $validated['swine_id'],
    //         'price' => $validated['price'],
    //         'quantity' => $validated['quantity'],
    //         'total_amount' => $totalAmount,
    //         'sold_at' => $validated['sold_at'],
    //         'buyer_name' => $validated['buyer_name'],
    //         'payment_method' => $validated['payment_method'],
    //         'notes' => $validated['notes'],
    //     ]);

    //     // Update swine status to 'sold'
    //     Swine::where('id', $validated['swine_id'])->update(['status' => 'sold']);

    //     return redirect()->route('marketplace.seller.listings')->with('success', 'Direct sale recorded successfully!');
    // }

    /**
     * Update an existing direct sale
     */
    public function updateDirectSale(Request $request, $id)
    {
        $directSale = DirectSale::where('farmer_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'sold_at' => 'required|date',
            'buyer_name' => 'required|string|max:255',
            'payment_method' => 'required|string|in:cash,bank_transfer,check,mobile_payment',
            'notes' => 'nullable|string',
        ]);

        // Calculate total amount
        $totalAmount = $validated['price'] * $validated['quantity'];
        
        // Update the direct sale
        $directSale->update([
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'total_amount' => $totalAmount,
            'sold_at' => $validated['sold_at'],
            'buyer_name' => $validated['buyer_name'],
            'payment_method' => $validated['payment_method'],
            'notes' => $validated['notes'],
        ]);
        return redirect()->back()->with('success', 'Direct sale updated successfully!');
    }

    /**
     * Delete a direct sale
     */
public function destroyDirectSale($id)
{
    $directSale = DirectSale::where('farmer_id', Auth::id())
        ->findOrFail($id);

    // Update swine status back to 'active'
    Swine::where('id', $directSale->swine_id)->update(['status' => 'active']);

    $directSale->delete();

    // Redirect to create page with success message
    return redirect()->route('marketplace.seller.direct-sale.create')
        ->with('success', 'Direct sale deleted successfully! The swine has been marked as available again.');
}
}
