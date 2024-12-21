import TimeSpan from "./domainFramework/TimeSpan";
import Room from "./room/Room";

export default class RoomService {
    /**
     * 예약 가능한 방 목록을 가져온다.
     * @param begin 시작 시간
     * @param end 종료 시간
     * @returns 예약 가능한 방 목록
     */
    getReservableRooms(begin: Date, end: Date): Room[] {
        return [];
    }

    /**
     * 예약 가능한 시간대를 가져온다.
     * @param roomId 방 아이디
     * @param begin 시작 시간
     * @param end 종료 시간
     * @returns 예약 가능한 시간대 목록
     */
    getRoomReserveableTime(roomId: number, begin: Date, end: Date): TimeSpan[] {
        return [];
    }
    
    getRoomList(): Room[] {
        return [];
    }

    getRoomListWithTime(begin: Date, end: Date) {

    }

    getRoom(roomId: number): Room | null {
        return null;
    }

    addMaintenanceToRoom() {

    }

    removeMaintenanceFromRoom() {

    }

    isRoomAvailable(roomId: number, times: TimeSpan[]): boolean {
        const room = this.getRoom(roomId);
        if (!room) {
            throw new Error("방을 찾을 수 없습니다.");
        }

        return false;
    }
}