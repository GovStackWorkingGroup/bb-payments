const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  voucherCancelationEndpoint,
  voucherCancelationResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specVoucherCancelation;
let specVoucherReCancelation;

const baseUrl = localhost + voucherCancelationEndpoint;
const endpointTag = { tags: `@endpoint=/${voucherCancelationEndpoint}` };
const GovStackBB = 'bb-digital-registries';
let voucherSerialNumberToCancel;

Before(endpointTag, () => {
  specVoucherCancelation = spec();
  specVoucherReCancelation = spec();
});

// Scenario: A non Payment Building Block successfully cancels a voucher smoke type test
Given(
  /^A non Payment Building Block wants to cancel a voucher$/,
  () => 'A non Payment Building Block wants to cancel a voucher'
);

When(
  /^A PATCH request to cancel the voucher with serial number = "([^"]*)" is sent$/,
  serialNumber => {
    voucherSerialNumberToCancel = serialNumber;
    specVoucherCancelation
      .patch(baseUrl)
      .withJson({
        voucherserialnumber: serialNumber,
        Gov_Stack_BB: GovStackBB,
      })
      .withPathParams('voucherserialnumber', serialNumber);
  }
);

Then(
  /^The response from the voucher cancelation endpoint is received$/,
  async () => {
    await specVoucherCancelation.toss();
  }
);

Then(
  /^The voucher cancelation response should be returned in a timely manner (\d+) ms$/,
  responseTime => {
    specVoucherCancelation
      .response()
      .to.have.responseTimeLessThan(responseTime);
  }
);

Then(
  /^The voucher cancelation response should have status (\d+)$/,
  statusCode => {
    specVoucherCancelation.response().to.have.status(statusCode);
  }
);

Then(/^The voucher cancelation response should match json schema$/, () => {
  chai
    .expect(specVoucherCancelation._response.json)
    .to.be.jsonSchema(voucherCancelationResponseSchema);
});

Then(
  /^The voucher cancelation response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specVoucherCancelation
      .response()
      .should.have.headerContains(key, value)
);


Then(
  /^The voucher cancelation response should have a "([^"]*)" property$/,
  propertyName =>
    chai.expect(specVoucherCancelation._response.json).to.have.property(propertyName)
);

// Scenario: A non Payment Building Block is unable to cancel a voucher that has already been canceled
// Others Given, When, Then are written in the aforementioned example
When(/^A PATCH request to cancel the same voucher is sent second time$/, () => {
  specVoucherReCancelation
    .patch(baseUrl)
    .withJson({
      voucherserialnumber: voucherSerialNumberToCancel,
      Gov_Stack_BB: GovStackBB,
    })
    .withPathParams('voucherserialnumber', voucherSerialNumberToCancel);
});

Then(/^The response from re-cancellation is received$/, async () => {
  await specVoucherReCancelation.toss();
});

Then(
  /^The response from re-cancellation should be returned in a timely manner (\d+) ms$/,
  responseTime => {
    specVoucherReCancelation
      .response()
      .to.have.responseTimeLessThan(responseTime);
  }
);

Then(
  /^The response from re-cancellation should have status (\d+)$/,
  statusCode => {
    specVoucherReCancelation.response().to.have.status(statusCode);
  }
);

Then(/^The response from re-cancellation should match json schema$/, () => {
  chai
    .expect(specVoucherReCancelation._response.json)
    .to.be.jsonSchema(voucherCancelationResponseSchema);
});

Then(/^The voucher re-cancellation response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) => {
    specVoucherReCancelation
      .response()
      .should.have.headerContains(key, value);
  });

Then(
  /^The voucher re-cancellation response should have a "([^"]*)" property$/,
  propertyName =>
    chai.expect(specVoucherReCancelation._response.json).to.have.property(propertyName)
);

// Scenario: A non Payment Building Block is unable to cancel a voucher due to providing invalid voucher serial number in the payload
// Given and Then are written in the aforementioned example
When(
  /^A PATCH request to cancel the voucher with invalid serial number = "([^"]*)" is sent$/,
  invalidSerialNumber => {
    specVoucherCancelation
      .patch(baseUrl)
      .withJson({
        voucherserialnumber: invalidSerialNumber,
        Gov_Stack_BB: GovStackBB,
      })
      .withPathParams('voucherserialnumber', invalidSerialNumber);
  }
);

// Scenario: A non Payment Building Block is unable to cancel a voucher due to providing invalid Gov Stack Building Block in the payload
// Given and Then are written in the aforementioned example
When(
  /^A PATCH request to cancel the voucher with invalid Gov Stack Building Block = "([^"]*)" is sent$/,
  invalidGovStackBB => {
    specVoucherCancelation
      .patch(baseUrl)
      .withJson({
        voucherserialnumber: '60002',
        Gov_Stack_BB: invalidGovStackBB,
      })
      .withPathParams('voucherserialnumber', 60002);
  }
);

// Scenario: A non Payment Building Block is unable to cancel a voucher due to missing required voucher serial number in the payload
// Given and Then are written in the aforementioned example
When(
  /^A PATCH request to cancel the voucher is sent with missing voucher serial number in the payload$/,
  () => {
    specVoucherCancelation
      .patch(baseUrl)
      .withJson({
        Gov_Stack_BB: GovStackBB,
      })
      .withPathParams('voucherserialnumber', 60003);
  }
);

// Scenario: A non Payment Building Block is unable to cancel a voucher due to missing required Gov Stack Building Block in the payload
// Given and Then are written in the aforementioned example
When(
  /^A PATCH request to cancel the voucher is sent with missing Gov Stack Building Block in the payload$/,
  () => {
    specVoucherCancelation
      .patch(baseUrl)
      .withJson({
        voucherserialnumber: '60004',
      })
      .withPathParams('voucherserialnumber', 60004);
  }
);

// Scenario: A non Payment Building Block is unable to cancel a voucher due to missing payload in the request
// Given and Then are written in the aforementioned example
When(/^A PATCH request to cancel the voucher is sent without payload$/, () => {
  specVoucherCancelation
    .patch(baseUrl)
    .withPathParams('voucherserialnumber', 60005);
});

After(endpointTag, () => {
  specVoucherCancelation.end();
  specVoucherReCancelation.end();
});
