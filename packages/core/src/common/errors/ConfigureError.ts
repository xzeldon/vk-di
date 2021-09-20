import { cli_colors } from "../logger/cli-colors";

export class ConfigureError extends Error {
    constructor(description: string) {
        super(description);

        this.name = "ConfigureError";
        this.message = description.concat(`${cli_colors.red('\nThe Module will be disabled\n')}`);

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}