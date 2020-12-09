---
title: Building a Synthetic Asset
sidebar_label: Building a Synthetic Asset
---

Described in this tutorial is a high-level overview of the typical deployment process that a team would need to follow to successfully build a product on the UMA protocol. Before starting, you should make sure to follow the [setup instructions](/developers/setup) to prepare your workspace. 

These steps are intended to be followed in order, but, depending on your specific project's requirements, these may change some. To kick-off your synthetic asset build, you will first need to finalize your contract design.

## Finalize Contract Design

Please review [Designing a Synthetic Asset](/build-walkthrough/designing-synth) for a description of the design considerations and process that you should take. S


Decide on if you are building with the EMP or Perp. If neither works for your use-case, start reading up on the [UMA Optimistic Oracle](https://www.notion.so/Building-with-the-Optimistic-Oracle-7fc31aceba4348a188a393dfc0cc140b) for an idea on how you can start building quickly. 

## Apply to the UMA Developer Mining Program
 
## Propose a New Price Identifier or Collateral Type

Before deploying a contract, you should verify that your desired price identifier and collateral currency is already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/adding-price-id#list-of-approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/adding-price-id#list-of-approved-price-identifiers)
- [Approved Kovan collateral currencies](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the [UMIP process](/uma-tokenholders/umips).

To add a new price identifier or collateral currency to Kovan, please follow these [instructions](/build-walkthrough/new-params) or contact the UMA core team in Discord.

## Write a Price Feed

As part of the process to 
## Write Contract Parameters

For an explanation of all EMP contract parameters, go here:


## Deploy an EMP to Kovan

To deploy an EMP, follow these [instructions](/build-walkthrough/emp-deployment).

To deploy a perp contract, follow these instructions.

## Setting the GCR by Minting an Initial Position

## Bot Deployment

Fund liquidation and dispute bots

Deploy to GCP or equivalent

Testing (War Games)

## Create a dApp

The most important EMP methods to interact with are described [here](/build-walkthrough/emp-interface).

An example dApp to interface with EMPs can be seen [here](https://github.com/UMAprotocol/emp-tools).

## Create an Incentives Program

There are various reasons why you may want to design an incentives program to pay out a portion of developer mining rewards that your contract will receive. You may want to attract liquidity to your contract by implementing a liquidity mining program. You may not be focused on dApp development and want to outsource it by creating a dApp mining program. 

An example successful split of developer mining rewards involves

- 10% to contract deployer
- 30% to dApp mining or affiliate marketing
- 60% to liquidity mining

For further elaboration on incentives programs that could be built, refer [here](/developers/designing-incentives).

## Fulfill Developer Mining Criteria

For further elaboration on incentives programs that could be built, refer [here](/developers/designing-incentives).

## Repeat Kovan Steps for Mainnet Contract

After you have deployed your contract to Kovan, have done liquidation bot testing against that contract and optionally have verified that you meet developer mining criteria, you will be ready 

## Post-Deployment

**Seeding an AMM Pool**

**Deploying Monitor Bots**

**Payout any Rewards Structures**