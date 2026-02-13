<?php

namespace App\Http\Controllers;

use App\Models\ExamSession;
use App\Models\Tryout;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display student dashboard
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get available tryouts
        $availableTryouts = Tryout::available()
            ->withCount([
                'examSessions as attempts_count' => function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                        ->whereIn('status', ['completed', 'timeout', 'violated']);
                }
            ])
            ->orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(function ($tryout) use ($user) {
                return [
                    'id' => $tryout->id,
                    'title' => $tryout->title,
                    'slug' => $tryout->slug,
                    'description' => $tryout->description,
                    'thumbnail' => $tryout->thumbnail,
                    'duration_minutes' => $tryout->duration_minutes,
                    'total_questions' => $tryout->total_questions,
                    'participant_count' => $tryout->participant_count,
                    'attempts_count' => $tryout->attempts_count,
                    'max_attempts' => $tryout->max_attempts,
                    'can_attempt' => $tryout->canAttempt($user),
                    'remaining_attempts' => $tryout->remainingAttempts($user),
                    'end_time' => $tryout->end_time?->toISOString(),
                ];
            });

        // Get active exam session if any
        $activeSession = $user->activeExamSession();

        // Get recent results
        $recentResults = ExamSession::where('user_id', $user->id)
            ->whereIn('status', ['completed', 'timeout'])
            ->with('tryout:id,title,slug')
            ->orderByDesc('finished_at')
            ->take(5)
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'tryout' => [
                        'title' => $session->tryout?->title ?? 'Tryout Terhapus',
                        'slug' => $session->tryout?->slug ?? '#',
                    ],
                    'score' => $session->score,
                    'percentage' => $session->percentage,
                    'correct_count' => $session->correct_count,
                    'total_questions' => $session->correct_count + $session->wrong_count + $session->unanswered_count,
                    'status' => $session->status,
                    'finished_at' => $session->finished_at?->toISOString(),
                    'time_taken' => $session->formatted_time_taken,
                ];
            });

        // Stats
        $stats = [
            'total_tryouts_completed' => $user->completedTryoutsCount(),
            'average_score' => round($user->averageScore(), 1),
            'total_study_time' => ExamSession::where('user_id', $user->id)
                ->whereIn('status', ['completed', 'timeout'])
                ->sum(\DB::raw('TIMESTAMPDIFF(SECOND, started_at, finished_at)')),
        ];

        return Inertia::render('Dashboard', [
            'availableTryouts' => $availableTryouts,
            'activeSession' => $activeSession ? [
                'id' => $activeSession->id,
                'tryout_title' => $activeSession->tryout?->title ?? 'Tryout Tidak Tersedia',
                'remaining_time' => $activeSession->remaining_time,
                'progress' => $activeSession->progress_percentage,
            ] : null,
            'recentResults' => $recentResults,
            'stats' => $stats,
        ]);
    }
}
