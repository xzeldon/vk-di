import { IMatchService } from "./match.interface";

class MatchService implements IMatchService {
    send_match_msg(match_element: string) {
        return `You written ${match_element}`;
    }
}

export default new MatchService();