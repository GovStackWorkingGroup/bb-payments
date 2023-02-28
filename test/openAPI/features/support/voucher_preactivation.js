const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let voucherVariables;
let specVoucherPreactivation;

const baseUrl = `${localhost}vouchers/voucher_preactivation`;
const requestFunction = () =>
  specVoucherPreactivation.post(baseUrl).withBody(voucherVariables);

Before(() => {
  specVoucherPreactivation = pactum.spec();
});

// Scenario: The user successfully receives a pre-activated voucher
Given('The user wants to receives a pre-activated voucher #1', () => {
  voucherVariables = {
    voucher_amount: '15.21',
    voucher_currency: 'AED',
    voucher_group: 'string',
    Gov_Stack_BB: 'Gov_Stack_BB',
    voucher_comment: 'string',
  };
  return voucherVariables;
});

When('The user triggers an action to receive a pre-activated voucher', () => {
  requestFunction();
});

Then('The user successfully receives a pre-activated voucher', async () => {
  await specVoucherPreactivation.toss();
  specVoucherPreactivation.response().should.have.status(200);
  specVoucherPreactivation.response().should.have.jsonLike({
    voucher_number: 'stringstringstri',
    voucher_serial_number: 'stringstringstri',
    expiry_date_time: '2023-01-04T16:01:00.619Z',
  });
});

// Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher amount
Given('The user wants to receives a pre-activated voucher #2', () => {
  voucherVariables = {
    voucher_amount: null,
    voucher_currency: 'AED',
    voucher_group: 'string',
    Gov_Stack_BB: 'Gov_Stack_BB',
    voucher_comment: 'string',
  };
  return voucherVariables;
});

When(
  'The user triggers an action to receive a pre-activated voucher with an invalid voucher amount',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of an invalid voucher amount',
  async () => {
    await specVoucherPreactivation.toss();
    specVoucherPreactivation.response().should.have.status(452);
    specVoucherPreactivation
      .response()
      .should.have.body('{\n  "Invalid payload, voucher_amount is invalid"\n}');
  }
);

// Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher currency
Given('The user wants to receives a pre-activated voucher #3', () => {
  voucherVariables = {
    voucher_amount: '15.21',
    voucher_currency: 'eur',
    voucher_group: 'string',
    Gov_Stack_BB: 'Gov_Stack_BB',
    voucher_comment: 'string',
  };
  return voucherVariables;
});

When(
  'The user triggers an action to receive a pre-activated voucher with an invalid voucher currency',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of an invalid voucher currency',
  async () => {
    await specVoucherPreactivation.toss();
    specVoucherPreactivation.response().should.have.status(453);
    specVoucherPreactivation
      .response()
      .should.have.body(
        '{\n  "Invalid payload, voucher_currency is invalid"\n}'
      );
  }
);

// Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher group
Given('The user wants to receives a pre-activated voucher #4', () => {
  voucherVariables = {
    voucher_amount: '15.21',
    voucher_currency: 'EUR',
    voucher_group: null,
    Gov_Stack_BB: 'Gov_Stack_BB',
    voucher_comment: 'string',
  };
  return voucherVariables;
});

When(
  'The user triggers an action to receive a pre-activated voucher with an invalid voucher group',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of an invalid voucher group',
  async () => {
    await specVoucherPreactivation.toss();
    specVoucherPreactivation.response().should.have.status(454);
    specVoucherPreactivation
      .response()
      .should.have.body('{\n  "Invalid payload, voucher_group is invalid"\n}');
  }
);

// Scenario: The user is not able to receives a pre-activated voucher because of Gov Stack Building Block does not exist
Given('The user wants to receives a pre-activated voucher #5', () => {
  voucherVariables = {
    voucher_amount: '15.21',
    voucher_currency: 'EUR',
    voucher_group: 'string',
    Gov_Stack_BB: 'string',
    voucher_comment: 'string',
  };
  return voucherVariables;
});

When(
  'The user triggers an action to receive a pre-activated voucher with an invalid Gov_Stack_BB',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of Gov Stack Building Block does not exist',
  async () => {
    await specVoucherPreactivation.toss();
    specVoucherPreactivation.response().should.have.status(460);
    specVoucherPreactivation
      .response()
      .should.have.body(
        '{\n  "Invalid payload, Gov Stack Building Block does not exist"\n}'
      );
  }
);

// Scenario: The user is not able to receives a pre-activated voucher because of an empty payload
Given('The user wants to receives a pre-activated voucher #6', () => {
  voucherVariables = null;
  return voucherVariables;
});

When(
  'The user triggers an action to receive a pre-activated voucher with an empty payload',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of empty payload',
  async () => {
    await specVoucherPreactivation.toss();
    specVoucherPreactivation.response().should.have.status(400);
    specVoucherPreactivation
      .response()
      .should.have.body('{\n  "Invalid request - body can not be empty"\n}');
  }
);

After(() => {
  specVoucherPreactivation.end();
});
