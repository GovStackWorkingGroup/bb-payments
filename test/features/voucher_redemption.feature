Feature: The VoucherRedemption API is used by a non Payment Building Blocks in the GovStack Framework to redeem a voucher.
  Request for voucher redemption by sending the voucher number, the merchant name and merchant payment details.
  
  Request endpoint: POST /vouchers/voucher_redemption

  Background:
    Given The user wants to redeem the voucher

  Scenario: The user successfully redeems the voucher
    When The user triggers an action to redeem the voucher
    Then The user successfully redeems the voucher

  Scenario: The user is not able to redeem the voucher, because the GovStack Building Block does not exist
    When The user triggers an action to redeem the voucher without an existing GovStack Building Block variable
    Then The result of an operation returns an error because the GovStack Building Block does not exist
  
  Scenario: The user is not able to redeem the voucher, because of an invalid voucher number
    When The user triggers an action to redeem the voucher with an invalid voucher number
    Then The result of an operation returns an error because of an invalid voucher number

  Scenario: The user is not able to redeem the voucher because of an invalid request
    When The user triggers an action to redeem the voucher with an invalid request
    Then The result of an operation returns an error because of an invalid request

  Scenario: The user is not able to redeem the voucher because of insufficient funds in funding a/c
    When The user triggers an action to redeem the voucher with insufficient funds in funding a/c
    Then The result of an operation returns an error, because of insufficient funds in funding a/c

  Scenario: The user is not able to redeem the voucher because the merchant cannot be credited
    When The user triggers an action to redeem the voucher with the merchant that cannot be credited
    Then The result of an operation returns an error because the merchant cannot be credited
