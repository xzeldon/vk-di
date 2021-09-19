import { ContextTypes, ContextSubTypes } from 'vk-io';
import { EVENT_METADATA } from '../common';

export function On(event_name: ContextTypes | ContextSubTypes): MethodDecorator {
    return (target: object, key: string) => {
        Reflect.defineMetadata(EVENT_METADATA, { name: event_name }, target, key);
    };
}