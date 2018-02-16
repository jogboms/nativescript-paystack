import {
    Common,
    Payment,
    NSPaymentParams,
    NSPaystackResponse
} from "./paystack.common";
export declare class NSPayment implements Payment {
    private _charge;
    private _transaction;
    constructor(params: NSPaymentParams);
    addCustomField(name: string, value: string): this;
    addMetadata(name: string, value: string): this;
    charge(): Promise<NSPaystackResponse>;
}
export declare class NSPaystack extends Common {
    getPublicKey(): string;
    initialize(publicKey: string): void;
    setPublicKey(publicKey: string): void;
    payment(params: NSPaymentParams): Payment;
}
export * from "./paystack.common";
