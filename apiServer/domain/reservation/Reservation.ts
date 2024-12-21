import AggregateRoot from "../contextBase/AggregateRoot";
import TimeSpan from "../domainFramework/TimeSpan";
import Customer from "./Customer";
import ReservationStatusEvent from "./ReservationStatusEvent";
import RoomTime from "./RoomTime";

type ReservationStatus = "writing" | "wait" | "payment" | "confirm" | "managerCancel" | "customerCancel";

class Reservation extends AggregateRoot {
    customer: Customer;
    private status: ReservationStatus = "writing";
    roomTimes: RoomTime[] = [];

    public get Status() : string {
        return this.status;
    }

    constructor(customer:Customer, rid: number) { 
        super();
        this.id = rid;
        this.customer = customer;
    }

    addRoomTime(roomId: number, roomDisplayName: string, times: TimeSpan[]) {
        if (this.status !== "writing") {
            throw new Error("예약이 완료된 후에는 방 시간을 추가할 수 없습니다.");
        }
        if (this.roomTimes.some(rt => rt.id === roomId)) {
            throw new Error(`ID가 ${roomId}인 방은 이미 예약되었습니다.`);
        }
        this.roomTimes.push(new RoomTime(roomId, roomDisplayName, times));
    }

    removeRoomTime(roomId: number, times: TimeSpan[]) {
        if (this.status !== "writing") {
            throw new Error("예약이 완료된 후에는 방 시간을 제거할 수 없습니다.");
        }
        if (!this.roomTimes.some(rt => rt.id === roomId)) {
            throw new Error(`ID가 ${roomId}인 방은 예약되지 않았습니다.`);
        }
        this.roomTimes = this.roomTimes.filter(rt => rt.id !== roomId);
    }

    private changeStatus(newStatus: ReservationStatus) {
        const oldStatus = this.status;
        this.status = newStatus;
        this.addEvent(new ReservationStatusEvent(this, oldStatus, newStatus));
    }

    completeWrite() {
        this.changeStatus("wait");
    }

    waitPay() {
        this.changeStatus("payment");
    }

    confirm() {
        this.changeStatus("confirm");
    }

    cancelByManager() {
        this.changeStatus("managerCancel");
    }

    cancelByCustomer() {
        this.changeStatus("customerCancel");
    }
}

export { ReservationStatus };
export default Reservation;