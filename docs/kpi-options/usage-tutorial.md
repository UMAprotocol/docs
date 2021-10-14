---
title: KPI Options Usage Tutorial
sidebar_label: Usage Tutorial
---

Now that you have a deployed KPI Option, this tutorial will walk you through the four ways to interact with the KPI Options contract.

Throughout this usage tutorial, we are going to continue using the UMA KPI Option (UMA-TVL-1221) as a reference. As a reminder, the following parameters are set for UMA-TVL-1221:
- `General_KPI` is used as the price identifier with the `customAncillaryData` parameter including details on how to resolve a price request.
- The contract has an expiration date of December 31, 2021.
- 10,000 $UMA is allocated to the contract with the `collateralPerPair` parameter set to 1. Meaning 1 $UMA mints 1 long and 1 short token.
- `Linear` is used as the fpl parameter with the `lowerBound` set to 0 and the `upperBound` set to 1. Voters will return a value depending on the UMA TVL at expiry.

### Minting KPI Options

After a target KPI has been identified and a KPI Option contract has been deployed, it is time to mint your first tokens. First, approve the token minting contract to transfer the collateral currency on your behalf. Tokens can then be minted by calling `create` on the LSP contract. This can be done using the Write Contract tab for your LSP contract in Etherscan or [UMAverse](https://umaverse.vercel.app/).

`create` can be called anytime before the contract’s `expirationTimestamp` and simply deposits collateral into the contract in exchange for an equal amount of long and short tokens based on the `collateralPerPair` parameter. The `collateralPerPair` parameter, which was set in the deployment script, determines the amount of collateral that is required for each pair of long and short tokens. 

The UMA team has decided to allocate 10,000 $UMA to the UMA-TVL-1221 contract and the `collateralPerPair` parameter has been set to 1. Therefore, 10,000 $UMA will mint 10,000 long tokens and 10,000 short tokens. If instead the `collateralPerPair` parameter would have been set to 3 $UMA on deployment, the screenshot below shows how each long and short token minted requires 3 $UMA as collateral.

![](/docs/kpi-options/kpi-options-mint.png)

After tokens are minted, to confirm that tokens have been issued by the contract, call `getPositionTokens` on the LSP contract with the address used to mint the tokens as the argument. This will return the number of long and short tokens which will be an equal number. The long and short tokens received represent a fully collateralized and risk-neutral position. Short KPI Options tokens are just a tokenized version of overcollateralization in a minted position. As the issuer, you can distribute the long tokens to the community and hold the short tokens.

### Redeeming KPI Options

At any point pre-expiry, `redeem` can be called with a pair of long and short KPI Options and collateral is allocated based on `collateralPerPair`. As the issuer, it is important to remember you must have an equal number of long and short tokens to redeem your collateral. If you distribute the long tokens, you either have to buy them back or wait until after the `expirationTimestamp` to settle.

The total amount of collateral received from the contract is determined by `collateralPerPair` * `tokensToRedeem`. Regardless of the value of the long and short tokens when redeemed, the summed value of the two tokens will always be worth the total amount of collateral used to mint. The contract burns the tokens and returns collateral proportional to the amount that the token sponsor has deposited to the contract. The caller does not need to approve this contract to transfer any number of redeemed tokens since long and short tokens are burned, rather than transferred.

### KPI Options at Expiration

After the KPI Options contract has expired, token holders are unable to settle their tokens for collateral until a price has been received by the Optimistic Oracle. `settle` will revert until `expire` has been called once by anyone. `expire` does not take any parameters and requests a price from the Optimistic Oracle for the LSP contract's `priceIdentifier`, `expirationTimestamp`, `customAncillaryData`, `collateralToken`, and `prepaidProposerReward` which were set in your deployment script.

### Settling KPI Options

Once a price request exists, Proposers respond by referencing off-chain price feeds and calling `proposePrice` on the Optimistic Oracle contract passing `priceIdentifier`, `timestamp`, `ancillaryData`, and `proposedPrice` as arguments. In return, Proposers receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. Proposal bond amounts are custom for each LSP contract and are set using the `optimisticOracleProposerBond` parameter on deployment. If the price information provided is disputed and deemed incorrect, the Proposer will lose their bond. Setting a higher bond requirement makes incorrect disputes and proposals more costly.

When the UMA-TVL-1221 contract expires, a Proposer can call `proposePrice` on the Optimistic Oracle contract passing the following parameters: 
- `priceIdentifier`: General_KPI.
- `timestamp`: 1640966400 (Unix timestamp for December 31, 2021).
- `ancillaryData`: The below key-value pairs from deployment, input as bytes.
```
Metric:TVL in UMA financial contracts measured in millions of USD,
Endpoint:"https://api.umaproject.org/uma-tvl",
Method:"https://github.com/UMAprotocol/UMIPs/blob/master/Implementations/uma-tvl.md",
Key:currentTvl,
Interval:Updated every 10 minutes,
Rounding:-6,
Scaling:-6
```
- `proposedPrice`: Between 0.1 and 1 depending on the UMA TVL. If the number value is unable to be resolved, 0 would be returned.

The `priceIdentifier`, `timestamp`, and `ancillaryData` use the UMA-TVL-1221 parameters set on deployment while `proposedPrice` references off-chain price feeds to determine the UMA TVL value at expiry.

Disputers can refute a value submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. Similar to proposal bonds, the proposal liveness period can be customized for each LSP contract using the `optimisticOracleLivenessTime` parameter on deployment. The liveness period determines the amount of time a proposal can be disputed before the Requestor receives the price of the asset. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is treated as correct and can now be read from the Optimistic Oracle. If a proposal is disputed, the price will be escalated to UMA’s Decentralized Verification Mechanism (DVM) and resolved after a 48-96 hour voting period.

Once the price is accepted, the `expiryPrice` returned by the Optimistic Oracle is used by the Financial Product Library (FPL). Most KPI Options use [BinaryOption](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/BinaryOptionLongShortPairFinancialProductLibrary.sol) or [Linear](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/LinearLongShortPairFinancialProductLibrary.sol) financial product library to calculate `expiryPercentLong`. `expiryPrice` and `expiryPercentLong` can be viewed in the Read Contract tab in Etherscan for your LSP contract.

`settle` can now be called which uses `ExpiryPercentLong` to determine the redemption rate between the long and short tokens by returning a number between 0 and 1, where a value of 0 allocates all collateral to the short tokens and a value of 1 allocates all collateral to the long tokens. The collateral returned is the sum of the two payouts and both the long and short tokens are burned.

### UMA KPI Options Settlement 

Let's assume for the UMA-TVL-1221 contract that the UMA TVL returned at expiry is 750 million USD. Proposers should propose 0.75 which would be returned by the Optimistic Oracle for the `expiryPrice`. The `expiryPercentLong` uses the `Linear` payout function to calculate the payout based on (expiryPrice - lowerBound) / (upperBound - lowerBound).

With the `lowerBound` set to 0 and `upperBound` set to 1, the `expiryPercentLong` would be calculated as ( 0.75 - 0 ) / ( 1 - 0 ) = 0.75 meaning that each KPI Option long token is worth 0.75 $UMA. Out of the 10,000 $UMA tokens allocated to the contract, 75% of the $UMA collateral is allocated to the long tokens (community) and 25% of the $UMA collateral is allocated to the short tokens (UMA).

If `expiryPrice` would have been $500 million, 0.5 should be proposed. The `expiryPercentLong` would be calculated as ( 0.5 - 0 ) / ( 1 - 0 ) = 0.5 based on the `Linear` payout function. Therefore, 50% of the collateral is allocated to long token holders and 50% is allocated to short token holders. Since the `collateralPerPair` parameter set to 1, 0.5 $UMA would be allocated to long holders (community) and 0.5 $UMA would have been allocated to short token holders (UMA).

If the price request is unable to be resolved, 0 should be returned. This would result in 0 $UMA allocated to the community and the 10,000 $UMA in the contract allocated back to UMA.