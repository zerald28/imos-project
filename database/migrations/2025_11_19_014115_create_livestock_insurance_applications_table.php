<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('livestock_insurance_applications', function (Blueprint $table) {
    $table->id();

    $table->foreignId('farmer_id')
          ->constrained('users')
          ->onDelete('cascade');

    $table->boolean('is_indigenous')->default(false);
    $table->string('tribe')->nullable();
    $table->boolean('is_pwd')->default(false);
    $table->string('spouse_name')->nullable();

    $table->string('address');
    $table->string('farm_address');
    $table->string('contact_no');

    // auto-synced based on livestock_animals count
    $table->integer('number_of_heads')->default(0);

    $table->string('animal_type');
    $table->string('purpose');

    $table->string('source_of_stock')->nullable();
    $table->integer('no_of_housing_units')->nullable();
    $table->integer('birds_per_unit')->nullable();
    $table->date('date_of_purchase')->nullable();

    $table->decimal('desired_sum_insured', 12, 2)->nullable();
    $table->decimal('total_sum_insured', 12, 2)->nullable();
    $table->string('epidemic_1')->nullable();
    $table->string('epidemic_2')->nullable();
    $table->string('epidemic_3')->nullable();

    $table->string('assignee')->nullable();
    $table->string('assignee_address')->nullable();
    $table->string('assignee_contact')->nullable();

    $table->string('pdf_path')->nullable();

    $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('livestock_insurance_applications');
    }
};
