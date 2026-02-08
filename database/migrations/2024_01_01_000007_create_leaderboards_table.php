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
        // Leaderboard Cache untuk performa
        Schema::create('leaderboards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_session_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 8, 2);
            $table->decimal('percentage', 5, 2);
            $table->integer('correct_count');
            $table->integer('time_taken')->comment('Waktu pengerjaan dalam detik');
            $table->integer('rank')->nullable();
            $table->timestamps();

            $table->unique(['tryout_id', 'user_id']);
            $table->index(['tryout_id', 'score', 'time_taken']);
        });

        // Activity Log untuk tracking
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('type');
            $table->string('description');
            $table->nullableMorphs('subject');
            $table->json('properties')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'type']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('leaderboards');
    }
};
