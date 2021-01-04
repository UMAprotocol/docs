---
title: How UMA solves the Oracle Problem
sidebar_label: UMA's solution to the oracle problem
---

UMA’s DVM design embraces the fact that any on-chain oracle can be corrupted — for a price.
Because there is no "rule of law" on blockchains outside of economic incentives, UMA's DVM relies on a system of economic incentives to ensure that there is no profitable way to corrupt the DVM.

UMA’s DVM introduces a simple economic security framework for evaluating oracles.
We look at the potential profit from corruption (PfC) and cost of corruption (CoC) of contracts in our system, and have designed a mechanism to ensure that the cost of corrupting the DVM will exceed the potential profit.
In doing so, we eliminate the economic incentives for corrupting the DVM in the first place.

This is a 3 step process:

1. Create a system to measure the Cost of Corruption (CoC)
1. Create a system to measure the Profit from Corruption (PfC)
1. Design a mechanism to keep CoC > PfC and prove it will work

### Step 1: Measuring Cost-of-Corruption (CoC)

The DVM uses a Schelling-Point style voting system with tokenized voting rights. Tokenholders vote on price requests that are submitted by contracts registered with it, and they are paid a reward for voting honestly and penalized otherwise. As long as there is an honest majority, voters will vote correctly. This means the Cost of Corruption is the cost to buy control of 51% of the UMA tokens.

### Step 2: Measuring the Profit from Corruption (PfC)

The system-wide PfC is the sum of the PfC of each financial contract that is registered with the DVM.
The PfC of an individual financial contract is the maximum profit an attacker could make if they had full control of the DVM and the prices it returns to a financial contract. This is the contract-specific PfC value. The DVM then sums each contract’s PfC into a system-wide PfC number. 

Each smart contract that is registered with the DVM is responsible for computing their PfC values and exposing a `pfc()` method so others can read it. This PfC value is reported to the DVM whenever fees are paid, since the fee amount is a function of the PfC value.

To calculate the PfC for the overall DVM system, the system sums the PfC values computed and reported by each individual financial contract.

### Step 3: Maintaining CoC > PfC 

The CoC > PfC mechanism is enforced by a variable-fee policy (see section "Fees paid to the DVM" below to learn more about the fee policy).
Enforcing the CoC > PfC inequality requires keeping the cost of 51% of the participating UMA voting tokens above the system-wide PfC.
In other words, the total market cap of the participating UMA voting tokens needs to be >200% the system-wide PfC.

The DVM is designed to do this by continuously monitoring the CoC > PfC relationship and initiating programmatic, repeated, token buybacks if the voting token price drops below target.
All purchased tokens are burned, reducing token supply (which increases the market cap).
The funds needed to conduct these buybacks are raised by levying pro rata fees on the contracts using the system.
(Note that the current implementation of the DVM (v1) has not yet implemented the programmatic buy-and-burn process; this is currently a manual process. The DVM will be upgraded to programmatically perform this function in the future).

Importantly, the DVM system is designed to levy the lowest fees possible while maintaining the CoC > PfC economic guarantee.
As such, the system is not rent-seeking — it is designed to minimize the fees required to maintain the security of the system.
A fascinating result of this design is that when market participants expect growth in the future usage of the protocol, this expectation of growth can maintain the CoC > PfC inequality without the DVM levying any fees at all.

### Fees paid to the DVM

The DVM collects two types of fees from registered financial contracts, a “regular fee” and a “final fee”. Each financial contract must report its PfC in terms of its single collateral currency.

The regular fee is paid periodically by financial contracts (generally whenever someone interacts with them). They are calculated based on the PfC, the amount of time since they last paid them, and the current fee rate. The exact formula used can be found in the `computeRegularFee` function of the `Store` contract [here](https://bit.ly/2yBUPlj). These fees are paid into the `Store` contract.

UMA tokenholders control which address has `Withdrawer` privilege from the `Store`. 

The owner of the `Withdrawer` privilege uses the funds from the `Store` to perform “buy and burn” operations on the $UMA tokens to maintain CoC > PfC.

The “final fee” is paid to the `Store` each time that a financial contract makes a price request from the DVM.
The “final fee” is a fixed amount for each collateral type.

Currently, UMA tokenholders must manually observe the PfC and CoC to determine the regular and final fee rates.
The rates should generally go up as the CoC > PfC inequality comes closer to being violated.
Higher fees slightly reduce the PfC since the collateral is pulled from the contracts to put into the Store, and the Risk Labs Foundation regularly withdraws the fees that have collected in the `Store` and uses them to “buy and burn” UMA tokens to increase the CoC.

Fee rates, as well as other parameters relating to the DVM, are established via on-chain governance by UMA tokenholders via the [UMIP process](uma-tokenholders/umips.md).

## UMA Token

The UMA token is the voting token for the UMA DVM. 

View [here](uma-tokenholders/uma-holders.md) to learn more about how UMA token is used to manage and enforce financial contracts. 


## Additional Research

For more detailed research on potential mechanisms that can be implemented, please look at this [repo](https://github.com/UMAprotocol/research).
