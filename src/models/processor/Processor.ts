export interface Processor {
    process(data: any): Promise<any>;
}