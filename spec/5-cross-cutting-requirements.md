---
description: >-
  This section will highlight important requirements or describe any additional
  cross-cutting requirements that apply to this Building Block.
---

# 5 Cross-Cutting Requirements

## 5.1 Requirements

## 5.1.1 External Identification, Registration, and Enrollment Logic (REQUIRED)

The Payments Building Block assumes that all identification, registration, and enrollment logic is done externally and are compliant with regulated payments and banking systems within a jurisdiction.

## 5.1.2 Registration Requirements (RECOMMENDED)

The Payment System or Scheme in a country may require that participating payor or payee entities, whether health clinics, ministries, or individuals must have been registered with a regulated banking or non-banking entity prior to the use of the Payments Building Block.

## 5.1.3 Compliance Verification (OPTIONAL)

In the context of Central Bank Digital Currency or Central Bank Accounts for individuals, the payment system block would assume that the regulatory conditions must have been verified for compliance and that payor and payee entities must have been properly registered according to the rules in that scheme.

## 5.1.4 Statutory and Operational Requirements (REQUIRED)

The Payments Building Block assumes that the statutory and operational requirements around accounts (i.e. know your customer/anti-money laundering/counter-terrorist financing) must have been completed by an outside system, which is capable of communicating that status in appropriate timeframes.

## 5.1.5 Real-time Response (RECOMMENDED)

The Payments Building Block assumes that the capabilities of the underlying infrastructure must enable transactions to meet a predefined limit to turn-around-time in real-time response.

## 5.1.6 Validation (REQUIRED)

The Payments Building Block should have the ability to validate against a set of external systems for the status of an account, account address and routing information, confirmation of payment, and various error conditions of accounts and specific payments.

## 5.1.7 Authorization (RECOMMENDED)

During operation in certain modes, the Payments Block would be validating against authorizations/releases or allotments provided by the treasury systems for the source of funds.

## 5.1.8 Eligibility Verification (RECOMMENDED)

Normally, verification of eligibility of beneficiaries for the service should be done in another Block.

## 5.1.9 Budget Availability (REQUIRED)

Budget availability must be checked before voucher creation is requested.

## 5.1.10 Calculation of Payments (OPTIONAL)

Calculations of payments may depend on several attributes laid down by a specific program.

## 5.1.11 Payment Systems (REQUIRED)

Payment systems in the market, either provided by a public entity, a quasi-public entity, or a purely commercial player, are required for the functioning of this Building Block.

## 5.1.12 Settlement (REQUIRED)

Settlement (gross or net) must be handled externally to this Building Block.

## 5.1.13 Security (REQUIRED)

The Payments Building Block must meet the security requirements described in the Security Building Block.

## 5.1.14 API Mechanisms (REQUIRED)

The Payments Building Block should meet the mechanisms for consuming and publishing APIs as described in the Information Mediator Building Block.

## 5.1.15 Architecture (REQUIRED)

The Payments Building Block must meet the requirements described in the Architecture Building Block.

## 5.2 Infrastructure Requirements <a href="#docs-internal-guid-c5cf6da5-7fff-ad96-4712-4d822a57777d" id="docs-internal-guid-c5cf6da5-7fff-ad96-4712-4d822a57777d"></a>

### 5.2.1 Mobile Money

Infrastructure Components:

* Account lookup - directory service.
* Payment portal.
* Payment gateway (only in selected scenarios).
* Payment request initiation.
* Notification service.

Mobile money is a destination account to distribute funds to end users (in the case of G2P) or an initiation account to enable users to initiate a payment for government services (P2G) which is facilitated by private commercial entities, typically Mobile Network Operators.

There are three ways that facilitate interoperability between a mobile money provider and a financial service institution (which could be the initiator of a payment - G2P or the receive - P2G): Through a Switch, through a third-party aggregator or through a bilateral integration. We expect one or multiple of these components to be in place to facilitate the use cases discussed in this document but these will remain out of the Payment Building Block.

### 5.2.2 Vouchers

Infrastructure Components:

* Voucher Management System.
* Merchant Ecosystem.
* Merchant Registry.

The Merchant Ecosystem and the Merchant Registry are both outside the scope of the Payments Building Block. The development of the Merchant Ecosystem will be driven by the relevant government institution. The Merchant Registry will be managed by another Building Block.

## 5.3 Payments Building Block Technical Requirements

