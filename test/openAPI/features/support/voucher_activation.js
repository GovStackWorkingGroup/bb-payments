const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  voucherActivationEndpoint,
  voucherActivationResponseSchema,
  voucherResponseErrorSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specVoucherActivation;

const baseUrl = localhost + voucherActivationEndpoint;
const endpointTag = { tags: `@endpoint=/${voucherActivationEndpoint}` };

Before(endpointTag, () => {
  specVoucherActivation = spec();
});

// Scenario: Successfully activates a pre-activated voucher smoke type test
Given(
  'Non Payment Building Block wants to activate a pre-activated voucher',
  () => 'Non Payment Building Block wants to activate a pre-activated voucher'
);

When(
  /^Sends PATCH \/vouchers\/voucher_activation request with valid payload where voucher_serial_number = (\d+)$/,
  voucher_serial_number =>
    specVoucherActivation.patch(baseUrl).withJson({
      voucher_serial_number: voucher_serial_number,
      Gov_Stack_BB: 'bb-digital-registries',
    })
);

Then(
  /^Receives a response from the \/vouchers\/voucher_activation endpoint$/,
  async () => await specVoucherActivation.toss()
);

Then(
  /^The \/vouchers\/voucher_activation endpoint response should be returned in a timely manner 15000ms$/,
  () =>
    specVoucherActivation
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  /^The \/vouchers\/voucher_activation endpoint response should have status (\d+)$/,
  status => specVoucherActivation.response().to.have.status(status)
);

Then(
  /^The \/vouchers\/voucher_activation endpoint response should match json schema$/,
  () =>
    chai
      .expect(specVoucherActivation._response.json)
      .to.be.jsonSchema(voucherActivationResponseSchema)
);

// Scenario: The user is not able to activate a pre-activated voucher because of Gov Stack Building Block does not exist
// Others Given, When, Then are written in the aforementioned example
When(/^Provides optional X-Callback-URL header$/, () => {
  specVoucherActivation.withHeaders(
    'X-Callback-URL',
    'https://myserver.com/send/callback/here'
  );
});

// Scenario: Successfully activates a pre-activated voucher with the optional X-Channel header
// Others Given, When, Then are written in the aforementioned example
When(/^Provides optional X-Channel header$/, () => {
  specVoucherActivation.withHeaders('X-Channel', 'Web');
});

// Scenario: Successfully activates a pre-activated voucher with the optional X-Date header
// Others Given, When, Then are written in the aforementioned example
When(/^Provides optional X-Date header$/, () => {
  specVoucherActivation.withHeaders('X-Date', `${new Date().toISOString()}`);
});

// Scenario: Successfully activates a pre-activated voucher with the optional X-CorrelationID header
// Others Given, When, Then are written in the aforementioned example
When(/^Provides optional X-CorrelationID header$/, () => {
  specVoucherActivation.withHeaders(
    'X-CorrelationID',
    '40e9da5c-10fd-11ee-be56-0242ac120002'
  );
});

// Scenario: Unable to activate a pre-activated voucher because of an empty payload
// Others Given, Then are written in the aforementioned example
When(
  /^Sends PATCH \/vouchers\/voucher_activation request without payload$/,
  () => specVoucherActivation.patch(baseUrl).withJson({})
);

Then(
  /^The \/vouchers\/voucher_activation endpoint response should match json error schema$/,
  () =>
    chai
      .expect(specVoucherActivation._response.json)
      .to.be.jsonSchema(voucherResponseErrorSchema)
);

// Scenario: Unable to activate a pre-activated voucher because of an invalid voucher_serial_number
// Others Given, Then are written in the aforementioned example
When(
  /^Sends PATCH \/vouchers\/voucher_activation request with an invalid voucher_serial_number$/,
  () =>
    specVoucherActivation.patch(baseUrl).withJson({
      voucher_serial_number: 'invalid_voucher_serial_number',
      Gov_Stack_BB: 'bb-digital-registries',
    })
);

// Scenario: Unable to activate a pre-activated voucher because given Gov_Stack_BB does not exist
// Others Given, Then are written in the aforementioned example
When(
  /^Sends PATCH \/vouchers\/voucher_activation request with an invalid Gov_Stack_BB and valid voucher_serial_number = (\d+)$/,
  voucher_serial_number =>
    specVoucherActivation.patch(baseUrl).withJson({
      voucher_serial_number: voucher_serial_number,
      Gov_Stack_BB: 'not_exist',
    })
);

After(endpointTag, () => {
  specVoucherActivation.end();
});
