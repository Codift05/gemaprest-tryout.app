<?php

namespace Database\Seeders;

use App\Models\Tryout;
use App\Models\User;
use Illuminate\Database\Seeder;

class TryoutSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $tryouts = [
            [
                'title' => 'UTBK SNBT 2024 - Simulasi TPS',
                'slug' => 'utbk-snbt-2024-simulasi-tps',
                'description' => 'Simulasi Tes Potensi Skolastik untuk persiapan UTBK SNBT 2024.',
                'duration_minutes' => 60,
                'max_attempts' => 3,
                'max_violations' => 5,
                'passing_score' => 60,
                'is_published' => true,
                'is_randomized' => true,
                'show_result_immediately' => true,
                'show_leaderboard' => true,
                'created_by' => $admin->id,
            ],
            [
                'title' => 'UTBK SNBT 2024 - Literasi',
                'slug' => 'utbk-snbt-2024-literasi',
                'description' => 'Simulasi Tes Literasi Bahasa Indonesia dan Bahasa Inggris.',
                'duration_minutes' => 45,
                'max_attempts' => 3,
                'max_violations' => 5,
                'passing_score' => 60,
                'is_published' => true,
                'is_randomized' => true,
                'show_result_immediately' => true,
                'show_leaderboard' => true,
                'created_by' => $admin->id,
            ],
            [
                'title' => 'TKA Saintek - Paket Lengkap',
                'slug' => 'tka-saintek-paket-lengkap',
                'description' => 'Tryout TKA Saintek: Matematika IPA, Fisika, Kimia, Biologi.',
                'duration_minutes' => 90,
                'max_attempts' => 2,
                'max_violations' => 5,
                'passing_score' => 55,
                'is_published' => true,
                'is_randomized' => true,
                'show_result_immediately' => true,
                'show_leaderboard' => true,
                'created_by' => $admin->id,
            ],
        ];

        foreach ($tryouts as $data) {
            Tryout::create($data);
        }
    }
}