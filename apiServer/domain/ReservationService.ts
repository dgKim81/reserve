import TimeSpan from "./domainFramework/TimeSpan";
import ICustomerRepository from "./ICustomerRepository";
import IReservationRepository from "./reservation/IReservationRepository";
import Reservation from "./reservation/Reservation";
import IRoomRepository from "./room/IRoomRepository";

export default class ReservationService {
    customerRepository: ICustomerRepository;
    reserveRepository: IReservationRepository;
    roomRepository: IRoomRepository;

    constructor(customerRepository: ICustomerRepository, 
        reserveRepository: IReservationRepository, 
        roomRepository: IRoomRepository) {
        this.customerRepository = customerRepository;
        this.reserveRepository = reserveRepository;
        this.roomRepository = roomRepository;
    }

    async createReserve(customerId: number) {
        const customer = this.customerRepository.getCustomerById(customerId);
        let reservation = new Reservation(customer, -1);
        reservation = await this.reserveRepository.saveReservation(reservation);
        return reservation;
    }

    /**
     * 방을 예약한다.
     * @param roomId 방 아이디
     * @param times 예약 시간대
     * @returns 예약 아이디
     * @throws 예약할 수 없는 경우일 때
     */
    async reserveRoom(reserveId: number, roomId: number, times: TimeSpan[]) {
        const room = await this.roomRepository.getRoom(roomId);
        // TODO: 시간 검증.

        const reservation = await this.reserveRepository.getReservation(reserveId);

        if (room != null) {
            reservation.addRoomTime(room.id, room.displayName, times);
        } else {
            throw new Error("예약 대상 방을 찾을 수 없습니다.");
        }

        return reservation;
    }

    /**
     * 예약을 승인한다.
     * @param reservationId 예약 아이디
     * @returns 취소 성공 여부
     * @throws 취소할 수 없는 예약일 때
     */
    async confirmReservation(reserveId: number) {
        const reservation = await this.reserveRepository.getReservation(reserveId);

        // TODO: confirm 상태로 변경이 가능한지 정책을 확인한다.

        reservation.confirm();
    }

    /**
     * 예약을 취소한다.
     * @param reservationId 예약 아이디
     * @returns 취소 성공 여부
     * @throws 취소할 수 없는 예약일 때
     */
    async cancelReservation(reserveId: number, customerId: number | null) {
        const reservation = await this.reserveRepository.getReservation(reserveId);

        if (customerId == null) {
            reservation.cancelByManager();
        } else {
            const customer = this.customerRepository.getCustomerById(customerId!);
            if (customer != null) {
                reservation.cancelByCustomer()
            }

        }
    }
    
    /**
     * 예약 상태를 가져온다.
     * @param reservationId 예약 아이디
     * @returns 예약 정보
     * @throws 예약 정보를 찾을 수 없을 때
     */
    async getReservationInformation(reserveId: number): Promise<Reservation> {
        const reservation = await this.reserveRepository.getReservation(reserveId);
        return reservation;
    }

}