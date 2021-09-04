import { ContextTypes, ContextSubTypes } from 'vk-io';

export function On(event_name: ContextTypes | ContextSubTypes): MethodDecorator {
    return (target: object, key: string) => {
        Reflect.defineMetadata('on:event', { name: event_name }, target, key);
    };
}