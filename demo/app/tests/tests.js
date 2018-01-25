var Paystack = require("nativescript-paystack").Paystack;
var paystack = new Paystack();

describe("greet function", function() {
    it("exists", function() {
        expect(paystack.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(paystack.greet()).toEqual("Hello, NS");
    });
});