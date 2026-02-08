import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing exam timer with server synchronization
 * @param {string} endTime - ISO timestamp when the exam ends
 * @param {number} sessionId - Exam session ID
 * @param {function} onTimeUp - Callback when time runs out
 * @param {number} syncInterval - Interval in ms to sync with server (default: 30000)
 */
export default function useExamTimer(endTime, sessionId, onTimeUp, syncInterval = 30000) {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const [serverOffset, setServerOffset] = useState(0);
    const intervalRef = useRef(null);
    const syncIntervalRef = useRef(null);
    const hasCalledTimeUp = useRef(false);

    // Calculate time remaining based on server-synced time
    const calculateTimeRemaining = useCallback(() => {
        if (!endTime) return 0;
        
        const now = Date.now() + serverOffset;
        const end = new Date(endTime).getTime();
        const remaining = Math.max(0, Math.floor((end - now) / 1000));
        
        return remaining;
    }, [endTime, serverOffset]);

    // Sync with server time
    const syncWithServer = useCallback(async () => {
        try {
            const requestTime = Date.now();
            const response = await axios.get(route('exam.server-time'));
            const responseTime = Date.now();
            
            // Calculate network latency and adjust
            const latency = (responseTime - requestTime) / 2;
            const serverTime = new Date(response.data.time).getTime() + latency;
            const offset = serverTime - responseTime;
            
            setServerOffset(offset);
            
            // Recalculate remaining time immediately after sync
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
            
            if (remaining <= 0 && !hasCalledTimeUp.current) {
                setIsExpired(true);
                hasCalledTimeUp.current = true;
                onTimeUp?.();
            }
        } catch (error) {
            console.error('Failed to sync time with server:', error);
        }
    }, [calculateTimeRemaining, onTimeUp]);

    // Format time for display
    const formatTime = useCallback((seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Initialize and start timer
    useEffect(() => {
        if (!endTime) return;

        // Initial sync
        syncWithServer();

        // Set up countdown interval
        intervalRef.current = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);

            if (remaining <= 0 && !hasCalledTimeUp.current) {
                setIsExpired(true);
                hasCalledTimeUp.current = true;
                clearInterval(intervalRef.current);
                onTimeUp?.();
            }
        }, 1000);

        // Set up periodic server sync
        syncIntervalRef.current = setInterval(syncWithServer, syncInterval);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        };
    }, [endTime, syncInterval, calculateTimeRemaining, syncWithServer, onTimeUp]);

    // Get urgency level for styling
    const getUrgencyLevel = useCallback(() => {
        if (timeRemaining <= 60) return 'critical'; // Last minute
        if (timeRemaining <= 300) return 'warning'; // Last 5 minutes
        if (timeRemaining <= 600) return 'caution'; // Last 10 minutes
        return 'normal';
    }, [timeRemaining]);

    // Get percentage remaining
    const getPercentRemaining = useCallback((totalSeconds) => {
        if (!totalSeconds || totalSeconds <= 0) return 0;
        return Math.min(100, Math.max(0, (timeRemaining / totalSeconds) * 100));
    }, [timeRemaining]);

    return {
        timeRemaining,
        formattedTime: formatTime(timeRemaining),
        isExpired,
        urgencyLevel: getUrgencyLevel(),
        getPercentRemaining,
        syncWithServer,
        hours: Math.floor(timeRemaining / 3600),
        minutes: Math.floor((timeRemaining % 3600) / 60),
        seconds: timeRemaining % 60,
    };
}
