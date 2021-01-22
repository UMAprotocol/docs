
---
title: Priceless Financial Contracts
sidebar_label: Priceless Financial Contracts
slug: /Welcome
---

“Priceless” financial contracts are contracts that don’t require an on-chain price feed.  

This minimises their reliance on oracles, making them less vulnerable to attacks, especially flash loan attacks, so they are more secure than contracts which need a continuous price feed. Oracles are only used when a liquidation is disputed, which is intended to be rare.

They are designed with mechanisms to incentivise those taking out positions in these contracts (called token sponsors) to ensure that their positions are properly backed with the appropriate collateral.  Taking out a position involves minting a synthetic token, which can be repaid to cancel the position and return the collateral.   Positions are assumed to be solvent unless they are identified as being under collateralised, and it is the responsibility of token sponsors to ensure that their positions are always backed by the required amount of collateral.

A key mechanism for ensuring this is a liquidations and disputes process that rewards the identification of positions that are under collateralised.  Anyone can initiate a liquidation by putting up a bond and the liquidation will happen instantly.  However there is a 2 hour window where a dispute over the liquidation can be raised.  Most of those liquidations and disputes are initiated automatically by bots running on the UMA system, which ensures its integrity. 
