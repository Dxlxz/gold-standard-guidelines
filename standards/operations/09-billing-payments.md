---
id: "billing-payments"
title: "Billing & Payments Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "billing", "payments"]
applies_to: ["general"]
related: ["internationalization", "email", "admin-internal-tools"]
legacy_number: 46
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 75678
provenance: baseline

---

Canonical placement: **Multi-Tenancy → Data & Database → Billing & Payments → API**. Data owns persistence primitives; this standard owns the **commercial/financial domain model and invariants** around prices, tax, invoices, subscriptions, entitlements, payments, refunds, disputes, and reconciliation.

# Billing & Payments Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- money representation;
- currencies;
- prices;
- price books;
- discounts;
- coupons;
- credits;
- tax;
- invoices;
- receipts;
- subscriptions;
- trials;
- billing cycles;
- prorations;
- usage-based billing;
- entitlements;
- payment methods;
- payment attempts;
- authorization;
- capture;
- settlement;
- refunds;
- credits;
- failed payments;
- dunning;
- disputes;
- chargebacks;
- idempotency;
- payment-provider webhooks;
- reconciliation;
- financial records;
- PCI scope;
- payment security;
- customer billing UX;
- operational controls;
- testing and auditability.

The objective is to make billing systems:

```text
Exact
Deterministic
Auditable
Idempotent
Reconciled
Currency-safe
Tax-aware
Provider-resilient
Secure
Recoverable
```

The core principle is:

