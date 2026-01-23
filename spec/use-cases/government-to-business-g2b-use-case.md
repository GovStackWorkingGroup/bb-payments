# Government to Business (G2B) Use Case

#### Overview: <a href="#overview" id="overview"></a>

The broad definition of this scenario is payments made to a business from a Government, these are assumed to be single currency.  These can be narrowed down to a set of high-level areas:

* Loans – Where the Government makes a payment to a business with an expectation of repayment in whole or in parts with or without interest.
* Allowances- Where the Government makes a conditional payment to a business. E.g. Agriculture allowance.
* Unconditional Payments- Where the Government makes an unconditional payment to a business. E.g. disaster relief.
* Rebates and Repayments – Where the Government makes a payment based on payments previously having been received, e.g. tax refunds.
* Payments for Services - Where the Government pays a business for a service or work done.
* Financial Aid to NGOs - Where the Government pays an NGO financial aid
* Subsidies - This could be considered similar to Allowances but may bring in a dimension of being ringfenced in what it can be spent on or which merchants it can be spent with.  This may bring in an element of Vouchers for consideration.

#### Example 1: Agriculture Subsidies <a href="#example-workflows" id="example-workflows"></a>

In a country the government wants to encourage responsible farming and water management practices to produce a sustainable agricutural industry in the country.  As such Farmer may register for a Subsidie (Grant) payable to help them with the costs of this transformation.  This grant is paid out monthly for registered farmers.&#x20;

When the farmer applies to the grant program they do so through the Government Registration Portal which captures key information such as name of farm, address of farm, size of farm to establish the payments are valid.&#x20;

At the end of the registration process the Registration portal working with the ID BB creates a functional ID for the farmer and captures the payments details which are passed and stored in the Payments BB ID account Mapper.

{% hint style="warning" %}
Note currently the ID BB only covers Individual Identities rather than legal entity identities, this functionality is on the ID BB roadmap
{% endhint %}

At the end of the month the Government Agriculture Subsidy program sends a bulk file to the payments building block with the Functional ID of each farmer to be paid and the amount to be paid.

The Payments building block process's this bulk disbursement in a similar fashion to a G2P bulk disbursement.  Using the ID Account Mapper to look up the relevant financial details for each Functional ID, validating sufficient funds exist in the government account and then sending financial transaction instructions to the Government Bank Core Banking System in appropriate sized batches.  The status of each transaction is returned to the Payments Building Block which can then be investigated by the Government systems if needed to understand the status of batches, sub-batches and individual transactions.

#### Key Points:

The existing Payments Building Block Functional requirements for G2P can be used for a G2B use case along with associated APIs
