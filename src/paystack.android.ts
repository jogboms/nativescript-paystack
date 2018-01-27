import { Common } from "./paystack.common";
import { android } from 'tns-core-modules/application/application';
import { ad } from "tns-core-modules/utils/utils";

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
        PaystackSdk.initialize(ad.getApplicationContext());
    }

    setPublicKey(publicKey: string) {
        PaystackSdk.setPublicKey(publicKey);
    }

    charge;
    payment(params: { amount: number, email: string, number: string, cvc: string, year: number, month: number }): Promise<string | { code, message }> {
        // initialize the charge
        this.charge = new Charge();
        this.charge.setCard(this.loadCardFromForm());

        // Set transaction params directly in app (note that these params
        // are only used if an access_code is not set. In debug mode,
        // setting them after setting an access code would throw an exception

        this.charge.setAmount(2000);
        this.charge.setEmail("o.jeremiah@rom-flex.com");
        // this.charge.setReference("ChargedFromAndroid_" + Calendar.getInstance().getTimeInMillis());
        try {
            this.charge.putCustomField("Charged From", "Android SDK");
        } catch (error) {
            console.dir(error)
        }
        return this.chargeCard();
    }

    private loadCardFromForm() {
        //validate fields
        
        const cardNumber = new java.lang.String("4084084084084081");
        const expiryMonth = new java.lang.Integer(11);
        const expiryYear = new java.lang.Integer(18);
        const cvv = new java.lang.String("408");

        //build card object with ONLY the number, update the other fields later
        const card = new Card(cardNumber, expiryMonth, expiryYear, cvv);
        

        return card;
    }

    transaction;
    chargeCard() {
        this.transaction = null;

        const activity = android.foregroundActivity || android.startActivity;
        return new Promise<string | { code, message }>((resolve, reject) => {
            
            PaystackSdk.chargeCard(
                activity,
                this.charge,
                new co.paystack.android.Paystack.TransactionCallback({
                    // This is called only after transaction is successful
    
                    onSuccess: (transaction: Transaction) => {
                        this.transaction = transaction;
                        console.log(transaction.getReference());
                        resolve(transaction.getReference())
                    },
    
                    // This is called only before requesting OTP
                    // Save reference so you may send to server if
                    // error occurs with OTP
                    // No need to dismiss dialog
                    beforeValidate: (transaction: Transaction) => {
                        this.transaction = transaction;
                        console.log(transaction.getReference());
                    },
    
                    onError: (error, transaction: Transaction) => {
                        // If an access code has expired, simply ask your server for a new one
                        // and restart the charge instead of displaying error
                        this.transaction = transaction;
                        // if (error instanceof ExpiredAccessCodeException) {
                        //     this.startAFreshCharge(false);
                        //     this.chargeCard();
                        //     return;
                        // }
    
                        if (transaction.getReference() != null) {
                            console.log(transaction.getReference());
                            reject({
                                code: 0,
                                message: error.getMessage()
                            })

                        } else {
                            reject({
                                code: 0,
                                message: error.getMessage()
                            })
                            console.log(error.getMessage());
                        }
                    }
    
                }));
        })
    }
}
