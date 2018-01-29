declare module co {
    export module paystack {
        export module android {
            class PaystackSdk {
                static initialize(context: any /* android.content.Context */);
                static chargeCard(activity: any /* android.app.Activity */, charge: model.Charge, callback: Paystack.TransactionCallback);
                static setPublicKey(publicKey: string);
                static getPublicKey(): string;
            }
            class Transaction {
                getReference(): string;
            }
            export module Paystack {
                export class TransactionCallback {
                    public constructor(implementation: {
                        onSuccess: (transaction: Transaction) => void;
                        beforeValidate: (transaction: Transaction) => void;
                        onError: (error: any, transaction: Transaction) => void;
                    })
                    public onSuccess(transaction: Transaction): void;
                    public beforeValidate(transaction: Transaction): void;
                    public onError(error: any, transaction: Transaction): void;
                }
            }
            export module model {
                class Card {
                    constructor(
                        cardNumber: java.lang.String,
                        expiryMonth: java.lang.Integer,
                        expiryYear: java.lang.Integer,
                        cvc: java.lang.String
                    );
                    isValid(): boolean;
                    validCVC(): boolean;
                    validNumber(): boolean;
                    validExpiryDate(): boolean;
                    validExpiryDate(): boolean;
                    /**
                     * Method that returns the type of the card
                     *
                     * @return a String representation of the card type detected. You can use this to improve the experience on your form,
                     * to display the card type logo, while the user is entering the card number e.g MasterCard, Discover, Visa etc.
                     */
                    getType(): string;
                    getLast4digits(): string;
                }
                class Charge {
                    setCard(card: Card): Charge;
                    setAmount(amount: number): Charge;
                    setEmail(email: string): Charge;
                    setSubaccount(subaccount: string): Charge;
                    setPlan(plan: string): Charge;
                    setAccessCode(access_code: string): Charge;
                    setCurrency(currency: string): Charge;
                    setReference(reference: string): Charge;
                    setTransactionCharge(transactionCharge: number): Charge;
                    putMetadata(key: string, value: string): Charge;
                    putCustomField(key: string, value: string): Charge;
                    addParameter(key: string, value: string);
                    static Bearer: {
                        subaccount,
                        account
                    };
                }
            }
        }
    }
}