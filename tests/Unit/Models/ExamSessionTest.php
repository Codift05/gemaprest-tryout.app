<?php

namespace Tests\Unit\Models;

use App\Models\ExamSession;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ExamSessionTest extends TestCase
{
    use RefreshDatabase;

    // ─── isActive() ──────────────────────────────────────────────────────────

    public function test_in_progress_session_with_time_remaining_is_active(): void
    {
        $session = ExamSession::factory()->create([
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->assertTrue($session->isActive());
    }

    public function test_in_progress_session_with_expired_time_is_not_active(): void
    {
        $session = ExamSession::factory()->expired()->create();

        $this->assertFalse($session->isActive());
    }

    public function test_completed_session_is_not_active(): void
    {
        $session = ExamSession::factory()->completed()->create();

        $this->assertFalse($session->isActive());
    }

    public function test_timeout_session_is_not_active(): void
    {
        $session = ExamSession::factory()->timeout()->create();

        $this->assertFalse($session->isActive());
    }

    public function test_violated_session_is_not_active(): void
    {
        $session = ExamSession::factory()->violated()->create();

        $this->assertFalse($session->isActive());
    }

    // ─── remaining_time ──────────────────────────────────────────────────────

    public function test_active_session_has_positive_remaining_time(): void
    {
        $session = ExamSession::factory()->create([
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->assertGreaterThan(0, $session->remaining_time);
    }

    public function test_completed_session_has_zero_remaining_time(): void
    {
        $session = ExamSession::factory()->completed()->create();

        $this->assertEquals(0, $session->remaining_time);
    }

    // ─── shouldAutoSubmit() ──────────────────────────────────────────────────

    public function test_violations_below_max_does_not_trigger_auto_submit(): void
    {
        $tryout = Tryout::factory()->create(['max_violations' => 3]);
        $session = ExamSession::factory()->create([
            'tryout_id' => $tryout->id,
            'violation_count' => 2,
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->assertFalse($session->shouldAutoSubmit());
    }

    public function test_violations_at_max_triggers_auto_submit(): void
    {
        $tryout = Tryout::factory()->create(['max_violations' => 3]);
        $session = ExamSession::factory()->create([
            'tryout_id' => $tryout->id,
            'violation_count' => 3,
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->assertTrue($session->shouldAutoSubmit());
    }

    public function test_violations_above_max_also_triggers_auto_submit(): void
    {
        $tryout = Tryout::factory()->create(['max_violations' => 3]);
        $session = ExamSession::factory()->create([
            'tryout_id' => $tryout->id,
            'violation_count' => 5,
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->assertTrue($session->shouldAutoSubmit());
    }

    // ─── isPassed() ──────────────────────────────────────────────────────────

    public function test_session_above_passing_score_is_passed(): void
    {
        $tryout = Tryout::factory()->create(['passing_score' => 60.0]);
        $session = ExamSession::factory()->completed(80.0, 80.0)->create([
            'tryout_id' => $tryout->id,
        ]);

        $this->assertTrue($session->isPassed());
    }

    public function test_session_below_passing_score_is_not_passed(): void
    {
        $tryout = Tryout::factory()->create(['passing_score' => 60.0]);
        $session = ExamSession::factory()->completed(50.0, 50.0)->create([
            'tryout_id' => $tryout->id,
        ]);

        $this->assertFalse($session->isPassed());
    }

    public function test_session_equal_to_passing_score_is_passed(): void
    {
        $tryout = Tryout::factory()->create(['passing_score' => 60.0]);
        $session = ExamSession::factory()->completed(60.0, 60.0)->create([
            'tryout_id' => $tryout->id,
        ]);

        $this->assertTrue($session->isPassed());
    }

    // ─── formatted_time_taken ────────────────────────────────────────────────

    public function test_formatted_time_taken_shows_minutes_and_seconds(): void
    {
        $session = ExamSession::factory()->completed()->create([
            'started_at' => now()->subSeconds(125),
            'finished_at' => now(),
        ]);

        $this->assertStringContainsString('menit', $session->formatted_time_taken);
        $this->assertStringContainsString('detik', $session->formatted_time_taken);
    }

    // ─── addViolation() ──────────────────────────────────────────────────────

    public function test_add_violation_increments_count(): void
    {
        $session = ExamSession::factory()->create([
            'violation_count' => 0,
            'server_end_time' => now()->addMinutes(30),
        ]);

        $session->addViolation('tab_switch', 'User switched tabs');

        $session->refresh();
        $this->assertEquals(1, $session->violation_count);
    }

    public function test_add_violation_creates_violation_record(): void
    {
        $session = ExamSession::factory()->create([
            'server_end_time' => now()->addMinutes(30),
        ]);

        $session->addViolation('blur', 'Window lost focus');

        $this->assertDatabaseHas('exam_violations', [
            'exam_session_id' => $session->id,
            'type' => 'blur',
        ]);
    }

    // ─── status_label ────────────────────────────────────────────────────────

    public function test_status_label_returns_correct_indonesian_labels(): void
    {
        $statuses = [
            'in_progress' => 'Sedang Dikerjakan',
            'completed' => 'Selesai',
            'timeout' => 'Waktu Habis',
            'violated' => 'Dihentikan (Pelanggaran)',
        ];

        foreach ($statuses as $status => $expected) {
            $session = ExamSession::factory()->create([
                'status' => $status,
                'server_end_time' => now()->addMinutes(30),
            ]);
            $this->assertEquals($expected, $session->status_label);
        }
    }
}
