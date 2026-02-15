<?php

namespace App\Http\Controllers;

use App\Events\ExamFinished;
use App\Events\LeaderboardUpdated;
use App\Models\ActivityLog;
use App\Models\ExamAnswer;
use App\Models\ExamSession;
use App\Models\Leaderboard;
use App\Models\Question;
use App\Models\Tryout;
use App\Services\ExamScoringService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamController extends Controller
{
    public function __construct(
        private ExamScoringService $scoringService
    ) {
    }

    /**
     * Display tryout detail / pre-exam page
     */
    public function show(Tryout $tryout): Response
    {
        if (!$tryout->is_published) {
            abort(404);
        }

        $user = auth()->user();

        return Inertia::render('Exam/Show', [
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'description' => $tryout->description,
                'thumbnail' => $tryout->thumbnail,
                'duration_minutes' => $tryout->duration_minutes,
                'total_questions' => $tryout->total_questions,
                'passing_score' => $tryout->passing_score,
                'max_attempts' => $tryout->max_attempts,
                'max_violations' => $tryout->max_violations,
                'start_time' => $tryout->start_time?->toISOString(),
                'end_time' => $tryout->end_time?->toISOString(),
                'status' => $tryout->status,
                'show_leaderboard' => $tryout->show_leaderboard,
                'categories' => $tryout->categories->map(fn($cat) => [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'color' => $cat->color,
                    'question_count' => $cat->pivot->question_count,
                ]),
                'participant_count' => $tryout->participant_count,
                'can_attempt' => $tryout->canAttempt($user),
                'remaining_attempts' => $tryout->remainingAttempts($user),
            ],
            'previousAttempts' => ExamSession::where('user_id', $user->id)
                ->where('tryout_id', $tryout->id)
                ->whereIn('status', ['completed', 'timeout', 'violated'])
                ->orderByDesc('finished_at')
                ->get()
                ->map(fn($session) => [
                    'id' => $session->id,
                    'score' => $session->score,
                    'percentage' => $session->percentage,
                    'status' => $session->status,
                    'finished_at' => $session->finished_at?->toISOString(),
                ]),
        ]);
    }

    /**
     * Start exam session
     */
    public function start(Request $request, Tryout $tryout): RedirectResponse
    {
        $user = $request->user();

        // Validate
        if (!$tryout->canAttempt($user)) {
            return back()->withErrors(['error' => 'Anda tidak dapat mengakses tryout ini.']);
        }

        // Check for existing active session
        $existingSession = ExamSession::where('user_id', $user->id)
            ->where('tryout_id', $tryout->id)
            ->where('status', 'in_progress')
            ->first();

        if ($existingSession) {
            return redirect()->route('exam.take', $existingSession);
        }

        // Get questions
        $questions = $tryout->questions()->pluck('questions.id')->toArray();

        // Check if questions are available
        if (empty($questions)) {
            return back()->withErrors(['error' => 'Tryout ini belum memiliki soal.']);
        }

        if ($tryout->is_randomized) {
            shuffle($questions);
        }

        // Create session
        $session = ExamSession::create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'started_at' => now(),
            'server_end_time' => now()->addMinutes($tryout->duration_minutes),
            'question_order' => $questions,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Create answer slots
        foreach ($questions as $questionId) {
            ExamAnswer::create([
                'exam_session_id' => $session->id,
                'question_id' => $questionId,
            ]);
        }

        ActivityLog::log('exam_start', "Started exam: {$tryout->title}", $session);

        return redirect()->route('exam.take', $session);
    }

    /**
     * Take exam page
     */
    public function take(ExamSession $session): Response|RedirectResponse
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            abort(403);
        }

        // Check if session is still active
        if (!$session->isActive()) {
            if ($session->status === 'in_progress') {
                // Auto finish if time expired
                $this->scoringService->finishExam($session, 'timeout');
            }
            return redirect()->route('exam.result', $session);
        }

        $tryout = $session->tryout;
        $questions = $session->getOrderedQuestions();
        $answers = $session->answers->keyBy('question_id');

        return Inertia::render('Exam/Take', [
            'session' => [
                'id' => $session->id,
                'remaining_time' => $session->remaining_time,
                'server_end_time' => $session->server_end_time->toISOString(),
                'violation_count' => $session->violation_count,
                'max_violations' => $tryout->max_violations,
            ],
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'duration_minutes' => $tryout->duration_minutes,
            ],
            'questions' => $questions->map(function ($question, $index) use ($answers) {
                $answer = $answers->get($question->id);
                return [
                    'id' => $question->id,
                    'number' => $index + 1,
                    'content' => $question->content,
                    'image' => $question->image,
                    'type' => $question->type,
                    'options' => $question->formatted_options,
                    'subcategory' => $question->subcategory->name,
                    'category' => $question->subcategory->category->name,
                    'answered' => !empty($answer?->answer),
                    'marked' => $answer?->is_marked ?? false,
                    'current_answer' => $answer?->answer,
                ];
            })->values(),
            'navigation' => $questions->map(function ($question, $index) use ($answers) {
                $answer = $answers->get($question->id);
                return [
                    'number' => $index + 1,
                    'question_id' => $question->id,
                    'status' => $answer?->status ?? 'unanswered',
                ];
            })->values(),
        ]);
    }

    /**
     * Save answer (auto-save)
     */
    public function saveAnswer(Request $request, ExamSession $session): JsonResponse
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if session is still active
        if (!$session->isActive()) {
            return response()->json(['error' => 'Session expired', 'redirect' => route('exam.result', $session)], 400);
        }

        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer' => 'nullable|string',
            'is_marked' => 'nullable|boolean',
            'time_spent' => 'nullable|integer|min:0',
        ]);

        $answer = ExamAnswer::where('exam_session_id', $session->id)
            ->where('question_id', $request->question_id)
            ->first();

        if (!$answer) {
            return response()->json(['error' => 'Question not found in session'], 404);
        }

        $answer->update([
            'answer' => $request->answer,
            'is_marked' => $request->boolean('is_marked', $answer->is_marked),
            'time_spent' => ($answer->time_spent ?? 0) + ($request->time_spent ?? 0),
        ]);

        return response()->json([
            'success' => true,
            'saved_at' => now()->toISOString(),
        ]);
    }

    /**
     * Report violation
     */
    public function reportViolation(Request $request, ExamSession $session): JsonResponse
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if session is still active
        if (!$session->isActive()) {
            return response()->json(['error' => 'Session expired'], 400);
        }

        $request->validate([
            'type' => 'required|in:tab_switch,blur,fullscreen_exit,copy,paste,screenshot,devtools,right_click,keyboard_shortcut',
            'details' => 'nullable|string|max:500',
        ]);

        $session->addViolation($request->type, $request->details);

        ActivityLog::log('exam_violation', "Violation detected: {$request->type}", $session, [
            'type' => $request->type,
            'details' => $request->details,
        ]);

        // Check if should auto submit
        if ($session->shouldAutoSubmit()) {
            $this->scoringService->finishExam($session, 'violated');

            return response()->json([
                'auto_submitted' => true,
                'redirect' => route('exam.result', $session),
                'message' => 'Ujian dihentikan karena terlalu banyak pelanggaran.',
            ]);
        }

        return response()->json([
            'violation_count' => $session->violation_count,
            'remaining_violations' => $session->tryout->max_violations - $session->violation_count,
        ]);
    }

    /**
     * Submit exam
     */
    public function submit(Request $request, ExamSession $session): RedirectResponse
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            abort(403);
        }

        if ($session->status !== 'in_progress') {
            return redirect()->route('exam.result', $session);
        }

        $this->scoringService->finishExam($session, 'completed');

        return redirect()->route('exam.result', $session);
    }

    /**
     * Display exam result
     */
    public function result(ExamSession $session): Response
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            abort(403);
        }

        // If still in progress, redirect to take
        if ($session->isActive()) {
            return redirect()->route('exam.take', $session);
        }

        $tryout = $session->tryout;

        // Get leaderboard position
        $leaderboardEntry = Leaderboard::where('tryout_id', $tryout->id)
            ->where('user_id', $session->user_id)
            ->first();

        $totalParticipants = Leaderboard::where('tryout_id', $tryout->id)->count();

        return Inertia::render('Exam/Result', [
            'session' => [
                'id' => $session->id,
                'score' => $session->score,
                'max_score' => $session->max_score,
                'percentage' => $session->percentage,
                'correct_count' => $session->correct_count,
                'wrong_count' => $session->wrong_count,
                'unanswered_count' => $session->unanswered_count,
                'status' => $session->status,
                'status_label' => $session->status_label,
                'time_taken' => $session->formatted_time_taken,
                'violation_count' => $session->violation_count,
                'passed' => $session->isPassed(),
                'finished_at' => $session->finished_at?->toISOString(),
            ],
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'passing_score' => $tryout->passing_score,
                'show_result_immediately' => $tryout->show_result_immediately,
                'show_leaderboard' => $tryout->show_leaderboard,
            ],
            'rank' => $leaderboardEntry ? [
                'position' => $leaderboardEntry->rank,
                'total' => $totalParticipants,
            ] : null,
        ]);
    }

    /**
     * Display exam review (with answers & explanations)
     */
    public function review(ExamSession $session): Response
    {
        // Authorization
        if ($session->user_id !== auth()->id()) {
            abort(403);
        }

        if ($session->isActive()) {
            return redirect()->route('exam.take', $session);
        }

        $tryout = $session->tryout;

        if (!$tryout->show_result_immediately) {
            return redirect()->route('exam.result', $session)
                ->with('error', 'Pembahasan tidak tersedia untuk tryout ini.');
        }

        $questions = $session->getOrderedQuestions();
        $answers = $session->answers->keyBy('question_id');

        return Inertia::render('Exam/Review', [
            'session' => [
                'id' => $session->id,
                'score' => $session->score,
                'percentage' => $session->percentage,
            ],
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
            ],
            'questions' => $questions->map(function ($question, $index) use ($answers) {
                $answer = $answers->get($question->id);
                return [
                    'number' => $index + 1,
                    'content' => $question->content,
                    'image' => $question->image,
                    'type' => $question->type,
                    'options' => $question->formatted_options,
                    'correct_answer' => $question->correct_answer,
                    'user_answer' => $answer?->answer,
                    'is_correct' => $answer?->is_correct,
                    'score_obtained' => $answer?->score_obtained,
                    'explanation' => $question->explanation,
                    'explanation_image' => $question->explanation_image,
                    'subcategory' => $question->subcategory->name,
                    'category' => $question->subcategory->category->name,
                ];
            })->values(),
        ]);
    }

    /**
     * Get server time (for timer sync)
     */
    public function serverTime(): JsonResponse
    {
        return response()->json([
            'server_time' => now()->toISOString(),
            'timestamp' => now()->timestamp,
        ]);
    }
}
