<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamViolation extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_session_id',
        'type',
        'details',
        'occurred_at',
    ];

    protected $casts = [
        'occurred_at' => 'datetime',
    ];

    /**
     * Get exam session
     */
    public function examSession(): BelongsTo
    {
        return $this->belongsTo(ExamSession::class);
    }

    /**
     * Get type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'tab_switch' => 'Pindah Tab',
            'blur' => 'Keluar Jendela',
            'fullscreen_exit' => 'Keluar Fullscreen',
            'copy' => 'Copy Teks',
            'paste' => 'Paste Teks',
            'screenshot' => 'Screenshot',
            'devtools' => 'Buka Developer Tools',
            'right_click' => 'Klik Kanan',
            'keyboard_shortcut' => 'Shortcut Mencurigakan',
            default => 'Pelanggaran Lain'
        };
    }

    /**
     * Get severity
     */
    public function getSeverityAttribute(): string
    {
        return match($this->type) {
            'tab_switch', 'blur', 'fullscreen_exit' => 'medium',
            'copy', 'paste', 'screenshot', 'devtools' => 'high',
            default => 'low'
        };
    }

    /**
     * Get severity color
     */
    public function getSeverityColorAttribute(): string
    {
        return match($this->severity) {
            'high' => 'red',
            'medium' => 'orange',
            'low' => 'yellow',
            default => 'gray'
        };
    }
}
