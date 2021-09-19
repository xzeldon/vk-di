import { EVENT_METADATA, ICommandOptions } from "../common";

export function Command(trigger: string | RegExp, options?: ICommandOptions): MethodDecorator {
    return (target: object, key: string) => {
        Reflect.defineMetadata(EVENT_METADATA, { trigger, options }, target, key);
    };
}