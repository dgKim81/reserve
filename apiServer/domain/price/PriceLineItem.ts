import ValueObject from "../contextBase/ValueObject";

type PriceLineItemConsumedObject = "product" | "policy" | "person";

export default class PriceLineItem extends ValueObject  {
    constructor(
        public policyName: PriceLineItemConsumedObject,
        public productId: number | null,
        public lineName: string, 
        public price:number,
        public comment: string,
        public createBy: string) {
        super();
    };

    toString(): string {
        return `PriceLineItem(policyName: ${this.policyName}, lineName: ${this.lineName}, price: ${this.price})`;
    }
}