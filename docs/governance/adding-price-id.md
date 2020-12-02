---
title: Adding a Price Identifier
sidebar_label: Adding a Price Identifier
---

## What is a price identifier?

A [price identifier](synthetic-tokens/glossary.md#price-identifier) is a natural language descriptor of a reference index, whose value the oracle will determine upon request.
Because UMA token holders need to be able to vote on the value of this price identifier when disputes are raised, the DVM keeps a list of approved price identifiers.

For example, `GOLD_USD` might be a price identifier to return the USD spot price of 1oz of gold according to a pre-defined set of rules. If approved, UMA token holders would be expected to vote on the `GOLD_USD` value when price requests are raised to the DVM.
The rules behind this `GOLD_USD` price identifier would be documented in detail in an [UMIP](governance/umips.md) that was has been approved by UMA token holders.
That UMIP would contain more information about how to determine the price identifier.

<!-- TODO: Add a link to the UMIP for adding the ETHBTC price identifier when it is ready. -->

## Approved price identifiers

The `IdentifierWhitelist` contract in the mainnet deployment of the UMA DVM is controlled by a decentralized governance process.
To add a new price identifier, UMA token holders must vote and approve the identifier.
This is done via the UMIP process, as described [here](governance/umips.md).

To view the list of approved mainnet price identifiers, see below or run the `Supported Identifiers` query on the [UMA Subgraph](https://thegraph.com/explorer/subgraph/protofire/uma?query=Supported%20Identifiers). Refer to the related [UMIP](https://github.com/UMAprotocol/UMIPs/tree/master/UMIPs) for clarity on the price that an identifier returns.


## Adding a price identifier to mainnet

<b> Step 1: Discuss </b>

If you are building with a price identifier not currently supported by the UMA DVM, you will need to propose it to the community of UMA token holders for a vote.
You should create an UMIP in which you describe your project and the new price identifier(s) being requested.
At this time, you do not need to provide an implementation for the addition of a new price identifier.
Details on how to write a UMIP are [here](governance/umips.md). This UMIP will be discussed by members of the UMA community.

<b> Step 2: Get Ready For Vote </b>

In order for the UMIP to move to the next stage of discussion, you should construct an off-chain transaction to add the proposed price identifier to the mainnet `IdentifierWhitelist`. This transaction should be attached to the UMIP.

<b> Step 3: Vote </b>

UMA voters will vote on the proposed transaction. Each UMA token represents one vote. If at least 5% of all tokens are used to vote, of which >50% of votes approve the UMIP, the UMIP is considered approved.

<b> Step 4: Execute Transaction </b>

Once the proposal has been approved, anyone can tell the governor contract to execute the proposed transaction.
The governor contract will then execute the transaction, approving the identifier in `IdentifierWhitelist`.
