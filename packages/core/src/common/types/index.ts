import { Context, ContextSubTypes, ContextTypes, VK } from "vk-io";
import { App } from "../../app/App";
import { Module } from "../../module/Module";

export interface ICommandOptions {
    prefix?: string;
}

export interface ILogger {
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug?(message: any, context?: string): void;
    verbose?(message: any, context?: string): void;
}

export interface IClient {
    bot: VK;
    start: () => boolean;
    initialize_vk_event(event: { name: ContextTypes & ContextSubTypes; }, module: Module, handler: () => any): void;
    initialize_command(command: { trigger: string | RegExp, options: ICommandOptions; }, module: Module, handler: () => any): void;
}

export interface IModule {
    new(...args: any[]);
}

export interface IGlobalConfig {
    modules: IModule[],
    on_start?: (app: App) => void;
}