<?php

namespace Tests\Unit\Models;

use App\Models\ExamSession;
use App\Models\Leaderboard;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeaderboardTest extends TestCase
{
    use RefreshDatabase;

    // ─── updateRanks() ───────────────────────────────────────────────────────

    public function test_update_ranks_orders_by_score_descending(): void
    {
        $tryout = Tryout::factory()->create();
        $user1 = User::factory()->siswa()->create();
        $user2 = User::factory()->siswa()->create();
        $user3 = User::factory()->siswa()->create();

        $session1 = ExamSession::factory()->completed(90, 90)->create(['tryout_id' => $tryout->id, 'user_id' => $user1->id]);
        $session2 = ExamSession::factory()->completed(70, 70)->create(['tryout_id' => $tryout->id, 'user_id' => $user2->id]);
        $session3 = ExamSession::factory()->completed(80, 80)->create(['tryout_id' => $tryout->id, 'user_id' => $user3->id]);

        Leaderboard::create(['tryout_id' => $tryout->id, 'user_id' => $user1->id, 'exam_session_id' => $session1->id, 'score' => 90, 'percentage' => 90, 'correct_count' => 36, 'time_taken' => 3600]);
        Leaderboard::create(['tryout_id' => $tryout->id, 'user_id' => $user2->id, 'exam_session_id' => $session2->id, 'score' => 70, 'percentage' => 70, 'correct_count' => 28, 'time_taken' => 3600]);
        Leaderboard::create(['tryout_id' => $tryout->id, 'user_id' => $user3->id, 'exam_session_id' => $session3->id, 'score' => 80, 'percentage' => 80, 'correct_count' => 32, 'time_taken' => 3600]);

        Leaderboard::updateRanks($tryout->id);

        $this->assertDatabaseHas('leaderboards', ['user_id' => $user1->id, 'rank' => 1]);
        $this->assertDatabaseHas('leaderboards', ['user_id' => $user3->id, 'rank' => 2]);
        $this->assertDatabaseHas('leaderboards', ['user_id' => $user2->id, 'rank' => 3]);
    }

    public function test_update_ranks_ties_broken_by_time_taken_ascending(): void
    {
        $tryout = Tryout::factory()->create();
        $user1 = User::factory()->siswa()->create();
        $user2 = User::factory()->siswa()->create();

        $session1 = ExamSession::factory()->completed(80, 80)->create(['tryout_id' => $tryout->id, 'user_id' => $user1->id]);
        $session2 = ExamSession::factory()->completed(80, 80)->create(['tryout_id' => $tryout->id, 'user_id' => $user2->id]);

        // user1 finished faster
        Leaderboard::create(['tryout_id' => $tryout->id, 'user_id' => $user1->id, 'exam_session_id' => $session1->id, 'score' => 80, 'percentage' => 80, 'correct_count' => 32, 'time_taken' => 1800]);
        Leaderboard::create(['tryout_id' => $tryout->id, 'user_id' => $user2->id, 'exam_session_id' => $session2->id, 'score' => 80, 'percentage' => 80, 'correct_count' => 32, 'time_taken' => 3600]);

        Leaderboard::updateRanks($tryout->id);

        $this->assertDatabaseHas('leaderboards', ['user_id' => $user1->id, 'rank' => 1]);
        $this->assertDatabaseHas('leaderboards', ['user_id' => $user2->id, 'rank' => 2]);
    }

    // ─── updateEntry() ───────────────────────────────────────────────────────

    public function test_update_entry_creates_new_entry_for_new_user(): void
    {
        $tryout = Tryout::factory()->create();
        $user = User::factory()->siswa()->create();
        $session = ExamSession::factory()->completed(85, 85)->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);

        $entry = Leaderboard::updateEntry($session);

        $this->assertNotNull($entry);
        $this->assertEquals($user->id, $entry->user_id);
        $this->assertEquals($tryout->id, $entry->tryout_id);
    }

    public function test_update_entry_updates_existing_entry_on_retry(): void
    {
        $tryout = Tryout::factory()->create();
        $user = User::factory()->siswa()->create();

        // First attempt
        $session1 = ExamSession::factory()->completed(60, 60)->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);
        Leaderboard::updateEntry($session1);

        // Second attempt with higher score
        $session2 = ExamSession::factory()->completed(90, 90)->create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
        ]);
        Leaderboard::updateEntry($session2);

        $this->assertDatabaseCount('leaderboards', 1);
        $this->assertDatabaseHas('leaderboards', [
            'user_id' => $user->id,
            'score' => '90.00',
        ]);
    }

    // ─── formatted_time ──────────────────────────────────────────────────────

    public function test_formatted_time_shows_minutes_and_seconds_for_short_duration(): void
    {
        $tryout = Tryout::factory()->create();
        $user = User::factory()->siswa()->create();
        $session = ExamSession::factory()->completed()->create(['tryout_id' => $tryout->id, 'user_id' => $user->id]);

        $entry = Leaderboard::create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
            'exam_session_id' => $session->id,
            'score' => 80,
            'percentage' => 80,
            'correct_count' => 32,
            'time_taken' => 125, // 2 minutes 5 seconds
        ]);

        $this->assertEquals('2:05', $entry->formatted_time);
    }

    public function test_formatted_time_shows_hours_for_long_duration(): void
    {
        $tryout = Tryout::factory()->create();
        $user = User::factory()->siswa()->create();
        $session = ExamSession::factory()->completed()->create(['tryout_id' => $tryout->id, 'user_id' => $user->id]);

        $entry = Leaderboard::create([
            'tryout_id' => $tryout->id,
            'user_id' => $user->id,
            'exam_session_id' => $session->id,
            'score' => 80,
            'percentage' => 80,
            'correct_count' => 32,
            'time_taken' => 3665, // 1 hour 1 min 5 sec
        ]);

        $this->assertEquals('1:01:05', $entry->formatted_time);
    }
}
