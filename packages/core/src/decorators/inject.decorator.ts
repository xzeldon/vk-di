export function Inject(to_inject: object | object[]): ClassDecorator {
    return (target: Function) => {
        if (Array.isArray(to_inject)) {
            Reflect.defineMetadata('toInject', to_inject, target.prototype);
        } else {
            Reflect.defineMetadata('toInject', [to_inject], target.prototype);
        }
    };
}