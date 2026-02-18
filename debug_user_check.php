<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$users = \App\Models\User::where('name', 'like', '%Miftah%')->get();

foreach ($users as $u) {
    $count = \App\Models\ExamSession::where('user_id', $u->id)->count();
    $latest = \App\Models\ExamSession::where('user_id', $u->id)->latest('finished_at')->first();
    $latestDate = $latest ? $latest->finished_at : 'None';

    echo "User ID: {$u->id}\n";
    echo "Name: {$u->name}\n";
    echo "Email: {$u->email}\n";
    echo "Session Count: {$count}\n";
    echo "Latest Session: {$latestDate}\n";
    echo "--------------------------\n";
}
