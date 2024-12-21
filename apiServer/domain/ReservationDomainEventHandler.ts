import DomainDispatcher from "./DomainDispatcher";
import ReservationStatusEvent from "./reservation/ReservationStatusEvent";

export default class ReservationDomainEventHandler {
    static {
        DomainDispatcher.subscribe("ReservationStatusChanged", ReservationDomainEventHandler.reservationStatusEventHandles);
    }

    static reservationStatusEventHandles(event: ReservationStatusEvent) { 
        const reservationStatusEvent = event.payload as {id: number, oldStatus: string, newStatus: string};
        console.log(`Reservation ${reservationStatusEvent.id} status changed from ${reservationStatusEvent.oldStatus} to ${reservationStatusEvent.newStatus}`);
    }
}