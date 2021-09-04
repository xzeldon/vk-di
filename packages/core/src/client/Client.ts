import { VK } from "vk-io";
import { VKOptions } from "vk-io/lib/types";
import { ICommandOptions, Logger } from "../common";

export class Client {
    public bot: VK;

    private logger = new Logger('ClientService');

    constructor(options: Partial<VKOptions> & { token: string; }) {
        this.bot = new VK({ token: options.token });
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