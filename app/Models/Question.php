<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subcategory_id',
        'content',
        'image',
        'type',
        'options',
        'correct_answer',
        'explanation',
        'explanation_image',
        'score',
        'negative_score',
        'difficulty',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
        'score' => 'decimal:2',
        'negative_score' => 'decimal:2',
    ];

    /**
     * Get subcategory
     */
    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    /**
     * Get category through subcategory
     */
    public function category()
    {
        return $this->subcategory->category;
    }

    /**
     * Get creator
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get tryouts containing this question
     */
    public function tryouts(): BelongsToMany
    {
        return $this->belongsToMany(Tryout::class, 'tryout_questions')
            ->withPivot('sort_order')
            ->withTimestamps();
    }

    /**
     * Check if answer is correct
     */
    public function isCorrect(string $answer): bool
    {
        if ($this->type === 'multiple') {
            $correctAnswers = array_map('trim', explode(',', $this->correct_answer));
            $userAnswers = array_map('trim', explode(',', $answer));
            sort($correctAnswers);
            sort($userAnswers);
            return $correctAnswers === $userAnswers;
        }

        return strtoupper(trim($answer)) === strtoupper(trim($this->correct_answer));
    }

    /**
     * Calculate score for given answer
     */
    public function calculateScore(?string $answer): float
    {
        if (empty($answer)) {
            return 0;
        }

        if ($this->isCorrect($answer)) {
            return (float) $this->score;
        }

        return -abs((float) $this->negative_score);
    }

    /**
     * Scope for active questions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope by difficulty
     */
    public function scopeDifficulty($query, string $difficulty)
    {
        return $query->where('difficulty', $difficulty);
    }

    /**
     * Get formatted options for frontend
     */
    public function getFormattedOptionsAttribute(): array
    {
        if (!$this->options) {
            return [];
        }

        return collect($this->options)->map(function ($option) {
            return [
                'key' => $option['key'] ?? '',
                'text' => $option['text'] ?? '',
                'image' => $option['image'] ?? null,
            ];
        })->toArray();
    }

    /**
     * Get difficulty label
     */
    public function getDifficultyLabelAttribute(): string
    {
        return match($this->difficulty) {
            'easy' => 'Mudah',
            'medium' => 'Sedang',
            'hard' => 'Sulit',
            default => 'Unknown'
        };
    }

    /**
     * Get type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'single' => 'Pilihan Ganda',
            'multiple' => 'Pilihan Ganda Multiple',
            'essay' => 'Essay',
            default => 'Unknown'
        };
    }
}
