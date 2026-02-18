<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::where('name', 'like', '%Miftahuddin%')->first();
echo "User: {$user->name} ({$user->id})\n";

$highScore = \App\Models\ExamSession::where('user_id', $user->id)
    ->where('score', '>', 50)
    ->first();

if ($highScore) {
    echo "High Score Found: ID={$highScore->id} Score={$highScore->score} Status={$highScore->status} Date={$highScore->finished_at}\n";
} else {
    echo "No high score found > 50.\n";
}

$all = \App\Models\ExamSession::where('user_id', $user->id)
    ->orderByDesc('finished_at')
    ->take(5)
    ->get();
foreach ($all as $s) {
    echo "ID={$s->id} Status={$s->status} Score={$s->score} Date={$s->finished_at}\n";
}
