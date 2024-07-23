---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

The APIs defined here establish a blueprint for how the Building Block will interact with other Building Blocks. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here. This section also provides guidance on how candidate products are tested and how GovStack validates a product's API against the API specifications defined here.

The tests for the Payments Building Block can be found in [this GitHub repository](https://github.com/GovStackWorkingGroup/bb-payments/tree/main/test/openAPI).

## 8.1 Government to Person (G2P) payments <a href="#docs-internal-guid-f78d8d0a-7fff-33bf-2d15-aced73dc0f65" id="docs-internal-guid-f78d8d0a-7fff-33bf-2d15-aced73dc0f65"></a>

These APIs link Source BB to the Payments Building Block for bulk payment processing, identity verification, and bank/wallet mapping. Third-party providers may add extra APIs depending on the country's payment landscape.

### 8.1.1 Collaboration with G2PConnect

GovStack is collaborating with G2P Connect to make it easier for countries to understand, find, and implement the optimal tools for executing digital payments for the aim of sustainable development. For those familiar with the GovStack initiative, it is no surprise we are collaborating with G2P Connect, as we share a common mission (to provide the technological tools to facilitate sustainable development) and similar methods (developing technical specifications and guidance).

G2P Connect is an open-source effort to enable G2P digital payments, built with interoperable standards and design templates. It offers a technology blueprint with a plug-and-play architecture with built-in privacy and security; a set of integration specifications to ensure interoperability across the systems supporting G2P delivery; and an integration sandbox to support the development of solutions adhering to the blueprint and specifications.

As G2PConnect is focused exclusively on G2P payments, this is a cogent area of collaboration for the GovStack Payments building block workstream. Our joint objective is to develop synergies with specific use cases for G2P digital payments so that these use cases can also be implemented using GovStack APIs and building blocks. We will share best practices and lessons learned through defining the technical specifications and architecture components for G2P payments use cases. We will also integrate and test the APIs for G2P payments use cases in an integrated sandbox adhering to the G2P Connect and GovStack Payments building block specifications.

These valuable resources will then enable any country to implement G2P payments with digital sovereignty and minimal effort. Countries can choose to use our open specifications to make existing systems compatible, procure an open-source DPG, or even a proprietary solution compliant with the specifications.

### 8.1.2 Beneficiary Onboarding - Account Mapper APIs&#x20;

Once a new G2P beneficiary is onboarded by a G2P Program and assigned a Functional ID, they can be added to the Account Mapper in Payments BB after their eligibility for the social benefit program has been verified.

As the number of beneficiaries can be large, the API supports the addition of beneficiaries in the mapper in bulk. This allows for efficient onboarding and management of multiple beneficiaries at once, streamlining the process and reducing the time required for handling individual beneficiary registrations.

The Register Beneficiary API is invoked by the Information Mediator BB, which is triggered when the Registration BB is registering beneficiaries into the Payments BB's ID Mapper.

&#x20;**a) Register Beneficiary Request()**

&#x20;This is the API that is called by the Information Mediator BB when the Registration BB in turn calls its API for registering beneficiaries into the ID Mapper of the Payments BB.

{% swagger src=".gitbook/assets/RegisterBeneficiaryRequest.yml" path="/identityAccountMapper/beneficiary" method="post" %}
[RegisterBeneficiaryRequest.yml](.gitbook/assets/RegisterBeneficiaryRequest.yml)
{% endswagger %}

**b) Register Beneficiary Response() - Callback**

This is the API that is called back by the Pay-BB to notify the Source BB via the IM BB that all or selected beneficiaries have been uploaded into the ID Mapper.

{% swagger src=".gitbook/assets/RegisterBeneficiaryResponse.yml" path="/callback" method="post" %}
[RegisterBeneficiaryResponse.yml](.gitbook/assets/RegisterBeneficiaryResponse.yml)
{% endswagger %}

### 8.1.3 Update Beneficiary Details&#x20;

This is the API that is called by the Information Mediator BB when the Registration BB in turn calls its API for registering beneficiaries into the ID Mapper of the Payments BB.

**a) Update Beneficiary Request()**

