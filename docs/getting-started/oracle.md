---
title: UMA's Oracle Design
sidebar_label: Optimistic Oracle Service
---

Many use-cases for blockchains and smart contracts require trustless access to off-chain information.
Decentralized financial contracts, for example, require accurate price data for valuation, margining and settlement.

The mechanism used to report off-chain information to a blockchain or smart contract is typically referred to as an oracle.
Despite a large body of existing research into oracle system design, current approaches are missing one key feature: an economic guarantee around the cost of corrupting an oracle system.

Economic guarantees around the cost of corrupting blockchain oracles are critical for the development of useful smart contracts, particularly in decentralized finance (DeFi) applications.
UMA’s Data Verification Mechanism (DVM) oracle constructions guarantees the economic security of a smart contract and oracle system in a fully decentralized and permissionless blockchain setting.


## What is UMA's Optimistic Oracle?

The “Data Verification Mechanism” (DVM) is the name of the optimistic oracle service provided by UMA. The DVM does not provide prices via an on-chain price feed. Instead, it is only used to resolve disputes of liquidations and to settle synthetic token contracts upon expiration. 

In the event of a dispute, a price request is submitted to the DVM which proposes a vote for UMA tokenholders to report what the price of the asset was at a specific timestamp. UMA tokenholders will reference the price identifier's [UMIP](uma-tokenholders/umips.md) to determine the price of the asset via off-chain price feeds and record the price of the asset via UMA's [Voter dApp](uma-tokenholders/voter-dApp.md). The DVM will then aggregate votes from UMA tokenholders to determine the final price of the asset for a given timestamp. 

If the price returned by the DVM concludes the disputer was correct, the liquidator will lose its liquidation bond and the disputer will be rewarded. If the DVM concludes the liquidator was correct the disputer will lose its dispute bond and the liquidator will be rewarded. 


## Additional Resources

Here are some additional resources regarding the UMA DVM:

- [Technical Architecture](oracle/tech-architecture.md)
- [Economic Architecture](oracle/econ-architecture.md)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) on UMA’s DVM design
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) on UMA’s DVM design
- [Research repo](https://github.com/UMAprotocol/research) for optimal fee policy
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) for governance proposals