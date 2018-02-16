import {
    Common,
    Payment,
    NSPaystackResponse,
    NSPaymentParams
} from "./paystack.common";
import { ios } from "tns-core-modules/utils/utils";
import { EventData } from "tns-core-modules/data/observable/observable";

export class NSPayment extends Payment {
    private _card: PSTCKCardParams;
    private _transaction: PSTCKTransactionParams;

    protected initialize(params: NSPaymentParams) {
        this._card = PSTCKCardParams.new();
        this._card.number = "" + params.number;
        this._card.cvc = "" + params.cvc;
        this._card.expYear = +params.year;
        this._card.expMonth = +params.month;

        this._transaction = PSTCKTransactionParams.new();
        this._transaction.amount = +params.amount;
        this._transaction.email = params.email;
    }

    addCustomField(name: string, value: string): this {
        try {
            this._transaction.setCustomFieldValueDisplayedAsError(value, name);
        } catch (error) {
            throw new Error("An error occured while adding a Custom field");
        }
        return this;
    }

    addMetadata(name: string, value: string): this {
        try {
            this._transaction.setMetadataValueForKeyError(value, name);
        } catch (error) {
            throw new Error("An error occured while adding a Metadata");
        }
        return this;
    }

    charge(): Promise<NSPaystackResponse> {
        return new Promise<NSPaystackResponse>((resolve, reject) => {
            this._transaction.additionalAPIParameters = NSDictionary.dictionaryWithObjectForKey(
                "true",
                "enforce_otp"
            );

            const App = ios.getter(
                UIApplication,
                UIApplication.sharedApplication
            );

            PSTCKAPIClient.sharedClient().chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationWillPresentDialogDismissedDialogDidTransactionSuccess(
                //   .chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationDidTransactionSuccess(
                this._card,
                this._transaction,
                App.keyWindow.rootViewController,
                (error: NSError, reference: string) =>
                    reject({
                        code: error.code,
                        message: error.localizedDescription,
                        reference
                    }),
                () => {
                    // console.log("Request Validation")
                },
                () => {
                    this.notify(<EventData>{
                        eventName: Payment.openDialogEvent,
                        object: this
                    });
                },
                () => {
                    this.notify(<EventData>{
                        eventName: Payment.closeDialogEvent,
                        object: this
                    });
                },
                reference => resolve({ reference })
            );
        });
    }
}

export class NSPaystack extends Common {
    getPublicKey(): string {
        return Paystack.defaultPublicKey();
    }

    initialize(publicKey: string): this {
        this.setPublicKey(publicKey);
        return this;
    }

    setPublicKey(publicKey: string): this {
        Paystack.setDefaultPublicKey(publicKey);
        return this;
    }

    payment(params: NSPaymentParams): NSPayment {
        return new NSPayment(params);
    }
}
