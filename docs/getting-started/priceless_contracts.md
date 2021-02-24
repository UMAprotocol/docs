---
title: Priceless Financial Contracts
sidebar_label: Priceless Financial Contracts
slug: /Welcome
---

Decentralized oracle solutions today continually submit price data on-chain (e.g., every 15 seconds) to enforce contracts. This makes contracts vulnerable to attacks (i.e., flash loan attacks and ad-hoc market events) as well as hinders the ability to dispute prices reported from APIs. 

“Priceless” financial contracts are contracts that only require submitting a price on-chain in the event of a disputed liquidation (which is designed to be a rare circumstance). Priceless contracts minimize reliance on oracles, making them less vulnerable to attacks. 

Priceless contracts are designed with mechanisms to incentivise people who mint synthetic tokens (called token sponsors) to ensure that their positions are backed with the appropriate amount collateral.  Taking out a position involves minting a synthetic token, which can be repaid to cancel the position and return the collateral.   Positions are assumed to be solvent unless they are identified as being under collateralised, and it is the responsibility of token sponsors to ensure that their positions are always backed by the required amount of collateral.

A key mechanism for ensuring if a position is properly collateralized or not is a liquidations and disputes process that rewards the liquidation of positions that are under collateralised.  Anyone can initiate a liquidation by staking a bond and the liquidation. The liquidated position will be pending for 2 hours where a dispute over the liquidation can be raised.  Most liquidations and disputes are initiated automatically by bots monitoring contracts on UMA. 
 
