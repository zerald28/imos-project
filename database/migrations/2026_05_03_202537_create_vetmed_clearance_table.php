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
        Schema::create('vetmed_clearances', function (Blueprint $table) {
            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Foreign Keys
            |--------------------------------------------------------------------------
            */

            // Seller / uploader
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Marketplace listing reference
         

            // Admin / verifier
            $table->foreignId('verified_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Clearance Information
            |--------------------------------------------------------------------------
            */

            $table->string('clearance_number')->nullable();
            $table->string('document_type')->default('Veterinary Clearance');

            $table->string('veterinarian_name')->nullable();
            $table->string('license_number')->nullable();
            $table->string('issued_by')->nullable();

            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();

            $table->text('remarks')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Uploaded File
            |--------------------------------------------------------------------------
            */

            $table->string('file_path')->nullable();
            $table->string('file_name')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Verification Status
            |--------------------------------------------------------------------------
            */

            $table->enum('status', [
                'pending_review',
                'verified',
                'rejected',
                'expired',
                'needs_revision'
            ])->default('pending_review');

            $table->timestamp('verified_at')->nullable();
            $table->text('rejection_reason')->nullable();

            $table->timestamps();
            $table->softDeletes();

            /*
            |--------------------------------------------------------------------------
            | Indexes
            |--------------------------------------------------------------------------
            */

           
            $table->index('user_id');
            $table->index('status');
            $table->index('expiry_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vetmed_clearances');
    }
};