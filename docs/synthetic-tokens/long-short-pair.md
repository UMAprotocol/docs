---
title: The Long Short Pair (LSP)
sidebar_label: Long Short Pair (LSP)
---

The UMA Long Short Pair (LSP) contract is . This allows for 
## LSP Construction Parameters

- `expirationTimestamp`: unix timestamp when the contract will expire.
- `collateralPerPair`: how many units of collateral are required to mint one pair of synthetic tokens.
- `priceIdentifier`: registered DVM price identifier that the long and short pair will track.
- `financialProductLibraryAddress`: Contract providing settlement payout logic. Will typically creates bounds and transform the value returned by the price identifier.
- `longTokenAddress`: ERC20 token used as long in the CFD.
- `shortTokenAddress`: ERC20 token used as short in the CFD.
- `customAncillaryData`: Custom ancillary data to be passed along with the price request. If not needed, this should be left as a 0-length bytes array. This is used to pass parameters other than the request timestamp along with the price request. For an explanation of ancillary data functionality and desired format, refer [here](https://docs.google.com/document/d/1vl1BcIMO3NTNxvR0u6fFQqdUgWtIY8XyjVtx8Hkl8Qk/edit). For an example of a price identifier that uses ancillary data, refer [here](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-83.md#technical-specifications).
- `finderAddress`: UMA protocol Finder contract address used to discover other protocol contracts.

## LSP Functions

The LSP is a simple contract and only has four external pieces of functionality that can be used. 

### `create`

A minter can call `create` to deposit collateral to mint an equal number of long and short tokens. The `collateralPerPair` contract parameter determines the amount of collateral needed to mint each pair of long and short tokens.

### `redeem`

At any point pre-expiry, anyone can call `redeem` with a pair of long and short tokens and receive an amount of collateral determined  `collateralPerPair`. The total amount of collaterl received is determined by `collateralPerPair` * `tokensToRedeem`.

### `expire`

After the expiration timestamp, anyone can call `expire` to request a price from the UMA Optimistic Oracle. This function takes no parameters.

### `settle`

Once the Optimistic Oracle or DVM returns a price, token holders of either long or short tokens can call `settle` to burn tokens in return for collateral. The amount of collateral for each token is computed with `expiryPercentLong`.

## Financial Product Libraries (FPL)

All LSPs will use an approved DVM price identifier together with a financial product library. Any value that is potentially non-deterministic and requires an "off-chain" calculation should be part of the price identifer. The financial product library will be used to transform the value returned by the price identifier into a final settlement value within the desired bounded payout range.

This can be done in a multitiude of ways to create different types of financial contracts. Some audited examples have already been created and are below.

- [Call options library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/contract-for-difference-libraries/CallOptionContractForDifferenceFinancialProductLibrary.sol)
- [Linear payout libary](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/contract-for-difference-libraries/LinearContractForDifferenceFinancialProductLibrary.sol)
- [Range bond library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/contract-for-difference-libraries/RangeBondContractForDifferenceFinancialProductLibrary.sol)

On deployment, the `financialProductLibraryAddress` should be set to the address of the desired financial product library. For a list of addresses for already deployed financial product libraries, refer here. If your desired financial product library is not already deployed, refer [here](https://github.com/UMAprotocol/launch-emp#deploying-financial-product-libraries) for instructions on deploying and verifying your own financial product library contract.

## Launching a LSP

A launch repo for launching your own LSP is coming soon and will function similarly to the UMA Expiring Multiparty (EMP) [launch-repo](https://github.com/UMAprotocol/launch-emp).