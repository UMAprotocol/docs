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

## Additional Resources

Here are some additional resources regarding the UMA DVM:

- [Technical Architecture](oracle/tech-architecture.md)
- [Economic Architecture](oracle/econ-architecture.md)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) on UMA’s DVM design
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) on UMA’s DVM design
- [Research repo](https://github.com/UMAprotocol/research) for optimal fee policy
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) for governance proposals