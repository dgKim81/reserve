import TimeLine from "./TimeLine";

type ReservationStatus = "wait" | "confirm" | "cancel";

class Reservation {
    reservationId: string;
    reserveTimeLine: TimeLine = new TimeLine();
    status: ReservationStatus = "wait";

    constructor(id: string) { 
        this.reservationId = id;
    }

    validate(): boolean {
        return false;
    }
}

export default Reservation;