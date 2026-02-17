import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing exam timer with simple integer countdown.
 * Decoupled from client system time to ensure reliability.
 * 
 * @param {number} initialRemainingTime - Initial remaining time in seconds
 * @param {number} sessionId - Exam session ID (unused for now, but kept for interface)
 * @param {function} onTimeUp - Callback when time runs out
 */
export default function useExamTimer(endTime, sessionId, onTimeUp, syncInterval = 30000, initialRemainingTime = 0) {
    // Use local state for seconds remaining. 
    // We trust the server's initial value and just count down.
    const [timeRemaining, setTimeRemaining] = useState(initialRemainingTime);
    const [isExpired, setIsExpired] = useState(initialRemainingTime <= 0);
    const timerRef = useRef(null);

    // Update state if initial value changes (e.g. on mount/remount)
    useEffect(() => {
        if (initialRemainingTime !== undefined && initialRemainingTime !== null) {
            // Only update if we don't have a timer running or it's a significant jump? 
            // Actually, usually we just want to set it on mount.
            // But to be safe, let's sett it.
            setTimeRemaining(initialRemainingTime);
        }
    }, [initialRemainingTime]);

    // Countdown effect
    useEffect(() => {
        // Clear existing timer
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                const next = prev - 1;

                if (next <= 0) {
                    clearInterval(timerRef.current);
                    if (!isExpired) {
                        setIsExpired(true);
                        onTimeUp?.();
                    }
                    return 0;
                }

                return next;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isExpired, onTimeUp]);

    // Helpers
    const formatTime = useCallback((seconds) => {
        if (seconds < 0) seconds = 0;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const pad = (n) => n.toString().padStart(2, '0');

        if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
        return `${pad(m)}:${pad(s)}`;
    }, []);

    const getUrgencyLevel = useCallback(() => {
        if (timeRemaining <= 60) return 'critical';
        if (timeRemaining <= 300) return 'warning';
        return 'normal';
    }, [timeRemaining]);

    return {
        timeRemaining,
        formattedTime: formatTime(timeRemaining),
        isExpired,
        urgencyLevel: getUrgencyLevel(),
    };
}
