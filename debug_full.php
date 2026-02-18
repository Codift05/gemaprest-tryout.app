<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::where('name', 'like', '%Miftahuddin%')->first();
echo "User: {$user->name} ({$user->id})\n";

$sessions = \App\Models\ExamSession::where('user_id', $user->id)
    ->orderByDesc('finished_at')
    ->get(); // Get ALL

echo "Count: " . $sessions->count() . "\n";

foreach ($sessions as $s) {
    echo "ID:{$s->id} | Status:{$s->status} | Score:{$s->score} | Pct:{$s->percentage} | Date:{$s->finished_at}\n";
}
