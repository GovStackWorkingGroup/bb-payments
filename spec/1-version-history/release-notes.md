# Release Notes

## Version 3

***

### **v3.0.0**

_Release date: December 2025_

#### **Release Overview:**

This update primarily expand the Payments Building Block with guidance to implement Multicurrency use cases, as well as extending the use of existing APIs, originally implemented for Government-to-Person (G2P) and Person-to-Government (P2G) transactions, to also support Government-to-Business (G2B) and Business-to-Government (B2G) use cases.

Detailed context on multicurrency payments can be viewed on [Payments BB: Multicurrency - GovStack - GovStack Wiki](https://govstack-global.atlassian.net/wiki/spaces/GH/pages/1014693904/Payments+BB+Multicurrency?force_transition=f336d546-d52d-486b-8e52-b20a721d5890)).

Multicurrency is important because it enables seamless transactions across different currencies, enhancing efficiency, transparency, and access to financial services in diverse economic environments. Additionally, some countries have multiple currencies due to reasons such as economic instability, historical factors, or the presence of a significant informal economy. This multiplicity can facilitate trade and investment but may also complicate financial management and regulatory oversight.

#### **Multicurrency updates:**

* Description: The description was updated to include the multicurrency use cases
* Terminology: New terms have been added to better define multicurrency operations.
* Key Digital Functionalities: We have implemented support for multiple currencies.
* Crosscutting Requirements: We've incorporated additional requirements for the calculation of multicurrency payments, ensuring independent calculations and settlements in the same currency as the transaction. This update also includes the handling of multicurrency accounts for both payers and payees.
* Standards: Standards for currency and payment status codes have been integrated into the specification.
* Data Structures: Updates to the data structures, now include currency indication as a mandatory field for multicurrency transactions.
* Service APIs: The P2G APIs have been enhanced to include the currency functionality for multicurrency use cases. Additionally, updates have been made to the G2P bulk disbursement payment APIs and P2G responses to correct display errors.
* Internal Workflows: Adjustments have been made to display workflows that accommodate multicurrency transactions.

#### **G2B and B2G updates:**

* Updated [Description](../2-description.md) chapter to reference G2B additions
* Bulk Payments on section [4.15](../4-key-digital-functionalities.md#id-4.15-bulk-payment-service) now references G2B case
* Added service API guidance for [8.4 Government to Business](../8-service-apis.md) and [8.5 Business to Government](../8-service-apis/8.5-business-to-government-b2g-payments.md)
* Added [9.4 Government to Business](../9-internal-workflows/9.4-government-to-business-g2b.md) and [9.5 Business to Government](../9-internal-workflows/9.5-business-to-government-b2g.md) guidance
* Re-structuring of [chapter 9](../9-internal-workflows.md) to spread the content on sub-pages for readability&#x20;
* Added 2 uses cases: [Government to Business](../use-cases/government-to-business-g2b-use-case.md) and [Business to Government](../use-cases/business-to-government-b2g-use-case.md) for guidance on how to use these features.

#### **Other changes in this release.**

* [4.10 Scheduling Services](../4-key-digital-functionalities.md#id-4.10-scheduling-services): The scheduling feature within the payments module has been refined to clearly define internal payments BB scheduling processes.
* [8. Service APIs](../8-service-apis.md): The issue with Section 8 not loading due to excessive swagger blocks has been identified and resolved, mirroring a similar fix implemented in the bb-emarketplace.
* The following optional cross-cutting requirements are changed to "recommended":
  * Compliance Verification
  * Calculation of Payments
* [5.3 Technical Requirements](../5-cross-cutting-requirements.md#id-5.3-payments-building-block-technical-requirements) tables are re-worked for legibility and requirement level terms homologated to match GovSpecs 2.0 requirement levels.&#x20;
* [5.4 Standards](../5-cross-cutting-requirements.md#id-5.4-standards) section is added recommending [ISO 20022](https://www.iso.org/standard/57341.html) and [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) to enhance industry interoperability

#### **Documentation**

For more information regarding these updates, users are encouraged to consult the revised sections within the specification. Additionally, for details on multicurrency, please refer to the multicurrency use case document available here: [Specification for In-Country Multicurrency Payment Systems for governments, persons and businesses](https://govstack-global.atlassian.net/wiki/spaces/GH/pages/1014693904/Payments+BB+Multicurrency?force_transition=f336d546-d52d-486b-8e52-b20a721d5890)



***



## Version 2

***

### **v2.1.0 (previously known as 23Q4)**

_Released date: July 2024_

#### Overview

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



### **v2.0.0 (previously 23Q4)**

_Release date: October 2023_

#### **Overview:**

These updates aim to refine the specifications necessary for executing payments from individuals to governments.

#### **Terminology Updates:**

New terminologies have been introduced in the document, including: "Billers," "Aggregators," "Payer," and "Payee."

#### **Functional Requirements:**

Enhancements have been made to the P2G (Person to Government) requirements, now encompassing the billers table, aggregator, and Payer Financial Institutions.&#x20;

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



***

## Version 1

***

### **v1.0.0**

_Released date: May 2022_

#### Overview

Payments Building Block was first published in May 2022 by the Payments Working Work as reference specification for implementers.
