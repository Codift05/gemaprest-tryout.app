<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$users = \App\Models\User::where('name', 'like', '%Miftah%')->get();

foreach ($users as $u) {
    echo "\nUser: {$u->name} (ID: {$u->id})\n";
    $sessions = \App\Models\ExamSession::where('user_id', $u->id)->get();
    if ($sessions->isEmpty()) {
        echo "  No sessions.\n";
    } else {
        foreach ($sessions as $s) {
            echo "  Session ID:{$s->id} Status:{$s->status} Score:{$s->score} Date:{$s->finished_at}\n";
        }
    }
}
