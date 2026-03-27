<?php
// File: database/migrations/2025_12_08_000000_create_imos_notifications_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('imos_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // target user
            $table->foreignId('actor_id')->constrained('users')->onDelete('cascade'); // who triggered
            $table->string('type'); // 'veterinary', 'marketplace', 'swine_request'
            $table->string('action'); // 'create', 'approve', 'reject', 'in_progress', etc.
            $table->text('message');
            $table->string('url')->nullable(); // link for redirect
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imos_notifications');
    }
};
