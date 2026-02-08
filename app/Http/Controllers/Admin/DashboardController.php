<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExamSession;
use App\Models\Question;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display admin dashboard
     */
    public function index(): Response
    {
        // Statistics
        $stats = [
            'total_students' => User::where('role', 'siswa')->count(),
            'total_tryouts' => Tryout::count(),
            'total_questions' => Question::count(),
            'total_exam_sessions' => ExamSession::whereIn('status', ['completed', 'timeout'])->count(),
            'active_sessions' => ExamSession::where('status', 'in_progress')
                ->where('server_end_time', '>', now())
                ->count(),
        ];

        // Recent activities
        $recentSessions = ExamSession::with(['user:id,name,email', 'tryout:id,title'])
            ->whereIn('status', ['completed', 'timeout', 'violated'])
            ->orderByDesc('finished_at')
            ->take(10)
            ->get()
            ->map(fn($session) => [
                'id' => $session->id,
                'user' => [
                    'name' => $session->user->name,
                    'email' => $session->user->email,
                ],
                'tryout' => [
                    'title' => $session->tryout->title,
                ],
                'score' => $session->score,
                'percentage' => $session->percentage,
                'status' => $session->status,
                'finished_at' => $session->finished_at?->toISOString(),
            ]);

        // Popular tryouts
        $popularTryouts = Tryout::withCount('examSessions')
            ->orderByDesc('exam_sessions_count')
            ->take(5)
            ->get()
            ->map(fn($tryout) => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'participant_count' => $tryout->exam_sessions_count,
                'is_published' => $tryout->is_published,
            ]);

        // Chart data - sessions per day (last 7 days)
        $sessionsPerDay = ExamSession::selectRaw('DATE(finished_at) as date, COUNT(*) as count')
            ->where('finished_at', '>=', now()->subDays(7))
            ->whereIn('status', ['completed', 'timeout'])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'date' => $item->date,
                'count' => $item->count,
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentSessions' => $recentSessions,
            'popularTryouts' => $popularTryouts,
            'sessionsPerDay' => $sessionsPerDay,
        ]);
    }
}
