<?php

namespace App\Events;

use App\Models\Leaderboard;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LeaderboardUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public int $tryoutId,
        public Leaderboard $entry
    ) {}

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('leaderboard.' . $this->tryoutId),
        ];
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'tryout_id' => $this->tryoutId,
            'entry' => [
                'rank' => $this->entry->rank,
                'user_id' => $this->entry->user_id,
                'user_name' => $this->entry->user->name,
                'school' => $this->entry->user->school,
                'score' => $this->entry->score,
                'percentage' => $this->entry->percentage,
                'correct_count' => $this->entry->correct_count,
                'time_taken' => $this->entry->formatted_time,
            ],
            'total_participants' => Leaderboard::where('tryout_id', $this->tryoutId)->count(),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'leaderboard.updated';
    }
}
