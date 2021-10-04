---
title: UMA's Oracle System
sidebar_label: Oracle System
---

UMA's oracle system is comprised of two core components: 

1. Optimistic Oracle 

2. Data Verification Mechanism (DVM) 

UMA's Optimistic Oracle allows contracts to quickly request and receive price information. The Optimistic Oracle acts as a generalized escalation game between contracts that initiate a price request and UMA's dispute resolution system known as the Data Verification Mechanism (DVM). Prices proposed by the Optimistic Oracle will not be sent to the DVM unless it is disputed. This enables contracts to obtain price information within any pre-defined length of time without the need to have the price of an asset written on-chain. 

If a dispute is raised, a request is sent to the DVM. All contracts built on UMA use the DVM as a backstop to resolve disputes. Disputes sent to the DVM will be resolved 48 hours after UMA tokenholders vote on the price of the asset at a given time. Contracts on UMA do not need to use the Optimistic Oracle unless it requires a price of an asset faster than 48 hours. 

## Optimistic Oracle

![](/docs/oracle/optimistic.png)

1. Requestors ask for the price of an asset at a given time. A requestor submits the following information to request a price: 
    - Asset
    - Timestamp
    - Time to receive the price
    - Reward amount 

    *Note - the contract requesting the price does not need to be registered with UMA’s DVM*

2. Proposers respond to price requests by referencing off-chain price feeds to submit the price of an asset. In return for their work they will receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. In the event that the price information they proposed is disputed and deemed incorrect, the Proposer will lose their bond. 

3. Disputers can refute a price submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. The proposal liveness period is a pre-defined amount of time a proposal can be disputed before the Requestor receives the price of the asset. 

4. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is sent to the Requestor.

5.  If a proposal is disputed, the price will be submitted to UMA’s DVM and resolved after 48-hours. 

## UMA's Data Verification Mechanism

The Data Verification Mechanism (DVM) is the dispute resolution service for contracts built on UMA Protocol. Disputes occur via two channels: 

- Disputes from the Optimistic Oracle
- Disputes from contract liquidations

![](/docs/oracle/dvm.png)

1. In the event of a dispute, a price request is submitted to the DVM which proposes a vote to UMA tokenholders to report the price of the asset at a specific timestamp. 

2. The vote will conclude after 48 hours resulting in a resolved dispute. 

3. UMA tokenholders will reference the price identifier's [UMIP](uma-tokenholders/umips.md) to determine how to calculate the price of the asset via off-chain price feeds and record the price of the asset in UMA's [Voter dApp](uma-tokenholders/voter-dApp.md). 

4. The DVM will aggregate votes from UMA tokenholders to determine the final price of the asset for a given timestamp. If the price returned by the DVM concludes the Disputer was correct, the Proposer or Liquidator (depending on where the dispute derived from) will lose the bond that was staked and the Disputer will be rewarded. If the DVM concludes the Proposer or Liquidator was correct the disputer will lose its dispute bond and the Liquidator or Proposer will be rewarded. 

The DVM is powerful because it encompasses an element of human judgment to ensure contracts are securely and correctly managed when issues arise from volatile (and sometimes manipulatable) markets. 

UMA's oracle system is constructed with economic guarantees around the cost of corrupting the DVM to ensure it will cost more to corrupt the oracle (i.e., obtain 51% or more UMA tokens) than the amount someone could profit from corrupting the oracle (i.e. stealing funds within contracts on UMA). View [here](oracle/econ-architecture.md) for more details behind the economic guarantees provided by UMA's oracle system. 

## Additional Resources

Here are some additional resources regarding the UMA DVM:

- [Technical Architecture](oracle/tech-architecture.md)
- [Economic Architecture](oracle/econ-architecture.md)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) on UMA’s DVM design
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) on UMA’s DVM design
- [Research repo](https://github.com/UMAprotocol/research) for optimal fee policy
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) for governance proposals
