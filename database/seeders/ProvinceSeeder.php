<?php
// File: database/seeders/ProvinceSeeder.php
// File: database/seeders/ProvinceSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location\Province;
use App\Models\Location\Municipal;
use App\Models\Location\Barangay;

class ProvinceSeeder extends Seeder
{
    public function run(): void
    {
        // Create Province
        $province = Province::create(['name' => 'Agusan del Sur']);

        // Municipalities & Barangays
        $data = [
            'Bayugan City' => [
                "Berseba","Bucac","Cagbas","Calaitan","Canayugan","Charito","Claro Cortez","Fili",
                "Gamao","Getsemane","Grace Estate","Hamogaway","Katipunan","Mabuhay","Magkiangkang",
                "Mahayag","Marcelina","Maygatasan","Montivesta","Mt. Ararat","Mt. Carmel","Mt. Olive",
                "New Salem","Noli","Osmeña","Panaytay","Pinagalaan","Poblacion","Sagmone","Saguma",
                "Salvacion","San Agustin","San Isidro","San Juan","Santa Irene","Santa Teresita",
                "Santo Niño","Taglatawan","Taglibas","Tagubay","Verdu","Villa Undayon","Wawa",
            ],
            'Bunawan' => [
                "Brook","Consuelo","Imelda","Libertad","Mambalili","Nueva Era",
                "Poblacion","San Andres","San Marcos","San Teodoro",
            ],
            'Esperanza' => [
                "Agsabu","Aguinaldo","Anolingan","Bakingking","Balubo","Bentahon","Bunaguit","Catmonon",
                "Cebulan","Concordia","Crossing Luna","Cubo","Dakutan","Duangan","Guadalupe","Guibonon",
                "Hawilian","Kalabuan"
                // continue the remaining barangays if available
            ],
            'La Paz' => [
                "Angeles","Bataan","Comota","Halapitan","Kasapa II","Langasian","Lydia","Osmeña, Sr.",
                "Panagangan","Poblacion","Sabang Adgawan","Sagunto","San Patricio","Valentina","Villa Paz",
            ],
            'Loreto' => [
                "Binucayan","Johnson","Kasapa","Katipunan","Kauswagan","Magaud","Nueva Gracia",
                "Poblacion","Sabud","San Isidro","San Mariano","San Vicente","Santa Teresa",
                "Santo Niño","Santo Tomas","Violanta","Waloe",
            ],
            'Prosperidad' => [],
            'Rosario' => [
                "Marfil","Novele","Poblacion","Santa Cruz"
                // add rest later
            ],
            'San Francisco' => [
                "Alegria","Barangay 1 (Poblacion)","Barangay 2 (Poblacion)","Barangay 3 (Poblacion)",
                "Barangay 4 (Poblacion)","Barangay 5 (Poblacion)","Bayugan 2","Bitan-agan","Borbon",
                "Buenasuerte","Caimpugan","Das-agan","Ebro","Hubang","Karaos","Lapinigan","Lucac",
                "Mate","New Visayas","Ormaca","Pasta","Pisa-an","Rizal","San Isidro","Santa Ana","Tagapua"
                // total should be 27; you can add missing
            ],
            'San Luis' => [],
            'Santa Josefa' => [],
            'Sibagat' => [],
            'Talacogon' => [],
            'Trento' => [],
            'Veruela' => [],
        ];

        // Insert municipalities and barangays
        foreach ($data as $municipalName => $barangays) {
            $municipal = Municipal::create([
                'province_id' => $province->id,
                'name' => $municipalName,
            ]);

            foreach ($barangays as $barangayName) {
                Barangay::create([
                    'municipal_id' => $municipal->id,
                    'name' => $barangayName,
                ]);
            }
        }
    }
}
