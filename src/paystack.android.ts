import {
    Common,
    Payment,
    NSPaymentParams,
    NSPaystackResponse
} from "./paystack.common";
import { android } from "tns-core-modules/application/application";
import { ad } from "tns-core-modules/utils/utils";
import { EventData } from "tns-core-modules/data/observable/observable";

export class NSPayment extends Payment {
    private _charge: co.paystack.android.model.Charge;
    private _transaction: co.paystack.android.Transaction;

    protected initialize(params: NSPaymentParams) {
        const cardNumber = new java.lang.String(params.number);
        const expiryMonth = new java.lang.Integer(params.month);
        const expiryYear = new java.lang.Integer(params.year);
        const cvv = new java.lang.String(params.cvc);

        this._charge = new co.paystack.android.model.Charge();
        this._charge.setCard(
            new co.paystack.android.model.Card(
                cardNumber,
                expiryMonth,
                expiryYear,
                cvv
            )
        );
        this._charge.setAmount(+params.amount);
        this._charge.setEmail(params.email);
    }

    addCustomField(name: string, value: string): this {
        try {
            this._charge.putCustomField(name, value);
        } catch (error) {
            throw new Error("An error occured while adding a Custom field");
        }
        return this;
    }

    addMetadata(name: string, value: string): this {
        try {
            this._charge.putMetadata(name, value);
        } catch (error) {
            throw new Error("An error occured while adding a Metadata");
        }
        return this;
    }

    charge(): Promise<NSPaystackResponse> {
        this._transaction = null;
        return new Promise<NSPaystackResponse>((resolve, reject) => {
            co.paystack.android.PaystackSdk.chargeCard(
                android.foregroundActivity || android.startActivity,
                this._charge,
                new co.paystack.android.Paystack.TransactionCallback({
                    // This is called only after transaction is successful
                    onSuccess: (
                        transaction: co.paystack.android.Transaction
                    ) => {
                        this.notify(<EventData>{
                            eventName: Payment.closeDialogEvent,
                            object: this
                        });
                        resolve({
                            reference: transaction.getReference()
                        });
                    },

                    beforeValidate: (
                        transaction: co.paystack.android.Transaction
                    ) => {
                        this.notify(<EventData>{
                            eventName: Payment.openDialogEvent,
                            object: this
                        });
                    },

                    onError: (
                        error,
                        transaction: co.paystack.android.Transaction
                    ) => {
                        this.notify(<EventData>{
                            eventName: Payment.closeDialogEvent,
                            object: this
                        });
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

export class NSPaystack extends Common {
    getPublicKey(): string {
        return co.paystack.android.PaystackSdk.getPublicKey();
    }

    initialize(publicKey: string): this {
        this.setPublicKey(publicKey);
        co.paystack.android.PaystackSdk.initialize(ad.getApplicationContext());
        return this;
    }

    setPublicKey(publicKey: string): this {
        co.paystack.android.PaystackSdk.setPublicKey(publicKey);
        return this;
    }

    payment(params: NSPaymentParams): NSPayment {
        return new NSPayment(params);
    }
}
