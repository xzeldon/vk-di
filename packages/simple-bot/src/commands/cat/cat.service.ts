import { ICatService } from "./cat.interface";

class CatService implements ICatService {
    send_waiting_msg(): string {
        return 'Wait for the uploads awesome 😻';
    }

}

export default new CatService();