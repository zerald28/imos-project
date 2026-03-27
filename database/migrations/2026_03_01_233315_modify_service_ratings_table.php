<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_ratings', function (Blueprint $table) {
            // Add booking_id column if it doesn't exist
            if (!Schema::hasColumn('service_ratings', 'booking_id')) {
                $table->foreignId('booking_id')
                    ->after('service_id')
                    ->constrained('service_bookings')
                    ->onDelete('cascade');
            }

            // Drop old unique constraint using native Laravel method
            // In Laravel 10+, you can use hasIndex() to check if an index exists
            if (Schema::hasIndex('service_ratings', 'service_ratings_service_id_reviewer_id_unique')) {
                $table->dropUnique('service_ratings_service_id_reviewer_id_unique');
            }

            // Add new unique constraint if it doesn't exist
            if (!Schema::hasIndex('service_ratings', 'service_ratings_booking_id_unique')) {
                $table->unique('booking_id', 'service_ratings_booking_id_unique');
            }
        });
    }

    public function down(): void
    {
        Schema::table('service_ratings', function (Blueprint $table) {
            // Drop the new unique constraint
            if (Schema::hasIndex('service_ratings', 'service_ratings_booking_id_unique')) {
                $table->dropUnique('service_ratings_booking_id_unique');
            }

            // Drop foreign key and column
            if (Schema::hasColumn('service_ratings', 'booking_id')) {
                $table->dropForeign(['booking_id']);
                $table->dropColumn('booking_id');
            }

            // Restore old unique constraint if it doesn't exist
            if (!Schema::hasIndex('service_ratings', 'service_ratings_service_id_reviewer_id_unique')) {
                $table->unique(['service_id', 'reviewer_id'], 'service_ratings_service_id_reviewer_id_unique');
            }
        });
    }
};