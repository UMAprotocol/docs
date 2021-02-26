---
title: Welcome to UMA
sidebar_label: Welcome to UMA
---

UMA stands for "Universal Market Access" 

<!--taken from UMA/TRS Mission and Values -->
Our mission is to make financial markets universally fair and accessible.

We are driven by a shared belief that financial markets should be universally accessible - unrestrained by censorship, your pre-existing financial and social capital, or your beliefs and values. The economic freedom created by open market access enables everyone equal access and footing to pursue prosperity and build their financial independence.  Free and universal access to financial markets is a prerequisite to this free, open and fair financial system.  

Our goal is to enable anyone to attain or transfer any form of risk seamlessly through the UMA protocol thus empowering everyone to participate in this new universally accessible financial system.
<!--end-->

##What is UMA##

UMA builds open source infrastructure which enables developers to create financial instruments in a permissionless, secure and efficient manner.  We work with developers, financial engineers and product designers to support them build products on our infrastructure, while supporting tokenholders to actively participate in the governance of our protocol. 

Specifically this involves 
 - [Priceless financial contract templates](getting-started/priceless-financial-contracts.md) which can be used to create synthetic tokens
  - [Data Verification Mechanism](getting-started/oracle.md) (DVM), an optimistic oracle service 
  - [Governance](getting-started/governance.md) which manages improvements to the UMA protocol
  

Together these enable the creation of fast efficient and secure synthetic derivatives on the ethereum blockchain.

UMA is focused on building “priceless” derivatives on Ethereum. These financial contracts are designed to ensure proper collateralization by counterparties without the use of an on-chain price feed. They can do so by providing rewards to counterparties or third parties for identifying improperly collateralized positions. To confirm that these positions are improperly collateralized, these contracts may rely on a “Data Verification Mechanism” (DVM).

The DVM is an optimistic oracle service available to respond to price requests made by financial contracts that are registered with it. These price requests ask UMA tokenholders to vote on the value of a price identifier at a historic timestamp. UMA tokenholders commit and reveal their votes on-chain in a process that can take 2-4 days. Once the votes are revealed, the mode of these votes is returned to the financial contract as the value determined by the UMA voters for the price request. The financial contract then distributes collateral to its counterparties based on the value returned by the DVM.

Because the DVM requires 2-4 days to respond to a price request, it is not intended to be used as an on-chain price feed that pushes prices to financial contracts that need it. Rather, it is complementary to “priceless” financial contracts.

The DVM is designed to include an economic guarantee around its cost of corruption and profit from corruption. The cost of corrupting the DVM, as measured by the cost of 51% of the UMA voting tokens, should be greater than the profit from corrupting the DVM, as measured by the collateral stored in the financial contracts that are registered with it. To ensure that this inequality holds, the DVM may charge fees to financial contracts that are used to raise the price of the UMA voting tokens.

Governance is provided by the UMA Improvement Proposals (UMIPs) which allow new collateral types and price identifiers to be added to the system as well as new types of factory contract.


**How UMA works**

There are five main network actors on UMA. 

1. Token sponsors
2. Liquidator bots
3. Disputer bots
4. UMA Tokenholders
5. Data Verification Mechanism (DVM)

Token sponsors are individuals who lock collateral in a smart contract to mint synthetic tokens. 

The value of the collateral in the smart contract is continually monitored off-chain by a robust network of Liquidator Bots. Liquidator Bots continuously monitor if a position is properly collateralized by referencing off-chain price feeds. Liquidator Bots are incentivized with rewards to identify and liquidate undercollateralized positions. If a position is liquidated by a liquidator bot there will be a 2-hour delay before the liquidation is finalized. 

During the 2-hour delay, Dispute Bots are incentivized to continuously monitor contracts using UMA’s priceless financial contracts. Dispute Bots reference their own off-chain price feeds to determine if a liquidation was valid or in valid. If invalid, the dispute bot will dispute the liquidation which will call UMA’s oracle (i.e., the DVM) and the liquidated position will be pending until it is resolved by the DVM (48-hours later). 

When a Dispute Bot calls the DVM, the liquidated position is reported to UMA Tokenholders where they will reference off-chain price feeds to report price information to the DVM. The DVM will aggregate UMA tokenholder votes and report the price of the asset on-chain and reward the Disputer Bot and penalize the Liquidator Bot (or vice versa if the liquidator was correct). Following the result from the DVM, the position will become liquidated or remain solvent. 


**For Developers**

If you are a developer interesting building with the UMA protocol, view this [explainer](/priceless-financial-contracts/priceless-contracts.md) of how UMA's priceless synthetic tokens wor and to learn more about UMA's synthetic tokens.

Additionally, the [development guide](build-walkthrough/build-process) to learn how to launch your own expiring synthetic token on UMA.

You can find additional reference materials, including a list of UMA's testnet and mainnet contracts [here](dev-ref/addresses.md)


**For UMA Tokenholders**

If you are interested in the UMA project token, please read [this section](uma-tokenholders/uma-holders.md) to learn more about the role of the UMA project token in the DVM and the rights and responsibilities of UMA project tokenholders.

**Contacts**

If you have any questions or want to connect with the UMA community, please check out our [community page](community/community-overview), join our [discord](https//discord.umaproject.org) and [discourse](https://discourse.umaproject.org)


