    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    use Illuminate\Support\Facades\DB;

    return new class extends Migration
    {
        public function up(): void
        {
            // First, modify the enum to include 'deleted'
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

            // Then modify the foreign key to set null on delete instead of cascade
            Schema::table('marketplace_transactions', function (Blueprint $table) {
                // Drop the existing foreign key
                $table->dropForeign(['listing_id']);
                
                // Make listing_id nullable
                $table->unsignedBigInteger('listing_id')->nullable()->change();
                
                // Add new foreign key with SET NULL on delete
                $table->foreign('listing_id')
                    ->references('id')
                    ->on('marketplace_listings')
                    ->onDelete('set null');
            });
        }

        public function down(): void
        {
            // Revert the foreign key changes
            Schema::table('marketplace_transactions', function (Blueprint $table) {
                $table->dropForeign(['listing_id']);
                $table->unsignedBigInteger('listing_id')->nullable(false)->change();
                $table->foreign('listing_id')
                    ->references('id')
                    ->on('marketplace_listings')
                    ->onDelete('cascade');
            });

            // Revert the enum
            DB::statement("ALTER TABLE marketplace_transactions MODIFY COLUMN state ENUM(
                'pending_request',
                'seller_review',
                'seller_approved',
                'buyer_confirmed',
                'in_progress',
                'completed',
                'cancelled',
                'expired'
            ) DEFAULT 'pending_request'");
        }
    };