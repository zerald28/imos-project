<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Swine\Swine;
use App\Models\Marketplace\MarketplaceListing;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listingsToSeed = 5;      // total listings
        $maxSwinePerListing = 4;  // max swine per listing

        // 🧩 Ensure swine exist
        if (!DB::table('swine')->exists()) {
            $this->command->warn('⚠️ Please run SwineSeeder first.');
            return;
        }

        // 1️⃣ Get sellers with swine
        $sellers = User::has('swine')->take(3)->get();
        if ($sellers->isEmpty()) {
            $this->command->warn('⚠️ No users with swine found.');
            return;
        }

        $categories = ['breeder', 'piglet', 'fattening'];

        foreach ($sellers as $seller) {

            // 2️⃣ Select random swine for this seller
            $swineGroup = Swine::where('owner_id', $seller->id)
                ->inRandomOrder()
                ->take(rand(2, $maxSwinePerListing))
                ->get();

            if ($swineGroup->isEmpty()) continue;

            // 3️⃣ Breed summary
            $breedNames = $swineGroup->pluck('breed.name')->filter()->unique()->implode(', ');
            $breedNames = $breedNames ?: 'Mixed Breeds';

            // 4️⃣ Create listing
            $listing = MarketplaceListing::create([
                'seller_id' => $seller->id,
                'title' => 'Group of ' . $swineGroup->count() . ' Healthy Swine',
                'breed' => $breedNames,
                'description' => 'A fine group of ' . strtolower($breedNames) . ' pigs for sale by ' . $seller->name,
                'price_per_unit' => rand(5000, 10000),
                'price_unit_type' => 'per_head',
                'category' => $categories[array_rand($categories)],
                'image' => $this->getRandomImage(),
                'province_id' => DB::table('provinces')->inRandomOrder()->value('id'),
                'municipal_id' => DB::table('municipals')->inRandomOrder()->value('id'),
                'barangay_id' => DB::table('barangays')->inRandomOrder()->value('id'),
                'purok' => 'Purok ' . rand(1, 7),
                'street' => 'Street ' . rand(1, 10),
            ]);

            // 5️⃣ Attach swine with pivot attributes
            foreach ($swineGroup as $swine) {
                $ageInMonths = Carbon::parse($swine->birthdate)->diffInMonths(now());
                $estimatedWeight = $swine->weight ?? $this->estimateWeight($ageInMonths);

                $listing->swine()->attach($swine->id, [
                    'seller_id' => $seller->id,
                    'status' => 'available',
                    'scaled_weight' => $swine->weight,
                    'estimated_weight' => round($estimatedWeight, 2),
                    'sex' => $swine->sex,
                    'birthdate' => $swine->birthdate,
                    'breed' => $swine->breed->name ?? $swine->cuztom_breed ?? 'Unknown',
                    'thumbnail' => $swine->thumbnail ?? null,
                    'remarks' => 'Healthy pig for sale',
                    'is_reserved' => false,
                    'reserved_by' => null,
                    'reservation_expires_at' => null,
                    'da_approval_status' => 'approved',
                    'da_remarks' => 'Auto-approved for seeding',
                    'approved_by' => $seller->id,
                ]);
            }

            // 6️⃣ Sync aggregate attributes
            if (method_exists($listing, 'syncAggregateAttributes')) {
                $listing->syncAggregateAttributes();
            }

            $this->command->info("✅ Listing created for seller: {$seller->name} with {$swineGroup->count()} swine.");
        }

        $this->command->info('🎉 Marketplace listings and listing_swine seeded successfully!');
    }

    /**
     * Estimate weight based on age in months.
     */
    private function estimateWeight(int $ageInMonths): float
    {
        return match (true) {
            $ageInMonths <= 1 => 5,
            $ageInMonths <= 2 => 15,
            $ageInMonths <= 3 => 30,
            $ageInMonths <= 5 => 60,
            $ageInMonths <= 8 => 100,
            default => 120,
        };
    }

    /**
     * Get random image
     */
    private function getRandomImage(): string
    {
        $imageIndex = rand(1, 5);
        $path = public_path("storage/sample_swine_{$imageIndex}.jpg");

        return file_exists($path)
            ? "sample_swine_{$imageIndex}.jpg"
            : "default_swine.jpg";
    }
}
