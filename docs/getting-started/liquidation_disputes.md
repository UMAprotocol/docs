---
title: Liquidation Disputes
sidebar_label: Liquidation Disputes
slug: /More on Governance
---

A valid liquidation occurs when the token sponsor is under-collateralised relative to the token they have minted, however sometimes the validity of the liquidation may be in dispute.

In the UMA system, liquidator and dispute bots operate to check the collateralisation ratios of contracts.  Liquidations are implemented immediately by liquidators submitting synthetic tokens to the contract to post a liquidation bond, however they may be disputed for a short period afterwards known as the “liquidation liveness period”. 

A liquidation can be disputed by posting a similar bond to lodge a dispute.  At this point a price request is made to the DVM.  This price request will return the value of the price identifier at the time of liquidation.  

If the liquidation was correct, the disputer will lose their bond and the liquidator will receive all of the token sponsor’s collateral.  However if the liquidation was incorrect, the dispute bond will be returned together with a dispute reward; the liquidator will receive collateral to the value of the token at the time of liquidation (as verified by the DVM) less the dispute reward and an improper liquidation reward which is paid to the token sponsor as compensation for the improper liquidation.
