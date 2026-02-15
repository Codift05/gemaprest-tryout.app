<?php
use App\Models\Tryout;
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$tryouts = Tryout::all();
foreach ($tryouts as $tryout) {
    $count = $tryout->questions()->count();
    $tryout->update(['total_questions' => $count]);
    echo "Updated Tryout ID:{$tryout->id} to {$count} questions.\n";
}
