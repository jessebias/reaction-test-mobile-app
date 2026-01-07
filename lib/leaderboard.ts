import { supabase } from './supabase';

export interface Score {
    id: string;
    time_ms: number;
    score?: number;
    wallet_address?: string;
    created_at: string;
    game_mode?: string;
}

export const fetchLeaderboard = async (gameMode: string = 'reaction_test'): Promise<Score[]> => {
    let query = supabase
        .from('scores')
        .select('*')
        .eq('game_mode', gameMode);

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
                score: score,
                wallet_address: walletAddress,
                tx_signature: txSignature,
                game_mode: gameMode,
            },
        ])
        .select();

    if (error) {
        console.error('[Leaderboard] Supabase Error:', error);
        throw error;
    }

    return data;
};
