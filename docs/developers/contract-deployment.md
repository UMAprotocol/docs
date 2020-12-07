---
title: Deploying an EMP Contract
sidebar_label: Expiring Multi-Party
---

This tutorial will show you how to deploy an Expiring Multi Party (EMP) contract using Etherscan or existing deployment scripts. By following these instructions, you will be able to launch an EMP on the Kovan testnet or Ethereum mainnet.

This is the high-level EMP deployment process that you will need to follow.

- Verify that your desired [price identifier](https://docs.umaproject.org/uma-tokenholders/adding-price-id#what-is-a-price-identifier) and collateral type is available on the network you wish to deploy your contract to.
- Write your contract parameters.
- Deploy your contract with Etherscan OR
- Deploy your contract with a deployment script.

:::danger

Before deploying a mainnet contract, it is highly recommended that you have tested liquidation and dispute bots ready to deploy. Without a network of liquidation and dispute bots, a mainnet contract is vulnerable to attacks.

:::

## Is your desired price identifier and collateral type supported?
Before deploying a contract, you should verify that your desired price identifier and collateral currency is already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](https://docs.umaproject.org/oracle/mainnet-info#approved-collateral-types-and-final-fees)
- [Approved mainnet price identifiers](https://docs.umaproject.org/oracle/mainnet-info#approved-identifiers)
- [Approved Kovan collateral currencies](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the [UMIP process](https://docs.umaproject.org/uma-tokenholders/umips).

To add a new price identifier or collateral currency to Kovan, please follow these [instructions](https://docs.umaproject.org/uma-tokenholders/adding-price-id#adding-a-price-identifier-to-the-kovan-testnet) or contact the UMA core team in Discord.

## EMP parameters

The mandatory EMP parameters are:

- `expirationTimestamp`: The UNIX timestamp that the EMP will expire at. Example December 31, 2024 expiry: `1735682400`. [Here](https://www.unixtimestamp.com/) is a helpful tool for finding a timestamp. 
- `collateralAddress`: The token address of the Kovan or mainnet token that will be used as the collateral currency. Example Kovan WETH address: `0xd0A1E359811322d97991E03f863a0C30C2cF029C`.
- `priceFeedIdentifier`: The plaintext price identifier converted to bytes32 format. Example for USDETH: `0x555344455448`.
- `syntheticName`: The plaintext synthetic token name. Example: `Synthetic Test USDETH Dec 2024`.
- `syntheticSymbol`: The plaintext synthetic token symbol. Example: `USDETH-DEC-2024`.
- `collateralRequirement`: The [collateralization requirement ratio](https://docs.umaproject.org/understanding-uma/glossary#collateralization-requirement) converted to Wei. Example for a 1.5 ratio: `{ rawValue: '1500000000000000000' }`.
- `disputeBondPct`: The percentage size of the [dispute bond](https://docs.umaproject.org/understanding-uma/explainer#liquidation-and-dispute) converted to 18 decimals. Example for 10%: `{ rawValue: '100000000000000000' }`.
- `sponsorDisputeRewardPct`: The percentage size of the [dispute reward](https://docs.umaproject.org/understanding-uma/explainer#liquidation-and-dispute) paid to the position sponsor converted to 18 decimals. Example for 5%: `{ rawValue: '50000000000000000' }`.
- `disputerDisputeRewardPct`: The percentage size of the dispute reward paid to the disputer converted to 18 decimals. Example for 20%: `{ rawValue: '200000000000000000' }`.
- `minSponsorTokens`: The minimum number of tokens required in a sponsor position converted to 18 decimals. Example for 100 tokens: `{ rawValue: '100000000000000000000' }`.
- `withdrawalLiveness`: The length of the [withdrawal liveness period](https://docs.umaproject.org/understanding-uma/glossary#withdrawal-liveness-period) in seconds. Example for 2 hours: `7200`.
- `liquidationLiveness`: The length of the [liquidation liveness period](https://docs.umaproject.org/understanding-uma/glossary#liquidation-liveness-period) in seconds. Example for 2 hours: `7200`.
- `excessTokenBeneficiary`: The Ethereum address that will receive excess collateral accrued by interest bearing collateral currencies, such as rDAI. For collateral types that do not accrue additional collateral, this should be still be set any wallet address that you own. This will just not accrue any additional collateral.

This is what the parameters object will look like when correctly formatted.

```json
{   
    "expirationTimestamp" : "1735682400", 
    "collateralAddress" : "0xd0A1E359811322d97991E03f863a0C30C2cF029C", 
    "priceFeedIdentifier" : "0x555344455448", 
    "syntheticName" : "Synthetic Test USDETH Dec 2024", 
    "syntheticSymbol" : "USDETH-DEC-2024", 
    "collateralRequirement" : { "rawValue" : "1500000000000000000" }, 
    "disputeBondPct" : { "rawValue" : "100000000000000000" }, 
    "sponsorDisputeRewardPct" : { "rawValue" : "50000000000000000" }, 
    "disputerDisputeRewardPct" : { "rawValue" : "200000000000000000" }, 
    "minSponsorTokens" : { "rawValue" : "100000000000000000000" }, 
    "withdrawalLiveness" : "7200", 
    "liquidationLiveness" : "7200", 
    "excessTokenBeneficiary" : "YourWalletAddress" 
}
```

## Deploy an EMP with Etherscan

To deploy an EMP, you will need to call the `createExpiringMultiParty()` function of the `ExpiringMultiPartyCreator` contract. You can interact with the `ExpiringMultiPartyCreator` contract in any way that you wish, but the low-lift method shown below is with Etherscan.

1. Navigate to the [Kovan](https://kovan.etherscan.io/address/0xF763D367E1302A16716b6c40783A17c1aC754F2E#writeContract) or [mainnet](https://etherscan.io/address/0x9A077D4fCf7B26a0514Baa4cff0B481e9c35CE87#writeContract) `ExpiringMultiPartyCreator` Write Contract tab.
2. Connect your wallet to Web3, by clicking the Etherscan `Connect to Web3` button.
3. Enter your parameters object into the `params (tuple)` input and submit a `createExpiringMultiParty()` transaction by clicking `Write`.

## Deploy an EMP with a deployment script

Another method to create an EMP is to use a deployment script. 

1. Clone the UMA protocol [repository](https://github.com/UMAprotocol/protocol).
2. Follow the [setup instructions](https://docs.umaproject.org/developers/setup) to meet the prequisites, prepare the repo and connect your wallet to your workspace.
3. Edit the `constructorParams` object in the `DeployEMP.js` [script](https://github.com/UMAprotocol/protocol/blob/master/packages/core/scripts/local/DeployEMP.js#L99) with your desired parameters. Leave `priceFeedIdentifier` as is. This will be passed in as a command line argument. Note: all unit conversions will be done for you, so no need to convert arguments to 18 decimals or bytes32 format.
4. Run `$(npm bin)/truffle exec ./packages/core/scripts/local/DeployEMP.js --network kovan_mnemonic --identifier USDETH` from the `protocol` folder to deploy your EMP on Kovan.

## Post-Deployment

After following this tutorial, you will have successfully deployed an EMP contract! You will need to navigate to your contract address on Etherscan and mint an initial position to set the [GCR](https://docs.umaproject.org/understanding-uma/glossary#global-collateralization-ratio-gcr). This can be done by calling the `create(collateralAmount, numTokens)` function. [Here](https://docs.umaproject.org/developers/mint-etherscan) is a full walkthrough of minting tokens via Etherscan.

View this [documentation](https://docs-dot-uma-protocol.appspot.com/uma/contracts/ExpiringMultiParty.html) for a full explanation of available EMP functionality. 