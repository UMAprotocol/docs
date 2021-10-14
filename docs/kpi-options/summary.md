---
title: KPI Options Summary
sidebar_label: Summary
---

Key Performance Indicator (KPI) Options are synthetic tokens that will pay out more rewards if a project’s KPI reaches predetermined targets before a given expiry date. Every KPI Option holder has an incentive to improve that KPI because their option will be worth more. This is intended to align individual token holder interests with the collective interests of the protocol.

Using UMA’s Long Short Pair (LSP) contract template and Optimistic Oracle, any project can create its own KPI Option tokens. These can be backed by any approved ERC-20 token and can be valued against any KPI that a project wants to improve.

## Why Should DAOs use UMA KPI Options?

The core function of KPI Options is that it aligns the incentives of the community with the underlying fundamentals of the protocol. The community succeeding and the protocol succeeding should be one and the same.

Traditional airdrops of liquid tokens can fuel network growth but can result in increased sell pressure on the token price. It is difficult to predict the effect of these airdrops, and the risk of dumps makes airdrops impractical for projects with tokens already in circulation.

Instead, KPI Options are synthetic tokens that will pay out more rewards if the KPI grows to predetermined targets before a given expiry date. Every KPI option holder has an incentive to grow that KPI because their option will be worth more. This aligns individual token holder interests with the collective interests of the protocol.

Some examples of KPI Options that can be created on the UMA platform:

- TVL Options: for DeFi protocols, these options pay out more project tokens as TVL goes up. Option holders are united in growing protocol TVL.
- Volume Options: for exchange protocols, these options pay out more project tokens as trading volume increases. Option holders are united in growing volume metrics.
- DAU Options: for dapps, these options pay out more rewards as DAU numbers go up. Option holders are united in growing dapp/protocol usage.

## KPI Options Example

As an example, let's assume the UMA team has decided to create a KPI Option to incentivize its community to help improve important metrics to the protocol. The first step in the process is to define a target KPI to incentivize. After going through various metrics, UMA decides to create a contract (UMA-TVL-1221) with payouts based on the UMA TVL using a target date of December 31, 2021.

UMA allocates 10,000 $UMA to the KPI Option contract that pays out a specified number of $UMA based on the TVL locked across all UMA contracts to liquidity providers. The payout structure can be customized for specific payout intervals. 

For simplicity, we will design the UMA-TVL-1221 contract payout logic to have bounds between $100 million and $1 billion:
- If the UMA TVL is less than $100 million the payout would be 0.1 $UMA and if the UMA TVL is greater than $1 billion the payout would be 1 $UMA. 
- If the UMA TVL is between $100 million and $1 billion, the payout would be directly comparable to the UMA TVL at expiry. For example, if the UMA TVL expires at $250 million, each KPI Option would be worth 0.25 $UMA.