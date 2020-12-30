---
title: Priceless DeFi Contracts
sidebar_label: Priceless Contracts
---

“Priceless” financial contracts are contracts that don’t require an on-chain price feed to function, and minimize on-chain oracle usage to reduce the frequency and surface area for oracle attacks.
They are designed with mechanisms to incentivize counterparties to properly collateralize their positions without requiring any on-chain price feed.

These mechanisms include a liquidation and dispute process that allows counterparties to be rewarded for identifying improperly collateralized positions.
Unless a position is liquidated, it is assumed to be solvent (properly collateralized).
Oracles are only used when a liquidation is disputed — which is designed to be rare.


#### Additional Resources

Here are some additional resources to look at to better understand how the priceless synthetic token contract works:

- [Documentation](synthetic-tokens/explainer.md)
- [Blog post](https://medium.com/uma-project/priceless-synthetic-tokens-f28e6452c18b)
- [Twitter thread](https://twitter.com/UMAprotocol/status/1242891550872535042?s=20)
- [Github implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates)