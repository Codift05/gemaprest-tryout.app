<?php

namespace Tests\Unit\Models;

use App\Models\Question;
use App\Models\Subcategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuestionTest extends TestCase
{
    use RefreshDatabase;

    // ─── isCorrect() ─────────────────────────────────────────────────────────

    public function test_correct_single_answer_returns_true(): void
    {
        $question = Question::factory()->withAnswer('A')->create();

        $this->assertTrue($question->isCorrect('A'));
    }

    public function test_wrong_single_answer_returns_false(): void
    {
        $question = Question::factory()->withAnswer('A')->create();

        $this->assertFalse($question->isCorrect('B'));
    }

    public function test_isCorrect_is_case_insensitive(): void
    {
        $question = Question::factory()->withAnswer('A')->create();

        $this->assertTrue($question->isCorrect('a'));
        $this->assertTrue($question->isCorrect('A'));
    }

    public function test_correct_multiple_answers_returns_true(): void
    {
        $question = Question::factory()->multiple()->create();
        // correct_answer = 'A,C'

        $this->assertTrue($question->isCorrect('A,C'));
        $this->assertTrue($question->isCorrect('C,A'));   // order shouldn't matter
    }

    public function test_partial_multiple_answer_returns_false(): void
    {
        $question = Question::factory()->multiple()->create();
        // correct_answer = 'A,C'

        $this->assertFalse($question->isCorrect('A'));
        $this->assertFalse($question->isCorrect('C'));
        $this->assertFalse($question->isCorrect('A,B'));
    }

    // ─── calculateScore() ────────────────────────────────────────────────────

    public function test_correct_answer_returns_full_score(): void
    {
        $question = Question::factory()->withAnswer('A')->create(['score' => 1.0, 'negative_score' => 0.25]);

        $score = $question->calculateScore('A');

        $this->assertEquals(1.0, $score);
    }

    public function test_wrong_answer_returns_negative_score(): void
    {
        $question = Question::factory()->withAnswer('A')->create(['score' => 1.0, 'negative_score' => 0.25]);

        $score = $question->calculateScore('B');

        $this->assertEquals(-0.25, $score);
    }

    public function test_null_answer_returns_zero_score(): void
    {
        $question = Question::factory()->create();

        $this->assertEquals(0, $question->calculateScore(null));
    }

    public function test_empty_string_answer_returns_zero_score(): void
    {
        $question = Question::factory()->create();

        $this->assertEquals(0, $question->calculateScore(''));
    }

    public function test_wrong_answer_with_no_negative_score_returns_zero(): void
    {
        $question = Question::factory()->noNegative()->withAnswer('A')->create(['score' => 1.0]);

        $score = $question->calculateScore('B');

        $this->assertEquals(0, $score);
    }

    // ─── formatted_options ───────────────────────────────────────────────────

    public function test_formatted_options_returns_correct_structure(): void
    {
        $question = Question::factory()->create();

        $options = $question->formatted_options;

        $this->assertIsArray($options);
        $this->assertNotEmpty($options);
        $this->assertArrayHasKey('key', $options[0]);
        $this->assertArrayHasKey('text', $options[0]);
        $this->assertArrayHasKey('image', $options[0]);
    }

    public function test_formatted_options_returns_empty_array_when_options_is_null(): void
    {
        $question = Question::factory()->create(['options' => null]);

        $this->assertEquals([], $question->formatted_options);
    }
}
