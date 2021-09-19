import { Client, Module, On } from "@core/*";
import { MessageContext } from "vk-io";

export default class MainModule extends Module {
    constructor() {
        super(new Client({
            token: process.env.TOKEN
        }));

        this.client.start();
    }

    /**
     * 
     * On any message recived log it to stdout
     */
    @On("message_new")
    on_message(context: MessageContext) {
        if (context.text) {
            console.log(`[${new Date().toLocaleString('ru')}, @id${context.senderId}] ${context.text}`);
        }
    }

    /**
     * 
     * On typing
     */
    @On('typing')
    on_typing() {
        console.log('The user types a message');
    }
}