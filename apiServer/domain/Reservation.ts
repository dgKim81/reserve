import TimeLine from "./TimeLine";

type ReservationStatus = "wait" | "confirm" | "cancel";

class Reservation {
    reservationId: number;
    customerId: number;
    status: ReservationStatus = "wait";

    constructor(customerId:number, rid: number) { 
        this.customerId = customerId;
        this.reservationId = rid;
    }

    validate(): boolean {
        return false;
    }
}

export default Reservation;