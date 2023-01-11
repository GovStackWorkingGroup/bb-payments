Feature: The VoucherCancelation API is used to cancel a voucher
  This operation cancels a specific voucher number.
  
  Request endpoint: PATCH /vouchers/voucherstatuscheck/{voucherserialnumber}

  Scenario: The user successfully cancels a voucher
    Given The user wants to cancel a voucher with voucher serial number 1234
    When The user triggers an action with a valid payload to cancel a voucher
    Then The user successfully cancels the voucher

  Scenario: The user is not able to cancel a voucher with voucher serial number 4321
    Given The user wants to cancel a voucher with voucher serial number 4321
    When The user triggers an action without payload to cancel a voucher
    Then The result of an operation returns an error because of not providing request payload

  Scenario: The user is not able to cancel a voucher with voucher serial number 5432
    Given The user wants to cancel a voucher with voucher serial number 5432
    When The user triggers an action with an invalid payload to cancel a voucher
    Then The result of an operation returns an error because of providing an invalid payload

  Scenario: The user is not able to cancel an invalid voucher with voucher serial number 3214
    Given The user wants to cancel a voucher with voucher serial number 3214
    When The user triggers an action with a valid payload to cancel an invalid voucher
    Then The result of an operation returns an error because of an invalid voucher

  Scenario: The user is not able to cancel already canceled voucher with voucher serial number 2134
    Given The user wants to cancel a voucher with voucher serial number 2134
    When The user triggers an action with a valid payload to cancel a voucher that has already been canceled
    Then The result of an operation returns an error with Voucher already canceled message
