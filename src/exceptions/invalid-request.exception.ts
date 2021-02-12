export class InvalidRequestException extends Error{
    constructor(type: string, name : string){
        super(`The ${type} was not found with ${name}. Missing decorator?`);
    }
}

