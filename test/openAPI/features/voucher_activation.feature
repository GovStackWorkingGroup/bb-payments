@method=PATCH @endpoint=/vouchers/voucher_activation
Feature: The VoucherActivation API is used to activate a pre-activated voucher
  The VoucherActivation API is used by a non Payment Building Blocks in the GovStack Framework to activate a pre-activated voucher.
  This is second function call is intended to ensure that the voucher is only activated when it is disbursed.
  This API requests for the activation of a voucher when the caller sends the voucher number to be activated.
  If the API call is successful, the activation is confirmed and the voucher can now be used by the beneficiary.    

  @smoke @positive
  Scenario: Successfully activates a pre-activated voucher smoke type test
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with valid payload where voucher_serial_number = 5555
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 200
    And The /vouchers/voucher_activation endpoint response should match json schema

  @positive
  Scenario: Successfully activates a pre-activated voucher with the optional X-Callback-URL header
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with valid payload where voucher_serial_number = 5556
    And Provides optional X-Callback-URL header
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 200
    And The /vouchers/voucher_activation endpoint response should match json schema

  @positive
  Scenario: Successfully activates a pre-activated voucher with the optional X-Channel header
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with valid payload where voucher_serial_number = 5557
    And Provides optional X-Channel header
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 200
    And The /vouchers/voucher_activation endpoint response should match json schema

  @positive
  Scenario: Successfully activates a pre-activated voucher with the optional X-Date header
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with valid payload where voucher_serial_number = 5558
    And Provides optional X-Date header
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 200
    And The /vouchers/voucher_activation endpoint response should match json schema

  @positive
  Scenario: Successfully activates a pre-activated voucher with the optional X-CorrelationID header
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with valid payload where voucher_serial_number = 5559
    And Provides optional X-CorrelationID header
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 200
    And The /vouchers/voucher_activation endpoint response should match json schema

  @negative
  Scenario: Unable to activate a pre-activated voucher because of an empty payload
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request without payload
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 400
    And The /vouchers/voucher_activation endpoint response should match json error schema

  @negative
  Scenario: Unable to activate a pre-activated voucher because of an invalid voucher_serial_number
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with an invalid voucher_serial_number
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 456
    And The /vouchers/voucher_activation endpoint response should match json error schema

  @negative
  Scenario: Unable to activate a pre-activated voucher because given Gov_Stack_BB does not exist
    Given Non Payment Building Block wants to activate a pre-activated voucher
    When Sends PATCH /vouchers/voucher_activation request with an invalid Gov_Stack_BB and valid voucher_serial_number = 5560
    Then Receives a response from the /vouchers/voucher_activation endpoint
    And The /vouchers/voucher_activation endpoint response should be returned in a timely manner 15000ms
    And The /vouchers/voucher_activation endpoint response should have status 460
    And The /vouchers/voucher_activation endpoint response should match json error schema
