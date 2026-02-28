<?php

namespace Tests\Unit\Services;

use App\Models\ExamAnswer;
use App\Models\ExamSession;
use App\Models\Leaderboard;
use App\Models\Question;
use App\Models\Tryout;
use App\Models\User;
use App\Services\ExamScoringService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ExamScoringServiceTest extends TestCase
{
    use RefreshDatabase;

    private ExamScoringService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ExamScoringService();

        // Prevent broadcast events from failing in tests
        Event::fake();
    }

    // ─── calculateScores() ───────────────────────────────────────────────────

    public function test_all_correct_answers_yields_max_score(): void
    {
        [$session, $questions] = $this->createSessionWithQuestions(5, score: 1.0, negativeScore: 0.25);

        // Fill all answers as correct
        foreach ($questions as $q) {
            ExamAnswer::where('exam_session_id', $session->id)
                ->where('question_id', $q->id)
                ->update(['answer' => 'A']);
        }

        $results = $this->service->calculateScores($session->fresh());

        $this->assertEquals(5.0, $results['total_score']);
        $this->assertEquals(5.0, $results['max_score']);
        $this->assertEquals(100.0, $results['percentage']);
        $this->assertEquals(5, $results['correct_count']);
        $this->assertEquals(0, $results['wrong_count']);
        $this->assertEquals(0, $results['unanswered_count']);
    }

    public function test_all_wrong_answers_applies_negative_scoring(): void
    {
        [$session, $questions] = $this->createSessionWithQuestions(4, score: 1.0, negativeScore: 0.25);

        // Fill all answers as wrong (correct is A, we put B)
        foreach ($questions as $q) {
            ExamAnswer::where('exam_session_id', $session->id)
                ->where('question_id', $q->id)
                ->update(['answer' => 'B']);
        }

        $results = $this->service->calculateScores($session->fresh());

        $this->assertEquals(0, $results['total_score']);   // max(0, -1) → floored at 0
        $this->assertEquals(4.0, $results['max_score']);
        $this->assertEquals(4, $results['wrong_count']);
        $this->assertEquals(0, $results['correct_count']);
    }

    public function test_unanswered_questions_count_correctly(): void
    {
        [$session, $questions] = $this->createSessionWithQuestions(5, score: 1.0, negativeScore: 0.25);

        // Leave all unanswered (default is null)

        $results = $this->service->calculateScores($session->fresh());

        $this->assertEquals(0, $results['total_score']);
        $this->assertEquals(5, $results['unanswered_count']);
        $this->assertEquals(0, $results['correct_count']);
        $this->assertEquals(0, $results['wrong_count']);
    }

    public function test_total_score_never_goes_below_zero(): void
    {
        [$session, $questions] = $this->createSessionWithQuestions(10, score: 1.0, negativeScore: 1.0);

        // Answer all wrong
        foreach ($questions as $q) {
            ExamAnswer::where('exam_session_id', $session->id)
                ->where('question_id', $q->id)
                ->update(['answer' => 'B']);
        }

        $results = $this->service->calculateScores($session->fresh());

        $this->assertGreaterThanOrEqual(0, $results['total_score']);
    }

    public function test_mixed_answers_calculates_correctly(): void
    {
        [$session, $questions] = $this->createSessionWithQuestions(4, score: 1.0, negativeScore: 0.25);

        // 2 correct, 1 wrong, 1 unanswered
        ExamAnswer::where('exam_session_id', $session->id)
            ->where('question_id', $questions[0]->id)->update(['answer' => 'A']); // correct
        ExamAnswer::where('exam_session_id', $session->id)
            ->where('question_id', $questions[1]->id)->update(['answer' => 'A']); // correct
        ExamAnswer::where('exam_session_id', $session->id)
            ->where('question_id', $questions[2]->id)->update(['answer' => 'B']); // wrong
        // questions[3] left unanswered

        $results = $this->service->calculateScores($session->fresh());

        $this->assertEquals(2, $results['correct_count']);
        $this->assertEquals(1, $results['wrong_count']);
        $this->assertEquals(1, $results['unanswered_count']);
        // Score: 2*1.0 - 1*0.25 = 1.75
        $this->assertEquals(1.75, $results['total_score']);
    }

    // ─── finishExam() ────────────────────────────────────────────────────────

    public function test_finish_exam_updates_session_status(): void
    {
        [$session] = $this->createSessionWithQuestions(2, score: 1.0, negativeScore: 0.25);

        $this->service->finishExam($session, 'completed');

        $session->refresh();
        $this->assertEquals('completed', $session->status);
        $this->assertNotNull($session->finished_at);
    }

    public function test_finish_exam_creates_leaderboard_entry(): void
    {
        [$session] = $this->createSessionWithQuestions(2, score: 1.0, negativeScore: 0.25);

        $this->service->finishExam($session, 'completed');

        $this->assertDatabaseHas('leaderboards', [
            'tryout_id' => $session->tryout_id,
            'user_id' => $session->user_id,
        ]);
    }

    public function test_finish_exam_is_idempotent(): void
    {
        [$session] = $this->createSessionWithQuestions(2, score: 1.0, negativeScore: 0.25);

        $this->service->finishExam($session, 'completed');
        $session->refresh();
        $firstFinishedAt = $session->finished_at;

        // Call again — should not update anything
        $this->service->finishExam($session, 'completed');
        $session->refresh();

        $this->assertEquals($firstFinishedAt, $session->finished_at);
    }

    // ─── finishExpiredSessions() ─────────────────────────────────────────────

    public function test_finish_expired_sessions_finishes_expired_ones(): void
    {
        [$expiredSession] = $this->createSessionWithQuestions(2);
        $expiredSession->update(['server_end_time' => now()->subMinutes(5)]);

        $count = $this->service->finishExpiredSessions();

        $this->assertEquals(1, $count);
        $this->assertDatabaseHas('exam_sessions', ['id' => $expiredSession->id, 'status' => 'timeout']);
    }

    public function test_finish_expired_sessions_ignores_active_sessions(): void
    {
        [$activeSession] = $this->createSessionWithQuestions(2);
        // server_end_time is in the future (default from factory)

        $count = $this->service->finishExpiredSessions();

        $this->assertEquals(0, $count);
        $this->assertDatabaseHas('exam_sessions', ['id' => $activeSession->id, 'status' => 'in_progress']);
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    /**
     * Create an in-progress session with N questions and answer slots.
     * Returns [session, questions]
     */
    private function createSessionWithQuestions(int $count, float $score = 1.0, float $negativeScore = 0.25): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(60),
        ]);

        $questions = Question::factory()->count($count)->create([
            'score' => $score,
            'negative_score' => $negativeScore,
            'correct_answer' => 'A',
        ]);

        $questionIds = $questions->pluck('id')->toArray();
        $session->update(['question_order' => $questionIds]);

        // Attach questions to tryout
        $tryout->questions()->attach($questionIds);

        // Create answer slots
        foreach ($questions as $q) {
            ExamAnswer::create([
                'exam_session_id' => $session->id,
                'question_id' => $q->id,
                'answer' => null,
                'is_correct' => null,
                'score_obtained' => 0,
            ]);
        }

        return [$session, $questions->all()];
    }
}
