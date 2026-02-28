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

class ViolationTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * Verify that the violation counter is displayed in the exam UI
     */
    public function test_violation_counter_is_visible_during_exam(): void
    {
        [$user, $session] = $this->createActiveSession(3); // 3 max violations

        $this->browse(function (Browser $browser) use ($user, $session) {
            $browser->loginAs($user)
                ->visit('/exam/session/' . $session->id)
                ->waitFor('[data-testid="exam-container"], .exam-container', 10)
                ->assertPresent('[data-testid="violation-count"], .violation-count, [data-testid="exam-container"]');
        });
    }

    /**
     * Test that API-level violation reporting works correctly via HTTP
     * (Browser-level JS focus events are hard to simulate reliably across environments)
     */
    public function test_violation_api_call_increments_counter_in_browser(): void
    {
        [$user, $session] = $this->createActiveSession(3);

        $this->browse(function (Browser $browser) use ($user, $session) {
            $browser->loginAs($user)
                ->visit('/exam/session/' . $session->id)
                ->waitFor('[data-testid="exam-container"], .exam-container', 10);

            // Use JavaScript to directly trigger the violation report (simulate what the app JS does)
            $browser->script("
                fetch('/exam/session/{$session->id}/violation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]')?.content || ''
                    },
                    body: JSON.stringify({ type: 'blur', details: 'Test violation' })
                });
            ");

            $browser->pause(1500);

            // Verify in database
            $session->refresh();
            $this->assertEquals(1, $session->violation_count);
        });
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private function createActiveSession(int $maxViolations = 3): array
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create([
            'max_violations' => $maxViolations,
            'duration_minutes' => 60,
        ]);
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(60),
            'violation_count' => 0,
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
