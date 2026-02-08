import { useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook for anti-cheating detection
 * @param {number} sessionId - Exam session ID
 * @param {function} onViolation - Callback when violation detected
 * @param {number} maxViolations - Maximum allowed violations before disqualification
 * @param {boolean} enabled - Whether anti-cheat is enabled
 */
export default function useAntiCheat(sessionId, onViolation, maxViolations = 3, enabled = true) {
    const violationCountRef = useRef(0);
    const devToolsOpenRef = useRef(false);

    // Report violation to server
    const reportViolation = useCallback(async (type, details = {}) => {
        if (!sessionId || !enabled) return;

        violationCountRef.current += 1;
        const currentCount = violationCountRef.current;

        try {
            await axios.post(route('exam.report-violation', sessionId), {
                type,
                details,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Failed to report violation:', error);
        }

        onViolation?.(type, currentCount, maxViolations);
    }, [sessionId, enabled, onViolation, maxViolations]);

    // Visibility change detection
    useEffect(() => {
        if (!enabled) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                reportViolation('tab_switch', { 
                    action: 'left_page',
                    timestamp: new Date().toISOString(),
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [enabled, reportViolation]);

    // Window blur detection (catches alt+tab, etc.)
    useEffect(() => {
        if (!enabled) return;

        const handleBlur = () => {
            reportViolation('window_blur', {
                timestamp: new Date().toISOString(),
            });
        };

        window.addEventListener('blur', handleBlur);
        return () => window.removeEventListener('blur', handleBlur);
    }, [enabled, reportViolation]);

    // Copy/Paste/Cut prevention
    useEffect(() => {
        if (!enabled) return;

        const handleCopy = (e) => {
            e.preventDefault();
            reportViolation('copy_attempt', { type: e.type });
        };

        const handlePaste = (e) => {
            e.preventDefault();
            reportViolation('paste_attempt', { type: e.type });
        };

        const handleCut = (e) => {
            e.preventDefault();
            reportViolation('cut_attempt', { type: e.type });
        };

        document.addEventListener('copy', handleCopy);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('cut', handleCut);

        return () => {
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('cut', handleCut);
        };
    }, [enabled, reportViolation]);

    // Keyboard shortcut prevention
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e) => {
            // Prevent common cheating shortcuts
            const blockedCombos = [
                { key: 'c', ctrl: true },  // Copy
                { key: 'v', ctrl: true },  // Paste
                { key: 'x', ctrl: true },  // Cut
                { key: 'a', ctrl: true },  // Select all
                { key: 'p', ctrl: true },  // Print
                { key: 's', ctrl: true },  // Save
                { key: 'u', ctrl: true },  // View source
                { key: 'F12' },             // DevTools
                { key: 'F5' },              // Refresh
                { key: 'F11' },             // Fullscreen toggle
            ];

            // Check if shift+ctrl+i (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
                e.preventDefault();
                reportViolation('devtools_attempt', { shortcut: 'Ctrl+Shift+I' });
                return;
            }

            // Check if shift+ctrl+j (Console)
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
                e.preventDefault();
                reportViolation('devtools_attempt', { shortcut: 'Ctrl+Shift+J' });
                return;
            }

            for (const combo of blockedCombos) {
                const keyMatch = e.key === combo.key || e.key.toLowerCase() === combo.key?.toLowerCase();
                const ctrlMatch = combo.ctrl ? (e.ctrlKey || e.metaKey) : true;

                if (keyMatch && ctrlMatch) {
                    e.preventDefault();
                    reportViolation('blocked_shortcut', { 
                        key: e.key, 
                        ctrl: e.ctrlKey,
                        shift: e.shiftKey,
                        alt: e.altKey,
                    });
                    return;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [enabled, reportViolation]);

    // Context menu prevention
    useEffect(() => {
        if (!enabled) return;

        const handleContextMenu = (e) => {
            e.preventDefault();
            reportViolation('context_menu', { 
                x: e.clientX, 
                y: e.clientY,
            });
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, [enabled, reportViolation]);

    // DevTools detection (size-based)
    useEffect(() => {
        if (!enabled) return;

        const threshold = 160;

        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            if ((widthThreshold || heightThreshold) && !devToolsOpenRef.current) {
                devToolsOpenRef.current = true;
                reportViolation('devtools_open', {
                    outerWidth: window.outerWidth,
                    innerWidth: window.innerWidth,
                    outerHeight: window.outerHeight,
                    innerHeight: window.innerHeight,
                });
            } else if (!widthThreshold && !heightThreshold) {
                devToolsOpenRef.current = false;
            }
        };

        const interval = setInterval(detectDevTools, 1000);
        window.addEventListener('resize', detectDevTools);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', detectDevTools);
        };
    }, [enabled, reportViolation]);

    // Fullscreen exit detection
    useEffect(() => {
        if (!enabled) return;

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                reportViolation('fullscreen_exit', {
                    timestamp: new Date().toISOString(),
                });
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [enabled, reportViolation]);

    // Text selection prevention
    useEffect(() => {
        if (!enabled) return;

        const style = document.createElement('style');
        style.textContent = `
            body {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            input, textarea {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [enabled]);

    return {
        violationCount: violationCountRef.current,
        reportViolation,
    };
}
