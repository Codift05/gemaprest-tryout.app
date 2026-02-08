<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'description',
        'subject_type',
        'subject_id',
        'properties',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get subject
     */
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Log activity
     */
    public static function log(
        string $type,
        string $description,
        ?Model $subject = null,
        array $properties = []
    ): static {
        return static::create([
            'user_id' => auth()->id(),
            'type' => $type,
            'description' => $description,
            'subject_type' => $subject?->getMorphClass(),
            'subject_id' => $subject?->getKey(),
            'properties' => $properties,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Get type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'login' => 'Login',
            'logout' => 'Logout',
            'exam_start' => 'Mulai Ujian',
            'exam_finish' => 'Selesai Ujian',
            'exam_violation' => 'Pelanggaran Ujian',
            'tryout_create' => 'Buat Tryout',
            'tryout_update' => 'Update Tryout',
            'tryout_delete' => 'Hapus Tryout',
            'question_create' => 'Buat Soal',
            'question_update' => 'Update Soal',
            'question_delete' => 'Hapus Soal',
            default => $this->type
        };
    }

    /**
     * Scope by type
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope recent
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}
