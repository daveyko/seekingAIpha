export interface Reader {
    read(params: Record<string, any>): Promise<any[]>;
}