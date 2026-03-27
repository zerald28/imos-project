<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PDF\LivestockInsuranceApplication;
use App\Models\PDF\LivestockAnimal;
use App\Models\User;

class LivestockInsuranceSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * -----------------------------------------------------
         * 1. Ensure Farmer Exists (or create a default one)
         * -----------------------------------------------------
         */
        $farmer = User::first() ?? User::factory()->create([
            'name' => 'Test Farmer',
            'email' => 'farmer@example.com',
            'password' => bcrypt('password'),
        ]);

        /**
         * -----------------------------------------------------
         * 2. Ensure Proponent Exists (and must NOT be the farmer)
         * -----------------------------------------------------
         */
        $proponent = User::where('id', '!=', $farmer->id)->first();

        if (!$proponent) {
            $proponent = User::factory()->create([
                'name' => 'Proponent User',
                'email' => 'proponent@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        /**
         * -----------------------------------------------------
         * 3. Cover type options
         * -----------------------------------------------------
         */
        $coverTypes = ['COMMERCIAL', 'NON-COMMERCIAL', 'SPECIAL'];

        /**
         * -----------------------------------------------------
         * 4. Create Main Livestock Insurance Application
         * -----------------------------------------------------
         */
        $application = LivestockInsuranceApplication::create([
            'farmer_id' => $farmer->id,
            'proponent' => $proponent->id,
            'cover_type' => $coverTypes[array_rand($coverTypes)],

            'is_indigenous' => true,
            'tribe' => 'Manobo',
            'is_pwd' => false,
            'spouse_name' => 'Maria Santos',

            'address' => 'Purok 2, Bunawan, Agusan del Sur',
            'farm_address' => 'Sitio Maligaya, Bunawan',
            'contact_no' => '09123456789',

            'animal_type' => 'Swine',
            'purpose' => 'Fattening',

            'source_of_stock' => 'Local Breeder',
            'no_of_housing_units' => 2,
            'birds_per_unit' => 0,

            'date_of_purchase' => now()->subDays(5),

            'desired_sum_insured' => 5000.00,
            'total_sum_insured' => 15000.00,

            'epidemic_1' => 'CSF',
            'epidemic_2' => 'ASF',
            'epidemic_3' => 'FMD',

            'assignee' => 'PCIC Region 13',
            'assignee_address' => 'Butuan City',
            'assignee_contact' => '09998887777',
        ]);

        /**
         * -----------------------------------------------------
         * 5. Livestock Animals (Preserved)
         * -----------------------------------------------------
         */
        LivestockAnimal::create([
            'application_id' => $application->id,
            'sex' => 'male',
            'age' => 6,
            'breed' => 'Large White',
            'ear_mark' => 'LW-001',
            'color' => 'Pink',
            'proof_of_ownership' => 'Purchase Receipt',
        ]);

        LivestockAnimal::create([
            'application_id' => $application->id,
            'sex' => 'female',
            'age' => 5,
            'breed' => 'Duroc',
            'ear_mark' => 'DR-112',
            'color' => 'Reddish Brown',
            'proof_of_ownership' => 'Transfer Certificate',
        ]);

        LivestockAnimal::create([
            'application_id' => $application->id,
            'sex' => 'female',
            'age' => 7,
            'breed' => 'Landrace',
            'ear_mark' => 'LR-221',
            'color' => 'White',
            'proof_of_ownership' => 'Veterinary Health Cert',
        ]);

        /**
         * -----------------------------------------------------
         * 6. Update head count based on animals (important)
         * -----------------------------------------------------
         */
        $application->updateHeadCount();

        /**
         * -----------------------------------------------------
         * 7. Final confirmation message
         * -----------------------------------------------------
         */
        $this->command->info('LivestockInsuranceSeeder executed successfully.');
    }
}
