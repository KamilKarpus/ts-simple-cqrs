import { EVENT_KEY_HANDLER } from "../metadate.constants"
import { EventBase } from "../models/event.interface"
import 'reflect-metadata'

export const EventHandler =(event : EventBase) : ClassDecorator =>{
    return (target : object) =>{
        Reflect.defineMetadata(EVENT_KEY_HANDLER, event, ((target as unknown) as Function).prototype)
    }
}