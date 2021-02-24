---
title: Expiring Multiparty Contracts
sidebar_label: Expiring Multiparty Contracts
slug: /More on Priceless Financial Contracts
---

Expiring Multiparty (EMP) contracts are a type of priceless financial contract that expires at a predetermined time (e.g., 3 months, 6 months). Developers can create synthetic assets by using the EMP contract. EMP contracts enable users to use a collateral currency of their choice to back the value of a synthetic token. 

Token sponsors can mint synthetic tokens for EMP contracts by depositing a pre-defined amount of collateral and go long (i.e., hold the synthetic token) or go short (i.e., sell the synthetic token on a market maker and buy it back at a lower price in the future).

Should the collateral in the token sponsor's position rise in the intervening period, their ability to mint more tokens increases; however should the price of the collateral fall below the required level, they must deposit more collateral to avoid being liquidated. If a position is liquidated, the position is closed and the collateral is not returned to the token sponsor. 

A token sponsor can redeem the collateral used to mint synthetic tokens by submitting it to the contract to be burned, in exchange for the proportionate amount of collateral backing the synthetic token. 

After the expiry of the synthetic token, any holder of the synthetic token may settle the contract, which calls on the DVM to exchange the collateral at the value of the token’s price identifier at the time of expiry, returning any additional capital to the token sponsor.
