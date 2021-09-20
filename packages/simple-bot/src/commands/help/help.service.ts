import { IHelpService } from "./help.interface";

class HelpService implements IHelpService {
    send_help_msg(): string {
        return 'This is a help message - 👋🌎🌍🌏';
    }
}

export default new HelpService();