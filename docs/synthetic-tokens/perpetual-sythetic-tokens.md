---
title: How Perpetual Synthetic Tokens Work
sidebar_label: Perpetual Synthetic Tokens
---

The perpetual contract is an extension of the ExpiringMultiParty (“EMP”) contract, allowing sponsors to create synthetic tokens with collateral tokens. The critical difference is that the perpetual does not expire.  

The Perpetual and the EMP contracts share most of the same features. However, the first and most notable departure from the Expiring contract is the Perpetual’s removal of an expiration date. There is no “expiry settlement” logic in the Perpetual. Since the Perpetual share the same interface as the EMP, this explainer will focus on how the perpetual works in more detail. If you want to know more about managing your positions, liquidations, and how to redeem tokens, use the [Expiring Synthetic Tokens](synthetic-tokens/expiring-synthetic-tokens.md) as a starting point.

Without promising impending expiry, perpetual synthetic token holders can not be assured that the synthetic tokens are redeemable in the future for some value. Without a settlement value pulling the synthetic tokens’ price to the tracking price of the price identifier, a new mechanism is necessary to nudge the token to a fair value. At this point is where the funding rate comes in. UMA's funding rate works by forcing a payment between token sponsors and token holders in either direction to be able to push the synthetic price closer to the underlying price.

**To illustrate how the funding rate works, we use the following example:**

A perpetual contract looks at the ETHUSD price, accepts DAI as collateral at a 150% CR, and mints synthetic ETH called uETH. The uETH synthetic can be traded on another market like on a DEX. For a simple example, the synthetic uETH trades against ETH, assuming that price between them would be 1:1. For many reasons, this does not always hold. When the price between a synthetic and its underlying asset differs (ETH and uETH), a perpetual contract constantly queries an external contract that applies a funding rate. In turn, updates a multiply which adjusts a "funding rate multiplier."  

An increase or decrease in the multiplier changes the value of the token debt or synthetic. This is a slight deviation from traditional perpetual contracts, which changes the value of the collateral. This change is optimal in the DeFi space since being able to pull collateral is challenging and costly.

[ADD picture]

## Liquidations and collateralization ratios.

The funding rate multiplier determines the value of the outstanding synthetic versus the collateral backing it. Using the funding rate, liquidation bots determine if a position is sufficiently collateralized or not by taking into account the original collateralization ratio that has been adjusted for by the funding rate. Meaning that the token balances do not change during the position’s lifecycle; instead only come into effect when the position is liquidated. 

## Using the optimistic Oracle 

UMA’s infrastructure relies on Optimistic Oracle to ensure that changes to the funding rate are 
done through an escalation process of a requester, proposer, and disputer. 

Any account can request a new funding rate. Requesters can deposit a reward to incentivize a proposer.
A proposer can propose a new funding rate along with a bond when proposing a new price. If their proposal goes undisputed, the proposer gets their bond back, along with their requester’s reward.
If a disputer believes that a proposal is incorrect, then it can dispute the proposer. A disputer must pay the same bond paid by the proposer plus a final fee. 

Once a dispute is resolved through the DVM, the winner of the dispute, either the proposer or the disputer, receives a refund for their original total bond (proposal bond plus final fee), plus the loser’s proposal bond plus the requester’s reward.

We use the Optimistic Oracle’s architecture to incentivize others to report live and accurate funding rates for each perpetual contract. Proposers are expected to monitor off-chain the divergence between the synthetic token price and the price identifier’s tracking price. Like the EMP, the Perpetual relies on a robust network of monitor bots that quickly update and dispute funding rates and trigger liquidations to receive rewards.
