---
title: Perpetual Contracts
sidebar_label: Perpetual Contracts
slug: /More on Priceless Financial Contracts
---

Perpetual contracts are priceless financial contracts which have no expiry date, but which track tokens through a funding rate swap design.

In contrast to expiring contracts, there is no “expiry” in perpetual contracts. Without the promise of impending expiry, synthetic token holders can no longer assume that their synthetic tokens can be redeemed at some precise time in the future for a predetermined value. Instead a mechanism is introduced to nudge the token to a fair value, through a “funding rate” which forces a payment between token sponsors and holders in order to push the synthetic token’s price in one direction.

When the perpetual contract’s synthetic token is trading “too high” relative to its tracking price, then a payment can be made from holders (who are long the token) to sponsors (who are short the token) to discourage marginal buyers. This “error” between the synthetic tokens’ market value and the current value of the price identifier can be linearly mapped to a “funding rate”, which is a % of each token’s value that is transferred between sponsor and holder. 

Payments are made between token holders (longs) and sponsors (shorts) to achieve the price-tracking, and the “payment” is implemented as an adjustment to synthetic token value as a way incentivize market participants to move its synthetic token price in tandem with the price identifier. 
