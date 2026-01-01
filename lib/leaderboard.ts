import { supabase } from './supabase';

export interface Score {
    id: string;
    time_ms: number;
    score?: number; // For streak-based games
    wallet_address?: string;
    created_at: string;
    game_mode?: string;
}

/**
 * Fetches the top 50 scores from Supabase for a specific game mode.
 * Handles sorting logic:
 * - Reaction/Multi-Zone: Low Time (ASC)
 * - Progressive Speed: High Score (DESC)
 */
export const fetchLeaderboard = async (gameMode: string = 'reaction_test'): Promise<Score[]> => {
    let query = supabase
        .from('scores')
        .select('*')
        .eq('game_mode', gameMode);

    // Dynamic Sorting based on Game Mode
    if (gameMode === 'progressive_speed') {
        query = query.order('score', { ascending: false });
    } else {
        query = query.order('time_ms', { ascending: true });
    }

    const { data, error } = await query.limit(50);

    if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }

    return data || [];
};

/**
 * Submits a new score with the verified wallet address and transaction signature.
 * Accepts optional 'score' for streak-based games.
 */
export const submitScore = async (
    timeMs: number,
    walletAddress: string,
    txSignature: string,
    gameMode: string = 'reaction_test',
    score: number = 0
) => {
    const { data, error } = await supabase
        .from('scores')
        .insert([
            {
                time_ms: timeMs,
                score: score, // Store streak here
                wallet_address: walletAddress,
                tx_signature: txSignature,
                game_mode: gameMode,
            },
        ])
        .select();

    if (error) {
        console.error('Error submitting score:', error);
        throw error;
    }

    return data;
};
