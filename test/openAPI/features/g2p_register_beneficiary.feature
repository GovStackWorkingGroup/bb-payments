@method=POST @endpoint=/register-beneficiary
Feature: Register beneficiary

The Register Beneficiary API is invoked by the Information Mediator BB, 
which is triggered when the Registration BB is registering beneficiaries into the Payments BB's ID Mapper.

    @smoke @unit @positive
    Scenario: Succesfully registered a beneficiary smoke type test
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "4a0425ef-008" as RequestID, "11668d2a-a8f" as SourceBBID and "2ba5ed20-0f42-4eff-8" as PayeeFunctionalID is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 200
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema

    @unit @positive
    Scenario: Succesfully registered a beneficiary using not obligatory fields in the request payload
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "90566839-ad0" as RequestID, "9d9b39d4-9a0" as SourceBBID, "2d042389-6410-4ec7-8" as PayeeFunctionalID, "01" as PaymentModality and "LI4808800751423444466" as FinancialAddress is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 200
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema
        And The /register-beneficiary response ResponseCode field should be "00"
        And The /register-beneficiary response RequestID field should be "90566839-ad0"
        And The /register-beneficiary response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to register a beneficiary because of missing required SourceBBID in the payload
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "4a0425ef-008" as RequestID and "2ba5ed20-0f42-4eff-8" as PayeeFunctionalID is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 400
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema
        And The /register-beneficiary response ResponseCode field should be "01"
        And The /register-beneficiary response RequestID field should be "4a0425ef-008"
        And The /register-beneficiary response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to register a beneficiary because of missing required PayeeFunctionalID in the payload
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "4a0425ef-008" as RequestID and "11668d2a-a8f" as SourceBBID is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 400
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema
        And The /register-beneficiary response ResponseCode field should be "01"
        And The /register-beneficiary response RequestID field should be "4a0425ef-008"
        And The /register-beneficiary response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to register a beneficiary because of invalid SourceBBID value in the payload
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "4a0425ef-008" as RequestID, "invalid" as SourceBBID and "2ba5ed20-0f42-4eff-8" as PayeeFunctionalID is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 400
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema
        And The /register-beneficiary response ResponseCode field should be "01"
        And The /register-beneficiary response RequestID field should be "4a0425ef-008"
        And The /register-beneficiary response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to register a beneficiary because of invalid PayeeFunctionalID value in the payload
        Given Information Mediator BB wants to register a beneficiary
        When POST request to register a beneficiary with given "4a0425ef-008" as RequestID, "11668d2a-a8f" as SourceBBID and "invalid" as PayeeFunctionalID is sent
        Then The response from the /register-beneficiary is received
        And The /register-beneficiary response should be returned in a timely manner 15000ms
        And The /register-beneficiary response should have status 400
        And The /register-beneficiary response should have "content-type": "application/json" header
        And The /register-beneficiary response should match json schema
        And The /register-beneficiary response ResponseCode field should be "01"
        And The /register-beneficiary response RequestID field should be "4a0425ef-008"
        And The /register-beneficiary response should have a "ResponseDescription" property
