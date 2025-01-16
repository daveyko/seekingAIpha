import { Responder } from './Responder'

export class ResponderTwitter implements Responder {
    async respond(output: any): Promise<void> {
        console.log(`Tweeting: ${output}`);
    }
}