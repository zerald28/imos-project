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
         * Table: conversations
         * Holds each 1-to-1 chat session between two users.
         */
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_one_id');
            $table->unsignedBigInteger('user_two_id');
            $table->timestamps();

            // Prevent duplicate conversation pairs (user_one ↔ user_two)
            $table->unique(['user_one_id', 'user_two_id']);

            $table->foreign('user_one_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('user_two_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });

        /**
         * Table: messages
         * Stores individual message records with optional image attachments.
         */
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('conversation_id');
            $table->unsignedBigInteger('sender_id');
            $table->text('content')->nullable();          // message text
            $table->string('attachment')->nullable();     // path to uploaded file/image
            $table->boolean('is_edited')->default(false); // true when user edits
            $table->timestamps();
            $table->softDeletes();                        // allows “delete for everyone”

            $table->foreign('conversation_id')
                ->references('id')
                ->on('conversations')
                ->onDelete('cascade');

            $table->foreign('sender_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Index for quick retrieval of latest messages
            $table->index(['conversation_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
    }
};
