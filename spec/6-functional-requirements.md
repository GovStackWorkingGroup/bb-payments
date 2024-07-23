---
description: This section lists the technical capabilities of this Building Block.
---

# 6 Functional Requirements

## 6.1 Payment Orchestration

Payment orchestration is an overarching concern which relates different sub-components or microservices whereby it:

* Explicitly defines and models workflows that span multiple microservices (REQUIRED)
* Provides detailed visibility into how a workflow is performing and identifying where there are issues (REQUIRED)
* Ensure that within a defined workflow, all workflow instances are completed according to plan, even when there are issues along the way (REQUIRED)

Payments orchestration is used to configure the Payments Building Block functionalities to be exercised during a specific workflow and provides functionality such as:

* Sending receipts, notifications, and acknowledgement of receipts in a secure manner to payers and other external applications to receive confirmation of payment made and safekeeping of a record of the receipt that was sent (REQUIRED)
* Provides for auditability of the Payments Building Block to have its controls evaluated for effectiveness, efficiency, and security, including tracing transactions, identifying users who access the system, clearly defined system controls, and compliance with local regulations and global best practices (REQUIRED)
* Schedule and aggregate payments to individuals, allowing programs to stagger payments or combine them with other payments to the same groups of individuals (REQUIRED)
* Enable payment confirmation through secure receipts, notifications, and acknowledgement of receipts to payers and other external applications (REQUIRED)
* Store event logs and audit trails for all transactions processed and their outcomes for monitoring and audit purposes (REQUIRED)
* Validate data structures and content to ensure that it is not missing key pieces of information, including verifying the destination account and triggering a different process if the account is not in good status (REQUIRED)
* Break down bulk payments into batches that can be handled efficiently or create a queue mechanism whereby the list is sequentially processed with throttling to reduce the flow of payment initiated (REQUIRED)
* Coordinate or orchestrate the validation, verification, batching, and scheduling using a set of rules, including options for kicking back to the operator for review or resubmission in certain error cases (REQUIRED)
* Generate reconciliation of accounts based on the successful sending of funds into accounts and reports to show the additional status of systems and payment types and timings (REQUIRED)
* Manage fees in a centralized way and support the use of digital channels to/from end-users, regulated account systems with payment signalling, and notifications by the Financial Services Provider enablers (REQUIRED)
* Scale on transaction performance, transaction latency, reliability, resilience, and graceful service degradation (REQUIRED)
* Support digital tools for query management, including beneficiary queries and complaints about payment services (REQUIRED)
* Route bulk payments through the account holding the funds, either at the government Treasury or a commercial bank (REQUIRED)
* Release funds by the Ministry or payroll master after appropriate approvals (REQUIRED)
* Handle processing and orchestration of bulk payments, including verification of user information, confirmation of payee details, verification of destination account for the beneficiary, fee calculation, and handling of automated bulk transactions (REQUIRED)
* Validate data structures and content to ensure that key information is not missing (REQUIRED)
* Break down bulk payments into batches that can be handled efficiently or create a queue mechanism whereby the list is sequentially processed (REQUIRED)
* Generate reconciliation of accounts based on successful sending of funds into accounts (REQUIRED)
* Provision, issue, activate, and redeem vouchers to support G2P beneficiary payments (REQUIRED)
* Ensure that adequate funds have been allocated to the voucher during provisioning (REQUIRED)
* Allow issuance of vouchers but make them unusable until they are in the hands of the beneficiary (REQUIRED)
* Activate vouchers to make them usable for predefined use cases and for a certain period of time (REQUIRED)
* Handle redemption of vouchers so that beneficiaries receive appropriate benefits from third parties (REQUIRED)
* Generate reports that show the vouchers in their different states as well as the aggregate quantity "stock", which triggers requests for "re-stocking" of vouchers (REQUIRED)
* Authenticate beneficiaries at the point of redemption by checking the Digital Registries Building Block to authenticate the user (REQUIRED)
* Cater for the distribution of social service transfers electronically and cash safely to end users (in the case where the user does not want to use electronic payments it is recommended that vouchers are used) (REQUIRED)
* Creates eVouchers to disburse financial subsidies in a controlled and safe manner (REQUIRED)
* Responds to payers to provide information about the status of the payments (e.g. confirmation of payment, insufficient balance or a mismatch in credentials, transfer failure, etc.), based on the status in the backend applications (REQUIRED)
* Posts status of transactions with traceability information into transaction logs (REQUIRED)
* Tracks due payment and sent payment notifications through alerting mechanisms, along with associated information (REQUIRED)
* Receives triggers for payment collection, posts the amount with relevant disclaimers to the payer, and obtains payer approval (REQUIRED)
* Securely posts the approval, user ID, and associated payment information to the appropriate backend (e.g. mobile, debit/credit card, internet banking entities) of relevant financial applications from banks, employers, and insurance; awaits transfer confirmation from those applications (REQUIRED)
* Searches and provides a logged information-based query of other applications (REQUIRED)
* Able to handle operations in remote and inaccessible locations (REQUIRED)

