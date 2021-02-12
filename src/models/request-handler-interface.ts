import { CommandBase, QueryBase, RequestBase } from "./request-interface";

export interface RequestBaseHandler<Request extends RequestBase, Response>{
    handle(request : Request) : Promise<Response>;
}

export interface QueryBaseHandler<Request extends QueryBase, Response> extends RequestBaseHandler<Request, Response>{
    
}

export interface CommandBaseHandler<Request extends CommandBase> extends RequestBaseHandler<Request, void>{

}

export interface CommandBaseHandlerWithResponse<Request extends CommandBase, Response> extends RequestBaseHandler<Request, Response>{

}