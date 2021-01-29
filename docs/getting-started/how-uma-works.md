---
title: How UMA Works
sidebar_label: How UMA Works
---

UMA has created what is known as “Priceless” financial contracts.  Priceless” financial contracts are smart contracts that only require an on-chain price feed in the event of a dispute.

These contracts are configured to act optimistically. Economic guarantees and network incentives ensure  network actors will act honestly most of the time, but in the event of a malicious actor or an ad hoc market event, a dispute can be raised to call UMA’s oracle.

### There are five main network actors on UMA

1. Token sponsors
2. Liquidator bots
3. Disputer bots
4. UMA Tokenholders
5. Data Verification Mechanism (DVM)

### Process Overview

**Token sponsors** are individuals who lock collateral in a smart contract to mint synthetic tokens. 

The value of the collateral in the smart contract is continually monitored off-chain by a robust network of **Liquidator Bots**. Liquidator Bots continuously monitor if a position is properly collateralized by referencing off-chain price feeds. Liquidator Bots are incentivized with rewards to identify and liquidate undercollateralized positions. If a position is liquidated by a liquidator bot there will be a 2-hour delay before the liquidation is finalized. 

During the 2-hour delay, **Dispute Bots** are incentivized to continuously monitor contracts using UMA’s priceless financial contracts. Dispute Bots reference their own off-chain price feeds to determine if a liquidation was valid or in valid. If invalid, the dispute bot will dispute the liquidation which will call UMA’s oracle known as the **Data Verification Mechanism (DVM)**. The liquidated position will be pending until it is resolved by the DVM (48-hours later). 

When a Dispute Bot calls the DVM, the liquidated position is reported to **UMA Tokenholders** where they will reference off-chain price feeds to report price information to the DVM. The DVM will aggregate UMA tokenholder votes and report the price of the asset on-chain and reward the Disputer Bot and penalize the Liquidator Bot (or vice versa if the liquidator was correct). Following the result from the DVM, the position will become liquidated or remain solvent. 


