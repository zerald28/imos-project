<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Add 'done' to the state enum
        DB::statement("ALTER TABLE marketplace_transactions MODIFY COLUMN state ENUM(
            'pending_request',
            'seller_review',
            'seller_approved',
            'buyer_confirmed',
            'in_progress',
            'completed',
            'done',
            'cancelled',
            'expired',
            'unavailable',
            'listing_deleted'
        ) DEFAULT 'pending_request'");
    }

    public function down(): void
    {
        // Remove 'done' from the state enum
        DB::statement("ALTER TABLE marketplace_transactions MODIFY COLUMN state ENUM(
            'pending_request',
            'seller_review',
            'seller_approved',
            'buyer_confirmed',
            'in_progress',
            'completed',
            'cancelled',
            'expired',
            'unavailable',
            'listing_deleted'
        ) DEFAULT 'pending_request'");
    }
};