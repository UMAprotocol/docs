---
title: Explaining Synthetic Tokens on UMA
sidebar_label: Priceless Synthetic Tokens
---


## Priceless Synthetic Tokens

Synthetic tokens are the first type of priceless contracts developers can create with UMA. 

Priceless synthetic tokens are synthetic tokens that are securely collateralized without an on-chain price feed. These tokens are designed with mechanisms to incentivize token sponsors (those who create synthetic tokens) to properly collateralize their positions. These mechanisms include a liquidation and dispute process that allows token holders to be rewarded for identifying improperly collateralized [token sponsor](synthetic-tokens/glossary.md#token-sponsor) positions. The dispute process relies on an optimistic oracle, the UMA [DVM](synthetic-tokens/glossary.md#dvm), to settle disputes regarding liquidations.

To ensure that the rewards for liquidations and disputes are economical (i.e. worth the gas/transaction cost to liquidate or dispute), deployers of this financial contract template can set a minimum sponsor size.
This is the minimum number of tokens that a token sponsor must have created against the contract.
Any action that would reduce a token sponsor's position to below this threshold is disallowed and will revert.
This includes partial liquidations that leave the sponsor's position smaller than the minimum size, token redemptions that bring the position below the minimum size, and new position creations that request to mint fewer than the minimum number of tokens.

## Launching a Priceless Synthetic Token

To launch a new type of synthetic token for which an existing market does not yet exist, that synthetic token’s smart contract must first be parameterized and deployed. Anyone can parameterize and deploy this contract.

This smart contract can be deployed using UMA’s synthetic token contract template and defining key parameters. Some parameters to highlight are:

- Token’s [price identifier](synthetic-tokens/glossary.md#price-identifier) (the price feed this token should track)
- Token expiration timestamp
- Token [collateralization requirement](synthetic-tokens/glossary.md#collateralization-requirement) (e.g. a synthetic token must have collateral worth at least 120% of the price indentifier’s current value)

This [tutorial](build-walkthrough/mint-locally) will show you how to parameterize and deploy the smart contract for a new synthetic token from the command line.


## Additional Resources

Here are some additional resources to better understand how the priceless synthetic token contract works:

- [Blog post](https://medium.com/uma-project/priceless-synthetic-tokens-f28e6452c18b)
- [Twitter thread](https://twitter.com/UMAprotocol/status/1242891550872535042?s=20)
- [Github implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/expiring-multiparty)
