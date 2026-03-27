<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Make role nullable and remove default
            $table->enum('role', ['admin', 'enforcer', 'farmer', 'buyer'])
                  ->nullable()
                  ->default(null)
                  ->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert role column
            $table->enum('role', ['admin', 'enforcer', 'farmer', 'buyer'])
                  ->default('buyer')
                  ->nullable(false)
                  ->change();
        });
    }
};
