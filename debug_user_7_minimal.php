<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$sessions = \App\Models\ExamSession::where('user_id', 7)->orderByDesc('finished_at')->get();

foreach ($sessions as $s) {
    echo "ID:{$s->id} | Status:{$s->status} | Score:{$s->score} | Pct:{$s->percentage} | Date:{$s->finished_at}\n";
}
