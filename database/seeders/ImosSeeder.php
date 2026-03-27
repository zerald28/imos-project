<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserInformation;
use App\Models\Swine\Swine;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ImosSeeder extends Seeder
{
    public function run(): void
    {
        // -----------------------------
        // 0. Clear tables before seeding
        // -----------------------------
   DB::table('listing_swine')->delete(); // delete dependent rows first
DB::table('swine')->delete();         // then swine
DB::table('user_informations')->delete();
DB::table('users')->delete();


        // -----------------------------
        // 1. Config
        // -----------------------------
        $numberOfUsers = 20;           // Total farmers to create
        $barangays = range(44, 53);    // Barangay IDs (unique cycle)
        $validCategories = ['barrow', 'gilt', 'boar', 'sow', 'piglet'];
        $validPurposes   = ['fattening', 'slaughter', 'sale_as_piglet', 'breeding_sow', 'breeding_boar', 'undecided'];

        // -----------------------------
        // 2. Create Users
        // -----------------------------
        for ($i = 0; $i < $numberOfUsers; $i++) {

            $barangayId = $barangays[$i % count($barangays)]; // cycle through barangays

            // Create user
            $user = User::create([
                'name'     => "Farmer {$i}",
                'email'    => "farmer{$i}@imos.test",
                'password' => Hash::make('password123'),
                'role'     => 'farmer',
            ]);

            // Create user information
            UserInformation::create([
                'user_id'      => $user->id,
                'firstname'    => "Farmer{$i}",
                'middlename'   => "M",
                'lastname'     => "Test{$i}",
                'contact'      => "0912345678" . str_pad($i, 2, '0', STR_PAD_LEFT),
                'birthdate'    => now()->subYears(25 + $i)->format('Y-m-d'),
                'gender'       => 'male',
                'civil_status' => 'single',
                'occupation'   => 'Farmer',
                'province_id'  => 1,
                'municipal_id' => 2,       // Bunawan
                'barangay_id'  => $barangayId,
                'purok'        => "Purok {$i}",
                'street'       => "Street {$i}",
            ]);

            // -----------------------------
            // 3. Create 2 Swine per User
            // -----------------------------
            for ($j = 1; $j <= 2; $j++) {
                Swine::create([
                    'owner_id'   => $user->id,
                    'tag_number' => "TAG-{$user->id}-{$j}",
                    'sex'        => $j % 2 === 0 ? 'female' : 'male',
                    'birthdate'  => now()->subMonths(rand(2, 10))->format('Y-m-d'),
                    'breed_id'   => 1, // make sure this exists in your breeds table
                    'category'   => $validCategories[array_rand($validCategories)],
                    'purpose'    => $validPurposes[array_rand($validPurposes)],
                    'weight'     => rand(30, 90),
                    'stage'      => 'Grower',  // safe VARCHAR
                    'status'     => 'active',
                    'description'=> "Swine {$j} for farmer {$i}",
                ]);
            }
        }
    }
}
