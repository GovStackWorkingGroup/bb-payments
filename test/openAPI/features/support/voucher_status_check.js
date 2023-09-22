const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  voucherStatusCheckEndpoint,
  voucherStatusCheckResponseSchema,
  voucherResponseErrorSchema,
  contentTypeHeader,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specVoucherStatusCheck;

const baseUrl = localhost + voucherStatusCheckEndpoint;
const endpointTag = { tags: `@endpoint=/${voucherStatusCheckEndpoint}` };

Before(endpointTag, () => {
  specVoucherStatusCheck = spec();
});

// Scenario: Successfully checks the status of a voucher smoke type test
Given(
  'Wants to check the status of a voucher',
  () => 'Wants to check the status of a voucher'
);

When(
  /^GET request to check the status of the voucher with voucherserialnumer = "([^"]*)" is sent$/,
  voucher_serial_number => {
    specVoucherStatusCheck
      .get(baseUrl)
      .withPathParams('voucherserialnumber', voucher_serial_number);
  }
);

Then(
  /^Receives a response from the \/voucherstatuscheck endpoint$/,
  async () => await specVoucherStatusCheck.toss()
);

Then(
  /^The \/voucherstatuscheck response should be returned in a timely manner 15000ms$/,
  () =>
    specVoucherStatusCheck
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(/^The \/voucherstatuscheck response should have status (\d+)$/, status =>
  specVoucherStatusCheck.response().to.have.status(status)
);

Then(
  /^The \/voucherstatuscheck response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specVoucherStatusCheck
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The \/voucherstatuscheck response should match json schema$/, () =>
  chai
    .expect(specVoucherStatusCheck._response.json)
    .to.be.jsonSchema(voucherStatusCheckResponseSchema)
);

// Scenario: Successfully checks the status of a voucher with the optional X-Callback-URL header
// Others Given, When, Then are written in the aforementioned example
When(/^The request contains optional X-Callback-URL header$/, () => {
  specVoucherStatusCheck.withHeaders(
    'X-Callback-URL',
    'https://myserver.com/send/callback/here'
  );
});

// Scenario: Successfully checks the status of a voucher with the optional X-Channel header
// Others Given, When, Then are written in the aforementioned example
When(/^The request contains optional X-Channel header$/, () => {
  specVoucherStatusCheck.withHeaders('X-Channel', 'Web');
});

// Scenario: Successfully checks the status of a voucher with the optional X-Date header
// Others Given, When, Then are written in the aforementioned example
When(/^The request contains optional X-Date header$/, () => {
  specVoucherStatusCheck.withHeaders('X-Date', `${new Date().toISOString()}`);
});

// Scenario: Successfully checks the status of a voucher with the optional X-CorrelationID header
// Others Given, When, Then are written in the aforementioned example
When(/^The request contains optional X-CorrelationID header$/, () => {
  specVoucherStatusCheck.withHeaders(
    'X-CorrelationID',
    '40e9da5c-10fd-11ee-be56-0242ac120002'
  );
});

// Scenario: Unable to check the status of a voucher because of the invalid request
// Others Given, Then are written in the aforementioned example
When(
  /^GET request to check the status of the voucher is sent with invalid characters as "([^"]*)"$/,
  voucher_serial_number => {
    specVoucherStatusCheck
      .get(baseUrl)
      .withPathParams('voucherserialnumber', voucher_serial_number);
  }
);

Then(/^The \/voucherstatuscheck response should match json error schema$/, () =>
  chai
    .expect(specVoucherStatusCheck._response.json)
    .to.be.jsonSchema(voucherResponseErrorSchema)
);

Then(
  /^The \/voucherstatuscheck response should have a "([^"]*)" property$/,
  propertyName =>
    chai.expect(specVoucherStatusCheck._response.json).to.have.property(propertyName)
);

// Scenario: Unable to check the status of a voucher because of the invalid voucher number
// Given, When, Then are written in the aforementioned example

// Scenario: Unable to check the status of a voucher because the voucher number was already used
// Given, When, Then are written in the aforementioned example

// Scenario: Unable to check the status of a voucher, because the voucher has expired
// Given, When, Then are written in the aforementioned example

After(endpointTag, () => {
  specVoucherStatusCheck.end();
});
