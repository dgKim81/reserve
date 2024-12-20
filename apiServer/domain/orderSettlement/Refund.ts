export type RefundReason =
  | "paymentCancel"         // 결제 취소
  | "overPayment"           // 초과 결제
  | "discount"              // 할인
  | "serviceNotProvided"    // 서비스 미제공
  | "pricingError"          // 가격 오류
  | "customerDissatisfaction" // 고객 불만족
  | "partialServiceProvided" // 서비스 일부 제공
  | "duplicatePayment";     // 중복 결제

export default class Refund {
    refundId : number;
    occurrenceDate : Date;
    occurrenceReason : RefundReason;
    amount: number;

    constructor(
        refundId: number,
        occurrenceDate: Date,
        occurrenceReason: RefundReason,
        amount: number
    ) {
        this.refundId = refundId;
        this.occurrenceDate = occurrenceDate;
        this.occurrenceReason = occurrenceReason;
        this.amount = amount;
    }
}