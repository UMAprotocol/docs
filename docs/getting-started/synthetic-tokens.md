---
title: Priceless DeFi Contracts
sidebar_label: Priceless Contracts
---

Decentralized oracle solutions today consist of API's that repeatedly submit price data on-chain to manage DeFi contracts. Solutions also have no way to dispute an incorrect price reported from an API. This makes contracts vulnerable to corruption, manipulation, flash loan attacks and ad-hoc market events.

Priceless financial contracts are contracts that only require writing a price on-chain in the event of a dispute (which is designed to be rare). Priceless contracts minimize reliance on oracles, making contracts on UMA less vulnerable to attacks. 

Priceless contracts are designed with mechanisms to incentivize people who mint synthetic tokens (called token sponsors) to ensure that their positions are backed with the appropriate amount of collateral. Taking out a position involves minting a synthetic token, which can be repaid to close the position and return the collateral. Positions are assumed to be solvent unless they are identified as being under collateralized. It is the responsibility of token sponsors to ensure that their positions are always backed by the required amount of collateral.

A key mechanism to ensure a position is properly collateralized is a liquidations and disputes process that rewards the liquidation of positions that are under collateralized. Anyone can initiate a liquidation by staking a liquidator bond and referencing their own off-chain price feeds to determine what the price of the asset is. The liquidation will pend for 2 hours until the liquidation liveness period ends to provide the opportunity for a Disputer to dispute the liquidation (if needed). Most liquidations and disputes are initiated automatically by bots monitoring contracts on UMA. 


#### Additional Resources

Here are some additional resources to look at to better understand how the priceless synthetic token contract works:

- [Documentation](synthetic-tokens/what-are-synthetic-assets.md)
- [Blog post](https://medium.com/uma-project/priceless-synthetic-tokens-f28e6452c18b)
- [Twitter thread](https://twitter.com/UMAprotocol/status/1242891550872535042?s=20)
- [Github implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates)