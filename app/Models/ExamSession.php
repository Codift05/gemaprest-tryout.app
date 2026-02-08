<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExamSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tryout_id',
        'started_at',
        'finished_at',
        'server_end_time',
        'status',
        'violation_count',
        'score',
        'max_score',
        'percentage',
        'correct_count',
        'wrong_count',
        'unanswered_count',
        'question_order',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
        'server_end_time' => 'datetime',
        'score' => 'decimal:2',
        'max_score' => 'decimal:2',
        'percentage' => 'decimal:2',
        'question_order' => 'array',
    ];

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get tryout
     */
    public function tryout(): BelongsTo
    {
        return $this->belongsTo(Tryout::class);
    }

    /**
     * Get answers
     */
    public function answers(): HasMany
    {
        return $this->hasMany(ExamAnswer::class);
    }

    /**
     * Get violations
     */
    public function violations(): HasMany
    {
        return $this->hasMany(ExamViolation::class);
    }

    /**
     * Get leaderboard entry
     */
    public function leaderboard()
    {
        return $this->hasOne(Leaderboard::class);
    }

    /**
     * Check if session is still active
     */
    public function isActive(): bool
    {
        return $this->status === 'in_progress' && now()->lt($this->server_end_time);
    }

    /**
     * Get remaining time in seconds
     */
    public function getRemainingTimeAttribute(): int
    {
        if (!$this->isActive()) {
            return 0;
        }

        return max(0, now()->diffInSeconds($this->server_end_time, false));
    }

    /**
     * Get time taken in seconds
     */
    public function getTimeTakenAttribute(): int
    {
        $endTime = $this->finished_at ?? now();
        return $this->started_at->diffInSeconds($endTime);
    }

    /**
     * Get formatted time taken
     */
    public function getFormattedTimeTakenAttribute(): string
    {
        $seconds = $this->time_taken;
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%d jam %d menit %d detik', $hours, $minutes, $secs);
        }

        return sprintf('%d menit %d detik', $minutes, $secs);
    }

    /**
     * Get answer for specific question
     */
    public function getAnswer(int $questionId): ?ExamAnswer
    {
        return $this->answers->firstWhere('question_id', $questionId);
    }

    /**
     * Get questions in order
     */
    public function getOrderedQuestions()
    {
        if (!$this->question_order) {
            return $this->tryout->questions;
        }

        return Question::whereIn('id', $this->question_order)
            ->orderByRaw('FIELD(id, ' . implode(',', $this->question_order) . ')')
            ->get();
    }

    /**
     * Get progress percentage
     */
    public function getProgressPercentageAttribute(): float
    {
        $totalQuestions = count($this->question_order ?? []) ?: $this->tryout->total_questions;
        $answeredCount = $this->answers()->whereNotNull('answer')->count();

        return $totalQuestions > 0 ? round(($answeredCount / $totalQuestions) * 100, 1) : 0;
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'in_progress' => 'Sedang Dikerjakan',
            'completed' => 'Selesai',
            'timeout' => 'Waktu Habis',
            'violated' => 'Dihentikan (Pelanggaran)',
            default => 'Unknown'
        };
    }

    /**
     * Get status color
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'in_progress' => 'yellow',
            'completed' => 'green',
            'timeout' => 'orange',
            'violated' => 'red',
            default => 'gray'
        };
    }

    /**
     * Check if passed
     */
    public function isPassed(): bool
    {
        return $this->percentage >= $this->tryout->passing_score;
    }

    /**
     * Add violation
     */
    public function addViolation(string $type, ?string $details = null): ExamViolation
    {
        $this->increment('violation_count');

        return $this->violations()->create([
            'type' => $type,
            'details' => $details,
            'occurred_at' => now(),
        ]);
    }

    /**
     * Check if should auto submit due to violations
     */
    public function shouldAutoSubmit(): bool
    {
        return $this->violation_count >= $this->tryout->max_violations;
    }
}
