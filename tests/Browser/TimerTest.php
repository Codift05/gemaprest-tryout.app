<?php

namespace Tests\Browser;

use App\Models\ExamAnswer;
use App\Models\ExamSession;
use App\Models\Question;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class TimerTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * Verify timer is visible and counting down during exam
     */
    public function test_timer_is_visible_and_counts_down(): void
    {
        [$user, $session] = $this->createActiveSession(5); // 5 mins

        $this->browse(function (Browser $browser) use ($user, $session) {
            $browser->loginAs($user)
                ->visit('/exam/session/' . $session->id)
                ->waitFor('[data-testid="timer"], .exam-timer', 10)
                ->assertPresent('[data-testid="timer"], .exam-timer');

            // Capture timer value, wait 3 seconds, verify it changed
            $timeBefore = $browser->text('[data-testid="timer"], .exam-timer');
            $browser->pause(3000);
            $timeAfter = $browser->text('[data-testid="timer"], .exam-timer');

            $this->assertNotEquals($timeBefore, $timeAfter, 'Timer should have changed after 3 seconds');
        });
    }

    /**
     * Verify that an expired session redirects to result
     */
    public function test_accessing_expired_session_redirects_to_result(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->subMinutes(1), // already expired
        ]);

        $this->browse(function (Browser $browser) use ($user, $session) {
            $browser->loginAs($user)
                ->visit('/exam/session/' . $session->id)
                ->waitForLocation('/exam/session/' . $session->id . '/result', 10)
                ->assertPathContains('result');
        });
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function createActiveSession(int $durationMinutes = 60): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create(['duration_minutes' => $durationMinutes]);
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes($durationMinutes),
        ]);

        $question = Question::factory()->create();
        $tryout->questions()->attach([$question->id]);
        $session->update(['question_order' => [$question->id]]);
        ExamAnswer::create([
            'exam_session_id' => $session->id,
            'question_id' => $question->id,
            'answer' => null,
        ]);

        return [$user, $session];
    }
}
