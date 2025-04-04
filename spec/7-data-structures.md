---
description: >-
  This section provides information on the core data structures/data models that
  are used by this Building Block.
---

# 7 Data Structures

### 7.1 Account Mapper

**Beneficiary onboarding**

<table data-header-hidden><thead><tr><th width="219"></th><th width="147"></th><th width="69"></th><th></th></tr></thead><tbody><tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>M/O</strong></td><td><strong>Description</strong></td></tr><tr><td>requestID</td><td>String (12)</td><td>M</td><td>Globally unique ID</td></tr><tr><td>beneficiaries</td><td>Object</td><td></td><td>JSON Array</td></tr><tr><td>payeeIdentity</td><td>String (20)</td><td>M</td><td>The functional Id of the beneficiary.</td></tr><tr><td>paymentModality</td><td>String (2)</td><td>O</td><td><p>00 for Bank Account</p><p>01 for Mobile Money</p><p>02 for Voucher</p><p>03 for Digital Wallet</p><p>04 for Proxy</p></td></tr><tr><td>bankingInstitutionCode(BBIC)</td><td>String (11)</td><td>C</td><td>Beneficiary Bank Institution code that will receive the address. This is conditional as it will only be present in case of bank account, mobile money account and digital wallet ID</td></tr><tr><td>financialAddress</td><td>String (30)</td><td>O</td><td>Destination Account Number, ideally an IBAN if available otherwise wallet destination accounts could be phone numbers as well, other Financial Addresses such as Aliases etc.</td></tr></tbody></table>

**Onboarded beneficiary**

<table data-header-hidden><thead><tr><th width="216"></th><th width="155"></th><th width="70"></th><th></th></tr></thead><tbody><tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>M/O</strong></td><td><strong>Description</strong></td></tr><tr><td>requestID</td><td>String (12)</td><td>M</td><td>Globally unique ID</td></tr><tr><td>registerRequestID</td><td>String (12)</td><td>M</td><td>Referenced GUID of original request by Source BB to register a beneficiary.</td></tr><tr><td>rumberFailedCases</td><td>Number</td><td>M</td><td>The number of cases failed. 0 if none, otherwise integer value</td></tr><tr><td>failedCases</td><td>Object</td><td>O</td><td>JSON Array containing the list of FunctionalIDs and Payment Modalities that were not updated in the ID Mapper.</td></tr><tr><td>payeeIdentity</td><td>String (20)</td><td>M</td><td>The functional Id of the beneficiary.</td></tr><tr><td>bankingInstitutionCode</td><td>String (11)</td><td>C</td><td>Beneficiary Bank Institution Code (BBIC).The beneficiary bank institution code. This is conditional as it will only be present in case of bank account, mobile money account and digital wallet ID</td></tr><tr><td>paymentModality</td><td>String (2)</td><td>M</td><td><p>00 for Bank Account</p><p>01 for Mobile Money</p><p>02 for Voucher</p><p>03 for Digital Wallet</p><p>04 for Proxy</p></td></tr><tr><td>failureReason</td><td>String(100)</td><td>O</td><td>Description of why this particular record failed to add</td></tr></tbody></table>

### **7.2 Bulk disbursement**

**Bulk Payment fields**

<table data-header-hidden><thead><tr><th width="208"></th><th width="137"></th><th width="76"></th><th></th></tr></thead><tbody><tr><td>Field</td><td>Type</td><td>M/O</td><td>Description</td></tr><tr><td>batchId</td><td>String(50)</td><td>M</td><td>BatchID for sub-batch that is being dispatched to this specific receiving bank.</td></tr><tr><td>destinationDFSPID</td><td>String (11)</td><td>M</td><td>BIC of the receiving bank.(Payee)</td></tr><tr><td>creditInstructions</td><td>Object</td><td>M</td><td>JSON Array of all instructions that require to be credited after pre-validation has occurred.</td></tr><tr><td>instructionID</td><td>String (16)</td><td>M</td><td>Individual ID for each instruction in the Credit Batch generated by the Payments Building Block</td></tr><tr><td>financialAddress</td><td>String (20)</td><td>M</td><td>Destination Account Number, ideally an IBAN if available otherwise wallet destination accounts could be phone numbers as well. (Payee Identifier)</td></tr><tr><td>amount</td><td>Float</td><td>O</td><td>Amount to be Credited</td></tr><tr><td>currency</td><td>String (3)</td><td>O*</td><td>Transaction Currency Code *(Currency is mandatory for multicurrency payments)</td></tr><tr><td>narration</td><td>String (50)</td><td>O</td><td>Description of Payment</td></tr></tbody></table>

