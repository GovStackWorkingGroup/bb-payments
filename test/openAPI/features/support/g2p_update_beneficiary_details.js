const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  contentTypeHeader,
  acceptHeader,
  updateBeneficiaryDetailsEndpoint,
  g2pResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + updateBeneficiaryDetailsEndpoint;
const endpointTag = { tags: `@endpoint=/${updateBeneficiaryDetailsEndpoint}` };

Before(endpointTag, () => {
  specUpdateBeneficiaryDetails = spec();
});

// Scenario: Succesfully updated beneficiary details smoke type test
Given(
  /^Information Mediator BB wants to update beneficiary details$/,
  () => 'Information Mediator BB wants to update beneficiary details'
);

When(
  /^POST request to update beneficiary details with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID and "([^"]*)" as PayeeFunctionalID is sent$/,
  (requestID, sourceBBID, payeeFunctionalID) =>
    specUpdateBeneficiaryDetails
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        Beneficiaries: [{ PayeeFunctionalID: payeeFunctionalID }],
      })
);

Then(
  /^The response from the \/update\-beneficiary\-details is received$/,
  async () => await specUpdateBeneficiaryDetails.toss()
);

Then(
  /^The \/update\-beneficiary\-details response should be returned in a timely manner 15000ms$/,
  () =>
    specUpdateBeneficiaryDetails
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  /^The \/update\-beneficiary\-details response should have status (\d+)$/,
  status => {
    specUpdateBeneficiaryDetails.response().to.have.status(status);
  }
);

Then(
  /^The \/update\-beneficiary\-details response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specUpdateBeneficiaryDetails
      .response()
      .should.have.headerContains(key, value)
);

Then(
  /^The \/update\-beneficiary\-details response should match json schema$/,
  () =>
    chai
      .expect(specUpdateBeneficiaryDetails._response.json)
      .to.be.jsonSchema(g2pResponseSchema)
);

Then(
  /^The \/update\-beneficiary\-details response should have a "([^"]*)" property$/,
  propertyName => {
    chai.expect(specUpdateBeneficiaryDetails._response.json).to.have.property(propertyName);
  }
);

// Scenario: Succesfully updated beneficiary details using not obligatory fields in the request payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to update beneficiary details with given "([^"]*)" as RequestID, "([^"]*)" as SourceBBID, "([^"]*)" as PayeeFunctionalID, "([^"]*)" as PaymentModality and "([^"]*)" as FinancialAddress is sent$/,
  (
    requestID,
    sourceBBID,
    payeeFunctionalID,
    paymentModality,
    financialAddress
  ) =>
    specUpdateBeneficiaryDetails
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
  /^The \/update\-beneficiary\-details response ResponseCode field should be "([^"]*)"$/,
  responseCode =>
    chai
      .expect(
        specUpdateBeneficiaryDetails.response().to.have.response.json
          .ResponseCode
      )
      .to.be.equals(responseCode)
);

Then(
  /^The \/update\-beneficiary\-details response RequestID field should be "([^"]*)"$/,
  requestID =>
    chai
      .expect(
        specUpdateBeneficiaryDetails.response().to.have.response.json.RequestID
      )
      .to.be.equals(requestID)
);

// Scenario: Unable to update beneficiary details because of missing required SourceBBID in the payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to update beneficiary details with given "([^"]*)" as RequestID and "([^"]*)" as PayeeFunctionalID is sent$/,
  (requestID, payeeFunctionalID) =>
    specUpdateBeneficiaryDetails
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

// Scenario: Unable to update beneficiary details because of missing required PayeeFunctionalID in the payload
// Others Given, When, Then are written in the aforementioned example
When(
  /^POST request to update beneficiary details with given "([^"]*)" as RequestID and "([^"]*)" as SourceBBID is sent$/,
  (requestID, sourceBBID) =>
    specUpdateBeneficiaryDetails
      .post(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withJson({
        RequestID: requestID,
        SourceBBID: sourceBBID,
        Beneficiaries: [],
      })
);

// Scenario: Unable to update beneficiary details because of invalid SourceBBID value in the payload
// Given, When, Then are written in the aforementioned example

// Scenario: Unable to update beneficiary details because of invalid PayeeFunctionalID value in the payload
// Given, When, Then are written in the aforementioned example

After(endpointTag, () => {
  specUpdateBeneficiaryDetails.end();
});
