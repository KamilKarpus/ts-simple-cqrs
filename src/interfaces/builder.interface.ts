import { Container } from "inversify";
import { ILogger } from "./logger.interface";

export interface IBuilder<T> {
  addLogger(logger: ILogger): this;
  addInversifyContainer(container: Container): this;
  build(): T;
}
