---
title: The Long Short Pair (LSP)
sidebar_label: Long Short Pair (LSP)
---

The UMA Long Short Pair (LSP) contract template allows for the creation of unliquidatable capped-payout financial contracts.

Minters can lock a unit of collateral in return for a pair of "long" and "short" tokens, and then market make or take a long or short position by selling the long or short token. Other users can go long or short simply by purchasing the tokenized position.

Some ideas for contracts that can be made with the LSP include: 
- Binary Options - insurance products, prediction markets.
- Linear payouts - speculating on the ratio of DEX to CEX monthly volume. 
- Covered call options.
- [Range Tokens for treasury management](https://medium.com/uma-project/treasury-diversification-with-range-tokens-145d4b12614e).

## LSP Example

Bob decides that he wants to offer a suite of covered call options to the DeFi community. As his first product, he has decided that he wants to create a covered call option on ETH. He knows that the ETH/USD price identifier has already been registered by UMA governance, so it should take him no more than a few minutes to create this contract.

The price of ETH is currently 2500, so Bob deploys a covered call option, that uses UMA's [call options library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/CoveredCallLongShortPairFinancialProductLibrary.sol), and sets the contract's strike to 3000 ETH/USD.

Alice, Troy and Rachel are DeFi users and want to take different bets on the price of ETH.

- Alice wants to mint 1000 covered call option tokens. Alice deposits 1000 WETH and is sent 1000 long tokens and 1000 short tokens. The amount of WETH needed for each long/short pair is determined by `collateralPerPair`. In this case, it is set to 1.
- Alice wants to collect premium on her call options, so she sells 100 of her long tokens to Troy, who believes that ETH will be greater than 3000 ETH/USD when the contract expires.
- Alice also wants to hedge out the call options that she sold to Troy, so she sells 100 short tokens to Rachel, who does not believe that the price of ETH will be greater than 3000 ETH/USD when the contract expires.
- Pre-expiry Alice decides she wants 500 WETH back. She calls `redeem` and burns 500 long and 500 short tokens in return for 500 of the WETH in her position. She would not be able to do this without equal numbers of long and short tokens.
- At expiry, Bob calls `expire`. UMA's [Optimistic Oracle](/oracle/optimistic-oracle-interface.md) returns 3750 as the ETH/USD price. The financial product library, which Bob used in deployment, compares 3750 against the 3000 ETH/USD strike price and sets the contract's `expiryPercentageLong` to: (expiry price - strike price)/expiry price. In this case, the `expiryPercentageLong` is set to (3750 - 3000)/3750 or 0.2.
- Alice can now call `settle` and receives 400 WETH back. The 400 long tokens she still held were worth 0.2 WETH apiece, while each short token was worth 0.8. Note, for any LSP contract, the sum of the long and short token pair at settlement would always be worth the amount of collateral determined by `collateralPerPair`.
- Troy calls `settle` and receives 20 WETH, since the ETH/USD price was greater than the 3000 ETH/USD strike price. The amount of collateral he received was calculated with: number of long tokens * `expiryPercentageLong`.
- Rachel calls settle and receives 80 WETH. The value of her short tokens is determined by: number of short tokens * (1 - `expiryPercentageLong`).

## LSP Construction Parameters

- `expirationTimestamp`: unix timestamp when the contract will expire.
- `collateralPerPair`: how many units of collateral are required to mint one pair of synthetic tokens.
- `priceIdentifier`: registered DVM price identifier that the long and short pair will track.
- `financialProductLibraryAddress`: Contract providing settlement payout logic. Will typically creates bounds and transform the value returned by the price identifier.
- `longTokenAddress`: ERC20 token used as long in the CFD.
- `shortTokenAddress`: ERC20 token used as short in the CFD.
- `customAncillaryData`: Custom ancillary data to be passed along with the price request. If not needed, this should be left as a 0-length bytes array. This is used to pass parameters other than the request timestamp along with the price request. For an explanation of ancillary data functionality and desired format, refer [here](https://docs.google.com/document/d/1vl1BcIMO3NTNxvR0u6fFQqdUgWtIY8XyjVtx8Hkl8Qk/edit). For an example of a price identifier that uses ancillary data, refer [here](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-83.md#technical-specifications).
- `finderAddress`: UMA protocol Finder contract address used to discover other protocol contracts.

## LSP Interaction

The LSP is a simple contract and only has four ways to interact with the contract.

The method are:
- `create`
- `redeem`
- `expire`
- `settle`

### `create`

A minter can call `create` to deposit collateral to mint an equal number of long and short tokens. The `collateralPerPair` contract parameter determines the amount of collateral needed to mint each pair of long and short tokens.

### `redeem`

At any point pre-expiry, anyone can call `redeem` with a pair of long and short tokens and receive an amount of collateral determined  `collateralPerPair`. The total amount of collateral received is determined by `collateralPerPair` * `tokensToRedeem`.

### `expire`

After the expiration timestamp, anyone can call `expire` to request a price from the UMA Optimistic Oracle. This function takes no parameters and will revert if the current time is not later than `expirationTimestamp`. 

### `settle`

Once the Optimistic Oracle or DVM returns a price, token holders of either long or short tokens can call `settle` to burn tokens in return for collateral. The amount of collateral for each token is computed with `expiryPercentLong`.

## Financial Product Libraries (FPL)

All LSPs will use an approved DVM price identifier together with a financial product library. Any value that is potentially non-deterministic and requires an "off-chain" calculation should be part of the price identifer. The financial product library will be used to transform the value returned by the price identifier into a final settlement value within the desired bounded payout range.

This can be applied in many types of ways to create different types of financial contracts. Some examples, that are currently being audited, have already been created and are below.

- [Covered call options library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/CoveredCallLongShortPairFinancialProductLibrary.sol)
- [Linear payout library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/LinearLongShortPairFinancialProductLibrary.sol)
- [Range token library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/RangeBondLongShortPairFinancialProductLibrary.sol)

On deployment, the `financialProductLibraryAddress` should be set to the address of the desired financial product library. For a list of addresses for already deployed financial product libraries, reach out to the UMA team on Discord. If your desired financial product library is not already deployed, refer [here](https://github.com/UMAprotocol/launch-emp#deploying-financial-product-libraries) for instructions on deploying and verifying your own financial product library contract.

## Launching a LSP

A launch repo for launching your own LSP is coming soon and will function similarly to the UMA Expiring Multiparty (EMP) [launch-repo](https://github.com/UMAprotocol/launch-emp).
