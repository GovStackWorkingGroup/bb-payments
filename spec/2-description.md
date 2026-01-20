---
description: This section provides context for this Building Block.
---

# 2 Description

The Payments Building Block enables digital financial payments to be tracked, evaluated, initiated, validated, processed, logged, compared and verified against budget. This Building Block also provides interoperability with connections to the various external applications that need payment services in order to trigger transitions in their own workflow. Payment services generally interface through gateways to regulated financial entities such as banks, credit facilities, and insurance companies. To help users easily complete payment transactions and learn if their transaction succeeded or failed, it converts heterogeneous interface protocols, formats, and user interfaces to a standard set of common interfaces and formats. It can also help in tracking the costs of commodity and equipment purchases to optimize budgets.

The Payments Building Block consists of components that enable multiple use cases in a generic manner. The use cases include Government to Person (G2P), Person to Government (P2G), Government to Business (G2B), and Business to Government (B2G). The existing commercial Payments schemes are heterogeneous across regions and countries, the Payments Building Block assumes that some components are optional when considering implementation. The Payments Building Block covers components that can be used to deliver the key functionalities and the connections to existing systems in the market, but does not contemplate building a new Payments scheme.  The Payments Building Block supports multicurrency payments in countries where there is more than one currency used. Multicurrency payments are supported based on the independent multicurrency model, where there is no exchange rate conversion. For more information on the multicurrency payments refer to: [Specification for In-Country Multicurrency Payment Systems for governments, persons and businesses](https://govstack-global.atlassian.net/wiki/spaces/GH/pages/1014693904/Payments+BB+Multicurrency?force_transition=f336d546-d52d-486b-8e52-b20a721d5890).

![Next Generation G2P Payments: Building Blocks of a Modern G2P Architecture (page 16).](.gitbook/assets/image21.png)

### Financial Inclusion, Banks, and Mobile Money Accounts <a href="#docs-internal-guid-40250f7c-7fff-0e7b-4de3-b9ba0376cbfc" id="docs-internal-guid-40250f7c-7fff-0e7b-4de3-b9ba0376cbfc"></a>

Financial inclusion strategies have largely been based on growing access to regulated accounts. These were traditionally understood to be bank accounts, in recent years Mobile Money (MoMo) accounts have greatly increased transactional account access. These MoMo accounts are often, but not always, treated as secondary to the banking system and lack interoperability.

[According to GSMA](https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2021/03/GSMA_State-of-the-Industry-Report-on-Mobile-Money-2021_Summary.pdf), globally registered mobile money accounts stood at 1.2 billion in 2020, transacting an average of over $2 billion per day, mobile money has grown to become the leading payment platform in a growing number of emerging markets. Today, there are more mobile money accounts in Sub-Saharan Africa than there are bank accounts. Indeed, during the pandemic, demand for mobile money services increased among businesses, governments, and new services that previously relied on cash or other payment channels.

There are currently active discussions in many markets on the need for the integration of mobile money into existing national infrastructure. While the integration of mobile money into existing schemes and infrastructure has the potential to create value for all stakeholders in the ecosystem, many legacy payment systems may not be suitable for mobile money integration in their current state. As an example, many existing interbank switches do not support mobile money as a core feature because of legacy technical architecture. What is often missing is the essential capability of the switch to handle high-volume, low-value ﬂows with the mobile number (Mobile Station Integrated Services Digital Network) as identiﬁer for routing and address resolution hence the need for integration. Recent industry developments offer solutions designed to solve many of the issues around the switching of mobile money.

Mobile money providers, regulators, infrastructure providers, and other financial system players should seek to engage in any potential interoperability initiatives from an early stage to ensure optimal payment system design for all parties. Should existing infrastructure be used, a thorough assessment should be conducted, with input from all parties, to ensure appropriate governance, commercial, and technical standards are incorporated. Mandating interoperability within a short time frame removes opportunities for a thoughtful and holistic analysis of commercial sustainability. Requiring immediate interoperability can also delay or hamper the uptake of interoperable transactions, and mobile money services altogether. This is a particular risk in contexts where regulators or governments impose immediate connections to a centralized hub. Mobile money providers should be encouraged to connect when their service is ready. However alternative modalities of payment such as cash vouchers can also be considered in scenarios of low-resource regions that lack modern infrastructure and a volume of mobile phone users. Also, in countries where mobile money providers are not connected to a payment switch, aggregators can enable the flow of funds between multiple financial service providers including banks and non-banks. While aggregators may not be as efficient and scalable as switches, they can help solve interoperability issues in the short and medium term.

## Payments Building Block Capabilities <a href="#docs-internal-guid-4991f911-7fff-c25a-2bb0-29f7dbf71bcb" id="docs-internal-guid-4991f911-7fff-c25a-2bb0-29f7dbf71bcb"></a>

Generally, the Building Block is supportive of multiple types of payment use cases where the Government is one of the parties:

* **Government to people (G2P)**
  * Payment where the payer is a government and the payee is an individual e.g. Social benefits disbursement, government salary payments, Conditional and [Unconditional Social Cash Transfers](https://solutions.dial.community/use_cases/unconditional_social_cash_transf/use_case_steps/outreach_communications)).
* **People to Government (P2G)**
  * Payment where the payer is an individual and the payee is a government. P2G payments can be government initiated, for instance, in the case of payments for registrations for government services. For bill payments and payments for government services directly by the person, the system should provide the person with the flexibility to choose which payment instrument to use (eg. mobile money, bank transfer or card payments). (e.g. payment of taxes, payment[ Registration for Postpartum and Infant Care](https://github.com/GovStackWorkingGroup/BuildingBlockAPI/issues/1), payment of school fees, driving license, utility payments).
* **Government to Business (G2B)**
  * G2B payments include tax refunds, goods and services purchases, subsidies, contract payments, benefits, and loans.
* **Business to Government (B2G)**
  * B2G payments include paying taxes and fees.
* **Government to Government (G2G)**
  * Payments between two government entities (i.e. between Ministries/Departments and public sector institutions).

Government to Government (G2G) are not covered in this specification and will be covered in a later phase.

## Government-to-Person Payment Principles <a href="#docs-internal-guid-c38a9447-7fff-fcb5-e6eb-c6419072f004" id="docs-internal-guid-c38a9447-7fff-fcb5-e6eb-c6419072f004"></a>

The implementation of the Payments Building Block should adhere to the following principles, particularly as it relates to Government-to-Person (G2P) payments:

### Beneficiary/Recipient-related Principles

* Beneficiaries can receive their payment through a fully functional account that allows them to save and make payments using an associated payment instrument with general acceptance.
* They can choose the payment service provider and payment instrument through which they receive their payments based on their informed choice; they can use the same account for multiple G2P payments, make Person-to-government (P2G) payments and easily switch if desired.
* Onboarding to their payment method is low cost and easy with account opening requirements that are available to recipients and with no opening fees; a payment instrument is provided to the recipient at no cost.
* The Integrated Financial Management Information System (IFMIS) is used to process government payments against budgetary allocations. It supports:
  * the Treasury Single Account (TSA) that aggregates all incoming government receipts and disburses all government payments;
  * budget management to ensure budget compliance, tracking, and reporting. The IFMIS provides the Ministry of Finance with a unified view of the government’s budget execution.
* The payment instrument is easy-to-use and generally accepted, and the overall costs for using it do not result in increased costs for the beneficiary in comparison to other forms of payment.
* Beneficiaries are well informed, their account/data is protected, and have access to redress. They know when, where, and how many payments will be made and understand how their payment method works, its costs, how to use their payment instrument, and how to access their payment. They can access and know how to access effective grievance redressal mechanisms, their funds are secured, and their data privacy is ensured.
* Beneficiaries can easily access their funds. They are able to cash out their funds at any time at a wide range of conveniently close financial access points. At a reasonable and clearly communicated withdrawal fee or at no cost.
* Beneficiaries are included regardless of gender, race, or other immutable characteristics, through at least one of the payment methods used; gender gaps are considered in the design.

### Infrastructure and Systems-related Principles

* The leveraged infrastructures and systems are shared across G2P programs and payment streams, as well as other use cases, avoiding the implementation of systems to exclusively deliver G2P payments. They are scalable and have cyber security arrangements in place.
* Common ID provides access to multiple programs; the national ID system has high coverage and quality; it allows government agencies and payment service providers to validate recipients’ identities; it enables data sharing across government agencies.
* Payment processing systems unlike social protection management information systems, pension, and payroll systems will not include gender-disaggregated data.
* The payment systems are interoperable to maximize the potential of the available infrastructure to recipients; interoperability arrangements exist for Integrated Financial Management Information System (IFMIS), Treasury Single Account (TSA), banks, and non-banks covering most channels and instruments.
* There is no manual intervention in the disbursement process and the entire payments flow is Straight-Through-Processing, including the reconciliation of payments. Payments are made without delays.

### Payment Services Provider-related Principles

* Payment service providers have a strong and long-term, predictable business case or incentives to deliver payments and provide choice.
* A large variety of bank and non-bank financial institutions operating in a competitive market are used to deliver G2P payments.
* Agents of bank and non-bank financial institutions are accessible to G2P payment recipients.

## Mapping Based on Level of Maturity <a href="#docs-internal-guid-03083e3a-7fff-0a23-35b3-cf8f18b3f1a2" id="docs-internal-guid-03083e3a-7fff-0a23-35b3-cf8f18b3f1a2"></a>

The [DIAL use cases](https://exchange.dial.global/use_cases) can be mapped to the Payments Building Block capabilities as follows.

<table data-header-hidden><thead><tr><th></th><th width="168"></th><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Capabilities</strong></td><td><strong>Payment Infrastructure Scenario</strong></td><td><strong>DIAL User journey</strong></td><td><strong>Use Cases</strong></td><td>Destination Channel</td></tr><tr><td>G2P</td><td>Scenario 1-4 &#x26; 6</td><td><p>Payment - Unconditional Social Cash Transfer (direct payment based on family relationship)</p><p><br></p><p><a href="https://solutions.dial.community/use_cases/unconditional_social_cash_transf">Payment - Unconditional Social Cash Transfer (bank payments)</a></p><p><br></p><p>Payment - Unconditional Social Cash Transfer (non-electronic/cash payments)</p></td><td><p>a). Beneficiary payment, Incentive payment to mother.</p><p><br></p><p>b) Government Salary payment</p><p><br></p><p>c) Unconditional cash transfer</p></td><td>Voucher payment, Mobile Money, direct bank transfer</td></tr><tr><td>P2G</td><td>Scenario 1-4 &#x26; 6</td><td><a href="https://solutions.dial.community/use_cases/postpartum_and_infant_care">Postpartum care</a></td><td>Payment - registration of birth (Postpartum and Infant Care)</td><td>Mobile Money.</td></tr></tbody></table>

## Payment Infrastructure Deployment Scenarios

### Regional Switch vs Country Switch <a href="#docs-internal-guid-cd102025-7fff-69cb-65c6-c81f89b706c2" id="docs-internal-guid-cd102025-7fff-69cb-65c6-c81f89b706c2"></a>

A Payment Switch is the software and hardware system that provides routing between regulated entities in a Payments Scheme.

Domestic payment switches have specific economic characteristics and may not reach adequate economies of scale. Whilst costs can be passed onto customers, without sufficiently low charges, volumes may remain perennially low. Domestic switches facing this scenario thus remain under-utilized, costly, and under-capitalized. In recent years, the concept of Regional payment switches has gained some traction with new efforts realized or underway across the Southern African Development Community (SADC), West African Monetary and Economic Union (UEMOA), East African Community (EAC), and Economic and Monetary Community of Central Africa (CEMAC).

Regional switches (which may serve as a common resource for multiple countries) often rely on pre-existing arrangements between Central Banks, regional Commercial Banks, or a combination thereof. When multiple currencies are in play, a reference currency or a basket of currencies must be chosen for regional settlement accounts to be viable. Settlement arrangements are vital to the viability of a regional switch. A Regional switch may also integrate financial transactions from countries that already have domestic payment switches (like a switch of switches).

Regional switches may take on any and all use cases or may be restricted to specific use cases, for example, Large Value Transfer or B2B trade. Because regional trade drives economic activity, regional switches often go hand in hand with the portability of business and consumer credentials (i.e. relating to Customer Due Diligence), trade policy, and movement of labor.

### Payment infrastructure scenarios

The Payments Building Block sits between the government account systems (i.e. at the Ministry of Finance or Central Bank) and the public or private switching available in the market. As such the Payments Building Block is assumed in each, but not shown. The primary focus in describing these scenarios is on the relationship between payment schemes, banking institutions, and government institutions. This section describes what is available in-country.

| **Infrastructure Scenarios**                                                                                                                                                                                       | **Suggested Approach**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Payment Infrastructure Scenario 1</strong><br>Regional Switch (or a switch of switches) connects financial service providers including banks and non-banks in different countries in a region.</p>      | Government should leverage the regional payments switch (scheme) to enable all use-cases. This may also imply important developments of a standardized Customer Due Diligence (CDD). Note that while a State owned bank is shown in the diagram below, the option exists for the Government to designate a specific Commercial bank, or to have the funds flow directly from the Ministry of Finance (Treasury) assuming such Treasury payment functionality can be supported by the Regional Switch. |
| <p><strong>Payment Infrastructure Scenario 2</strong><br>A payment switch connecting financial service providers such as banks to non-banks including mobile money providers is in place and actively working.</p> | Government should leverage the existing switch to enable payments use-cases to reach mobile money providers. There may be a State Owned Bank (2-A) or not (2-B).                                                                                                                                                                                                                                                                                                                                      |
| <p><strong>Payment Infrastructure Scenario 3</strong><br>A payment switch is in place in the country or is in the process to be deployed but non-banks, including mobile providers are not connected to it.</p>    | <p>Government should leverage third-party aggregators or bilateral integrations to enable payment use-cases to reach mobile money providers.</p><p><br></p>                                                                                                                                                                                                                                                                                                                                           |
| <p><strong>Payment Infrastructure Scenario 4</strong><br>A payment switch is not place or in the process of being deployed</p>                                                                                     | Government should leverage third-party aggregators or bilateral connections to enable payment use-cases to reach mobile money providers                                                                                                                                                                                                                                                                                                                                                               |
| <p><strong>Payment Infrastructure Scenario 5</strong><br>Government makes G2P payments using Central Bank Digital Currency (CBDC) .</p>                                                                            | The Central Bank distributes the funds for the CBDC accounts via regulated entities (e.g. Payment Service Providers).                                                                                                                                                                                                                                                                                                                                                                                 |
| <p><strong>Payment Infrastructure Scenario 6</strong><br>Citizens have CBDC accounts directly with the Central Bank or other accounts with other payment service providers</p>                                     | The Central Bank sets up limited accounts for each person, providing a base level of access and functionality. Such accounts may be denominated in country currency (fiat) or CBDCs. This scenario places more responsibility on government structures and is not often considered (outside of Postal Banks and the like).                                                                                                                                                                            |

Under each of these scenarios, there are different setups possible that relate the key roles played by the Programmatic Ministries (e.g. Ministry of Education or Pension Program), the Ministry of Finance, the Central Bank, and the existing Payment Switch.

The flow of funds and the flow of data are separate but equally important and they have a number of interactions.

#### Payment Infrastructure Scenario 1 <a href="#docs-internal-guid-63a4041d-7fff-d235-eb9b-1b216215b6e9" id="docs-internal-guid-63a4041d-7fff-d235-eb9b-1b216215b6e9"></a>

Regional Switch (or a switch of switches) connects financial service providers including banks and non-banks.

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image19.png)

#### Payment Infrastructure Scenario 2-A <a href="#docs-internal-guid-d25fd375-7fff-8960-0f04-e0264cd1ef40" id="docs-internal-guid-d25fd375-7fff-8960-0f04-e0264cd1ef40"></a>

Scenario 2-A and Scenario 2-B cover the concept of separating flows of data from accounting flows.

The Central Bank receives the funds transfer advice from the Treasury and the data from the Ministry of Health and does the steps of breaking it into bulk, based on rules of capacity of source and destination systems. Payments are then routed “on-us” or to the external financial providers “off-us” via a payment switch or similar mechanism.

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image18.png)

#### Payment Infrastructure Scenario 2-B <a href="#docs-internal-guid-17ea0a05-7fff-b78a-f66d-b1db5a50b0ac" id="docs-internal-guid-17ea0a05-7fff-b78a-f66d-b1db5a50b0ac"></a>

The Central Bank plays a key role as a participant in the Payment scheme and routes the payment details and funds via a shared service of the payment switch. The same logic of break-bulk applies and with all transactions effectively “off-us”.

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image31.png)

#### Payment infrastructure scenario 3 <a href="#docs-internal-guid-f20210d1-7fff-6f46-031b-a7efd42f0e27" id="docs-internal-guid-f20210d1-7fff-6f46-031b-a7efd42f0e27"></a>

Government should leverage third-party aggregators to enable payment use cases to reach mobile money providers

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image5.png)

#### Payment Infrastructure Scenario 4 <a href="#docs-internal-guid-f33d82c3-7fff-6366-eea9-62a6308c58de" id="docs-internal-guid-f33d82c3-7fff-6366-eea9-62a6308c58de"></a>

A payment switch is not in place or in the process of being deployed. Government should leverage third-party aggregators or bilateral connections to enable payment use cases to reach mobile money providers. In the bilateral connection scenario, each mobile money provider in the country would connect to the government portal through APIs, enabling a seamless transfer of funds to end users (in the case of G2P payments) or the receiving of funds from end users (in the case of P2G payments) and facilitate reporting, reconciliation and settlement processes.

![Payments building block diagrams.drawio - diagrams.net](<.gitbook/assets/image17 (1) (1) (2).png>)

#### Payment Infrastructure Scenario 5 <a href="#docs-internal-guid-69c7a646-7fff-5eeb-a45c-645b0d3ee524" id="docs-internal-guid-69c7a646-7fff-5eeb-a45c-645b0d3ee524"></a>

The Central Bank mints digital currency and distributes funds via regulated entities (e.g. Payment Service Providers), and in the case of G2P sends funds to destination accounts known to the Ministry of Finance. Account information is unitary and unique for all beneficiaries (e.g. citizens) but the Central Bank does not “hold” account balances on an individual basis.

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/image14.png)

#### Payment Infrastructure Scenario 6 <a href="#docs-internal-guid-4df537db-7fff-1474-df07-653ff0c8025e" id="docs-internal-guid-4df537db-7fff-1474-df07-653ff0c8025e"></a>

The Central Bank directly provides Digital Accounts for all people (Citizens) and Treasury routes funds to the relevant accounts (uniquely and unitarily held by people).

![Payments building block diagrams.drawio - diagrams.net](.gitbook/assets/Picture1.jpg)

* For this payment use case, the most common scenarios currently in place are 1 to 4, scenario 5 and 6 could be envisaged later.
* In Scenario 2B it is assumed that the Payment Switch is run by the Central Bank.
* In Scenario 2A and 3, it is assumed that the Payment Switch is an independent part outside the Central Bank.
