import { supabase } from './supabase';

export interface Score {
    id: string;
    time_ms: number;
    wallet_address?: string;
    created_at: string;
}

/**
 * Fetches the top 50 scores from Supabase.
 */
export const fetchLeaderboard = async (): Promise<Score[]> => {
    const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('time_ms', { ascending: true })
        .limit(50);

    if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }

    return data || [];
};

/**
 * Submits a new score with the verified wallet address and transaction signature.
 */
export const submitScore = async (
    timeMs: number,
    walletAddress: string,
    txSignature: string
) => {
    const { data, error } = await supabase
        .from('scores')
        .insert([
            {
                time_ms: timeMs,
                wallet_address: walletAddress,
                tx_signature: txSignature,
            },
        ])
        .select();

    if (error) {
        console.error('Error submitting score:', error);
        throw error;
    }

    return data;
};
