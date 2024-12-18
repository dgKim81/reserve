import ReservationPolicy from "./ReservationPolicy";

/**
 * 방의 예약에 대한 정책이다.
 */
export default class ReservationPolicyApplier {
    globalPolicies: ReservationPolicy[] = [];
    productPolicies: ReservationPolicy[] = [];
}