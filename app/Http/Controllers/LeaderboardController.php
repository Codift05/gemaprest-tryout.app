<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use App\Models\Tryout;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    /**
     * Display leaderboard for a tryout
     */
    public function show(Tryout $tryout): Response
    {
        if (!$tryout->is_published || !$tryout->show_leaderboard) {
            abort(404);
        }

        $user = auth()->user();

        // Get top 100 entries
        $entries = Leaderboard::where('tryout_id', $tryout->id)
            ->with('user:id,name,school,avatar')
            ->orderBy('rank')
            ->take(100)
            ->get()
            ->map(function ($entry) use ($user) {
                return [
                    'rank' => $entry->rank,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'school' => $entry->user->school,
                        'avatar' => $entry->user->avatar,
                        'is_current_user' => $entry->user_id === $user->id,
                    ],
                    'score' => $entry->score,
                    'percentage' => $entry->percentage,
                    'correct_count' => $entry->correct_count,
                    'time_taken' => $entry->formatted_time,
                ];
            });

        // Get current user's entry if not in top 100
        $userEntry = null;
        $userInTop100 = $entries->contains(fn($entry) => $entry['user']['is_current_user']);

        if (!$userInTop100) {
            $entry = Leaderboard::where('tryout_id', $tryout->id)
                ->where('user_id', $user->id)
                ->with('user:id,name,school,avatar')
                ->first();

            if ($entry) {
                $userEntry = [
                    'rank' => $entry->rank,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'school' => $entry->user->school,
                        'avatar' => $entry->user->avatar,
                        'is_current_user' => true,
                    ],
                    'score' => $entry->score,
                    'percentage' => $entry->percentage,
                    'correct_count' => $entry->correct_count,
                    'time_taken' => $entry->formatted_time,
                ];
            }
        }

        return Inertia::render('Leaderboard/Show', [
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'total_questions' => $tryout->total_questions,
                'participant_count' => $tryout->participant_count,
            ],
            'entries' => $entries,
            'userEntry' => $userEntry,
            'totalParticipants' => Leaderboard::where('tryout_id', $tryout->id)->count(),
        ]);
    }

    /**
     * Get leaderboard data (for realtime updates)
     */
    public function data(Tryout $tryout)
    {
        $user = auth()->user();

        $entries = Leaderboard::where('tryout_id', $tryout->id)
            ->with('user:id,name,school')
            ->orderBy('rank')
            ->take(20)
            ->get()
            ->map(function ($entry) use ($user) {
                return [
                    'rank' => $entry->rank,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'is_current_user' => $entry->user_id === $user->id,
                    ],
                    'score' => $entry->score,
                    'percentage' => $entry->percentage,
                ];
            });

        // Get user's rank
        $userRank = Leaderboard::where('tryout_id', $tryout->id)
            ->where('user_id', $user->id)
            ->value('rank');

        return response()->json([
            'entries' => $entries,
            'user_rank' => $userRank,
            'total_participants' => Leaderboard::where('tryout_id', $tryout->id)->count(),
        ]);
    }
}
