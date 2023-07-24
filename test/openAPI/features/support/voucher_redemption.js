const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  voucherRedemptionEndpoint,
  voucherRedemptionResponseSchema,
  voucherResponseErrorSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + voucherRedemptionEndpoint;
const endpointTag = { tags: `@endpoint=/${voucherRedemptionEndpoint}` };

Before(endpointTag, () => {
  specVoucherRedemption = spec();
});

// Scenario: A non-Payment Building Block successfully redeems a voucher smoke type test
Given(
  /^A non-Payment Building Block wants to redeem a voucher$/,
  () => 'A non-Payment Building Block wants to redeem a voucher'
);

When(/^Sends POST request with valid payload to redeem a voucher$/, () => {
  specVoucherRedemption.post(baseUrl).withJson({
    voucher_number: '6003',
    Gov_Stack_BB: 'bb-digital-registries',
    merchant_name: 'Melissa Stephenson',
    merchant_bank_details: 'Citizen Service Banks',
    merchant_voucher_group: 'Payment Voucher',
    override: true,
  });
});

Then(
  /^Receives a response from the \/vouchers\/voucher_redemption endpoint$/,
  async () => {
    await specVoucherRedemption.toss();
  }
);

Then(
  /^The \/vouchers\/voucher_redemption endpoint response should be returned in a timely manner (\d+) ms$/,
  responseTime =>
    specVoucherRedemption.response().to.have.responseTimeLessThan(responseTime)
);

Then(
  /^The \/vouchers\/voucher_redemption endpoint response should have status (\d+)$/,
  status => specVoucherRedemption.response().to.have.status(status)
);

Then(
  /^The \/vouchers\/voucher_redemption endpoint response should match json schema$/,
  () =>
    chai
      .expect(specVoucherRedemption._response.json)
      .to.be.jsonSchema(voucherRedemptionResponseSchema)
);

// Scenario: A non-Payment Building Block is unable to redeem a voucher because of the invalid request
// Others Given and Then are written in the aforementioned example
When(/^Sends POST request without payload to redeem a voucher$/, () => {
  specVoucherRedemption.post(baseUrl);
});

Then(
  /^The \/vouchers\/voucher_redemption endpoint response should match json error schema$/,
  () =>
    chai
      .expect(specVoucherRedemption._response.json)
      .to.be.jsonSchema(voucherResponseErrorSchema)
);

// Scenario: A non-Payment Building Block is unable to redeem a voucher because the GovStack Building Block does not exist
// Others Given and Then are written in the aforementioned example
When(
  /^Sends POST request with invalid Gov_Stack_BB in the payload to redeem a voucher$/,
  () => {
    specVoucherRedemption.post(baseUrl).withJson({
      voucher_number: '6004',
      Gov_Stack_BB: 'invalid_bb',
      merchant_name: 'Melissa Stephenson',
      merchant_bank_details: 'Citizen Service Banks',
      merchant_voucher_group: 'Payment Voucher',
      override: true,
    });
  }
);

// Scenario: A non-Payment Building Block is unable to redeem a voucher because of the invalid voucher number
// Others Given and Then are written in the aforementioned example
When(
  /^Sends POST request with invalid voucher_number in the payload to redeem a voucher$/,
  () => {
    specVoucherRedemption.post(baseUrl).withJson({
      voucher_number: 'notAnumber',
      Gov_Stack_BB: 'bb-digital-registries',
      merchant_name: 'Melissa Stephenson',
      merchant_bank_details: 'Citizen Service Banks',
      merchant_voucher_group: 'Payment Voucher',
      override: true,
    });
  }
);

// Scenario: A non-Payment Building Block is unable to redeem a voucher because of insufficient funds in funding a/c
// Others Given and Then are written in the aforementioned example
When(
  /^Sends POST request to redeem a voucher with insufficient funds in funding a\/c$/,
  () => {
    specVoucherRedemption.post(baseUrl).withJson({
      voucher_number: '6004',
      Gov_Stack_BB: 'bb-digital-registries',
      merchant_name: 'Ronan Oliver',
      merchant_bank_details: 'Vigor Bank Group',
      merchant_voucher_group: 'insufficient funds',
      override: true,
    });
  }
);

// Scenario: A non-Payment Building Block is unable to redeem a voucher because the merchant cannot be credited
// Others Given and Then are written in the aforementioned example
When(
  /^Sends POST request to redeem a voucher with merchant that cannot be credited$/,
  () => {
    specVoucherRedemption.post(baseUrl).withJson({
      voucher_number: '6004',
      Gov_Stack_BB: 'bb-digital-registries',
      merchant_name: 'Annie Krueger',
      merchant_bank_details: 'Omega Holding Company',
      merchant_voucher_group: 'insufficient funds',
      override: true,
    });
  }
);

After(endpointTag, () => {
  specVoucherRedemption.end();
});
