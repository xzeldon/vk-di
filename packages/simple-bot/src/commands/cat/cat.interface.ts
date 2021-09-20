export interface ICatService {
    send_waiting_msg(): string;
    pick_from_arr<T>(arr: T[]): T;
}