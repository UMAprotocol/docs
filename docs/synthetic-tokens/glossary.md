---
title: Glossary
sidebar_label: Glossary
---

### DVM

The “Data Verification Mechanism” (DVM) is the name of the oracle service provided by UMA. The DVM does not provide an on-chain price feed.
Instead, it is only used to resolve disputes of liquidations and to settle synthetic token contracts upon expiration.

### Token sponsor

A token sponsor is an entity who bears the financial risk of the synthetic tokens.
This entity deposits collateral into the smart contract and withdraws synthetic tokens that they can then sell to tokenholders.
Token sponsors have short exposure to the price identifiers of the synthetic tokens they sponsor.

## Parameters of a Long Short Pair (LSP) smart contract:

### Financial Product Library (FPL)

The financial product libraries are used to transform the value returned by the price identifier into a final settlement value. Financial product libraries can be applied to create different types of financial contracts and payout functions.

Refer to [github](https://github.com/UMAprotocol/protocol/tree/master/packages/core/networks) for a list of deployed financial product libraries for each network. If your desired financial product library is not already deployed, refer [here](https://github.com/UMAprotocol/launch-emp#deploying-financial-product-libraries) for instructions on deploying and verifying your own financial product library contract.

### collateralPerPair

The collateralPerPair parameter determines the amount of collateral required to mint each pair of long and short tokens.

- Example: If a contract uses WETH as collateral and the collateralPerPair parameter is set to 0.25 on deployment, each long and short token that is minted would require 0.25 WETH as collateral.

### expiryPercentLong

ExpiryPercentLong is used to determine the redemption rate between long and short tokens. ExpiryPercentLong is a number between 0 and 1, where 0 assigns all collateral to the short tokens and 1 assigns all collateral to the long tokens.

## Products that use the LSP contract:

### Range Tokens

Range tokens enable a DAO or nascent project to use its native token as collateral to borrow funds. At maturity, if the debt is not paid, the range token holder is instead compensated with an equivalent amount of the collateral (the native token) using the settlement price of the native token to determine the number of tokens. Go [here](/range-tokens/summary) to learn more about range tokens and how to deploy your own contract.

### Success Tokens

Success tokens offer an alternative way for DAOs to diversify their treasury and sell tokens to investors in an incentive-aligned way. Success tokens are just two financial products wrapped into one token: a set amount of a project token which is combined with a covered call option on that token backed by a set amount of the same token. Go [here](/success-tokens/summary) to learn more about range tokens and how to deploy your own contract.

### KPI Options

Key Performance Indicator (KPI) Options are synthetic tokens that will pay out more rewards if a project’s KPI reaches predetermined targets before a given expiry date. Every KPI Option holder has an incentive to improve that KPI because their option will be worth more. This is intended to align individual token holder interests with the collective interests of the protocol. Go [here](/kpi-options/summary) to learn more about range tokens and how to deploy your own contract.

## Parameters of a synthetic token smart contract:

### Price identifier

This is a natural language descriptor of the reference index determining how much collateral is needed for a token sponsor to be properly collateralized.
Because DVM voters need to be able to vote on the value of this price identifier when disputes are raised, the DVM keeps a list of approved price identifiers.

- Example: “Gold_June2020_24hTWAP”

### Token redemption value

This is a function which, when evaluated only in the event of a dispute, returns the amount of collateral to be returned to a tokenholder, not including any penalties or fees.

- Example: 24-hour TWAP price of gold June 2020 synthetic token trades on Uniswap.

### Token settlement value

This is a function which, when evaluated at or after the expiration timestamp of a synthetic token, returns the amount of collateral that will be returned to a tokenholder who redeems a synthetic token.

- Example: Price of 1 oz of gold on June 2020 at 5pm ET.

### Collateralization requirement

Each token sponsor must, at all times, maintain collateral such that the ratio of deposited collateral to token settlement value, per synthetic token outstanding, is greater than the collateralization requirement.

- Example: If the collateralization requirement is 125%, a token sponsor must always have deposited collateral in excess of 125% _ # synthetic tokens outstanding _ token redemption value.

### Withdrawal liveness period

In a “slow” withdrawal, a token sponsor must make a withdrawal request and wait for the withdrawal liveness period to elapse without a liquidation before they can withdraw collateral up to the amount requested.

- Example: 1 hour.

### Liquidation liveness period

Once a token sponsor position has been liquidated, collateral is not transferred between the liquidator and the token sponsor until a liquidation liveness period has elapsed without a dispute of the liquidation.
If a disputer disputes the liquidation, all collateral is frozen until the UMA DVM returns the token redemption value and collateral can be distributed to each participant.

- Example: 1 hour.

## Calculated values of a synthetic token smart contract:

### Global collateralization ratio (GCR)

This is the average collateralization ratio across all token sponsors of a synthetic token, excluding those that have been liquidated.
It is calculated by dividing the total collateral deposited by all token sponsors in the contract by the total number of outstanding synthetic tokens.  

The GCR is used to set collateralization requirements for new synthetic token issuance and to enable “fast” withdrawals.
