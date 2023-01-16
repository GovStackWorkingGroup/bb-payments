const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherCancelation;
let voucherSerialNumber;
let voucherCancelationBody = {
  voucherserialnumber: 'exampleVoucherSerialNumber',
  Gov_Stack_BB: 'Gov_Stack_BB',
};

const baseUrl = `${localhost}vouchers/voucherstatuscheck/{voucherserialnumber}`;
const requestFunction = () =>
  specVoucherCancelation
    .patch(baseUrl)
    .withBody(voucherCancelationBody)
    .withPathParams('voucherserialnumber', voucherSerialNumber);

Before(() => {
  specVoucherCancelation = pactum.spec();
});

// Scenario: The user successfully cancels a voucher
Given('The user wants to cancel a voucher', () => {
  voucherSerialNumber = '1234';
  voucherCancelationBody.voucherserialnumber = voucherSerialNumber;
  return voucherCancelationBody, voucherSerialNumber;
});

When(
  'The user triggers an action with a valid payload to cancel a voucher',
  () => {
    requestFunction();
  }
);

Then('The user successfully cancels the voucher', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(200);
  specVoucherCancelation.response().should.have.jsonLike({
    message: 'Voucher cancelled',
  });
});

// Scenario: The user is not able to cancel the voucher with invalid voucher details
Given(
  'The user wants to cancel the voucher with invalid voucher details',
  () => {
    voucherSerialNumber = '5432';
    voucherCancelationBody.voucherserialnumber = '';
    return voucherCancelationBody, voucherSerialNumber;
  }
);

When(
  'The user triggers an action with invalid voucher details to cancel the voucher',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of providing invalid voucher details',
  async () => {
    await specVoucherCancelation.toss();
    specVoucherCancelation.response().should.have.status(400);
    specVoucherCancelation.response().should.have.jsonLike({
      message: 'Invalid request',
    });
  }
);

// Scenario: The user is not able to cancel the invalid voucher
Given('The user wants to cancel the invalid voucher', () => {
  voucherSerialNumber = '3214';
  voucherCancelationBody.voucherserialnumber = voucherSerialNumber;
  return voucherCancelationBody, voucherSerialNumber;
});

When(
  'The user triggers an action with a valid payload to cancel the invalid voucher',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of the invalid voucher',
  async () => {
    await specVoucherCancelation.toss();
    specVoucherCancelation.response().should.have.status(463);
    specVoucherCancelation.response().should.have.jsonLike({
      message: 'Invalid voucher',
    });
  }
);

// Scenario: The user is not able to cancel the already canceled voucher
Given('The user wants to cancel the already canceled voucher', () => {
  voucherSerialNumber = '2134';
  voucherCancelationBody.voucherserialnumber = voucherSerialNumber;
  return voucherCancelationBody, voucherSerialNumber;
});

When(
  'The user triggers an action with a valid payload to cancel the voucher that has already been canceled',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error with Voucher already canceled message',
  async () => {
    await specVoucherCancelation.toss();
    specVoucherCancelation.response().should.have.status(464);
    specVoucherCancelation.response().should.have.jsonLike({
      message: 'Voucher is already cancelled',
    });
  }
);

// Scenario: The user is not able to cancel the voucher without providing the voucher details
Given(
  'The user wants to cancel the voucher without providing the voucher details',
  () => {
    voucherSerialNumber = '4321';
    voucherCancelationBody = null;
    return voucherCancelationBody, voucherSerialNumber;
  }
);

When(
  'The user triggers an action to cancel the voucher without providing the voucher details',
  () => {
    requestFunction();
  }
);

Then(
  'The result of an operation returns an error because of not providing the voucher details',
  async () => {
    await specVoucherCancelation.toss();
    specVoucherCancelation.response().should.have.status(400);
    specVoucherCancelation.response().should.have.jsonLike({
      message: 'Invalid request',
    });
  }
);

After(() => {
  specVoucherCancelation.end();
});
