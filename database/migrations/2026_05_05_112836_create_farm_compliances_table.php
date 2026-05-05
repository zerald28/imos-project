<?php

// File: database/migrations/xxxx_xx_xx_create_farm_compliances_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('farm_compliances', function (Blueprint $table) {
            $table->id();

            // 🔗 User
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // 🪪 Registration (LFR)
            $table->string('registration_number')->nullable();
            $table->string('lgu_name')->nullable();
            $table->string('barangay_name')->nullable();
            $table->date('date_registered')->nullable();
            $table->date('valid_until')->nullable();

            // 🧪 Compliance checklist
            $table->boolean('has_septic_tank')->default(false);
            $table->boolean('has_drainage')->default(false);
            $table->boolean('proper_waste_disposal')->default(false);

            $table->decimal('distance_from_residence', 8, 2)->nullable();
            $table->boolean('meets_distance_requirement')->default(false);

            $table->boolean('has_proper_pen')->default(false);
            $table->boolean('has_biosecurity')->default(false);

            // 🧾 Verification
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
                'needs_revision'
            ])->default('pending');

            $table->text('remarks')->nullable();

            $table->foreignId('verified_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('verified_at')->nullable();

            $table->timestamps();

            $table->index('user_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farm_compliances');
    }
};