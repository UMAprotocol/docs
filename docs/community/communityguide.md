---
title: Community Guides to Creating Synthetic Tokens on UMA
sidebar_label: Community Guides to Creating Synthetic Tokens on UMA
---

We want to make the process of creating priceless contracts on UMA for synthetic tokens as easy as possible so that anyone is able to create one.  Community members have developed a wealth of resources and tools to make our ambition of Universal Market Access a reality.

## Developing Your Idea

Everything begins with an idea.  A great place to look at whether someone is already developing in the area that you are interested in, or to flesh out your own idea is the UMA Discourse [Ideas Bank](https://github.com/Madtodist/UMIPs/blob/master/UMIPs/Big%20Mac%20UMIPv1.md). 

There you can get feedback from other community members around both the concept and technicalities of the derivative to allow you to start the process of building your synthetic asset and making it available for minting. 

## Writing An UMIP

A synthetic asset contract needs to know two things - the collateral type that the asset will be backed by, and the reference price of the synthetic asset. Note that “Price” in this context does not necessarily mean a monetary value, as synthetic assets can track anything.   

The first step is to write a UMIP to get your collateral type approved (if it is not already) as well as a Price Identifier UMIIP to define how people should calculate the price of the asset. Once you are ready to write an UMIP the [guide](https://www.notion.so/UMIP-Writing-and-Process-Walkthrough-DRAFT-e115a166c0b84cd791a821d31395c3f2) to UMIP writing tells you everything you need to know and you might also want to watch a [video walkthrough](https://www.youtube.com/watch?v=4kDVMJywaQE) of an UMIP and what the different sections mean.

## Using the Synths Builder

Once your collateral type and price identifier have been approved for use by the UMA protocol, you now need to develop the contract for the synthetic asset. We have an interactive builder where you can spin up an UMA contract in minutes without any coding knowledge through a [point-and-click interface](http://syntheticbuilder.xyz/).

A [video guide](https://www.youtube.com/watch?v=OwyGketRfhA&t=121s) to using the synths builder available, which can be used to create priceless financial contracts on either the Kovan testnet or on Mainnet. UMA runs a developer mining offering rewards to the developers of whitelisted contracts.  To be considered for this program, complete this [form](https://docs.google.com/forms/d/e/1FAIpQLSfhrCopRz7nUSbBQZB75j8yGqnXbOzRW68Oe6-uFuNVSvqrOQ/viewform), prior to mainnet deployment. 

## Building the Interface

Once the contract is in place, the next task is to create a front end to allow users to interact with your contract.   Code for a basic front end is available on the [UMA GitHub](https://github.com/UMAprotocol), this code is fully reusable and forkable, however, the design is basic. Developers are welcome to use this either as a code-base or as an exemplar to identify the key user functionality requirements for interacting with an UMA priceless financial contract.