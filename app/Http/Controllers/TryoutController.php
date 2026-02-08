<?php

namespace App\Http\Controllers;

use App\Models\Tryout;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TryoutController extends Controller
{
    public function index(Request $request)
    {
        $query = Tryout::with('categories')
            ->where('is_active', true)
            ->withCount(['questions', 'sessions as participant_count']);

        // Search filter
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->category);
            });
        }

        $tryouts = $query->latest()->paginate(12)->through(function ($tryout) {
            $now = now();
            $status = 'active';
            
            if ($tryout->end_date && $now->gt($tryout->end_date)) {
                $status = 'ended';
            } elseif ($tryout->start_date && $now->lt($tryout->start_date)) {
                $status = 'upcoming';
            }

            return [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'description' => $tryout->description,
                'thumbnail' => $tryout->thumbnail,
                'duration_minutes' => $tryout->duration_minutes,
                'total_questions' => $tryout->questions_count,
                'participant_count' => $tryout->participant_count,
                'categories' => $tryout->categories,
                'status' => $status,
            ];
        });

        $categories = Category::orderBy('name')->get();

        return Inertia::render('Tryouts/Index', [
            'tryouts' => $tryouts,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    public function show(Tryout $tryout)
    {
        $user = auth()->user();

        $tryout->load('categories');
        $tryout->loadCount('questions');

        // Get previous attempts
        $previousAttempts = $tryout->sessions()
            ->where('user_id', $user->id)
            ->whereNotNull('finished_at')
            ->latest('finished_at')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'percentage' => $session->percentage,
                    'finished_at' => $session->finished_at,
                ];
            });

        // Check if user can attempt
        $attemptCount = $tryout->sessions()
            ->where('user_id', $user->id)
            ->whereNotNull('finished_at')
            ->count();

        $remainingAttempts = $tryout->max_attempts - $attemptCount;
        $now = now();
        
        $status = 'active';
        if ($tryout->end_date && $now->gt($tryout->end_date)) {
            $status = 'ended';
        } elseif ($tryout->start_date && $now->lt($tryout->start_date)) {
            $status = 'upcoming';
        }

        $canAttempt = $tryout->is_active 
            && $remainingAttempts > 0 
            && $status === 'active';

        return Inertia::render('Exam/Show', [
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'description' => $tryout->description,
                'thumbnail' => $tryout->thumbnail,
                'duration_minutes' => $tryout->duration_minutes,
                'total_questions' => $tryout->questions_count,
                'max_attempts' => $tryout->max_attempts,
                'remaining_attempts' => $remainingAttempts,
                'max_violations' => $tryout->max_violations,
                'participant_count' => $tryout->sessions()->whereNotNull('finished_at')->count(),
                'categories' => $tryout->categories,
                'can_attempt' => $canAttempt,
                'show_leaderboard' => $tryout->show_leaderboard,
                'status' => $status,
            ],
            'previousAttempts' => $previousAttempts,
        ]);
    }
}
