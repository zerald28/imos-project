<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Swine\Swine;
use App\Models\Marketplace\MarketplaceListing;
use App\Models\Marketplace\ListingSwine;

class UndoSeederBatch extends Command
{
    protected $signature = 'seed:undo {batch}';
    protected $description = 'Undo seeded data by batch id';

    public function handle()
    {
        $batch = $this->argument('batch');

        ListingSwine::where('seeder_batch', $batch)->delete();
        MarketplaceListing::where('seeder_batch', $batch)->delete();
        Swine::where('seeder_batch', $batch)->delete();

        $this->info("Seeder batch {$batch} has been removed.");
    }
}
