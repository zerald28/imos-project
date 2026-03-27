<?php

namespace App\Http\Controllers\Marketplace;

use App\Events\ImosNotificationCreated;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marketplace\MarketplaceListing;
use Inertia\Inertia;
use App\Models\Location\Barangay;
use App\Models\Location\Municipal;
use App\Models\Location\Province;
use App\Models\Marketplace\SwineRequest;
use App\Models\Swine\Swine;
use App\Models\Marketplace\MarketplaceTransaction;
use App\Models\MarketplaceConversation;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\CMS\BlogPost;
use App\Models\FarmerRating;
use App\Models\ImosNotification;

class MarketplaceController extends Controller
{
    
public function index(Request $request)
{
    $search = $request->input('search');
    $filters = $request->only([
        'province_id', 'municipal_id', 'barangay_id',
        'category', 'min_price', 'max_price'
    ]);

    $query = MarketplaceListing::query()
        ->with(['seller', 'seller.userInformation', 'province', 'municipal', 'barangay'])
        ->where('available_quantity', '>', 0);

    // 🚫 Exclude listings owned by the current user from DISPLAY only
    if (auth()->check()) {
        $query->where('seller_id', '!=', auth()->id());
    }

    $hasFilters = collect($filters)->filter(fn($v) => !empty($v))->isNotEmpty();

    // 🧭 FILTERING PRIORITY
    if ($hasFilters) {
        // ✅ Category mapping
        $category = strtolower($filters['category'] ?? '');
        if ($category) {
            if (in_array($category, ['piglet', 'baktin', 'bakten'])) {
                $categoryValues = ['piglet'];
            } elseif (in_array($category, ['fattening', 'karnehon', 'letchonon', 'karne'])) {
                $categoryValues = ['fattening'];
            } elseif (in_array($category, ['breeder', 'barako', 'butakal'])) {
                $categoryValues = ['breeder'];
            } else {
                $categoryValues = [$category];
            }

            $query->where(function ($q) use ($categoryValues) {
                foreach ($categoryValues as $value) {
                    $q->orWhereRaw('LOWER(category) LIKE ?', ['%' . strtolower($value) . '%']);
                }
            });
        }

        // ✅ Location filters
        if (!empty($filters['province_id'])) {
            $query->where('province_id', $filters['province_id']);
        }

        if (!empty($filters['municipal_id'])) {
            $query->where('municipal_id', $filters['municipal_id']);
        }

        if (!empty($filters['barangay_id'])) {
            $query->where('barangay_id', $filters['barangay_id']);
        }

        // ✅ Price range
        $minPrice = $filters['min_price'] ? (float) $filters['min_price'] : null;
        $maxPrice = $filters['max_price'] ? (float) $filters['max_price'] : null;

        if ($minPrice && $maxPrice) {
            $query->whereBetween('price_per_unit', [$minPrice, $maxPrice]);
        } elseif ($minPrice) {
            $query->where('price_per_unit', '>=', $minPrice);
        } elseif ($maxPrice) {
            $query->where('price_per_unit', '<=', $maxPrice);
        }

        // 🎯 Prioritize listings closest to min or max
        if ($minPrice || $maxPrice) {
            $target = $minPrice ?? $maxPrice;
            $query->orderByRaw("ABS(price_per_unit - ?) ASC", [$target]);
        }
    } 
    // 🔍 Fallback search
    elseif ($request->filled('search')) {
        $search = strtolower(trim($search));
        $query->where(function ($q) use ($search) {
            if (is_numeric($search)) {
                $q->where('price_per_unit', 'like', "%{$search}%")
                  ->orWhere('available_quantity', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            } else {
                $q->whereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(breed) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(category) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(age_range) LIKE ?', ["%{$search}%"])
                  ->orWhereHas('seller', fn($s) => $s->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]))
                  ->orWhereHas('province', fn($p) => $p->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]))
                  ->orWhereHas('municipal', fn($m) => $m->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]))
                  ->orWhereHas('barangay', fn($b) => $b->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]));
            }
        });

        $query->smartSearch($search);
    }

    // 🔹 FIXED LOCATION: Agusan del Sur / Bunawan
    $defaultProvince = Province::where('name', 'Agusan del Sur')->first();
    $defaultMunicipal = Municipal::where('name', 'Bunawan')->first();

    // Get the listings (EXCLUDING current user's listings)
    $limit = (int) $request->get('limit', 15);
    $offset = (int) $request->get('offset', 0);

    $countQuery = clone $query;

    $listings = $query
        ->orderBy('created_at', 'desc')
        ->skip($offset)
        ->take($limit)
        ->get();

    // ✅ Calculate GLOBAL stats (SAME for all users)
    // Total available swine count from ListingSwine with status 'available'
    $totalAvailableSwine = \App\Models\Marketplace\ListingSwine::where('status', 'available')
        ->whereHas('listing', function($query) {
            $query->where('available_quantity', '>', 0);
            // DO NOT exclude current user - show global count
        })
        ->count();
    
    // Total farmers with active listings (SAME for all users)
    $totalFarmers = User::whereHas('marketplaceListings', function($query) {
        $query->where('available_quantity', '>', 0);
        // DO NOT exclude current user - show global count
    })->count();

    // Calculate average ratings for each listing's seller
    foreach ($listings as $listing) {
        if ($listing->seller) {
            $listing->seller->average_rating = FarmerRating::getFarmerAverageRating($listing->seller->id);
            $listing->seller->total_ratings = FarmerRating::where('farmer_id', $listing->seller->id)->count();
            $listing->seller->formatted_rating = FarmerRating::getFormattedRating($listing->seller->id);
        }
    }

    if ($request->wantsJson()) {
        return response()->json([
            'props' => [
                'listings' => $listings,
                'hasMore' => $countQuery->count() > ($offset + $limit),
                'totalAvailableSwine' => $totalAvailableSwine,
                'totalFarmers' => $totalFarmers,
            ]
        ]);
    }

    return Inertia::render('marketplace/index', [
        'listings' => $listings,
        'hasMore' => $countQuery->count() > ($offset + $limit),
        'filters' => $filters,
        'search' => $search,
        'provinces' => $defaultProvince ? [$defaultProvince] : [],
        'municipals' => $defaultMunicipal ? [$defaultMunicipal] : [],
        'barangays' => Barangay::where('municipal_id', $defaultMunicipal->id ?? 0)->get(),
        'totalAvailableSwine' => $totalAvailableSwine,
        'totalFarmers' => $totalFarmers,
    ]);
}

