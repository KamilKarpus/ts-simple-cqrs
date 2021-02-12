import { CommandBase, QueryBase } from "./models/request-interface";

export interface IMemoryBus {
  excuteQuery<T>(query: QueryBase): Promise<Response>;
  excuteCommand(command: CommandBase): Promise<any>;
}
