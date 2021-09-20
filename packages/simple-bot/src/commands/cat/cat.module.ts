import { Command, Inject } from "@core/*";
import { MessageContext } from "vk-io";
import MainModule from "../../main.module";
import { cats_purring } from "./cat.constants";
import { ICatService } from "./cat.interface";
import CatService from "./cat.service";

@Inject(CatService)
export default class CatModule extends MainModule {
    constructor(private readonly cat_service: ICatService) {
        super();
    }

    /**
     * 
     * Send random cat's image
     * @see https://github.com/negezor/vk-io/blob/a53820c6e77aa6f65fed359294079bc7a963c37b/docs/examples/simple-updates-bot.js#L23
     */
    @Command('cat', { prefix: '/', next: true })
    async cat_response(context: MessageContext) {
        Promise.all([
            context.send(this.cat_service.send_waiting_msg()),
            context.sendPhotos({
                value: 'https://loremflickr.com/400/300/'
            })
        ]);
    }

    /**
     * 
     * Send random cat's purring.
     * This command works inside this module because 
     * we are pass 'next' argument to 'true' in the previous command
     * @see https://github.com/negezor/vk-io/blob/a53820c6e77aa6f65fed359294079bc7a963c37b/docs/examples/simple-updates-bot.js#L49
     */
    @Command('purr', { prefix: '/' })
    async purr_response(context: MessageContext) {
        Promise.all([
            context.send(this.cat_service.send_waiting_msg()),
            context.sendAudioMessage({
                value: this.cat_service.pick_from_arr(cats_purring)
            })
        ]);
    }
}