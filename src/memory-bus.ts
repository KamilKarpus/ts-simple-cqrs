import {
  CommandBase,
  QueryBase,
  RequestBase,
} from "./models/request-interface";
import { InvalidOperationException } from "./exceptions/invalid-operation.exception";
import { IMemoryBus } from "./memory-bus.interface";
import { injectable } from "inversify";
import "reflect-metadata";
import { RequestBaseHandler } from "./models/request-handler-interface";
import { nameof } from "ts-simple-nameof";
import { REQUEST_KEY_HANDLER } from "./metadate.constants";
import { ILogger } from "./interfaces/logger.interface";
import { InvalidRequestException } from "./exceptions/invalid-request.exception";

@injectable()
export class MemoryBus implements IMemoryBus {
  private readonly _handlers: Map<string, RequestBaseHandler<RequestBase, any>>;
  private readonly _logger: ILogger;
  constructor(logger: ILogger) {
    this._logger = logger;
    this._handlers = new Map<string, RequestBaseHandler<RequestBase, any>>();
  }

  public registerMany(handlers: RequestBaseHandler<RequestBase, any>[]) {
    handlers.forEach((item) => {
      if (item) this.register(item);
    });
  }

  public register(handler: RequestBaseHandler<RequestBase, any>) {
    const requestName = this.reflectRequestName(handler);
    if (!requestName) {
      throw new InvalidRequestException("request", requestName);
    }
    this._handlers[requestName] = handler;
  }

  private reflectRequestName(handler: RequestBaseHandler<RequestBase, any>) {
    const metadata = Reflect.getMetadata(REQUEST_KEY_HANDLER, handler);
    return nameof(metadata);
  }

  public excuteQuery<T>(query: QueryBase): Promise<T> {
    return this.execute<T>(query);
  }

  public excuteCommand(command: CommandBase): Promise<any> {
    return this.execute<any>(command);
  }
  private getRequestName(request: RequestBase): string {
    const { constructor } = request;
    return constructor.name as string;
  }
  private execute<T>(request: RequestBase): Promise<T> {
    const requestName = this.getRequestName(request);
    try {
      this._logger.info(`Starting handling ${requestName}`);
      var handler = this._handlers[requestName];
      if (!handler) {
        throw new InvalidOperationException(requestName);
      }
      return handler.handle(request);
    } catch (error) {
      this._logger.error(
        `Error occured when handling ${requestName} Error: ${error}`
      );
      throw error;
    }
  }
}
