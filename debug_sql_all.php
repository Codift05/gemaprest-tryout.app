<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- Sessions for User 8 (Raw SQL) ---\n";
$results = \DB::select("SELECT id, tryout_id, status, score, percentage, finished_at FROM exam_sessions WHERE user_id = 8 ORDER BY finished_at DESC");

foreach ($results as $row) {
    $tryout = \DB::table('tryouts')->where('id', $row->tryout_id)->first();
    $tTitle = $tryout ? $tryout->title : 'DELETED';
    echo "ID:{$row->id} | TryoutID:{$row->tryout_id} ({$tTitle}) | Status:{$row->status} | Score:{$row->score} | Pct:{$row->percentage} | Date:{$row->finished_at}\n";
}
