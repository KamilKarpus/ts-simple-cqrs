export class InvalidOperationException extends Error{
    constructor(name : string){
        super(`The operation handler was not found ${name}. Missing decorator?`);
    }
}