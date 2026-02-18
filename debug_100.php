<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$sessions = \App\Models\ExamSession::where('score', 100)->orWhere('percentage', 100)->get();

if ($sessions->isEmpty()) {
    echo "No session with 100 score/percentage found.\n";
} else {
    foreach ($sessions as $s) {
        $u = \App\Models\User::withTrashed()->find($s->user_id);
        $uname = $u ? $u->name : 'Unknown';
        echo "Session ID:{$s->id} | User:{$uname} (ID:{$s->user_id}) | Status:{$s->status} | Score:{$s->score} | Pct:{$s->percentage} | Date:{$s->finished_at}\n";
    }
}
