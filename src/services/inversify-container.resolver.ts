import { Container } from "inversify";
import { IContainerResolver } from "../interfaces/container.resolver.interface";

export class InversifyContainerResolver implements IContainerResolver {
  private readonly _container: Container;
  constructor(container: Container) {
    this._container = container;
  }
  hasDepedency(param: string): boolean {
    return this._container.isBound(param);
  }

  resolve<T>(param: string): T[] {
    return this._container.getAll<T>(param) || [];
  }
}
