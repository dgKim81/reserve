import TimeSpan from "./domainFramework/TimeSpan";
import MaintenanceTime from "./room/MaintenanceTime";
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
    
    /**
     * 방의 목록을 조회 한다.
     * @returns 방 목록
     */
    getRoomList(): Room[] {
        return [];
    }

    /**
     * 시간대에 따른 방 목록을 조회 한다.
     * @param begin 시작 시간
     * @param end 종료 시간
     * @returns 방 목록
     */
    getRoomListWithTime(begin: Date, end: Date) {

    }

    /**
     * 방을 조회한다.
     * @param roomId 방 ID
     * @returns 방 정보
     */
    getRoom(roomId: number): Room | null {
        return null;
    }

    /**
     * 방에 유지보수 시간을 추가한다.
     * @param roomId 방 ID
     * @param  유지보수 시간
     */
    addMaintenanceToRoom(roomId: number, displayName: string, description: string, time: TimeSpan) {
        new MaintenanceTime(-1, displayName, description, time);
    }

    /**
     * 방에 유지보수 시간을 제거한다.
     * @param roomId 방 ID
     * @param maintenanceTimeId 유지보수 시간 ID
     */
    removeMaintenanceFromRoom(roomId: number, maintenanceTimeId: number) {
        const room = this.getRoom(roomId);
        if (!room) {
            throw new Error("방을 찾을 수 없습니다.");
        }

        room.removeMaintenanceTime(maintenanceTimeId);

    }

    isRoomAvailable(roomId: number, times: TimeSpan[]): boolean {
        const room = this.getRoom(roomId);
        if (!room) {
            throw new Error("방을 찾을 수 없습니다.");
        }

        return false;
    }
}