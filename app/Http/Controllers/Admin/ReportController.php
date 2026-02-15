<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExamSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Display reports dashboard with statistics
     */
    public function index(): Response
    {
        // Calculate Total Sessions
        $totalSessions = ExamSession::count();

        // Calculate Average Score
        // Only consider completed sessions to avoid skewing data with 0s from started sessions
        $averageScore = ExamSession::where('status', 'completed')
            ->avg('score') ?? 0;

        // Calculate Completion Rate
        $completedSessions = ExamSession::where('status', 'completed')->count();
        $completionRate = $totalSessions > 0
            ? ($completedSessions / $totalSessions) * 100
            : 0;

        // Calculate Total Violations
        // Get the sum of violation_count from all sessions
        $totalViolations = ExamSession::sum('violation_count');

        return Inertia::render('Admin/Reports/Index', [
            'stats' => [
                'total_sessions' => $totalSessions,
                'average_score' => round($averageScore, 1),
                'completion_rate' => round($completionRate, 1),
                'violations' => $totalViolations,
            ],
        ]);
        /**
     * Display violations report
     */
    public function violations(): Response
    {
        $violations = \App\Models\ExamViolation::with(['examSession.user', 'examSession.tryout'])
            ->latest('occurred_at')
            ->paginate(20)
            ->through(fn($v) => [
                'id' => $v->id,
                'user_name' => $v->examSession->user->name ?? 'Unknown',
                'user_email' => $v->examSession->user->email ?? '-',
                'tryout_title' => $v->examSession->tryout->title ?? 'Unknown',
                'type_label' => $v->type_label,
                'severity' => $v->severity,
                'details' => $v->details,
                'occurred_at' => $v->occurred_at->format('d M Y H:i:s'),
                'occurred_time' => $v->occurred_at->diffForHumans(),
            ]);

        return Inertia::render('Admin/Reports/Violations', [
            'violations' => $violations,
        ]);
    }
}
}
