<?php

namespace Database\Factories;

use App\Models\ExamSession;
use App\Models\Tryout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Leaderboard>
 */
class LeaderboardFactory extends Factory
{
    public function definition(): array
    {
        $score = fake()->randomFloat(2, 0, 100);

        return [
            'tryout_id' => Tryout::factory(),
            'user_id' => User::factory()->siswa(),
            'exam_session_id' => ExamSession::factory()->completed($score, $score),
            'score' => $score,
            'percentage' => $score,
            'correct_count' => fake()->numberBetween(0, 40),
            'time_taken' => fake()->numberBetween(600, 7200),
            'rank' => null,
        ];
    }

    /**
     * Top-ranked entry
     */
    public function topRank(): static
    {
        return $this->state(fn(array $attributes) => [
            'score' => 100.0,
            'percentage' => 100.0,
            'rank' => 1,
            'time_taken' => 600,
        ]);
    }
}
