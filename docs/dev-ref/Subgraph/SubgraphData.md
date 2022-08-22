---
sidebar_position: 1
title: Subgraph Data Introduction
---

# Uma Subgraph Introduction

This section explains the UMA Subgraph and how to interact with it. The UMA subgraph indexes data from the UMA contracts over time. It organizes data about tokenholders, contracts, DVM requests, and more. The subgraph updates any time a transaction is made on UMA. The subgraph runs on [The Graph](https://thegraph.com/) protocol’s hosted service and can be openly queried.

Uma has a GraphQL API Endpoint hosted by [The Graph](https://thegraph.com/docs/about/introduction#what-the-graph-is) called a subgraph for indexing and organizing data from the Snapshot smart contracts.

## Ethereum Mainnet

[Creating an API Key Video Tutorial](https://www.youtube.com/watch?v=UrfIpm-Vlgs)

- [Explorer Page](https://thegraph.com/explorer/subgraph?id=FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC&view=Overview)
- Graphql Endpoint: https://gateway.thegraph.com/api/[api-key]/subgraphs/id//41LCrgtCNBQyDiVVyZEuPxbvkBH9BxxLU3nEZst77V8o
- [Code Repo](https://github.com/UMAprotocol/subgraphs)

## Helpful Links

[Querying from an Application](https://thegraph.com/docs/en/developer/querying-from-your-app/)

[Managing your API Key & Setting your indexer preferences](https://thegraph.com/docs/en/studio/managing-api-keys/)

## Resources

LSP Subgraphs

- [Mainnet Subgraph](https://thegraph.com/hosted-service/subgraph/umaprotocol/mainnet-lsp)
- [Polygon Subgraph](https://thegraph.com/hosted-service/subgraph/umaprotocol/polygon-lsp)
- [Kovan Subgraph](https://thegraph.com/hosted-service/subgraph/umaprotocol/kovan-lsp)

EMP Subgraphs (includes query for whitelisted collateral)

- [Mainnet Subgraph](https://thegraph.com/explorer/subgraph/umaprotocol/mainnet-contracts)
- [Kovan Subgraph](https://thegraph.com/explorer/subgraph/umaprotocol/kovan-contracts)

Voting Subgraphs

- [Mainnet Subgraph](https://thegraph.com/explorer/subgraph/umaprotocol/mainnet-voting)
- [Kovan Subgraph](https://thegraph.com/explorer/subgraph/umaprotocol/kovan-voting)

Here is the [source code](https://github.com/UMAprotocol/subgraphs) for deployed subgraphs.

## Making Queries

To learn more about querying a subgraph refer to [The Graph’s documentation](https://thegraph.com/docs/about/introduction).
