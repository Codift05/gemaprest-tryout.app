<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'school',
        'avatar',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is student
     */
    public function isSiswa(): bool
    {
        return $this->role === 'siswa';
    }

    /**
     * Get tryouts created by this user (admin)
     */
    public function createdTryouts(): HasMany
    {
        return $this->hasMany(Tryout::class, 'created_by');
    }

    /**
     * Get questions created by this user (admin)
     */
    public function createdQuestions(): HasMany
    {
        return $this->hasMany(Question::class, 'created_by');
    }

    /**
     * Get exam sessions for this user
     */
    public function examSessions(): HasMany
    {
        return $this->hasMany(ExamSession::class);
    }

    /**
     * Get leaderboard entries for this user
     */
    public function leaderboardEntries(): HasMany
    {
        return $this->hasMany(Leaderboard::class);
    }

    /**
     * Get activity logs for this user
     */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }

    /**
     * Get active exam session if any
     */
    public function activeExamSession()
    {
        return $this->examSessions()
            ->where('status', 'in_progress')
            ->where('server_end_time', '>', now())
            ->first();
    }

    /**
     * Count completed tryouts
     */
    public function completedTryoutsCount(): int
    {
        return $this->examSessions()
            ->whereIn('status', ['completed', 'timeout'])
            ->distinct('tryout_id')
            ->count('tryout_id');
    }

    /**
     * Get average score
     */
    public function averageScore(): float
    {
        return $this->examSessions()
            ->whereIn('status', ['completed', 'timeout'])
            ->avg('percentage') ?? 0;
    }
}
