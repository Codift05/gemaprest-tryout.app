import { create } from 'zustand';

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

export default useLeaderboardStore;
