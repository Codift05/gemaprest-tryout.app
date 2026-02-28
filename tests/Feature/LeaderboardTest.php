<?php

namespace Tests\Feature;

use App\Models\ExamSession;
use App\Models\Leaderboard;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeaderboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_leaderboard_page_is_accessible_when_enabled(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'show_leaderboard' => true,
        ]);

        $this->actingAs($user)
            ->get(route('leaderboard.show', $tryout->slug))
            ->assertOk();
    }

    public function test_leaderboard_returns_404_when_leaderboard_disabled(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->withoutLeaderboard()->create();

        $this->actingAs($user)
            ->get(route('leaderboard.show', $tryout->slug))
            ->assertNotFound();
    }

    public function test_leaderboard_returns_404_for_unpublished_tryout(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->draft()->create();

        $this->actingAs($user)
            ->get(route('leaderboard.show', $tryout->slug))
            ->assertNotFound();
    }

    public function test_leaderboard_shows_top_100_entries(): void
    {
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'show_leaderboard' => true,
        ]);
        $user = User::factory()->siswa()->create();

        // Create 5 leaderboard entries
        $users = User::factory()->siswa()->count(5)->create();
        foreach ($users as $i => $u) {
            $session = ExamSession::factory()->completed(80 - $i, 80 - $i)->create([
                'user_id' => $u->id,
                'tryout_id' => $tryout->id,
            ]);
            Leaderboard::create([
                'tryout_id' => $tryout->id,
                'user_id' => $u->id,
                'exam_session_id' => $session->id,
                'score' => 80 - $i,
                'percentage' => 80 - $i,
                'correct_count' => 32 - $i,
                'time_taken' => 3600,
                'rank' => $i + 1,
            ]);
        }

        $this->actingAs($user)
            ->get(route('leaderboard.show', $tryout->slug))
            ->assertOk()
            ->assertInertia(
                fn($page) => $page
                    ->has('entries')
                    ->has('tryout')
            );
    }

    public function test_user_outside_top_100_has_separate_user_entry(): void
    {
        $tryout = Tryout::factory()->create([
            'is_published' => true,
            'show_leaderboard' => true,
        ]);
        $currentUser = User::factory()->siswa()->create();

        // Create 101 users ahead of currentUser
        $otherUsers = User::factory()->siswa()->count(101)->create();
        foreach ($otherUsers as $i => $u) {
            $session = ExamSession::factory()->completed(100, 100)->create([
                'user_id' => $u->id,
                'tryout_id' => $tryout->id,
            ]);
            Leaderboard::create([
                'tryout_id' => $tryout->id,
                'user_id' => $u->id,
                'exam_session_id' => $session->id,
                'score' => 100,
                'percentage' => 100,
                'correct_count' => 40,
                'time_taken' => 1000 + $i,
                'rank' => $i + 1,
            ]);
        }

        // CurrentUser at rank 102
        $session = ExamSession::factory()->completed(50, 50)->create([
            'user_id' => $currentUser->id,
            'tryout_id' => $tryout->id,
        ]);
        Leaderboard::create([
            'tryout_id' => $tryout->id,
            'user_id' => $currentUser->id,
            'exam_session_id' => $session->id,
            'score' => 50,
            'percentage' => 50,
            'correct_count' => 20,
            'time_taken' => 3600,
            'rank' => 102,
        ]);

        $this->actingAs($currentUser)
            ->get(route('leaderboard.show', $tryout->slug))
            ->assertOk()
            ->assertInertia(
                fn($page) => $page
                    ->whereNot('userEntry', null)
            );
    }

    public function test_guest_is_redirected_from_leaderboard(): void
    {
        $tryout = Tryout::factory()->create(['is_published' => true, 'show_leaderboard' => true]);

        $this->get(route('leaderboard.show', $tryout->slug))
            ->assertRedirect(route('login'));
    }

    public function test_leaderboard_data_api_returns_json(): void
    {
        $tryout = Tryout::factory()->create(['is_published' => true, 'show_leaderboard' => true]);
        $user = User::factory()->siswa()->create();

        $this->actingAs($user)
            ->getJson(route('leaderboard.data', $tryout->slug))
            ->assertOk()
            ->assertJsonStructure(['entries', 'user_rank', 'total_participants']);
    }
}
