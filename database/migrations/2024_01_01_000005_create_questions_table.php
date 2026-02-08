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
        // Bank Soal
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subcategory_id')->constrained()->onDelete('cascade');
            $table->text('content'); // Isi soal (mendukung HTML/Markdown)
            $table->string('image')->nullable(); // Gambar pendukung soal
            $table->enum('type', ['single', 'multiple', 'essay'])->default('single');
            $table->json('options')->nullable(); // Pilihan jawaban [{key: 'A', text: '...'}]
            $table->string('correct_answer'); // Jawaban benar (A/B/C/D/E atau multiple: A,C)
            $table->text('explanation')->nullable(); // Pembahasan
            $table->string('explanation_image')->nullable();
            $table->decimal('score', 5, 2)->default(1); // Skor jika benar
            $table->decimal('negative_score', 5, 2)->default(0); // Pengurangan jika salah
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

            $table->index('is_active');
            $table->index('difficulty');
            $table->index('type');
        });

        // Pivot: Soal dalam Tryout (untuk custom ordering)
        Schema::create('tryout_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['tryout_id', 'question_id']);
            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tryout_questions');
        Schema::dropIfExists('questions');
    }
};
