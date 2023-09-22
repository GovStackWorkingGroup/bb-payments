@method=POST @endpoint=/vouchers/voucher_preactivation
Feature: The VoucherPreactivation API is used to request for a pre-activated voucher to be used.

  @smoke @positive
  Scenario: The user successfully receives a pre-activated voucher smoke type test
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation with required body with given "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 200
    And The /vouchers/voucher_preactivation endpoint response should match json schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header

  @positive
  Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Callback-URL header
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation with required body with given "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    And Send with optional X-Callback-URL header
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 200
    And The /vouchers/voucher_preactivation endpoint response should match json schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header

  @positive
  Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Channel header
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation with required body with given "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    And Send with optional X-Channel header
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 200
    And The /vouchers/voucher_preactivation endpoint response should match json schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header

  @positive
  Scenario: The user successfully receives a pre-activated voucher by providing the optional X-Date header
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation with required body with given "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    And Send with optional X-Date header
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 200
    And The /vouchers/voucher_preactivation endpoint response should match json schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header

  @positive
  Scenario: The user successfully receives a pre-activated voucher by providing the optional X-CorrelationID header
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation with required body with given "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    And Send with optional X-CorrelationID header
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 200
    And The /vouchers/voucher_preactivation endpoint response should match json schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header

  @negative
  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher amount
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation request with an invalid voucher amount and "AED" as voucher_currency, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 452
    And The /vouchers/voucher_preactivation endpoint response should match json error schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header
    And The /vouchers/voucher_preactivation response should have a "message" property

  @negative
  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher currency
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation request with an invalid voucher currency and "15.21" as voucher_amount, "string" as voucher_group, "Gov_Stack_BB" as Gov_Stack_BB
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 453
    And The /vouchers/voucher_preactivation endpoint response should match json error schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header
    And The /vouchers/voucher_preactivation response should have a "message" property

  @negative
  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher_group
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation request with an invalid voucher_group and "15.21" as voucher_amount, "AED" as voucher_currency, "Gov_Stack_BB" as Gov_Stack_BB
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 454
    And The /vouchers/voucher_preactivation endpoint response should match json error schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header
    And The /vouchers/voucher_preactivation response should have a "message" property

  @negative
  Scenario: The user is not able to receives a pre-activated voucher because of Gov Stack Building Block does not exist
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation request with an invalid Gov_Stack_BB and "15.21" as voucher_amount, "AED" as voucher_currency, "string" as voucher_group
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 460
    And The /vouchers/voucher_preactivation endpoint response should match json error schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header
    And The /vouchers/voucher_preactivation response should have a "message" property

  @negative
  Scenario: The user is not able to receives a pre-activated voucher because of an empty payload
    Given The user wants to receives a pre-activated voucher
    When Send POST /vouchers/voucher_preactivation request an empty payload
    Then Receive a response from the /vouchers/voucher_preactivation endpoint
    And The /vouchers/voucher_preactivation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_preactivation endpoint response should have status 400
    And The /vouchers/voucher_preactivation endpoint response should match json error schema
    And The /vouchers/voucher_preactivation response should have "content-type": "application/json" header
    And The /vouchers/voucher_preactivation response should have a "message" property
