# Nativescript Paystack
[![npm version](https://badge.fury.io/js/nativescript-paystack.svg)](https://badge.fury.io/js/nativescript-paystack)
[![npm](https://img.shields.io/npm/dt/nativescript-paystack.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-paystack)
[![Build Status](https://travis-ci.org/jogboms/nativescript-paystack.svg?branch=master)](https://travis-ci.org/jogboms/nativescript-paystack)

Nativescript-Paystack provides a wrapper that incorporate payments using [Paystack](https://paystack.com/) from within your {N} applications. The integration is achieved using the Paystack [Android](https://github.com/PaystackHQ/paystack-android)/[iOS](https://github.com/PaystackHQ/paystack-ios) SDK libraries. Hence, has full support for both Android & iOS.

## Installation
The package should be installed via `tns plugin` for proper gradle and Pod setup.
```bash
tns plugin add nativescript-paystack
```

## Usage
### Setup 
First import package into the `main-page`'s model or `app.component` as the case may be for either {N} Core or {N} w/ Angular
```ts
import { NSPaystack } from "nativescript-paystack";
```

Then create an instance of `NSPaystack` which requires a dependency of the `Page` object.
```ts
this.paystack = new NSPaystack(<Page>page);
```

Initialize the instance with the `publicKey` gotten from Paystack
```ts
this.paystack.initialize(publicKey);
```

### Charging a Card 
To charge a card, it is expected that the Form/UI responsible for handling the data collection is handled by you. 
```ts
this.paystack.payment({
    amount: 500000,
    email: "o.jeremiah@rom-flex.com",
    number: "4084084084084081",
    cvc: "408",
    year: 2019,
    month: 3,
})
.then(({ reference }) => {
    alert(`Reference: ${reference}`);
})
.catch(({ code, message, reference }) => {
    alert(`An error occured`);
    console.log(`Code: ${code}`);
    console.log(`Message: ${message}`);
    console.log(`Reference: ${reference}`); // If any
});
```

## API
### Payload Signature
The payload signature is also available via the definition files.

| Argument        | Type           | Description  |
| ------------- |:-------------| :-----|
| number          | string | the card number without any space seperator |
| month      | number      | the card expiry month ranging from 1-12 |
| year | number      | the card expiry year in a four-digits e.g 2019 |
| cvc | string | the card 3/4 digit security code |
| amount | number | the charge amount in kobo |
| email      | string      | the customer's email address |


### Response Signature
Promise response signature is also available via the definition files.
#### Success Response
```ts
interface NSPaystackSuccessResponse {
  reference: string;
}
```
#### Error Response
```ts
export interface NSPaystackErrorResponse {
  code: number | string;
  message: string;
  reference?: string;
}
```
 
## License
Apache License Version 2.0, January 2004
