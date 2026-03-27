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
       Schema::create('insurance_signatures', function (Blueprint $table) {
    $table->id();
    $table->foreignId('application_id')->constrained('livestock_insurance_applications')->onDelete('cascade');
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->string('signature')->nullable(); // allow saving positions first

    $table->integer('x')->default(0);
    $table->integer('y')->default(0);
    $table->integer('width')->default(200);
    $table->integer('height')->default(80);
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_signatures');
    }
};
