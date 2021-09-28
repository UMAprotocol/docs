---
title: Range Tokens Usage Tutorial
sidebar_label: Usage Tutorial
---

Now that you have a deployed LSP contract, this tutorial will walk you through the four ways to interact with the contract and your range tokens.

Throughout this usage tutorial, we are going to continue using the [UMA Range Token](https://umaverse.vercel.app/0x372802d8A2D69bB43872a1AABe2bd403a0FafA1F) (rtUMA-0821) as a reference. As a reminder, the following parameters were used for the rtUMA-0821 contract:
- A `lowerBound` of $4 and `upperBound` of $12. 
- UMAUSD as a price identiifer.
- An expiration date of August 31, 2021.
- `collateralPerPair` of 0.25. Meaning 0.25 $UMA minted 1 long and 1 short token.

### Minting Range Tokens

After a range token contract has been deployed, it is time to mint your first tokens. First, approve the token minting contract to transfer the collateral currency on your behalf. Tokens can then be minted by calling `create` on the LSP contract. This can be done using the Write Contract tab for your LSP contract in Etherscan or [UMAverse](https://umaverse.vercel.app/). 

`create` can be called anytime before the contract’s `expirationTimestamp` and simply deposits collateral into the contract in exchange for an equal amount of long and short tokens based on the `collateralPerPair` parameter. The `collateralPerPair` parameter, which was set in the deployment script, determines the amount of collateral that is required for each pair of long and short tokens. For the rtUMA-0821 contract, $UMA was used as collateral and the `collateralPerPair` was set to 0.25. Each long and short token minted required 0.25 UMA of collateral. If instead the `collateralPerPair` would have been set to 1 $UMA on deployment, each long and short token minted would have required 1 $UMA of collateral.

After tokens are minted, to confirm that tokens have been issued by the contract, call `getPositionTokens` on the LSP contract with the address used to mint the tokens as the argument. This will return the number of long and short tokens which will be an equal number. The long and short tokens received represent a fully collateralized and risk-neutral position. Short range tokens are just a tokenized version of overcollateralization in a minted position. As the issuer, you can sell the long tokens and hold the short tokens. 

### Redeeming Range Tokens

At any point pre-expiry, `redeem` can be called with a pair of long and short range tokens and collateral is returned based on `collateralPerPair`. As the issuer, it is important to remember you must have an equal number of long and short tokens to redeem your collateral. If you sell the long tokens, you either have to buy them back or wait until after the `expirationTimestamp` to settle.

The total amount of collateral received from the contract is determined by `collateralPerPair` * `tokensToRedeem`. Regardless of the value of the long and short tokens when redeemed, the summed value of the two tokens will always be worth the total amount of collateral used to mint. The contract burns the tokens and returns collateral proportional to the amount that the token sponsor has deposited to the contract. The caller does not need to approve this contract to transfer any number of redeemed tokens since long and short tokens are burned, rather than transferred.

Using the rtUMA-0821 contract as an example, the UMA treasury could have minted 4 long and 4 short tokens with 1 $UMA as collateral since the `collateralPerPair` was 0.25. If the treasury were to sell 2 long tokens, it would only be able to redeem 2 long and 2 short tokens unless the treasury were to buy back the 2 long tokens it sold or wait until after the contract expired.

### Range Tokens at Expiration

After the range token contract has expired, token holders are unable to settle their tokens for collateral until a price has been received by the Optimistic Oracle. `settle` will revert until `expire` has been called once by anyone. `expire` does not take any parameters and requests a price from the Optimistic Oracle for the LSP contract's `priceIdentifier`, `expirationTimestamp`, `customAncillaryData`, `collateralToken`, and `prepaidProposerReward` which were set in your deployment script.

### Settling Range Tokens 

Once a price request exists, Proposers respond by referencing off-chain price feeds and calling `proposePrice` on the Optimistic Oracle contract passing `priceIdentifier`, `timestamp`, `ancillaryData`, and `proposedPrice` as arguments. In return, Proposers receive a pre-defined proposal reward set by the Requestor. To propose prices, the Proposer is required to stake a proposal bond. Proposal bond amounts are custom for each LSP contract and are set using the `optimisticOracleProposerBond` parameter on deployment. If the price information provided is disputed and deemed incorrect, the Proposer will lose their bond. Setting a higher bond requirement makes incorrect disputes and proposals more costly.

When a Proposer called `proposePrice` on the Optimistic Oracle contract for rtUMA-0821, the following parameters were used: 
- `priceIdentifier`: UMAUSD
- `timestamp`: 1630447200 (Unix timestamp for August 31, 2021)
- `ancillaryData`: twapLength:3600
- `proposedPrice`: 12954216666666666666 (UMAUSD price of $12.95)

The `priceIdentifier`, `timestamp`, and `ancillaryData` used the rtUMA-0821 parameters set on deployment while `proposedPrice` referenced off-chain price feeds to determine a UMAUSD price of $12.95. [Here](https://etherscan.io/tx/0xf29fe9afbf1da5cb5c65b98301743f7e9d44918afa57cc7ccdad199dc495d877) is the transaction details.

Disputers can refute a price submitted by a Proposer within the proposal liveness period by referencing their own off-chain price feeds. Similar to proposal bonds, the proposal liveness period can be customized for each LSP contract using the `optimisticOracleLivenessTime` parameter on deployment. The liveness period determines the amount of time a proposal can be disputed before the Requestor receives the price of the asset. If Disputers do not refute the price submitted by the Proposer within the proposal liveness period, the price is treated as correct and can now be read from the Optimistic Oracle. If a proposal is disputed, the price will be escalated to UMA’s Decentralized Verification Mechanism (DVM) and resolved after a 48-96 hour voting period.

Once the price is accepted, the `expiryPrice` returned by the Optimistic Oracle is used by the [RangeBond](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/RangeBondLongShortPairFinancialProductLibrary.sol) financial product library to calculate `expiryPercentLong`. `expiryPrice` and `expiryPercentLong` can be viewed in the Read Contract tab in Etherscan for your LSP contract.

`settle` can now be called which uses `ExpiryPercentLong` to determine the redemption rate between the long and short tokens by returning a number between 0 and 1, where a value of 0 allocates all collateral to the short tokens and a value of 1 allocates all collateral to the long tokens. The collateral returned is the sum of the two payouts and both the long and short tokens are burned.

### UMA Range Token Settlement 

With the `expiryPrice` of $12.95 for the rtUMA-0821 contract being greater than the `upperBound` of $12, `ExpiryPercentLong` is calculated as ( notional value / upperBound) / collateralPerPair . The rtUMA-0821 contract was calculated as (1/12)/.25 = 0.33. Therefore, long tokens receive 33.33% of the collateral and short tokens receive 66.66%.

As an example, before expiration the UMA treasury issued 8 long and 8 short tokens with 2 $UMA as collateral. The treasury sold 4 long tokens and kept the 8 short tokens and decided to wait until after expiration to settle. With a calculated `ExpiryPercentLong` of 0.33:
- Each long token can be settled for 0.0833 $UMA (`collateralPerPair` of 0.25 $UMA multiplied by `ExpiryPercentLong`of 0.33). Therefore, 4 long tokens would be worth 0.33 $UMA (4 * .0833).
- Each short token can be settled for 0.1666 $UMA (0.25 - 0.0833). Therefore, the 8 short tokens can be settled for 1.33 $UMA (8 * 0.1666).

If the `expiryPrice` was below the `lowerBound` of $4, `ExpiryPercentLong` would have been equal to 1. This would have meant the full collateral amount would have been allocated to long token holders equal to the `collateralPerPair` of 0.25 $UMA and the short tokens would have expired worthless.

If the `expiryPrice` would have been between the `lowerBound` of $4 and the `upperBound` as $12, the `ExpiryPercentLong` would have shifted to keep the payout in dollar terms equal to the bond notional of $1.
