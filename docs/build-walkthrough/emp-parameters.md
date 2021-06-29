---
title: EMP Parameterization
sidebar_label: EMP Parameterization
---

To deploy a new ExpiringMulti Party contract, deployers will need to call the `createExpiringMultiParty` method on a mainnet or Kovan version of the `ExpiringMultiPartyCreator` factory contract. This method call will automatically generate a new `ExpiringMultiParty` contract which is configured based upon the passed constructor parameters. The mandatory constructor parameters to pass are explained below.

## Mandatory EMP Parameters

- `expirationTimestamp`: The UNIX timestamp that the EMP will expire at. Example December 31, 2024 expiry: `1735682400`. [Here](https://www.unixtimestamp.com/) is a helpful tool for finding a timestamp. 
- `collateralAddress`: The token address of the Kovan or mainnet token that will be used as the collateral currency. Example Kovan WETH address: `0xd0A1E359811322d97991E03f863a0C30C2cF029C`.
- `priceFeedIdentifier`: The plaintext price identifier converted to bytes32 format. Example for USDETH: `0x555344455448`.
- `syntheticName`: The plaintext synthetic token name. Example: `Synthetic Test USDETH Dec 2024`.
- `syntheticSymbol`: The plaintext synthetic token symbol. Example: `USDETH-DEC-2024`.
- `collateralRequirement`: The [collateralization requirement ratio](https://docs.umaproject.org/synthetic-tokens/glossary#collateralization-requirement) scaled to 18 decimals. Example for a 1.5 ratio: `{ rawValue: '1500000000000000000' }`. Please note that it is potentially dangerous to set this requirement too low. Only in rare cases for stable financial products should this ever be set below 1.2, and never below 1.05. 
- `disputeBondPercentage`: The percentage size of the [dispute bond](../synthetic-tokens/expiring-synthetic-tokens#liquidation-and-dispute) converted to 18 decimals. Example for 10%: `{ rawValue: '100000000000000000' }`.
- `sponsorDisputeRewardPercentage`: The percentage size of the [dispute reward](../synthetic-tokens/expiring-synthetic-tokens#liquidation-and-dispute) paid to the position sponsor scaled to 18 decimals. Example for 5%: `{ rawValue: '50000000000000000' }`.
- `disputerDisputeRewardPercentage`: The percentage size of the dispute reward paid to the disputer scaled to 18 decimals. Example for 20%: `{ rawValue: '200000000000000000' }`.
- `minSponsorTokens`: The minimum number of tokens required in a sponsor position scaled to 18 decimals. Example for 100 tokens: `{ rawValue: '100000000000000000000' }`.
- `withdrawalLiveness`: The length of the [withdrawal liveness period](https://docs.umaproject.org/synthetic-tokens/glossary#withdrawal-liveness-period) in seconds. Example for 2 hours: `7200`.
- `liquidationLiveness`: The length of the [liquidation liveness period](https://docs.umaproject.org/synthetic-tokens/glossary#liquidation-liveness-period) in seconds. Example for 2 hours: `7200`.
- `excessTokenBeneficiary`: The address that will receive excess collateral accrued by interest bearing collateral currencies, such as rDAI. By default and for collateral types that do not accrue additional collateral, this should be still be set to the UMA `Store` contract. `0x54f44eA3D2e7aA0ac089c4d8F7C93C27844057BF` for a mainnet deployment, and `0x41AF40Eb92Bec4dD8DA77103597838b3dBBD3B6f` for a Kovan deployment.
- `financialProductLibraryAddress`: The address of a contract that can transform a DVM price received by an EMP. For situations where this does not apply, this should be set to `0x0000000000000000000000000000000000000000`.
