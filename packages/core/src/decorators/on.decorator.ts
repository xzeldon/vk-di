import { ContextTypes, ContextSubTypes } from 'vk-io';

export function On(event_name: ContextTypes | ContextSubTypes): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata('on:event', { name: event_name }, target);
    };
}