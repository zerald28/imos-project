<?php

namespace App\Services;

use App\Models\Marketplace\SwineRequest;
use App\Models\Marketplace\ListingSwine;
use App\Models\Marketplace\MarketplaceListing;
use Carbon\Carbon;

class SellerDashboardService
{
    public function getRequests($sellerId)
    {
        return SwineRequest::with(['buyer', 'listingSwine'])
            ->whereHas('listingSwine', fn($q) => $q->where('seller_id', $sellerId))
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->id,
                    'buyer_name' => $r->buyer?->name,
                    'contact' => $r->contact,
                    'type' => ucfirst($r->type),
                    'status' => $r->status,
                    'buy_total' => $r->type === 'buy' ? ($r->quantity ?? 1) : 0,
                    'reservation_total' => $r->type === 'reserve' ? ($r->quantity ?? 1) : 0,
                ];
            });
    }

    public function getListingSwine($sellerId)
    {
        return ListingSwine::with(['swine', 'listing', 'transactions'])
            ->where('seller_id', $sellerId)
            ->get()
            ->map(function ($ls) {
                $birthdateDays = $ls->birthdate ? Carbon::parse($ls->birthdate)->diffInDays() : null;
                return [
                    'id' => $ls->id,
                    'tag_number' => $ls->swine?->tag_number ?? 'N/A',
                    'listing_id' => $ls->listing_id,
                    'sex' => ucfirst($ls->sex),
                    'breed' => $ls->breed,
                    'age_days' => $birthdateDays ? "{$birthdateDays} days" : '—',
                    'weight' => $ls->scaled_weight ?? $ls->estimated_weight,
                    'price' => $ls->listing?->price_per_unit . ' / ' . $ls->listing?->price_unit_type,
                    'total_buy' => $ls->transactions->where('state', 'completed')->sum('quantity'),
                    'total_reservation' => $ls->transactions->where('state', 'reserved')->sum('quantity'),
                ];
            });
    }

    public function getListings($sellerId)
    {
        return MarketplaceListing::withCount(['listingSwine', 'transactions'])
            ->where('seller_id', $sellerId)
            ->get(['id', 'title', 'description', 'available_quantity'])
            ->map(function ($listing) {
                return [
                    'id' => $listing->id,
                    'title' => $listing->title,
                    'description' => $listing->description,
                    'quantity' => $listing->available_quantity,
                    'total_swine' => $listing->listing_swine_count,
                    'total_transactions' => $listing->transactions_count,
                ];
            });
    }
}
