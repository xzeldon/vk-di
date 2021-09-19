import { COMMAND_METADATA, EVENT_METADATA, IClient, ICommandOptions } from "../common";

export class Module {
    constructor(
        protected readonly client: IClient,
        public readonly config?: ICommandOptions
    ) {
        this.init_events();
    }

    protected init_events() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(method => {
            if (Reflect.hasMetadata(COMMAND_METADATA, this, method)) {
                this.client.initialize_command(
                    Reflect.getMetadata(COMMAND_METADATA, this, method),
                    this,
                    this[method]
                );
            }

            if (Reflect.hasMetadata(EVENT_METADATA, this, method)) {
                this.client.initialize_vk_event(
                    Reflect.getMetadata(EVENT_METADATA, this, method),
                    this,
                    this[method]
                );
            }
        });
    }
}