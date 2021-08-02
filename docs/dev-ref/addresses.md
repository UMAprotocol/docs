---
title: Contract Addresses
sidebar_label: Contract Addresses
---

Below is where you can find smart contract addresses and descriptions for UMA-supported mainnet and testnet deployments of the DVM and financial contracts infrastructure.

## UMA Tokenholders

If you are a UMA tokenholder, you will probably only interact with `Voting`, `Finder`, `DesignatedVotingFactory`, and `Governor`.
These are the relevant contracts used to vote on price requests and UMIPs.

## Financial Contract Developers

If you are building your own financial contract template, you will probably interact with `Store`, `Voting`, `Finder`, `IdentifierWhitelist`, and `Registry`.
These contracts are used by the DVM to keep track of which financial contracts depend on it, how they impact the economic guarantee of the oracle, and which price identifiers UMA tokenholders need to be prepared to vote on.

## Contract Addresses

- [Mainnet (network id: 1)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/1.json)
- [Kovan (network id: 42)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/42.json)
- [Polygon (network id: 137)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/137.json)
- [Mumbai (network id: 80001)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/80001.json)
