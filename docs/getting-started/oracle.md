---
title: UMA's Oracle Design
sidebar_label: Oracle System
---

Many use-cases for blockchains and smart contracts require trustless access to off-chain information.
Decentralized financial contracts, for example, require accurate price data for valuation, margining and settlement.

The mechanism used to report off-chain information to a blockchain or smart contract is typically referred to as an oracle.
Despite a large body of existing research into oracle system design, current approaches are missing one key feature: an economic guarantee around the cost of corrupting an oracle system.

Economic guarantees around the cost of corrupting blockchain oracles are critical for the development of useful smart contracts, particularly in decentralized finance (DeFi) applications. UMA’s oracle system guarantees the economic security of a smart contract and oracle system in a fully decentralized and permissionless blockchain setting.

## UMA's Oracle System

UMA is comprised of an oracle system that only writes price data on-chain in the event of a dispute. UMA's oracle system is comprised of two core components: 

1. Optimistic Oracle

2. Data Verification Mechanism

Note - using the optimistic oracle is optional, but all contracts built on UMA 

## UMA's Optimistic Oracle

 UMA's Optimistic Oracle allows developers to efficiently and effectively request and receive price information.  The Optimistic Oracle acts as a generalized escalation game between contracts that initiate a price request and UMA's dispute resolution system known as the Data Verification Mechanism (DVM). Price infomration will not be sent to the DVM unless it is disputed (which is a rare occurrence). This enables contracts to obtain price information within any pre-defined length of time. 

 **High-Level Overview**

1. Network actors, known as Requestors, request price information. Price requests can be used to obtain prices at expiry (for an expiring contract) or to obtain funding rates (for a perpetual contract). 

2. To request a price a contract submits the following information: 
    - Asset
    - Timestamp
    - Time required to receive the price
    - Reward for receiving the price within the allocated time. 

    **Note - the contract requesting the price does not need to be registered with UMA’s DVM**

3. Network actors, known as Proposers, monitor requests on UMA and submit prices in exchange for receiving a pre-defined reward. In order to propose prices, the Proposer is required to stake a proposal bond. In the event that the price information they proposed is disputed and deemed incorrect, the Proposer will lose the bond. 

4. A Disputer can refute a price submitted by a Proposer during the proposal liveness period. The proposal liveness period is a pre-defined amount of time a proposal can be disputed before it is finalized. 

5. If a proposal is disputed, the price will be submitted to UMA’s DVM and resolved within 48-hours. 

![](/docs/oracle/oo2.png)


## UMA's Data Verification Mechanism?

The “Data Verification Mechanism” (DVM) is the dispute resolution service for contracts built on UMA Protocol. Disputes occur via to channels: 

1. Disputes from proposed prices via a Proposer
2. Disputes from liquidation via Liquidators

In the event of a dispute, a price request is submitted to the DVM which proposes a vote to UMA tokenholders to report the price of the asset at a specific timestamp. UMA tokenholders will reference the price identifier's [UMIP](uma-tokenholders/umips.md) to determine how to calculate the price of the asset via off-chain price feeds and record the price of the asset in UMA's [Voter dApp](uma-tokenholders/voter-dApp.md). The DVM will then aggregate votes from UMA tokenholders to determine the final price of the asset for a given timestamp. 

If the price returned by the DVM concludes the disputer was correct, the Proposer or Liquidator will lose the bond that was staked and the Disputer will be rewarded. If the DVM concludes the Proposer or Liquidator was correct the disputer will lose its dispute bond and the liquidator or Proposer will be rewarded. 

The DVM is powerful because it encompasses an element of human judgment to ensure contracts are securely and correctly managed when issues arise from volatile (and sometimes maniputable) markets. Additionally, UMA's oracle system is constructed with economic guarantees around the cost of corrupting the DVM to ensure it will always cost more to corrupt the oracle (i.e., obtain 51% or more UMA tokens) that it will be to profit from corrupting the oracle (i.e. stealing funds from the contracts built on UMA). View [here](oracle/econ-architecture.md) for more information on UMA's economic guarantees. 

## Additional Resources

Here are some additional resources regarding the UMA DVM:

- [Technical Architecture](oracle/tech-architecture.md)
- [Economic Architecture](oracle/econ-architecture.md)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) on UMA’s DVM design
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) on UMA’s DVM design
- [Research repo](https://github.com/UMAprotocol/research) for optimal fee policy
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) for governance proposals