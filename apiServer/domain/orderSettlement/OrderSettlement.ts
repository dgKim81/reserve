import AggregateRoot from "../contextBase/AggregateRoot";
import Payment, { PaymentMethod } from "./Payment";
import PriceList from "./PriceList";
import Refund, { RefundReason } from "./Refund";

export default class OrderSettlement extends AggregateRoot {
    reserveId: number;
    price: PriceList | null = null;
    payments: Payment[] = [];
    refunds: Refund[] = [];

    constructor(orderSettlementId: number, reserveId: number) {
        super();
        this.id = orderSettlementId;
        this.reserveId = reserveId;
    }

    issuePriceList(pList: PriceList) {
        if (this.price !== null) {
            pList.previousPriceId = this.price.priceId;
        }

        this.price = pList;
    }

    pay(method: PaymentMethod, amount: number) {
        if (amount < 0) {
            throw new Error("지불 금액은 0보다 작을 수 없습니다");
        }

        const payment = new Payment(-1,method,amount, new Date(), "padding");
        this.payments.push(payment);
    }

    completePayment(paymentId: number) {
        const payment = this.payments.find(v => v.paymentId === paymentId);
        if (payment) {
            if (payment.paymentStatus === "padding") {
                payment.paymentStatus = "completed";
            } else {
                throw new Error(`지불이력(${paymentId})의 상태가 padding 상태가 아닙니다.`);
            }
        } else {
            throw new Error(`지불이력(${paymentId})를 찾을 수 없습니다.`);
        }
    }

    cancelPayment(paymentId: number) {
        const payment = this.payments.find(v => v.paymentId === paymentId);
        if (payment) {
            payment.paymentStatus = "cancel";
        } else {
            throw new Error(`지불이력(${paymentId}를 찾을 수 없습니다.`);
        }
    }

    refund(occurrenceReason: RefundReason, amount: number) {
        if (amount < 1) {
            throw new Error("환불 금액은 1보다 작을 수 없습니다");
        }

        const refund = new Refund(-1 ,new Date(), occurrenceReason, amount);
        this.refunds.push(refund);
    }
}