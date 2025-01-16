import { Processor } from './Processor'
import { HeliusClient } from '../../clients/Helius'

export class ProcessorWallet implements Processor {
    private heliusClient: HeliusClient

    constructor(heliusClient: HeliusClient) {
        this.heliusClient = heliusClient;
    }

    process(data: any): Promise<any> {
        return this.heliusClient.getParsedTransactions(data.mintAddress);
    }
}