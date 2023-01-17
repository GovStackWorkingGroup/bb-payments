Feature: The VoucherStatus API is used to check the status of a voucher.
  The calling Building Block will capture the voucher numberand send it to the Payments Building Block to determine the status of a voucher.
  The Payments Building will respond with one of the status of Not Pre-Activated, Pre-Activated, Activated, Suspended, Blocked, Purged or Not Existing.

  Request endpoint: GET /vouchers/voucherstatuscheck/{voucherserialnumber}

  Scenario: The user successfully checks the status of a voucher
    Given The user wants to check the status of a voucher
    When The user triggers an action to check the status of a voucher
    Then The user successfully checks the status of a voucher

  Scenario: The user is not able to check the status of the voucher, because of the invalid voucher number
    Given The user wants to check the status of the voucher with the invalid voucher number
    When The user triggers an action to check the status of the voucher with the invalid voucher number
    Then The result of an operation returns an error, because of the invalid voucher number

  Scenario: The user is not able to check the status of the voucher, because of the already used voucher number
    Given The user wants to check the status of the voucher with the already used voucher number
    When The user triggers an action to check the status of the voucher with the already used voucher number
    Then The result of an operation returns an error, because of the already used voucher number

  Scenario: The user is not able to check the status of the expired voucher
    Given The user wants to check the status of the expired voucher
    When The user triggers an action to check the status of the expired voucher
    Then The result of an operation returns an error, because of the expired voucher

  Scenario: The user is not able to check the status of the voucher, because of the empty payload
    Given The user wants to check the status of the voucher with the empty payload
    When The user triggers an action to check the status of the voucher with the empty payload
    Then The result of an operation returns an error, because of the empty payload

  Scenario: The user is not able to check the status of the voucher, because the Gov Stack Building Block does not exist
    Given The user wants to check the status of the voucher with the not existing Gov Stack Building Block
    When The user triggers an action to check the status of the voucher with the not existing Gov Stack Building Block
    Then The result of an operation returns an error, because the Gov Stack Building Block does not exist