This interface is to be called by the Registry BB (also referred to as Source BB) when an update to either the Payment Modality or Financial Address is required. Payee Functional ID is not updateable and is only part of this call to identify the individual record that needs updating.

{% swagger src=".gitbook/assets/UpdateBeneficiaryRequest.yml" path="/identityAccountMapper/beneficiary" method="put" %}
[UpdateBeneficiaryRequest.yml](.gitbook/assets/UpdateBeneficiaryRequest.yml)
{% endswagger %}

**b) Update Beneficiary Response()**

This is the API that is called back by the Pay-BB to notify the Source BB via the IM BB that all or selected beneficiaries have been successfully uploaded into the ID Mapper.

{% swagger src=".gitbook/assets/UpdateBeneficiaryResponse.yml" path="/callback" method="post" %}
[UpdateBeneficiaryResponse.yml](.gitbook/assets/UpdateBeneficiaryResponse.yml)
{% endswagger %}

### 8.2.4 Bulk disbursement APIs

**a) Bulk Payment()**

This API is to be exposed by the Payments BB and Payer FSP; it will be called by the Source BB or Payments BB to handover a batch of credit instructions to be processed.

{% swagger src=".gitbook/assets/BulkPayment (1).yml" path="undefined" method="undefined" expanded="true" fullWidth="false" %}
[BulkPayment (1).yml](<.gitbook/assets/BulkPayment (1).yml>)
{% endswagger %}

**b) BulkPayment\_StatusPush()**&#x20;

This API is expected to be invoked by Payer Bank to the Payments BB to provide updates status of a batch or individual credit instructions. This API is a callback. This API will also serve BulkPayment\_Status\_Update() from Payments BB to Source BB If the callback fails, the same response can be obtained by directly calling this API ( with case 2 endpoint)



**c) Payment\_Status\_Check Request()**&#x20;

This API is to be invoked by the Source BB to the Payments BB in case the Source BB (SBB) does not receive some completed transactions in bulk payment status updates callback or batch by batchId polling from the Payments BB. Then SBB can run a query for a single beneficiary payment status check.



## 8.2 Voucher Management APIs <a href="#docs-internal-guid-9cf2815f-7fff-7e39-e7ed-207134468ff3" id="docs-internal-guid-9cf2815f-7fff-7e39-e7ed-207134468ff3"></a>

The first API in the section below is used to request for a voucher with a specific value, currency, and purpose. The server responds with a voucher number, serial number, and expiry date. The second call activates the pre-activated voucher. The third call processes voucher redemption, crediting the merchant if valid. The fourth APIs allow for voucher status checks.

### 8.2.1 VoucherPreActivation&#x20;

#### a) VoucherPreActivation()

The VoucherPreActivation API is used by non-Payment Building Blocks in the GovStack Framework to request for a voucher to be used. This call reserves the voucher (for a period, which is to be implemented). This API requests a single voucher from the voucher server that can be used for a future redemption process. The caller sends an amount, a voucher group (depending on the use case), the currency, and the name of the calling GovStack Building Block. If the API call is successful, the Payment Building Block will respond with a voucher number, a voucher serial number, and an expiry date.

{% swagger src=".gitbook/assets/VoucherPreactivationRequest.yml" path="/vouchers" method="post" %}
[VoucherPreactivationRequest.yml](.gitbook/assets/VoucherPreactivationRequest.yml)
{% endswagger %}

**b) Create\_Vouchers\_Response()**

Description This is the API called by the Voucher Engine to return Voucher Details once vouchers have been created in the Voucher Engine.

{% swagger src=".gitbook/assets/VoucherCreationResponse.yml" path="/voucher-details-return" method="post" %}
[VoucherCreationResponse.yml](.gitbook/assets/VoucherCreationResponse.yml)
{% endswagger %}

### 8.2.2 VoucherActivation  <a href="#docs-internal-guid-53943e9f-7fff-ee8a-93a6-10bc57857bd7" id="docs-internal-guid-53943e9f-7fff-ee8a-93a6-10bc57857bd7"></a>

#### a) Voucher\_Activation()

