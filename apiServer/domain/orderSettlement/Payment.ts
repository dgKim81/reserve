
export type PaymentMethod = "card" | "cash" | "bank";
export type PaymentStatus = "padding" | "completed" | "cancel";

export default class Payment {
    paymentId: number;
    method: PaymentMethod;
    amount: number;
    paymentDate: Date;
    paymentStatus : PaymentStatus;

    constructor(pid: number, mt: PaymentMethod, am: number, pmd: Date, ps: PaymentStatus){
        this.paymentId = pid;
        this.method = mt;
        this.amount = am;
        this.paymentDate = pmd;
        this.paymentStatus = ps;
    }
}