import { create } from 'zustand';

// Exam State Store
export const useExamStore = create((set, get) => ({
    // Session data
    session: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    markedQuestions: [],
    
    // Timer
    remainingTime: 0,
    serverEndTime: null,
    
    // Violation tracking
    violationCount: 0,
    maxViolations: 5,
    
    // UI state
    isFullscreen: false,
    isSaving: false,
    showNavigation: true,
    
    // Actions
    setSession: (session) => set({ 
        session,
        remainingTime: session.remaining_time,
        serverEndTime: new Date(session.server_end_time),
        violationCount: session.violation_count,
        maxViolations: session.max_violations,
    }),
    
    setQuestions: (questions) => {
        const answers = {};
        const markedQuestions = [];
        
        questions.forEach(q => {
            if (q.current_answer) {
                answers[q.id] = q.current_answer;
            }
            if (q.marked) {
                markedQuestions.push(q.id);
            }
        });
        
        set({ questions, answers, markedQuestions });
    },
    
    setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
    
    goToQuestion: (questionId) => {
        const index = get().questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            set({ currentQuestionIndex: index });
        }
    },
    
    nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
            set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
    },
    
    prevQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
            set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
    },
    
    setAnswer: (questionId, answer) => set((state) => ({
        answers: { ...state.answers, [questionId]: answer }
    })),
    
    toggleMark: (questionId) => set((state) => {
        const isMarked = state.markedQuestions.includes(questionId);
        return {
            markedQuestions: isMarked
                ? state.markedQuestions.filter(id => id !== questionId)
                : [...state.markedQuestions, questionId]
        };
    }),
    
    updateTimer: (seconds) => set({ remainingTime: seconds }),
    
    incrementViolation: () => set((state) => ({
        violationCount: state.violationCount + 1
    })),
    
    setFullscreen: (isFullscreen) => set({ isFullscreen }),
    
    setSaving: (isSaving) => set({ isSaving }),
    
    toggleNavigation: () => set((state) => ({ showNavigation: !state.showNavigation })),
    
    // Computed
    getCurrentQuestion: () => {
        const { questions, currentQuestionIndex } = get();
        return questions[currentQuestionIndex] || null;
    },
    
    getProgress: () => {
        const { questions, answers } = get();
        const answered = Object.keys(answers).filter(id => answers[id]).length;
        return {
            answered,
            total: questions.length,
            percentage: questions.length > 0 ? (answered / questions.length) * 100 : 0,
        };
    },
    
    getQuestionStatus: (questionId) => {
        const { answers, markedQuestions } = get();
        if (markedQuestions.includes(questionId)) return 'marked';
        if (answers[questionId]) return 'answered';
        return 'unanswered';
    },
    
    reset: () => set({
        session: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        markedQuestions: [],
        remainingTime: 0,
        serverEndTime: null,
        violationCount: 0,
        isFullscreen: false,
        isSaving: false,
    }),
}));

// Leaderboard State Store
export const useLeaderboardStore = create((set) => ({
    entries: [],
    userRank: null,
    totalParticipants: 0,
    isLoading: false,
    
    setEntries: (entries) => set({ entries }),
    setUserRank: (rank) => set({ userRank: rank }),
    setTotalParticipants: (total) => set({ totalParticipants: total }),
    setLoading: (isLoading) => set({ isLoading }),
    
    updateEntry: (newEntry) => set((state) => {
        const existingIndex = state.entries.findIndex(
            e => e.user.id === newEntry.user_id
        );
        
        if (existingIndex !== -1) {
            const updated = [...state.entries];
            updated[existingIndex] = {
                ...updated[existingIndex],
                rank: newEntry.rank,
                score: newEntry.score,
                percentage: newEntry.percentage,
            };
            // Re-sort by rank
            updated.sort((a, b) => a.rank - b.rank);
            return { entries: updated };
        }
        
        // Add new entry
        const updated = [...state.entries, {
            rank: newEntry.rank,
            user: {
                id: newEntry.user_id,
                name: newEntry.user_name,
                school: newEntry.school,
            },
            score: newEntry.score,
            percentage: newEntry.percentage,
            correct_count: newEntry.correct_count,
            time_taken: newEntry.time_taken,
        }];
        updated.sort((a, b) => a.rank - b.rank);
        return { entries: updated.slice(0, 20) };
    }),
}));
