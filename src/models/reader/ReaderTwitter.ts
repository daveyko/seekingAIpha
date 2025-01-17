import { Reader } from './Reader';
import { DatabaseHandler } from '../../db/'

//https://docs.x.com/x-api/posts/user-mention-timeline-by-user-id
export class ReaderTwitter implements Reader {
    private db;
    //TODO: don't couple database directly to this class -- use a service instead in the future
    constructor(db: DatabaseHandler) {
        this.db = db;
    }
    read(params: Record<string, any>): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
} 