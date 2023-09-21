@method=POST @endpoint=/update-beneficiary-details
Feature: Update beneficiary details

This is the API that is called by the Information Mediator BB when the Registration BB
in turn calls its API for registering beneficiaries into the ID Mapper of the Payments BB.

    @smoke @unit @positive
    Scenario: Succesfully updated beneficiary details smoke type test
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "c2b861bf-ef7" as RequestID, "049d8b3b-146" as SourceBBID and "1d591f0d-eff5-424d-b" as PayeeFunctionalID is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 200
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema

    @unit @positive
    Scenario: Succesfully updated beneficiary details using not obligatory fields in the request payload
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "29517635-b46" as RequestID, "d459eaab-ae1" as SourceBBID, "66d2b90f-b230-4882-a" as PayeeFunctionalID, "01" as PaymentModality and "CZ4150515873793513322865" as FinancialAddress is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 200
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema
        And The /update-beneficiary-details response ResponseCode field should be "00"
        And The /update-beneficiary-details response RequestID field should be "29517635-b46"
        And The /update-beneficiary-details response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to update beneficiary details because of missing required SourceBBID in the payload
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "e2d40d31-802" as RequestID and "569ae0c5-8880-4f6d-9" as PayeeFunctionalID is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 400
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema
        And The /update-beneficiary-details response ResponseCode field should be "01"
        And The /update-beneficiary-details response RequestID field should be "e2d40d31-802"
        And The /update-beneficiary-details response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to update beneficiary details because of missing required PayeeFunctionalID in the payload
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "e2d40d31-802" as RequestID and "54876c5b-284" as SourceBBID is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 400
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema
        And The /update-beneficiary-details response ResponseCode field should be "01"
        And The /update-beneficiary-details response RequestID field should be "e2d40d31-802"
        And The /update-beneficiary-details response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to update beneficiary details because of invalid SourceBBID value in the payload
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "e2d40d31-802" as RequestID, "invalid" as SourceBBID and "569ae0c5-8880-4f6d-9" as PayeeFunctionalID is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 400
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema
        And The /update-beneficiary-details response ResponseCode field should be "01"
        And The /update-beneficiary-details response RequestID field should be "e2d40d31-802"
        And The /update-beneficiary-details response should have a "ResponseDescription" property

    @unit @negative
    Scenario: Unable to update beneficiary details because of invalid PayeeFunctionalID value in the payload
        Given Information Mediator BB wants to update beneficiary details
        When POST request to update beneficiary details with given "e2d40d31-802" as RequestID, "54876c5b-284" as SourceBBID and "invalid" as PayeeFunctionalID is sent
        Then The response from the /update-beneficiary-details is received
        And The /update-beneficiary-details response should be returned in a timely manner 15000ms
        And The /update-beneficiary-details response should have status 400
        And The /update-beneficiary-details response should have "content-type": "application/json" header
        And The /update-beneficiary-details response should match json schema
        And The /update-beneficiary-details response ResponseCode field should be "01"
        And The /update-beneficiary-details response RequestID field should be "e2d40d31-802"
        And The /update-beneficiary-details response should have a "ResponseDescription" property
