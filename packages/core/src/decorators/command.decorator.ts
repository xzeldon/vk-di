import { ICommandOptions } from "../common";

export function Command(name: string, options?: ICommandOptions): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata('on:command', { name, options }, target);
    };
}