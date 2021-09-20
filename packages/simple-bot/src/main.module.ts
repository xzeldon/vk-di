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
     * The order of the listeners is important.
     * By default one listener is available for each module for each event.
     * To override this, pass the object with 'next' argument as shown below.
     */

    /**
     * 
     * On any message recived log it to stdout
     */
    @On("message_new", { next: true })
    on_message(context: MessageContext) {
        if (context.text) {
            console.log(`[${new Date().toLocaleString('ru')}, @id${context.senderId}] ${context.text}`);
        }
    }

    /**
     * 
     * On any message recived 'console.log()' some stuff
     */
    @On("message_new")
    on_message2() {
        console.log('One more listener in same Module');
    }

    /**
     * 
     * This listener will not work in the context of this module,
     * since the 'next' argument was not passed to the Options object
     * of the previous listener in the chain
     */
    @On("message_new")
    on_message3() {
        console.log("This listener will not work");
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