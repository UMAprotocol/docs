---
title: Governance
sidebar_label: Governance
slug: /Welcome
---

UMA token is used to operate UMA's optimistic oracle, known as the Data Verification Mechanism (DVM). Owning UMA gives you the ability to contribute price information to the DVM and govern UMA protocol. 

The two main types of decisions UMA token holders make include:

**UMA Improvement Proposals (UMIPs)**

UMIPs propose changes to the UMA ecosystem.  Any modification to the UMA protocol must be proposed and voted on through a UMIP before it can be implemented.  Common types of UMIPs include the addition of a new collateral currency or a new price identifier, which specifies how to obtain the price of a particular synthetic asset. 

**Disputes from liquidations**

If a Liquidator Bot identifies a position it believes to be undercollatearlized, a Dispute Bot can dispute the liquidation if it believes the Liquidator Bot is incorrect or acting malicious. When a Dispute Bot disputes a liquidation, a request to UMA's oracle known as the Data Verification Mechanism (DVM) will be initiated. The DVM will propose a request to UMA token holders to supply the price of an asset at a particular timestamp. The DVM will aggregate UMA token holder votes and report the price of the asset on-chain and reward the Disputer Bot and penalize the Liquidator Bot (or vice versa if the liquidator was correct). Following the result from the DVM, the position will become liquidated or remain solvent. 

UMA token holders are rewarded for participation in governance by a 5% reward for voting in congruence with the majority, incentivising considered participation. 
