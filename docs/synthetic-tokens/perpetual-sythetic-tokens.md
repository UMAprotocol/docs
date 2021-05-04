---
title: How Perpetual Synthetic Tokens Work
sidebar_label: Perpetual Synthetic Tokens
---

The perpetual contract is an extension of the ExpiringMultiParty (“EMP”) contract, which allows sponsors to create synthetic tokens with collateral tokens and the key difference being that the perpetual does not expire.  

The Perpetual and the EMP contracts share most of the same interface. However, the first major departure from the Expiring contract is the Perpetual’s removal of an expiration date. There is no “expiry settlement” logic in the Perpetual. Since the Perpetual share the same interface as the EMP, this explainer will focus on how the perpetual works in more detail. If you want to know more about how to manage your positions, liquidations and how to redeem tokens, use the [Expiring Synthetic Tokens](synthetic-tokens/expiring-synthetic-tokens.md) as a starting point.

Without the promise of impending expiry, perpetual synthetic token holders can no be assured that the synthetic tokens can be redeemed in the future for some value. Without a settlement value pulling the synthetic tokens’ price to the tracking price of the price identifier, a new mechanism is necessary to nudge the token to a fair value. This ius where the funding rate comes in. UMA's funding rate works by forcing a payment between token sponsors and token holders in either direction to be able to push the synthetic price closer to the underlying price.

To illustrate how the funding rate works, we use the following example:

There is a perpetual contract that looks at the ETHUSD price, accepts DAI as collateral at a 150% CR and mints synthetic ETH called uETH. 
