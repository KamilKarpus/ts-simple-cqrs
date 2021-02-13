import { Subject } from "rxjs";
import { EventBaseHandler } from "./models/event-handlers.interface";
import { EventBase } from "./models/event.interface";
import "reflect-metadata";
import { EVENT_KEY_HANDLER } from "./metadate.constants";
import { nameof } from "ts-simple-nameof";
import { InvalidOperationException } from "./exceptions/invalid-operation.exception";
import { InvalidRequestException } from "./exceptions/invalid-request.exception";
import { ILogger } from "./interfaces/logger.interface";
import { IEventBus } from "./event-bus.interface";
import { injectable } from "inversify";

@injectable()
export class EventBus implements IEventBus {
  private _subjects: Map<string, Subject<EventBase>>;
  private _logger: ILogger;

  constructor(logger: ILogger) {
    this._subjects = new Map<string, Subject<EventBase>>();
    this._logger = logger;
  }

  publish(event: EventBase): void {
    const eventName = this.getEventName(event);
    const subject = this._subjects[eventName];
    if (!subject) {
      this._logger.error("Handler not found for event!");
      throw new InvalidOperationException(eventName);
    }
    subject.next(event);
  }

  publishMany(events: EventBase[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }

  public register(handlers: EventBaseHandler<EventBase>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  public registerHandler(handler: EventBaseHandler<EventBase>) {
    const eventName = this.reflectEventName(handler);
    this.bindToSubject(handler, eventName);
  }

  private reflectEventName(handler: EventBaseHandler<EventBase>) {
    const metadata = Reflect.getMetadata(EVENT_KEY_HANDLER, handler);
    if(!metadata){
      const handlerName = this.getHandlerName(handler);
      this._logger.error(`Not found event for handler ${handlerName}!`);
      throw new InvalidRequestException("event",handlerName);
    }
    return nameof(metadata);
  }

  private getEventName(event: EventBase): string {
    const { constructor } = event;
    return constructor.name as string;
  }
  private getHandlerName(handler : EventBaseHandler<EventBase>): string{
    const { constructor} = handler;
    return constructor.name as string;
  }

  private bindToSubject(
    eventHandler: EventBaseHandler<EventBase>,
    eventName: string
  ) {
    const subject = this._subjects[eventName] || new Subject<EventBase>();
    subject.subscribe((event) => eventHandler.handle(event));
    this._subjects[eventName] = subject;
  }
}
