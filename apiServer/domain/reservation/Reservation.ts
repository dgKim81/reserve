import TimeSpan from "domain/domainFramework/TimeSpan";
import Customer from "./Customer";
import RoomTime from "./RoomTime";

type ReservationStatus = "writing" | "wait" | "payment" | "confirm" | "managerCancel" | "customerCancel";

class Reservation {
    reservationId: number;
    customer: Customer;
    private status: ReservationStatus = "writing";
    roomTimes: RoomTime[] = [];

    public get Status() : string {
        return this.status;
    }

    constructor(customer:Customer, rid: number) { 
        this.customer = customer;
        this.reservationId = rid;
    }

    addRoomTime(roomId: number, times: TimeSpan[]) {

    }

    removeRoomTime(roomId: number, times: TimeSpan[]) {
        
    }

    completeWrite() {
        this.status = "wait";
    }

    waitPay() {
        this.status = "payment";
    }

    confirm() {
        this.status = "confirm";
    }

    cancelByManager() {
        this.status = "managerCancel";
    }

    cancelByCustomer() {
        this.status = "customerCancel";
    }

    validate(): boolean {
        return false;
    }
}

export default Reservation;