### 7.3 Vouchers

```mermaid
erDiagram
Voucher-Agent-Merchant-Matrix  
    Voucher-Agent-Merchant-Matrix {
        Enum Voucher-Code
        Enum Agent-Code 
    }
    Merchant-AgentGroupCode ||--|| Voucher-Agent-Merchant-Matrix : part-of
        Merchant-AgentGroupCode { 
        Enum Code 
        String20 Type
        }
    Voucher-Group-Code ||--|| Voucher-Agent-Merchant-Matrix : part-of
    Voucher-Group-Code {
        Enum Code 
        String20 Type 
    }

```

```mermaid
erDiagram
Voucher ||--|| Issuance : have  
    Voucher {
        string16 VoucherID
        string10 SerialNumber
        string44 SecretHash
        string08 CreationDTTM
        string16 CreatorID
        string03 GroupCode
        string03 Currency
        Float Amount
        string08 ExpiryDTTM
    }
    Issuance {
        string16 VoucherID
        string16 BeneficiaryID
        string08 ActivationDTTM
    }
    Redemption-Table ||--|| Voucher : have
    Redemption-Table {
        string16 VoucherID
        string16 Agent-MerchantID
          string08 Redemption_DTTM
    }
    Merchant-AgentGroupCode ||--|| Voucher : contains
        Merchant-AgentGroupCode { 
        Enum Code 
        String20 Type
        }
    Voucher-Group-Code ||--|| Voucher : contains
    Voucher-Group-Code {
        Enum Code 
        String20 Type 
    }
Voucher-Status ||--|| Voucher : contains 
Voucher-Status {
    string16 VoucherID
    string02 Status
}   

```

**Voucher activation**

<table data-header-hidden><thead><tr><th width="204">Name</th><th width="136">Type</th><th width="318">Description</th><th>Notes</th><th data-hidden></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td><td><strong>Required</strong></td></tr><tr><td>Vouchers ID</td><td>Int64</td><td>Unique voucher identifier</td><td></td><td>yes</td></tr><tr><td>Voucher_Number</td><td>Varchar</td><td>Secret voucher number</td><td></td><td>Yes</td></tr><tr><td>Voucher_serial_no</td><td>Varchar</td><td>Unique voucher identifier for external parties</td><td></td><td>Yes</td></tr><tr><td>Currency</td><td>Varchar</td><td>Voucher currency</td><td></td><td>Yes</td></tr><tr><td>Create_date</td><td>Date</td><td>Date when the voucher was created</td><td></td><td>Yes</td></tr><tr><td>Activate_date</td><td>Date</td><td>Date when the voucher was activated</td><td></td><td>Yes</td></tr><tr><td>Expiry_date</td><td>Date</td><td>Date when voucher will expire</td><td></td><td>Yes</td></tr><tr><td>Voucher_group</td><td>Varchar</td><td>Voucher group</td><td></td><td>Yes</td></tr><tr><td>Status</td><td>Varchar</td><td>Status of the voucher (e.g. ACTIVATED, SUSPENDED, CONSUMED, etc.)</td><td></td><td>Yes</td></tr><tr><td>Value</td><td>Double</td><td>Value of the Voucher</td><td></td><td>Yes</td></tr></tbody></table>

**Voucher Groups**

