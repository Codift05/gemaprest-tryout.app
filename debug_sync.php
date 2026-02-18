<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::where('name', 'like', '%Miftahuddin%')->first();
if (!$user) {
    echo "User not found.\n";
    exit;
}

echo "User: {$user->name} (ID: {$user->id})\n";

$sessions = \App\Models\ExamSession::where('user_id', $user->id)
    ->orderByDesc('finished_at')
    ->take(10)
    ->get();

echo "\nLatest 10 Sessions (All Statuses):\n";
echo str_pad("ID", 5) . str_pad("Status", 15) . str_pad("Score", 10) . str_pad("Finished At", 25) . "In Dashboard?\n";
echo str_repeat("-", 80) . "\n";

foreach ($sessions as $s) {
    $inDashboard = in_array($s->status, ['completed', 'timeout']) ? "YES" : "NO";
    // If NO, and score is high, this explains why it's missing.

    echo str_pad($s->id, 5) .
        str_pad($s->status, 15) .
        str_pad($s->score, 10) .
        str_pad($s->finished_at, 25) .
        $inDashboard . "\n";
}
