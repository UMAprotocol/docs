---
title: Interacting with the EMP
sidebar_label: Interacting with the EMP
---

Once you have deployed your EMP contract, you will be able to interact with it in various ways to mint/burn synths, create liquidations and disputes and manage sponsors' positions. Some of the more important EMP functions are described below.

## The EMP Interface

The EMP Interface is used by financial contract users and d This interface can only be used by financial
contracts that request prices _sparingly_. This is dependent on the specifics of the financial contract, but, in
general, prices should only be requested for dispute resolution and contract settlement.

There are four methods that make up the EMP Interface: `create`, `hasPrice`, and
`getPrice`.

### `create`

A financial contract should use `requestPrice` whenever it needs a price from the DVM. Generally, it should only be
used as an arbitration mechanism to resolve disputes and to settle risk. If a financial contract template overuses this
function, it's unlikely to be approved for use with the DVM.

This method takes the asset (identifier) and the timestamp that uniquely specify the price that the contract wants.
This method only enqueues a request, it does not resolve it. This means it does not return a price. To check if a price is already available for this request, use `hasPrice`.

### `deposit`

### `redeem`

### `requestWithdrawal`

### `createLiquidation`

### `dispute`