import TimeSpan from "./domainFramework/TimeSpan";
import Reservation, { ReservationStatus } from "./reservation/Reservation";
import Room from "./room/Room";

export default class ReservationService {
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
     * 방을 예약한다.
     * @param roomId 방 아이디
     * @param times 예약 시간대
     * @returns 예약 아이디
     * @throws 예약할 수 없는 경우일 때
     */
    reserveRoom(roomId: number, times: TimeSpan[]): string {
        return "";
    }

    /**
     * 예약을 취소한다.
     * @param reservationId 예약 아이디
     * @returns 취소 성공 여부
     * @throws 취소할 수 없는 예약일 때
     */
    cancelReservation(reservationId: number) {

    }
    
    /**
     * 예약 상태를 가져온다.
     * @param reservationId 예약 아이디
     * @returns 예약 정보
     * @throws 예약 정보를 찾을 수 없을 때
     */
    getReservationInformation(reservationId: number): Reservation | null {
        return null;
    }

    /**
     * 고객의 예약 정보를 가져온다.
     * @param customerId 고객 아이디
     * @param beginDate 시작 날짜
     * @param endDate 종료 날짜
     * @param reserveationState 예약 상태
     * @returns 예약 정보 목록
     */
    getReservationInformationByCustomer(customerId: number, beginDate: Date | null, endDate: Date | null, reserveationState: ReservationStatus | null): Reservation[] {
        return [];
    }

    /**
     * 방의 예약 정보를 가져온다.
     * @param roomId 방 아이디
     * @param beginDate 시작 날짜
     * @param endDate 종료 날짜
     * @returns 예약 정보 목록
     */
    getReservationInformationByRoom(roomId: number, beginDate: Date | null, endDate: Date | null): Reservation[] {    
        return [];
    }
}