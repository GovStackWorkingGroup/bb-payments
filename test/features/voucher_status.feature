Feature: The VoucherStatus API is used to check the status of a voucher.
  The calling Building Block will capture the voucher numberand send it to the Payments Building Block to determine the status of a voucher.
  The Payments Building will respond with one of the status of Pre-Activated, Activated, Suspended, Blocked or Not Existing.

  Request endpoint: GET /vouchers/voucherstatuscheck/{voucherserialnumber}

  Scenario: The user successfully checks the status of a voucher
    Given The user wants to check the status of a voucher #1
    When The user triggers an action to check the status of a voucher
    Then The user successfully checks the status of a voucher

  Scenario: The user is not able to check the status of a voucher because of an invalid voucher number
    Given The user wants to check the status of a voucher #2
    When The user triggers an action to check the status of a voucher with an invalid voucher number
    Then The result of an operation returns an error because of an invalid voucher number

  Scenario: The user is not able to check the status of a voucher because of an already used voucher number
    Given The user wants to check the status of a voucher #3
    When The user triggers an action to check the status of a voucher with an already used voucher number
    Then The result of an operation returns an error because of an already used voucher number

  Scenario: The user is not able to check the status of a voucher that has expired
    Given The user wants to check the status of a voucher #4
    When The user triggers an action to check the status of a voucher that has expired
    Then The result of an operation returns an error because of an expired voucher

  Scenario: The user is not able to check the status of a voucher because of an empty payload
    Given The user wants to check the status of a voucher #5
    When The user triggers an action to check the status of a voucher with an empty payload
    Then The result of an operation returns an error because of an empty payload

  Scenario: The user is not able to check the status of a voucher because of Gov Stack Building Block does not exist
    Given The user wants to check the status of a voucher #6
    When The user triggers an action to check the status of a voucher with a not existing Gov Stack Building Block
    Then The result of an operation returns an error because of not existing Gov Stack Building Block
