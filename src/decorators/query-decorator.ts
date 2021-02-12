import { REQUEST_KEY_HANDLER } from "../metadate.constants"
import { QueryBase } from "../models"

export const QueryHandler = (query : QueryBase) : ClassDecorator =>{
    return (target : object) =>{
        Reflect.defineMetadata(REQUEST_KEY_HANDLER, query, ((target as unknown) as Function).prototype);
    }
}