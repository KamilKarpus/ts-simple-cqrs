import { EventBase } from "./models/event.interface";

export interface IEventBus{
    publish(event: EventBase): void;
    publishMany(events: EventBase[]): void;
}