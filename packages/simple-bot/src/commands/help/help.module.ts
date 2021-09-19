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

    @Command(/^(?:help|start)$/i)
    help_response(context: MessageContext) {
        context.send(this.help_service.send_help_msg());
    }
}