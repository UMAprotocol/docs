---
title: Technical Architecture of the DVM
sidebar_label: Technical Architecture
---

This document explains the general architecture of UMA's Data Verification Mechanism (DVM) and Optimistic Oracle (OO). It is meant to be a high-level overview and is by no means an exhaustive explanation of the system.

<img src="/docs/oracle/OO-architecture-diagram-v3.png" width="700" height="700"/>

## Purpose of DVM

The Optimistic Oracle quickly requests and receives the price of an asset or any arbitrary data for UMA financial contracts through price proposals. The prices proposed to the Optimistic Oracle will not be sent to the DVM unless disputed. If a dispute is raised, a request is sent to the DVM to be resolved.

## Price Requestor

A price requestor can make a request to the Optimistic Oracle by calling `requestPrice()` to the Optimistic Oracle contract. The requests can be for an asset price or any arbitrary data needed to settle a financial contract. Once a price request exists, Proposers can respond by referencing off-chain price feeds to submit the response to a request.

## Identifier Whitelist

The Identifier Whitelist contract maintains a list of supported identifiers that can be used with UMA financial contracts and is controlled by UMA voters. The Optimistic Oracle calls `isIdentifierSupported()` when a price request is made to confirm an identifier has been whitelisted. A price request will not be made if the identifier is not whitelisted by UMA voters.

## Optimistic Oracle

Once a request is made, Proposers can propose a value for the request by calling `proposePrice()`. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is sent to the Requestor. If a proposal is disputed, `disputePrice` is called and the price will be submitted to UMA’s DVM and be resolved after a 48-96 hour voting period.

## Store

The Store contract helps contracts compute their fees and collects those fees from contracts. Final fees are added when a new currency is approved and calculated by calling `computeFinalFee()` for the currency address.

The Store's funds are to be used to buy back and burn tokens. Right now, the funds can be withdrawn by the contract admin to do this off-chain. In the future, this buyback may be accomplished on-chain as a part of the contract logic.

## Voting

The DVM is powered by voters. When a dispute is made, UMA tokenholders vote on the value of an approved price identifier at a given time. The relative weighting of votes is determined by how many UMA tokens each participant holds.

Once a request is received, a voting period begins. Voters follow a typical commit-reveal cycle to provide their votes to the Voting contract.

After the vote period ends, `getPrice()` can be called to retrieve the price that was resolved. The contract rewards the voters who voted with the majority by minting them new tokens proportionally to their vote share. Voters who did not vote or voted incorrectly do not receive newly minted tokens.

## VotingToken

The VotingToken is an ERC20 contract used to contribute to UMA protocol decisions, such as voting on UMA Improvement Proposals (UMIPs), price requests, and disputes made to UMA's Data Verification Mechanism (DVM).

## UMA Tokenholders

UMA's DVM is designed with an economic guarantee around the cost it would take to corrupt the oracle and the profit someone would receive. The DVM ensures the price to obtain 51% of UMA tokens is greater than the profit from corrupting the DVM, as measured by the collateral stored in UMA's financial contracts. This is achieved through an inflationary reward (currently 0.05% of total network token supply), distributed pro-rata by stake to voters who participate and vote correctly. As long as there is an honest majority, voters will vote correctly.
