# Change log

## 1. Overview

Version 1 of the Payments Building Block was first published in May 2022 by the Payments Working Work as reference specification for implementersand subsequent updates have been published as follows

| **Version**                                                                                                                | **Date**     | **Short description**                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0                                                                                                                      | May 2022     | Initial version of the payments BB                                                                                                                                                                                                                                |
| 1.1.0 (previously 23Q4)                                                                                                    | October 2023 | Introduced new terminology, enhanced P2G requirements, added Billers Table, updated multiple APIs (Onboarding, Bulk Disbursement, Voucher, new P2G APIs), and revised internal P2G workflows.                                                                     |
| <p>2.0.0 (previously 23Q4)</p><p><em><strong>1.2.0</strong></em></p>                                                       | July 2024    | Addressed discrepancies found during sandbox implementation: modified scheduling services, made eligibility verification required, included recommended reporting requirements, and removed external scheduling.                                                  |
| <p>2.0.0</p><p>1.3.0 March 2025 (inferred, as 2.1.0 is March 2025 and this precedes it, and the changelog is provided)</p> | March 2025   | Introduced multicurrency enhancements (description, terminology, key functionalities, crosscutting requirements, standards, data structures, Service APIs, internal workflows) and refined internal scheduling processes, resolved a documentation loading issue. |

## 2. Changelog

### Version 1.1.0

#### **Terminology Updates:**

New terminologies have been introduced in the document, including: "Billers," "Aggregators," "Payer," and "Payee."

#### **Functional Requirements:**

Enhancements have been made to the P2G (Person to Government) requirements, now encompassing the billers table, aggregator, and Payer Financial Institutions. These updates aim to refine the specifications necessary for executing payments from individuals to governments.

#### **Data Structures:**

A new addition in this section is the "Billers Table," curated for the essential fields pertinent to a biller's table used in the new P2G workflows.

#### **Service APIs:**

Multiple APIs have been revised and enhanced with additional endpoints. The updates encompass:

* **Onboarding to the Account Mapper:**
  * Register\_Beneficiary\_Response
  * Register\_Beneficiary
  * Update\_BeneficiaryDetails
  * Update\_BeneficiaryDetails\_Response
* **Bulk Disbursement:**
  * PrePayment\_Validation
  * PrePayment\_Validation\_Response
  * BulkPayment
* **Voucher APIs:**
  * VoucherPreActivation
  * VoucherActivation
  * VoucherStatus
  * VoucherCancellation
  * VoucherRedemption
  * BatchVoucherActivation

Note: The Voucher Redemption API may operate synchronously to ensure the delivery of prompt and reliable responses to the initiating clients, whether users or systems.

* **New P2G APIs:**
  * billInquiryBiller
  * markBillPayment
  * BillerRtpReq
  * billerRtpResp
  * rtpStatusUpdate

#### **Internal Workflows:**

Significant updates have been made to the internal workflows to accommodate P2G bill payment flows. The enhancements include:

* Workflows supporting biller onboarding – envisioned as a one-time activity on the Payments BB.
* The incorporation of workflows for linking the Payer Financial Institutions (PFI) with the Payments BB for bill payments.
* Implementation of workflows for Bill Inquiry & Bill Payment Updates via the Payment BB.
* Additional flows introduced are:
  * Push Payment Flow integrated with Bill Inquiry Flow.
  * Payer Financial Institution (PFI) – Customer Bill Payment Flow.
  * P2G Bill Payment via Request to Pay (RTP) Flow.
  * P2G Bill Payment with Voucher.

### Version 1.2.0

Following the sandbox implementation of the payments BB in February 2024, discrepancies below were noted in the spec and subsequently updated in this version.

#### **Section 4: Key Digital Functionalities**

4.10 Changes: Modification of the scheduling services in the payments BB; i.e., to enable internal functionalities like bulk processing of payments.

#### **Section 5: Cross-cutting requirements**

5.1.8 Change of eligibility verification from recommended to required

5.2.3 Inclusion of the recommended requirements for reporting services into cross-cutting requirements:

* The data store will be write-only from the core service and should be read-only by external components (RECOMMENDED)
* The data model on the reporting data store can be different from the internal operational data models that the switch uses (RECOMMENDED)
* The component provided by the switch will translate internal events and internal data models to the external data store models. This component can be replaced (RECOMMENDED)

#### **Section 6: Functional requirements:**

6.10 Removal of the "Regular and repeat payments are scheduled (REQUIRED)" from Scheduling Services as this is done outside the payments BB.

### Version2.0.0

#### **Release Overview:**

This update primarily introduces enhancements for the multicurrency use case within the payments BB specification (for detailed context on the payments BB refer to: [Payments BB: Multicurrency - GovStack - GovStack Wiki](https://govstack-global.atlassian.net/wiki/spaces/GH/pages/1014693904/Payments+BB+Multicurrency?force_transition=f336d546-d52d-486b-8e52-b20a721d5890)).

Multicurrency is important because it enables seamless transactions across different currencies, enhancing efficiency, transparency, and access to financial services in diverse economic environments. Additionally, some countries have multiple currencies due to reasons such as economic instability, historical factors, or the presence of a significant informal economy. This multiplicity can facilitate trade and investment but may also complicate financial management and regulatory oversight.

#### **Detailed Updates:**

* Description: The description was updated to include the multicurrency use cases
* Terminology: New terms have been added to better define multicurrency operations.
* Key Digital Functionalities: We have implemented support for multiple currencies.
* Crosscutting Requirements: We've incorporated additional requirements for the calculation of multicurrency payments, ensuring independent calculations and settlements in the same currency as the transaction. This update also includes the handling of multicurrency accounts for both payers and payees.
* Standards: Standards for currency and payment status codes have been integrated into the specification.
* Data Structures: Updates to the data structures, now include currency indication as a mandatory field for multicurrency transactions.
* Service APIs: The P2G APIs have been enhanced to include the currency functionality for multicurrency use cases. Additionally, updates have been made to the G2P bulk disbursement payment APIs and P2G responses to correct display errors.
* Internal Workflows: Adjustments have been made to display workflows that accommodate multicurrency transactions.

#### **Other non multicurrency related changes in this release.**

* Scheduling: The scheduling feature within the payments module has been refined to clearly define internal payments BB scheduling processes.
* Service APIs: The issue with Section 8 not loading due to excessive swagger blocks has been identified and resolved, mirroring a similar fix implemented in the bb-emarketplace.
* The following optional cross-cutting requirements are changed to "recommended":
  * Compliance Verification
  * Calculation of Payments

#### **Documentation**

For more information regarding these updates, users are encouraged to consult the revised sections within the specification. Additionally, for details on multicurrency, please refer to the multicurrency use case document available here: [Specification for In-Country Multicurrency Payment Systems for governments, persons and businesses](https://govstack-global.atlassian.net/wiki/spaces/GH/pages/1014693904/Payments+BB+Multicurrency?force_transition=f336d546-d52d-486b-8e52-b20a721d5890)
