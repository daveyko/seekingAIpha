import { Pool } from 'pg';

export class DatabaseHandler {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
    // Get the current offset
    async getOffset(): Promise<string | null> {
        const result = await this.pool.query('SELECT offset_id FROM offset LIMIT 1');
        return result.rows.length ? result.rows[0].offset_id : null;
    }

    // Set the current offset
    async setOffset(offsetId: string): Promise<void> {
        await this.pool.query(`
      INSERT INTO offset (id, offset_id)
      VALUES (1, $1)
      ON CONFLICT (id) DO UPDATE SET offset_id = EXCLUDED.offset_id
    `, [offsetId]);
    }

    // Get a whale wallet by walletId
    async getWallet(walletId: string): Promise<any | null> {
        const result = await this.pool.query('SELECT * FROM whale_wallets WHERE wallet_id = $1', [walletId]);
        return result.rows.length ? result.rows[0] : null;
    }

    // Save or update a whale wallet
    async saveWallet(walletId: string, tokenBalance: Record<string, number>, lastTrackedTransactionTokenId: string, lastTrackedTransactionId: string): Promise<void> {
        await this.pool.query(`
      INSERT INTO whale_wallets (wallet_id, token_balance, last_tracked_transaction_token_id, last_tracked_transaction_id)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (wallet_id) DO UPDATE SET
        token_balance = EXCLUDED.token_balance,
        last_tracked_transaction_token_id = EXCLUDED.last_tracked_transaction_token_id,
        last_tracked_transaction_id = EXCLUDED.last_tracked_transaction_id
    `, [walletId, tokenBalance, lastTrackedTransactionTokenId, lastTrackedTransactionId]);
    }
}