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

class ExamSaveAnswerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake([ExamFinished::class, LeaderboardUpdated::class]);
    }

    public function test_user_can_save_answer_for_their_session(): void
    {
        [$user, $session, $question] = $this->createActiveSession();

        $this->actingAs($user)
            ->postJson(route('exam.save-answer', $session), [
                'question_id' => $question->id,
                'answer' => 'A',
                'is_marked' => false,
                'time_spent' => 30,
            ])
            ->assertOk()
            ->assertJsonStructure(['success', 'saved_at']);
    }

    public function test_other_user_cannot_save_answer_to_session(): void
    {
        [, $session, $question] = $this->createActiveSession();
        $otherUser = User::factory()->siswa()->create();

        $this->actingAs($otherUser)
            ->postJson(route('exam.save-answer', $session), [
                'question_id' => $question->id,
                'answer' => 'A',
            ])
            ->assertStatus(403);
    }

    public function test_saving_answer_to_expired_session_returns_400(): void
    {
        [$user, $session, $question] = $this->createActiveSession();
        $session->update(['server_end_time' => now()->subMinutes(5)]);

        $this->actingAs($user)
            ->postJson(route('exam.save-answer', $session), [
                'question_id' => $question->id,
                'answer' => 'A',
            ])
            ->assertStatus(400)
            ->assertJsonStructure(['error', 'redirect']);
    }

    public function test_saving_answer_for_question_not_in_session_returns_404(): void
    {
        [$user, $session] = $this->createActiveSession();
        $otherQuestion = Question::factory()->create();

        $this->actingAs($user)
            ->postJson(route('exam.save-answer', $session), [
                'question_id' => $otherQuestion->id,
                'answer' => 'A',
            ])
            ->assertStatus(404);
    }

    public function test_time_spent_accumulates_across_multiple_saves(): void
    {
        [$user, $session, $question] = $this->createActiveSession();

        $this->actingAs($user)->postJson(route('exam.save-answer', $session), [
            'question_id' => $question->id,
            'answer' => 'A',
            'time_spent' => 30,
        ]);
        $this->actingAs($user)->postJson(route('exam.save-answer', $session), [
            'question_id' => $question->id,
            'answer' => 'B',
            'time_spent' => 20,
        ]);

        $answer = ExamAnswer::where('exam_session_id', $session->id)
            ->where('question_id', $question->id)
            ->first();

        $this->assertEquals(50, $answer->time_spent);
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function createActiveSession(): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $question = Question::factory()->create();
        ExamAnswer::create([
            'exam_session_id' => $session->id,
            'question_id' => $question->id,
            'answer' => null,
            'is_correct' => null,
            'score_obtained' => 0,
        ]);

        return [$user, $session, $question];
    }
}
