<?php

namespace Tests\Browser;

use App\Models\ExamAnswer;
use App\Models\ExamSession;
use App\Models\Question;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Event;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ExamFlowTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * Full happy-path: Login → Browse → Start Exam → Answer → Submit → Result
     */
    public function test_full_exam_flow_from_login_to_result(): void
    {
        // Setup
        $user = User::factory()->siswa()->create([
            'email' => 'student@example.com',
            'password' => bcrypt('password123'),
        ]);
        $tryout = Tryout::factory()->create([
            'title' => 'Tryout Test Flow',
            'max_violations' => 5,
            'duration_minutes' => 60,
        ]);

        // Attach 5 questions
        $questions = Question::factory()->withAnswer('A')->count(5)->create([
            'score' => 1.0,
            'negative_score' => 0.25,
        ]);
        $tryout->questions()->attach($questions->pluck('id'));
        $tryout->update(['total_questions' => 5]);

        Event::fake();

        $this->browse(function (Browser $browser) use ($user, $tryout) {
            // 1. Login
            $browser->visit('/login')
                ->type('#email', 'student@example.com')
                ->type('#password', 'password123')
                ->press('button[type="submit"]')
                ->waitForLocation('/dashboard', 10);

            // 2. Go to tryout list
            $browser->visit('/tryouts')
                ->assertSee('Tryout Test Flow');

            // 3. View tryout detail
            $browser->visit('/tryout/' . $tryout->slug)
                ->assertSee('Tryout Test Flow')
                ->assertSee('Mulai');

            // 4. Start the exam
            $browser->press('Mulai')
                ->waitForLocation('/exam/session', 10);

            // Verify we are on the exam page
            $browser->assertPathContains('/exam/session');

            // 5. Verify exam page has questions (soal selector)
            $browser->waitFor('.exam-container, [data-testid="exam-container"]', 10);

            // 6. Submit the exam
            $browser->click('[data-testid="btn-submit"], button:contains("Kumpulkan")')
                ->waitForDialog(5)
                ->acceptDialog()
                ->waitForLocation('/exam/session', 10);

            // 7. Verify we arrive on the result page
            $browser->assertPathContains('result')
                ->assertSee('Skor');
        });
    }

    /**
     * Test that a session already in-progress is resumed (not duplicated)
     */
    public function test_resuming_existing_in_progress_session(): void
    {
        $user = User::factory()->siswa()->create([
            'email' => 'resume@example.com',
            'password' => bcrypt('password123'),
        ]);
        $tryout = Tryout::factory()->create();
        $questions = Question::factory()->count(3)->create();
        $tryout->questions()->attach($questions->pluck('id'));
        $tryout->update(['total_questions' => 3]);

        // Create existing in-progress session
        $existingSession = ExamSession::factory()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(50),
            'question_order' => $questions->pluck('id')->toArray(),
        ]);

        foreach ($questions as $q) {
            ExamAnswer::create([
                'exam_session_id' => $existingSession->id,
                'question_id' => $q->id,
                'answer' => null,
            ]);
        }

        $this->browse(function (Browser $browser) use ($user, $tryout, $existingSession) {
            $browser->loginAs($user)
                ->visit('/tryout/' . $tryout->slug)
                ->press('Mulai')
                ->waitForLocation('/exam/session/' . $existingSession->id, 10)
                ->assertPathContains('/exam/session/' . $existingSession->id);
        });
    }
}
