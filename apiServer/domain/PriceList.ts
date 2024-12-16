import Payment from "./Payment";
import PriceLineItem from "./PriceLineItem";
import Refund from "./Refund";


/**
 * 가격과 지불, 환불을 관리한다.
 * 가격 정책을 기본으로 사용하나, 관리자의 판단에 근거해서 가격을 조정할 수 있다.
 */
export default class PriceList {
    priceId: number;
    reserveId: number;
    priceLines: PriceLineItem[] = [];
    
    payments: Payment[] = [];
    refunds: Refund[] = [];

    constructor(rid:number, pid:number) {
        this.reserveId = rid;
        this.priceId = pid;
    };

    writePriceLine(priceLineItem: PriceLineItem) {
        this.priceLines.push(priceLineItem.clone()); 
    }

    removePriceLine(lineNumber: number) {
        this.priceLines.splice(lineNumber, 1);
    }

    getPriceLines() {
        const priceLineItem = this.priceLines.map(fn => fn.clone());
        return priceLineItem;
    } 

    getTotalPrice(): number {
        let price = 0;
        for (const lineItem of this.priceLines) {
            price += lineItem.price;
        }

        return price;
    }
}