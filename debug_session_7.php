<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$s = \App\Models\ExamSession::find(7);
if (!$s) {
    echo "Session 7 not found.\n";
    exit;
}

echo "Session ID: {$s->id}\n";
echo "User ID: {$s->user_id}\n";
echo "Status: {$s->status}\n";
echo "Score: {$s->score}\n";
