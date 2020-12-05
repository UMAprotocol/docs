---
title: The UMIP Process
sidebar_label: The UMIP Process
---

UMA Improvement Proposals (UMIPs) are design documents used to propose changes to the UMA ecosystem. UMIPS are intended to be the primary mechanism for proposing new features, collecting community input on an issue, and for documenting the design decisions that have gone into the UMA protocol. 

UMIPs are a convenient way to track the progress of an implementation. Examples of common UMIPS include adding a new collateral currency or price identifier to be supported by the DVM. UMIPS are to be proposed to UMA tokenholders where they will be voted on and accepted or rejected.

UMIPs need to provide a concise technical specification of the feature and a rationale for the feature. They are modeled after [EIPs](https://eips.ethereum.org/) and [ZEIPs](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370). See here for an [EIP template](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370) and [ZEIP template](https://github.com/0xProject/ZEIPs/blob/master/ISSUE_TEMPLATE.md). 

## What is the lifecycle of a UMIP?

A successful UMIP will move along the following stages: Draft ⟶ Last Call ⟶ Final ⟶ Approved.
Unsuccessful states are also possible: Abandoned and Rejected.

### Draft

A UMIP that is open for consideration and is undergoing rapid iteration and changes.
In order to proceed to “Last Call,” the implementation must be complete.
Every UMIP author is responsible for facilitating conversations and building community consensus for the proposal.

### Last call

A UMIP that is done with its initial iteration and ready for review by a wide audience.
If upon review, there is a material change or substantial unaddressed complaints, the UMIP will revert to "Draft".
If the UMIP requires code changes, the core devs must review the UMIP.
A successful UMIP will be in "Last Call" status for a reasonable period of time for comments and be merged (if necessary) before moving to a tokenholder vote.

### Final

An UMIP that successfully passes the "Last Call" will move to the "Final" state and be put to UMA tokenholder vote.

### Approved

If tokenholders approve the proposal, the live protocol will be updated to reflect it. At this time, any code changes (if relevant) should be merged into the core protocol repository so that the core protocol repository always reflects the live code that is running. The UMIP is then considered to be in the "Approved" state.

### Abandoned

If at any point during the UMIP Finalization Process, a UMIP is abandoned, it will be labeled as such.
Grounds for abandonment include a lack of interest by the original author(s), or it may not be a preferred option anymore.

### Rejected

If tokenholders do not approve a proposal, or the UMIP is fundamentally broken or rejected by the core team, it will not be implemented.

## What are the components of a UMIP?

See below for UMIP components and an example template of a UMIP for adding a new price identifier. 

### Headers

<b> UMIP </b>  - [Enter UMIP Number]  <br/>
<b> Title </b> -  Add [Base currency / Quote currency] as a price identifier  <br/>
<b> Author </b> - [Name or username and email]  <br/>
<b> Status:  </b> - [Draft, Last Call, Final, Approved, Abandoned, Rejected]  <br/>
<b> Created </b> - [Month, Day, Year]  <br/>

### Summary (2-5 sentences)
"If you can't explain it simply, you don't understand it well enough." Provide a simplified and layman-accessible explanation of the issue.

#### Example template for adding a new price identifier
The DVM should support price requests for the [Base currency / Quote currency] price index. 

### Motivation

The motivation is critical to change the UMA protocol. It should clearly explain why the existing protocol specification is inadequate with respect to the issue raised.

#### Example template for adding a new price identifier
The DVM currently does not support the [Base currency / Quote currency] price index.
- What use case is addressed by adding this identifier?
- What are the financial positions enabled by creating this synthetic that do not already exist? 
- Consider adding market data -- e.g., if we add a “Dai alternative,” the author could show the market size of Dai.

### Technical specification

The technical specification should describe the syntax and semantics of the proposed solution for the issue raised. If a suggestion is proposed, provide sufficient details so that an implementation would be possible (Proof of Concepts are acceptable).

#### Example template for adding a new price identifier

- <b> Identifier name </b>: [Base currency / Quote currency]
- <b> Base Currency </b>: The currency the DVM will be reporting prices on.
- <b> Quote Currency</b>: The currency to report the  base currency in.
- <b> Data sources</b>: Where tokenholders will obtain price information (e.g., exchanges)
- <b>Result Processing</b>: The DVM will aggregate votes from tokenholders on price requests. The result processing field denotes the processing the DVM will perform to determine the final price of an asset (e.g., take the median or mode of all votes submitted).
- <b>Input Processing</b>: Denotes if and why UMA token holders should change the calculation method for a price identifier. For example, for ETH/USD price requests, inputs are results received from exchanges and if an exchange is no longer valid, then human intervention is required. The input processing can typically be denoted as "Human intervention in extreme circumstances where the result differs from broad market consensus". 
- <b> Price Steps</b>: The amount of decimal places the price identifier will be reported in. <b>Note </b> - the collateral currency decimals need to be greater than or equal to the price identifier’s decimals. 
- <b>Rounding</b>:  How UMA tokenholders should round prices obtained during a price request (e.g., 0.5 round up).
- <b>Pricing Interval</b>: Price feeds do not always have granularity in seconds, so this allows a UMIP to specify how to round the timestamp. For example, if you had a pricing interval of 1 minute (which is common), it means you would "round" 10:50:45 to 10:50:00. 
- <b>Dispute timestamp rounding</b>: Timestamps can be rounded up or down.

### Rationale

The rationale should flesh out the specification by describing what motivated the design and why particular design decisions were made, as well as any alternative designs that were considered.

#### Example questions to address for a new price identifier

- What is the cost of API access to this index? How hard is it to find?
- Why this implementation of the identifier as opposed to other implementation designs?
- What analysis can you provide on where to get the most robust prices? (Robust as in legitimate liquidity, legitimate volume, price discrepancies between exchanges, and trading volume between exchanges)
- What is the potential for the price to be manipulated on the chosen exchanges?
- Should the prices have any processing (e.g., TWAP)?

### Implementation

An implementation must be completed before any UMIP proceeds to “Last Call” status.

#### Example questions to address for a new price identifier

- How should tokenholders arrive at the price in the case of a DVM price request?
     - This could be a waterfall of if-then statements, e.g., if a certain exchange is blacked out, then proceed in a different way.

#### Example template for adding a new price identifier

After following the suggested steps to obtain the price, token holders should determine whether that median differs from broad market consensus. This is meant to be vague as the $UMA tokenholders are responsible for defining broad market consensus.

Ultimately, how one queries the exchanges should be varied and determined by the voter to ensure that there is no central point of failure. While it's important for tokenholders to have redundancy in their sources, bots and users that interact with the system in realtime need fast sources of price information. In these cases, it can be assumed that the exchange median is accurate enough.

### Security considerations

All UMIPs must include a discussion of the security implications/considerations relevant to the proposed change as well as proposed mitigations. A UMIP cannot proceed to “Final” status without a sufficient security review from the core team.

#### Example questions to address for a new price identifier

* Where could manipulation occur?
* How could this be exploited?
* Do the instructions for determining the price provide people with enough certainty?
* What are current or future concern possibilities with the way the price identifier is defined?
* Are there any concerns around if the price identifier implementation is deterministic? 

#### Example template for adding a new price identifier

Adding this new identifier by itself poses little security risk to the DVM or priceless financial contract users. However, anyone deploying a new priceless token contract referencing this identifier should take care to parameterize the contract appropriately to the reference asset’s volatility and liquidity characteristics to avoid the loss of funds for synthetic token holders. 
    
Additionally, the contract deployer should ensure that there is a network of liquidators and disputers ready to perform the services necessary to keep the contract solvent. $UMA-holders should evaluate the ongoing cost and benefit of supporting price requests for this identifier and also contemplate de-registering this identifier if security holes are identified. 
