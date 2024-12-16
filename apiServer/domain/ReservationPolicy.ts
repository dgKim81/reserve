/**
 * 예약에 있어서 허용 여부를 판단하는 정책 클래스의 인터페이스
 */
export default interface ReservationPolicy {
    evaluate(reserveId: number): boolean;
}