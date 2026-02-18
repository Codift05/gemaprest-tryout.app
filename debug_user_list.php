<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$users = \App\Models\User::where('name', 'like', '%Miftahuddin%')->get();
foreach ($users as $u) {
    $count = \App\Models\ExamSession::where('user_id', $u->id)->count();
    $latest = \App\Models\ExamSession::where('user_id', $u->id)->latest('finished_at')->first();
    $lastDate = $latest ? $latest->finished_at : 'None';
    echo "UID:{$u->id} | Name:{$u->name} | Email:{$u->email} | Sessions:{$count} | Last:{$lastDate}\n";
}
