---
title: How UMA solves the Oracle Problem

sidebar_label: Solving the oracle problem
---

The DVM embraces the fact that any on-chain oracle can be corrupted — for a price.
Because there is no "rule of law" on blockchains outside of economic incentives, UMA's DVM relies on a system of economic incentives to ensure that there is no profitable way to corrupt the DVM.

UMA’s DVM introduces a simple economic security framework for evaluating oracles.
We look at the potential profit from corruption (PfC) and cost of corruption (CoC) of contracts in our system, and have designed a mechanism to ensure that the cost of corrupting the DVM will exceed the potential profit.
In doing so, we eliminate the economic incentives for corrupting the DVM in the first place.

This is a 3 step process:

1. Create a system to measure the Cost of Corruption (CoC)
1. Create a system to measure the Profit from Corruption (PfC)
1. Design a mechanism to keep CoC > PfC and prove it will work

### Step 1: Measuring Cost-of-Corruption (CoC)

The DVM uses a Schelling-Point style voting system with tokenized voting rights. [UMA tokenholders](uma-tokenholders/uma-holders.md) vote on price requests that are submitted by contracts registered with the DVM. 

UMA tokehnolders are paid a reward for voting honestly and penalized otherwise. As long as there is an honest majority, voters will vote correctly. This means the Cost of Corruption is the cost to buy control of 51% of the UMA tokens.

### Step 2: Measuring the Profit from Corruption (PfC)

The system-wide PfC is the sum of the PfC of each financial contract that is registered with the DVM.
The PfC of an individual financial contract is the maximum profit an attacker could make if they had full control of the DVM and the prices it returns to a financial contract. This is the contract-specific PfC value. The DVM then sums each contract’s PfC into a system-wide PfC number. 

Each smart contract that is registered with the DVM is responsible for computing their PfC values and exposing a `pfc()` method so others can read it. This PfC value is reported to the DVM whenever fees are paid, since the fee amount is a function of the PfC value.

To calculate the PfC for the overall DVM system, the system sums the PfC values computed and reported by each individual financial contract.

### Step 3: Maintaining CoC > PfC 

The CoC > PfC mechanism is enforced by a variable-fee policy (see section "Fees paid to the DVM" below to learn more about the fee policy).
Enforcing the CoC > PfC inequality requires keeping the cost of 51% of the participating UMA voting tokens above the system-wide PfC.
In other words, the total market cap of the participating UMA voting tokens needs to be >200% the system-wide PfC.

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
