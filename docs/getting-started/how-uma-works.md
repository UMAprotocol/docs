---
title: How UMA Works
sidebar_label: How UMA Works
---

UMA has created what is known as priceless financial contracts.  Priceless financial contracts are smart contracts that only require an on-chain price feed in the event of a dispute.


These contracts are configured to act optimistically. Economic guarantees and network incentives ensure network actors will act honestly most of the time, but in the event of a malicious actor or an ad hoc market event, a dispute can be raised to call UMA’s optimistic oracle known as the Data Verification Mechanism (DVM). 


### There are five main network actors on UMA

1. Token sponsors
2. Liquidators
3. Disputers
4. Data Verification Mechanism (DVM)
5. UMA Tokenholders

### How synthetic assets are secured on UMA

**Token sponsors** are individuals who lock collateral in a smart contract to mint synthetic tokens. Token sponsors are responsible for making sure their positions always remain overcollateralized or else their positions will get liquidated.

The value of the collateral in the smart contract is continually monitored off-chain by a robust network of **Liquidators**. Liquidators continuously monitor if a position is properly collateralized by referencing off-chain price feeds. Liquidations can be configured to automatically search for positions to liquidate (through Liquidation Bots) or manually by anyone holding the synthetic asset and collateral currency of the position they are liquidating. Liquidators are incentivized with rewards to identify and liquidate undercollateralized positions. If a position is liquidated by a liquidator bot there will be a 2-hour delay before the liquidation is finalized. 

During the 2-hour delay, **Disputers** are incentivized to monitor contracts using UMA’s priceless financial contracts. Similar to Liquidators, Disputers can be in the form of a Dispute Bot or executed manually. Disputers reference their own off-chain price feeds to determine if a liquidation was valid or in valid. If invalid, the dispute bot will dispute the liquidation which will call UMA’s optimistic oracle known as the **Data Verification Mechanism (DVM)**. The liquidated position will be pending until it is resolved by the DVM (48-hours later). 

The DVM will resolve the dispute by proposing a vote to **UMA Tokenholders** to obtain the price of the asset at a given timestamp. UMA Tokenholders will reference off-chain price feeds to report price information to the DVM. The DVM will aggregate UMA tokenholder votes and report the price of the asset on-chain. 

If the Disputer was correct, the DVM will reward the Disputer and the Token Sponsor of the effected position. If the Liquidator was correct the DVM will reward the Liquidator, penalize the Disputer, and the Token Sponsor will lose the funds in their position. 



