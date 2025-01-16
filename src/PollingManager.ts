import { Pipeline } from './Pipeline'

export class PollingManager {
    private pipeline: Pipeline;
    private pollIntervalMs: number;
    private isPolling: boolean;
    private lastParams: Record<string, any>;

    constructor(pipeline: Pipeline, pollIntervalMinutes: number, initialParams: Record<string, any>) {
        this.pipeline = pipeline;
        this.pollIntervalMs = pollIntervalMinutes * 60 * 1000;
        this.isPolling = false;
        this.lastParams = initialParams; // e.g., { startTime: ..., endTime: ... }
    }

    start(): void {
        setInterval(async () => {
            if (this.isPolling) return;
            this.isPolling = true;
            try {
                // Dynamically construct parameters
                const newParams = this.constructNextParams(this.lastParams);

                console.log(`Polling with params: ${JSON.stringify(newParams)}`);
                await this.pipeline.run(newParams);
                this.lastParams = newParams; // Update for next poll
            } catch (error) {
                console.error('Polling error:', error);
            } finally {
                this.isPolling = false;
            }
        }, this.pollIntervalMs);
    }

    private constructNextParams(prevParams: Record<string, any>): Record<string, any> {
        // Example logic for time-based readers
        const startTime = prevParams.endTime || new Date(Date.now() - this.pollIntervalMs).toISOString();
        const endTime = new Date().toISOString();
        return { startTime, endTime };
    }
}