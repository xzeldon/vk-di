import { Command, Inject } from "@core/*";
import { MessageContext } from "vk-io";
import MainModule from "../../main.module";
import { ICatService } from "./cat.interface";
import CatService from "./cat.service";

@Inject(CatService)
export default class CatModule extends MainModule {
    constructor(private readonly cat_service: ICatService) {
        super();
    }

    @Command('cat', { prefix: '/' })
    async cat_response(context: MessageContext) {
        Promise.all([
            context.send(this.cat_service.send_waiting_msg()),
            context.sendPhotos({
                value: 'https://loremflickr.com/400/300/'
            })
        ]);
    }
}