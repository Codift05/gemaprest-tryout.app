<?php

namespace Database\Factories;

use App\Models\Tryout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamSession>
 */
class ExamSessionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->siswa(),
            'tryout_id' => Tryout::factory(),
            'started_at' => now()->subMinutes(30),
            'finished_at' => null,
            'server_end_time' => now()->addMinutes(30),
            'status' => 'in_progress',
            'violation_count' => 0,
            'score' => null,
            'max_score' => null,
            'percentage' => null,
            'correct_count' => 0,
            'wrong_count' => 0,
            'unanswered_count' => 0,
            'question_order' => [],
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
        ];
    }

    /**
     * Completed session with a given score
     */
    public function completed(float $score = 80.0, float $percentage = 80.0): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'completed',
            'finished_at' => now()->subMinutes(5),
            'server_end_time' => now()->addMinutes(25),
            'score' => $score,
            'max_score' => 100.0,
            'percentage' => $percentage,
            'correct_count' => 32,
            'wrong_count' => 8,
            'unanswered_count' => 0,
        ]);
    }

    /**
     * Session that was timed out (waktu habis)
     */
    public function timeout(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'timeout',
            'finished_at' => now()->subMinutes(1),
            'server_end_time' => now()->subMinutes(1),
            'score' => 50.0,
            'max_score' => 100.0,
            'percentage' => 50.0,
            'correct_count' => 20,
            'wrong_count' => 15,
            'unanswered_count' => 5,
        ]);
    }

    /**
     * Session that was terminated due to violations
     */
    public function violated(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'violated',
            'finished_at' => now()->subMinutes(10),
            'server_end_time' => now()->addMinutes(20),
            'violation_count' => 3,
            'score' => 30.0,
            'max_score' => 100.0,
            'percentage' => 30.0,
            'correct_count' => 12,
            'wrong_count' => 8,
            'unanswered_count' => 20,
        ]);
    }

    /**
     * In-progress session with expired timer (should be auto-submitted)
     */
    public function expired(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'in_progress',
            'started_at' => now()->subMinutes(65),
            'server_end_time' => now()->subMinutes(5),
        ]);
    }
}
