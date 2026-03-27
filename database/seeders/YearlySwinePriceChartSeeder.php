<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Swine\Swine;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\ListingSwine;

class YearlySwinePriceChartSeeder extends Seeder
{
    public function run()
    {
        $batchId = (string) Str::uuid();
        $year = now()->year;

        // Remove previously seeded data for safe rerun
        Swine::whereNotNull('seeder_batch')->delete();
        MarketplaceListing::whereNotNull('seeder_batch')->delete();
        ListingSwine::whereNotNull('seeder_batch')->delete();

        $users = User::whereHas('userInformation')->get();

        foreach ($users as $user) {

            // Random starting month for 3-month intervals (1,2,3)
            $startMonth = rand(1, 3);

            for ($i = 0; $i < 4; $i++) { // 4 intervals per year
                $month = $startMonth + $i * 3;
                if ($month > 12) break;

                $listingDate = Carbon::create($year, $month, 15);

                /** ----------------- FATTTENING SWINE ----------------- **/
                $fatteningBirthdate = $listingDate->copy()->subMonths(4);

                $swine = Swine::create([
                    'owner_id' => $user->id,
                    'tag_number' => 'FAT-' . strtoupper(Str::random(6)),
                    'sex' => $i % 2 === 0 ? 'male' : 'female',
                    'birthdate' => $fatteningBirthdate,
                    'category' => $i % 2 === 0 ? 'barrow' : 'gilt', // ✅ valid enum
                    'purpose' => 'fattening',
                    'stage' => 'grower',
                    'status' => 'active',
                    'weight' => rand(60, 95),
                    'description' => 'Seeded fattening swine for price chart',
                    'seeder_batch' => $batchId,
                ]);

                $listing = MarketplaceListing::create([
                    'seller_id' => $user->id,
                    'title' => "Fattening Swine - {$listingDate->format('F Y')}",
                    'category' => 'fattening',
                    'description' => 'Auto-seeded listing',
                    'price_per_unit' => rand(180, 260),
                    'price_unit_type' => 'per_kg',
                    'available_quantity' => 1,
                    'seeder_batch' => $batchId,
                    ...MarketplaceListing::assignAddressFromUser($user),
                    'created_at' => $listingDate,
                ]);

                ListingSwine::create([
                    'listing_id' => $listing->id,
                    'swine_id' => $swine->id,
                    'seller_id' => $user->id,
                    'status' => 'available',
                    'seeder_batch' => $batchId,
                ]);

                /** ----------------- PIGLET SWINE ----------------- **/
                $pigletDaysOld = rand(30, 45);
                $pigletBirthdate = $listingDate->copy()->subDays($pigletDaysOld);

                $swine = Swine::create([
                    'owner_id' => $user->id,
                    'tag_number' => 'PIGLET-' . strtoupper(Str::random(6)),
                    'sex' => rand(0,1) ? 'male' : 'female',
                    'birthdate' => $pigletBirthdate,
                    'category' => 'piglet', // ✅ valid enum
                    'purpose' => 'sale_as_piglet',
                    'stage' => 'piglet',
                    'status' => 'active',
                    'weight' => rand(5, 15),
                    'description' => 'Seeded piglet for price chart',
                    'seeder_batch' => $batchId,
                ]);

                $listing = MarketplaceListing::create([
                    'seller_id' => $user->id,
                    'title' => "Piglet - {$listingDate->format('F Y')}",
                    'category' => 'piglet',
                    'description' => 'Auto-seeded piglet listing',
                    'price_per_unit' => rand(80, 150),
                    'price_unit_type' => 'per_kg',
                    'available_quantity' => 1,
                    'seeder_batch' => $batchId,
                    ...MarketplaceListing::assignAddressFromUser($user),
                    'created_at' => $listingDate,
                ]);

                ListingSwine::create([
                    'listing_id' => $listing->id,
                    'swine_id' => $swine->id,
                    'seller_id' => $user->id,
                    'status' => 'available',
                    'seeder_batch' => $batchId,
                ]);
            }
        }

        $this->command->info("Seeded yearly fattening + piglet price chart data (Batch: {$batchId})");
    }
}
