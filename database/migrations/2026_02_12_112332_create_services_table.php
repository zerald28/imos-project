<?php

// File: database/migrations/2026_02_11_000000_create_services_table.php

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
        Schema::create('livestock_services', function (Blueprint $table) {

            $table->id();

            // Owner of the service (Farmer or Technician)
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade'); 
            // If user is deleted, their services are also deleted

            $table->string('title');
            $table->text('description');

            // Service category (MVP: string, later can normalize)
            $table->string('category')->index();

            $table->decimal('price', 10, 2);

            // Active toggle
            $table->boolean('is_active')->default(true);

            // Cached rating for performance
            $table->decimal('average_rating', 3, 2)->nullable();

            $table->timestamps();

            // Performance indexing
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
