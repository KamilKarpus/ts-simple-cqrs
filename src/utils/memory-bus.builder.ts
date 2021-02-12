import { RequestBaseHandler } from "../models/request-handler-interface";
import { RequestBase } from "../models/request-interface";
import { MemoryBus } from "../memory-bus";
import { BuilderBase } from "./builder.base";
import { Types } from "../types";

export class MemoryBusBuilder extends BuilderBase<MemoryBus> {
  build(): MemoryBus {
    const bus = new MemoryBus(this._logger);

    this.checkResolver();
    if (this._resolver.hasDepedency(Types.CommnadHandler)) {
      var commandHandlers = this._resolver.resolve<
        RequestBaseHandler<RequestBase, any>
      >(Types.CommnadHandler);
      bus.registerMany(commandHandlers);
    }

    if (this._resolver.hasDepedency(Types.QueryHandler)) {
      var queryHandlers = this._resolver.resolve<
        RequestBaseHandler<RequestBase, any>
      >(Types.QueryHandler);
      bus.registerMany(queryHandlers);
    }
    return bus;
  }
}
