<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1️⃣ Convert ENUM to VARCHAR temporarily
        DB::statement("
            ALTER TABLE livestock_insurance_applications
            MODIFY status VARCHAR(50)
        ");

        // 2️⃣ Map OLD statuses to NEW ones
        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'submitted'
            WHERE status = 'pending'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'reviewed'
            WHERE status = 'for_review'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'completed'
            WHERE status = 'approved'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'incomplete'
            WHERE status IN ('rejected', 'cancelled')
        ");

        // 3️⃣ Convert back to ENUM (clean data now)
        DB::statement("
            ALTER TABLE livestock_insurance_applications
            MODIFY status ENUM(
                'submitted',
                'reviewed',
                'completed',
                'incomplete'
            ) NOT NULL DEFAULT 'submitted'
        ");
    }

    public function down(): void
    {
        // revert ENUM back
        DB::statement("
            ALTER TABLE livestock_insurance_applications
            MODIFY status VARCHAR(50)
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'pending'
            WHERE status = 'submitted'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'for_review'
            WHERE status = 'reviewed'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'approved'
            WHERE status = 'completed'
        ");

        DB::statement("
            UPDATE livestock_insurance_applications
            SET status = 'rejected'
            WHERE status = 'incomplete'
        ");

        DB::statement("
            ALTER TABLE livestock_insurance_applications
            MODIFY status ENUM(
                'pending',
                'for_review',
                'approved',
                'rejected',
                'cancelled'
            ) NOT NULL DEFAULT 'pending'
        ");
    }
};
