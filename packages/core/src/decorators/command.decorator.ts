import { ICommandOptions } from "../common";

export function Command(name: string, options?: ICommandOptions): MethodDecorator {
    return (target: object, key: string) => {
        Reflect.defineMetadata('on:command', { name, options }, target, key);
    };
}