import { ContextSubTypes, ContextTypes, MessageContext, VK } from "vk-io";
import { VKOptions } from "vk-io/lib/types";
import { IClient, ICommandOptions, Logger } from "../common";
import { Module } from "../module/Module";

export class Client implements IClient {
    public bot: VK;

    private logger = new Logger('ClientService');

    constructor(options: Partial<VKOptions> & { token: string; }) {
        this.bot = new VK({ token: options.token });
    }

    initialize_vk_event(
        event: { name: ContextTypes & ContextSubTypes; },
        module: Module,
        handler: () => any
    ): void {
        this.bot.updates.on(event.name, (context) => {
            handler.call(module, context);
        });
    }

    initialize_command(
        command: { trigger: string | RegExp, options?: ICommandOptions; },
        module: Module,
        handler: () => any
    ): void {
        if (!command.trigger) {
            return this.logger.error('The command trigger is not specified');
        }

        const { options } = command;

        const prefix = options && options.prefix
            ? options.prefix
            : module.config?.prefix;

        const cmd_string = prefix === undefined ? command.trigger : `${prefix}${command.trigger}`;

        this.bot.updates.on('message_new', (message: MessageContext) => {
            if (message.text === cmd_string) {
                handler.call(module, message);
            }
        });
    }

    public start(): boolean {
        try {
            this.bot.updates.start();
            return true;
        } catch (err) {
            this.logger.error('An Error occured while gets Updates: ', err);
        }
    }
}