<?php
use App\Models\Tryout;
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$tryouts = Tryout::all();
foreach ($tryouts as $t) {
    echo "ID:{$t->id} | Actual:{$t->questions()->count()} | Col:{$t->total_questions} | Title:{$t->title}\n";
}
