---
title: Solving the Oracle Problem
sidebar_label: Solving the Oracle Problem
slug: /Optimistic Oracle 
---

UMA is designed so that the cost of corrupting the DVM will always exceed the potential profit, thus eliminating any economic incentive for corruption.  

UMA tokenholders are paid a reward for voting congruently, as long as there is an honest majority, voters will vote correctly, hence the cost of corruption(CoC) is the cost to purchase 51% control of the UMA tokens.

Each contract has a potential profit from corruption, as measured by the maximum profit that an attacker could make if they had full control over their DVM and the prices it returns.   The profit from corruption for each individual contract is summed to obtain a value for the overall system wide potential profit from corruption(PfC).

The CoC>PoC inequality is enforced by ensuring that the total market cap of UMA tokens is twice as large as the system wide potential profit that can be made by corrupting the oracle. Every time a contract invokes the DVM, a fee is paid, these accumulated fees are then used to “buy and burn” UMA tokens to increase the CoC.