The VoucherActivation API is used by non-Payments Building Blocks in the GovStack Framework to activate a pre-activated voucher. This second function call is intended to ensure that the voucher is only activated when it is disbursed. This API requests for the activation of a voucher when the caller sends the voucher number to be activated. If the API call is successful, the activation is confirmed, and the voucher can now be used by the beneficiary.

{% swagger src=".gitbook/assets/VoucherActivate.yml" path="/vouchers" method="put" %}
[VoucherActivate.yml](.gitbook/assets/VoucherActivate.yml)
{% endswagger %}

For Batch voucher activation, the voucher activation APIS is used by calling Building Block to activate vouchers in bulk. This may be used for bulk social cash transfers where the recipients receive benefits by vouchers. The calling Building Block is responsible for generating the beneficiary file as well as dispensing the vouchers. The Payments Building Block is responsible for generating and redeeming the voucher codes. Both BBs will have had to have exchanged encryption keys during the implementation phase.

The file provided by the calling Building Block will typically contain a unique identifier, the amount of the voucher required, the currency of the voucher, and the voucher group. While the file format may vary, the recommended file format is an encrypted JSON file.

If the file is properly formatted, the Payments Building Block will respond with a file that contains the unique ID that was sent, the status, the voucher number, the voucher serial number, and the expiry date of the voucher. The response file will also be an encrypted file to ensure the appropriate security of the voucher number.

The calling building block will dispense the vouchers as needed using an appropriate delivery mechanism. The calling Building Block will also be responsible for any verification of the beneficiary during the redemption process. The description of the dispensing of the vouchers once the calling block has received it is outside the scope of the Payments Building Block.

**b) Voucher\_Activate\_Response()**

Description This is the response API called by the Voucher Engine to confirm the status of batch activation back to the calling BB.

{% swagger src=".gitbook/assets/VoucherActivateResponse.yml" path="/callback-url" method="post" %}
[VoucherActivateResponse.yml](.gitbook/assets/VoucherActivateResponse.yml)
{% endswagger %}

### 8.2.3 VoucherRedemption <a href="#docs-internal-guid-df8c2024-7fff-e374-7456-23db45c11b57" id="docs-internal-guid-df8c2024-7fff-e374-7456-23db45c11b57"></a>

The VoucherRedemption API is used by non-Payment Building Blocks in the GovStack Framework to redeem a voucher. The calling Building Block will capture the voucher number and the voucher serial number from the merchant point. The external Building Block will also acquire the merchant name and payment details from the merchant registry. The calling Building Block will then send the voucher number, the voucher serial number, the merchant’s name, and payment details. The Payment Building Block will verify that the voucher has been activated and has not been used or blocked or canceled. If so, the Payment Building Block will then send a payment request to the funding agency/Financial Services Provider. The Payment Gateway of the Payments Building Block will facilitate the debit of the funding account, and the credit of the merchant as well as handle any intermediary fees. Once the payment has been successfully done the Payment Building Block will mark the voucher as consumed and notify the merchant (and beneficiary if possible).

{% swagger src=".gitbook/assets/VoucherRedemption.yml" path="/vouchers" method="post" %}
[VoucherRedemption.yml](.gitbook/assets/VoucherRedemption.yml)
{% endswagger %}

### 8.2.4 VoucherStatus  <a href="#docs-internal-guid-14288f23-7fff-3b24-f10e-6fb6e3200147" id="docs-internal-guid-14288f23-7fff-3b24-f10e-6fb6e3200147"></a>

The VoucherStatus API is used by non-Payment Building Blocks in the GovStack Framework to check the status of a voucher. The calling Building Block will capture the voucher number and send it to the Payments Building Block to determine the status of a voucher. The Payments Building Block will respond with one of the statuses of Pre-Activated, Activated, Suspended, Blocked, or Not Existing.

{% swagger src=".gitbook/assets/VoucherStatus.yml" path="/vouchers/{serialNumber}" method="get" %}
[VoucherStatus.yml](.gitbook/assets/VoucherStatus.yml)
{% endswagger %}

### 8.2.5 VoucherCancellation  <a href="#docs-internal-guid-ceb6fd44-7fff-a34f-207b-6fc5be1638fa" id="docs-internal-guid-ceb6fd44-7fff-a34f-207b-6fc5be1638fa"></a>