> **Money is immutable financial fact, not ordinary application state. Every charge, invoice, refund, credit, subscription transition, and entitlement decision must have explicit semantics, durable evidence, and reconciliation.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected billing flow
Financial risk
Customer impact
Provider dependency
Compensating control
Owner
Review date
```

---

# 3. Billing Domain Boundaries

These are distinct concepts:

```text
Product
Plan
Price
Subscription
Invoice
Payment
Refund
Credit
Entitlement
```

They MUST NOT be collapsed into one record/state.

---

# 4. Product

A Product describes:

> **What is being sold.**

Examples:

```text
Pro workspace
10 GB storage add-on
Priority support
API usage
```

---

# 5. Plan

A Plan defines a commercial package or bundle of capabilities.

---

# 6. Price

A Price defines how a product/plan is charged.

Examples:

```text
USD 29 / month
MYR 300 / year
$0.02 per API call
$100 one-time
```

---

# 7. Subscription

A Subscription describes an ongoing commercial agreement.

It is not itself a payment.

---

# 8. Invoice

An Invoice describes an amount billed/owed for specified line items and period.

It is not equivalent to a successful payment.

---

# 9. Payment

A Payment describes movement or attempted movement of funds against an obligation.

---

# 10. Entitlement

An Entitlement describes what the customer is permitted to use.

It is an authorization/business-contract concept.

---

# 11. Entitlement Is Not Payment Status

Do not implement:

```text
payment_succeeded
→ user_can_use_feature
```

as the universal entitlement model.

---

# 12. Subscription Status Is Not Authorization

Do not implement:

```text
subscription.status == "active"
```

as the only access-control check.

Entitlements MUST be derived from explicit product policy.

---

# 13. Provider Objects Are Adapters

Provider-specific objects such as:

```text
PaymentIntent
Charge
Checkout Session
Subscription
Invoice
```

MUST NOT become the entire internal domain model.

---

# 14. Provider Independence

Internal records SHOULD preserve enough normalized business state to:

```text
audit
reconcile
migrate provider
recover from webhook gaps
explain customer state
```

without depending entirely on provider UI.

---

# 15. Provider Financial Authority

A payment provider remains authoritative for financial events occurring inside that provider.

The application MUST reconcile its internal state against those provider facts.

---

# 16. Internal Commercial Authority

The application remains authoritative for:

```text
product contract
entitlement policy
tenant ownership
customer relationship
business identifiers
internal pricing version
```

---

# 17. Money Representation

Money MUST be represented as:

```text
Amount
+
Currency
```

Never amount alone.

---

# 18. Currency Codes

Use standardized three-letter currency codes.

Examples:

```text
USD
EUR
MYR
JPY
KWD
```

---

# 19. Currency Is Data

Currency MUST NOT be inferred from:

```text
locale
country
symbol
browser language
```

---

# 20. Do Not Store Bare `$`

A currency symbol is presentation.

It is not a unique currency identifier.

---

# 21. Minor Units

Applications SHOULD normally represent processor-facing monetary values in integer minor units where compatible with the domain/provider.

Example:

```text
USD 10.99
→ 1099 minor units
```

---

# 22. No Float Money

Never use binary floating-point arithmetic for authoritative money calculations.

Avoid:

```text
price = 0.1 + 0.2
```

for financial computation.

---

# 23. Decimal Arithmetic

Where fractional monetary calculations are required internally, use an exact decimal representation.

---

# 24. Currency Exponent

Do not assume every currency has two decimal places.

Currency metadata MUST define the supported minor-unit relationship.

---

# 25. Currency Metadata

Maintain authoritative currency metadata such as:

```text
code
minor-unit exponent
supported payment methods
minimum charge if applicable
display behavior
```

---

# 26. Provider Currency Semantics

Provider-specific amount-unit requirements MUST be validated independently from generic currency metadata.

---

# 27. Amount Type

Money APIs SHOULD use explicit types such as:

```text
Money {
  amount_minor
  currency
}
```

rather than plain numbers.

---

# 28. Currency Match

Arithmetic between monetary amounts MUST require matching currency unless an explicit FX conversion occurs.

---

# 29. Invalid Arithmetic

Reject:

```text
USD 10 + EUR 5
```

without a conversion operation.

---

# 30. FX Conversion

Currency conversion MUST record:

```text
source amount
source currency
target amount
target currency
exchange rate
rate source
rate timestamp
rounding
```

when financially material.

---

# 31. Display Conversion

A UI-only estimated conversion MUST be clearly distinguishable from the authoritative billing currency.

---

# 32. Settlement Currency

Customer billing currency and provider settlement currency MAY differ.

They MUST be modeled separately.

---

# 33. Accounting Currency

Internal accounting/base currency MAY differ from both.

Do not conflate them.

---

# 34. Rounding

Every financial calculation MUST have explicit rounding rules.

---

# 35. Rounding Mode

The rounding mode MUST be deterministic.

Do not rely on programming-language defaults accidentally.

---

# 36. Rounding Boundary

Define whether rounding occurs:

```text
per unit
per line
per tax component
per invoice
```

according to tax/accounting requirements.

---

# 37. Rounding Consistency

The displayed invoice amount MUST equal the authoritative amount that is charged/owed.

---

# 38. Recompute Caution

Do not repeatedly recompute historical totals using today's pricing, tax, or rounding configuration.

---

# 39. Financial Snapshot

Important financial documents SHOULD snapshot the facts used at issuance time.

---

# 40. Price Identity

A Price MUST have a stable identifier.

---

# 41. Price Immutability

Once a price has been used in financial history, its commercial semantics SHOULD NOT be mutated in place.

---

# 42. New Price Version

Changing:

```text
amount
currency
billing interval
usage model
tax behavior
```

SHOULD generally create a new price/version.

---

# 43. Historical Pricing

Existing invoices/subscriptions MUST retain the historical price that governed them.

---

# 44. Display Name Changes

Non-financial metadata MAY be updated where history remains understandable.

---

# 45. Price Book

Products with many:

```text
markets
currencies
customer tiers
channels
```

SHOULD use a governed price-book model.

---

# 46. Multi-Currency Pricing

Multi-currency pricing SHOULD use explicit prices.

Avoid live FX conversion at checkout unless that is intentionally the commercial model.

---

# 47. Customer-Specific Pricing

Negotiated prices MUST be:

```text
explicit
versioned
authorized
auditable
```

---

# 48. Price Effective Period

Prices MAY define:

```text
effective_from
effective_until
```

for scheduled commercial changes.

---

# 49. Pricing Change

Price changes MUST define whether they affect:

```text
new customers only
renewals
existing contracts
immediately
next cycle
```

---

# 50. Discounts

Discounts MUST have explicit semantics.

Examples:

```text
fixed amount
percentage
free quantity
limited cycles
one-time
```

---

# 51. Discount Scope

Define whether a discount applies to:

```text
line
product
subscription
invoice
customer
```

---

# 52. Discount Currency

Fixed-amount discounts MUST specify currency.

---

# 53. Discount Ceiling

A discount MUST NOT create an invalid negative payable amount unless negative invoices/credits are explicitly supported.

---

# 54. Discount Combination

Stacking rules MUST be explicit.

---

# 55. Coupon ≠ Entitlement

A discount changes price.

It SHOULD NOT silently change authorization/feature entitlement.

---

# 56. Promotion Expiry

Promotion expiry SHOULD be enforced server-side.

---

# 57. Credits

Financial/customer credits MUST be represented explicitly.

---

# 58. Credit Types

Distinguish:

```text
cash-equivalent credit
promotional credit
service credit
invoice credit
```

because accounting/refund behavior may differ.

---

# 59. Credit Currency

Financial credits MUST have currency.

---

# 60. Credit Expiry

Credit expiration must follow applicable contract/legal policy.

---

# 61. Pricing Calculation

Canonical conceptual flow:

```text
Base line items
↓
Quantity/usage
↓
Discounts
↓
Taxable basis
↓
Taxes
↓
Credits
↓
Amount due
```

Exact ordering MUST follow the applicable commercial/tax policy.

---

# 62. Calculator Ownership

Pricing calculations SHOULD be centralized in a governed billing domain service/library.

---

# 63. Client Calculation

The browser MAY preview pricing.

The server MUST calculate authoritative financial totals.

---

# 64. Checkout Tampering

Never trust client-provided:

```text
unit price
discount amount
tax
grand total
```

as authoritative.

---

# 65. Server Lookup

Clients SHOULD send identifiers and choices.

The server resolves authoritative price data.

---

# 66. Quote

Complex/negotiated purchasing MAY use an immutable Quote.

---

# 67. Quote Snapshot

A Quote SHOULD capture:

```text
lines
prices
currency
discounts
tax assumptions
expiry
customer
```

---

# 68. Quote Expiry

Expired quotes MUST NOT silently remain purchasable unless revalidated.

---

# 69. Tax Principle

> **Tax is jurisdiction-specific financial logic and must not be improvised from UI assumptions.**

---

# 70. Tax Legal Boundary

This engineering standard does not define tax law.

Tax behavior MUST be configured from approved finance/tax requirements for the jurisdictions served.

---

# 71. Tax Inputs

Tax calculation MAY depend on:

```text
seller location
customer location
billing address
shipping/service location
business status
tax ID
product tax category
currency
transaction date
```

depending on jurisdiction.

---

# 72. Product Tax Category

Products SHOULD have an explicit tax category when treatment can differ.

---

# 73. Tax Rates

Do not hard-code tax rates throughout application code.

---

# 74. Tax Engine

Products operating across multiple tax jurisdictions SHOULD consider an approved tax engine/provider or centrally governed tax rules.

---

# 75. Tax Evidence

Where jurisdiction rules require location evidence, retain only the evidence required by approved policy.

---

# 76. Inclusive vs Exclusive Tax

Every price context MUST define whether tax is:

```text
inclusive
exclusive
```

where applicable.

---

# 77. UI Tax Clarity

Checkout MUST clearly indicate whether displayed prices include applicable tax.

---

# 78. Tax Calculation Snapshot

Issued financial documents SHOULD preserve:

```text
tax rate/rules result
tax category
taxable basis
tax amount
jurisdiction
```

where required for audit.

---

# 79. Tax ID

Customer tax identifiers MUST be handled as sensitive business/personal data according to Privacy Guidelines.

---

# 80. Tax ID Validation

Do not treat formatting validation as proof that a tax exemption is legally valid.

---

# 81. Tax Exemption

Exemption state SHOULD be explicit and auditable.

---

# 82. Exemption Evidence

Required exemption certificates/evidence MUST have an owner and lifecycle.

---

# 83. Tax Recalculation

Historical issued invoices SHOULD NOT change because the tax rate changes later.

---

# 84. Refund Tax

Refund/credit tax adjustments MUST follow the original taxable transaction and applicable tax rules.

---

# 85. Invoice Definition

An Invoice is a durable financial document representing billed line items and amounts owed.

---

# 86. Invoice States

A canonical internal lifecycle MAY include:

```text
Draft
Open / Issued
Paid
Void
Uncollectible
```

with provider/jurisdiction-specific mappings where necessary.

---

# 87. Draft Invoice

Draft invoices MAY change before finalization.

---

# 88. Issued Invoice

Once issued/finalized, financial facts SHOULD be treated as immutable.

---

# 89. Correction

Corrections to an issued invoice SHOULD use an appropriate:

```text
credit note
adjustment
void/reissue
```

workflow instead of silently editing financial history.

---

# 90. Invoice Number

Invoice numbering MUST follow applicable legal/accounting requirements.

---

# 91. Invoice Number ≠ Database ID

Public/legal invoice number and internal database identifier MAY differ.

---

# 92. Number Reuse

Issued invoice numbers MUST NOT be casually reused.

---

# 93. Invoice Snapshot

An issued invoice SHOULD snapshot:

```text
seller identity
customer billing identity
line descriptions
quantities
unit prices
currency
discounts
tax
totals
billing period
payment terms
```

as required.

---

# 94. Customer Name Change

Changing a customer's current profile MUST NOT silently rewrite a historical issued invoice.

---

# 95. Invoice Currency

An invoice MUST use one authoritative invoice currency unless explicit multi-currency accounting requirements exist.

---

# 96. Invoice Total

Canonical identity:

```text
subtotal
− discounts
+ taxes
+ adjustments
− credits
= amount due
```

subject to jurisdiction-specific ordering.

---

# 97. Invoice Line

Each line SHOULD preserve:

```text
description
quantity
unit amount
currency
period if applicable
tax treatment
discount allocation
```

---

# 98. Billing Period

Recurring invoice lines SHOULD identify the relevant service period where useful/required.

---

# 99. Due Date

Manual/invoice-based collection MUST explicitly store due date.

---

# 100. Due Date Is Financial State

Do not infer due date repeatedly from:

```text
created_at + current settings
```

after issuance.

---

# 101. Invoice PDF

Generated invoice documents SHOULD be reproducible from the immutable invoice snapshot.

---

# 102. PDF Integrity

Regenerating an invoice SHOULD not alter its financial meaning.

---

# 103. Receipt

A Receipt proves/records payment.

It is not automatically equivalent to an invoice.

---

# 104. Payment Receipt

Receipts SHOULD identify:

```text
payment
amount
currency
date
merchant
related invoice/order
```

without exposing full card credentials.

---

# 105. Subscription Model

A Subscription SHOULD reference:

```text
customer/tenant
items/prices
billing cadence
quantity
status
current period
collection method
```

as required.

---

# 106. Provider Subscription ID

Provider identifiers SHOULD be external references rather than the only internal subscription identity.

---

# 107. Canonical Subscription States

Internal states SHOULD describe product-relevant lifecycle rather than blindly expose provider enums.

Possible conceptual states:

```text
Pending
Trialing
Active
Past due
Grace
Suspended
Canceling
Ended
```

Not every product needs all of them.

---

# 108. Provider State Mapping

Provider state → internal commercial state mapping MUST be documented.

---

# 109. State Machine

Subscription transitions MUST follow an explicit state machine.

---

# 110. Illegal Transition

Reject impossible transitions rather than silently rewriting state.

---

# 111. Trial

A trial MUST define:

```text
start
end
entitlements
payment-method requirement
conversion behavior
```

---

# 112. Trial End

Trial expiry MUST have deterministic behavior.

Examples:

```text
charge and activate
request action
downgrade
end access
```

---

# 113. Trial Abuse

Products MAY implement trial-abuse controls according to Security/Privacy policy.

---

# 114. Trial Is Not Discount

Trial semantics SHOULD remain distinct from a 100% discount.

---

# 115. Billing Cycle Anchor

Recurring subscriptions MUST store/derive a stable billing-cycle anchor.

---

# 116. Calendar Complexity

Monthly billing MUST define behavior for:

```text
29th
30th
31st
month length changes
timezone
```

according to provider/product semantics.

---

# 117. Billing Timezone

Recurring financial events MUST have an explicit timezone/calendar model.

---

# 118. Annual Billing

Annual does not mean:

```text
365 days
```

unless that is explicitly the contract.

---

# 119. Proration

Mid-cycle subscription changes MUST define proration policy.

---

# 120. Proration Preview

Before applying a price-changing plan change, UI SHOULD show expected:

```text
credit
charge
new recurring amount
effective date
```

where practical.

---

# 121. Proration Provider Logic

If the provider calculates prorations, the application SHOULD use provider preview APIs or mirror exact documented semantics rather than approximate them independently.

---

# 122. Upgrade Timing

Define whether upgrades are:

```text
immediate
next cycle
scheduled date
```

---

# 123. Downgrade Timing

Define whether downgrades occur:

```text
immediately
at period end
```

and whether immediate access loss is acceptable.

---

# 124. Scheduled Changes

Future subscription changes SHOULD be represented explicitly rather than mutating current state early.

---

# 125. Cancellation

Cancellation MUST distinguish:

```text
cancel immediately
cancel at period end
```

---

# 126. Cancel-at-Period-End

A subscription scheduled to cancel may remain entitled until the paid/contractual period ends.

---

# 127. Undo Cancellation

If business policy permits, period-end cancellation MAY be reversible before termination.

---

# 128. Subscription End

Ending the subscription does not automatically define data-deletion behavior.

Lifecycle follows product/privacy policy.

---

# 129. Pause

Pause semantics MUST define separately:

```text
billing
entitlements
usage
renewal
```

---

# 130. Quantity

Seat/unit quantity changes are financial mutations and MUST be auditable.

---

# 131. Seat Count

Do not infer billable seat count from an unconstrained table count unless the contract explicitly defines it that way.

---

# 132. Usage-Based Billing

Usage billing MUST define the metered unit precisely.

Examples:

```text
API request
GB-month
active user-day
transaction
compute minute
```

---

# 133. Usage Event

Every billable usage event SHOULD contain:

```text
tenant/customer
metric
quantity
timestamp/period
idempotency identity
source
```

---

# 134. Usage Deduplication

Metering MUST prevent duplicate usage from being billed twice.

---

# 135. Usage Correction

Incorrect usage SHOULD be corrected through auditable adjustment semantics.

---

# 136. Late Usage

Define whether late-arriving events:

```text
adjust prior invoice
roll into next invoice
are rejected
```

---

# 137. Usage Cutoff

Billing-period usage cutoff MUST be deterministic.

---

# 138. Usage Timezone

Usage aggregation MUST define time boundaries consistently.

---

# 139. Metering vs Analytics

Billing metering MUST NOT rely on best-effort product analytics pipelines.

---

# 140. Billing Meter Durability

Billable usage requires stronger durability, deduplication, and reconciliation than ordinary analytics.

---

# 141. Entitlement Model

Entitlements SHOULD explicitly describe capabilities such as:

```text
feature access
seat limit
storage quota
API quota
support tier
```

---

# 142. Entitlement Source

Entitlements SHOULD be derived from:

```text
commercial contract
plan
subscription state
grace policy
manual approved overrides
```

---

# 143. Payment Provider Is Not Authorization Engine

Application authorization MUST NOT query the payment provider synchronously on every feature request.

---

# 144. Materialized Entitlements

Products SHOULD maintain an internal, query-efficient entitlement state.

---

# 145. Entitlement Reconciliation

Derived entitlements MUST be recomputable/reconcilable from authoritative commercial state.

---

# 146. Entitlement Grant

New access SHOULD only be granted when the relevant commercial conditions are satisfied.

---

# 147. Entitlement Revocation

Revocation semantics MUST define:

```text
immediate
grace period
end of paid term
manual suspension
```

---

# 148. Failed Payment ≠ Immediate Revocation

A single failed renewal payment SHOULD NOT automatically remove access unless product policy deliberately requires it.

---

# 149. Grace Period

Grace behavior SHOULD be explicit.

---

# 150. Grace State

During grace, define:

```text
feature access
new purchases
usage accrual
billing retries
customer messaging
```

---

# 151. Entitlement Override

Manual entitlement overrides MUST be:

```text
authorized
reasoned
audited
time-bounded where temporary
```

---

# 152. Flag ≠ Entitlement

Feature flags MUST NOT replace contractual entitlements.

---

# 153. Tenant Entitlement

In multi-tenant products, entitlements SHOULD normally attach to the contractual tenant/customer—not arbitrary individual sessions.

---

# 154. Payment Method

A Payment Method is a reusable or single-use financial instrument reference.

---

# 155. Card Data Scope

The product SHOULD minimize direct handling of cardholder data.

---

# 156. Hosted/Tokenized Collection

Prefer approved provider-hosted/tokenized payment collection that reduces card-data exposure and PCI scope.

---

# 157. No Raw Card Storage

Application databases MUST NOT store raw:

```text
PAN
CVV/CVC
track data
PIN
```

unless architecture explicitly requires it and all applicable PCI controls are satisfied.

---

# 158. CVV

Sensitive authentication data such as CVV MUST NOT be retained after authorization where prohibited by payment-card rules.

---

# 159. Payment Method Token

Store provider tokens/identifiers rather than raw payment credentials where possible.

---

# 160. Last Four

Masked metadata such as:

```text
brand
last4
expiry
```

MAY be stored/displayed where operationally useful and permitted.

---

# 161. Payment Method Ownership

A saved payment method MUST belong to the correct customer/account context.

---

# 162. Tenant Isolation

Payment-method references MUST not be reusable across unauthorized tenants.

---

# 163. Default Payment Method

Changing the default method MUST be an explicit audited billing mutation where risk warrants.

---

# 164. Expired Payment Method

Expiry SHOULD produce a recoverable billing state—not application corruption.

---

# 165. Payment Intent

The internal model SHOULD distinguish:

```text
payment obligation
payment attempt
provider transaction
```

---

# 166. Payment Attempt

One invoice/order MAY have multiple payment attempts.

---

# 167. Attempt Identity

Every attempt MUST have a stable internal identifier.

---

# 168. Idempotency

All externally side-effectful financial operations SHOULD be idempotent.

Examples:

```text
create charge/payment
capture
refund
subscription creation
invoice collection
```

---

# 169. Idempotency Key

Idempotency keys SHOULD represent one logical business operation.

---

# 170. Retry Same Operation

Retrying the same uncertain request MUST reuse the same idempotency identity.

---

# 171. New Business Intent

A genuinely new operation MUST receive a new idempotency identity.

---

# 172. Idempotency Scope

Keys SHOULD incorporate or be associated with:

```text
tenant/customer
operation
business object
```

internally.

---

# 173. Idempotency Payload

The system SHOULD reject reuse of the same logical key with materially different parameters.

---

# 174. Idempotency Retention

Application idempotency retention MUST match the maximum useful retry/reconciliation period.

Do not rely blindly on a provider's key-retention duration.

---

# 175. Browser Double Click

UI should prevent obvious duplicate submissions.

Server idempotency remains mandatory.

---

# 176. Timeout

A payment timeout creates:

```text
unknown outcome
```

not:

```text
payment failed
```

---

# 177. Unknown Payment Outcome

After uncertain network failure:

```text
do not create a new payment blindly
reconcile using idempotency/provider state
```

---

# 178. Payment State

Payment states SHOULD distinguish concepts such as:

```text
Pending
Requires customer action
Authorized
Captured/Paid
Failed
Canceled
Refunded/Partially refunded
```

according to actual provider semantics.

---

# 179. Authorization ≠ Capture

Where separate authorization/capture exists:

```text
authorized
```

does not mean money has been captured.

---

# 180. Capture

Capture rules MUST define:

```text
amount
deadline
partial capture
multiple capture
```

where supported.

---

# 181. Capture Ceiling

Cumulative capture MUST NOT exceed the authorized amount unless the payment rail explicitly permits an approved alternative.

---

# 182. Payment Success

Business logic SHOULD rely on authoritative confirmed provider state, not merely:

```text
customer returned to success URL
```

---

# 183. Return URL

Browser redirects are UX signals.

They are not sufficient financial confirmation.

---

# 184. Asynchronous Methods

Bank debit, bank transfer, wallet, and other methods MAY settle asynchronously.

The domain model MUST tolerate delayed success/failure.

---

# 185. Payment Pending

Pending payments MUST NOT be represented to the customer as settled.

---

# 186. Settlement

If settlement status matters financially, model it separately from authorization/capture.

---

# 187. Payment Failure

A failed attempt SHOULD store:

```text
attempt
provider reference
failure category/code
retry eligibility
timestamp
```

without unnecessary sensitive data.

---

# 188. Failure Classification

Distinguish:

```text
Hard/permanent
Soft/transient
Customer action required
Technical/provider error
Unknown outcome
```

---

# 189. Customer Message

Customer-facing error messages SHOULD be useful without exposing provider/security internals.

---

# 190. Decline Reason

Do not promise an exact reason when the issuer/provider gives only a generic decline.

---

# 191. Retry

Automated retries SHOULD occur only where payment-method/provider semantics support them.

---

# 192. Retry Cadence

Retry policy MUST avoid:

```text
excessive attempts
customer surprise
provider abuse
```

---

# 193. Customer-Initiated Retry

Users SHOULD be able to retry/update payment method when recoverable.

---

# 194. Additional Authentication

Flows requiring customer action MUST preserve:

```text
pending business state
payment attempt
safe resume path
```

---

# 195. Dunning

Recurring billing SHOULD define a dunning policy.

---

# 196. Dunning Lifecycle

Conceptually:

```text
Payment failed
↓
Notify customer
↓
Retry / request action
↓
Grace period
↓
Recover
or
restrict/end service
```

---

# 197. Dunning Communication

Messages SHOULD state:

```text
what failed
amount/currency
what the customer should do
service impact
relevant deadline
```

without exposing sensitive payment details.

---

# 198. Dunning Deduplication

Do not send repeated duplicate failed-payment notifications for the same attempt.

---

# 199. Recovery

Successful later payment MUST cancel obsolete dunning actions.

---

# 200. Past-Due Entitlements

Past-due behavior MUST be product-policy driven.

---

# 201. Collections

Manual invoice collection MAY require:

```text
reminders
due dates
aging
manual settlement
write-off
```

---

# 202. Refund

A Refund is a financial reversal against captured/settled funds.

---

# 203. Refund Permission

Refunds MUST have explicit authorization.

---

# 204. Refund Input

A refund operation MUST identify:

```text
original payment
amount
currency
reason
```

---

# 205. Refund Currency

Refund currency MUST follow provider/payment constraints and original financial semantics.

---

# 206. Refund Ceiling

Cumulative refunds MUST NOT exceed the refundable captured amount unless an explicitly supported financial mechanism applies.

---

# 207. Partial Refund

Partial refunds MUST be represented explicitly.

---

# 208. Refund Idempotency

Refund creation MUST be idempotent.

---

# 209. Refund State

A requested refund MAY be:

```text
Pending
Succeeded
Failed
Canceled
```

depending on payment rail/provider.

Do not mark refunded before authoritative confirmation.

---

# 210. Refund ≠ Cancellation

Canceling a subscription does not automatically refund previous payments.

---

# 211. Cancellation ≠ Refund

UI MUST explain these separately.

---

# 212. Refund Reason

Refund reason SHOULD be recorded for support/audit.

---

# 213. Large Refund

Large/manual refunds MAY require elevated approval under Admin Guidelines.

---

# 214. Credit Note

Where invoice accounting requires it, a refund SHOULD be accompanied by the appropriate credit/adjustment document.

---

# 215. Store Credit

Giving customer account credit is not necessarily equivalent to refunding original money.

---

# 216. Dispute

A dispute/chargeback is distinct from a refund.

---

# 217. Dispute State

Track dispute lifecycle independently.

---

# 218. Dispute Financial Effect

Disputes MAY result in:

```text
fund withdrawal
fee
later reversal
```

and should not be modeled as simple payment failure.

---

# 219. Dispute Evidence

Evidence workflows MUST follow provider deadlines and Privacy Guidelines.

---

# 220. Entitlement During Dispute

Access policy during a dispute MUST be explicit.

---

# 221. Fraud

Fraud-risk outcomes MUST NOT be represented as ordinary payment failures where security/operations behavior differs.

---

# 222. Webhooks

Provider webhooks are a core synchronization mechanism.

---

# 223. Webhook Security

Every payment webhook MUST be authenticated using the provider's supported verification method.

---

# 224. Signature Verification

Signature verification MUST use the exact payload representation required by the provider.

Do not mutate/paraphrase payload before verification where raw-body verification is required.

---

# 225. Webhook Secret

Webhook verification secrets are production secrets.

---

# 226. Environment Separation

Test and live webhook secrets/endpoints MUST not be confused.

---

# 227. Webhook Endpoint

Payment webhook endpoints SHOULD:

```text
verify
persist/enqueue
acknowledge promptly
process asynchronously
```

---

# 228. Durable Receipt

Do not return success until the event has been durably accepted for processing.

---

# 229. Fast Acknowledgement

Do not perform slow downstream business workflows before acknowledging the provider when reliable asynchronous processing is available.

---

# 230. Duplicate Webhooks

Providers MAY send duplicate events.

Processing MUST be idempotent.

---

# 231. Webhook Event ID

Store provider event/delivery identities for deduplication where provided.

---

# 232. Duplicate Event Types

Two different event IDs MAY still describe related/duplicate object state.

Business transitions must themselves remain idempotent.

---

# 233. Event Ordering

Do not assume webhook events always arrive in chronological order.

---

# 234. State Transition Validation

An older event MUST NOT overwrite a newer confirmed financial state incorrectly.

---

# 235. Fetch Current State

When event ordering or payload completeness is uncertain, the processor MAY retrieve authoritative current object state from the provider.

---

# 236. Unknown Event Types

Webhook handlers SHOULD safely accept/ignore unknown future event types rather than crashing the entire endpoint.

---

# 237. Webhook Replay

Replay of a previously valid event MUST NOT duplicate financial effects.

---

# 238. Webhook Retry

Provider delivery retries MUST be tolerated.

---

# 239. Webhook Logs

Webhook logs SHOULD contain:

```text
provider
event ID
type
object reference
received time
processing result
```

but not unnecessary card/personal data.

---

# 240. Webhook Dead Letter

Repeated processing failures SHOULD be visible in a DLQ/reconciliation workflow.

---

# 241. Webhook Alert

Alert on sustained:

```text
signature failures
processing failures
delivery gaps
DLQ growth
```

---

# 242. Webhook Is Not Sufficient Alone

A robust billing system SHOULD have reconciliation beyond webhook delivery.

---

# 243. Reconciliation

Reconciliation asks:

> **Does our internal financial state agree with the payment/tax/provider system's authoritative records?**

---

# 244. Reconciliation Frequency

Frequency SHOULD reflect:

```text
transaction volume
financial risk
provider capability
business criticality
```

---

# 245. Reconciliation Sources

Reconciliation MAY use:

```text
provider APIs
settlement reports
balance reports
payout reports
webhook-event lists
tax-provider records
```

---

# 246. Reconciliation Dimensions

Compare at least relevant:

```text
object existence
status
amount
currency
customer
invoice/payment association
refund totals
```

---

# 247. Missing Internal Event

If provider shows a successful payment absent internally:

```text
repair/replay
do not charge again
```

---

# 248. Phantom Internal Success

If internal state says paid but provider does not:

```text
investigate
do not silently preserve financial success
```

---

# 249. Reconciliation Is Idempotent

Repair workflows MUST be safe to re-run.

---

# 250. Reconciliation Audit

Automatic/manual corrections SHOULD be recorded.

---

# 251. Daily Financial Close

Higher-volume systems SHOULD consider a daily financial reconciliation/close process.

---

# 252. Settlement Reconciliation

If provider payouts/settlements matter to accounting, reconcile:

```text
gross
fees
refunds
disputes
net settlement
```

---

# 253. Payment Provider Fees

Provider fees SHOULD be modeled separately from customer invoice amounts.

---

# 254. Financial Records

Material financial transactions SHOULD use append-oriented history.

---

# 255. Do Not Delete History

Do not delete successful payment/refund/invoice records merely because an account is closed.

Retention follows financial/legal/privacy requirements.

---

# 256. Correction by New Entry

Prefer:

```text
original
+
adjustment/reversal
```

over editing historical financial facts.

---

# 257. Ledger

Systems with substantial financial complexity SHOULD maintain an internal financial ledger or equivalent immutable transaction history.

---

# 258. Ledger Scope

A lightweight SaaS billing ledger need not become a full general accounting ledger unless product requirements demand it.

---

# 259. Financial Event

Financial history SHOULD identify:

```text
event ID
type
amount
currency
customer/tenant
related object
time
provider reference
```

---

# 260. Audit Actor

Manual financial adjustments MUST identify the human/service actor.

---

# 261. Financial Time

Preserve relevant timestamps separately:

```text
created
authorized
captured
paid
refunded
settled
```

where meaningful.

---

# 262. Server Time

Financial records MUST use authoritative server/provider timestamps—not client device time.

---

# 263. Checkout

Checkout MUST show authoritative:

```text
products
quantity
price
currency
discount
tax
total
billing cadence
```

before final commitment where applicable.

---

# 264. Recurring Disclosure

Recurring checkout MUST make recurring nature and cadence understandable.

---

# 265. Trial Disclosure

Trials SHOULD communicate:

```text
trial end
post-trial amount
billing cadence
cancellation behavior
```

where applicable.

---

# 266. Upgrade Confirmation

Price-changing subscription changes SHOULD clearly communicate the financial consequence before confirmation.

---

# 267. Currency Display

Display currency unambiguously where symbols could be confused.

Example:

```text
US$20
A$20
S$20
```

when context requires.

---

# 268. Formatting

Money formatting follows Internationalization Guidelines.

---

# 269. Authoritative Precision

Formatting MUST NOT alter authoritative precision.

---

# 270. Zero-Decimal Currency

Do not display artificial decimals for currencies conventionally represented without them unless required by the context.

---

# 271. Payment Success Page

The success page SHOULD reflect reconciled/known payment state.

If confirmation is pending, say so.

---

# 272. Refresh Safety

Refreshing a payment-result page MUST NOT create another charge.

---

# 273. Back Button Safety

Browser back/forward navigation MUST NOT duplicate purchases.

---

# 274. Confirmation Email

Payment/invoice emails follow Email Guidelines and MUST use authoritative financial data.

---

# 275. Failed Payment UX

Failed payment UI SHOULD explain:

```text
payment not completed
what can be done next
whether access is affected
```

without exposing issuer internals.

---

# 276. Tax UX

Tax collection fields SHOULD only be requested when required by tax/business policy.

---

# 277. Billing Address

Do not collect billing-address fields merely because "checkout normally has them" when provider/tax requirements do not need them.

---

# 278. PCI Scope

Any system that stores, processes, transmits cardholder data—or can affect the security of the cardholder-data environment—MAY fall into applicable PCI DSS scope.

---

# 279. Current PCI Baseline

The organizational card-payment security baseline MUST follow the current applicable PCI DSS version.

---

# 280. Scope Reduction

Architecture SHOULD minimize PCI scope through:

```text
provider-hosted collection
tokenization
isolation
minimal payment-page code
```

where appropriate.

---

# 281. Payment Page Security

Payment pages and scripts require stronger supply-chain/change controls because tampering can steal payment data.

---

# 282. Third-Party Scripts

Checkout/payment surfaces SHOULD minimize third-party scripts.

---

# 283. CSP

Payment surfaces SHOULD use strong Content Security Policy consistent with provider integration requirements.

---

# 284. Logs

Payment logs MUST NOT capture:

```text
full card number
CVV
payment secrets
authorization credentials
```

---

# 285. Error Monitoring

Ensure error-reporting SDKs do not capture payment form contents or secrets.

---

# 286. Provider Credentials

Payment-provider API secrets MUST use approved secrets management.

---

# 287. Least Privilege

Use separate restricted provider credentials where supported.

---

# 288. Environment Isolation

Production and test payment-provider credentials/accounts MUST remain separated.

---

# 289. Test Mode

A test-mode provider object MUST NEVER satisfy a production payment.

---

# 290. Environment Field

Persist/validate environment where provider identifiers could otherwise be confused.

---

# 291. Customer Mapping

Provider customer IDs MUST map to the correct internal customer/tenant.

---

# 292. Cross-Tenant Protection

Tenant A MUST NOT attach:

```text
payment method
subscription
invoice
refund
```

belonging to Tenant B.

---

# 293. Provider Metadata

Provider metadata MAY contain internal opaque identifiers.

It MUST NOT contain unnecessary personal/secrets.

---

# 294. Admin Billing Tools

Administrative billing actions follow Admin & Internal Tools Guidelines.

---

# 295. Refund Admin

Manual refund screens SHOULD show:

```text
customer
tenant
payment
original amount
already refunded
maximum refundable
currency
requested amount
reason
```

---

# 296. Subscription Admin

Manual subscription changes SHOULD preview their:

```text
entitlement
invoice
proration
renewal
```

effects.

---

# 297. Manual Paid Override

Marking an invoice paid manually MUST be restricted and auditable.

---

# 298. Out-of-Band Payment

If offline/bank/manual settlement is supported, model it explicitly rather than faking a provider card payment.

---

# 299. Write-Off

Uncollectible/write-off state MUST be distinct from paid.

---

# 300. Free Invoice

A legitimate zero-total invoice MAY be considered settled without a payment transaction according to business policy.

---

# 301. Migration

Payment-provider migrations require a dedicated migration plan.

---

# 302. Migration Mapping

Maintain mappings for relevant:

```text
customers
payment methods/tokens
subscriptions
invoices
```

where portable/supported.

---

# 303. Token Portability

Do not assume payment tokens can be exported or moved between providers.

---

# 304. Subscription Migration

Migration MUST prevent:

```text
double billing
missed billing
duplicate entitlements
lost cancellation state
```

---

# 305. Migration Cutover

Define one authoritative billing owner during cutover.

---

# 306. Dual Billing

Running two billing engines simultaneously for the same subscription is high risk and SHOULD be avoided unless deliberately reconciled.

---

# 307. Provider Outage

Payment provider outage MUST have defined UX/operations behavior.

---

# 308. Checkout Outage

If payment creation is unavailable:

```text
do not claim success
preserve customer intent where safe
provide retry
```

---

# 309. Webhook Outage

Webhook outage SHOULD not permanently corrupt billing state because reconciliation exists.

---

# 310. Tax Provider Outage

Tax-dependent checkout MUST define whether to:

```text
fail closed
use approved cached calculation
queue/manual workflow
```

according to legal/business policy.

---

# 311. Billing Continuity

Critical recurring billing SHOULD have runbooks for:

```text
provider API outage
webhook failure
incorrect pricing
tax incident
duplicate charging
mass failed payments
```

---

# 312. Kill Switch

Operations SHOULD be able to disable:

```text
new checkout
renewal processing
refund automation
billing emails
```

independently where appropriate.

---

# 313. Kill Switch Safety

A billing kill switch MUST NOT silently alter historical financial records.

---

# 314. Observability

Billing telemetry SHOULD cover:

```text
payment success/failure
unknown outcomes
invoice generation
renewal results
refunds
webhook processing
reconciliation discrepancies
```

---

# 315. Financial Metrics

Operational metrics SHOULD be separated from accounting reports.

---

# 316. Revenue Analytics

Analytics event counts MUST NOT be treated as authoritative revenue totals.

---

# 317. Finance Source

Financial reports SHOULD derive from billing/ledger/reconciled financial data.

---

# 318. Payment Failure Rate

Track failures by appropriate:

```text
method
provider
region
currency
failure class
```

without leaking sensitive information.

---

# 319. Reconciliation Alert

Unexplained mismatches MUST generate actionable operational signals.

---

# 320. Billing Audit

Material actions SHOULD capture:

```text
actor
customer/tenant
operation
old state
new state
amount/currency
reason
provider reference
timestamp
```

where applicable.

---

# 321. Privacy

Billing records contain personal/financial data and follow Privacy & Data Governance requirements.

---

# 322. Retention

Financial document retention MUST follow:

```text
legal
tax
accounting
contractual
privacy
```

requirements.

---

# 323. Deletion

Account deletion does not necessarily permit deletion of legally required financial records.

---

# 324. Pseudonymization

Where historical financial records must remain but unrelated profile data can be removed, use approved minimization/pseudonymization approaches where legally appropriate.

---

# 325. Testing Strategy

Billing MUST be tested as a stateful financial system, not only as checkout UI.

---

# 326. Money Tests

Test:

```text
0
1 minor unit
large amount
zero-decimal currency
three-decimal currency where supported
rounding boundaries
```

---

# 327. Currency Tests

Test that mismatched currencies cannot be combined accidentally.

---

# 328. Pricing Tests

Test:

```text
price versions
discount stacking
expiry
credits
rounding
```

---

# 329. Tax Tests

Use finance-approved jurisdiction scenarios rather than fabricated generic tax assumptions.

---

# 330. Invoice Tests

Test:

```text
draft
finalize
pay
void
credit/correction
historical immutability
```

---

# 331. Subscription Tests

Test:

```text
start
trial
renew
upgrade
downgrade
proration
cancel
reactivate
end
```

---

# 332. Failure Tests

Test:

```text
card decline
authentication required
provider timeout
webhook delayed
webhook duplicate
webhook out of order
```

---

# 333. Unknown Outcome Test

Simulate:

```text
provider executes charge
network response lost
```

and verify no duplicate charge occurs.

---

# 334. Idempotency Test

Repeated identical financial requests MUST produce one logical financial effect.

---

# 335. Concurrency Test

Concurrent:

```text
checkout clicks
refund requests
subscription changes
```

MUST preserve financial invariants.

---

# 336. Refund Test

Test cumulative partial refunds up to the exact refundable maximum.

---

# 337. Webhook Signature Test

Invalid webhook signatures MUST be rejected.

---

# 338. Webhook Duplicate Test

Replay the same event and verify zero duplicate side effects.

---

# 339. Webhook Ordering Test

Process newer then older events and verify state does not regress incorrectly.

---

# 340. Reconciliation Test

Deliberately omit an internal webhook event and verify reconciliation repairs state.

---

# 341. Entitlement Test

Test entitlement behavior for:

```text
trial
active
past due
grace
canceled-at-period-end
ended
manual override
```

---

# 342. Tenant Isolation Test

Tenant A MUST be unable to access Tenant B:

```text
invoice
subscription
payment method
refund
billing portal
```

---

# 343. Production-like Test Environment

Provider sandbox/test mode SHOULD cover realistic asynchronous transitions.

---

# 344. Test Cards

Use provider-approved test credentials only.

Never use real customer card data for development testing.

---

# 345. Billing Review Checklist

```text
□ Money type
□ Currency
□ Exact arithmetic
□ Rounding
□ Price versioning
□ Tax policy
□ Invoice semantics
□ Subscription state machine
□ Entitlements
□ Idempotency
□ Webhooks
□ Reconciliation
□ Refunds
□ Failed payments
□ Security/PCI
□ Audit
```

---

# 346. Money Checklist

```text
□ Amount + currency
□ No float
□ ISO currency code
□ Minor-unit metadata
□ Exact rounding
□ Currency match enforced
□ Historical amount immutable
```

---

# 347. Pricing Checklist

```text
□ Product
□ Price ID
□ Amount
□ Currency
□ Interval
□ Effective dates
□ Tax behavior
□ Discount rules
□ Existing customer behavior
□ Historical version retained
```

---

# 348. Tax Checklist

```text
□ Tax ownership defined
□ Product tax category
□ Customer location inputs
□ Tax IDs/exemption
□ Inclusive/exclusive behavior
□ Authoritative calculation
□ Calculation snapshot
□ Refund treatment
□ Legal/finance review
```

---

# 349. Invoice Checklist

```text
□ Customer identity snapshot
□ Seller identity
□ Unique invoice identity
□ Lines
□ Currency
□ Discounts
□ Tax
□ Total
□ Service period
□ Due date
□ Immutable after issue
□ Correction workflow
```

---

# 350. Subscription Checklist

```text
□ Internal subscription ID
□ Provider mapping
□ Items/prices
□ Quantity
□ Billing cycle
□ Trial
□ State machine
□ Proration
□ Cancellation semantics
□ Failed-payment policy
□ Entitlement mapping
```

---

# 351. Entitlement Checklist

```text
□ Explicit capabilities
□ Contract source
□ Internal materialized state
□ Grace behavior
□ Revocation behavior
□ Overrides audited
□ Feature flag not used as auth
□ Reconciliation
```

---

# 352. Payment Checklist

```text
□ Business operation ID
□ Idempotency
□ Customer/tenant
□ Amount
□ Currency
□ Payment method belongs to customer
□ Unknown outcome handled
□ Customer action handled
□ Provider reference
□ State reconciled
```

---

# 353. Webhook Checklist

```text
□ Signature verification
□ Correct raw payload handling
□ Environment validated
□ Durable receipt
□ Fast acknowledgement
□ Async processing
□ Event deduplication
□ Business idempotency
□ Out-of-order safe
□ Unknown event safe
□ DLQ/retry
□ Monitoring
```

---

# 354. Refund Checklist

```text
□ Original payment
□ Refundable amount
□ Currency
□ Partial/full
□ Idempotency
□ Authorization
□ Reason
□ Provider confirmation
□ Invoice/credit adjustment
□ Audit
```

---

# 355. Failed Payment Checklist

```text
□ Failure class
□ Unknown vs failed distinguished
□ Retry eligibility
□ Customer action
□ Dunning
□ Grace
□ Entitlement impact
□ Customer messaging
□ Recovery cancels obsolete actions
```

---

# 356. Reconciliation Checklist

```text
□ Provider source identified
□ Frequency
□ Payment status
□ Amount/currency
□ Refund totals
□ Invoices
□ Missing events
□ Repair idempotent
□ Audit
□ Alert threshold
```

---

# 357. Definition of Done — New Paid Product

```text
✓ Product and price are distinct
✓ Money representation exact
✓ Currency supported
✓ Price version immutable
✓ Tax treatment approved
✓ Checkout authoritative server-side
✓ Invoice behavior defined
✓ Subscription behavior defined if recurring
✓ Entitlements defined
✓ Payment idempotency
✓ Webhook processing
✓ Reconciliation
✓ Refund policy
✓ Failure/dunning policy
✓ PCI/security reviewed
✓ Tests pass
```

---

# 358. Definition of Done — New Subscription Plan

```text
✓ Product/price IDs
✓ Billing interval
✓ Currency
✓ Tax behavior
✓ Trial behavior
✓ Billing anchor
✓ Upgrade/downgrade rules
✓ Proration
✓ Cancellation
✓ Failed-payment policy
✓ Grace period
✓ Entitlement mapping
✓ Invoice behavior
✓ Provider state mapping
```

---

# 359. Definition of Done — New Payment Integration

```text
✓ Provider approved
✓ Test/live isolated
✓ Tokenized/hosted collection
✓ PCI scope reviewed
✓ Idempotency
✓ Unknown outcome handling
✓ Customer action handling
✓ Webhook verification
✓ Duplicate/out-of-order handling
✓ Reconciliation
✓ Refund support
✓ Monitoring
✓ Incident runbook
```

---

# 360. Definition of Done — Billing Migration

```text
✓ Source inventory
✓ Target mappings
✓ Customer mapping
✓ Token portability understood
✓ Subscription migration
✓ No double billing
✓ Entitlement continuity
✓ Invoice history retained
✓ Webhooks switched safely
✓ Reconciliation
✓ Cutover owner
✓ Rollback/forward-fix plan
```

---

# 361. Billing & Payments Anti-Patterns

Avoid:

```text
price = 19.99
```

in binary floating point.

Avoid:

```text
amount = 1000
```

with no currency.

Avoid:

```text
currency = user.locale.currency
```

as authoritative billing state.

Avoid assuming every currency has 2 decimals.

Avoid recalculating old invoices using new prices.

Avoid editing historical issued invoice totals.

Avoid changing an existing price object to represent a new commercial price.

Avoid:

```text
client sends total = 4999
server charges 4999
```

without server calculation.

Avoid hard-coded tax rates scattered throughout product code.

Avoid tax calculated only from browser locale.

Avoid:

```text
invoice.paid = true
```

because the customer reached `/success`.

Avoid:

```text
subscription.active
→ authorization granted
```

as the full entitlement model.

Avoid:

```text
payment_failed
→ delete account
```

Avoid immediate feature revocation after one transient renewal failure unless contractual policy explicitly says so.

Avoid:

```text
trial = discount 100%
```

when trial lifecycle semantics differ.

Avoid silently changing billing-cycle dates during plan changes.

Avoid invisible proration.

Avoid canceling a subscription and implying a refund happened.

Avoid refunding money and leaving invoice/accounting state inconsistent.

Avoid:

```text
refund requested
→ status = refunded
```

before confirmation.

Avoid cumulative refunds exceeding captured value.

Avoid raw card data in application databases.

Avoid logging full PAN/CVV.

Avoid payment form data in analytics/session replay.

Avoid broad third-party script usage on payment pages.

Avoid test payment credentials in production.

Avoid provider test objects satisfying production entitlement.

Avoid payment-method tokens shared across tenants incorrectly.

Avoid:

```text
try charge
timeout
try new charge
```

with a new idempotency key.

Avoid idempotency based only on frontend button state.

Avoid reusing one idempotency key for different amounts.

Avoid relying on provider idempotency retention as the only internal duplicate protection.

Avoid assuming API timeout means failure.

Avoid assuming authorization means settlement.

Avoid assuming every payment rail is synchronous.

Avoid marking pending payment as paid.

Avoid generic infinite payment retry.

Avoid repeated duplicate dunning emails.

Avoid:

```text
webhook received
→ trust body
```

without signature verification.

Avoid verifying signatures after mutating the required raw body.

Avoid heavy business processing before acknowledging webhook delivery.

Avoid assuming webhooks arrive once.

Avoid assuming webhook order.

Avoid unknown webhook type causing HTTP 500.

Avoid using webhook delivery as the only reconciliation mechanism.

Avoid deleting provider event history immediately.

Avoid:

```text
analytics purchase event
```

as authoritative accounting revenue.

Avoid modifying successful financial history to "fix" mistakes.

Avoid direct manual database edits to mark payments/refunds.

Avoid unrestricted admin refunds.

Avoid billing admin tools that omit currency.

Avoid global feature flags as subscription entitlements.

Avoid payment provider APIs synchronously on every authorization request.

Avoid historical invoices using live customer profile fields.

Avoid tax documents that change when customer address changes later.

Avoid storing invoice number only in mutable provider metadata.

Avoid sending invoices with wrong environment/provider data.

Avoid tenant billing records without tenant ownership.

Avoid one tenant attaching another tenant's payment method.

Avoid provider migration with two systems billing the same subscription unknowingly.

Avoid a backup provider/integration that has never been reconciled/tested.

---

# 362. AI Billing & Payments Rules

AI coding agents MUST use an explicit Money type for authoritative financial amounts.

---

# 363. AI Float Rule

AI MUST NOT use binary floating point for authoritative money arithmetic.

---

# 364. AI Currency Rule

AI MUST carry currency alongside monetary amounts.

---

# 365. AI Minor-Unit Rule

AI MUST NOT assume all currencies have two minor decimal places.

---

# 366. AI Price Rule

AI SHOULD version financial prices instead of mutating historically used price semantics.

---

# 367. AI Client-Trust Rule

AI MUST NOT trust client-supplied prices, discounts, tax, or totals.

---

# 368. AI Tax Rule

AI MUST NOT invent tax rates or jurisdiction rules.

---

# 369. AI Invoice Rule

AI SHOULD treat finalized invoices as immutable financial snapshots.

---

# 370. AI Subscription Rule

AI MUST model subscription lifecycle explicitly rather than rely entirely on provider status strings.

---

# 371. AI Entitlement Rule

AI MUST NOT use payment/subscription status as the sole authorization mechanism.

---

# 372. AI Idempotency Rule

AI MUST make externally side-effectful financial operations idempotent.

---

# 373. AI Timeout Rule

AI MUST treat an uncertain payment API timeout as an unknown outcome requiring reconciliation.

---

# 374. AI Webhook Rule

AI MUST authenticate provider webhooks and process them idempotently.

---

# 375. AI Ordering Rule

AI MUST NOT assume webhook ordering.

---

# 376. AI Reconciliation Rule

AI SHOULD provide an independent reconciliation mechanism for important financial state.

---

# 377. AI Refund Rule

AI MUST enforce cumulative refund limits against authoritative captured/refundable amounts.

---

# 378. AI Dunning Rule

AI MUST separate payment failure, retry policy, grace, and entitlement consequences.

---

# 379. AI PCI Rule

AI SHOULD minimize payment-card data exposure using tokenized/hosted provider components.

---

# 380. AI Logging Rule

AI MUST NOT log raw card credentials, payment secrets, or sensitive authentication data.

---

# 381. AI Tenant Rule

AI MUST preserve tenant ownership across:

```text
customer
payment method
subscription
invoice
payment
refund
```

---

# 382. AI Analytics Rule

AI MUST NOT treat analytics revenue events as authoritative financial records.

---

# 383. AI Admin Rule

AI MUST route manual refunds, entitlement overrides, and paid-state overrides through explicit privileged/audited workflows.

---

# 384. AI Gold Rule

When uncertain:

```text
Exact financial fact
>
convenient mutable state
```

```text
Internal commercial model
+
provider reconciliation
>
provider object as whole domain model
```

```text
Idempotent retry
>
duplicate financial effect
```

```text
Reconcile uncertainty
>
guess payment outcome
```

---

# 385. Golden Billing & Payments Rules

**1. Money is amount plus currency.**

**2. Authoritative money is never represented with ordinary binary floating point.**

**3. Currency is explicit and never inferred from locale alone.**

**4. ISO-style currency codes are used instead of symbols as identifiers.**

**5. Currency minor-unit behavior is data, not a hard-coded assumption of two decimals.**

**6. Currency-mismatched arithmetic is rejected unless an explicit FX conversion exists.**

**7. Exchange-rate conversion records rate, source, timestamp, and rounding where financially material.**

**8. Financial rounding rules are explicit and deterministic.**

**9. Historical amounts are not recalculated from current commercial configuration.**

**10. Product, Plan, Price, Subscription, Invoice, Payment, Refund, and Entitlement remain distinct domain concepts.**

**11. Provider-specific payment objects do not define the entire internal billing model.**

**12. A historically used price is immutable in its financial meaning.**

**13. Price changes create new price versions rather than rewriting history.**

**14. Customer-specific commercial pricing is explicit and auditable.**

**15. Discounts have defined type, scope, duration, currency, and stacking rules.**

**16. Discounts do not implicitly grant product entitlement.**

**17. Credits distinguish financial credit from promotional/service credit.**

**18. The server calculates authoritative checkout totals.**

**19. Client-provided prices, tax, discounts, and totals are untrusted.**

**20. Tax behavior comes from approved jurisdictional policy, not developer assumptions.**

**21. Tax rates are not scattered as hard-coded constants throughout application code.**

**22. Product tax category is explicit where treatment varies.**

**23. Tax-inclusive and tax-exclusive pricing are distinguished.**

**24. Tax calculations preserve the facts required to explain historical invoices.**

**25. Historical invoices do not change when tax rates change later.**

**26. A finalized invoice is an immutable financial document.**

**27. Invoice corrections use controlled void, credit, or adjustment mechanisms rather than silent edits.**

**28. Invoice numbers follow required legal/accounting policy and are not casually reused.**

**29. Invoice identity is distinct from internal database identity when necessary.**

**30. Invoices snapshot the seller, customer, lines, prices, tax, discounts, currency, and relevant service period.**

**31. Receipts and invoices are distinct financial documents.**

**32. A subscription is a commercial agreement, not a payment.**

**33. Subscription lifecycle follows an explicit state machine.**

**34. Provider subscription states map deliberately to internal commercial states.**

**35. Trials define exact start, end, entitlement, and conversion behavior.**

**36. Billing-cycle rules account for calendar and timezone semantics.**

**37. Upgrades and downgrades explicitly define effective timing.**

**38. Proration is previewable and deterministic.**

**39. Cancellation clearly distinguishes immediate termination from period-end cancellation.**

**40. Subscription cancellation does not automatically imply a refund.**

**41. Pausing billing and pausing entitlement are separate decisions.**

**42. Usage-based billing defines an exact metered unit.**

**43. Billable usage events are durable and deduplicated.**

**44. Billing metering does not depend on lossy analytics pipelines.**

**45. Late-arriving usage has a documented correction policy.**

**46. Entitlements are explicit business authorization state.**

**47. Payment status alone is not an entitlement system.**

**48. Subscription provider status alone is not an authorization check.**

**49. Entitlement policy defines trial, grace, past-due, cancellation, and manual override behavior.**

**50. A single failed renewal does not remove access accidentally.**

**51. Temporary entitlement overrides have reason, owner, audit, and expiry where applicable.**

**52. Feature flags are not contractual entitlements.**

**53. Payment-card data exposure is minimized.**

**54. Hosted/tokenized provider collection is preferred where it reduces PCI scope safely.**

**55. Raw card credentials and sensitive authentication data are not stored casually.**

**56. Payment-method references retain correct customer and tenant ownership.**

**57. Financial side effects use idempotency.**

**58. One logical payment operation has one logical idempotency identity.**

**59. Retrying uncertain requests reuses the same operation identity.**

**60. The same idempotency identity is not reused for a different amount or intent.**

**61. UI button disabling supplements but does not replace server idempotency.**

**62. A provider timeout produces unknown state until reconciled; it does not prove failure.**

**63. The application never creates a second charge merely because the first response was lost.**

**64. Authorization, capture, settlement, and refund are distinct financial states.**

**65. Customer redirect/success URLs do not prove payment success.**

**66. Asynchronous payment methods remain pending until authoritative completion.**

**67. Payment failures are categorized into permanent, transient, customer-action, technical, and unknown outcomes where useful.**

**68. Dunning policy defines retry, communication, grace, and access consequences.**

**69. Successful recovery cancels stale dunning actions.**

**70. Refunds have explicit original payment, amount, currency, reason, and idempotency.**

**71. Cumulative refunds cannot exceed authoritative refundable funds.**

**72. Requested refunds are not marked successful before provider confirmation.**

**73. Refund, store credit, subscription cancellation, and invoice correction remain distinct actions.**

**74. Disputes and chargebacks are not modeled as ordinary refunds.**

**75. Payment webhooks are authenticated before use.**

**76. Webhook signature verification follows the provider's exact payload requirements.**

**77. Payment webhooks are durably accepted before slow asynchronous processing.**

**78. Webhook processing is idempotent.**

**79. Duplicate webhook deliveries are expected.**

**80. Webhook ordering is never assumed.**

**81. Older webhook events cannot regress newer authoritative state incorrectly.**

**82. Unknown future webhook types do not break the entire receiver.**

**83. Webhook delivery alone is not the complete financial synchronization strategy.**

**84. Important financial state is periodically reconciled against provider records.**

**85. Reconciliation can repair missed internal events without duplicating charges.**

**86. Reconciliation differences are auditable and alertable.**

**87. Financial history is append-oriented; errors are corrected by adjustment/reversal rather than deletion.**

**88. Revenue analytics is not the accounting source of truth.**

**89. Manual financial actions use privileged, audited workflows.**

**90. Billing interfaces always show amount and currency together where ambiguity matters.**

**91. Payment pages minimize third-party scripts and payment-data exposure.**

**92. Production and test payment environments are strongly separated.**

**93. Test-mode financial objects never satisfy production obligations.**

**94. Billing objects preserve tenant/customer ownership end-to-end.**

**95. Payment-provider migrations prevent duplicate billing and lost entitlements.**

**96. Provider/webhook outages do not permanently corrupt financial state because recovery and reconciliation exist.**

**97. Financial and tax records follow explicit retention requirements even after account deletion.**

**98. Billing tests cover asynchronous failure, retries, duplicate events, out-of-order events, and unknown outcomes—not only success paths.**

**99. Every financial mutation should be explainable afterward from durable records.**

**100. If the system cannot explain exactly why a customer was charged, invoiced, refunded, taxed, granted access, or denied access, the billing architecture is not production-grade.**

---

# 386. Canonical Billing & Payments Standard

The organizational standard is:

> **Billing and payments are modeled as an explicit financial domain rather than a collection of payment-provider API objects. Product, Plan, Price, Subscription, Invoice, Payment, Refund, Credit, Tax, and Entitlement are distinct concepts with stable identities, documented state machines, historical records, and clear ownership. Provider state is normalized into this domain and continuously reconciled rather than becoming the only application source of commercial truth.**

> **All money has an explicit currency and uses exact arithmetic. Authoritative calculations never rely on binary floating point, currency precision is obtained from maintained metadata rather than a universal two-decimal assumption, rounding occurs at documented financial boundaries, and conversion between currencies is an explicit operation preserving source amount, destination amount, exchange rate, source, timestamp, and rounding semantics where financially material.**

> **Pricing is versioned commercial configuration. Historically used price semantics are immutable, new commercial amounts or billing terms create new price identities or versions, discounts and credits have explicit scope and duration, and authoritative checkout totals are calculated server-side from approved pricing state rather than trusting browser-supplied amounts. Existing invoices and historical transactions remain interpretable even after pricing changes.**

> **Tax is treated as regulated financial logic. Product tax classification, customer location, tax identifiers, exemption evidence, inclusive/exclusive behavior, rates, taxable basis, and refund adjustments are derived from approved tax policy or a governed tax engine; developers do not invent jurisdictional rates; and issued financial documents preserve enough of the original calculation to remain historically explainable even when tax configuration later changes.**

> **Invoices are durable financial documents. Drafts may evolve until finalization, while issued invoices preserve seller/customer identity, line items, quantities, currency, discounts, taxes, service periods, totals, due dates, and other required facts. Corrections use appropriate void, credit-note, adjustment, or reissue workflows instead of rewriting history, and invoice numbering and retention follow applicable legal/accounting policy.**

> **Subscriptions are explicit commercial state machines whose provider representations are adapters rather than the product contract itself. Trials, billing anchors, prorations, upgrades, downgrades, pauses, quantity changes, renewal failures, cancellation timing, and termination behavior are documented, while entitlement state is separately derived from the contract, current subscription/payment state, grace policy, and approved overrides. Feature authorization never depends solely on a raw provider subscription status.**

> **Payment execution is idempotent and uncertainty-aware. Each side-effectful financial operation receives a durable logical operation identity, retried requests reuse that identity, timeouts are treated as unknown outcomes rather than failures, customer redirect pages never constitute proof of payment, and authorization, capture, settlement, refund, and dispute states remain distinct. Asynchronous payment methods are supported without prematurely representing pending money as settled.**

> **Provider webhooks are authenticated, durably ingested, rapidly acknowledged, processed asynchronously, deduplicated, idempotent, and safe under duplicate or out-of-order delivery. Webhook payloads do not blindly overwrite internal state; events are checked against valid state transitions or current provider state; unknown event types degrade safely; failed processing enters a visible recovery path; and webhook delivery is supplemented by independent reconciliation against provider APIs or settlement/financial reports.**

> **Failed-payment handling separates financial failure from product access policy. Retry eligibility, customer action, dunning cadence, grace period, communications, restriction, and final termination are independently defined, and one recoverable payment failure does not accidentally destroy data or terminate entitlement. Successful recovery cancels obsolete collection actions and restores commercial state according to explicit rules.**

> **Refunds, credits, disputes, and adjustments remain distinct auditable financial operations. Refunds are bounded by authoritative captured/refundable value, support partial amounts, use idempotency, do not become successful until confirmed, and update invoice/accounting state through appropriate adjustment documents; disputes follow their own lifecycle and evidence deadlines; and manual financial actions are protected by Admin & Internal Tools authorization, reason, approval thresholds, and audit trails.**

> **Payment security minimizes exposure to payment-account data. Provider-hosted or tokenized payment collection is preferred when appropriate, PCI scope is explicitly assessed, raw sensitive card credentials are not stored or logged unnecessarily, payment pages minimize third-party execution and protect their supply chain, provider keys and webhook secrets use managed secret storage, and test/live provider environments are strongly isolated.**

> **Billing state is auditable and reconciled. Material financial facts use append-oriented history, manual corrections create new adjustment records rather than deleting prior truth, analytics events do not substitute for financial records, provider settlement and refund totals are compared with internal records at a cadence appropriate to risk, and every discrepancy can be detected, investigated, repaired idempotently, and linked to an operational audit trail.**

A production-grade billing architecture should make it easy to answer:

```text
What exact amount was charged?
In which currency?
What currency precision was used?
What rounding rule produced the result?
Which price version governed the purchase?
Was tax inclusive or exclusive?
Which tax inputs/rule produced the tax?
What invoice was created?
Can that invoice ever change after issuance?
Which subscription state is currently authoritative?
What entitlements does that state imply?
What happens when renewal payment fails once?
When does grace end?
What changes when cancellation is scheduled?
What happens at period end?
What payment operation id prevents duplicate charging?
What happens if the provider charges successfully but our request times out?
Can refreshing checkout charge again?
How is the webhook authenticated?
Can the same webhook safely arrive ten times?
What happens if events arrive out of order?
How do we recover if the webhook never arrives?
When did we last reconcile this payment with the provider?
What is the maximum refundable amount?
Can two concurrent refund requests exceed it?
Is a refund distinct from account credit and subscription cancellation?
Which tenant owns the payment method and subscription?
What payment data do we store directly?
What is our PCI scope?
How are provider test and live environments separated?
Which records survive account deletion for legal/accounting reasons?
Can finance/support explain every historical charge and adjustment from durable records?
```

If those questions cannot be answered reliably, the product can accept money, but it does not yet have a governed billing and payments architecture.

The standards baseline supports several of these decisions. **ISO 4217:2015 remains the current confirmed ISO standard** for currency representation as of September 2026; it defines three-letter currency codes and explicitly includes the relationship between currencies and their minor units. That is why the standard prohibits assuming every currency has two decimal places. citeturn843890search1turn843890search2

For card payments, **PCI DSS v4.0.1 remains the current PCI DSS version** in the PCI SSC document library as of September 23, 2026; PCI SSC states that the standard applies to entities that store, process, transmit cardholder/sensitive authentication data **or could impact the security of the cardholder-data environment**. PCI SSC began gathering feedback for the next iteration in June 2026, but v4.0.1 remains the currently published standard. citeturn672487search1turn672487search2turn672487search5

The idempotency and reconciliation rules also reflect actual payment-provider failure semantics rather than theory. Adyen explicitly supports idempotency so a timed-out payment request can be retried without creating another financial effect, and recommends combining idempotent requests with asynchronous webhooks. citeturn843890search0 Stripe likewise documents idempotency specifically for safely repeating requests without performing the financial operation twice. citeturn843890search5

For webhooks, Adyen's current guidance says to **verify authenticity/integrity, durably store or queue the event, acknowledge it, and then process business logic**; it also explicitly warns that duplicates can occur. Its payment documentation recommends using webhook state for asynchronous business processing rather than relying only on the immediate API response. citeturn843890search3turn843890search9 This is why the canonical standard requires duplicate-safe, asynchronous webhook handling **plus independent reconciliation** instead of treating webhook delivery as exactly-once messaging.

Canonical master placement:

**… → Admin & Internal Tools → Multi-Tenancy → Data & Database → Billing & Payments → API → Routes → State Management → …**
