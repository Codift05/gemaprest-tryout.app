<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Tryout extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail',
        'duration_minutes',
        'total_questions',
        'passing_score',
        'start_time',
        'end_time',
        'is_published',
        'is_randomized',
        'show_result_immediately',
        'show_leaderboard',
        'max_attempts',
        'max_violations',
        'created_by',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_randomized' => 'boolean',
        'show_result_immediately' => 'boolean',
        'show_leaderboard' => 'boolean',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'passing_score' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tryout) {
            if (empty($tryout->slug)) {
                $tryout->slug = Str::slug($tryout->title) . '-' . Str::random(6);
            }
        });
    }

    /**
     * Get creator
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get categories in this tryout
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'tryout_categories')
            ->withPivot(['question_count', 'sort_order'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    /**
     * Get questions in this tryout
     */
    public function questions(): BelongsToMany
    {
        return $this->belongsToMany(Question::class, 'tryout_questions')
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    /**
     * Get exam sessions
     */
    public function examSessions(): HasMany
    {
        return $this->hasMany(ExamSession::class);
    }

    /**
     * Get leaderboard entries
     */
    public function leaderboardEntries(): HasMany
    {
        return $this->hasMany(Leaderboard::class);
    }

    /**
     * Check if tryout is available
     */
    public function isAvailable(): bool
    {
        if (!$this->is_published) {
            return false;
        }

        $now = now();

        if ($this->start_time && $now->lt($this->start_time)) {
            return false;
        }

        if ($this->end_time && $now->gt($this->end_time)) {
            return false;
        }

        return true;
    }

    /**
     * Get status
     */
    public function getStatusAttribute(): string
    {
        if (!$this->is_published) {
            return 'draft';
        }

        $now = now();

        if ($this->start_time && $now->lt($this->start_time)) {
            return 'upcoming';
        }

        if ($this->end_time && $now->gt($this->end_time)) {
            return 'ended';
        }

        return 'active';
    }

    /**
     * Check if user can attempt
     */
    public function canAttempt(User $user): bool
    {
        if (!$this->isAvailable()) {
            return false;
        }

        $attemptCount = $this->examSessions()
            ->where('user_id', $user->id)
            ->whereIn('status', ['completed', 'timeout', 'violated'])
            ->count();

        return $attemptCount < $this->max_attempts;
    }

    /**
     * Get remaining attempts for user
     */
    public function remainingAttempts(User $user): int
    {
        $attemptCount = $this->examSessions()
            ->where('user_id', $user->id)
            ->whereIn('status', ['completed', 'timeout', 'violated'])
            ->count();

        return max(0, $this->max_attempts - $attemptCount);
    }

    /**
     * Scope for published tryouts
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope for available tryouts
     */
    public function scopeAvailable($query)
    {
        return $query->published()
            ->where(function ($q) {
                $q->whereNull('start_time')
                    ->orWhere('start_time', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_time')
                    ->orWhere('end_time', '>=', now());
            });
    }

    /**
     * Get participant count
     */
    public function getParticipantCountAttribute(): int
    {
        return $this->examSessions()
            ->distinct('user_id')
            ->count('user_id');
    }

    /**
     * Get completed count
     */
    public function getCompletedCountAttribute(): int
    {
        return $this->examSessions()
            ->whereIn('status', ['completed', 'timeout'])
            ->count();
    }
}
