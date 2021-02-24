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

UMA builds open source infrastructure which enables developers to create financial instruments in a permissionless, secure and efficient manner.  We work with developers, financial engineers and product designers to support them build products on our infrastructure, while supporting tokenholders to actively participate in the governance of our protocol. 

Specifically this involves 
 - [Priceess financial contract templates](getting-started/priceless-contracts.md) which can be used to create synthetic tokens
  - [Governance](getting-started/umips.md) which manages improvements to the UMA protocol
  - [Data Verification Mechanism](getting-started/oracle.md) (DVM), an optimistic oracle service 

Together these enable the creation of fast efficient and secure synthetic derivatives on the ethereum blockchain.


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


