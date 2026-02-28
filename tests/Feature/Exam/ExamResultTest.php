<?php

namespace Tests\Feature\Exam;

use App\Models\ExamSession;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExamResultTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_own_result(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->completed()->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
        ]);

        $this->actingAs($user)
            ->get(route('exam.result', $session))
            ->assertOk();
    }

    public function test_other_user_cannot_view_result(): void
    {
        $session = ExamSession::factory()->completed()->create();
        $otherUser = User::factory()->siswa()->create();

        $this->actingAs($otherUser)
            ->get(route('exam.result', $session))
            ->assertStatus(403);
    }

    public function test_result_page_redirects_to_take_if_session_still_active(): void
    {
        $user = User::factory()->siswa()->create();
        $session = ExamSession::factory()->create([
            'user_id' => $user->id,
            'status' => 'in_progress',
            'server_end_time' => now()->addMinutes(30),
        ]);

        $this->actingAs($user)
            ->get(route('exam.result', $session))
            ->assertRedirect(route('exam.take', $session));
    }

    public function test_result_page_includes_key_props(): void
    {
        $user = User::factory()->siswa()->create();
        $tryout = Tryout::factory()->create();
        $session = ExamSession::factory()->completed(80.0, 80.0)->create([
            'user_id' => $user->id,
            'tryout_id' => $tryout->id,
        ]);

        $this->actingAs($user)
            ->get(route('exam.result', $session))
            ->assertInertia(
                fn($page) => $page
                    ->has('session')
                    ->has('tryout')
                    ->has('stats')
            );
    }

    public function test_guest_is_redirected_from_result_page(): void
    {
        $session = ExamSession::factory()->completed()->create();
        $this->get(route('exam.result', $session))->assertRedirect(route('login'));
    }
}
