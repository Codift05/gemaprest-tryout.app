<?php
use App\Models\ExamSession;
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$session = ExamSession::latest()->first();
if ($session) {
    echo "Session ID: " . $session->id . "\n";
    echo "Question Order: " . json_encode($session->question_order) . "\n";
    echo "Questions Count from getOrderedQuestions: " . $session->getOrderedQuestions()->count() . "\n";
    echo "Tryout Questions Count: " . $session->tryout->questions()->count() . "\n";
} else {
    echo "No session found.\n";
}