<table data-header-hidden><thead><tr><th width="634"></th><th></th></tr></thead><tbody><tr><td><strong>Requirement</strong></td><td><strong>Type (Must/Should/May)</strong></td></tr><tr><td>Secure API exposure: All APIs exposed via secure socket connections (HTTPS).</td><td>MUST</td></tr><tr><td>Client application authorization tokens: Client applications must send authorization tokens in the authorization header of the request to authenticate users and the API Management Gateway will verify whether the token is valid.</td><td>MUST</td></tr><tr><td>Transaction receipting: For each disbursement made by the system, a receipt should be issued to the recipient of the funds containing information about the transaction id, transaction date and time, reason for the payment, details of the payor, and the system should store all receipts issued for easy reference and reconciliation.</td><td>MUST</td></tr><tr><td>Transaction status querying capability</td><td>MUST</td></tr><tr><td>Display details of the transaction to the payer</td><td>MUST</td></tr><tr><td>Transaction pre approval: Prior to processing bulk payment and batch payment transactions, the transaction must be authorized and approved in the system.</td><td>MUST</td></tr><tr><td>Pre-processing validation of data (well formed data and completeness checks) prior to disbursement.</td><td>MUST</td></tr><tr><td>Ability to schedule bulk payments</td><td>MUST</td></tr><tr><td>Support for batch payments</td><td>MUST</td></tr><tr><td>Ability to lookup payment addresses</td><td>SHOULD</td></tr><tr><td>Error handling and reconciliation</td><td>MUST</td></tr><tr><td>Transaction status logging</td><td>MUST</td></tr><tr><td>Triggering of payments</td><td>MUST</td></tr><tr><td>Voucher Management</td><td></td></tr><tr><td>Batch generation of vouchers</td><td>MUST</td></tr><tr><td>Voucher uniqueness and randomness: Voucher pin must be unique and unpredictable.</td><td>MUST</td></tr><tr><td>Secure voucher data storage</td><td>MUST</td></tr><tr><td>High availability of storage</td><td>MUST</td></tr><tr><td>Expose APIs that can be invoked by voucher serial number for purposes of querying a voucher, suspending, or unsuspending a voucher.</td><td>MUST</td></tr><tr><td>Support an API that can be invoked to redeem a voucher using the voucher number.</td><td>MUST</td></tr><tr><td>Support an API that can invoke payment gateway</td><td>MUST</td></tr><tr><td>Mobile Payments</td><td></td></tr><tr><td>Real time debiting/crediting of mobile money accounts</td><td>SHOULD</td></tr><tr><td>Regular balance reconciliation with disbursement Agency</td><td>MUST</td></tr><tr><td>Documented process for partners to dispute transaction records</td><td>MUST</td></tr><tr><td>Target account identifier or lookup of payment address</td><td>MUST</td></tr><tr><td>Ability to retrieve details of completed transactions in the batch</td><td>MUST</td></tr><tr><td>Bulk Payments</td><td></td></tr><tr><td>Ability to securely receive bulk payment requests as a single HTTPS request containing data for multiple transactions. The transaction data (with payment instructions data) is passed format and will be compatible with ISO 20022.</td><td>MUST</td></tr><tr><td>The number of transactions that can be included in a single batch is limited by the size of the file upload and the processing time. If the number of transactions in the file exceeds the file size and could impact the performance of the system, the batch should be split into multiple batch requests.</td><td>MUST</td></tr><tr><td>Batch files should be verified for any errors and validated as per business rules and regulations before it is accepted as a valid bulk payment file.</td><td>MUST</td></tr><tr><td>Batch files containing duplicate payments will not be processed and an error will be generated.</td><td>MUST</td></tr><tr><td>The bulk payment process has to be explicitly triggered by an authorized user. All requests to the Bulk Payment Application API must be authorized and digitally signed by the person initiating the bulk payment request.</td><td>MUST</td></tr><tr><td>The batch file for bulk payments should contain the beneficiary ID token, and the amount to be paid. The payment information is not included in the batch file for security and privacy but is resolved by the verification and validation component of the bulk payment service by invoking the Account Lookup Directory Service (ALDS/ALS).</td><td>MUST</td></tr><tr><td>The Bulk Payment Application API shall inspect the batch disbursement file and split transactions into bank payments and non-bank payments (e.g. Mobile money) in separate payment files before initiating the call to the Payment Gateway.</td><td>MUST</td></tr><tr><td>The status of the bulk payment transaction can be obtained from the event log. The payment status code indicates the status of a single payment transaction and will be according to ISO 20022 Payment status codes table.</td><td>MUST</td></tr></tbody></table>

## 5.4 Standards

The following standards are applicable to data structures in the Payments Building Block:
