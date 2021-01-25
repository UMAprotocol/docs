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


