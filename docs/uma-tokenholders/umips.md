---
title: The UMIP Process
sidebar_label: The UMIP Process
---

UMA Improvement Proposals (UMIPs) are design documents used to propose changes to the UMA ecosystem. UMIPS are intended to be the primary mechanism for proposing new features, collecting community input on an issue, and for documenting the design decisions that have gone into the UMA protocol. 

UMIPs are a convenient way to track the progress of an implementation. Examples of common UMIPS include adding a new [collateral currency or price identifier](adding-price-id.md) to be supported by the DVM. UMIPS are to be proposed to UMA tokenholders where they will be voted on and accepted or rejected.

UMIPs need to provide a concise technical specification of the feature and a rationale for the feature. They are modeled after [EIPs](https://eips.ethereum.org/) and [ZEIPs](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370). See here for an [EIP template](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370) and [ZEIP template](https://github.com/0xProject/ZEIPs/blob/master/ISSUE_TEMPLATE.md). 

## UMIP Process Overview

UMA tokenholders vote on UMIPs every Thursday or Friday of the week (depending on which day the commit period falls). View [here](TOBEADDED) for the community voting schedule.  

## What is the lifecycle of a UMIP?

A successful UMIP will move along the following stages: Draft ⟶ Last Call ⟶ Final ⟶ Approved.
Unsuccessful states are also possible: Abandoned and Rejected.

In order for a UMIP to be voted on it must achieve a status of 'Final. See below for the steps needed to be completed by a UMIP author for their UMIP to reach a 'Final' status. 


### Step 1 - Draft the UMIP

A UMIP with a status of 'Draft' is open for consideration and is undergoing rapid iteration and changes. 

If you plan to build with a price identifier or collateral currency not currently supported by the UMA DVM, you will need to propose it to the community of UMA tokenholders for a vote.

You should create a UMIP in which you describe your project and the new price identifier(s) or collateral currencies being requested.
Details on how to write a UMIP for a new price identifier are [here](https://github.com/UMAprotocol/UMIPs/blob/master/price-identifier-guide.md). The UMIP will be discussed by members of the UMA community.


     #### Step 2 - Address comments by the community

     Every UMIP author is responsible for facilitating conversations and building community consensus for the proposal. In order for the UMIP to be put up for a vote, the UMIP author must address implementation issues brought up by community members. 

     In addition to asynchronous reviews by the community, a weekly UMIP review call occurs every Monday at 15:00 UTC.  The objective of the call is for the community to discuss which UMIPs can be moved into 'Last Call' status and can be put up for a vote on the following Thursday / Friday commit day. Issues identified in the weekly community review call need to be addressed by the following Wednesday at 15:00 UTC in order to be put up for a vote in the current week. 

### Last call


### Step 2: Get ready for the vote 

In order for the UMIP to move to the next stage of discussion, an off-chain transaction to add the proposed price identifier or collateral currency to the mainnet `IdentifierWhitelist` will need to be proposed. This transaction should be attached to the UMIP.

### Step 3: Vote

UMA voters will vote on the proposed transaction. Each UMA token represents one vote. If at least 5% of all tokens are used to vote, of which >50% of votes approve the UMIP, the UMIP is considered approved.

### Step 4: Execute transaction

Once the proposal has been approved, anyone can initiate the governor contract to execute the proposed transaction.
The governor contract will then execute the transaction, approving the identifier in `IdentifierWhitelist`.

## Voting schedule





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

