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
        /**
         * Provinces table
         */
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        /**
         * Municipals table
         */
        Schema::create('municipals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('province_id');
            $table->string('name');
            $table->timestamps();

            // Relations
            $table->foreign('province_id')
                ->references('id')->on('provinces')
                ->onDelete('cascade');
        });

        /**
         * Barangays table
         */
        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('municipal_id');
            $table->string('name');
            $table->timestamps();

            // Relations
            $table->foreign('municipal_id')
                ->references('id')->on('municipals')
                ->onDelete('cascade');
        });

        /**
         * User Information table
         */
        Schema::create('user_informations', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->primary(); // PK & FK
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('lastname');
            $table->string('extension')->nullable();
            $table->string('contact')->nullable();
            $table->date('birthdate')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('civil_status')->nullable();
            $table->string('occupation')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('status')->default('active');

            // Address relations
            $table->unsignedBigInteger('province_id')->nullable();
            $table->unsignedBigInteger('municipal_id')->nullable();
            $table->unsignedBigInteger('barangay_id')->nullable();
            $table->string('purok')->nullable();
            $table->string('street')->nullable();

            $table->timestamps();
            $table->softDeletes(); // ✅ add deleted_at

            // Foreign keys
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade'); // still keep cascade for hard deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_informations');
        Schema::dropIfExists('barangays');
        Schema::dropIfExists('municipals');
        Schema::dropIfExists('provinces');
    }
};
