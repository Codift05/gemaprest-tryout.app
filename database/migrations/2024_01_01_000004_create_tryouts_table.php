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
        // Paket Tryout
        Schema::create('tryouts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->integer('duration_minutes')->default(120); // Durasi dalam menit
            $table->integer('total_questions')->default(0);
            $table->decimal('passing_score', 5, 2)->default(0); // Nilai minimum kelulusan
            $table->timestamp('start_time')->nullable(); // Waktu mulai tryout tersedia
            $table->timestamp('end_time')->nullable(); // Waktu berakhir tryout tersedia
            $table->boolean('is_published')->default(false);
            $table->boolean('is_randomized')->default(true); // Acak urutan soal
            $table->boolean('show_result_immediately')->default(true);
            $table->boolean('show_leaderboard')->default(true);
            $table->integer('max_attempts')->default(1); // Maksimal percobaan
            $table->integer('max_violations')->default(5); // Maksimal pelanggaran sebelum auto-submit
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

            $table->index('is_published');
            $table->index(['start_time', 'end_time']);
        });

        // Pivot: Kategori dalam Tryout
        Schema::create('tryout_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->integer('question_count')->default(0); // Jumlah soal dari kategori ini
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['tryout_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tryout_categories');
        Schema::dropIfExists('tryouts');
    }
};
