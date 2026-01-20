# Business to Government (B2G) Use Case

#### Overview: <a href="#overview-.1" id="overview-.1"></a>

The broad definition of this scenario is payments made from a business to a Government.  These can be narrowed down to a set of high-level areas:

* Loan Repayments – Where the Business makes a repayment to a Government either in whole or in parts with or without interest.
* Taxation – Where the Business makes a payment to the Government to cover a taxation obligation either one off or regular.
* Services - Where the Business makes a payment to the Government for a service either one off or regular such as refuse collection.
* Fines - Where the Business makes a payment to the Government to cover a fine
* Customs Duties - Where a Business needs to pay customs duties (this scenario really opens up consideration of cross border and forex)

It may be important to consider cross-border/multi-currency payments depending on if the business is in the same country/region as the government.

#### Example 1: Business Tax Payments

In a country the government has an online tax program where business's complete their tax returns digitally. &#x20;

Once the tax submission has been made by the business it calculates the Tax due and offers the business 2 ways to pay.&#x20;

1. Pay in a Single Installment online
2. Pay in multiple instalments over a period of time.

For option 1. the Government tax system invokes the payment Building Block with and RTP (Request to Pay) instruction.  The Payments BB then allows for immediate payment via the Businesses FSP (Financial Service Provider) and reconciles the payment with the Government Tax system

For option 2. the Goverment tax system splits the payment due into a number of payments and issues a number of bills with a unique reference number consisting of the biller identifier and a unique ID, using the Bill Generation workflow. As each payment is made by the business the Business FSP makes these payments by using the Bill Inquiry and payment workflows

The Payments building block process's these Bill Payments works  in a similar fashion to a P2G functionality. &#x20;

#### Key Points:

The existing Payments Building Block Functional requirements for P2G can be used for a B2G use case along with associated APIs
