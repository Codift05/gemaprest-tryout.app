<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@tryout.test',
            'phone' => '081234567890',
            'password' => 'password',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Sample Students
        $students = [
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad@tryout.test',
                'phone' => '081234567891',
                'school' => 'SMA Negeri 1 Jakarta',
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti@tryout.test',
                'phone' => '081234567892',
                'school' => 'SMA Negeri 3 Bandung',
            ],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@tryout.test',
                'phone' => '081234567893',
                'school' => 'SMA Negeri 5 Surabaya',
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi@tryout.test',
                'phone' => '081234567894',
                'school' => 'SMA Negeri 2 Yogyakarta',
            ],
            [
                'name' => 'Eko Prasetyo',
                'email' => 'eko@tryout.test',
                'phone' => '081234567895',
                'school' => 'SMA Negeri 1 Semarang',
            ],
        ];

        foreach ($students as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'phone' => $student['phone'],
                'school' => $student['school'],
                'password' => 'password',
                'role' => 'siswa',
                'email_verified_at' => now(),
            ]);
        }
    }
}