<table data-header-hidden><thead><tr><th width="168"></th><th width="135"></th><th width="320"></th><th></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td></tr><tr><td>Vouchers ID</td><td>Int64</td><td>Unique voucher group identifier</td><td></td></tr><tr><td>Voucher_group</td><td>Varchar</td><td>Voucher group short code</td><td></td></tr><tr><td>Voucher_group_desc</td><td>Varchar</td><td>Voucher description</td><td></td></tr></tbody></table>

### 7.4 P2G

```mermaid
erDiagram
BillerLookupTable ||--|{ BillerDetails : contains  
    BillerLookupTable {
        string08 UniqueID
        Object BillerDetails
        string02 Status
        string03 BillerGroupCode
    }

    BillerDetails {
        string10 BillerName
        Object BillerFSPDetails
        Object EndPoints
        Enum ResponseCodeMapper
    }

Biller-Status |{--|| BillerLookupTable : contains 
Biller-Status {
    string16 BillerID
    string02 Status
}

EndPoints |{--|| BillerDetails : contains 
EndPoints {
string BillInquiry
string BillStatusUpdate
}
    
ResponseCodeMapper |{--|| BillerDetails : contains 
ResponseCodeMapper {
    string10 ListofBillerCodes
    string10 ListofIPSCodes
}

    BillerFSPDetails |{--|| BillerDetails : contains
    BillerFSPDetails {
        string10 BankInstitutionCode
        string30 FinancialAddress
    }
    BillerGroupCode |{--|| BillerLookupTable : contains
        BillerGroupCode { 
        Enum Code 
        String20 Type
        }

```

**Bill Payments**

<table data-header-hidden><thead><tr><th width="154"></th><th width="156"></th><th width="77"></th><th></th></tr></thead><tbody><tr><td><strong>Field</strong></td><td><strong>Type</strong></td><td><strong>M/O</strong></td><td><strong>Description</strong></td></tr><tr><td>requestId</td><td>String (2)</td><td>M</td><td><p>00 – Success</p><p>01 – Failure</p></td></tr><tr><td>code</td><td>String (200)</td><td>M</td><td></td></tr><tr><td>reason</td><td>String (12)</td><td>M</td><td>Echoed from Request</td></tr><tr><td>billID</td><td>String (20)</td><td>M</td><td>Echoed from Request</td></tr><tr><td>billDetails</td><td>Object</td><td>M</td><td>The relevant bill details including biller ID, Name, Bank Institutional Code (BIC), Status,<br>Amount with due date and after due date, *Currency (multicurrency use case)</td></tr><tr><td>billerId</td><td>String (10)</td><td>M</td><td>Biller Id</td></tr><tr><td>billerName</td><td>String (10)</td><td>M</td><td>Biller Name</td></tr><tr><td>billStatus</td><td>String (10)</td><td>M</td><td>Informs the status whether paid or unpaid</td></tr><tr><td>dueDate</td><td>Epoch</td><td>M</td><td></td></tr><tr><td>currency</td><td>string(3)</td><td>M</td><td>Needed in multicurrency operations</td></tr><tr><td>amountonDueDate</td><td>Integer</td><td>M</td><td>The amount at which the consumer needs to pay bill with due date.</td></tr><tr><td>amountAfterDueDate</td><td>Integer</td><td>M</td><td>Amount calculated after due date.</td></tr></tbody></table>

**Billers table**

The Biller Table may need to include the following fields:

| Fields/ Records | Description                                                    | Provided/ Generated By                   |
| --------------- | -------------------------------------------------------------- | ---------------------------------------- |
| Unique ID       | Prefix allocated to every entity directly registering with PBB | PBB Billing Module                       |
| Biller Details  | Records Biller Details                                         | Biller/ Aggregator                       |
| Biller FSP      | Recorded Biller’s Bank Details                                 | Biller/ Aggregator                       |
| Bill ID Details | Maximum number of Digits in Bill ID                            | Biller/ Aggregator                       |
| Biller Status   | Active/ Inactive                                               | PBB Billing Module                       |
| End-Points      | Addresses to send requests                                     | Biller/ Aggregator Technology Partner    |
| Response Codes  | Mapping of codes received and sent to Billers/ Agg.            | PBB Billing Module + Biller Tech Partner |
