import { Page } from "tns-core-modules/ui/page/page";
import { Observable } from "tns-core-modules/data/observable/observable";

export interface NSPaystackSuccessResponse {
    reference: string;
}

export interface NSPaystackErrorResponse
    extends Partial<NSPaystackSuccessResponse> {
    code: number | string;
    message: string;
}

export type NSPaystackResponse =
    | NSPaystackSuccessResponse
    | NSPaystackErrorResponse;

export interface NSPaymentParams {
    amount: number;
    email: string;
    number: string;
    cvc: string;
    year: number;
    month: number;
}

export abstract class Payment extends Observable {
    public static openDialogEvent = "openDialogEvent";
    public static closeDialogEvent = "closeDialogEvent";
    protected abstract initialize(params: NSPaymentParams);
    public abstract addCustomField(name: string, value: string): this;
    public abstract addMetadata(name: string, value: string): this;
    public abstract charge(): Promise<NSPaystackResponse>;

    constructor(params: NSPaymentParams) {
        super();
        this.initialize(params);
    }
}

export abstract class Common {
    constructor() {}
    public abstract getPublicKey(): string;
    public abstract initialize(publicKey: string): this;
    public abstract setPublicKey(key: string): this;
    public abstract payment(params: NSPaymentParams): Payment;
}
