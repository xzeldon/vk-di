import { Command, Inject } from "@core/*";
import { MessageContext } from "vk-io";
import MainModule from "../../main.module";
import { IHelpService } from "./help.interface";
import HelpService from "./help.service";

@Inject(HelpService)
export default class HelpModule extends MainModule {
    constructor(private readonly help_service: IHelpService) {
        super();
    }

    /**
     * 
     * Send some text to user. 
     * Using with RegExp as a trigger
     */
    @Command(/^(?:help|start)$/i)
    help_response(context: MessageContext) {
        context.send(this.help_service.send_help_msg());
    }

    /**
     * 
     * This command will not work in the context of this module,
     * since the 'next' argument was not passed to the Options object
     * of the previous command
     */
    @Command('test')
    test_response() {
        console.log('This listener will not work');
    }
}