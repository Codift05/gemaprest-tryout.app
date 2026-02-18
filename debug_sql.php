<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$results = \DB::select("SELECT id, user_id, status, score, percentage, finished_at FROM exam_sessions WHERE score = 100 OR percentage = 100");

if (empty($results)) {
    echo "No 100 score sessions found via SQL.\n";
} else {
    foreach ($results as $row) {
        $uName = \DB::table('users')->where('id', $row->user_id)->value('name');
        echo "ID:{$row->id} | UserID:{$row->user_id} ({$uName}) | Status:{$row->status} | Score:{$row->score} | Date:{$row->finished_at}\n";
    }
}
