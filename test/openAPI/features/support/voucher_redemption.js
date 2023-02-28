const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { localhost } = require('./helpers/helpers');

let specVoucherRedemption;
let validVoucherNumber;
let validGovstackBB;
let validMerchantName;
let validMerchantBankDetails;
let validMerchantVoucherGroup;
let override;

const baseUrl = `${localhost}vouchers/voucher_redemption`;

Before(() => {
  specVoucherRedemption = pactum.spec();
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

// Scenario: The user successfully redeems the voucher
When('The user triggers an action to redeem the voucher', () => {
  specVoucherRedemption.post(baseUrl).withBody({
    voucher_number: validVoucherNumber,
    Gov_Stack_BB: validGovstackBB,
    merchant_name: validMerchantName,
    merchant_bank_details: validMerchantBankDetails,
    merchant_voucher_group: validMerchantVoucherGroup,
    override: override,
  });
});

Then('The user successfully redeems the voucher', async () => {
  await specVoucherRedemption.toss();
  specVoucherRedemption.response().should.have.status(200);
  specVoucherRedemption.response().should.have.jsonLike({
    result_status: 'Voucher is successfully redeemed',
  });
});

// Scenario: The user is not able to redeem the voucher, because of the GovStack Building Block does not exist
When(
  'The user triggers an action to redeem the voucher without an existing GovStack Building Block variable',
  () => {
    specVoucherRedemption.post(baseUrl).withBody({
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
  'The result of an operation returns an error because the GovStack Building Block does not exist',
  async () => {
    await specVoucherRedemption.toss();
    specVoucherRedemption.response().should.have.status(460);
    specVoucherRedemption.response().should.have.jsonLike({
      message: 'GovStack Building Block does not exist',
    });
  }
);

// Scenario: The user is not able to redeem the voucher, because of an invalid voucher number
When(
  'The user triggers an action to redeem the voucher with an invalid voucher number',
  () => {
    specVoucherRedemption.post(baseUrl).withBody({
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
  'The result of an operation returns an error because of an invalid voucher number',
  async () => {
    await specVoucherRedemption.toss();
    specVoucherRedemption.response().should.have.status(461);
    specVoucherRedemption.response().should.have.jsonLike({
      message: 'Invalid voucher number',
    });
  }
);

// Scenario: The user is not able to redeem the voucher because of an invalid request
When(
  'The user triggers an action to redeem the voucher with an invalid request',
  () => {
    specVoucherRedemption.post(baseUrl).withBody();
  }
);

Then(
  'The result of an operation returns an error because of an invalid request',
  async () => {
    await specVoucherRedemption.toss();
    specVoucherRedemption.response().should.have.status(400);
    specVoucherRedemption.response().should.have.jsonLike({
      message: 'Invalid request',
    });
  }
);

// Scenario: The user is not able to redeem the voucher because of insufficient funds in funding a/c
When(
  'The user triggers an action to redeem the voucher with insufficient funds in funding a\\/c',
  () => {
    specVoucherRedemption.post(baseUrl).withBody({
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
  'The result of an operation returns an error, because of insufficient funds in funding a\\/c',
  async () => {
    await specVoucherRedemption.toss();
    specVoucherRedemption.response().should.have.status(462);
    specVoucherRedemption.response().should.have.jsonLike({
      message: 'Insufficient funds in funding a/c',
    });
  }
);

// Scenario: The user is not able to redeem the voucher because the merchant cannot be credited
When(
  'The user triggers an action to redeem the voucher with the merchant that cannot be credited',
  () => {
    specVoucherRedemption.post(baseUrl).withBody({
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
  'The result of an operation returns an error because the merchant cannot be credited',
  async () => {
    await specVoucherRedemption.toss();
    specVoucherRedemption.response().should.have.status(463);
    specVoucherRedemption.response().should.have.jsonLike({
      message: 'Cannot credit merchant',
    });
  }
);

After(() => {
  specVoucherRedemption.end();
});