**Voucher\_Cancellation()**

Description This API will be called by the Source-BB to update the status of the voucher(s), in the case of cancellation, the status code 03 is sent to the relevant field of the instruction array.

The VoucherCancellation API is used by non-Payments Building Blocks in the GovStack Framework to cancel a voucher. The calling Building Block will capture the voucher number and send it to the Payments Building Block to cancel the voucher.&#x20;



{% swagger src=".gitbook/assets/VoucherCancellation.yml" path="/vouchers" method="post" %}
[VoucherCancellation.yml](.gitbook/assets/VoucherCancellation.yml)
{% endswagger %}

***

**Voucher\_ Cancellation\_Response()**

Description Response API called by the Voucher Engine to confirm the cancellation of the voucher. The Payments Building Block will respond with a status of Cancelled, Already Cancelled, or Not Existing. The Voucher Cancellation will override the Blocked status and render the voucher permanently unusable.

{% swagger src=".gitbook/assets/VoucherCancellationResponse.yml" path="/vouchers/cancellation/confirmation" method="post" %}
[VoucherCancellationResponse.yml](.gitbook/assets/VoucherCancellationResponse.yml)
{% endswagger %}

## 8.3 Person-to-Government APIs (P2G) Bill Payments <a href="#docs-internal-guid-83db42bd-7fff-3768-b76a-9586be4ab890" id="docs-internal-guid-83db42bd-7fff-3768-b76a-9586be4ab890"></a>

The Bill Payments APIs allow government entities to accept bill payments from persons on digital platforms like mobile money and vouchers.

#### **8.3.1 billInquiryBiller**

This API is called to inquire about bill details from a Bill Aggregator or Govt Entity.

{% swagger src=".gitbook/assets/billInquiryRequest.yml" path="/bills/{billId}" method="get" %}
[billInquiryRequest.yml](.gitbook/assets/billInquiryRequest.yml)
{% endswagger %}

#### **8.3.2 billrInquiryResponse**

The Payment BB updates the Bill Aggregator or government entity on the status of the Request to Pay.

{% swagger src=".gitbook/assets/billInquiryResponse.yml" path="/bills/{billId}" method="post" %}
[billInquiryResponse.yml](.gitbook/assets/billInquiryResponse.yml)
{% endswagger %}

#### **8.3.3 markBillPayment**

This API marks a bill as paid.

{% swagger src=".gitbook/assets/markBillPpaymentRequest.yml" path="/billTransferRequests" method="post" %}
[markBillPpaymentRequest.yml](.gitbook/assets/markBillPpaymentRequest.yml)
{% endswagger %}

#### **8.3.4 billerRtpReq**

The Bill Aggregator or Govt Entity initiates a “Request to Pay” (RTP) through this API.

{% swagger src=".gitbook/assets/markBillPpaymentResponse.yml" path="/billTransferRequests" method="post" %}
[markBillPpaymentResponse.yml](.gitbook/assets/markBillPpaymentResponse.yml)
{% endswagger %}

#### **8.3.5 billerRtpReq**

{% swagger src=".gitbook/assets/billerRtpResponse.yml" path="/rtpUpdate" method="post" %}
[billerRtpResponse.yml](.gitbook/assets/billerRtpResponse.yml)
{% endswagger %}

#### **8.3.6 rtpStatusUpdate**

This API allows the Biller or Aggregator to inquire about the status of its RTP.

{% swagger src=".gitbook/assets/rtpStatusUpdateRequest.yml" path="/transferRequests/{transferRequestId}" method="get" %}
[rtpStatusUpdateRequest.yml](.gitbook/assets/rtpStatusUpdateRequest.yml)
{% endswagger %}

#### **8.3.7 rtpStatusUpdateResponse**

This API allows the Biller or Aggregator to receive the status of its RTP.

{% swagger src=".gitbook/assets/rtpStatusUpdateResponse.yml" path="/transferRequests/{transferRequestId}" method="post" %}
[rtpStatusUpdateResponse.yml](.gitbook/assets/rtpStatusUpdateResponse.yml)
{% endswagger %}
