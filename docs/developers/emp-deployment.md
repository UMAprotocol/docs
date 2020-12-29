---
title: Deploying an EMP Contract
sidebar_label: Deploying an EMP Contract
---

This tutorial will show you how to deploy an Expiring Multi Party (EMP) contract using Etherscan or existing deployment scripts. By following these instructions, you will be able to launch an EMP on the Kovan testnet or Ethereum mainnet.

This is the high-level EMP deployment process that you will need to follow.

- Verify that your desired [price identifier](/uma-tokenholders/approved-price-identifiers) and collateral type is available on the network you wish to deploy your contract to.
- Determine your contract's parameters.
- Deploy your contract with Etherscan OR
- Deploy your contract with a deployment script.

:::danger

Before deploying a mainnet contract, it is highly recommended that you have tested liquidation and dispute bots ready to deploy. Without a network of liquidation and dispute bots, a mainnet contract is vulnerable to attacks.

:::

## Is your desired price identifier and collateral type supported?
Before deploying a contract, you should verify that your desired price identifier and collateral currency is already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [Approved Kovan collateral currencies](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the [UMIP process](/uma-tokenholders/umips).

To add a new price identifier to Kovan, please submit a pull request that adds your price identifier in the correct format to the list [here](https://github.com/UMAprotocol/protocol/blob/master/packages/core/config/identifiers.json). Please follow the UMA contribution guidelines and make sure to tag `@UMAprotocol/eng` for review. As an alternative, you can contact the UMA core team in the UMA Discord.

## EMP parameters

The mandatory EMP parameters are explained [here](/build-walkthrough/emp-parameters).

This is what the parameters object will look like when correctly formatted.

```bash
{   
    expirationTimestamp: "1917036000",
    collateralAddress: collateralToken.address,
    priceFeedIdentifier: priceFeedIdentifier,
    syntheticName: "Synthetic Test USDETH Sep 2030",
    syntheticSymbol: "USDETH-SEP-2030",
    collateralRequirement: { rawValue: toWei("1.35") },
    disputeBondPercentage: { rawValue: toWei("0.1") },
    sponsorDisputeRewardPercentage: { rawValue: toWei("0.05") },
    disputerDisputeRewardPercentage: { rawValue: toWei("0.2") },
    minSponsorTokens: { rawValue: toWei("100") },
    liquidationLiveness: 7200,
    withdrawalLiveness: 7200,
    excessTokenBeneficiary: store.address
}
```

## Deploy an EMP with a deployment script

The recommended method to deploy an EMP is to use the `DeployEMP.js` script. 

1. Clone the UMA protocol [repository](https://github.com/UMAprotocol/protocol).
2. Follow the [setup instructions](/developers/setup) to meet the prequisites, prepare the repo and connect your wallet to your workspace.
3. Edit the `constructorParams` object in the `DeployEMP.js` [script](https://github.com/UMAprotocol/protocol/blob/master/packages/core/scripts/local/DeployEMP.js#L99) with your desired parameters. Leave `priceFeedIdentifier` as is. This will be passed in as a command line argument. Note: all unit conversions will be done for you, so no need to convert arguments to 18 decimals or bytes32 format.
4. Run `$(npm bin)/truffle exec ./packages/core/scripts/local/DeployEMP.js --network kovan_mnemonic --identifier USDETH` from the `protocol` folder to deploy your EMP on Kovan. You can adjust the identifier flag to use different price identifiers.

## Post-Deployment

After following this tutorial, you will have successfully deployed an EMP contract! You will need to navigate to your contract address on Etherscan and mint an initial position to set the [GCR](/synthetic-tokens/glossary#global-collateralization-ratio-gcr). This can be done by calling the `create(collateralAmount, numTokens)` function. [Here](/build-walkthrough/minting-etherscan) is a full walkthrough of minting tokens via Etherscan.

View this [documentation](https://docs-dot-uma-protocol.appspot.com/uma/contracts/ExpiringMultiParty.html) for a full explanation of available EMP functionality. 