import { EventBus } from "../event.bus";
import { EventBaseHandler } from "../models/event-handlers.interface";
import { EventBase } from "../models/event.interface";
import { Types } from "../types";
import { BuilderBase } from "./builder.base";

export class EventBusBuilder extends BuilderBase<EventBus> {
  build(): EventBus {
    this.checkResolver();
    const bus = new EventBus(this._logger);
    if (this._resolver.hasDepedency(Types.EventHandler)) {
      const handlers = this._resolver.resolve<EventBaseHandler<EventBase>>(
        Types.EventHandler
      );
      bus.register(handlers);
    }

    return bus;
  }
}
