<?php
namespace App\Services\Marketplace;

use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\ListingSwine;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;

/**
 * ListingService
 * - Responsible for the complex flows around adding/removing swine to a listing.
 * - Uses transactions + row locking to prevent races (oversell / double-add).
 */
class ListingService
{
    /**
     * Add multiple swine to a listing in an atomic, row-locked transaction.
     *
     * @param MarketplaceListing $listing
     * @param array $swineIds
     * @param int $sellerId
     * @return array created ListingSwine models
     * @throws Exception
     */
    public function addSwineToListing(MarketplaceListing $listing, array $swineIds, int $sellerId): array
    {
        return DB::transaction(function () use ($listing, $swineIds, $sellerId) {
            $created = [];

            // Lock selected swine rows to prevent other transactions from adding same swine
            $swineRows = Swine::whereIn('id', $swineIds)
                ->lockForUpdate() // SELECT ... FOR UPDATE
                ->get();

            // Validate all swine belong to seller and have status 'active'
            foreach ($swineRows as $sw) {
                if ($sw->owner_id !== $sellerId && $sw->user_id !== $sellerId) {
                    // some projects may use owner_id or user_id; check both just-in-case
                    throw new Exception("Swine id {$sw->id} does not belong to seller.");
                }

                // Ensure not already listed. We assume Swine has 'status' column; change if different.
                if ($sw->status !== 'active') {
                    throw new Exception("Swine id {$sw->id} is not active (current: {$sw->status}).");
                }
            }

            foreach ($swineRows as $sw) {
                // create pivot entry
                $ls = ListingSwine::create([
                    'listing_id' => $listing->id,
                    'seller_id' => $sellerId,
                    'swine_id' => $sw->id,
                    'status' => 'available',
                    'sex' => $sw->sex ?? null,
                    'birthdate' => $sw->birthdate ?? null,
                    'breed' => $sw->breed_name ?? null,
                    'thumbnail' => $sw->thumbnail ?? null,
                ]);

                // mark swine as 'in_listing' to prevent re-using
                $sw->update(['status' => 'in_listing']);

                $created[] = $ls;

                // update listing aggregates (one-by-one or call outside loop)
                $listing->available_quantity = $listing->available_quantity + 1;
            }

            $listing->save();

            // sync aggregated attributes (breed, sex summary, age_range) - method exists on model
            $listing->syncAggregateAttributes();

            return $created;
        });
    }

    /**
     * Remove a ListingSwine entry and revert swine status back to 'active'.
     *
     * @param ListingSwine $listingSwine
     * @return void
     */
    public function removeSwineFromListing(ListingSwine $listingSwine): void
    {
        DB::transaction(function () use ($listingSwine) {
            $sw = Swine::lockForUpdate()->find($listingSwine->swine_id);

            if ($sw) {
                $sw->update(['status' => 'active']);
            }

            // decrease listing quantity
            $listing = $listingSwine->listing;
            if ($listing && $listing->available_quantity > 0) {
                $listing->available_quantity = max(0, $listing->available_quantity - 1);
                $listing->save();
            }

            $listingSwine->delete();

            $listing?->syncAggregateAttributes();
        });
    }
}
