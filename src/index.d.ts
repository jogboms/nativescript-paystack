import { Common } from './paystack.common';
export declare class NSPaystack extends Common {
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
  }): Promise<string | {
    code;
    message;
  }>;
}
