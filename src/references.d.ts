/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
/// <reference path="./objc!Paystack.d.ts" />

declare namespace co {
    export namespace paystack {
        export namespace android {
            class Paystack {
                static TransactionCallback(a);
            }
            class PaystackSdk {
                static initialize(ApplicationContext: any);
                static chargeCard(a, b, c);
                static setPublicKey(a);
            }
            class Transaction {
                getReference();
            }
            export namespace model {
                class Card {
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