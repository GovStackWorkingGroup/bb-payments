@method=POST @endpoint=/vouchers/voucher_redemption
Feature: The VoucherRedemption API is used by a non Payment Building Blocks in the GovStack Framework to redeem a voucher.
  Request for voucher redemption by sending the voucher number, the merchant name and merchant payment details.

  @smoke @postitive
  Scenario: A non-Payment Building Block successfully redeems a voucher smoke type test
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request to redeem a voucher with 6004 as voucher_number, "bb-digital-registries" as Gov_Stack_BB, "Melissa Stephenson" as merchant_name, "Citizen Service Banks" as merchant_bank_details, "Payment Voucher" as merchant_voucher_group, true as override 
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 200
    And The /vouchers/voucher_redemption endpoint response should match json schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header

  @negative
  Scenario: A non-Payment Building Block is unable to redeem a voucher because of the invalid request
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request without payload to redeem a voucher
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 400
    And The /vouchers/voucher_redemption endpoint response should match json error schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header
    And The /vouchers/voucher_redemption response should have a "message" property

  @negative
  Scenario: A non-Payment Building Block is unable to redeem a voucher because the GovStack Building Block does not exist
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request with invalid Gov_Stack_BB, 6004 as voucher_number, "Melissa Stephenson" as merchant_name, "Citizen Service Banks" as merchant_bank_details, "Payment Voucher" as merchant_voucher_group, true as override in the payload to redeem a voucher
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 460
    And The /vouchers/voucher_redemption endpoint response should match json error schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header
    And The /vouchers/voucher_redemption response should have a "message" property
  
  @negative
  Scenario: A non-Payment Building Block is unable to redeem a voucher because of the invalid voucher number
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request with invalid voucher_number, "bb-digital-registries" as Gov_Stack_BB, "Melissa Stephenson" as merchant_name, "Citizen Service Banks" as merchant_bank_details, "Payment Voucher" as merchant_voucher_group, true as override in the payload to redeem a voucher
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 461
    And The /vouchers/voucher_redemption endpoint response should match json error schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header
    And The /vouchers/voucher_redemption response should have a "message" property

  @negative
  Scenario: A non-Payment Building Block is unable to redeem a voucher because of insufficient funds in funding a/c
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request to redeem a voucher with insufficient funds in funding a/c, 6004 as voucher_number, "bb-digital-registries" as Gov_Stack_BB, "Ronan Oliver" as merchant_name, "Vigor Bank Group" as merchant_bank_details, true as override
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 462
    And The /vouchers/voucher_redemption endpoint response should match json error schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header
    And The /vouchers/voucher_redemption response should have a "message" property

  @negative
  Scenario: A non-Payment Building Block is unable to redeem a voucher because the merchant cannot be credited
    Given A non-Payment Building Block wants to redeem a voucher
    When Sends POST request to redeem a voucher with merchant that cannot be credited, 6004 as voucher_number, "bb-digital-registries" as Gov_Stack_BB, true as override
    Then Receives a response from the /vouchers/voucher_redemption endpoint
    And The /vouchers/voucher_redemption endpoint response should be returned in a timely manner 15000 ms
    And The /vouchers/voucher_redemption endpoint response should have status 463
    And The /vouchers/voucher_redemption endpoint response should match json error schema
    And The /vouchers/voucher_redemption response should have "content-type": "application/json" header
    And The /vouchers/voucher_redemption response should have a "message" property
