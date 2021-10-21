---
title: Success Tokens Usage Tutorial
sidebar_label: Usage Tutorial
---

Now that you have a deployed LSP contract, this tutorial will walk you through the four ways to interact with the contract and your success tokens.

Throughout this usage tutorial, we are going to continue using the UMA success token (stUMA-1221) as a reference. As a reminder, the following parameters are set for the stUMA-1221 token:
- `SuccessToken` as the fpl parameter, `strikePrice` is set to $15, and `basePercentage` is set to 0.5.
- UMAUSD as a price identiifer.
- An expiration date of December 31, 2021.
- `collateralPerPair` of 1. Meaning 1 $UMA mints 1 long and 1 short token.

### Minting Success Tokens

After a success token contract has been deployed, it is time to mint your first tokens. First, approve the token minting contract to transfer the collateral currency on your behalf. Tokens can then be minted by calling `create` on the LSP contract. This can be done using the Write Contract tab for your LSP contract in Etherscan or [UMAverse](https://umaverse.vercel.app/).

`create` can be called anytime before the contract’s `expirationTimestamp` and simply deposits collateral into the contract in exchange for an equal amount of long and short tokens based on the `collateralPerPair` parameter. The `collateralPerPair` parameter, which was set in the deployment script, determines the amount of collateral that is required for each pair of long and short tokens.

For the stUMA-1221 contract, $UMA is used as collateral and the `collateralPerPair` is set to 1. Each long and short token minted requires 1 $UMA as collateral. If instead the `collateralPerPair` parameter would have been set to 3 $UMA on deployment, the screenshot below shows how each long and short token minted would require 3 $UMA as collateral.

![](/docs/success-tokens/success-tokens-mint.png)

After tokens are minted, to confirm that tokens have been issued by the contract, call `getPositionTokens` on the LSP contract with the address used to mint the tokens as the argument. This will return the number of long and short tokens which will be an equal number. The long and short tokens received represent a fully collateralized and risk-neutral position. Short success tokens are just a tokenized version of overcollateralization in a minted position. As the issuer, you can sell the long tokens and hold the short tokens.

### Redeeming Success Tokens

At any point pre-expiry, `redeem` can be called with a pair of long and short success tokens and collateral is allocated based on `collateralPerPair`. As the issuer, it is important to remember you must have an equal number of long and short tokens to redeem your collateral. If you sell the long tokens, you either have to buy them back or wait until after the `expirationTimestamp` to settle.

The total amount of collateral received from the contract is determined by `collateralPerPair` * `tokensToRedeem`. Regardless of the value of the long and short tokens when redeemed, the summed value of the two tokens will always be worth the total amount of collateral used to mint. The contract burns the tokens and returns collateral proportional to the amount that the token sponsor has deposited to the contract. The caller does not need to approve this contract to transfer any number of redeemed tokens since long and short tokens are burned, rather than transferred.

Using the stUMA-1221 contract as an example, the UMA treasury could have minted 4 long and 4 short success tokens using 4 $UMA as collateral since the `collateralPerPair` is 1. If the treasury were to then sell 2 long tokens, it would only be able to redeem 2 long and 2 short tokens unless the treasury were to buy back the 2 long tokens it sold or wait until after the contract expired.

### Success Tokens at Expiration

After the success token contract has expired, token holders are unable to settle their tokens for collateral until a price has been received by the Optimistic Oracle. `settle` will revert until `expire` has been called once by anyone. `expire` does not take any parameters and requests a price from the Optimistic Oracle for the LSP contract's `priceIdentifier`, `expirationTimestamp`, `customAncillaryData`, `collateralToken`, and `prepaidProposerReward` which were set in your deployment script.

### Settling Success Tokens

Once a price request exists, Proposers respond by referencing off-chain price feeds and calling `proposePrice` on the Optimistic Oracle contract passing `priceIdentifier`, `timestamp`, `ancillaryData`, and `proposedPrice` as arguments. In return, Proposers receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. Proposal bond amounts are custom for each LSP contract and are set using the `optimisticOracleProposerBond` parameter on deployment. If the price information provided is disputed and deemed incorrect, the Proposer will lose their bond. Setting a higher bond requirement makes incorrect disputes and proposals more costly.

When the stUMA-1221 contract expires, a Proposer can call `proposePrice` on the Optimistic Oracle contract passing the following parameters:
- `priceIdentifier`: UMAUSD
- `timestamp`: 1640966400 (Unix timestamp for December 31, 2021)
- `ancillaryData`: twapLength:3600
- `proposedPrice`: UMAUSD price at `expirationTimestamp`

The `priceIdentifier`, `timestamp`, and `ancillaryData` use the stUMA-1221 parameters set on deployment while `proposedPrice` references off-chain price feeds to determine the UMAUSD price at expiry.

Disputers can refute a price submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. Similar to proposal bonds, the proposal liveness period can be customized for each LSP contract using the `optimisticOracleLivenessTime` parameter on deployment. The liveness period determines the amount of time a proposal can be disputed before the Requestor receives the price of the asset. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is treated as correct and can now be read from the Optimistic Oracle. If a proposal is disputed, the price will be escalated to UMA’s Decentralized Verification Mechanism (DVM) and resolved after a 48-96 hour voting period.

Once the price is accepted, the `expiryPrice` returned by the Optimistic Oracle is used by the [SuccessToken](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/SuccessTokenLongShortPairFinancialProductLibrary.sol) or [SimpleSuccessToken](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/SimpleSuccessTokenLongShortPairFinancialProductLibrary.sol) financial product library to calculate `expiryPercentLong`. `expiryPrice` and `expiryPercentLong` can be viewed in the Read Contract tab in Etherscan for your LSP contract.

`settle` can now be called which uses `ExpiryPercentLong` to determine the redemption rate between the long and short tokens by returning a number between 0 and 1, where a value of 0 allocates all collateral to the short tokens and a value of 1 allocates all collateral to the long tokens. The collateral returned is the sum of the two payouts and both the long and short tokens are burned.

### UMA Success Token Settlement

Let's consider for the stUMA-1221 contract that the `expiryPrice` returned by the Optimistic Oracle is $30. Since the `expiryPrice` is greater than the $20 `strikePrice`, the calculation used for the payout is 0.5 + ( 1 - 0.5 ) \* (( $30 - $15 ) / $30 ) = 0.75 $UMA per success token. With `collateralPerPair` set to 1, the `expiryPercentLong` would be equal to 0.75, meaning long tokens will receive 75% of the collateral and short tokens will receive 25%.

As an example, before expiration the UMA treasury issued 4 long and 4 short tokens with 4 $UMA as collateral. The treasury sold 2 long tokens and kept the 4 short tokens and decided to wait until after expiration to settle. With a calculated `ExpiryPercentLong` of 0.75:
- Each long token can be settled for 0.75 $UMA (`collateralPerPair` of 1 $UMA multiplied by `ExpiryPercentLong`of 0.75). Therefore, 4 long tokens would be worth 1.5 $UMA (2 * .75).
- Each short token can be settled for 0.25 $UMA (1 - 0.75). Therefore, the 4 short tokens can be settled for 1 $UMA (4 * 0.25).

If `expiryPrice` would have been below the `strikePrice`, the embedded call option would have been worthless and 0.5 $UMA would have been allocated to long token holders and 0.5 $UMA would have been allocated to short token holders.
