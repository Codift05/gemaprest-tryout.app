import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Custom hook for realtime leaderboard updates using Laravel Echo
 * @param {string} channelName - The broadcast channel name
 * @param {function} onUpdate - Callback when leaderboard updates
 */
export default function useLeaderboardRealtime(channelName, onUpdate) {
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const channelRef = useRef(null);
    const echoRef = useRef(null);

    // Initialize Echo connection
    const connect = useCallback(() => {
        // Check if Echo is available (from Laravel Echo bootstrap)
        if (typeof window.Echo === 'undefined') {
            console.warn('Laravel Echo is not initialized');
            return;
        }

        echoRef.current = window.Echo;

        try {
            // Subscribe to the channel
            channelRef.current = echoRef.current.channel(channelName);

            // Listen for leaderboard updates
            channelRef.current.listen('.leaderboard.updated', (data) => {
                setLastUpdate(new Date());
                onUpdate?.(data);
            });

            // Listen for new exam completion
            channelRef.current.listen('.exam.finished', (data) => {
                setLastUpdate(new Date());
                onUpdate?.(data);
            });

            setIsConnected(true);
        } catch (error) {
            console.error('Failed to connect to leaderboard channel:', error);
            setIsConnected(false);
        }
    }, [channelName, onUpdate]);

    // Disconnect from channel
    const disconnect = useCallback(() => {
        if (channelRef.current && echoRef.current) {
            echoRef.current.leave(channelName);
            channelRef.current = null;
            setIsConnected(false);
        }
    }, [channelName]);

    // Connect on mount, disconnect on unmount
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    // Reconnect on visibility change (when user returns to tab)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && !isConnected) {
                connect();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [connect, isConnected]);

    return {
        isConnected,
        lastUpdate,
        reconnect: connect,
        disconnect,
    };
}
