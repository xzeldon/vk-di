import { cli_colors, Logger } from "@core/*";
import { IMatchService } from "./match.interface";

/**
 * Example working with a core built-in logger
 * and ascii colors
 */
class MatchService implements IMatchService {
    private readonly logger: Logger = new Logger("MatchService", false);

    send_match_msg(match_element: string) {
        this.logger.log(`${cli_colors.cyan_bright('New match:')} ${match_element}`);
        return `You written ${match_element}`;
    }
}

export default new MatchService();