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
        Schema::create('events', function (Blueprint $table) {
                   $table->id();
            $table->string('title');
            $table->date('date');
            $table->enum('type', ['Regular', 'Special', 'da_program']);
            $table->boolean('is_global')->default(true); // always true for holidays/DA
             $table->integer('year'); // Year (for filtering)
              $table->foreignId('added_by')
          ->nullable()
          ->constrained('users')
          ->nullOnDelete();
            $table->time('start_time')->nullable(); // optional
          $table->time('end_time')->nullable();   // optional
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
