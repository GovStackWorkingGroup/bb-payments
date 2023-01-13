const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherCancelation;
let serialNumberParam;

const baseUrl = `${localhost}vouchers/voucherstatuscheck/{voucherserialnumber}`;
const requestFunction = () =>
  specVoucherCancelation.patch(baseUrl).withBody({
    'voucherserialnumber': `${serialNumberParam}`,
    'Gov_Stack_BB': 'string'
  }).withPathParams('voucherserialnumber', serialNumberParam);

Before(() => {
  specVoucherCancelation = pactum.spec();
});

// Scenario: The user successfully cancels a voucher
Given('The user wants to cancel a voucher with voucher serial number 1234', () => {
  serialNumberParam = '1234';
  return serialNumberParam;
});

When('The user triggers an action with a valid payload to cancel a voucher', () => {
  requestFunction();
});

Then('The user successfully cancels the voucher', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(200);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Voucher cancelled'
  });
});

// Scenario: The user is not able to cancel a voucher with voucher serial number 4321
Given('The user wants to cancel a voucher with voucher serial number 4321', () => {
  serialNumberParam = '4321';
  return serialNumberParam;
});

When('The user triggers an action without payload to cancel a voucher', () => {
  specVoucherCancelation.patch(baseUrl).withBody()
    .withPathParams('voucherserialnumber', serialNumberParam);
});

Then('The result of an operation returns an error because of not providing request payload', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(400);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid request'
  });
});

// Scenario: The user is not able to cancel a voucher with voucher serial number 5432
Given('The user wants to cancel a voucher with voucher serial number 5432', () => {
  serialNumberParam = '5432';
  return serialNumberParam;
});

When('The user triggers an action with an invalid payload to cancel a voucher', () => {
  specVoucherCancelation.patch(baseUrl).withBody({
    'voucherserialnumber': ''
  }).withPathParams('voucherserialnumber', serialNumberParam);
});

Then('The result of an operation returns an error because of providing an invalid payload', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(400);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid request'
  });
});

// Scenario: The user is not able to cancel an invalid voucher with voucher serial number 3214
Given('The user wants to cancel a voucher with voucher serial number 3214', () => {
  serialNumberParam = '3214';
  return serialNumberParam;
});

When('The user triggers an action with a valid payload to cancel an invalid voucher', () => {
  requestFunction();
});

Then('The result of an operation returns an error because of an invalid voucher', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(463);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid voucher'
  });
});

// Scenario: The user is not able to cancel already canceled voucher with voucher serial number 2134
Given('The user wants to cancel a voucher with voucher serial number 2134', () => {
  serialNumberParam = '2134';
  return serialNumberParam;
});

When(
  'The user triggers an action with a valid payload to cancel a voucher that has already been canceled',
  () => {
    requestFunction();
  }
);

Then('The result of an operation returns an error with Voucher already canceled message', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(464);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Voucher is already cancelled'
  });
});

After(() => {
  specVoucherCancelation.end();
});
