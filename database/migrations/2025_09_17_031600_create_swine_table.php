<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('breeds', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index(); // Example: Landrace, Duroc, Native
            $table->text('description')->nullable();
            $table->timestamps();
            $table->index('created_at');
        });

        Schema::create('swine', function (Blueprint $table) {
            $table->id();

            // FK to users but no onDelete cascade
            $table->foreignId('owner_id')->constrained('users');

            $table->string('tag_number')->nullable()
                ->comment('Optional, backyard farmers may not use tags')->index();

            $table->enum('sex', ['male', 'female']);
            $table->date('birthdate')->index();

            // FK to breeds but no onDelete
            $table->foreignId('breed_id')->nullable()->constrained('breeds');

            $table->string('cuztom_breed')->nullable()
                ->comment('Custom breed if not in breeds table');

            $table->enum('category', ['barrow', 'gilt', 'boar', 'sow', 'piglet'])->nullable();
            $table->enum('purpose', ['fattening', 'slaughter', 'sale_as_piglet', 
                                    'breeding_sow', 'breeding_boar', 'undecided'])
                ->default('undecided')->index();

            $table->decimal('weight', 8, 2)->index()->nullable();

            $table->string('stage')->index()
                ->comment('Auto-calculated by age: Pre-Weaning, Post-Weaning, Grower, 
                  Finisher(for slaughter or for sale, Breeder if decided to be breader');
            // to decide in last stage if the purpose is to sale or slaughter or fattening the stage will 
            // be Finisher
            // if the purpose has put a breading_boar or breading_sow the stage is Breeder

            $table->enum('status', ['active', 'sold', 'dead', 'slaughtered', 'available', 'inactive'])
                ->default('active')->index();

            $table->text('description')->nullable();

            $table->timestamps();
            $table->index('created_at');

            $table->softDeletes(); // adds deleted_at column

            // Composite index for farmer’s view
            $table->index(['owner_id', 'status']);
            $table->index(['purpose', 'stage']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('swine');
        Schema::dropIfExists('breeds');
    }
};
