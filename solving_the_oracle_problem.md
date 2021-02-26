---
title: Solving the Oracle Problem
sidebar_label: Solving the Oracle Problem
slug: /Optimistic Oracle 
---

UMA is designed so that the cost of corrupting the DVM will always exceed the potential profit, thus eliminating any economic incentive for corruption.  The DVM embraces the fact that any on-chain oracle can be corrupted — for a price. Because there is no "rule of law" on blockchains outside of economic incentives, UMA's DVM relies on a system of economic incentives to ensure that there is no profitable way to corrupt the DVM.

UMA’s DVM introduces a simple economic security framework for evaluating oracles. We look at the potential profit from corruption (PfC) and cost of corruption (CoC) of contracts in our system, and have designed a mechanism to ensure that the cost of corrupting the DVM will exceed the potential profit. In doing so, we eliminate the economic incentives for corrupting the DVM in the first place.

This is a 3 step process:

* _Create a system to measure the Cost of Corruption (CoC)_

UMA tokenholders are paid a reward for voting congruently, as long as there is an honest majority, voters will vote correctly, hence the cost of corruption(CoC) is the cost to purchase 51% control of the UMA tokens.
* _Create a system to measure the Profit from Corruption (PfC)_

Each contract has a potential profit from corruption, as measured by the maximum profit that an attacker could make if they had full control over their DVM and the prices it returns.  The profit from corruption for each individual contract is summed to obtain a value for the overall system wide potential profit from corruption(PfC).
* _Design a mechanism to keep CoC > PfC and prove it will work_

The CoC>PoC inequality is enforced by ensuring that the total market cap of UMA tokens is twice as large as the system wide potential profit that can be made by corrupting the oracle. When a contract invokes the DVM, a fee can be charged, these accumulated fees are then used to “buy and burn” UMA tokens to increase the CoC.
