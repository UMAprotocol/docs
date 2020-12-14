---
title: Interacting with the EMP
sidebar_label: Interacting with the EMP
---

Once you have deployed your EMP contract, you will be able to interact with it in various ways to mint/burn synths, create liquidations and disputes and manage sponsors' positions. Some important EMP methods are described below.

### `create`

A contract user will use `create` to mint tokens. This method takes the collateral amount to mint with and the number of tokens to mint as parameters. It will revert if the token to collateral ratio is below the GCR.

### `deposit`

A position sponsor will use `deposit` to add additional collateral to their own position. This method takes the desired collateral amount to add as a parameter, and moves that amount of collateral from the method caller's address to their contract position. This method is different from `depositTo` in that `depositTo` allows the method caller to specify the address that they wish to deposit to. This would allow for people to deposit collateral to other sponsors' positions.

### `requestWithdrawal`

A position sponsor will use `requestWithdrawal` to attempt a slow withdrawal of collateral from their position. A slow withdrawal is when a position sponsor is trying to withdraw an amount of collateral that would bring them below the contract's GCR.  This method takes the desired collateral amount to withdraw as a parameter. Successful execution of this transaction will initiate the withdrawal liveness period.

### `createLiquidation`

Anyone can call `createLiquidation` to attempt a liquidation against a sponsor's position. This method accepts the following parameters:
- `sponsor (address)` 
- `minCollateralPerToken`
- `maxCollateralPerToken`
- `maxTokensToLiquidate`
- `deadline`

When calling this method, the caller must pay the final fee and the amount of tokens specified in `maxTokensToLiquidate`. The final fee is fixed  by the DVM for each type of supported collateral,

### `dispute`

During a liquidation liveness period, anyone can call `dispute` to dispute a liquidation and request a price from the DVM. This method takes the ID of the liquidation and the liquidated sponsor's address as parameters.

When calling this method, the caller must pay the final fee and the dispute bond. The final fee is fixed by the DVM for each type of supported collateral, while the dispute bond is set during EMP creation. 