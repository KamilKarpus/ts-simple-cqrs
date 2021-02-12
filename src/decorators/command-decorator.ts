import 'reflect-metadata'
import { REQUEST_KEY_HANDLER } from '../metadate.constants'
import { CommandBase } from '../models'

export const CommnadHandler = (command : CommandBase) : ClassDecorator =>{
    return (target : object) =>{
        Reflect.defineMetadata(REQUEST_KEY_HANDLER,command, ((target as unknown) as Function).prototype)
    }
}