import PriceLineItem from "../price/PriceLineItem"

/**
 * 가격을 책정하는 정책의 인터페이스
 */
export default interface PricingPolicy {
    writeLiteItem(reserveId: number): PriceLineItem;
}