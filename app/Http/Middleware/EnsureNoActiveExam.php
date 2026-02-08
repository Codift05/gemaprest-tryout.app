<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNoActiveExam
{
    /**
     * Prevent navigation away from exam if there's an active session
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->activeExamSession()) {
            $session = $user->activeExamSession();

            // Allow exam-related routes
            $allowedRoutes = [
                'exam.take',
                'exam.submit',
                'exam.save-answer',
                'exam.report-violation',
                'exam.server-time',
            ];

            if (!in_array($request->route()->getName(), $allowedRoutes)) {
                return redirect()->route('exam.take', $session)
                    ->with('warning', 'Anda masih memiliki ujian yang belum selesai.');
            }
        }

        return $next($request);
    }
}
