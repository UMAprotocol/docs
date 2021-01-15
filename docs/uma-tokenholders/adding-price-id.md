---
title: Overview of price identifiers and collateral currencies
sidebar_label: Overview
---

## What is a price identifier?

A [price identifier](synthetic-tokens/glossary.md#price-identifier) is a natural language descriptor of a reference index, whose value the oracle will determine upon request.
Because UMA tokenholders need to be able to vote on the value of this price identifier when disputes are raised, the DVM keeps a list of approved price identifiers.

For example, `GOLD_USD` might be a price identifier to return the USD spot price of 1oz of gold according to a pre-defined set of rules. If approved, UMA tokenholders would be expected to vote on the `GOLD_USD` value when price requests are raised to the DVM.
The rules behind this `GOLD_USD` price identifier would be documented in detail in a UMIP that was has been approved by UMA tokenholders. For more information on UMIPs, view [here](umips.md). 
That UMIP would contain more information about how to determine the price identifier.

## Creating a UMIP for a price identifier 

- Read the [Price Identifier Guide](https://github.com/UMAprotocol/UMIPs/blob/master/price-identifier-guide.md)
- Use the [Price Identifier Template](https://github.com/UMAprotocol/UMIPs/blob/master/price-identifier-template.md) 

## What is a collateral currency?

In order to mint synthetic tokens, token sponsors are required to lock up funds in a smart contract to back the value of minted synthetic tokens. The amount of collateral needed is determined by the value of a price identifier. Tokenholders and token sponsors should monitor the value of this price identifier off-chain to inform their decisions about how much collateral to maintain on-chain. If token sponsors are improperly collateralized, liquidators can liquidate token sponsors’ positions.

## Approving new price identifiers and collateral currencies

The `IdentifierWhitelist` contract in the mainnet deployment of the UMA DVM is controlled by a decentralized governance process.

To add a new price identifier or collateral currency, UMA tokenholders vote and approve the identifier or currency via the [voter dApp](https://vote.umaproject.org/).

Votes are proposed to the UMA community via the UMIP process, as described [here](uma-tokenholders/umips.md). Below is the list of collateral currencies and price identifiers that have already been approved by UMA tokenholders. 

- [List of approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [List of approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies) 


## Adding a price identifier to Kovan

To add a price identifier to Kovan, refer to these [instructions](/developers/emp-deployment#is-your-desired-price-identifier-and-collateral-type-supported) in the Developers section.