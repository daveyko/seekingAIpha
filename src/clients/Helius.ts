import axios from 'axios';

export class HeliusClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = `https://api.helius.xyz/v0`;
    }

    async getParsedTransactions(mintAddress: string): Promise<any[]> {
        const url = `${this.baseUrl}/tokens/${mintAddress}/transactions?&apiKey=${this.apiKey}`;
        const response = await axios.get(url);
        return response.data || [];
    }
}