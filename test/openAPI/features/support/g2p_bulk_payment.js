const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  contentTypeHeader,
  acceptHeader,
  bulkPaymentEndpoint,
  g2pResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + bulkPaymentEndpoint;
const endpointTag = { tags: `@endpoint=/${bulkPaymentEndpoint}` };

Before(endpointTag, () => {
  specBulkPayment = spec();
});

// Scenario: Succesfully handovered a batch of credit instructions to be processed smoke type test
Given(
  /^Source BB wants to handover a batch of credit instructions to be processed$/,
  () =>
    'Source BB wants to handover a batch of credit instructions to be processed'
);

When(
  /^POST request to bulk\-payments with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as BatchID, "([^"]*)" as InstructionID, "([^"]*)" as PayeeFunctionalID, (\d+) as Amount and "([^"]*)" as Currency is sent$/,
  (
    requestID,
    sourceBBID,
    batchID,
    instructionID,
    payeeFunctionalID,
    amount,
    currency
  ) =>
    specBulkPayment
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        BatchID: batchID,
        CreditInstructions: [
          {
            InstructionID: instructionID,
            PayeeFunctionalID: payeeFunctionalID,
            Amount: amount,
            Currency: currency,
          },
        ],
      })
);

Then(
  /^The response from the \/bulk\-payment is received$/,
  async () => await specBulkPayment.toss()
);

Then(
  /^The \/bulk\-payment response should be returned in a timely manner 15000ms$/,
  () =>
    specBulkPayment
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(/^The \/bulk\-payment response should have status (\d+)$/, status => {
  specBulkPayment.response().to.have.status(status);
});

Then(
  /^The \/bulk\-payment response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specBulkPayment
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The \/bulk\-payment response should match json schema$/, () =>
  chai
    .expect(specBulkPayment._response.json)
    .to.be.jsonSchema(g2pResponseSchema)
);

// Scenario: Succesfully handovered a batch of credit instructions to be processed using not obligatory fields in the request payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to bulk\-payments with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as BatchID, "([^"]*)" as InstructionID, "([^"]*)" as PayeeFunctionalID, (\d+) as Amount, "([^"]*)" as Currency and "([^"]*)" as Narration is sent$/,
  (
    requestID,
    sourceBBID,
    batchID,
    instructionID,
    payeeFunctionalID,
    amount,
    currency,
    narration
  ) =>
    specBulkPayment
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        BatchID: batchID,
        CreditInstructions: [
          {
            InstructionID: instructionID,
            PayeeFunctionalID: payeeFunctionalID,
            Amount: amount,
            Currency: currency,
            Narration: narration,
          },
        ],
      })
);

Then(
  /^The \/bulk\-payment response ResponseCode field should be "([^"]*)"$/,
  responseCode =>
    chai
      .expect(specBulkPayment.response().to.have.response.json.ResponseCode)
      .to.be.equals(responseCode)
);

Then(
  /^The \/bulk\-payment response RequestID field should be "([^"]*)"$/,
  requestID =>
    chai
      .expect(specBulkPayment.response().to.have.response.json.RequestID)
      .to.be.equals(requestID)
);

// Scenario: Unable to handover a batch of credit instructions to be processed because of missing required SourceBBID in the payload
// Others Given, When, Then are written in the aforementioned examples
When(
  /^POST request to bulk\-payments with given "([^"]*)" as RequestID, "([^"]*)" as BatchID, "([^"]*)" as InstructionID, "([^"]*)" as PayeeFunctionalID, (\d+) as Amount and "([^"]*)" as Currency is sent$/,
  (requestID, batchID, instructionID, payeeFunctionalID, amount, currency) =>
    specBulkPayment
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        BatchID: batchID,
        CreditInstructions: [
          {
            InstructionID: instructionID,
            PayeeFunctionalID: payeeFunctionalID,
            Amount: amount,
            Currency: currency,
          },
        ],
      })
);

// Scenario: Unable to handover a batch of credit instructions to be processed because of missing required BatchID in the payload
// Others Given, When, Then are written in the aforementioned examples
When(
  /^POST request to bulk\-payments with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as InstructionID, "([^"]*)" as PayeeFunctionalID, (\d+) as Amount and "([^"]*)" as Currency is sent$/,
  (requestID, sourceBBID, instructionID, payeeFunctionalID, amount, currency) =>
    specBulkPayment
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        CreditInstructions: [
          {
            InstructionID: instructionID,
            PayeeFunctionalID: payeeFunctionalID,
            Amount: amount,
            Currency: currency,
          },
        ],
      })
);

// Scenario: Unable to handover a batch of credit instructions to be processed because of empty CreditInstructions array in the payload
// Others Given, When, Then are written in the aforementioned examples
When(
  /^POST request to bulk\-payments with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as BatchID and an empty array as CreditInstructions is sent$/,
  (requestID, sourceBBID, batchID) =>
    specBulkPayment
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        BatchID: batchID,
        CreditInstructions: [],
      })
);

// Scenario: Unable to update beneficiary details because of invalid SourceBBID value in the payload
// Given, When, Then are written in the aforementioned examples

// Scenario: Unable to update beneficiary details because of invalid PayeeFunctionalID value in the payload
// Given, When, Then are written in the aforementioned examples

After(endpointTag, () => {
  specBulkPayment.end();
});
