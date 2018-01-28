import { Component, OnInit } from "@angular/core";
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

const publicKey = "";
const secretKey = "";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  amount: string;
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
    signature: string;
  };
  paystack: NSPaystack;
  reference: string;
  isLoading: boolean;

  constructor(
    page: Page
  ) {
    this.isLoading = false;
    this.reference = "********";
    this.paystack = new NSPaystack(page);
    this.paystack.initialize(publicKey);
  }

  ngOnInit(): void {
  }

  makePayment() {
    this.isLoading = true;
    const params = {
      amount: 500000,
      email: "my.email@gmail.com",
      number: "4084084084084081",
      cvc: "408",
      year: 2019,
      month: 3,
    };
    this.paystack.payment(params)
      .then(({ reference }) => {
        console.log(`Reference: ${reference}`);
        return request({
          url: `https://api.paystack.co/transaction/verify/${reference}`,
          method: "GET",
          headers: { "Authorization": `Bearer ${secretKey}` }
        });
      })
      .then((res: HttpResponse) => {
        const paystack: PaystackResponse = res.content.toJSON();

        if (paystack.status) {
          this.authorization = paystack.data.authorization;
          this.customer = paystack.data.customer;
          this.amount = `N${+paystack.data.amount / 1000}`;
          this.reference = paystack.data.reference;
        }
        this.isLoading = false;
      })
      .catch(err => {
        console.dir(err);
        this.reference = "********";
        this.isLoading = false;
      });
  }
}