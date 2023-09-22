@method=GET @endpoint=/vouchers/voucherstatuscheck/{voucherserialnumber}
Feature: The VoucherStatus API is used to check the status of a voucher
  Check the status of the Voucher. The API will respond with Not Preactivated, Preactivated, Activated, Active, Consumed, Blocked, Suspended and Purged.

  @smoke @positive
  Scenario: Successfully checks the status of a voucher smoke type test
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "5555" is sent
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 200
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json schema

  @positive
  Scenario: Successfully checks the status of a voucher with the optional X-Callback-URL header
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "5556" is sent
    And The request contains optional X-Callback-URL header
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 200
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json schema

  @positive
  Scenario: Successfully checks the status of a voucher with the optional X-Channel header
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "5557" is sent
    And The request contains optional X-Channel header
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 200
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json schema

  @positive
  Scenario: Successfully checks the status of a voucher with the optional X-Date header
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "5558" is sent
    And The request contains optional X-Date header
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 200
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json schema

  @positive
  Scenario: Successfully checks the status of a voucher with the optional X-CorrelationID header
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "5559" is sent
    And The request contains optional X-CorrelationID header
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 200
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json schema

  @negative
  Scenario: Unable to check the status of a voucher because of the invalid request
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher is sent with invalid characters as "{}"
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 400
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json error schema
    And The /voucherstatuscheck response should have a "message" property

  @negative
  Scenario: Unable to check the status of a voucher because of the invalid voucher number
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "notAnumber" is sent
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 456
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json error schema
    And The /voucherstatuscheck response should have a "message" property

  @negative
  Scenario: Unable to check the status of a voucher because the voucher number was already used
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "6001" is sent
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 458
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json error schema
    And The /voucherstatuscheck response should have a "message" property

  @negative
  Scenario: Unable to check the status of a voucher, because the voucher has expired
    Given Wants to check the status of a voucher
    When GET request to check the status of the voucher with voucherserialnumer = "6002" is sent
    Then Receives a response from the /voucherstatuscheck endpoint
    And The /voucherstatuscheck response should be returned in a timely manner 15000ms
    And The /voucherstatuscheck response should have status 459
    And The /voucherstatuscheck response should have "content-type": "application/json" header
    And The /voucherstatuscheck response should match json error schema
    And The /voucherstatuscheck response should have a "message" property
