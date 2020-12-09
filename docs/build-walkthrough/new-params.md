---
title: Adding a New Price ID or Collateral Type
sidebar_label: Price IDs and Collateral Types
---

## What is a price identifier and collateral currency?

A [price identifier](https://docs.umaproject.org/synthetic-tokens/glossary#price-identifier) is a natural language descriptor of a reference index, whose value the oracle will determine upon request. For more elaboration, refer to the Tokenholders section [here](/uma-tokenholders/adding-price-id#what-is-a-price-identifier).

A collateral currency is an ERC-20 currency that is approved by the DVM for use in DVM registered financial contracts. For more elaboration, refer to the Tokenholders section [here](/uma-tokenholders/adding-price-id#what-is-a-collateral-currency).

For each deployment of the DVM, the list of approved price identifiers is controlled by the `IdentifierWhitelist` contract. In local and testnet deployments of the DVM, `IdentifierWhitelist` is controlled by a single private key. In the mainnet deployment of the DVM, `IdentifierWhitelist` is controlled by a decentralized governance process.

## Adding a price identifier or collateral currency to mainnet

The `IdentifierWhitelist` and `AddressWhitelist` contracts in the mainnet deployment of the UMA DVM are controlled by a decentralized governance process. To support a new price identifier or collateral currency, UMA token holders must propose and vote on the addition. This is done via the UMIP process, as described [here](/uma-tokenholders/adding-price-id#adding-a-price-identifier-or-collateral-currency-to-mainnet).

## Adding a price identifier to a local deployment

In a local deployment, your private key controls the `IdentifierWhitelist` contract. You can therefore add any price identifier desired using the `IdentifierWhitelist.addSupportedIdentifier`, as described in step 5 of this [tutorial](/developers/mint-locally).

## Adding a price identifier to the Kovan testnet

As described above, the Kovan testnet `IdentifierWhitelist` is controlled by a single private key.

To add a new price identifier to Kovan, please submit a pull request that adds your price identifier in the correct format to the list [here](https://github.com/UMAprotocol/protocol/blob/master/packages/core/config/identifiers.json). Please follow the [UMA contribution guidelines](https://github.com/UMAprotocol/protocol/blob/master/CONTRIBUTING.md) and make sure to tag `@UMAprotocol/eng` for review.
