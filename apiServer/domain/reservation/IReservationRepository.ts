import { Predicate } from "../domainFramework/PredicateUtils";
import TimeSpan from "../domainFramework/TimeSpan";
import Reservation, { ReservationStatus } from "./Reservation";

export type ReservationSpec = Predicate<Reservation>;

export default interface IReservationRepository {
    getRoomReserveableTime(): Promise<TimeSpan[]>;
    getReservation(reservationId: number): Promise<Reservation>
    getReservationStatus(reservationId: number): Promise<ReservationStatus>;
    getReservationsBySpec(spec: ReservationSpec, take: number, skip: number): Promise<ReservationStatus[]>;

    saveReservation(reservation: Reservation): Promise<void>;
}