var Page = require('tns-core-modules/ui/page/page').Page
var NSPaystack = require('nativescript-paystack').NSPaystack
var paystack = new NSPaystack(new Page)

describe('getPublicKey function', function () {
  it('exists', function () {
    expect(paystack.getPublicKey).toBeDefined()
  })
})

describe('initialize function', function () {
  it('exists', function () {
    expect(paystack.initialize).toBeDefined()
  })
})

describe('setPublicKey function', function () {
  it('exists', function () {
    expect(paystack.setPublicKey).toBeDefined()
  })
})

describe('payment function', function () {
  it('exists', function () {
    expect(paystack.payment).toBeDefined()
  })
})
