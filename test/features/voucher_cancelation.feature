Feature: The VoucherCancelation API is used to cancel a voucher
  This operation cancels a specific voucher number.
  
  Request endpoint: PATCH /vouchers/voucherstatuscheck/{voucherserialnumber}

  Scenario: The user successfully cancels a voucher
    Given The user wants to cancel a voucher
    When The user triggers an action with a valid payload to cancel a voucher
    Then The user successfully cancels the voucher

  Scenario: The user is not able to cancel the voucher with invalid voucher details
    Given The user wants to cancel the voucher with invalid voucher details
    When The user triggers an action with invalid voucher details to cancel the voucher
    Then The result of an operation returns an error because of providing invalid voucher details

  Scenario: The user is not able to cancel the invalid voucher
    Given The user wants to cancel the invalid voucher
    When The user triggers an action with a valid payload to cancel the invalid voucher
    Then The result of an operation returns an error because of the invalid voucher

  Scenario: The user is not able to cancel the already canceled voucher
    Given The user wants to cancel the already canceled voucher
    When The user triggers an action with a valid payload to cancel the voucher that has already been canceled
    Then The result of an operation returns an error with Voucher already canceled message

  Scenario: The user is not able to cancel the voucher without providing the voucher details
    Given The user wants to cancel the voucher without providing the voucher details
    When The user triggers an action to cancel the voucher without providing the voucher details
    Then The result of an operation returns an error because of not providing the voucher details
