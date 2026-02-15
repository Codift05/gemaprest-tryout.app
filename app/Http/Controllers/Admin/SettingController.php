<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display settings page
     */
    public function index(): Response
    {
        // Fetch all settings and key-value pairs
        $settings = Setting::all()->mapWithKeys(function ($setting) {
            $value = match ($setting->type) {
                'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                'integer' => (int) $setting->value,
                'array' => json_decode($setting->value, true),
                default => $setting->value,
            };
            return [$setting->key => $value];
        });

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings
     */
    public function update(Request $request): RedirectResponse
    {
        // Define validation rules based on expected keys
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'max_violations' => 'required|integer|min:1',
            'enable_proctoring' => 'required|boolean',
            'enable_fullscreen' => 'required|boolean',
            'default_duration' => 'required|integer|min:10',
            'passing_score' => 'required|integer|min:0|max:100',
            'maintenance_mode' => 'required|boolean',
        ]);

        // Map keys to their types and groups
        $settingConfig = [
            'site_name' => ['type' => 'string', 'group' => 'general'],
            'site_description' => ['type' => 'string', 'group' => 'general'],
            'contact_email' => ['type' => 'string', 'group' => 'general'],
            'maintenance_mode' => ['type' => 'boolean', 'group' => 'general'],
            'default_duration' => ['type' => 'integer', 'group' => 'exam'],
            'passing_score' => ['type' => 'integer', 'group' => 'exam'],
            'max_violations' => ['type' => 'integer', 'group' => 'security'],
            'enable_proctoring' => ['type' => 'boolean', 'group' => 'security'],
            'enable_fullscreen' => ['type' => 'boolean', 'group' => 'security'],
        ];

        foreach ($validated as $key => $value) {
            if (isset($settingConfig[$key])) {
                $type = $settingConfig[$key]['type'];
                $group = $settingConfig[$key]['group'];

                // Prepare value for storage
                $storedValue = match ($type) {
                    'boolean' => $value ? '1' : '0',
                    'array' => json_encode($value),
                    default => (string) $value,
                };

                Setting::updateOrCreate(
                    ['key' => $key],
                    [
                        'value' => $storedValue,
                        'type' => $type,
                        'group' => $group
                    ]
                );
            }
        }

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
