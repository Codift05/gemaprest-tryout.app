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
        // Sesi Ujian (Exam Attempt)
        Schema::create('exam_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tryout_id')->constrained()->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('finished_at')->nullable();
            $table->timestamp('server_end_time'); // Waktu berakhir berdasarkan server
            $table->enum('status', ['in_progress', 'completed', 'timeout', 'violated'])->default('in_progress');
            $table->integer('violation_count')->default(0);
            $table->decimal('score', 8, 2)->nullable();
            $table->decimal('max_score', 8, 2)->nullable();
            $table->decimal('percentage', 5, 2)->nullable();
            $table->integer('correct_count')->default(0);
            $table->integer('wrong_count')->default(0);
            $table->integer('unanswered_count')->default(0);
            $table->json('question_order')->nullable(); // Urutan soal yang diacak
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'tryout_id']);
            $table->index('status');
            $table->index('finished_at');
        });

        // Jawaban Siswa
        Schema::create('exam_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_session_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->string('answer')->nullable(); // Jawaban siswa
            $table->boolean('is_correct')->nullable();
            $table->boolean('is_marked')->default(false); // Ditandai untuk review
            $table->decimal('score_obtained', 5, 2)->default(0);
            $table->integer('time_spent')->default(0); // Waktu di soal ini (detik)
            $table->timestamps();

            $table->unique(['exam_session_id', 'question_id']);
            $table->index('is_marked');
        });

        // Log Pelanggaran Anti-Cheat
        Schema::create('exam_violations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_session_id')->constrained()->onDelete('cascade');
            $table->enum('type', [
                'tab_switch',      // Pindah tab
                'blur',            // Window kehilangan fokus
                'fullscreen_exit', // Keluar fullscreen
                'copy',            // Copy text
                'paste',           // Paste text
                'screenshot',      // Attempt screenshot
                'devtools',        // Buka developer tools
                'right_click',     // Klik kanan
                'keyboard_shortcut' // Shortcut mencurigakan
            ]);
            $table->text('details')->nullable();
            $table->timestamp('occurred_at');
            $table->timestamps();

            $table->index(['exam_session_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_violations');
        Schema::dropIfExists('exam_answers');
        Schema::dropIfExists('exam_sessions');
    }
};
