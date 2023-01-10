Feature: The VoucherPreactivation API is used to cancel a voucher
  This operation cancels a specific voucher number.
  
  Request endpoint: PATCH /vouchers/voucherstatuscheck/{voucherserialnumber}

  Scenario: The user successfully cancels a voucher #1
    Given The user wants to cancel a voucher #1
    When The user triggers an action with a valid payload to cancel a voucher #1
    Then The user successfully cancels the voucher #1

  Scenario: The user is not able to cancel a voucher #2
    Given The user wants to cancel a voucher #2
    When The user triggers an action without payload to cancel a voucher #2
    Then The result of an operation returns an error with Invalid request message #2

  Scenario: The user is not able to cancel a voucher #2.1
    Given The user wants to cancel a voucher #2.1
    When The user triggers an action with an invalid payload to cancel a voucher #2.1
    Then The result of an operation returns an error with Invalid request message #2.1

  Scenario: The user is not able to cancel an invalid voucher #3
    Given The user wants to cancel a voucher #3
    When The user triggers an action with a valid payload to cancel an invalid voucher #3
    Then The result of an operation returns an error with Invalid voucher message #3

  Scenario: The user is not able to cancel already canceled voucher #4
    Given The user wants to cancel a voucher #4
    When The user triggers an action with a valid payload to cancel a voucher that has already been canceled #4
    Then The result of an operation returns an error with Voucher already canceled message #4
