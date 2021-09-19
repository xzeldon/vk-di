import { TO_INJECT_METADATA } from "../common";

export function Inject(to_inject: object | object[]): ClassDecorator {
    return (target: Function) => {
        if (Array.isArray(to_inject)) {
            Reflect.defineMetadata(TO_INJECT_METADATA, to_inject, target.prototype);
        } else {
            Reflect.defineMetadata(TO_INJECT_METADATA, [to_inject], target.prototype);
        }
    };
}