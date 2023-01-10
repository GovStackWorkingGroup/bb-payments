const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherReedemption;
let validVoucherNumber;
let validGovstackBB;
let validMerchantName;
let validMerchantBankDetails;
let validMerchantVoucherGroup;
let override;

const baseUrl = `${localhost}vouchers/voucher_redeemption`;

Before(() => {
  specVoucherReedemption = pactum.spec();
});

// Background
Given('The user wants to redeem the voucher', () => {
  validVoucherNumber = 123456;
  validGovstackBB = 'Gov_Stack_BB';
  validMerchantName = 'Leonard Snow';
  validMerchantBankDetails = 'Bank Details';
  validMerchantVoucherGroup = 'Voucher group';
  override = true;
  return (
    validVoucherNumber,
    validGovstackBB,
    validMerchantName,
    validMerchantBankDetails,
    validMerchantVoucherGroup,
    override
  );
});

// Scenario: The user successfully redeemed the voucher
When('The user triggers an action to redeem the voucher', () => {
  specVoucherReedemption.post(baseUrl).withBody({
    voucher_number: validVoucherNumber,
    Gov_Stack_BB: validGovstackBB,
    merchant_name: validMerchantName,
    merchant_bank_details: validMerchantBankDetails,
    merchant_voucher_group: validMerchantVoucherGroup,
    override: override,
  });
});

Then('The user successfully redeemed the voucher', async () => {
  await specVoucherReedemption.toss();
  specVoucherReedemption.response().should.have.status(200);
  specVoucherReedemption.response().should.have.jsonLike({
    result_status: 'Voucher is successfully redeemed',
  });
});

// Scenario: The user is not able to redeemed the voucher, because of the GovStack Building Block does not exist
When(
  'The user triggers an action to redeem the voucher with a no existing GovStack Building Block variable',
  () => {
    specVoucherReedemption.post(baseUrl).withBody({
      voucher_number: validVoucherNumber,
      Gov_Stack_BB: 'Some',
      merchant_name: validMerchantName,
      merchant_bank_details: validMerchantBankDetails,
      merchant_voucher_group: validMerchantVoucherGroup,
      override: override,
    });
  }
);

Then(
  'The result of an operation returns an error, because the GovStack Building Block does not exist',
  async () => {
    await specVoucherReedemption.toss();
    specVoucherReedemption.response().should.have.status(460);
    specVoucherReedemption.response().should.have.jsonLike({
      message: 'GovStack Building Block does not exist',
    });
  }
);

// Scenario: The user is not able to redeemed the voucher, because of an invalid voucher number
When(
  'The user triggers an action to redeem the voucher with an invalid voucher number',
  () => {
    specVoucherReedemption.post(baseUrl).withBody({
      voucher_number: null,
      Gov_Stack_BB: validGovstackBB,
      merchant_name: validMerchantName,
      merchant_bank_details: validMerchantBankDetails,
      merchant_voucher_group: validMerchantVoucherGroup,
      override: override,
    });
  }
);

Then(
  'The result of an operation returns an error, because of an invalid voucher number',
  async () => {
    await specVoucherReedemption.toss();
    specVoucherReedemption.response().should.have.status(461);
    specVoucherReedemption.response().should.have.jsonLike({
      message: 'Invalid voucher number',
    });
  }
);

// Scenario: The user is not able to redeemed the voucher, because of an invalid request
When(
  'The user triggers an action to redeem the voucher with an invalid request',
  () => {
    specVoucherReedemption.post(baseUrl).withBody();
  }
);

Then(
  'The result of an operation returns an error, because of an invalid request',
  async () => {
    await specVoucherReedemption.toss();
    specVoucherReedemption.response().should.have.status(400);
    specVoucherReedemption.response().should.have.jsonLike({
      message: 'Invalid request',
    });
  }
);

// Scenario: The user is not able to redeemed the voucher, because of an insufficient funds in funding a/c
When(
  'The user triggers an action to redeem the voucher with an insufficient funds in funding a\\/c',
  () => {
    specVoucherReedemption.post(baseUrl).withBody({
      voucher_number: validVoucherNumber,
      Gov_Stack_BB: validGovstackBB,
      merchant_name: validMerchantName,
      merchant_bank_details: validMerchantBankDetails,
      merchant_voucher_group: 'insufficient funds',
      override: override,
    });
  }
);

Then(
  'The result of an operation returns an error, because of an insufficient funds in funding a\\/c',
  async () => {
    await specVoucherReedemption.toss();
    specVoucherReedemption.response().should.have.status(462);
    specVoucherReedemption.response().should.have.jsonLike({
      message: 'Insufficient funds in funding a/c',
    });
  }
);

// Scenario: The user is not able to redeemed the voucher, because of cannot credit the merchant
When(
  'The user triggers an action to redeem the voucher with cannot credit the merchant',
  () => {
    specVoucherReedemption.post(baseUrl).withBody({
      voucher_number: validVoucherNumber,
      Gov_Stack_BB: validGovstackBB,
      merchant_name: 'Some Name',
      merchant_bank_details: validMerchantBankDetails,
      merchant_voucher_group: validMerchantVoucherGroup,
      override: override,
    });
  }
);

Then(
  'The result of an operation returns an error, because of cannot credit the merchant',
  async () => {
    await specVoucherReedemption.toss();
    specVoucherReedemption.response().should.have.status(463);
    specVoucherReedemption.response().should.have.jsonLike({
      message: 'Cannot credit merchant',
    });
  }
);

After(() => {
  specVoucherReedemption.end();
});