## 6.2 Voucher Management

The voucher management system is responsible for prectivation, storage, activation, redemption, validation, suspension, unsuspension, purging, and reporting on vouchers.

### **Voucher Provisioning**

This process traditionally involves the generation of group vouchers against some authorized value (budget release or allotment).

* Each voucher should have a unique secret voucher number, a unique identification number (voucher serial number) indicating its position in an inventory of pre-activated ~~issued~~ vouchers, and is linked to a fixed amount of value in a particular currency (REQUIRED)\
  \
  Vouchers will also be associated with a voucher group during ~~provisioning~~ pre-activation. Voucher serial numbers will be unique across currencies should there be vouchers of multiple currencies.
* The vouchers should be created with an expiry date and MUST be stored securely (REQUIRED)\
  \
  All vouchers will be expected to have the same duration of expiry and this expiry period will be from the moment the voucher is activated.
* Alternative design options include dynamically pre-activating a voucher at transaction time and creating variable amounts, but this increases complexity and requires tighter operational controls (OPTIONAL)

### **Voucher Issuance**

This process involves the Registration Building Block (or any other Building Block for that matter) requesting a voucher number from the voucher management system through an API.

* Once confirmation is received that the voucher has been released it flags the voucher as activated. Design decisions include making this step optional. Having an additional step increases security by ensuring that the voucher is not used until it is in the hands of the beneficiary (RECOMMENDED)
* Presentation of the voucher. At a minimum, this presentation should have the voucher number as well as the voucher serial number (REQUIRED)\
  \
  Once a voucher has been issued by the calling Building Block (Registration Building Block) it will be presented to the beneficiary in a form that is determined by the calling Building Block (refer to voucher workflow). The format of the final voucher presentation will be determined by the function of the calling Building Block. It could include the details of the beneficiary, which when placed on the voucher presentation, will help the merchant authenticate the beneficiary at the point of redemption

### **6.2.3 Voucher Redemption**

* Extract and authenticate voucher data (REQUIRED)\
  \
  In the redemption process, the merchant will authenticate the beneficiary and use a predefined technology (Unstructured Supplementary Service Data, Mobile App, Web Browser) to extract the voucher number and call a redemption API through the relevant calling Building Block. The calling Building Block may also validate the beneficiary details if so required. The Building Block will also be able to validate the merchant and determine the voucher group to which the merchant belongs. Lastly, the calling Building Block will invoke the Payment Building Block Redeem API, through the Payments Building Block API Management gateway, to validate the voucher and if valid to redeem it&#x20;
* Initiate payment in the merchant or agent wallet or bank account (REQUIRED)\
  \
  Once the voucher is validated, the Voucher Management System should invoke an API on the Payment Gateway to effect the payment in the merchant or agent wallet or bank account (depending on what was set up at merchant/agent registration). The payment gateway/switch will debit a pre-funded account/wallet and credit the merchant/agent account/wallet. The successful execution will result in the voucher being flagged as consumed/used (REQUIRED)

### 6.2.4 Voucher Management System (VMS) API interface

The details of the VMS APIs are described in the Service API section.

The VMS functionality can be accessed by four external APIs and includes the following functionalities:

* Preactivate a voucher (REQUIRED)\
  \
  An API call to pre-activate the voucher and get a voucher number, a voucher serial number, and an expiry date.
