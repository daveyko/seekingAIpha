export interface Responder {
    respond(output: any): Promise<void>;
}