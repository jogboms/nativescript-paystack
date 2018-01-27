/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
/// <reference path="./objc!Paystack.d.ts" />

declare module co {
    export module paystack {
        export module android {
            class PaystackSdk {
                static initialize(ApplicationContext: any);
                static chargeCard(a, b, c);
                static setPublicKey(a);
            }
            class Transaction {
                getReference();
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
                    constructor(a, b, c, d);
                    static Builder(a, b, c, d): { build: Function };
                }
                class Charge {
                    static Bearer: {
                        subaccount,
                        account
                    };
                }
            }
        }
    }
}