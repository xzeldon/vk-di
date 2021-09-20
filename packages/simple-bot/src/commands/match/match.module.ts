import { Command, Inject } from "@core/*";
import { MessageContext } from "vk-io";
import MainModule from "../../main.module";
import { IMatchService } from "./match.interface";
import MatchService from "./match.service";

@Inject(MatchService)
export default class MatchModule extends MainModule {
    constructor(private readonly match_service: IMatchService) {
        super();
    }

    /**
     * 
     * Sends the user the first word written after trigger.
     * Example of working with RegExp
     */
    @Command(/^\/text (.+)/i)
    match_response(context: MessageContext) {
        context.send(this.match_service.send_match_msg(context.$match[1]));
    }
}