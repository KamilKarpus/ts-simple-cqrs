import { ILogger } from "../interfaces/logger.interface";


enum Level{
    trace = "TRACE",
    debug = "DEBUG",
    info = "INFO",
    warn = "WARN",
    error = "ERROR"
}


export class Logger implements ILogger{
    trace(message: string): void {
        var log = this.buildMessage(Level.trace, message);
        console.trace(log);
    }
    debug(message: string): void {
        var log = this.buildMessage(Level.debug, message);
        console.debug(log);
    }
    info(message: string): void {
        var log = this.buildMessage(Level.info, message);
        console.info(log);
    }
    warn(message: string): void {
        var log = this.buildMessage(Level.warn, message);
        console.warn(log);
    }
    error(message: string): void {
        var log = this.buildMessage(Level.error, message);
        console.error(log);
    }

    buildMessage(level : string, message : string) : string{
        return `[${level}][${new Date().toLocaleString()}] ${message}`;
    }
}