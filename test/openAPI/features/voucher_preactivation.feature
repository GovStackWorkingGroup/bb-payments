Feature: The VoucherPreactivation API is used to request for a pre-activated voucher to be used.
  This call reserves the voucher (for a period of time, which is to be implemented). 
  This API requests a single voucher from the voucher server that can be used for a future redemption process.
  
  Request endpoint: POST /vouchers/voucher_preactivation

  Scenario: The user successfully receives a pre-activated voucher
    Given The user wants to receives a pre-activated voucher #1
    When The user triggers an action to receive a pre-activated voucher
    Then The user successfully receives a pre-activated voucher

  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher amount
    Given The user wants to receives a pre-activated voucher #2
    When The user triggers an action to receive a pre-activated voucher with an invalid voucher amount
    Then The result of an operation returns an error because of an invalid voucher amount

  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher currency
    Given The user wants to receives a pre-activated voucher #3
    When The user triggers an action to receive a pre-activated voucher with an invalid voucher currency
    Then The result of an operation returns an error because of an invalid voucher currency

  Scenario: The user is not able to receives a pre-activated voucher because of an invalid voucher group
    Given The user wants to receives a pre-activated voucher #4
    When The user triggers an action to receive a pre-activated voucher with an invalid voucher group
    Then The result of an operation returns an error because of an invalid voucher group

  Scenario: The user is not able to receives a pre-activated voucher because of Gov Stack Building Block does not exist
    Given The user wants to receives a pre-activated voucher #5
    When The user triggers an action to receive a pre-activated voucher with an invalid Gov_Stack_BB
    Then The result of an operation returns an error because of Gov Stack Building Block does not exist

  Scenario: The user is not able to receives a pre-activated voucher because of an empty payload
    Given The user wants to receives a pre-activated voucher #6
    When The user triggers an action to receive a pre-activated voucher with an empty payload
    Then The result of an operation returns an error because of empty payload
