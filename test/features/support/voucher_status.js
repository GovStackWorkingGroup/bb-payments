const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let serialNumberParam;
let specVoucherStatus;

const baseUrl = `${localhost}vouchers/voucherstatuscheck/{voucherserialnumber}`;
const requestFunction = () =>
  specVoucherStatus.get(baseUrl).withPathParams('voucherserialnumber', serialNumberParam);

Before(() => {
  specVoucherStatus = pactum.spec();
});

// Scenario: The user successfully checks the status of a voucher
Given('The user wants to check the status of a voucher #1', () => {
  serialNumberParam = 'validNumber';
  return serialNumberParam;
});
        
When('The user triggers an action to check the status of a voucher', () => {
  requestFunction();
});
        
Then('The user successfully checks the status of a voucher', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(200);  
  specVoucherStatus.response().should.have.jsonLike({
    'voucher_status': 'Not Pre-Activated',
    'voucher_amount': 'string'
  });
});

// Scenario: The user is not able to check the status of a voucher because of an invalid voucher number
Given('The user wants to check the status of a voucher #2', () => {
  serialNumberParam = 'invalidNumber';
  return serialNumberParam;
});
      
When('The user triggers an action to check the status of a voucher with an invalid voucher number', () => {
  requestFunction();
});
      
Then('The result of an operation returns an error because of an invalid voucher number', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(456);
  specVoucherStatus.response().should.have.jsonLike({
    "message": "Invalid voucher number"
  });
});

// Scenario: The user is not able to check the status of a voucher because of an already used voucher number
Given('The user wants to check the status of a voucher #3', () => {
  serialNumberParam = 'alreadyUsed';
  return serialNumberParam;
});
    
When('The user triggers an action to check the status of a voucher with an already used voucher number', () => {
  requestFunction();
});
    
Then('The result of an operation returns an error because of an already used voucher number', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(458);
  specVoucherStatus.response().should.have.jsonLike({
    "message": "Voucher number already used"
  });
});

// Scenario: The user is not able to check the status of a voucher that has expired
Given('The user wants to check the status of a voucher #4', () => {
  serialNumberParam = 'expired';
  return serialNumberParam;
});
  
When('The user triggers an action to check the status of a voucher that has expired', () => {
  requestFunction();
});
  
Then('The result of an operation returns an error because of an expired voucher', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(459);
  specVoucherStatus.response().should.have.jsonLike({
    "message": "Voucher has expired"
  });
});

// Scenario: The user is not able to check the status of a voucher because of an empty payload
Given('The user wants to check the status of a voucher #5', () => {
  serialNumberParam = null;
  return serialNumberParam;
});

When('The user triggers an action to check the status of a voucher with an empty payload', () => {
  requestFunction();
});

Then('The result of an operation returns an error because of an empty payload', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(400);
  specVoucherStatus.response().should.have.jsonLike({
    "message": "Invalid request"
  });
});

// Scenario: The user is not able to check the status of a voucher because of Gov Stack Building Block does not exist
Given('The user wants to check the status of a voucher #6', () => {
  serialNumberParam = 'notExistingGovStackBB';
  return serialNumberParam;
});

When('The user triggers an action to check the status of a voucher with a not existing Gov Stack Building Block', () => {
  requestFunction();
});

Then('The result of an operation returns an error because of not existing Gov Stack Building Block', async () => {
  await specVoucherStatus.toss();
  specVoucherStatus.response().should.have.status(460);
  specVoucherStatus.response().should.have.jsonLike({
    'message': 'Gov Stack Building Block does not exist'
  });
});

After(() => {
  specVoucherStatus.end();
});
