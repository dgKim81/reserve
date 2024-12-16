
type PaymentMethod = "card" | "cash" | "bank";
type PaymentStatus = "padding" | "completed" | "cancel";

export default class Payment {
    customerId: number;
    paymentId: number;
    method: PaymentMethod;
    amount: number;
    paymentDate: Date;
    paymentStatus : PaymentStatus;

    constructor(cId: number, pid: number, mt: PaymentMethod, am: number, pmd: Date, ps: PaymentStatus){
        this.customerId = cId;
        this.paymentId = pid;
        this.method = mt;
        this.amount = am;
        this.paymentDate = pmd;
        this.paymentStatus = ps;
    }

}