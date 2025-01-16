import { Reader } from './Reader';

//https://docs.x.com/x-api/posts/user-mention-timeline-by-user-id
export class ReaderTwitter implements Reader {
    read(params: Record<string, any>): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
} 