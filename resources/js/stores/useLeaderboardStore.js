import { create } from 'zustand';

const useLeaderboardStore = create((set, get) => ({
    // Leaderboard data
    rankings: [],
    tryoutId: null,
    tryoutTitle: '',
    
    // Connection state
    isConnected: false,
    lastUpdated: null,
    
    // Current user
    currentUserId: null,
    currentUserRank: null,
    
    // Initialize leaderboard
    init: (data) => set({
        rankings: data.rankings || [],
        tryoutId: data.tryoutId,
        tryoutTitle: data.tryoutTitle || '',
        currentUserId: data.currentUserId,
        currentUserRank: data.currentUserRank,
        lastUpdated: new Date(),
    }),
    
    // Update rankings
    setRankings: (rankings) => set({
        rankings,
        lastUpdated: new Date(),
    }),
    
    // Update single ranking (when new result comes in)
    updateRanking: (newRanking) => set((state) => {
        const existingIndex = state.rankings.findIndex(
            r => r.user_id === newRanking.user_id
        );
        
        let updatedRankings;
        if (existingIndex >= 0) {
            // Update existing entry
            updatedRankings = [...state.rankings];
            updatedRankings[existingIndex] = newRanking;
        } else {
            // Add new entry
            updatedRankings = [...state.rankings, newRanking];
        }
        
        // Re-sort by score descending, then by duration ascending
        updatedRankings.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (a.duration_seconds || 0) - (b.duration_seconds || 0);
        });
        
        // Recalculate ranks
        updatedRankings = updatedRankings.map((r, index) => ({
            ...r,
            rank: index + 1,
        }));
        
        // Update current user rank if applicable
        const currentUserRank = updatedRankings.find(
            r => r.user_id === state.currentUserId
        )?.rank || null;
        
        return {
            rankings: updatedRankings,
            currentUserRank,
            lastUpdated: new Date(),
        };
    }),
    
    // Set connection status
    setConnected: (isConnected) => set({ isConnected }),
    
    // Get top N rankings
    getTopRankings: (n = 10) => {
        const { rankings } = get();
        return rankings.slice(0, n);
    },
    
    // Get current user's ranking data
    getCurrentUserRanking: () => {
        const { rankings, currentUserId } = get();
        return rankings.find(r => r.user_id === currentUserId) || null;
    },
    
    // Clear leaderboard
    clear: () => set({
        rankings: [],
        tryoutId: null,
        tryoutTitle: '',
        isConnected: false,
        lastUpdated: null,
        currentUserRank: null,
    }),
}));

export default useLeaderboardStore;
