import { Observable } from "tns-core-modules/data/observable";
import { NSPaystack } from "nativescript-paystack";
import { Page } from "tns-core-modules/ui/page/page";
import { request, HttpResponse } from "tns-core-modules/http/http";

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    amount: string;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    domain: string;
    metadata: 0;
    gateway_response: string;
    message: null;
    channel: string;
    ip_address: string;
    log: string;
    fees: string;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string
    };
    customer: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: null;
      metadata: null;
      risk_action: string;
    };
    plan: null;
  };
}

export class HelloWorldModel extends Observable {
  public message: string;
  private paystack: NSPaystack;

  constructor(page: Page) {
    super();
    this.set("isLoading", false);
    this.set("reference", "********");
    this.paystack = new NSPaystack(page);

    this.paystack.initialize("pk_test_9ae25f62d526283e2c2b259cabc7effb076c150e");
  }

  makePayment() {
    this.set("isLoading", true);
    this.paystack.payment({
      amount: 500000,
      email: "o.jeremiah@rom-flex.com",
      number: "4084084084084081",
      cvc: "408",
      year: 2019,
      month: 3,
    }).then((reference) => {
      console.log(`Reference: ${reference}`);
      return request({
        url: `https://api.paystack.co/transaction/verify/${reference}`,
        method: "GET",
        headers: { "Authorization": "Bearer sk_test_d507b43657b6bbfd22233ee43389233a83980a9d" }
      });
    })
      .then((res: HttpResponse) => {
        const paystack: PaystackResponse = res.content.toJSON();

        if (paystack.status) {
          this.set("authorization", paystack.data.authorization);
          this.set("customer", paystack.data.customer);
          this.set("amount", `N${+paystack.data.amount / 1000}`);
          this.set("reference", paystack.data.reference);
        }
        this.set("isLoading", false);
      }, (e) => {
        //// Argument (e) is Error!
        console.log(e);
      }
      )
      .catch(err => {
        console.log(err);
        this.set("reference", "********");
        this.set("isLoading", false);
      });
  }
}
