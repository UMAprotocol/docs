---
title: UMA Overview
sidebar_label: What is UMA?
---

UMA builds open-source infrastructure for “priceless” financial contracts on Ethereum. Specifically, this is two things:

- [Priceless financial contract templates](getting-started/synthetic-tokens.md), which can be used to create synthetic tokens
- [Data Verification Mechanism](getting-started/oracle.md) (DVM), an optimistic oracle service

Together, these two technologies enable the creation of fast, efficient, and secure synthetic derivatives on the Ethereum blockchain.

UMA is focused on building “priceless” derivatives on Ethereum.
These financial contracts are designed to ensure proper collateralization by counterparties without the use of an on-chain price feed.
They can do so by providing rewards to counterparties or third parties for identifying improperly collateralized positions.
To confirm that these positions are improperly collateralized, these contracts may rely on a “Data Verification Mechanism” (DVM).

The DVM is an optimistic oracle service available to respond to price requests made by financial contracts that are registered with it.
These price requests ask UMA tokenholders to vote on the value of a price identifier at a historic timestamp.
UMA tokenholders commit and reveal their votes on-chain in a process that can take 2-4 days.
Once the votes are revealed, the mode of these votes is returned to the financial contract as the value determined by the UMA voters for the price request.
The financial contract then distributes collateral to its counterparties based on the value returned by the DVM.

Because the DVM requires 2-4 days to respond to a price request, it is not intended to be used as an on-chain price feed that pushes prices to financial contracts that need it.
Rather, it is complementary to “priceless” financial contracts.

The DVM is designed to include an economic guarantee around its cost of corruption and profit from corruption.
The cost of corrupting the DVM, as measured by the cost of 51% of the UMA voting tokens, should be greater than the profit from corrupting the DVM, as measured by the collateral stored in the financial contracts that are registered with it.
To ensure that this inequality holds, the DVM may charge fees to financial contracts that are used to raise the price of the UMA voting tokens.
