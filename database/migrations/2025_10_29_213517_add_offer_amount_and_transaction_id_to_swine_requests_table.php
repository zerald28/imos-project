<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('swine_requests', function (Blueprint $table) {
            // Add new fields
            $table->decimal('offer_amount', 10, 2)->nullable()->after('type');
            $table->foreignId('transaction_id')->nullable()->constrained('marketplace_transactions')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('swine_requests', function (Blueprint $table) {
            $table->dropForeign(['transaction_id']);
            $table->dropColumn(['offer_amount', 'transaction_id']);
        });
    }
};
