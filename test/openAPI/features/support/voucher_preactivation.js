const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  voucherPreactivationEndpoint,
  voucherPreactivationResponseSchema,
  voucherPreactivationResponseErrorSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specVoucherPreactivation;

const baseUrl = localhost + voucherPreactivationEndpoint;
const endpointTag = { tags: `@endpoint=/${voucherPreactivationEndpoint}` };

Before(endpointTag, () => {
  specVoucherPreactivation = spec();
});

// Scenario: The user successfully receives a pre-activated voucher smoke type test
Given(
  'The user wants to receives a pre-activated voucher',
  () => 'The user wants to receives a pre-activated voucher'
);

When(
  /^Send POST \/vouchers\/voucher_preactivation with required body with given "([^"]*)" as voucher_amount, "([^"]*)" as voucher_currency, "([^"]*)" as voucher_group, "([^"]*)" as Gov_Stack_BB$/,
  (voucher_amount, voucher_currency, voucher_group, Gov_Stack_BB) => {
    specVoucherPreactivation.post(baseUrl).withJson({
      voucher_amount: voucher_amount,
      voucher_currency: voucher_currency,
      voucher_group: voucher_group,
      Gov_Stack_BB: Gov_Stack_BB,
      voucher_comment: 'string',
    });
  }
);

Then(
  /^Receive a response from the \/vouchers\/voucher_preactivation endpoint$/,
  async () => await specVoucherPreactivation.toss()
);

Then(
  /^The \/vouchers\/voucher_preactivation endpoint response should be returned in a timely manner 15000ms$/,
  () =>
    specVoucherPreactivation
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  /^The \/vouchers\/voucher_preactivation endpoint response should have status (\d+)$/,
  status => specVoucherPreactivation.response().to.have.status(status)
);

Then(
  /^The \/vouchers\/voucher_preactivation endpoint response should match json schema$/,
  () =>
    chai
      .expect(specVoucherPreactivation._response.json)
      .to.be.jsonSchema(voucherPreactivationResponseSchema)
);

Then(
  /^The \/vouchers\/voucher_preactivation response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specVoucherPreactivation
      .response()
      .should.have.headerContains(key, value)
);

// Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Callback-URL header
// Others Given, When, Then are written in the aforementioned example
When(/^Send with optional X-Callback-URL header$/, () =>
  specVoucherPreactivation.withHeaders(
    'X-Callback-URL',
    'https://myserver.com/send/callback/here'
  )
);

// Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Channel header
// Others Given, When, Then are written in the aforementioned example
When(/^Send with optional X-Channel header$/, () =>
  specVoucherPreactivation.withHeaders('X-Channel', 'Web')
);

// Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Date header
// Others Given, When, Then are written in the aforementioned example
When(/^Send with optional X-Date header$/, () =>
  specVoucherPreactivation.withHeaders('X-Date', `${new Date().toISOString()}`)
);

// Scenario: The user successfully receives a pre-activated voucher by providing the optional X-CorrelationID header
// Others Given, When, Then are written in the aforementioned example
When(/^Send with optional X-CorrelationID header$/, () =>
  specVoucherPreactivation.withHeaders(
    'X-CorrelationID',
    '40e9da5c-10fd-11ee-be56-0242ac120002'
  )
);

// Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher amount
// Others Given, When, Then are written in the aforementioned example
When(
  /^Send POST \/vouchers\/voucher_preactivation request with an invalid voucher amount and "([^"]*)" as voucher_currency, "([^"]*)" as voucher_group, "([^"]*)" as Gov_Stack_BB$/,
  (voucher_currency, voucher_group, Gov_Stack_BB) =>
    specVoucherPreactivation.post(baseUrl).withJson({
      voucher_amount: null,
      voucher_currency: voucher_currency,
      voucher_group: voucher_group,
      Gov_Stack_BB: Gov_Stack_BB,
      voucher_comment: 'string',
    })
);

Then(
  /^The \/vouchers\/voucher_preactivation endpoint response should match json error schema$/,
  () =>
    chai
      .expect(specVoucherPreactivation._response.json)
      .to.be.jsonSchema(voucherPreactivationResponseErrorSchema)
);

Then(
  /^The \/vouchers\/voucher_preactivation response should have a "([^"]*)" property$/,
  propertyName =>
    chai.expect(specVoucherPreactivation._response.json).to.have.property(propertyName)
);

// Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher currency
// Others Given, When, Then are written in the aforementioned example
When(
  /^Send POST \/vouchers\/voucher_preactivation request with an invalid voucher currency and "([^"]*)" as voucher_amount, "([^"]*)" as voucher_group, "([^"]*)" as Gov_Stack_BB$/,
  (voucher_amount, voucher_group, Gov_Stack_BB) =>
    specVoucherPreactivation.post(baseUrl).withJson({
      voucher_amount: voucher_amount,
      voucher_currency: '000',
      voucher_group: voucher_group,
      Gov_Stack_BB: Gov_Stack_BB,
      voucher_comment: 'string',
    })
);

// Scenario: The user is not able to receives a pre - activated voucher because of an invalid voucher_group
// Others Given, When, Then are written in the aforementioned example

When(
  /^Send POST \/vouchers\/voucher_preactivation request with an invalid voucher_group and "([^"]*)" as voucher_amount, "([^"]*)" as voucher_currency, "([^"]*)" as Gov_Stack_BB$/,
  (voucher_amount, voucher_currency, Gov_Stack_BB) =>
    specVoucherPreactivation.post(baseUrl).withJson({
      voucher_amount: voucher_amount,
      voucher_currency: voucher_currency,
      voucher_group: null,
      Gov_Stack_BB: Gov_Stack_BB,
      voucher_comment: 'string',
    })
);

// Scenario: The user is not able to receives a pre - activated voucher because of Gov Stack Building Block does not exist
// Others Given, When, Then are written in the aforementioned example
When(
  /^Send POST \/vouchers\/voucher_preactivation request with an invalid Gov_Stack_BB and "([^"]*)" as voucher_amount, "([^"]*)" as voucher_currency, "([^"]*)" as voucher_group$/,
  (voucher_amount, voucher_currency, voucher_group) =>
    specVoucherPreactivation.post(baseUrl).withJson({
      voucher_amount: voucher_amount,
      voucher_currency: voucher_currency,
      voucher_group: voucher_group,
      Gov_Stack_BB: 'not_exist',
      voucher_comment: 'string',
    })
);

// Scenario: The user is not able to receives a pre-activated voucher because of an empty payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^Send POST \/vouchers\/voucher_preactivation request an empty payload$/,
  () => specVoucherPreactivation.post(baseUrl).withJson({})
);

After(endpointTag, () => {
  specVoucherPreactivation.end();
});
