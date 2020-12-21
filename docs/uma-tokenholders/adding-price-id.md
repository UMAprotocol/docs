---
title: Adding price identifiers and collateral currencies
sidebar_label: Price Identifiers & Collateral Currencies
---

## What is a price identifier?

A [price identifier](synthetic-tokens/glossary.md#price-identifier) is a natural language descriptor of a reference index, whose value the oracle will determine upon request.
Because UMA tokenholders need to be able to vote on the value of this price identifier when disputes are raised, the DVM keeps a list of approved price identifiers.

For example, `GOLD_USD` might be a price identifier to return the USD spot price of 1oz of gold according to a pre-defined set of rules. If approved, UMA tokenholders would be expected to vote on the `GOLD_USD` value when price requests are raised to the DVM.
The rules behind this `GOLD_USD` price identifier would be documented in detail in an [UMIP](umips.md) that was has been approved by UMA tokenholders.
That UMIP would contain more information about how to determine the price identifier.

## What is a collateral currency?

In order to mint synthetic tokens, token sponsors are required to lock up funds in a smart contract to back the value of minted synthetic tokens. The amount of collateral needed is determined by the value of a price identifier. Token holders and token sponsors should monitor the value of this price identifier off-chain to inform their decisions about how much collateral to maintain on-chain. If token sponsors are improperly collateralized, liquidators can liquidate token sponsors’ positions.

See below for a list of approved collateral currencies in UMA's priceless contract templates. 


## Adding a price identifier or collateral currency to mainnet

### Step 1: Discuss

If you are building with a price identifier or collateral currency not currently supported by the UMA DVM, you will need to propose it to the community of UMA tokenholders for a vote.
You should create an UMIP in which you describe your project and the new price identifier(s) or collateral currencies being requested.
At this time, you do not need to provide an implementation for the addition of a new price identifier or collateral currency.
Details on how to write a UMIP are [here](umips.md). This UMIP will be discussed by members of the UMA community.

### Step 2: Get ready for the vote 

In order for the UMIP to move to the next stage of discussion, an off-chain transaction to add the proposed price identifier or collateral currency to the mainnet `IdentifierWhitelist` will need to be proposed. This transaction should be attached to the UMIP.

### Step 3: Vote

UMA voters will vote on the proposed transaction. Each UMA token represents one vote. If at least 5% of all tokens are used to vote, of which >50% of votes approve the UMIP, the UMIP is considered approved.

### Step 4: Execute transaction

Once the proposal has been approved, anyone can initiate the governor contract to execute the proposed transaction.
The governor contract will then execute the transaction, approving the identifier in `IdentifierWhitelist`.

## Approved price identifiers and collateral currencies

The `IdentifierWhitelist` contract in the mainnet deployment of the UMA DVM is controlled by a decentralized governance process.
To add a new price identifier or collateral currency, UMA tokenholders must vote and approve the identifier or currency.
This is done via the UMIP process, as described [here](uma-tokenholders/umips.md).

To view the list of approved mainnet price identifiers, see below or run the `Supported Identifiers` query on the [UMA Subgraph](https://thegraph.com/explorer/subgraph/protofire/uma?query=Supported%20Identifiers). Refer to the related [UMIP](https://github.com/UMAprotocol/UMIPs/tree/master/UMIPs) for clarity on the price that an identifier returns.

### List of approved mainnet price identifiers

|Price ID| Summary| Link to UMIP|
|:-------| :------| :-----------|
|ALTDOM| An altcoin dominance index price.| [UMIP-21](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-21.md)
|ARSUSD| The price of the Argentine peso in USD.| [UMIP-19](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-19.md)
|BCHNBTC| A BCHNBTC price identifier to enable the creation of a Bitcoin Cash N, backed by BTC.| [UMIP-23](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-23.md)
|BTCDOM| A Bitcoin dominance index price.| [UMIP-21](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-21.md)
|BTCUSD| The price of BTC in USD.| [UMIP-7](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-7.md)
|COMPUSD| The price of COMP in USD.| [UMIP-5](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-5.md)
|DEFI_PULSE_TOTAL_TVL| The TVL of projects on DeFi Pulse| [UMIP-24](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-24.md)
|ETH/BTC| An ETHBTC price index. If ETH outperforms BTC the token value will go up; if ETH underperforms, the token value will decrease.| [UMIP-2](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-2.md)
|ETHUSD| The price of ETH in USD.| [UMIP-6](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-6.md)
|GASETH-1HR-1M; GASETH-4HR-1M; GASETH-1D-1M; GASETH-1W-1M; GASETH-1M-1M| Aggregatory gas prices on the Ethereum blockchain in multiples of a million. This will reflect the price of a million units of gas.| [UMIP-20](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-20.md)
|GASETH-1HR; GASETH-4HR; GASETH-1D; GASETH-1W; GASETH-1M| Aggregatory gas prices of finalized blocks on the Ethereum blockchain.| [UMIP-16](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-16.md)
|GASETH-TWAP-1Mx1M|  A price that resolves to the median monthly Ethereum gas price or a 2-hour Time-Weighted Average Price (TWAP) on the highest volume Uniswap ETH/uGAS pool based on the timestamp of the price request.| [UMIP-22](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-22.md)
|PERLUSD| The price of PERL in USD.| [UMIP-13](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-13.md)
|SUSHIUNI_TVL| The TVL ratio between Uniswap and Sushiswap| [UMIP-24](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-24.md)
|USDETH| The price of USD in ETH.| [UMIP-6](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-6.md)
|USDPERL| The price of USD in PERL.| [UMIP-13](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-13.md)
|USDBTC| The price of USD in BTC.| [UMIP-7](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-7.md)
|XAUPERL| A troy ounce of gold returned in PERL| [UMIP-26](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-26.md)
|XAUUSD| A troy ounce of gold returned in USD| [UMIP-26](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-26.md)

### List of approved mainnet collateral currencies

|Collateral Currency| Final Fee | Link to UMIP|
|:-------| :-----------| :-----------|
|WETH| 1 |  [UMIP-10](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-10.md)
|renBTC| 0.035 |  [UMIP-11](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-11.md)
|PERL| 8600 | [UMIP-12](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-12.md)
|DAI| 400 | [UMIP-8](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-8.md)
|USDC; USDT| 400 | [UMIP-18](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-18.md)
|rDAI| 400 | [UMIP-17](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-17.md)

## Adding a price identifier to Kovan

- To view a list of already approved Kovan price identifiers, please refer to [this subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers).
- To view a list of already approved Kovan collateral types, please refer to [this subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies).

To add a new price identifier to Kovan, please submit a pull request that adds your price identifier in the correct format to the list [here](https://github.com/UMAprotocol/protocol/blob/master/packages/core/config/identifiers.json). Please follow the [UMA contribution guidelines](https://github.com/UMAprotocol/protocol/blob/master/CONTRIBUTING.md) and make sure to tag `@UMAprotocol/eng` for review.