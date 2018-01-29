import { Common, NSPaystackResponse } from "./paystack.common";
export declare class NSPaystack extends Common {
  private charge;
  private transaction;
  getPublicKey(): string;
  initialize(publicKey: string): void;
  setPublicKey(publicKey: string): void;
  payment(params: {
    amount: number;
    email: string;
    number: string;
    cvc: string;
    year: number;
    month: number;
  }): Promise<NSPaystackResponse>;
  private chargeCard();
}

export * from "./paystack.common";