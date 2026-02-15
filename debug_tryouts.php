<?php

use App\Models\Tryout;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$tryouts = Tryout::orderByDesc('created_at')->get();

$data = [];
$data['server_time'] = now()->toDateTimeString();
$data['total_tryouts'] = $tryouts->count();
$data['items'] = [];

foreach ($tryouts as $tryout) {
    $data['items'][] = [
        'id' => $tryout->id,
        'title' => $tryout->title,
        'is_published' => $tryout->is_published,
        'start_time' => $tryout->start_time ? $tryout->start_time->toDateTimeString() : null,
        'end_time' => $tryout->end_time ? $tryout->end_time->toDateTimeString() : null,
        'total_questions_col' => $tryout->total_questions,
        'questions_count' => $tryout->questions()->count(),
        'categories' => $tryout->categories->map(function ($cat) {
            return [
                'name' => $cat->name,
                'pivot_question_count' => $cat->pivot->question_count
            ];
        })->toArray(),
        'is_available' => $tryout->isAvailable()
    ];
}

echo json_encode($data, JSON_PRETTY_PRINT);
