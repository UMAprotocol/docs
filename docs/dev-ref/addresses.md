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

Network | Website | UMA Contract Addresses 
------------- | ------------- | ------------- 
<img src="/network-icons/eth-logo.png" width="150"/> | [Ethereum](https://ethereum.org/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/1.json), [Kovan](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/42.json), [Rinkeby](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/4.json)
<img src="/network-icons/polygon-logo.png" width="150"/> | [Polygon](https://polygon.technology/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/137.json), [Mumbai](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/80001.json)
<img src="/network-icons/boba-logo.png" width="150"/> | [Boba Network](https://boba.network/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/288.json)
<img src="/network-icons/optimism-logo.png" width="150"/> | [Optimism](https://www.optimism.io/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/10.json)
<img src="/network-icons/arbitrum-logo.png" width="150"/> | [Arbitrum](https://arbitrum.io/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/42161.json)
<img src="/network-icons/xdai-logo.png" width="150"/> | [xDAI](https://www.xdaichain.com/) | [Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/100.json)
