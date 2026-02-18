<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- Users with 'Miftah' ---\n";
$users = \App\Models\User::where('name', 'like', '%Miftah%')->get();
foreach ($users as $u) {
    echo "ID:{$u->id} Name:{$u->name} Email:{$u->email}\n";
}

echo "\n--- Any Session with Score > 50 ---\n";
$highScores = \App\Models\ExamSession::where('percentage', '>', 50)->with('user')->take(5)->get();
if ($highScores->isEmpty()) {
    echo "No sessions found with percentage > 50.\n";
} else {
    foreach ($highScores as $s) {
        echo "ID:{$s->id} User:{$s->user->name} (ID:{$s->user_id}) Score:{$s->score} Pct:{$s->percentage} Status:{$s->status}\n";
    }
}
