---
title: Range Tokens Usage Tutorial
sidebar_label: Usage Tutorial
---

Now that you have a deployed LSP contract, this tutorial will walk you through the four ways to interact with the contract and your range tokens.

### Minting Range Tokens

After a range token contract has been deployed, it is time to mint your first tokens. First, approve the token minting contract to transfer the collateral currency on your behalf. Tokens can then be minted by using the Write Contract tab for your LSP contract in Etherscan or [UMAverse](https://umaverse.vercel.app/) to call `create`. 

`create` can be called anytime before the contract’s `expirationTimestamp` and simply deposits collateral into the contract in exchange for an equal amount of long and short tokens based on the `collateralPerPair` parameter. The `collateralPerPair` parameter, which was set in the deployment script, determines the amount of collateral that is required for each pair of long and short tokens. If the collateral is WETH and the `collateralPerPair` is set to 1, each long and short token minted would require 1 WETH as collateral. If instead the `collateralPerPair` is set to 0.25 WETH on deployment, each long and short token minted would require 0.25 WETH as collateral.

After tokens are minted, to confirm that tokens have been issued by the contract, go to the Read Contract tab of the LSP contract in Etherscan and call `getPositionTokens` with the address you minted the tokens from. This will return the number of long and short tokens which will be an equal number.

The long and short tokens received represent a fully collateralized and risk-neutral position. As the issuer, you can sell the long tokens and hold the short tokens. Short range tokens are just a tokenized version of overcollateralization in a minted position.

### Redeeming Range Tokens

At any point pre-expiry, `redeem` can be called with a pair of long and short range tokens and collateral is returned based on `collateralPerPair`. As the issuer, it is important to remember you must have an equal number of long and short tokens to redeem your range tokens. If you sell the long tokens, you either have to buy them back or wait until after the `expirationTimestamp` to settle.

The total amount of collateral received from the contract is determined by `collateralPerPair` * `tokensToRedeem`. Regardless of the value of the long and short tokens when redeemed, the summed value of the two tokens will always be worth the total amount of collateral used to mint. The contract burns the tokens and returns collateral proportional to the amount that the token sponsor has deposited to the contract. The caller does not need to approve this contract to transfer any number of redeemed tokens since long and short tokens are burned, rather than transferred.

### Range Tokens at Expiration

After the range token contract has expired, token holders are unable to settle their tokens for collateral until a price has been received by the Optimistic Oracle. `settle` will revert until `expire` has been called once by anyone. `expire` does not take any parameters and requests a price from the Optimistic Oracle for the LSP contract's `priceIdentifier`, `expirationTimestamp`, `customAncillaryData`, `collateralToken`, and `prepaidProposerReward` which were set in your deployment script.

### Settling Range Tokens 

Once a price request exists, Proposers respond by referencing off-chain price feeds and submitting parameters for the `priceIdentifier`, `timestamp`, `ancillaryData`, and `proposedPrice` through the Optimistic Oracle contract. In return, Proposers receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. Proposal bond amounts are custom for each LSP contract and are set using the `optimisticOracleProposerBond` parameter on deployment. If the price information provided is disputed and deemed incorrect, the Proposer will lose their bond. Setting a higher bond requirement makes incorrect disputes and proposals more costly.

Disputers can refute a price submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. Similar to proposal bonds, the proposal liveness period can be customized for each LSP contract using the `optimisticOracleLivenessTime` parameter on deployment. The liveness period determines the amount of time a proposal can be disputed before the Requestor receives the price of the asset. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is treated as correct and can now be read from the Optimistic Oracle. If a proposal is disputed, the price will be escalated to UMA’s Decentralized Verification Mechanism (DVM) and resolved after a 48-96 hour voting period.

Once the price is accepted, the `expiryPrice` returned by the Optimistic Oracle is used by the [RangeBond](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/RangeBondLongShortPairFinancialProductLibrary.sol) financial product library to calculate `expiryPercentLong`. `expiryPrice` and `expiryPercentLong` can be viewed in the Read Contract tab in Etherscan for your LSP contract.

`settle` can now be called which uses `ExpiryPercentLong` to determine the redemption rate between the long and short tokens by returning a number between 0 and 1, where 0 sends all collateral to the short tokens and 1 sends all collateral to the long tokens. The collateral returned is the sum of the two payouts and both the long and short tokens are burned.