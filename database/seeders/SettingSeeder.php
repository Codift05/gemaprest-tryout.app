<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General
            [
                'key' => 'site_name',
                'value' => 'Gemaprest Tryout',
                'type' => 'string',
                'group' => 'general'
            ],
            [
                'key' => 'site_description',
                'value' => 'Platform Tryout UTBK Online - Gemaprest',
                'type' => 'string',
                'group' => 'general'
            ],
            [
                'key' => 'contact_email',
                'value' => 'admin@gemaprest.com',
                'type' => 'string',
                'group' => 'general'
            ],
            [
                'key' => 'maintenance_mode',
                'value' => '0',
                'type' => 'boolean',
                'group' => 'general'
            ],

            // Exam
            [
                'key' => 'default_duration',
                'value' => '120',
                'type' => 'integer',
                'group' => 'exam'
            ],
            [
                'key' => 'passing_score',
                'value' => '60',
                'type' => 'integer',
                'group' => 'exam'
            ],

            // Security
            [
                'key' => 'max_violations',
                'value' => '3',
                'type' => 'integer',
                'group' => 'security'
            ],
            [
                'key' => 'enable_proctoring',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'security'
            ],
            [
                'key' => 'enable_fullscreen',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'security'
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
