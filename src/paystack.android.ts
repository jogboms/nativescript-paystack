import { Common } from './paystack.common';
import { Page } from 'tns-core-modules/ui/page/page';

const Paystack = co.paystack.android.Paystack;
const PaystackSdk = co.paystack.android.PaystackSdk;
const Card = co.paystack.android.model.Card;
const Charge = co.paystack.android.model.Charge;
type Transaction = co.paystack.android.Transaction;

export class NSPaystack extends Common {

    getPublicKey(): string {
        return "";
    }

    initialize(publicKey: string) {
        this.setPublicKey(publicKey);
        PaystackSdk.initialize(this.page.android);
    }

    setPublicKey(publicKey: string) {
        PaystackSdk.setPublicKey(publicKey);
    }

    payment(params: { amount: number, email: string, number: string, cvc: string, year: number, month: number }): Promise<string | { code, message }> {
        return Promise.resolve("");
    }
}
