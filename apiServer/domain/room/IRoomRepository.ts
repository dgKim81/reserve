import { Predicate } from "../domainFramework/PredicateUtils";
import TimeSpan from "../domainFramework/TimeSpan";
import Room from "./Room";

export type ReservationSpec = Predicate<Room>;

export default interface IRoomRepository {
    getRoomList(): Promise<Room[]>;
    getRoom(roomId: number): Promise<Room | null>;
    getReservableRooms(begin: Date, end: Date): Promise<Room[]>;
    getRoomReserveableTime(roomId: number, begin: Date, end: Date): Promise<TimeSpan[]>;
    getRoomBySpec(spec: ReservationSpec, take: number, skip: number): Promise<Room[]>;

    saveRoom(room: Room): Promise<void>;
}