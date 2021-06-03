---
title: The UMIP Process
sidebar_label: The UMIP Process
---

UMA Improvement Proposals (UMIPs) are design documents used to propose changes to the UMA ecosystem. UMIPs are intended to be the primary mechanism for proposing new features, collecting community input on an issue, and for documenting the design decisions that have gone into the UMA protocol. 

UMIPs are a convenient way to track the progress of an implementation. Examples of common UMIPS include adding a new [collateral currency or price identifier](adding-price-id.md) to be supported by the DVM. UMIPs are presented to UMA tokenholders for voting through the voting dapp to determine whether they will be accepted or rejected.

UMIPs need to provide a concise technical specification of the feature and a rationale for the feature. They are modeled after [EIPs](https://eips.ethereum.org/) and [ZEIPs](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370). See here for an [EIP template](https://blog.0xproject.com/0x-protocol-governance-voting-walkthrough-and-faq-3becfd57a370) and [ZEIP template](https://github.com/0xProject/ZEIPs/blob/master/ISSUE_TEMPLATE.md). 

## UMIP Process Overview

A successful UMIP will move along the following stages: Early Stage ⟶ Draft ⟶ Last Call ⟶ Final ⟶ Approved.
Unsuccessful states are also possible: Abandoned and Rejected.

In order for a UMIP to be voted on it must achieve a status of 'Final. See below for the steps needed to be completed by a UMIP author for their UMIP to reach a 'Final' status and be proposed as a vote to UMA tokenholders. 

### Step 1 - Early Stage

Early stage UMIPs can be placed in the [Early Stage forum on Discourse](https://discourse.umaproject.org/c/umip-templates/34).   Opening a new topic in any of the subcategories will open up a pre-formatted template appropriate to that UMIP type.  We have a team of early stage reviewers who can provide feedback and support to ensure that the UMIP is complete and well formed prior to draft submission to the Github.

### Step 1 - Draft

A UMIP with a status of 'Draft' is open for consideration and is undergoing rapid iteration and changes. 

If you plan to build with a price identifier or collateral currency not currently supported by the UMA DVM, you will need to propose it to the community of UMA tokenholders for a vote. View [here](adding-price-id.md) for guidance on creating a UMIP for a price identifier or collateral currency. 

Every UMIP author is responsible for facilitating conversations and building community consensus for the proposal. During the 'Draft' stage, the UMIP author must address implementation issues brought up by community members. If the UMIP requires code changes, the core devs must review the UMIP. 

### Last Call

A UMIP with a status of 'Last Call" has completed the weekly UMIP review with no outstanding concerns from the community. At this stage, UMA tokenholders will be notified of the upcoming votes and given a last call to provide any comments or feedback on the UMIP. If upon review, there is a material change or substantial unaddressed complaints, the UMIP will revert to "Draft".

A successful UMIP will be in "Last Call" status for 48 hours to allow for comments before moving to a tokenholder vote. 

- #### Get ready for the vote 

     - In order for the UMIP to move to the next stage of discussion, an on-chain transaction to add the proposed price identifier or collateral currency to the mainnet `IdentifierWhitelist` will need to be proposed. This transaction should be attached to the UMIP.

### Final

An UMIP that successfully passes the "Last Call" will move to the "Final" state and be put up for a vote to UMA tokenholders.

- #### Vote

     - UMA tokenholders vote on UMIPs every Thursday or Friday of the week (depending on which day the commit period falls). 
          - View [here](https://calendar.google.com/calendar/u/0/embed?src=c_soder0b7n0mgutr5jdbin9aqgs@group.calendar.google.com&ctz) for the community voting schedule.  
     - Each UMA token represents one vote. If at least 5% of all tokens are used to vote, of which >50% of votes approve the UMIP, the UMIP is considered approved.


### Approved

Once the proposal has been approved, anyone can initiate the governor contract to execute the proposed transaction. The governor contract will then execute the transaction, approving the identifier in `IdentifierWhitelist`. 

At this time, any code changes (if relevant) should be merged into the core protocol repository so that the core protocol repository always reflects the live code that is running. The UMIP is then considered to be in the "Approved" state.

### Abandoned

If at any point during the UMIP Finalization Process, a UMIP is abandoned, it will be labeled as such.
Grounds for abandonment include a lack of interest by the original author(s), or it may not be a preferred option anymore.

### Rejected

If tokenholders do not approve a proposal it will not be implemented.
