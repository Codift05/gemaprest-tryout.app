import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useExamStore = create(
    persist(
        (set, get) => ({
            // Session state
            sessionId: null,
            tryoutId: null,
            endTime: null,
            
            // Questions & Answers
            questions: [],
            answers: {},
            currentIndex: 0,
            
            // Flags
            flaggedQuestions: new Set(),
            
            // Violations
            violationCount: 0,
            maxViolations: 3,
            
            // UI State
            isFullscreen: false,
            showNavigation: true,
            
            // Initialize exam session
            initSession: (data) => set({
                sessionId: data.sessionId,
                tryoutId: data.tryoutId,
                endTime: data.endTime,
                questions: data.questions || [],
                answers: data.answers || {},
                currentIndex: 0,
                flaggedQuestions: new Set(data.flaggedQuestions || []),
                violationCount: data.violationCount || 0,
                maxViolations: data.maxViolations || 3,
            }),
            
            // Clear session
            clearSession: () => set({
                sessionId: null,
                tryoutId: null,
                endTime: null,
                questions: [],
                answers: {},
                currentIndex: 0,
                flaggedQuestions: new Set(),
                violationCount: 0,
                isFullscreen: false,
            }),
            
            // Navigation
            setCurrentIndex: (index) => set({ currentIndex: index }),
            goToNext: () => {
                const { currentIndex, questions } = get();
                if (currentIndex < questions.length - 1) {
                    set({ currentIndex: currentIndex + 1 });
                }
            },
            goToPrev: () => {
                const { currentIndex } = get();
                if (currentIndex > 0) {
                    set({ currentIndex: currentIndex - 1 });
                }
            },
            
            // Answer management
            setAnswer: (questionId, answer) => set((state) => ({
                answers: {
                    ...state.answers,
                    [questionId]: answer,
                },
            })),
            
            // Flag management
            toggleFlag: (questionId) => set((state) => {
                const newFlags = new Set(state.flaggedQuestions);
                if (newFlags.has(questionId)) {
                    newFlags.delete(questionId);
                } else {
                    newFlags.add(questionId);
                }
                return { flaggedQuestions: newFlags };
            }),
            isFlagged: (questionId) => get().flaggedQuestions.has(questionId),
            
            // Violation tracking
            addViolation: () => set((state) => ({
                violationCount: state.violationCount + 1,
            })),
            
            // Fullscreen
            setFullscreen: (isFullscreen) => set({ isFullscreen }),
            
            // Toggle navigation panel
            toggleNavigation: () => set((state) => ({
                showNavigation: !state.showNavigation,
            })),
            
            // Get current question
            getCurrentQuestion: () => {
                const { questions, currentIndex } = get();
                return questions[currentIndex] || null;
            },
            
            // Get answer status counts
            getAnswerStats: () => {
                const { questions, answers, flaggedQuestions } = get();
                const answered = Object.keys(answers).length;
                const unanswered = questions.length - answered;
                const flagged = flaggedQuestions.size;
                return { answered, unanswered, flagged, total: questions.length };
            },
            
            // Check if question is answered
            isAnswered: (questionId) => {
                const { answers } = get();
                return answers.hasOwnProperty(questionId) && answers[questionId] !== null;
            },
        }),
        {
            name: 'exam-storage',
            partialize: (state) => ({
                sessionId: state.sessionId,
                tryoutId: state.tryoutId,
                answers: state.answers,
                currentIndex: state.currentIndex,
                flaggedQuestions: Array.from(state.flaggedQuestions),
            }),
            onRehydrateStorage: () => (state) => {
                if (state && state.flaggedQuestions) {
                    state.flaggedQuestions = new Set(state.flaggedQuestions);
                }
            },
        }
    )
);

export default useExamStore;
