import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useExamStore } from '../stores';

// Hook for exam timer with server sync
export function useExamTimer(onTimeUp) {
    const { remainingTime, serverEndTime, updateTimer } = useExamStore();
    const intervalRef = useRef(null);
    const syncIntervalRef = useRef(null);

    // Calculate remaining time from server end time
    const calculateRemainingTime = useCallback(() => {
        if (!serverEndTime) return 0;
        const now = new Date();
        const remaining = Math.max(0, Math.floor((serverEndTime - now) / 1000));
        return remaining;
    }, [serverEndTime]);

    // Start countdown
    useEffect(() => {
        if (!serverEndTime) return;

        // Initial sync
        updateTimer(calculateRemainingTime());

        // Update every second
        intervalRef.current = setInterval(() => {
            const remaining = calculateRemainingTime();
            updateTimer(remaining);

            if (remaining <= 0) {
                clearInterval(intervalRef.current);
                onTimeUp?.();
            }
        }, 1000);

        // Sync with server every 30 seconds
        syncIntervalRef.current = setInterval(async () => {
            try {
                const response = await axios.get(route('exam.server-time'));
                const serverTime = new Date(response.data.server_time);
                const remaining = Math.max(0, Math.floor((serverEndTime - serverTime) / 1000));
                updateTimer(remaining);
            } catch (error) {
                console.error('Failed to sync time:', error);
            }
        }, 30000);

        return () => {
            clearInterval(intervalRef.current);
            clearInterval(syncIntervalRef.current);
        };
    }, [serverEndTime, calculateRemainingTime, updateTimer, onTimeUp]);

    // Format time display
    const formatTime = useCallback((seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, []);

    return {
        remainingTime,
        formattedTime: formatTime(remainingTime),
        isWarning: remainingTime > 0 && remainingTime <= 300, // Last 5 minutes
        isCritical: remainingTime > 0 && remainingTime <= 60, // Last minute
    };
}

// Hook for anti-cheat monitoring
export function useAntiCheat(sessionId, onViolation, onAutoSubmit) {
    const { violationCount, maxViolations, incrementViolation } = useExamStore();
    const lastViolationRef = useRef(null);

    const reportViolation = useCallback(async (type, details = null) => {
        // Prevent duplicate violations in quick succession
        const now = Date.now();
        if (lastViolationRef.current && now - lastViolationRef.current < 1000) {
            return;
        }
        lastViolationRef.current = now;

        try {
            const response = await axios.post(route('exam.report-violation', sessionId), {
                type,
                details,
            });

            incrementViolation();
            onViolation?.(type, response.data);

            if (response.data.auto_submitted) {
                onAutoSubmit?.(response.data.redirect);
            }
        } catch (error) {
            console.error('Failed to report violation:', error);
        }
    }, [sessionId, incrementViolation, onViolation, onAutoSubmit]);

    useEffect(() => {
        // Tab visibility change
        const handleVisibilityChange = () => {
            if (document.hidden) {
                reportViolation('tab_switch', 'User switched to another tab');
            }
        };

        // Window blur (losing focus)
        const handleBlur = () => {
            reportViolation('blur', 'Window lost focus');
        };

        // Fullscreen exit
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                reportViolation('fullscreen_exit', 'User exited fullscreen');
            }
        };

        // Copy event
        const handleCopy = (e) => {
            e.preventDefault();
            reportViolation('copy', 'User attempted to copy');
        };

        // Paste event
        const handlePaste = (e) => {
            e.preventDefault();
            reportViolation('paste', 'User attempted to paste');
        };

        // Right click
        const handleContextMenu = (e) => {
            e.preventDefault();
            reportViolation('right_click', 'User right-clicked');
        };

        // Keyboard shortcuts
        const handleKeyDown = (e) => {
            // Detect common shortcuts
            const blockedShortcuts = [
                { key: 'F12' },
                { key: 'I', ctrl: true, shift: true },
                { key: 'J', ctrl: true, shift: true },
                { key: 'C', ctrl: true, shift: true },
                { key: 'U', ctrl: true },
                { key: 'S', ctrl: true },
                { key: 'P', ctrl: true },
            ];

            const isBlocked = blockedShortcuts.some(shortcut => {
                const keyMatch = e.key.toUpperCase() === shortcut.key.toUpperCase();
                const ctrlMatch = shortcut.ctrl ? e.ctrlKey : true;
                const shiftMatch = shortcut.shift ? e.shiftKey : true;
                return keyMatch && ctrlMatch && shiftMatch;
            });

            if (isBlocked) {
                e.preventDefault();
                reportViolation('keyboard_shortcut', `Blocked shortcut: ${e.key}`);
            }
        };

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [reportViolation]);

    return {
        violationCount,
        maxViolations,
        remainingViolations: maxViolations - violationCount,
    };
}

// Hook for auto-save answers
export function useAutoSave(sessionId, delay = 1000) {
    const { answers, markedQuestions, setSaving } = useExamStore();
    const timeoutRef = useRef(null);
    const lastSavedRef = useRef({});

    const saveAnswer = useCallback(async (questionId, answer, isMarked) => {
        // Skip if no change
        const lastSaved = lastSavedRef.current[questionId];
        if (lastSaved && lastSaved.answer === answer && lastSaved.isMarked === isMarked) {
            return;
        }

        setSaving(true);

        try {
            await axios.post(route('exam.save-answer', sessionId), {
                question_id: questionId,
                answer: answer || null,
                is_marked: isMarked,
            });

            lastSavedRef.current[questionId] = { answer, isMarked };
        } catch (error) {
            console.error('Failed to save answer:', error);
        } finally {
            setSaving(false);
        }
    }, [sessionId, setSaving]);

    // Debounced save
    const debouncedSave = useCallback((questionId, answer, isMarked) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            saveAnswer(questionId, answer, isMarked);
        }, delay);
    }, [saveAnswer, delay]);

    return { saveAnswer, debouncedSave };
}

// Hook for leaderboard realtime updates
export function useLeaderboardRealtime(tryoutId) {
    const { setEntries, setTotalParticipants, updateEntry } = useLeaderboardStore();

    useEffect(() => {
        if (!tryoutId) return;

        // Subscribe to leaderboard channel
        const channel = window.Echo.channel(`leaderboard.${tryoutId}`);

        channel.listen('.leaderboard.updated', (event) => {
            updateEntry(event.entry);
            setTotalParticipants(event.total_participants);
        });

        return () => {
            window.Echo.leave(`leaderboard.${tryoutId}`);
        };
    }, [tryoutId, updateEntry, setTotalParticipants]);
}
