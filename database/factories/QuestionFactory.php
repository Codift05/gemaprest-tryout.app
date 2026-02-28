<?php

namespace Database\Factories;

use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'subcategory_id' => Subcategory::factory(),
            'content' => fake()->paragraph(),
            'image' => null,
            'type' => 'single',
            'options' => [
                ['key' => 'A', 'text' => fake()->sentence(), 'image' => null],
                ['key' => 'B', 'text' => fake()->sentence(), 'image' => null],
                ['key' => 'C', 'text' => fake()->sentence(), 'image' => null],
                ['key' => 'D', 'text' => fake()->sentence(), 'image' => null],
                ['key' => 'E', 'text' => fake()->sentence(), 'image' => null],
            ],
            'correct_answer' => 'A',
            'explanation' => fake()->sentence(),
            'explanation_image' => null,
            'score' => 1.00,
            'negative_score' => 0.25,
            'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
            'is_active' => true,
            'created_by' => User::factory()->admin(),
        ];
    }

    /**
     * Question with multiple correct answers
     */
    public function multiple(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'multiple',
            'correct_answer' => 'A,C',
        ]);
    }

    /**
     * Question with no negative score
     */
    public function noNegative(): static
    {
        return $this->state(fn(array $attributes) => [
            'negative_score' => 0,
        ]);
    }

    /**
     * Question with specific correct answer
     */
    public function withAnswer(string $answer): static
    {
        return $this->state(fn(array $attributes) => [
            'correct_answer' => $answer,
        ]);
    }
}
