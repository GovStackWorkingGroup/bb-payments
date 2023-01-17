const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherStatus;
let voucherSerialNumber;

const baseUrl = `${localhost}vouchers/voucherstatuscheck/{voucherserialnumber}`;
const requestFunction = () =>
  specVoucherStatus
    .get(baseUrl)
    .withPathParams('voucherserialnumber', voucherSerialNumber);

Before(() => {
  specVoucherStatus = pactum.spec();
});

// Scenario: The user successfully checks the status of a voucher
Given('The user wants to check the status of a voucher', () => {
  voucherSerialNumber = 'validNumber';
  return voucherSerialNumber;
});

When('The user triggers an action to check the status of a voucher', () => {
  requestFunction();
});

Then('The user successfully checks the status of a voucher', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(200);
  specVoucherStatus.response().should.have.jsonLike({
    voucher_status: 'Not Pre-Activated',
    voucher_amount: 'string',
  });
});

// Scenario: The user is not able to check the status of the voucher, because of the invalid voucher number
Given(
  'The user wants to check the status of the voucher with the invalid voucher number',
  () => {
    voucherSerialNumber = 'invalidNumber';
    return voucherSerialNumber;
  }
);

When(
  'The user triggers an action to check the status of the voucher with the invalid voucher number',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error, because of the invalid voucher number',
  async () => {
    await specVoucherStatus.toss();
    specVoucherStatus.response().should.have.status(456);
    specVoucherStatus.response().should.have.jsonLike({
      message: 'Invalid voucher number',
    });
  }
);

// Scenario: The user is not able to check the status of the voucher, because of the already used voucher number
Given(
  'The user wants to check the status of the voucher with the already used voucher number',
  () => {
    voucherSerialNumber = 'alreadyUsed';
    return voucherSerialNumber;
  }
);

When(
  'The user triggers an action to check the status of the voucher with the already used voucher number',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error, because of the already used voucher number',
  async () => {
    await specVoucherStatus.toss();
    specVoucherStatus.response().should.have.status(458);
    specVoucherStatus.response().should.have.jsonLike({
      message: 'Voucher number already used',
    });
  }
);

// Scenario: The user is not able to check the status of the expired voucher
Given('The user wants to check the status of the expired voucher', () => {
  voucherSerialNumber = 'expired';
  return voucherSerialNumber;
});

When(
  'The user triggers an action to check the status of the expired voucher',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error, because of the expired voucher',
  async () => {
    await specVoucherStatus.toss();
    specVoucherStatus.response().should.have.status(459);
    specVoucherStatus.response().should.have.jsonLike({
      message: 'Voucher has expired',
    });
  }
);

// Scenario: The user is not able to check the status of the voucher, because of the empty payload
Given(
  'The user wants to check the status of the voucher with the empty payload',
  () => {
    voucherSerialNumber = null;
    return voucherSerialNumber;
  }
);

When(
  'The user triggers an action to check the status of the voucher with the empty payload',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error, because of the empty payload',
  async () => {
    await specVoucherStatus.toss();
    specVoucherStatus.response().should.have.status(400);
    specVoucherStatus.response().should.have.jsonLike({
      message: 'Invalid request',
    });
  }
);

// Scenario: The user is not able to check the status of the voucher, because the Gov Stack Building Block does not exist
Given(
  'The user wants to check the status of the voucher with the not existing Gov Stack Building Block',
  () => {
    voucherSerialNumber = 'notExistingGovStackBB';
    return voucherSerialNumber;
  }
);

When(
  'The user triggers an action to check the status of the voucher with the not existing Gov Stack Building Block',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error, because the Gov Stack Building Block does not exist',
  async () => {
    await specVoucherStatus.toss();
    specVoucherStatus.response().should.have.status(460);
    specVoucherStatus.response().should.have.jsonLike({
      message: 'Gov Stack Building Block does not exist',
    });
  }
);

After(() => {
  specVoucherStatus.end();
});
