import { IGlobalConfig, Logger, TO_INJECT_METADATA } from "../common";

export class App {
    private logger = new Logger('ApplicationService');

    constructor(
        private readonly config: IGlobalConfig) { }

    public launch(): void {
        for (const Module of this.config.modules) {
            try {
                const to_inject = Reflect.getMetadata(TO_INJECT_METADATA, Module.prototype) || [];
                try {
                    new Module(...to_inject);
                } catch (err) {
                    this.logger.error('An unexpected error occurred while initializing the Module:', err);
                }
            } catch (err) {
                this.logger.error('Unexpected error:', err);
            }
        }
        this.config.on_start!(this);
    }
}