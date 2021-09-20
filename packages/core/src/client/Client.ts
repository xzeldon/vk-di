import { ContextSubTypes, ContextTypes, MessageContext, VK } from "vk-io";
import { VKOptions } from "vk-io/lib/types";
import { ConfigureError, IClient, ICommandOptions, Logger } from "../common";
import { Module } from "../module/Module";

export class Client implements IClient {
    public bot: VK;

    private logger = new Logger('ClientService');

    constructor(options: Partial<VKOptions> & { token: string; }) {
        this.bot = new VK({ token: options.token });
    }

    initialize_vk_event(
        event: { name: ContextTypes & ContextSubTypes, options?: { next?: boolean; }; },
        module: Module,
        handler: () => any
    ): void {
        this.bot.updates.on(event.name, (context, next) => {
            handler.call(module, context, event.options?.next ? next() : undefined);
        });
    }

    initialize_command(
        command: { trigger: string | RegExp, options?: ICommandOptions; },
        module: Module,
        handler: () => any
    ): void {
        if (!command.trigger) {
            throw new ConfigureError('The command trigger is not specified');
        }

        if (typeof handler !== 'function') {
            throw new ConfigureError('Handler must be a function');
        }

        const { options } = command;

        const prefix = options && options.prefix
            ? options.prefix
            : module.config?.prefix;

        let cmd_string: string | RegExp;

        if (command.trigger instanceof RegExp && prefix) {
            throw new ConfigureError(`Don\'t use prefix with RegExp as a command trigger.\nInstead, add the desired prefix directly to the regular expression.`);
        }

        cmd_string = prefix === undefined ? command.trigger : `${prefix}${command.trigger}`;

        this.bot.updates.on('message_new', (message: MessageContext, next) => {
            if (cmd_string instanceof RegExp) {
                const passed = cmd_string.test(message.text!);
                if (passed) {
                    message.$match = message.text!.match(cmd_string)!;
                    handler.call(module, message);
                }
            }

            if (message.text === cmd_string) {
                handler.call(module, message);
            }

            if (next) next();
        });
    }

    public start(): boolean {
        try {
            this.bot.updates.start();
            return true;
        } catch (err) {
            this.logger.error('An Error occured while gets Updates: ', err);
            return false;
        }
    }
}