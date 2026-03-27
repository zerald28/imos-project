    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('marketplace_transactions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('listing_id')->constrained('marketplace_listings')->onDelete('cascade');
                $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
                $table->decimal('amount', 10, 2);
                $table->unsignedInteger('quantity')->default(1);
                $table->timestamp('transaction_date')->default(now());
                $table->enum('state', [
            'pending_request',
            'seller_review',
            'seller_approved',
            'buyer_confirmed',
            'in_progress',
            'completed',
            'cancelled',
            'expired',
        ])->default('pending_request');
                $table->string('payment_method')->nullable(); // e.g., cash, gcash, bank_transfer, none
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('marketplace_transactions');
        }
    };
