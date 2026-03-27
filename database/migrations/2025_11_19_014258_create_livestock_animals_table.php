<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('livestock_animals', function (Blueprint $table) {
    $table->id();

    $table->foreignId('application_id')
          ->constrained('livestock_insurance_applications')
          ->onDelete('cascade');

    // Changed: these are not counts, they describe the animal
    $table->enum('sex', ['male', 'female'])->nullable();

    $table->integer('age')->nullable();
    $table->string('breed')->nullable();
    $table->string('ear_mark')->nullable();
    $table->string('color')->nullable();
    $table->string('proof_of_ownership')->nullable();

    $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('livestock_animals');
    }
};
