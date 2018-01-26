import { Common } from './paystack.common';
import { Page } from 'tns-core-modules/ui/page/page';

export class NSPaystack extends Common {
    initialize(publicKey: string) {
        this.setPublicKey(publicKey);
    }

    getPublicKey(): string {
        return Paystack.defaultPublicKey();
    }

    setPublicKey(publicKey: string) {
        Paystack.setDefaultPublicKey(publicKey);
    }

    payment(params: { amount: number, email: string, number: string, cvc: string, year: number, month: number }): Promise<string | { code, message }> {
        return new Promise((resolve, reject) => {
            const cardParams = PSTCKCardParams.new();
            cardParams.number = "" + params.number;
            cardParams.cvc = "" + params.cvc;
            cardParams.expYear = +params.year;
            cardParams.expMonth = +params.month;

            const transactionParams = PSTCKTransactionParams.new();
            transactionParams.amount = +params.amount;
            transactionParams.email = params.email;
            transactionParams.additionalAPIParameters = NSDictionary.dictionaryWithObjectForKey("true", "enforce_otp");

            PSTCKAPIClient.sharedClient().chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationDidTransactionSuccess(
                cardParams,
                transactionParams,
                this.page.ios,
                (error: NSError) => reject({
                    code: error.code,
                    message: error.localizedFailureReason,
                }),
                () => 0,
                (reference) => resolve(reference)
            );
        });
    }
}
