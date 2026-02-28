<?php

namespace Database\Factories;

use App\Models\ExamSession;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamAnswer>
 */
class ExamAnswerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'exam_session_id' => ExamSession::factory(),
            'question_id' => Question::factory(),
            'answer' => null,
            'is_correct' => null,
            'score_obtained' => 0,
            'is_marked' => false,
            'time_spent' => 0,
        ];
    }

    /**
     * Correct answer
     */
    public function correct(): static
    {
        return $this->state(fn(array $attributes) => [
            'answer' => 'A',
            'is_correct' => true,
            'score_obtained' => 1.0,
        ]);
    }

    /**
     * Wrong answer (with negative score)
     */
    public function wrong(): static
    {
        return $this->state(fn(array $attributes) => [
            'answer' => 'B',
            'is_correct' => false,
            'score_obtained' => -0.25,
        ]);
    }

    /**
     * Unanswered
     */
    public function unanswered(): static
    {
        return $this->state(fn(array $attributes) => [
            'answer' => null,
            'is_correct' => null,
            'score_obtained' => 0,
        ]);
    }
}
