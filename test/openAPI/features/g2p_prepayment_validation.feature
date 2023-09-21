@method=POST @endpoint=/prepayment-validation
Feature: Pre-payment validation

    @smoke @unit @positive
    Scenario: Successfully retrieved eligible Functional IDs from the account mapper for credit transfers smoke type test

        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        When POST /prepayment-validation-response request with required body with given "abcdef123456" as RequestID, "batchID12345" as Source_BatchID is sent
        Then The response from the /prepayment-validation-response is received
        And The /prepayment-validation-response response should be returned in a timely manner 15000ms
        And The /prepayment-validation-response response should have status 200
        And The /prepayment-validation-response response should have "content-type": "application/json" header
        And The /prepayment-validation-response response should match json schema

    @unit @positive
    Scenario: Successfully retrieved eligible Functional IDs from the account mapper for credit transfers
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "d5267933-c71" as RequestID, "e680db9f-223" as SourceBBID, "aa4533fc-018" as BatchID, "0947d8d7-0bdb-40" as InstructionID, "a98bc16e-f724-410e-b" as PayeeFunctionalID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "00"
        And The /prepayment-validation response RequestID field should be "d5267933-c71"
        When POST /prepayment-validation-response request with required body with given "d5267933-c71" as RequestID, "aa4533fc-018" as Source_BatchID is sent
        Then The response from the /prepayment-validation-response is received
        And The /prepayment-validation-response response should be returned in a timely manner 15000ms
        And The /prepayment-validation-response response should have status 200
        And The /prepayment-validation-response response should have "content-type": "application/json" header
        And The /prepayment-validation-response response should match json schema
        And The /prepayment-validation-response response RequestID field should be "d5267933-c71"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required SourceBBID in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "batchID12345" as BatchID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required BatchID in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"
    
    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required InstructionID in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required PayeeFunctionalID in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "instructionID123" as InstructionID, 100 as Amount, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required Amount in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, "USD" as Currency, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required Currency in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "Narration" as Narration is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of missing required Narration in the payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "abcdef123456" as RequestID, "sourceBBID12" as SourceBBID, "batchID12345" as BatchID, "instructionID123" as InstructionID, "PayeeFunctionalID123" as PayeeFunctionalID, 100 as Amount, "USD" as Currency is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid SourceBBID paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "sourceBBID" as invalid SourceBBID parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid BatchID paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "batchID" as invalid BatchID parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid InstructionID paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "instructionID" as invalid InstructionID parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid PayeeFunctionalID paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "PayeeFunctionalID" as invalid PayeeFunctionalID parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid Amount paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "100.10.1" as invalid Amount parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"

    @unit @negative
    Scenario: Unable to retrieve eligible Functional IDs from the account mapper for credit transfers because of invalid Currency paramater in payload
        Given Wants to retrieve eligible Functional IDs from the account mapper for credit transfers
        When POST /prepayment-validation request with required body with given "US" as invalid Currency parameter is sent
        Then The response from the /prepayment-validation is received
        And The /prepayment-validation response should be returned in a timely manner 15000ms
        And The /prepayment-validation response should have status 200
        And The /prepayment-validation response should have "content-type": "application/json" header
        And The /prepayment-validation response should match json schema
        And The /prepayment-validation response ResponseCode field should be "01"
