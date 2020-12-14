---
title: Priceless DeFi Contracts
sidebar_label: Synthetic Tokens
---

“Priceless” financial contracts are contracts that don’t require an on-chain price feed to function, and minimize on-chain oracle usage to reduce the frequency and surface area for oracle attacks.
They are designed with mechanisms to incentivize counterparties to properly collateralize their positions without requiring any on-chain price feed.
These mechanisms include a liquidation and dispute process that allows counterparties to be rewarded for identifying improperly collateralized positions.
Unless a position is liquidated, it is assumed to be solvent (properly collateralized).
Oracles are only used when a liquidation is disputed — which is designed to be rare.

### Priceless Synthetic Tokens

One can write priceless financial contract templates to create various kinds of financial products.
As a first template, the UMA team has written one to create expiring synthetic tokens, called the Expiring MultiParty (EMP). This is only the first example of a synthetic token implementation, and is by no means restrictive on the types of synthetic tokens that could be built on UMA's infrastructure.

These are ERC-20 tokens whose required backing collateral is determined by the value of a price identifier.
There is no on-chain price feed for the values of the price identifier; rather, token holders and token sponsors should monitor the value of this price identifier off-chain to inform their decisions about how much collateral to maintain on-chain.
If token sponsors are improperly collateralized, liquidators can liquidate token sponsors’ positions.
Improper liquidations can be disputed by disputers. Details on these mechanisms are available [here](synthetic-tokens/explainer.md).

#### Additional Resources

Here are some additional resources to look at to better understand how the priceless synthetic token contract works:

- [Documentation](synthetic-tokens/explainer.md)
- [Blog post](https://medium.com/uma-project/priceless-synthetic-tokens-f28e6452c18b)
- [Twitter thread](https://twitter.com/UMAprotocol/status/1242891550872535042?s=20)
- [Github implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates)