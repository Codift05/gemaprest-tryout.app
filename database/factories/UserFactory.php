<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => 'siswa',
            'phone' => '08' . fake()->numerify('#########'),
            'school' => fake()->randomElement([
                'SMA Negeri 1 Jakarta',
                'SMA Negeri 3 Bandung',
                'SMA Negeri 5 Surabaya',
                'SMA Negeri 2 Yogyakarta',
                'SMA Negeri 1 Semarang',
            ]),
            'avatar' => null,
            'is_active' => true,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Return user as admin
     */
    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'admin',
        ]);
    }

    /**
     * Return user as siswa
     */
    public function siswa(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'siswa',
        ]);
    }

    /**
     * Mark email as unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
