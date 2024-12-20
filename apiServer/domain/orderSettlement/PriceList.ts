import PriceLineItem from "./PriceLineItem";


/**
 * 가격과 지불, 환불을 관리한다.
 * 가격 정책을 기본으로 사용하나, 관리자의 판단에 근거해서 가격을 조정할 수 있다.
 */
export default class PriceList {
    priceId: number;
    priceLines: PriceLineItem[] = [];
    
    previousPriceId: number| null = null;
    createDate: Date | null = null;
    completed: boolean = false;

    constructor(pid:number) {
        this.priceId = pid;
    };
    
    writePriceLine(priceLineItem: PriceLineItem) {
        if (this.completed) {
            throw new Error(`계산서(${this.priceId})는 이미 작성완료 되었습니다.`);
        }

        this.priceLines.push(priceLineItem.clone()); 
    }

    removePriceLine(lineNumber: number) {
        if (this.completed) {
            throw new Error(`계산서(${this.priceId})는 이미 작성완료 되었습니다.`);
        }

        this.priceLines.splice(lineNumber, 1);
    }

    compelted() {
        if (this.completed) {
            throw new Error(`계산서(${this.priceId})는 이미 작성완료 되었습니다.`);
        }

        this.createDate = new Date();
        this.completed = true;
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