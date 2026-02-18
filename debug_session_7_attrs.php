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

echo "ID: {$s->id}\n";
echo "Total Questions (Attribute): " . ($s->total_questions ?? 'UNDEFINED') . "\n";
echo "Correct: {$s->correct_count}\n";
echo "Wrong: {$s->wrong_count}\n";
echo "Unanswered: {$s->unanswered_count}\n";

$calculatedTotal = $s->correct_count + $s->wrong_count + $s->unanswered_count;
echo "Calculated Total: {$calculatedTotal}\n";

echo "Percentage (DB): {$s->percentage}\n";
echo "Score (DB): {$s->score}\n";
