import DomainEvent from "domain/DomainEvent";
import Reservation from "./Reservation";

export default class ReservationStatusEvent implements DomainEvent<{id: number, oldStatus: string, newStatus: string}> {
    name: string;
    payload: {id: number, oldStatus: string, newStatus: string};
    occurredAt: Date;

    constructor(reservation: Reservation, oldStatus: string, newStatus: string) {
        this.name = ReservationStatusEvent.name;
        this.payload = {
            id: reservation.id,
            oldStatus: oldStatus,
            newStatus: newStatus
        };
        this.occurredAt = new Date();
    }
}