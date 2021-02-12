import { EventBase } from "./event.interface";

export interface EventBaseHandler<T extends EventBase>{
    handle(event : T) : Promise<void>;
}