* Activate a voucher (REQUIRED)\
  \
  An API call to activate the vouchers by serial number.
* Verify validity of a voucher by serial number (REQUIRED)\
  \
  An API call to check the validity of a voucher by serial number, or by voucher number and group
* Redeem/consume voucher (REQUIRED)

### 6.2.5 Voucher Storage

The voucher management server shall have a storage subsystem to store the vouchers.

* Vouchers must be stored in secure but high-performance data storage (read access will marginally exceed write access) (REQUIRED)
* The storage of the voucher number will require encryption of data at rest and in motion (unless the channel is encrypted) (REQUIRED)
* Logs generated should NEVER contain the voucher numbers (REQUIRED)
* All access to the voucher database must be logged (REQUIRED)
* Segregation of duty must be done with respect to privileged access to the database and key management of the encryption of the voucher (the level of key management may need to be determined) (REQUIRED)

## 6.3 Account Lookup Services (Account Mapper)

The account lookup directory service identifies the Financial Service Providers (FSP) where the merchant/agent/payee’s account is located.

* Account lookup directory service (REQUIRED)\
  \
  The account lookup directory service provides a directory that maps the beneficiary's unique identifier (which matches the record in the social registry system) to the transaction account where the beneficiary wishes to receive their G2P payment, allowing the government to address payments to a specific individual. The identifier can be a national ID, phone number, or other number or alias that can uniquely identify individuals across social protection and financial sector databases. The information will be kept in a tokenised form in the account lookup directory service.\
  \
  In the case where there is a national payment switch, the account lookup directory service will be maintained by the FSPs, In the scenario, where there is no payment switch, the government would need to manage the account lookup directory service and provide a mechanism for linking it to the FSPs.

## 6.4 Payment Request Initiation

* A request can come from either internal or external sources (REQUIRED)
  * An external source could be another GovStack Building Block (e.g. the Registration Building Block or Social Benefits Registry Building Block or Payroll). Either source must be appropriately authenticated and authorized to initiate the request.
* The initiation can be synchronous (typically for a single payment) or asynchronous (typically for batch payments) (REQUIRED)
* The request must contain at a minimum: the payer identifier, the payee identifier, the amount, the currency, the policy, and the initiating source’s unique transaction ID. In the case of the internal payment request, it should also contain an ID provided by the payment orchestration module (REQUIRED)
* Certain processes in the transaction flow might require proof of intent from the user, for example, entering the PIN/Password or pressing an ’accept‘ key to initiate the payment process. Such events and their outcomes should be recorded for audit trail purposes. However, the PINs and passwords should not be stored in logs or if they have to, PINs and passwords should be hashed out (RECOMMENDED)

## 6.5 Payment Gateway

A payment gateway allows different (digital) Financial Service Providers (FSPs) to:

* Interconnect and exchange information (REQUIRED)
* Initiate and receive transactions (REQUIRED)
* Accept or reject transactions and debit or credit end-user accounts (REQUIRED)

## 6.6 Payment Portal

The payment portal will:

* Enable government payers (departments/ministries/public sector bodies) to make G2P payments through one or multiple FSP/payment service providers (REQUIRED)
* Focus on managing, sending, and reconciling payments (REQUIRED)
* Connect government agencies to sending and recipient institutions (REQUIRED)
* Coordinates sending/receiving of payment requests, and approvals (REQUIRED)
* Provide reports across G2P programs, FSPs, and beneficiaries (RECOMMENDED)
* Track payment status and payment history (REQUIRED)
* Register FSPs who are entitled to process payments for G2P payments (REQUIRED)
* Provide restricted access to authorized FSPs to connect to the portal, to process the payments for beneficiaries who are their customers (REQUIRED)
* Automate reconciliation (RECOMMENDED)
* Provide data analytics on payments processed and their status, whether successful or not (REQUIRED)

## 6.7 Event Management

* Create logs and notifications for specific actions on any transaction (REQUIRED)\
  \
  This functionality supports different events related to triggering specific actions on payment outcomes such as issuing receipts upon successful payment, automating payments in case of bulk transactions, passing information to other Building Blocks as necessary, and handling exceptional cases for instance user/system errors amongst others.\
  \
  All notification events shall have a timestamp associated with them and be kept as part of the audit log.

