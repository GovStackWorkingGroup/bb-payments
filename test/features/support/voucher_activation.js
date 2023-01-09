const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherActivation;

const baseUrl = `${localhost}vouchers/voucher_activation`;
const validBodyValue = {
    "voucher_serial_number": 223,
    "Gov_Stack_BB": "example Gov_Stack_BB"
}
const invalidSerialNumberBodyValue = {
    "voucher_serial_number": 0,
    "Gov_Stack_BB": "example Gov_Stack_BB"
}
const invalidGovStackBBBodyValue = {
    "voucher_serial_number": 223
}

Before(() => {
    specVoucherActivation = pactum.spec();
});

// Background: The user wants to activate pre-activated voucher
Given(
  'The user wants to activate pre-activated voucher', () => {
  return 'The user wants to activate pre-activated voucher';
  }
);

// Scenario: The user successfully activates a pre-activated voucher
When(
  'The user triggers an action with a valid payload to activate a pre-activated voucher', () => {
    specVoucherActivation
      .patch(baseUrl)
      .withBody(validBodyValue);
});

Then('The user successfully activates a pre-activated voucher', async () => {
  await specVoucherActivation.toss();
  specVoucherActivation.response().should.have.status(200);
  specVoucherActivation.response().should.have.jsonLike({"result_status": "Successfully activated voucher"});
});

// Scenario: The user is not able to activate a pre-activated voucher because of an empty payload
When(
  'The user triggers an action with an empty payload to activate a pre-activated voucher',
  () => {
    specVoucherActivation
      .patch(baseUrl)
      .withBody();
  }
);

Then('The result of the operation returns an error because of empty payload', async () => {
  await specVoucherActivation.toss();
  specVoucherActivation.response().should.have.status(400);
  specVoucherActivation.response().should.have.body({"message": "Invalid request"});
});


// Scenario: The user is not able to activate a pre-activated voucher because of an invalid voucher serial number
When(
  'The user triggers an action with an invalid serial number to activate a pre-activated voucher', () => {
    specVoucherActivation
    .patch(baseUrl)
    .withBody(invalidSerialNumberBodyValue);
  }
);
  
Then('The result of the operation returns an error because of an invalid serial number', async () => {
  await specVoucherActivation.toss();
  specVoucherActivation.response().should.have.status(456);
  specVoucherActivation.response().should.have.body({"message": "Invalid voucher serial number"});
});

// Scenario: The user is not able to activate a pre-activated voucher because of an invalid Gov Stack Building Block
When(
    'The user triggers an action with an invalid Gov Stack Building Block to activate a pre-activated voucher', () => {
      specVoucherActivation
      .patch(baseUrl)
      .withBody(invalidGovStackBBBodyValue);
  }
);
    
Then('The result of the operation returns an error because of an invalid Gov Stack Building Block', async () => {
  await specVoucherActivation.toss();
  specVoucherActivation.response().should.have.status(460);
  specVoucherActivation.response().should.have.body({"message": "Invalid Gov Stack Building Block"});
});

After(() => {
    specVoucherActivation.end();
});
