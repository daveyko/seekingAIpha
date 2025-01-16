import { Processor, Reader, Responder } from './models/'

export class Pipeline {
    private reader: Reader;
    private processor: Processor;
    private responder: Responder;

    constructor(reader: Reader, processor: Processor, responder: Responder) {
        this.reader = reader;
        this.processor = processor;
        this.responder = responder;
    }

    async run(params: Record<string, any>): Promise<void> {
        const data = await this.reader.read(params);
        for (const item of data) {
            const processed = await this.processor.process(item);
            await this.responder.respond(processed);
        }
    }
}