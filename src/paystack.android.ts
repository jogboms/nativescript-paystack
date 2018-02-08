import { Common, NSPaystackResponse } from "./paystack.common";
import { android } from "tns-core-modules/application/application";
import { ad } from "tns-core-modules/utils/utils";

export class NSPaystack extends Common {
  private charge: co.paystack.android.model.Charge;
  private transaction: co.paystack.android.Transaction;

  getPublicKey(): string {
    return co.paystack.android.PaystackSdk.getPublicKey();
  }

  initialize(publicKey: string) {
    this.setPublicKey(publicKey);
    co.paystack.android.PaystackSdk.initialize(ad.getApplicationContext());
  }

  setPublicKey(publicKey: string) {
    co.paystack.android.PaystackSdk.setPublicKey(publicKey);
  }

  payment(params: {
    amount: number;
    email: string;
    number: string;
    cvc: string;
    year: number;
    month: number;
  }): Promise<NSPaystackResponse> {
    const cardNumber = new java.lang.String(params.number);
    const expiryMonth = new java.lang.Integer(params.month);
    const expiryYear = new java.lang.Integer(params.year);
    const cvv = new java.lang.String(params.cvc);

    this.charge = new co.paystack.android.model.Charge();
    this.charge.setCard(
      new co.paystack.android.model.Card(
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv
      )
    );
    this.charge.setAmount(+params.amount);
    this.charge.setEmail(params.email);

    try {
      this.charge.putCustomField("Charged From", "Android SDK");
    } catch (error) {}

    return this.chargeCard();
  }

  private chargeCard() {
    this.transaction = null;
    return new Promise<NSPaystackResponse>((resolve, reject) => {
      co.paystack.android.PaystackSdk.chargeCard(
        android.foregroundActivity || android.startActivity,
        this.charge,
        new co.paystack.android.Paystack.TransactionCallback({
          // This is called only after transaction is successful
          onSuccess: (transaction: co.paystack.android.Transaction) => {
            resolve({
              reference: transaction.getReference()
            });
          },

          beforeValidate: (transaction: co.paystack.android.Transaction) => {},

          onError: (error, transaction: co.paystack.android.Transaction) => {
            reject({
              code: 0,
              message: error.getMessage(),
              reference: transaction.getReference()
            });
          }
        })
      );
    });
  }
}
