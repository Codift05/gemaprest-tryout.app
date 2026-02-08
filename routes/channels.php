<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
*/

// Private channel for user notifications
Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Public channel for leaderboard updates
Broadcast::channel('leaderboard.{tryoutId}', function () {
    return true;
});

// Presence channel for exam monitoring (admin)
Broadcast::channel('exam-monitoring.{tryoutId}', function ($user, $tryoutId) {
    if ($user->isAdmin()) {
        return [
            'id' => $user->id,
            'name' => $user->name,
        ];
    }
    return false;
});
