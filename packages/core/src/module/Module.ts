import { COMMAND_METADATA, EVENT_METADATA, IClient, ICommandOptions, Logger } from "../common";
import { cli_colors } from "../common/logger/cli-colors";

export class Module {
    private logger = new Logger('ModuleService', true);

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
                this.logger.log(`${cli_colors.magenta_bright(method)} method mapped successfully`);
            }

            if (Reflect.hasMetadata(EVENT_METADATA, this, method)) {
                this.client.initialize_vk_event(
                    Reflect.getMetadata(EVENT_METADATA, this, method),
                    this,
                    this[method]
                );
                this.logger.log(`${cli_colors.magenta_bright(method)} method mapped successfully`);
            }
        });
    }
}