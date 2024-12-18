import PricingPolicy from "./PricingPolicy";

/**
 * 가격 정책을 적용하는 클래스
 * 가격 정책은 전체 정책과
 * 방에 대한 정책으로 나누어 진다.
 */
export default class PricePolicyApplier {
    globalPolicies: PricingPolicy[] = [];
    productPolicies: PricingPolicy[] = [];

    getPriceLineItems() {
    }
}