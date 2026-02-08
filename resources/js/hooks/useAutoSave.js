import { useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook for auto-saving exam answers
 * @param {number} sessionId - Exam session ID
 * @param {object} answers - Current answers object
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 2000)
 */
export default function useAutoSave(sessionId, answers, debounceMs = 2000) {
    const timeoutRef = useRef(null);
    const lastSavedRef = useRef({});
    const isSavingRef = useRef(false);
    const pendingRef = useRef(null);

    // Save a single answer to server
    const saveAnswer = useCallback(async (questionId, answer) => {
        if (!sessionId) return;

        try {
            await axios.post(route('exam.save-answer', sessionId), {
                question_id: questionId,
                answer: answer,
            });
            lastSavedRef.current[questionId] = answer;
        } catch (error) {
            console.error('Failed to save answer:', error);
            throw error;
        }
    }, [sessionId]);

    // Save all unsaved answers
    const saveAllAnswers = useCallback(async () => {
        if (!sessionId || isSavingRef.current) return;

        const unsavedAnswers = Object.entries(answers).filter(
            ([questionId, answer]) => lastSavedRef.current[questionId] !== answer
        );

        if (unsavedAnswers.length === 0) return;

        isSavingRef.current = true;

        try {
            await Promise.all(
                unsavedAnswers.map(([questionId, answer]) => 
                    saveAnswer(questionId, answer)
                )
            );
        } catch (error) {
            console.error('Failed to save some answers:', error);
        } finally {
            isSavingRef.current = false;
        }
    }, [sessionId, answers, saveAnswer]);

    // Debounced save effect
    useEffect(() => {
        if (!sessionId) return;

        // Find changed answers
        const changedAnswers = Object.entries(answers).filter(
            ([questionId, answer]) => lastSavedRef.current[questionId] !== answer
        );

        if (changedAnswers.length === 0) return;

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new debounced save
        timeoutRef.current = setTimeout(() => {
            changedAnswers.forEach(([questionId, answer]) => {
                saveAnswer(questionId, answer);
            });
        }, debounceMs);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [sessionId, answers, debounceMs, saveAnswer]);

    // Save on page unload
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // Check for unsaved changes
            const hasUnsaved = Object.entries(answers).some(
                ([questionId, answer]) => lastSavedRef.current[questionId] !== answer
            );

            if (hasUnsaved) {
                // Attempt to save synchronously (may not complete)
                navigator.sendBeacon(
                    route('exam.save-answer', sessionId),
                    JSON.stringify({
                        answers: answers,
                        _token: document.querySelector('meta[name="csrf-token"]')?.content,
                    })
                );

                // Show browser's default "unsaved changes" warning
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [sessionId, answers]);

    return {
        saveAnswer,
        saveAllAnswers,
        isSaving: isSavingRef.current,
        lastSaved: lastSavedRef.current,
    };
}
