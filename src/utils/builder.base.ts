import { Container } from "inversify";
import { ContainerNotProvidedException } from "../exceptions/container-not-provided.exception";
import { IBuilder } from "../interfaces/builder.interface";
import { IContainerResolver } from "../interfaces/container.resolver.interface";
import { ILogger } from "../interfaces/logger.interface";

import { Logger } from "../models/logger";
import { InversifyContainerResolver } from "../services/inversify-container.resolver";

export abstract class BuilderBase<T> implements IBuilder<T> {
  protected _logger: ILogger;
  protected _resolver: IContainerResolver;

  constructor() {
    this.useDefaultLogger();
  }

  addLogger(logger: ILogger) {
    this._logger = logger;
    return this;
  }
  addInversifyContainer(container: Container) {
    this._resolver = new InversifyContainerResolver(container);
    return this;
  }

  abstract build(): T;

  protected useDefaultLogger() {
    this._logger = new Logger();
  }

  protected checkResolver() {
    if (!this._resolver) {
      throw new ContainerNotProvidedException();
    }
  }
}
