<?php

namespace Tests\Feature\Exam;

use App\Events\ExamFinished;
use App\Events\LeaderboardUpdated;
use App\Models\ExamAnswer;
use App\Models\ExamSession;
use App\Models\Question;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ExamSubmitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake([ExamFinished::class, LeaderboardUpdated::class]);
    }

    public function test_user_can_submit_in_progress_exam(): void
    {
        [$user, $session] = $this->createSessionWithAnswers();

        $this->actingAs($user)
            ->post(route('exam.submit', $session))
            ->assertRedirect(route('exam.result', $session));

        $this->assertDatabaseHas('exam_sessions', [
            'id' => $session->id,
            'status' => 'completed',
        ]);
    }

    public function test_submitting_already_completed_session_redirects_to_result(): void
    {
        $user = User::factory()->siswa()->create();
        $session = ExamSession::factory()->completed()->create(['user_id' => $user->id]);

        $this->actingAs($user)
            ->post(route('exam.submit', $session))
            ->assertRedirect(route('exam.result', $session));

        // Status should not change
        $this->assertDatabaseHas('exam_sessions', [
            'id' => $session->id,
            'status' => 'completed',
        ]);
    }

    public function test_other_user_cannot_submit_session(): void
    {
        [, $session] = $this->createSessionWithAnswers();
        $otherUser = User::factory()->siswa()->create();

        $this->actingAs($otherUser)
            ->post(route('exam.submit', $session))
            ->assertStatus(403);
    }

    public function test_submitting_exam_creates_leaderboard_entry(): void
    {
        [$user, $session] = $this->createSessionWithAnswers();

        $this->actingAs($user)->post(route('exam.submit', $session));

        $this->assertDatabaseHas('leaderboards', [
            'tryout_id' => $session->tryout_id,
            'user_id' => $user->id,
        ]);
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function createSessionWithAnswers(): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $question = Question::factory()->withAnswer('A')->create([
            'score' => 1.0,
            'negative_score' => 0.25,
        ]);
        $tryout->questions()->attach([$question->id]);
        $session->update(['question_order' => [$question->id]]);

        ExamAnswer::create([
            'exam_session_id' => $session->id,
            'question_id' => $question->id,
            'answer' => 'A',
            'is_correct' => null,
            'score_obtained' => 0,
        ]);

        return [$user, $session];
    }
}
