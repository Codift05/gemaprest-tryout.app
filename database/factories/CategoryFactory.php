<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $name = fake()->unique()->word() . ' ' . fake()->word(),
            'slug' => Str::slug($name) . '-' . Str::random(4),
            'color' => fake()->randomElement(['blue', 'green', 'red', 'purple', 'orange', 'teal', 'indigo']),
            'sort_order' => 0,
            'is_active' => true,
        ];
    }
}
