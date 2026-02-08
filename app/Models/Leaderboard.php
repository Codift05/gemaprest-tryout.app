<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leaderboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'tryout_id',
        'user_id',
        'exam_session_id',
        'score',
        'percentage',
        'correct_count',
        'time_taken',
        'rank',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'percentage' => 'decimal:2',
    ];

    /**
     * Get tryout
     */
    public function tryout(): BelongsTo
    {
        return $this->belongsTo(Tryout::class);
    }

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get exam session
     */
    public function examSession(): BelongsTo
    {
        return $this->belongsTo(ExamSession::class);
    }

    /**
     * Get formatted time
     */
    public function getFormattedTimeAttribute(): string
    {
        $seconds = $this->time_taken;
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%d:%02d:%02d', $hours, $minutes, $secs);
        }

        return sprintf('%d:%02d', $minutes, $secs);
    }

    /**
     * Update ranks for a tryout
     */
    public static function updateRanks(int $tryoutId): void
    {
        $entries = static::where('tryout_id', $tryoutId)
            ->orderByDesc('score')
            ->orderBy('time_taken')
            ->get();

        $rank = 1;
        foreach ($entries as $entry) {
            $entry->update(['rank' => $rank]);
            $rank++;
        }
    }

    /**
     * Get or create entry for user
     */
    public static function updateEntry(ExamSession $session): static
    {
        return static::updateOrCreate(
            [
                'tryout_id' => $session->tryout_id,
                'user_id' => $session->user_id,
            ],
            [
                'exam_session_id' => $session->id,
                'score' => $session->score,
                'percentage' => $session->percentage,
                'correct_count' => $session->correct_count,
                'time_taken' => $session->time_taken,
            ]
        );
    }
}
