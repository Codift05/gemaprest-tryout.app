<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::withTrashed()->find(7);
if (!$user) {
    echo "User 7 not found.\n";
    exit;
}
echo "User: {$user->name} (7) Deleted: {$user->deleted_at}\n";

$sessions = \App\Models\ExamSession::where('user_id', 7)->orderByDesc('finished_at')->get();

foreach ($sessions as $s) {
    $tryoutTitle = $s->tryout ? $s->tryout->title : 'Deleted Tryout';
    echo "ID:{$s->id} | Tryout:{$tryoutTitle} | Status:{$s->status} | Score:{$s->score} | Pct:{$s->percentage} | Date:{$s->finished_at}\n";
}
