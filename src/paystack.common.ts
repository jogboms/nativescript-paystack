import { Page } from 'tns-core-modules/ui/page/page';

export abstract class Common {
  constructor(public page: Page) { }
  public abstract getPublicKey(): string;
  public abstract initialize(publicKey: string);
  public abstract setPublicKey(key: string);
  public abstract payment(params: { amount: number, email: string, number: string, cvc: string, year: number, month: number }): Promise<string | { code, message }>;
}
