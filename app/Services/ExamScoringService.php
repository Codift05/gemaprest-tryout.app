<?php

namespace App\Services;

use App\Events\ExamFinished;
use App\Events\LeaderboardUpdated;
use App\Models\ActivityLog;
use App\Models\ExamSession;
use App\Models\Leaderboard;

class ExamScoringService
{
    /**
     * Finish exam and calculate scores
     */
    public function finishExam(ExamSession $session, string $status = 'completed'): void
    {
        // Prevent double finish
        if ($session->status !== 'in_progress') {
            return;
        }

        // Calculate scores
        $results = $this->calculateScores($session);

        // Update session
        $session->update([
            'finished_at' => now(),
            'status' => $status,
            'score' => $results['total_score'],
            'max_score' => $results['max_score'],
            'percentage' => $results['percentage'],
            'correct_count' => $results['correct_count'],
            'wrong_count' => $results['wrong_count'],
            'unanswered_count' => $results['unanswered_count'],
        ]);

        // Update or create leaderboard entry
        $leaderboardEntry = Leaderboard::updateEntry($session);

        // Update ranks
        Leaderboard::updateRanks($session->tryout_id);

        // Refresh to get new rank
        $leaderboardEntry->refresh();

        // Log activity
        ActivityLog::log('exam_finish', "Finished exam: {$session->tryout->title}", $session, [
            'score' => $results['total_score'],
            'percentage' => $results['percentage'],
            'status' => $status,
        ]);

        // Broadcast events
        broadcast(new ExamFinished($session))->toOthers();
        broadcast(new LeaderboardUpdated($session->tryout_id, $leaderboardEntry));
    }

    /**
     * Calculate scores for all answers
     */
    public function calculateScores(ExamSession $session): array
    {
        $answers = $session->answers()->with('question')->get();

        $totalScore = 0;
        $maxScore = 0;
        $correctCount = 0;
        $wrongCount = 0;
        $unansweredCount = 0;

        foreach ($answers as $answer) {
            $question = $answer->question;
            $maxScore += (float) $question->score;

            if (empty($answer->answer)) {
                $unansweredCount++;
                $answer->update([
                    'is_correct' => null,
                    'score_obtained' => 0,
                ]);
                continue;
            }

            $isCorrect = $question->isCorrect($answer->answer);
            $scoreObtained = $question->calculateScore($answer->answer);

            $answer->update([
                'is_correct' => $isCorrect,
                'score_obtained' => $scoreObtained,
            ]);

            $totalScore += $scoreObtained;

            if ($isCorrect) {
                $correctCount++;
            } else {
                $wrongCount++;
            }
        }

        // Ensure total score doesn't go below 0
        $totalScore = max(0, $totalScore);

        // Calculate percentage
        $percentage = $maxScore > 0 ? ($totalScore / $maxScore) * 100 : 0;

        return [
            'total_score' => round($totalScore, 2),
            'max_score' => round($maxScore, 2),
            'percentage' => round($percentage, 2),
            'correct_count' => $correctCount,
            'wrong_count' => $wrongCount,
            'unanswered_count' => $unansweredCount,
        ];
    }

    /**
     * Check and auto-finish expired sessions
     */
    public function finishExpiredSessions(): int
    {
        $expiredSessions = ExamSession::where('status', 'in_progress')
            ->where('server_end_time', '<=', now())
            ->get();

        $count = 0;
        foreach ($expiredSessions as $session) {
            $this->finishExam($session, 'timeout');
            $count++;
        }

        return $count;
    }
}
