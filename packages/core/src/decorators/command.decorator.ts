import { COMMAND_METADATA, ICommandOptions } from "../common";

export function Command(trigger: string | RegExp, options?: ICommandOptions): MethodDecorator {
    return (target: object, key: string) => {
        Reflect.defineMetadata(COMMAND_METADATA, { trigger, options }, target, key);
    };
}