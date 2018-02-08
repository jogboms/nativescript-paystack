import { Page } from "tns-core-modules/ui/page/page";

export interface NSPaystackSuccessResponse {
  reference: string;
}
export interface NSPaystackErrorResponse {
  code: number | string;
  message: string;
  reference?: string;
}

export type NSPaystackResponse =
  | NSPaystackSuccessResponse
  | NSPaystackErrorResponse;

export abstract class Common {
  constructor(public page: Page) {}
  public abstract getPublicKey(): string;
  public abstract initialize(publicKey: string);
  public abstract setPublicKey(key: string);
  public abstract payment(params: {
    amount: number;
    email: string;
    number: string;
    cvc: string;
    year: number;
    month: number;
  }): Promise<NSPaystackResponse>;
}
