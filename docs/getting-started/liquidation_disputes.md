---
title: Liquidation Disputes
sidebar_label: Liquidation Disputes
slug: /More on Governance
---

A valid liquidation occurs when the token sponsor is under-collateralized relative to the token they have minted, however sometimes the validity of that liquidation may be in dispute.

In the UMA system, liquidators (usually in the form of a liquidator bot) operate to monitor the collateralization ratios of contracts on UMA and liquidate positions that are under-collateralized.  Once liquidated, the liquidation can be disputed for a short period of time known as the “liquidation liveness period”. If a liquidation is disputed, a price request is made to the DVM to resolve the dispute. 

Tokenholders are charged with determining what the correct price should have been at the time of the liquidation, based on the price feed mechanism as defined in the relavant priceless contract. This price then determines whether contract was properly collateralised and hence whether the liquidation was valid. 

