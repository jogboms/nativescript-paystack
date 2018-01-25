import { Observable } from 'tns-core-modules/data/observable';
import { Paystack } from 'nativescript-paystack';

export class HelloWorldModel extends Observable {
  public message: string;
  private paystack: Paystack;

  constructor() {
    super();

    this.paystack = new Paystack();
    this.message = this.paystack.message;
  }
}
