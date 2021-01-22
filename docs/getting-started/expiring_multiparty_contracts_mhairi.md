
---
title: Expiring Multiparty Contracts
sidebar_label: Expiring Multiparty Contracts
slug: /More on Priceless Financial Contracts
---

Expiring Multiparty (EMP) contracts are priceless financial contracts which mint tokens which expire at a predetermined time.

Token sponsors can mint tokens for these contracts, by depositing the required amount of collateral, then - should they wish - sell the minted tokens openly.  Should the price of collateral rise in the intervening period, they can withdraw a proportion; however should the price of the collateral fall below the required level, they must deposit more collateral to avoid liquidation, where their position is closed and the collateral is lost.

Prior to the expiry of the synthetic token, tokens may be redeemed by token sponsors by submitting it to the contract to be burnt, in exchange for the proportionate amount of collateral that they have redeemed.

After the expiry of the synthetic token, any holder of the token may settle the contract, which calls on the DVM to exchange the collateral at the value of the token’s price identifier at the time of expiry, returning any additional capital to the token sponsor.
