---
title: Adding a Price Identifier
sidebar_label: Adding a Price Identifier
---

## What is a price identifier?

A [price identifier](synthetic-tokens/glossary.md#price-identifier) is a natural language descriptor of a reference index, whose value the oracle will determine upon request.
Because UMA tokenholders need to be able to vote on the value of this price identifier when disputes are raised, the DVM keeps a list of approved price identifiers.

For example, `GOLD_USD` might be a price identifier to return the USD spot price of 1oz of gold according to a pre-defined set of rules. If approved, UMA tokenholders would be expected to vote on the `GOLD_USD` value when price requests are raised to the DVM.
The rules behind this `GOLD_USD` price identifier would be documented in detail in an [UMIP](umips.md) that was has been approved by UMA tokenholders.
That UMIP would contain more information about how to determine the price identifier.

<!-- TODO: Add a link to the UMIP for adding the ETHBTC price identifier when it is ready. -->

## Adding a price identifier to mainnet

<b> Step 1: Discuss </b>

If you are building with a price identifier not currently supported by the UMA DVM, you will need to propose it to the community of UMA tokenholders for a vote.
You should create an UMIP in which you describe your project and the new price identifier(s) being requested.
At this time, you do not need to provide an implementation for the addition of a new price identifier.
Details on how to write a UMIP are [here](umips.md). This UMIP will be discussed by members of the UMA community.

<b> Step 2: Get Ready For Vote </b>

In order for the UMIP to move to the next stage of discussion, an off-chain transaction to add the proposed price identifier to the mainnet `IdentifierWhitelist` will need to be proposed. This transaction should be attached to the UMIP.

<b> Step 3: Vote </b>

UMA voters will vote on the proposed transaction. Each UMA token represents one vote. If at least 5% of all tokens are used to vote, of which >50% of votes approve the UMIP, the UMIP is considered approved.

<b> Step 4: Execute Transaction </b>

Once the proposal has been approved, anyone can tell the governor contract to execute the proposed transaction.
The governor contract will then execute the transaction, approving the identifier in `IdentifierWhitelist`.

## Approved price identifiers

The `IdentifierWhitelist` contract in the mainnet deployment of the UMA DVM is controlled by a decentralized governance process.
To add a new price identifier, UMA tokenholders must vote and approve the identifier.
This is done via the UMIP process, as described [here](uma-tokenholders/umips.md).

To view the list of approved mainnet price identifiers, see below or run the `Supported Identifiers` query on the [UMA Subgraph](https://thegraph.com/explorer/subgraph/protofire/uma?query=Supported%20Identifiers). Refer to the related [UMIP](https://github.com/UMAprotocol/UMIPs/tree/master/UMIPs) for clarity on the price that an identifier returns.

### List of approved price identifiers

|Price ID| Summary| Link to UMIP|
|:-------| :------| :-----------|
|ALTDOM| An altcoin dominance index price.| [UMIP-21](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-21.md)
|ARSUSD| The price of the Argentine peso in USD.| [UMIP-19](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-19.md)
|BCHNBTC| A BCHNBTC price identifier to enable the creation of a Bitcoin Cash N, backed by BTC.| [UMIP-23](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-23.md)
|BTCDOM| A Bitcoin dominance index price.| [UMIP-21](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-21.md)
|BTCUSD| The price of BTC in USD.| [UMIP-7](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-7.md)
|COMPUSD| The price of COMP in USD.| [UMIP-5](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-5.md)
|ETH/BTC| An ETHBTC price index. If ETH outperforms BTC the token value will go up; if ETH underperforms, the token value will decrease.| [UMIP-2](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-2.md)
|ETHUSD| The price of ETH in USD.| [UMIP-6](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-6.md)
|GASETH-1HR-1M; GASETH-4HR-1M; GASETH-1D-1M; GASETH-1W-1M; GASETH-1M-1M| Aggregatory gas prices on the Ethereum blockchain in multiples of a million. This will reflect the price of a million units of gas.| [UMIP-20](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-20.md)
|GASETH-1HR; GASETH-4HR; GASETH-1D; GASETH-1W; GASETH-1M| Aggregatory gas prices of finalized blocks on the Ethereum blockchain.| [UMIP-16](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-16.md)
|GASETH-TWAP-1Mx1M|  A price that resolves to the median monthly Ethereum gas price or a 2-hour Time-Weighted Average Price (TWAP) on the highest volume Uniswap ETH/uGAS pool based on the timestamp of the price request.| [UMIP-22](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-22.md)
|PERLUSD| The price of PERL in USD.| [UMIP-13](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-13.md)
|USDETH| The price of USD in ETH.| [UMIP-6](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-6.md)
|USDPERL| The price of USD in PERL.| [UMIP-13](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-13.md)
|USDBTC| The price of USD in BTC.| [UMIP-7](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-7.md)