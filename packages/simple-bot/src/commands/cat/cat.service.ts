import { ICatService } from "./cat.interface";

class CatService implements ICatService {
    send_waiting_msg(): string {
        return 'Wait for the uploads awesome 😻';
    }

    pick_from_arr<T>(arr: T[]): T {
        const result = arr[Math.floor(Math.random() * arr.length)];
        return result;
    }
}

export default new CatService();