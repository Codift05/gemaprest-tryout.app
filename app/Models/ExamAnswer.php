<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_session_id',
        'question_id',
        'answer',
        'is_correct',
        'is_marked',
        'score_obtained',
        'time_spent',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'is_marked' => 'boolean',
        'score_obtained' => 'decimal:2',
    ];

    /**
     * Get exam session
     */
    public function examSession(): BelongsTo
    {
        return $this->belongsTo(ExamSession::class);
    }

    /**
     * Get question
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Evaluate answer
     */
    public function evaluate(): void
    {
        $question = $this->question;

        if (empty($this->answer)) {
            $this->is_correct = null;
            $this->score_obtained = 0;
        } else {
            $this->is_correct = $question->isCorrect($this->answer);
            $this->score_obtained = $question->calculateScore($this->answer);
        }

        $this->save();
    }

    /**
     * Get status
     */
    public function getStatusAttribute(): string
    {
        if ($this->is_marked) {
            return 'marked';
        }

        if ($this->answer) {
            return 'answered';
        }

        return 'unanswered';
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'marked' => 'Ragu-ragu',
            'answered' => 'Terjawab',
            'unanswered' => 'Belum dijawab',
            default => 'Unknown'
        };
    }
}
