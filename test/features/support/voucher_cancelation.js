const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherCancelation;
let serialNumberParam;

const baseUrl = `${localhost}vouchers/voucherstatuscheck/{voucherserialnumber}`;
const requestFunction = () =>
  specVoucherCancelation.patch(baseUrl).withBody({
    'voucherserialnumber': 'string',
    'Gov_Stack_BB': 'string'
  }).withPathParams('voucherserialnumber', serialNumberParam);

Before(() => {
  specVoucherCancelation = pactum.spec();
});

// Scenario: The user successfully cancels a voucher #1
Given('The user wants to cancel a voucher #1', () => {
  serialNumberParam = '1234';
  return serialNumberParam;
});

When('The user triggers an action with a valid payload to cancel a voucher #1', () => {
  requestFunction();
});

Then('The user successfully cancels the voucher #1', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(200);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Voucher cancelled'
  });
});

// Scenario: The user is not able to cancel a voucher #2
Given('The user wants to cancel a voucher #2', () => {
  serialNumberParam = '4321';
  return serialNumberParam;
});
  
When('The user triggers an action without payload to cancel a voucher #2', () => {
  specVoucherCancelation.patch(baseUrl).withBody()
    .withPathParams('voucherserialnumber', serialNumberParam);
});
  
Then('The result of an operation returns an error with Invalid request message #2', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(400);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid request'
  });
});

// Scenario: The user is not able to cancel a voucher #2.1
Given('The user wants to cancel a voucher #2.1', () => {
  serialNumberParam = '4321';
  return serialNumberParam;
});
    
When('The user triggers an action with an invalid payload to cancel a voucher #2.1', () => {
  specVoucherCancelation.patch(baseUrl).withBody({
    'voucherserialnumber': ''
  }).withPathParams('voucherserialnumber', serialNumberParam);
});
    
Then('The result of an operation returns an error with Invalid request message #2.1', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(400);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid request'
  });
});

// Scenario: The user is not able to cancel an invalid voucher #3
Given('The user wants to cancel a voucher #3', () => {
  serialNumberParam = '3214';
  return serialNumberParam;
});

When('The user triggers an action with a valid payload to cancel an invalid voucher #3', () => {
  requestFunction();
});

Then('The result of an operation returns an error with Invalid voucher message #3', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(463);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Invalid voucher'
  });
});

// Scenario: The user is not able to cancel already canceled voucher #4
Given('The user wants to cancel a voucher #4', () => {
  serialNumberParam = '2134';
  return serialNumberParam;
});

When(
  'The user triggers an action with a valid payload to cancel a voucher that has already been canceled #4',
  () => {
    requestFunction();
  }
);

Then('The result of an operation returns an error with Voucher already canceled message #4', async () => {
  await specVoucherCancelation.toss();
  specVoucherCancelation.response().should.have.status(464);
  specVoucherCancelation.response().should.have.jsonLike({
    'message': 'Voucher is already cancelled'
  });
});

After(() => {
  specVoucherCancelation.end();
});
