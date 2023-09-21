@method=PATCH @endpoint=/vouchers/voucherstatuscheck/{voucherserialnumber}
Feature: The VoucherCancelation API is used to cancel a voucher
  
  This operation cancels a specific voucher number
  
  @smoke @positive
  Scenario: A non Payment Building Block successfully cancels a voucher smoke type test
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher with serial number = "60000" is sent
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 200
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher that has already been canceled
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher with serial number = "60001" is sent
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should have status 200
    When A PATCH request to cancel the same voucher is sent second time
    Then The response from re-cancellation is received
    And The response from re-cancellation should be returned in a timely manner 15000 ms
    And The response from re-cancellation should have status 464
    And The response from re-cancellation should match json schema
    And The voucher re-cancellation response should have "content-type": "application/json" header
    And The voucher re-cancellation response should have a "message" property

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher due to providing invalid voucher serial number in the payload
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher with invalid serial number = "invalid_serial_number" is sent
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 463
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header
    And The voucher cancelation response should have a "message" property

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher due to providing invalid Gov Stack Building Block in the payload
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher with invalid Gov Stack Building Block = "invalid_bb" is sent
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 463
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header
    And The voucher cancelation response should have a "message" property

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher due to missing required voucher serial number in the payload
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher is sent with missing voucher serial number in the payload
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 400
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header
    And The voucher cancelation response should have a "message" property

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher due to missing required Gov Stack Building Block in the payload
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher is sent with missing Gov Stack Building Block in the payload
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 400
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header
    And The voucher cancelation response should have a "message" property

  @negative
  Scenario: A non Payment Building Block is unable to cancel a voucher due to missing payload in the request
    Given A non Payment Building Block wants to cancel a voucher
    When A PATCH request to cancel the voucher is sent without payload
    Then The response from the voucher cancelation endpoint is received
    And The voucher cancelation response should be returned in a timely manner 15000 ms
    And The voucher cancelation response should have status 400
    And The voucher cancelation response should match json schema
    And The voucher cancelation response should have "content-type": "application/json" header
    And The voucher cancelation response should have a "message" property