public function show(Request $request, $id)
{
    $listing = \App\Models\Marketplace\MarketplaceListing::with([
        'province',
        'municipal',
        'barangay',
        'listingSwine',
        'seller.profile',
        'photos',
    ])->findOrFail($id);

    // ✅ Redirect if owner
    if (auth()->check() && $listing->seller_id === auth()->id()) {
        $firstSwine = $listing->listingSwine()->first();
        if ($firstSwine) {
            return redirect()->route('swine.show', ['id' => $firstSwine->swine_id]);
        }
        return redirect()->route('swine.index')->with('info', 'You are viewing your own listing.');
    }

    // ✅ Check if authenticated user has profile (user_information)
      // ✅ Check if authenticated user has profile (user_information)
    if (auth()->check()) {
        $user = \App\Models\User::with('profile')->find(auth()->id());

        // 🔒 If no profile, redirect to create info page
        if (!$user->profile) {
            // 🧠 Store the current URL so we can redirect back later
            session(['intended_url' => url()->current()]);

            return redirect()
                ->route('marketplace.seller.profile.edit')
                ->with('warning', 'Please complete your profile before viewing marketplace listings.');
        }
    }

    // ✅ Format full address
    $listing->full_address = collect([
        $listing->street,
        $listing->purok,
        optional($listing->barangay)->name,
        optional($listing->municipal)->name,
        optional($listing->province)->name,
    ])->filter()->join(', ');

    // ✅ Available swine under this seller
    $availableSwine = \App\Models\Swine\Swine::where('owner_id', $listing->seller_id)
        ->where('status', 'active')
        ->get();

    // ✅ Buyer info (with profile)
    $buyer = null;
    if (auth()->check()) {
        $user = \App\Models\User::with(['profile.province', 'profile.municipal', 'profile.barangay'])
            ->find(auth()->id());

        $profile = $user->profile;
        $fullName = '';
        if ($profile) {
            $fullName = trim(collect([
                $profile->firstname ?? '',
                $profile->middlename ?? '',
                $profile->lastname ?? ''
            ])->filter()->join(' '));
        }
        if (empty($fullName)) $fullName = $user->name;

        $address = null;
        if ($profile) {
            $address = collect([
                $profile->street ?? null,
                $profile->purok ?? null,
                optional($profile->barangay)->name,
                optional($profile->municipal)->name,
                optional($profile->province)->name,
            ])->filter()->join(', ');
        }

        $buyer = [
            'id' => $user->id,
            'name' => $fullName,
            'email' => $user->email,
            'contact' => $profile->contact ?? '',
            'address' => $address,
        ];
    }

    $listing->gallery_images = $listing->photos->map(fn($p) => $p->path)->toArray();
    $listing->gallery_image_ids = $listing->photos->pluck('id')->toArray();

    return \Inertia\Inertia::render('marketplace/show', [
        'listing' => $listing,
        'availableSwine' => $availableSwine,
        'buyer' => $buyer,
    ]);
}

 protected function createNewRequestNotification($transaction, $quantity, $buyerName, $listingTitle)
    {
        $notification = ImosNotification::create([
            'user_id'  => $transaction->seller_id,
            'actor_id' => $transaction->buyer_id,
            'type'     => 'swine_request',
            'action'   => 'created',
            'message'  => "{$buyerName} requested {$quantity} swine from your listing '{$listingTitle}'",
            'url'      => "/marketplace/transaction/{$transaction->id}/setup",
        ]);
        
        event(new ImosNotificationCreated($notification));
        
        return $notification;
    }
    
    /**
     * Create a notification for adding more swine to an existing transaction
     */
    protected function createAdditionalRequestNotification($transaction, $additionalCount, $buyerName, $listingTitle)
    {
        $notification = ImosNotification::create([
            'user_id'  => $transaction->seller_id,
            'actor_id' => $transaction->buyer_id,
            'type'     => 'swine_request',
            'action'   => 'updated',
            'message'  => "{$buyerName} added {$additionalCount} more swine to their request for '{$listingTitle}'",
            'url'      => "/marketplace/transaction/{$transaction->id}/setup",
        ]);
        
        event(new ImosNotificationCreated($notification));
        
        return $notification;
    }

   public function storeRequest(Request $request)
{
    $validated = $request->validate([
        'listing_id' => 'required|exists:marketplace_listings,id',
        'selected_swine_ids' => 'required|array|min:1',
        'selected_swine_ids.*' => 'exists:listing_swine,id',
        'buyer_id' => 'required|exists:users,id',
        'contact' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'address' => 'nullable|string|max:255',
        'type' => 'required|in:purchase,reservation',
        'offer_amount' => 'nullable|numeric|min:0',
        'message' => 'nullable|string|max:1000',
    ]);

    return DB::transaction(function () use ($validated) {
        $buyer = User::with('profile')->findOrFail($validated['buyer_id']);
        $profile = $buyer->profile;

        $contact = $profile->contact ?? $validated['contact'];
        $email = $profile->email ?? $validated['email'];
        $address = $profile->address ?? $validated['address'];

        if (!$contact || !$email || !$address) {
            return response()->json([
                'message' => 'Please provide missing contact, email, or address information.'
            ], 422);
        }

        // Retrieve listing and seller
        $listing = MarketplaceListing::findOrFail($validated['listing_id']);
        $sellerId = $listing->seller_id;

        // Compute quantities
        $quantity = count($validated['selected_swine_ids']);
        $offerAmount = $validated['offer_amount'] ?? null;

        // Check for existing approved/in-progress requests
        $existingRequests = SwineRequest::whereIn('listing_swine_id', $validated['selected_swine_ids'])
            ->where('buyer_id', $buyer->id)
            ->whereIn('status', ['approved', 'in_progress'])
            ->pluck('listing_swine_id')
            ->toArray();

        if (!empty($existingRequests)) {
            return response()->json([
                'message' => 'Some swine are already being processed in your requests.',
                'swine_ids' => $existingRequests
            ], 422);
        }

        // Check for existing pending request
        $existingRequest = SwineRequest::whereIn('listing_swine_id', $validated['selected_swine_ids'])
                                ->where('buyer_id', $buyer->id)
                                ->first();

        $isNewTransaction = false;
        $additionalCount = 0;
        $newRequestsCount = 0;

        if ($existingRequest) {
            $transaction = MarketplaceTransaction::findOrFail($existingRequest->transaction_id);
            $oldType = $existingRequest->type;

            if ($oldType === $validated['type']) {
                // Same type: update existing transaction
                $existingSwineIds = $transaction->swineRequest()->pluck('listing_swine_id')->toArray();
                $newSwineIds = array_diff($validated['selected_swine_ids'], $existingSwineIds);
                $additionalCount = count($newSwineIds);

                $transaction->update([
                    'quantity' => $transaction->quantity + $additionalCount,
                    'amount' => 0, // Reset to 0, will be calculated at finalization
                ]);
                
                $newRequestsCount = $additionalCount;
            } else {
                // Different type: create a new transaction for new request
                $newTransaction = MarketplaceTransaction::create([
                    'listing_id' => $listing->id,
                    'buyer_id' => $buyer->id,
                    'seller_id' => $sellerId,
                    'price_per_unit' => $listing->price_per_unit,
                    'price_unit_type' => $listing->price_unit_type,
                    'amount' => 0,
                    'quantity' => $quantity,
                    'state' => 'pending_request',
                    'transaction_date' => now(),
                ]);

                // Update old transaction quantity
                $oldTransactionSwineIds = SwineRequest::where('transaction_id', $transaction->id)
                                            ->pluck('listing_swine_id')
                                            ->toArray();

                $swineMoving = array_intersect($oldTransactionSwineIds, $validated['selected_swine_ids']);

                $transaction->update([
                    'quantity' => $transaction->quantity - count($swineMoving),
                    'amount' => 0,
                ]);

                $transaction = $newTransaction;
                $isNewTransaction = true;
                $newRequestsCount = $quantity;
            }
        } else {
            // No existing request: create a new transaction
            $transaction = MarketplaceTransaction::create([
                'listing_id' => $listing->id,
                'buyer_id' => $buyer->id,
                'seller_id' => $sellerId,
                'price_per_unit' => $listing->price_per_unit,
                'price_unit_type' => $listing->price_unit_type,
                'amount' => 0,
                'quantity' => $quantity,
                'state' => 'pending_request',
                'transaction_date' => now(),
            ]);
            
            $isNewTransaction = true;
            $newRequestsCount = $quantity;
        }

        // Create or update swine requests
        foreach ($validated['selected_swine_ids'] as $swineId) {
            SwineRequest::updateOrCreate(
                [
                    'listing_swine_id' => $swineId,
                    'buyer_id' => $buyer->id,
                ],
                [
                    'contact' => $contact,
                    'email' => $email,
                    'address' => $address,
                    'type' => $validated['type'],
                    'offer_amount' => $offerAmount,
                    'transaction_id' => $transaction->id,
                    'status' => 'pending',
                ]
            );
        }

        // Create appropriate notification(s) based on what happened
        if ($isNewTransaction) {
            // New transaction: create one notification with total quantity
            $this->createNewRequestNotification(
                $transaction, 
                $newRequestsCount, 
                $buyer->name, 
                $listing->title
            );
        } elseif ($additionalCount > 0) {
            // Added more swine to existing transaction
            $this->createAdditionalRequestNotification(
                $transaction, 
                $additionalCount, 
                $buyer->name, 
                $listing->title
            );
        }

        // ❌ REMOVED: All conversation and message logic
        // The following code has been removed:
        // - Conversation creation/retrieval
        // - MarketplaceConversation creation
        // - Message creation

        return response()->json([
            'message' => ucfirst($validated['type']) . ' request successfully sent.',
            'transaction_id' => $transaction->id,
            'is_new_transaction' => $isNewTransaction,
            'additional_count' => $additionalCount,
        ], 201);
    });
}

    
public function getListingWithRequestedSwine($listingId)
{
    $buyerId = auth()->id();

    $listing = MarketplaceListing::with('listing_swine')->findOrFail($listingId);

    // Get all swine IDs already requested by this buyer and active
    $alreadyRequestedSwineIds = SwineRequest::whereIn('status', ['pending', 'approved', 'in_progress'])
        ->where('buyer_id', $buyerId)
        ->pluck('listing_swine_id')
        ->toArray();

    return response()->json([
        'listing' => $listing,
        'alreadyRequestedSwineIds' => $alreadyRequestedSwineIds,
    ]);
}

 public function getSwineRequests($listingId)
    {
        $buyerId = auth()->id(); // get currently logged-in buyer

        $requests = SwineRequest::where('buyer_id', $buyerId)
            ->whereHas('listingSwine', function ($q) use ($listingId) {
                $q->where('listing_id', $listingId);
            })
            ->get(['listing_swine_id', 'transaction_id', 'type', 'offer_amount', 'created_at']);

        return response()->json($requests);
    }

  public function showProfile($id)
{
    $viewerId = auth()->id();

    $user = User::with([
        'userInformation',
        'userInformation.province',
        'userInformation.municipal',
        'userInformation.barangay',
        'marketplaceListings.listingSwine',
    ])->findOrFail($id);

    $isOwner = $viewerId === $user->id;

    // ---------------------------------------
    // Get rating information for the farmer
    // ---------------------------------------
    $averageRating = \App\Models\FarmerRating::getFarmerAverageRating($user->id);
    $totalRatings = \App\Models\FarmerRating::where('farmer_id', $user->id)->count();
    $formattedRating = \App\Models\FarmerRating::getFormattedRating($user->id);
    
    // Get rating distribution
    $ratingDistribution = \App\Models\FarmerRating::getRatingDistribution($user->id);
    
    // Get recent ratings for this farmer
    $recentRatings = \App\Models\FarmerRating::with(['rater', 'transaction'])
        ->where('farmer_id', $user->id)
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($rating) {
            return [
                'id' => $rating->id,
                'rating' => $rating->rating,
                'comment' => $rating->comment,
                'created_at' => $rating->created_at,
                'rater_name' => $rating->rater->name,
                'transaction_id' => $rating->transaction_id,
            ];
        });

    // ---------------------------------------
    // Compute full name from user information
    // ---------------------------------------
    $fullName = '';
    $fullAddress = 'No address available';
    
    if ($user->userInformation) {
        // Build full name
        $nameParts = [];
        if ($user->userInformation->firstname) $nameParts[] = $user->userInformation->firstname;
        if ($user->userInformation->middlename) $nameParts[] = $user->userInformation->middlename;
        if ($user->userInformation->lastname) $nameParts[] = $user->userInformation->lastname;
        if ($user->userInformation->extension) $nameParts[] = $user->userInformation->extension;
        
        $fullName = implode(' ', $nameParts);
        
        // Build full address
        $addressParts = [];
        if ($user->userInformation->street) $addressParts[] = $user->userInformation->street;
        if ($user->userInformation->purok) $addressParts[] = 'Purok ' . $user->userInformation->purok;
        if ($user->userInformation->barangay) $addressParts[] = $user->userInformation->barangay->name;
        if ($user->userInformation->municipal) $addressParts[] = $user->userInformation->municipal->name;
        if ($user->userInformation->province) $addressParts[] = $user->userInformation->province->name;
        
        if (!empty($addressParts)) {
            $fullAddress = implode(', ', $addressParts);
        }
    }

    // ---------------------------------------
    // Shared Transactions (viewer ↔ profile)
    // ---------------------------------------
    $sharedTransactions = \App\Models\Marketplace\MarketplaceTransaction::with([
        'listing:id,title,price_per_unit',
        'buyer:id,name',
        'seller:id,name',
    ])
    ->betweenUsers($viewerId, $user->id)
    ->latest()
    ->get()
    ->map(function ($tx) use ($viewerId) {
        return [
            'id' => $tx->id,
            'amount' => $tx->amount,
            'state' => $tx->state,
            'transaction_date' => $tx->transaction_date,
            'listing' => $tx->listing,
            'buyer_id' => $tx->buyer_id,
            'seller_id' => $tx->seller_id,
            'viewer_role' => $viewerId === $tx->buyer_id ? 'buyer' : 'seller',
        ];
    });

    $sharedSummary = $sharedTransactions
        ->groupBy('state')
        ->map(fn ($items) => $items->count());

    // ---------------------------------------
    // Owner-only stats (existing logic)
    // ---------------------------------------
    $transactionSummary = [];
    $totalTransactions = 0;
    $totalRequests = 0;

    if ($isOwner) {
        $states = [
            'pending_request',
            'seller_review',
            'seller_approved',
            'buyer_confirmed',
            'in_progress',
            'completed',
            'done',
            'cancelled',
            'expired',
        ];

        foreach ($states as $state) {
            $transactionSummary[ucwords(str_replace('_', ' ', $state))] =
                $user->transactions()->where('state', $state)->count();
        }

        $totalTransactions = array_sum($transactionSummary);
        $totalRequests = $user->swineRequest()->count();
    }

    $farmerBlogs = BlogPost::query()
        ->where('author_id', $user->id)
        ->where('status', 'published')
        ->latest('updated_at')
        ->select([
            'id',
            'title',
            'slug',
            'updated_at',
        ])
        ->get();

    return inertia('marketplace/showProfile', [
        'user' => $user,
        'fullName' => $fullName,
        'fullAddress' => $fullAddress,
        'isOwner' => $isOwner,
        // Owner
        'transactionSummary' => $transactionSummary,
        'totalTransactions' => $totalTransactions,
        'totalRequests' => $totalRequests,
        // Visitor
        'sharedTransactions' => $sharedTransactions,
        'sharedSummary' => $sharedSummary,
        'viewerId' => $viewerId,
        'farmerBlogs' => $farmerBlogs,
        // Rating data
        'averageRating' => $averageRating ? round($averageRating, 1) : null,
        'totalRatings' => $totalRatings,
        'formattedRating' => $formattedRating,
        'ratingDistribution' => $ratingDistribution,
        'recentRatings' => $recentRatings,
    ]);
}


    public function showOwn()
{
    $user = auth()->user();

    return $this->showProfile($user->id); // reuse the same show() logic
}

}
