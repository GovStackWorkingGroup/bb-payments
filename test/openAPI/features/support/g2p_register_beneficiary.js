const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  contentTypeHeader,
  acceptHeader,
  registerBeneficiaryEndpoint,
  g2pResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + registerBeneficiaryEndpoint;
const endpointTag = { tags: `@endpoint=/${registerBeneficiaryEndpoint}` };

Before(endpointTag, () => {
  specRegisterBeneficiary = spec();
});

// Scenario: Succesfully registered a beneficiary smoke type test
Given(
  /^Information Mediator BB wants to register a beneficiary$/,
  () => 'Information Mediator BB wants to register a beneficiary'
);

When(
  /^POST request to register a beneficiary with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID and "([^"]*)" as PayeeFunctionalID is sent$/,
  (requestID, sourceBBID, payeeFunctionalID) =>
    specRegisterBeneficiary
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        Beneficiaries: [{ PayeeFunctionalID: payeeFunctionalID }],
      })
);

Then(
  /^The response from the \/register\-beneficiary is received$/,
  () => async () => await specRegisterBeneficiary.toss()
);

Then(
  /^The \/register\-beneficiary response should be returned in a timely manner 15000ms$/,
  () =>
    specRegisterBeneficiary
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  /^The \/register\-beneficiary response should have status (\d+)$/,
  status => specRegisterBeneficiary.response().to.have.status(status)
);

Then(
  /^The \/register\-beneficiary response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specRegisterBeneficiary
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The \/register\-beneficiary response should match json schema$/, () =>
  chai
    .expect(specRegisterBeneficiary._response.json)
    .to.be.jsonSchema(g2pResponseSchema)
);

// Scenario: Succesfully registered a beneficiary using not obligatory fields in the request payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to register a beneficiary with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as PayeeFunctionalID, "([^"]*)" as PaymentModality and "([^"]*)" as FinancialAddress is sent$/,
  (
    requestID,
    sourceBBID,
    payeeFunctionalID,
    paymentModality,
    financialAddress
  ) =>
    specRegisterBeneficiary
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        Beneficiaries: [
          {
            PayeeFunctionalID: payeeFunctionalID,
            PaymentModality: paymentModality,
            FinancialAddress: financialAddress,
          },
        ],
      })
);

Then(
  /^The \/register\-beneficiary response ResponseCode field should be "([^"]*)"$/,
  responseCode =>
    chai
      .expect(
        specRegisterBeneficiary.response().to.have.response.json.ResponseCode
      )
      .to.be.equals(responseCode)
);

Then(
  /^The \/register\-beneficiary response RequestID field should be "([^"]*)"$/,
  requestID =>
    chai
      .expect(
        specRegisterBeneficiary.response().to.have.response.json.RequestID
      )
      .to.be.equals(requestID)
);

Then(
  /^The \/register\-beneficiary response should have a "([^"]*)" property$/,
  propertyName => {
    chai.expect(specRegisterBeneficiary._response.json).to.have.property(propertyName);
  }
);

// Scenario: Unable to register a beneficiary because of missing required SourceBBID in the payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to register a beneficiary with given "([^"]*)" as RequestID and "([^"]*)" as PayeeFunctionalID is sent$/,
  (requestID, payeeFunctionalID) =>
    specRegisterBeneficiary
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        Beneficiaries: [
          {
            PayeeFunctionalID: payeeFunctionalID,
          },
        ],
      })
);

// Scenario: Unable to register a beneficiary because of missing required PayeeFunctionalID in the payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to register a beneficiary with given "([^"]*)" as RequestID and "([^"]*)" as SourceBBID is sent$/,
  (requestID, sourceBBID) =>
    specRegisterBeneficiary
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        Beneficiaries: [],
      })
);

// Scenario: Unable to register a beneficiary because of invalid SourceBBID value in the payload
// Given, When, Then are written in the aforementioned example

// Scenario: Unable to register a beneficiary because of invalid PayeeFunctionalID value in the payload
// Given, When, Then are written in the aforementioned example

After(endpointTag, () => {
  specRegisterBeneficiary.end();
});