## 6.8 Reconciliation

This should happen at two levels: internally and externally.

* The internal reconciliation will occur between the different sub-blocks within the Payments Building Blocks. In order to achieve internal reconciliation the internal payment request initiator should issue a unique ID that will be referenced by subsequent Payments Building Blocks in all future calls related to the particular payment. This will allow end-to-end tracing of the transaction within the Payments Building Blocks (REQUIRED)
* The external reconciliation is more complex as it involves a calling Building Block which is outside the Payments Building Blocks (such as the Registration Building Block) and a third party (e.g. DFS). Ideally, there needs to be a sequence of IDs that can identify a transaction from start to finish (REQUIRED)
* The nodes that are under the control of the GovStack should be time synched (REQUIRED)
* IDs should be unique, if possible contain the timestamp, and should not roll over across short ranges (REQUIRED)

## 6.9 Batch Processing

* Prepares the batch breakdown on the basis of rulesets governing: which Financial Services Providers shall receive, which payments, and other considerations (REQUIRED)
* Combines payments with other payments to the same beneficiary (REQUIRED)
* Detects batch failure rates (REQUIRED)

Batch files go through a final check to be clean of defects and inconsistencies, to check with external systems as necessary:

* At high volumes, batches are queued for processing (REQUIRED)
* Low-level validation of data types and data completeness (REQUIRED)
* Verification of lookup of accounts to ensure that the account information matches the destination system expectation (REQUIRED)
* Check for inconsistencies (REQUIRED)
* Auto-correct items as possible - consistency logic can be applied to fill in missing formatting if required by recipient banks and telecoms (REQUIRED)
* Errors are kicked back to program level or to an internal data review process (REQUIRED)

## 6.10 Scheduling Services

* In relation to batch logic, payments are scheduled against the availability of systems, throughput limitations, and rules set by programs (REQUIRED)
* Regular and repeat payments are scheduled (REQUIRED)
* Batches may be given prioritization in the queue (REQUIRED)
* Essential control logic may be included here, specific to the individual batch sending and resending (REQUIRED)
* Availability of funds in different budget accounts may be incorporated into this process (REQUIRED)
* Additional workflow checks as required, including the resending of failed transactions (REQUIRED)

## 6.11 Event Logging

Each component of the Payments Building Block should be capable of producing both application and transaction logs. This is important to ensure that the system can be adequately monitored and troubleshooting can be performed efficiently and effectively.

* Application or event logs will capture events that each component performs and should contain at least the following information (REQUIRED):
  * application/user ID
  * event date and time
  * terminal identity (name and/or IP address)
  * event-related information (message or code)
  * event success or failure
* The components should also generate transaction logs that capture at least the following information (REQUIRED):
  * transaction date and time
  * transaction source
  * transaction destination
  * supplementary data
  * transaction status (success, failed, in progress)
* The event logs and the transaction logs should NOT capture any sensitive data such as voucher numbers, passwords, etc. (REQUIRED)
* There should be an individual transaction record for every payment transaction. For example, if a batch payment process is executed there should be a transaction record for each individual transaction and a separate event log for the entire batch (RECOMMENDED)

## 6.12 Audit Logging

Audit trails are required to provide assurance of the integrity of the requests received and actions taken on these requests. An audit trail is a chronological record of system activities that is sufficient to enable the reconstruction and examination of the sequence of environments and activities surrounding or leading to an operation, procedure, or event in a transaction from inception to final results. The audit trail shall comply with the following requirements:

