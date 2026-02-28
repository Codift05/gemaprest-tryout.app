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

class ExamStartTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake([ExamFinished::class, LeaderboardUpdated::class]);
    }

    // ─── Guest ───────────────────────────────────────────────────────────────

    public function test_guest_is_redirected_when_starting_exam(): void
    {
        $tryout = Tryout::factory()->create();
        $this->post(route('exam.start', $tryout))->assertRedirect(route('login'));
    }

    // ─── Cannot start ────────────────────────────────────────────────────────

    public function test_user_cannot_start_exam_with_no_questions(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create(); // no questions attached

        $this->actingAs($user)
            ->post(route('exam.start', $tryout))
            ->assertSessionHasErrors('error');
    }

    public function test_user_cannot_start_exam_when_attempts_exhausted(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->oneAttempt()->create();

        // Attach at least one question
        $this->attachQuestionsToTryout($tryout, 2);

        // Simulate already used the one attempt
        ExamSession::factory()->completed()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
        ]);

        $this->actingAs($user)
            ->post(route('exam.start', $tryout))
            ->assertSessionHasErrors('error');
    }

    public function test_user_cannot_start_unpublished_tryout(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->draft()->create();

        $this->actingAs($user)
            ->post(route('exam.start', $tryout))
            ->assertSessionHasErrors('error');
    }

    // ─── Can start ───────────────────────────────────────────────────────────

    public function test_user_can_start_exam_and_session_is_created(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $this->attachQuestionsToTryout($tryout, 5);

        $this->actingAs($user)
            ->post(route('exam.start', $tryout))
            ->assertRedirect();

        $this->assertDatabaseHas('exam_sessions', [
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
        ]);
    }

    public function test_starting_exam_creates_answer_slots_for_all_questions(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $questionIds = $this->attachQuestionsToTryout($tryout, 5);

        $this->actingAs($user)->post(route('exam.start', $tryout));

        $session = ExamSession::where('user_id', $user->id)
            ->where('tryout_id', $tryout->id)
            ->first();

        $this->assertNotNull($session);
        $this->assertEquals(5, $session->answers()->count());
    }

    // ─── Resume existing session ─────────────────────────────────────────────

    public function test_starting_exam_with_existing_in_progress_session_resumes_it(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $this->attachQuestionsToTryout($tryout, 3);
        $existing = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $response = $this->actingAs($user)->post(route('exam.start', $tryout));

        $response->assertRedirect(route('exam.take', $existing));
        // No new session should be created
        $this->assertEquals(1, ExamSession::where('user_id', $user->id)->count());
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function attachQuestionsToTryout(Tryout $tryout, int $count): array
    {
        $questions = Question::factory()->count($count)->create();
        $tryout->questions()->attach($questions->pluck('id')->toArray());
        $tryout->update(['total_questions' => $count]);
        return $questions->pluck('id')->toArray();
    }
}
