import { Observable } from "tns-core-modules/data/observable";
import { NSPaystack, NSPayment } from "nativescript-paystack";
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
            signature: string;
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

export class HelloWorldModel extends Observable {
    public message: string;
    private paystack: NSPaystack;

    constructor() {
        super();
        this.set("isLoading", false);
        this.set("reference", "********");
        this.paystack = new NSPaystack();

        this.paystack.initialize(publicKey);
    }

    makePayment() {
        this.set("isLoading", true);
        const payment = this.paystack.payment({
            amount: 500000, // In Kobo
            email: "my.email@gmail.com",
            number: "4084084084084081",
            cvc: "408",
            year: 2019,
            month: 3
        });
        payment.addMetadata("Hello", "World");
        payment.addCustomField("Author", "Anonymous");
        payment.on(NSPayment.openDialogEvent, () => {
            console.log(NSPayment.openDialogEvent);
        });
        payment.on(NSPayment.closeDialogEvent, () => {
            console.log(NSPayment.closeDialogEvent);
        });
        payment
            .charge()
            .then(({ reference }) => {
                console.log(`Reference: ${reference}`);
                return request({
                    url: `https://api.paystack.co/transaction/verify/${reference}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${secretKey}` }
                });
            })
            .then((res: HttpResponse) => {
                const paystack: PaystackResponse = res.content.toJSON();

                if (paystack.status) {
                    this.set("authorization", paystack.data.authorization);
                    this.set("customer", paystack.data.customer);
                    this.set("amount", `N${+paystack.data.amount / 100}`);
                    this.set("reference", paystack.data.reference);
                }
                this.set("isLoading", false);
            })
            .catch(err => {
                console.dir(err);
                this.set("reference", "********");
                this.set("isLoading", false);
            });
    }
}
