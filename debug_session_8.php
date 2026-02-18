<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$s = \App\Models\ExamSession::find(8);
if (!$s) {
    echo "Session 8 not found.\n";
    exit;
}

echo "Session ID: {$s->id}\n";
echo "User ID: {$s->user_id}\n";
$u = \App\Models\User::withTrashed()->find($s->user_id);
echo "User Name: " . ($u ? $u->name : 'Unknown') . "\n";
echo "User Deleted At: " . ($u && $u->deleted_at ? $s->user->deleted_at : 'None') . "\n";
echo "Status: {$s->status}\n";
echo "Score: {$s->score}\n";
echo "Finished At: {$s->finished_at}\n";
