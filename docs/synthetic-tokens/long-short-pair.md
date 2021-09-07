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

## LSP Contract Deployment

To deploy an LSP contract, the [launch-lsp repo](https://github.com/UMAprotocol/launch-lsp) is utilized to customize LSP deployment parameters shown below. The deployment parameters are used by the `LongShortPairCreator`, a factory contract that creates new instances of long short pair contracts. The `LongShortPairCreator` is responsible for constraining the parameters used by new LSP contracts and creates the LSP contract and associated long and short tokens.

- `expirationTimestamp`: unix timestamp when the contract will expire.
- `collateralPerPair`: how many units of collateral are required to mint one pair of synthetic tokens.
- `priceIdentifier`: registered DVM price identifier that the long and short pair will track.
- `financialProductLibraryAddress`: Contract providing settlement payout logic. Will typically creates bounds and transform the value returned by the price identifier.
- `longTokenAddress`: ERC20 token used as long in the CFD.
- `shortTokenAddress`: ERC20 token used as short in the CFD.
- `customAncillaryData`: Custom ancillary data to be passed along with the price request. If not needed, this should be left as a 0-length bytes array. This is used to pass parameters other than the request timestamp along with the price request. For an explanation of ancillary data functionality and desired format, refer [here](https://docs.google.com/document/d/1vl1BcIMO3NTNxvR0u6fFQqdUgWtIY8XyjVtx8Hkl8Qk/edit). For an example of a price identifier that uses ancillary data, refer [here](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-83.md#technical-specifications).
- `finderAddress`: UMA protocol Finder contract address used to discover other protocol contracts.

## Financial Product Libraries (FPL)

On deployment, the `financialProductLibraryAddress` parameter should be set to the address of the desired financial product library which defines the payout function for the LSP contract. All LSPs will use an approved DVM price identifier together with a financial product library. Any value that is potentially non-deterministic and requires an "off-chain" calculation should be part of the price identifier. 

The financial product library will be used to transform the value returned by the price identifier into a final settlement value within the desired bounded payout range. This can be applied in many types of ways to create different types of financial contracts. Some examples, that are currently being audited, have already been created and are below.

- [Covered call options library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/CoveredCallLongShortPairFinancialProductLibrary.sol)
- [Linear payout library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/LinearLongShortPairFinancialProductLibrary.sol)
- [Range token library](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/RangeBondLongShortPairFinancialProductLibrary.sol)

Refer to [github](https://github.com/UMAprotocol/protocol/tree/master/packages/core/networks) for a list of deployed financial product libraries for each network. If your desired financial product library is not already deployed, refer [here](https://github.com/UMAprotocol/launch-emp#deploying-financial-product-libraries) for instructions on deploying and verifying your own financial product library contract.

## LSP Interaction

The LSP is a simple contract and only has four ways to interact with the contract.

The method are:
- `create`
- `redeem`
- `expire`
- `settle`

### `create`

After an LSP contract has been deployed, tokens can be minted by calling the `create` function before the contract’s `expirationTimestamp`. The `create` function deposits collateral into the contract in exchange for an equal amount of long and short tokens based on the `collateralPerPair` parameter. The `collateralPerPair` parameter determines the amount of collateral that is required for each pair of long and short tokens. 

![](/docs/lsp-tokens/lsp_create.png)

To create tokens, first approve the token minting contract to transfer the collateral currency on your behalf. Then input the number of tokens you would like to create into the Write Contract tab of the LSP contract in Etherscan. If the collateral is WETH and the `collateralPerPair` is set to 1, each long and short token minted would require 1 WETH as collateral.

After tokens are minted, to confirm that tokens have been issued by the contract, go to the Read Contract tab of the LSP contract in Etherscan and call the `getPositionTokens` function with the address you minted the tokens from. This will return the number of long and short tokens which will be an equal amount after you mint. The short and long tokens received represent a fully collateralized and risk-neutral position. A minter only receives long or short exposure by selling one of the tokens while a buyer receives exposure simply by purchasing one of the tokens.

### `redeem`

At any point pre-expiry, anyone can call `redeem` with a pair of long and short tokens and receive an amount of collateral determined by `collateralPerPair`. The total amount of collateral received from the contract is determined by `collateralPerPair` * `tokensToRedeem`.

Regardless of the value of the long and short tokens when redeemed, the summed value of the two tokens will always be worth the total amount of collateral used to mint (collateralPerPair). The contract burns the tokens and returns collateral proportional to the amount that the token sponsor has deposited to the contract. The caller does not need to approve this contract to transfer any number of redeemed tokens since long and short tokens are burned, rather than transferred.

![](/docs/lsp-tokens/lsp_redeem.png)

### `expire`

When the current timestamp is later than the `expirationTimestamp` parameter, token holders are unable to settle their tokens for collateral until a price has been received by the Optimistic Oracle. The `settle` function will revert until the `expire` function is called once by anyone. 

The `expire` function does not take any parameters and requests a price from the Optimistic Oracle for the LSP contract's `priceIdentifier`, `expirationTimestamp`, `customAncillaryData`, `collateralToken`, and `prepaidProposerReward`.

![](/docs/lsp-tokens/lsp_expire.png)

### `settle`

Once a price request exists, Proposers respond by referencing off-chain price feeds and submitting parameters for the `priceIdentifier`, `timestamp`, `ancillaryData`, and `proposedPrice` through the Optimistic Oracle contract. In return, Proposers receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. If the price information they provided is disputed and deemed incorrect, the Proposer will lose their bond.

Disputers can refute a price submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. The proposal liveness period is a pre-defined amount of time a proposal can be disputed before the Requestor receives the price of the asset. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is sent to the Requestor. If a proposal is disputed, the price will be submitted to UMA’s DVM and resolved after 48-hours.

![](/docs/lsp-tokens/lsp_settle.png)

To propose a price through Etherscan, use the Write Contract tab in the Optimistic Oracle contract to find proposePrice. For reference, [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/networks) is a list of contract addresses for each network that can be used to find the Optimistic Oracle contract. The parameters for proposing a price are:

- `Requestor`: sender of the initial price request
- `Identifier`: price identifier to identify the existing request in bytes32 format
- `timestamp`: timestamp to identify the existing request
- `ancillaryData`: ancillary data of the price being requested
- `proposedPrice`: price being proposed scaled to 18 decimals

After a price has been proposed, the same parameters can then be used with the `hasPrice` and `getRequest` functions. The `hasPrice` queries whether a request has been resolved. If `hasPrice` is true, a price is available and the `settle` function can be called on the LSP. Once the first `settle` call is executed, the LSP's state will update with the resolved price. At this point, the price and its settlement outcome can be read with the `expiryPrice` and `expiryPercentLong` functions. The `getRequest` function gets the current data structure containing all information about a price request.

The `expiryPrice` is the value returned by the Optimistic Oracle for the contract's `expirationTimestamp` which is used by the `financialProductLibrary` to calculate `expiryPercentLong` and determine the redemption rate between long and short tokens. `ExpiryPercentLong` is a number between 0 and 1, where 0 assigns all collateral to the short tokens and 1 assigns all collateral to the long tokens. The collateral returned is the sum of the two payouts and both the long and short tokens are burned. A simple calculation for how to use these values to predict payouts is shown below.

![](/docs/lsp-tokens/CollateralReceivedCalc.png)

## LSP Example

Let's look at an example to better understand the LSP contract. Bob decides that he wants to offer a suite of covered call options to the DeFi community. As his first product, he has decided that he wants to create a covered call option on ETH. He knows that the ETH/USD price identifier has already been registered by UMA governance, so it should take him no more than a few minutes to create this contract.

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

## Launching a LSP

A [launch-lsp repo](https://github.com/UMAprotocol/launch-lsp) for launching your own LSP is available along with additional [documentation](https://docs.umaproject.org/developers/deploy-on-polygon) on the LSP deployment process.