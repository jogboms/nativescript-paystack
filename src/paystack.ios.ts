import { Common, NSPaystackResponse } from "./paystack.common";
import { ios } from "tns-core-modules/utils/utils";

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

  payment(params: {
    amount: number;
    email: string;
    number: string;
    cvc: string;
    year: number;
    month: number;
  }): Promise<NSPaystackResponse> {
    return new Promise<NSPaystackResponse>((resolve, reject) => {
      const cardParams = PSTCKCardParams.new();
      cardParams.number = "" + params.number;
      cardParams.cvc = "" + params.cvc;
      cardParams.expYear = +params.year;
      cardParams.expMonth = +params.month;

      const transactionParams = PSTCKTransactionParams.new();
      transactionParams.amount = +params.amount;
      transactionParams.email = params.email;
      transactionParams.additionalAPIParameters = NSDictionary.dictionaryWithObjectForKey(
        "true",
        "enforce_otp"
      );

      const App = ios.getter(UIApplication, UIApplication.sharedApplication);

      PSTCKAPIClient.sharedClient().chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationWillPresentDialogDismissedDialogDidTransactionSuccess(
        //   .chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationDidTransactionSuccess(
        cardParams,
        transactionParams,
        App.keyWindow.rootViewController,
        (error: NSError, reference: string) =>
          reject({
            code: error.code,
            message: error.localizedDescription,
            reference
          }),
        () => console.log("Request Validation"),
        () => console.log("Will Present Dialog"),
        () => console.log("On Dismissed Dialog"),
        reference => resolve({ reference })
      );
    });
  }
}
