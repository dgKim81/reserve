/**
 * 예약에 있어서 허용 여부를 판단하는 정책 클래스의 인터페이스
 * - 예약 가능 여부 판단.
 * - 예약시 예약의 자동 승인 단계 여부 확인.
 * - 예약시 최대,최소 시간수 확인.
 * - 예약시 종료시간이 13시 혹은 18시에 해당하는지 확인하고 포함하면 예약 불가.
 * - 예약시 손님의 이력과 상태를 확인해서 예약 가능 여부 판단.
 */
export default class ReservationPolicy {


    /**
     * 예약 가능 여부를 판단한다.
     * @param reserveId 예약 아이디
     */
    evaluate(reserveId: number): boolean {
        return true;
    }
}