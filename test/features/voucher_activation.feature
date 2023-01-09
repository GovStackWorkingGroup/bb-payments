Feature: The VoucherActivation API is used to activate a pre-activated voucher
  This API requests for voucher activation by sending the voucher serial number and Gov Stack BB

  Request endpoint: PATCH /vouchers/voucher_activation

  Background: The user wants to activate pre-activated voucher
    Given The user wants to activate pre-activated voucher

  Scenario: The user successfully activates a pre-activated voucher
    When The user triggers an action with a valid payload to activate a pre-activated voucher
    Then The user successfully activates a pre-activated voucher

  Scenario: The user is not able to activate a pre-activated voucher because of an empty payload
    When The user triggers an action with an empty payload to activate a pre-activated voucher
    Then The result of the operation returns an error because of empty payload

  Scenario: The user is not able to activate a pre-activated voucher because of an invalid voucher serial number
    When The user triggers an action with an invalid serial number to activate a pre-activated voucher
    Then The result of the operation returns an error because of an invalid serial number

  Scenario: The user is not able to activate a pre-activated voucher because of Gov Stack Building Block does not exist
    When The user triggers an action with an invalid Gov Stack Building Block to activate a pre-activated voucher
    Then The result of the operation returns an error because of Gov Stack Building Block does not exist
