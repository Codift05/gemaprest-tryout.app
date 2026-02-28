<?php

namespace Tests\Unit\Models;

use App\Models\ExamSession;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TryoutTest extends TestCase
{
    use RefreshDatabase;

    // ─── isAvailable() ───────────────────────────────────────────────────────

    public function test_unpublished_tryout_is_not_available(): void
    {
        $tryout = Tryout::factory()->draft()->create();
        $this->assertFalse($tryout->isAvailable());
    }

    public function test_published_tryout_with_no_time_window_is_available(): void
    {
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'start_time' => null,
            'end_time' => null,
        ]);
        $this->assertTrue($tryout->isAvailable());
    }

    public function test_published_tryout_before_start_time_is_not_available(): void
    {
        $tryout = Tryout::factory()->upcoming()->create();
        $this->assertFalse($tryout->isAvailable());
    }

    public function test_published_tryout_after_end_time_is_not_available(): void
    {
        $tryout = Tryout::factory()->ended()->create();
        $this->assertFalse($tryout->isAvailable());
    }

    public function test_published_tryout_within_time_window_is_available(): void
    {
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'start_time' => now()->subHour(),
            'end_time' => now()->addHour(),
        ]);
        $this->assertTrue($tryout->isAvailable());
    }

    // ─── getStatusAttribute() ────────────────────────────────────────────────

    public function test_unpublished_tryout_status_is_draft(): void
    {
        $tryout = Tryout::factory()->draft()->create();
        $this->assertEquals('draft', $tryout->status);
    }

    public function test_upcoming_tryout_status_is_upcoming(): void
    {
        $tryout = Tryout::factory()->upcoming()->create();
        $this->assertEquals('upcoming', $tryout->status);
    }

    public function test_ended_tryout_status_is_ended(): void
    {
        $tryout = Tryout::factory()->ended()->create();
        $this->assertEquals('ended', $tryout->status);
    }

    public function test_active_tryout_status_is_active(): void
    {
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'start_time' => null,
            'end_time' => null,
        ]);
        $this->assertEquals('active', $tryout->status);
    }

    // ─── canAttempt() ────────────────────────────────────────────────────────

    public function test_user_can_attempt_when_no_previous_attempts(): void
    {
        $tryout = Tryout::factory()->create(['max_attempts' => 3]);
        $user = User::factory()->siswa()->create();

        $this->assertTrue($tryout->canAttempt($user));
    }

    public function test_user_cannot_attempt_when_attempts_exhausted(): void
    {
        $tryout = Tryout::factory()->oneAttempt()->create();
        $user = User::factory()->siswa()->create();

        // Create 1 completed session (uses the 1 allowed attempt)
        ExamSession::factory()->completed()->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);

        $this->assertFalse($tryout->canAttempt($user));
    }

    public function test_user_can_attempt_when_attempts_remain(): void
    {
        $tryout = Tryout::factory()->create(['max_attempts' => 3]);
        $user = User::factory()->siswa()->create();

        // Create 2 completed sessions
        ExamSession::factory()->completed()->count(2)->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);

        $this->assertTrue($tryout->canAttempt($user));
    }

    public function test_in_progress_session_does_not_count_as_attempt(): void
    {
        $tryout = Tryout::factory()->oneAttempt()->create();
        $user = User::factory()->siswa()->create();

        // Create an in-progress session (not finished)
        ExamSession::factory()->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
            'status' => 'in_progress',
        ]);

        // User should still be able to attempt (in_progress doesn't count)
        $this->assertTrue($tryout->canAttempt($user));
    }

    // ─── remainingAttempts() ─────────────────────────────────────────────────

    public function test_remaining_attempts_is_correct(): void
    {
        $tryout = Tryout::factory()->create(['max_attempts' => 3]);
        $user = User::factory()->siswa()->create();

        ExamSession::factory()->completed()->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);

        $this->assertEquals(2, $tryout->remainingAttempts($user));
    }

    public function test_remaining_attempts_never_goes_below_zero(): void
    {
        $tryout = Tryout::factory()->oneAttempt()->create();
        $user = User::factory()->siswa()->create();

        ExamSession::factory()->completed()->count(2)->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);

        $this->assertEquals(0, $tryout->remainingAttempts($user));
    }
}
