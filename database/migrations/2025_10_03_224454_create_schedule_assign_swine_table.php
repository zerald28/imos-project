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
       Schema::create('schedule_assign_swine', function (Blueprint $table) {
    $table->id();
    $table->foreignId('schedule_id')->constrained()->onDelete('cascade');
    $table->foreignId('swine_id')->nullable()->constrained('swine')->nullOnDelete(); // single swine, nullable if group
    $table->timestamps();

    $table->unique(['schedule_id', 'swine_id']); // prevents redundant assignment
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_assign_swine');
    }
};