* Must be automatically captured by the computer system whenever a payment request is created, modified, or deleted (REQUIRED)
* Must be stored in a secure manner and must not be editable by any user, including privileged users. A common approach is to copy/redirect logging to a separate logging server (REQUIRED)
* Each audit trail entry must be time-stamped according to a controlled clock which cannot be altered. The time should either be based on central server time or a local time, so long as it is clear in which time zone the entry was performed (REQUIRED)
* Each audit trail entry must be traceable, i.e. attributable to the individual responsible for the direct data input. Updates made to data records must not obscure previous values and where required by regulation the reason for changing the data must also be recorded (REQUIRED)
* The audit trail must be retained as long as the electronic record is legally required to be stored (REQUIRED)
* The audit trail must be available for internal review/audit (REQUIRED)
* The auditing system must be self-sufficient, i.e. for auditing/regulatory purposes the information stored by a BC must be enough (REQUIRED)
* Audit entries cannot be changed, i.e. the audit BC persisted store should be immutable, and should only support append and not changes or deletes (REQUIRED)
* Audit entries should have a pair of fields to store encrypted data and the encryption key id - these are provided by the submitting BCs (REQUIRED)
* Querying capabilities (REQUIRED):
  * Auditor wants to see all activity in the last X days.
  * Auditor wants to see all activity of action type Y, or from a certain BC.
  * Auditor should be able to request the decryption of encrypted data to an operator.
* Access to the audit store must be securable, so whatever tech is chosen must implement access control mechanisms (ideally that can connect to our Identity and Access Management provider/connector) (REQUIRED)

## 6.13 Reporting Services

* The data store will be write-only from the core service and should be read-only by external components (RECOMMENDED)
* The data model on the reporting data store can be different from the internal operational data models that the switch uses (RECOMMENDED)
* The component provided by the switch will be translating internal events and internal data models to the external data store models. This component can be replaced (RECOMMENDED)

## 6.14 Security layer

Protects the system at the transport and application levels. It provides the necessary APIs for encrypting the data in transit and when stored as well as the digital signatures used for API authentication. The digital signatures are based on public key cryptography using X.509 digital certificates.

At the transport layer:

* All communication between building blocks must use secure protocols to protect the confidentiality and integrity of the data in transit (REQUIRED)
* Strong authentication for parties involved in the transactions should be supported (REQUIRED)
* Confidentiality of personal information related to the transaction – Information on account data, transaction data, payment credentials, and users’/payee’ personal profiles must never be disclosed to any unauthorized party (REQUIRED)
* Non-repudiation of transactions by parties involved (REQUIRED)
* Acknowledgement receipt: this will result in creating a trusted communication path for all transactions between each party, by the end users, telecommunication companies, merchants, or banks (REQUIRED)
* The messages concerning the payment transaction shall be authenticated (REQUIRED)

## 6.15 Data Protection

* Use of a hardware security module (HSM) or equivalent to provide cryptographic keys for critical functions such as encryption, decryption, and authentication for the use of applications, identities, and databases (REQUIRED)

## 6.16 Bulk payment service&#x20;

*   G2P bulk disbursement (RECOMMENDED)\
    \
    The following are the prerequisites required before bulk payments can be initiated:

    * Funding requirements
      * The funding requirements must operate within the budget/ceiling.
      * The number of funding accounts and the life cycle processes will vary depending on the payment infrastructure scenarios.
    * Bulk payments file
      * For the salary payments use case, this would be generated by the payroll system.
      * For the unconditional social cash transfer use case, this would be generated by a process that would be triggered as per a pre-agreed frequency and the information about the payments to be made would be extracted from the registry (a database containing the information about beneficiaries for a particular government social cash transfer programme). The process of generating this payments file is outside the Payments Building Block.

    There are three options for the disbursement:

    * Manual process for Government/Department to send the retail payment details to each Financial Services Provider (FSP) (i.e. either by email or other means). This would be the case where there is a lack of interoperability among FSPs.
    * Upload the batch disbursement file in the payment web portal for each FSP to retrieve in the case of a centralised Account Lookup Directory Service.
    * Automate the disbursement process through the decentralised Account Lookup Directory Service and the payment gateway.

    **Option 1**: Retail payment information is sent securely to each Payment Service Provider for disbursement

<figure><img src=".gitbook/assets/image20.png" alt=""><figcaption></figcaption></figure>

**Option 2**: Retail payments are accessed via a payment web portal by the Payment Service Provider. The advice/electronic fund transfer request, or paper-based check is issued from the Financial Management Information System to the Trusted Single Account (TSA) -holding Bank.\
Based on this advice, the Bank disburses funds from the TSA into the digital payments system of the FSP which transfers the corresponding funds to the recipient’s account. For the retail payment scrolls, where each agency is responsible for running the payment system - payroll, social welfare payments, etc. - the payment details are not stored in those systems. Instead, the beneficiary’s payment token is retrieved from the Centralised Account Lookup Directory Service and kept in the government payment portal. The payment lists are only shared with the program account holder institution/FSP, Payment Service Provider (PSP), via the government payment portal. The FSP/PSP can log in on the government web portal to access the directory for payments that the FSP needs to effect for each G2P Program.

