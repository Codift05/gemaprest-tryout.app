<?php

use Illuminate\Contracts\Console\Kernel;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

$session = \App\Models\ExamSession::find(5);

if ($session) {
    echo "Session ID: " . $session->id . "\n";
    echo "Server End Time:     " . ($session->server_end_time ? $session->server_end_time->format('Y-m-d H:i:s') : 'NULL') . "\n";
    echo "Current Server Time: " . now()->format('Y-m-d H:i:s') . "\n";
    echo "Is Active: " . ($session->isActive() ? 'Yes' : 'No') . "\n";
    echo "Status: " . $session->status . "\n";

    // Calculate difference
    if ($session->server_end_time) {
        $diff = now()->diffInSeconds($session->server_end_time, false);
        echo "Seconds Remaining (diff): " . $diff . "\n";
    }
} else {
    echo "Session 3 not found.\n";
}
