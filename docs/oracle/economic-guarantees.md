---
title: UMA's Optimistic Oracle is secured by Economic Guarantees
sidebar_label: Economic guarantees
---

## UMA’s Approach to the Oracle Problem

UMA’s DVM design embraces the fact that any on-chain oracle can be corrupted — for a price.
Because there is no "rule of law" on blockchains outside of economic incentives, UMA's DVM relies on a system of economic incentives to ensure that there is no profitable way to corrupt the DVM.

UMA’s DVM introduces a simple economic security framework for evaluating oracles.
We look at the potential profit from corruption (PfC) and cost of corruption (CoC) of contracts in our system, and have designed a mechanism to ensure that the cost of corrupting the DVM will exceed the potential profit.
In doing so, we eliminate the economic incentives for corrupting the DVM in the first place.

This is a 3 step process:

1. Create a system to measure the Cost of Corruption (CoC)
1. Create a system to measure the Profit from Corruption (PfC)
1. Design a mechanism to keep CoC > PfC and prove it will work

### Step 1: Create a system to measure the Cost of Corruption (CoC)

The DVM uses a Schelling-Point style voting system with tokenized voting rights.
Tokenholders vote on price requests that are submitted by contracts registered with it, and they are paid a reward for voting honestly and penalized otherwise.
As long as there is an honest majority, voters will vote correctly.
This means the Cost of Corruption is the cost to buy control of 51% of the voting tokens.
These voting tokens are the UMA project token.

### Step 2: Create a system to measure the Profit from Corruption (PfC)

To measure the Profit from Corruption, all contracts using the system are required to register with the DVM and report the value that could be stolen if their price feed was corrupted.
This is the contract-specific PfC value.
The DVM then sums each contract’s PfC into a system-wide PfC number.

### Step 3: Design a mechanism to keep CoC > PfC and prove it will work

The CoC > PfC mechanism is enforced by a variable-fee policy.
Enforcing the CoC > PfC inequality requires keeping the cost of 51% of the participating voting tokens above the system-wide PfC.
In other words, the total market cap of the participating voting tokens needs to be >200% the system-wide PfC.

The DVM is designed to do this by continuously monitoring this CoC > PfC relationship and initiating programmatic, repeated, token buybacks if the voting token price drops below target.
All purchased tokens are burned, reducing token supply (which increases the market cap).
The funds needed to conduct these buybacks are raised by levying pro rata fees on the contracts using the system.
(Note that the current implementation of the DVM (v1) has not yet implemented the programmatic buy-and-burn process; this is currently a manual process. The DVM will be upgraded to programmatically perform this function in the future.)

Importantly, the DVM system is designed to levy the lowest fees possible while maintaining the CoC > PfC economic guarantee.
As such, the system is not rent-seeking — it is designed to minimize the fees required to maintain the security of the system.
A fascinating result of this design is that when market participants expect growth in the future usage of the protocol, this expectation of growth can maintain the CoC > PfC inequality without the DVM levying any fees at all.

For more detailed research on these mechanisms, view [here](https://docs.umaproject.org/oracle/econ-architecture) and at this [repo](https://github.com/UMAprotocol/research).

## UMA Token

The UMA project token is the voting token for the UMA DVM. 

View [here](https://docs.umaproject.org/uma-tokenholders/uma-holders) to learn more about how UMA token is used to manage and enforce financial contracts. 