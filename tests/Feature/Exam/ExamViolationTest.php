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

class ExamViolationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake([ExamFinished::class, LeaderboardUpdated::class]);
    }

    public function test_valid_violation_is_recorded(): void
    {
        [$user, $session] = $this->createActiveSession();

        $this->actingAs($user)
            ->postJson(route('exam.report-violation', $session), [
                'type' => 'tab_switch',
                'details' => 'User switched to another tab',
            ])
            ->assertOk()
            ->assertJsonStructure(['violation_count', 'remaining_violations']);

        $this->assertDatabaseHas('exam_violations', [
            'exam_session_id' => $session->id,
            'type' => 'tab_switch',
        ]);
    }

    public function test_violation_increments_session_violation_count(): void
    {
        [$user, $session] = $this->createActiveSession();

        $this->actingAs($user)->postJson(route('exam.report-violation', $session), [
            'type' => 'blur',
        ]);

        $session->refresh();
        $this->assertEquals(1, $session->violation_count);
    }

    public function test_invalid_violation_type_returns_422(): void
    {
        [$user, $session] = $this->createActiveSession();

        $this->actingAs($user)
            ->postJson(route('exam.report-violation', $session), [
                'type' => 'invalid_type_xyz',
            ])
            ->assertStatus(422);
    }

    public function test_other_user_cannot_report_violation(): void
    {
        [, $session] = $this->createActiveSession();
        $otherUser = User::factory()->siswa()->create();

        $this->actingAs($otherUser)
            ->postJson(route('exam.report-violation', $session), [
                'type' => 'tab_switch',
            ])
            ->assertStatus(403);
    }

    public function test_reaching_max_violations_auto_submits_exam(): void
    {
        $tryout = Tryout::factory()->create(['max_violations' => 3]);
        $user = User::factory()->siswa()->create();
        $this->attachQuestionsToTryout($tryout, 3);

        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
            'violation_count' => 2, // one more will trigger auto-submit
        ]);

        $response = $this->actingAs($user)
            ->postJson(route('exam.report-violation', $session), [
                'type' => 'tab_switch',
            ]);

        $response->assertOk()
            ->assertJson(['auto_submitted' => true]);

        $this->assertDatabaseHas('exam_sessions', [
            'id' => $session->id,
            'status' => 'violated',
        ]);
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function createActiveSession(): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create(['max_violations' => 3]);

        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
            'violation_count' => 0,
        ]);

        return [$user, $session];
    }

    private function attachQuestionsToTryout(Tryout $tryout, int $count): void
    {
        $questions = Question::factory()->count($count)->create();
        $tryout->questions()->attach($questions->pluck('id')->toArray());

        // Create answer slots in session implicitly through factory relationships
        // Tests using this helper setup their own answers if needed
    }
}