<figure><img src=".gitbook/assets/image2.png" alt=""><figcaption></figcaption></figure>

**Option 3**: Similar to option 2 but the disbursement process to the beneficiary is routed automatically through the payment gateway using the payment token retrieved from the decentralised account lookup directory service.

<figure><img src=".gitbook/assets/image8 (1).png" alt=""><figcaption></figcaption></figure>

Bulk payments require the functionality of a Payments Gateway and the functionality therein. It also assumes a separate mechanism by which the recipient account address is determined. In the figure below the “account lookup directory service” functionality maps the concept of identity to the payment alias and from there to the Financial Services Provider routing address. (i.e. wallet address or account address)

### **6.16.2 Interaction with Other Building Blocks (REQUIRED)**

The diagram below shows the interaction with the registries Building Blocks.

At a high level, the payment components used for bulk payments are shown in the figure below.

<figure><img src=".gitbook/assets/image24.png" alt=""><figcaption></figcaption></figure>

Figure: Key digital requirements of Bulk Payments expressed as a high-level block diagram. Dotted line for required components.

<figure><img src=".gitbook/assets/Picture2.png" alt=""><figcaption></figcaption></figure>

### 6.17 P2G Bill payments

The Billing ecosystem would consist of various actors performing core and secondary processes to complete the bill payment function. Some of the actors only play an auxiliary role to enable bill payment.

<figure><img src=".gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

**Payments Building Block**

* Main payments facilitator enabling exchange of all financial and non-financial messages related to: Biller/Aggregator Registration o Bill discovery o Bill Payment Confirmation messages
* Biller Discovery through internally referring to the Billers Table updated by PBB Billing sub-Module&#x20;
* Generation of transaction/ activity reports for registered Billers/ Aggregators&#x20;
* Registration of Billers in the system&#x20;
* Allocation of unique Biller IDs / Prefixes

**Billers Table**

* Database of all registered billers
* Internally referenced by the Payments BB each time a Bill Inquiry comes in
* Returns the endpoints for the registered biller/ aggregators
* Biller Details and Account Details from this table would be shared with the Payer FIs during Payments BB and Payer FSP linking for Bill Payments.

**Billers/ Aggregators**

* Getting registered at the PBB – Bill Payment Service
* Returning the correct Bill Details against the Bill Inquiries received from PBB
* Marking the Bills as “Paid” upon receiving Payment confirmation from PBB
* \[Out of Scope of PBB] Performing Bill validation and Bill discovery in their system

**Payer FIs**

* Sending Bill inquiry Requests
* Sending Bill Payment Confirmation
* \[Out of Scope of PBB] Customer validation and Payment debit

## 6.17 Payments Building Block Components

The following components are needed to achieve the technical functionalities of the Payments Building Block.

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image22.png)

Many of the components outlined above are used to deliver the Functional Requirements for the Payments Building Block. Components which are not directly related to the delivery of these functions are described here:

### 6.17.1 API Management Gateway <a href="#docs-internal-guid-ccd3b00d-7fff-3413-9366-be54b42a4a46" id="docs-internal-guid-ccd3b00d-7fff-3413-9366-be54b42a4a46"></a>

The Payment Building Block provides an API Gateway to handle all the API messaging calls and API access control verification from other Building Blocks to the Payments Building Block and vice versa as well as within the Payments Building Block. All requests from other Building Blocks first go through the API gateway. The gateway then routes requests to the appropriate application/service.

The API Management gateway will:

* Use Identity and access management for authentication.
* Perform input validation checks to prevent oversized message attacks, SQL injection attacks as well as JSON and XML threats.
* Require authentication for all API users.
* Manage access quotas and throttling.
* Log all API calls.
* Allow API providers to limit the rate of consumption for all API users.
* Transform backend error messages into standardized messages so that all error messages look similar; this also eliminates exposing the backend code structure.
