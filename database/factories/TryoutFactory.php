<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tryout>
 */
class TryoutFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $title = fake()->sentence(4),
            'slug' => Str::slug($title) . '-' . Str::random(6),
            'description' => fake()->paragraph(),
            'thumbnail' => null,
            'duration_minutes' => fake()->randomElement([30, 60, 90, 120]),
            'total_questions' => 40,
            'passing_score' => 60.00,
            'start_time' => null,
            'end_time' => null,
            'is_published' => true,
            'is_randomized' => false,
            'show_result_immediately' => true,
            'show_leaderboard' => true,
            'max_attempts' => 3,
            'max_violations' => 3,
            'created_by' => User::factory()->admin(),
        ];
    }

    /**
     * Unpublished (draft) tryout
     */
    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_published' => false,
        ]);
    }

    /**
     * Tryout that hasn't started yet
     */
    public function upcoming(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_published' => true,
            'start_time' => now()->addDays(3),
            'end_time' => now()->addDays(10),
        ]);
    }

    /**
     * Tryout whose time window has ended
     */
    public function ended(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_published' => true,
            'start_time' => now()->subDays(10),
            'end_time' => now()->subDays(1),
        ]);
    }

    /**
     * Tryout with no leaderboard
     */
    public function withoutLeaderboard(): static
    {
        return $this->state(fn(array $attributes) => [
            'show_leaderboard' => false,
        ]);
    }

    /**
     * Tryout that allows only 1 attempt
     */
    public function oneAttempt(): static
    {
        return $this->state(fn(array $attributes) => [
            'max_attempts' => 1,
        ]);
    }
}
