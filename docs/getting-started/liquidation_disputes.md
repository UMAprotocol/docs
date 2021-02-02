---
title: Liquidation Disputes
sidebar_label: Liquidation Disputes
slug: /More on Governance
---

A valid liquidation occurs when the token sponsor is under-collateralised relative to the token they have minted, however sometimes the validity of that liquidation may be in dispute.

In the UMA system, liquidator bots operate to check the collateralisation ratios of contracts and liquidating those which are improperly collateralised.  Liquidations are implemented immediately, however they may be disputed for a short period afterwards known as the “liquidation liveness period”. If a liquidation is disputed, a price request is made to the DVM.  

Tokenholders are charged with determining what the correct price should have been at the time of the liquidation, based on the price feed mechanism as defined in the relavant priceless contract. This price then determines whether contract was properly collateralised and hence whether the liquidation was valid. 

