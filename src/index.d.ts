import {
    Common,
    Payment,
    NSPaymentParams,
    NSPaystackResponse
} from "./paystack.common";
export declare class NSPayment extends Payment {
    private _charge;
    private _transaction;
    protected initialize(params: NSPaymentParams): void;
    addCustomField(name: string, value: string): this;
    addMetadata(name: string, value: string): this;
    charge(): Promise<NSPaystackResponse>;
}
export declare class NSPaystack extends Common {
    getPublicKey(): string;
    initialize(publicKey: string): this;
    setPublicKey(publicKey: string): this;
    payment(params: NSPaymentParams): Payment;
}

export * from "./paystack.common";
