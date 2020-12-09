---
title: Deploying a Synthetic Asset on Kovan in 10 Minutes
sidebar_label: Deploying Your First Synthetic
---

This tutorial will show you how to use Etherscan to deploy an Expiring Multi Party (EMP) contract on Kovan in 10 minutes. By the end of this tutorial, you will have deployed a synthetic token that represents an expiring gold future and be able to view your token in MetaMask.

This is the high-level EMP deployment process that you will need to follow.

- Acquire Kovan Eth (KETH). Faucets provided [here](https://kovan-testnet.github.io/website/)
- Review your EMP contructor parameters
- Deploy your contract with Etherscan
- Add your token to MetaMask

## Review EMP constructor parameters

This is the constructor parameters object that you will deploy your EMP with.

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

## Deploy your EMP with Etherscan

To deploy an EMP, you will need to call the `createExpiringMultiParty()` function of the `ExpiringMultiPartyCreator` contract. You can interact with the `ExpiringMultiPartyCreator` contract in any way that you wish, but the low-lift method shown below is with Etherscan.

1. Navigate to the [Kovan](https://kovan.etherscan.io/address/0xF763D367E1302A16716b6c40783A17c1aC754F2E#writeContract) `ExpiringMultiPartyCreator` Write Contract tab.
2. Connect your wallet to Web3, by clicking the Etherscan `Connect to Web3` button.
3. Enter your parameters object into the `params (tuple)` input and submit a `createExpiringMultiParty()` transaction by clicking `Write`.


## Viewing your Synthetic Token in MetaMask



## Post-Deployment

After following this tutorial, you will have successfully deployed an EMP contract! You will need to navigate to your contract address on Etherscan and mint an initial position to set the [GCR](https://docs.umaproject.org/synthetic-tokens/glossary#global-collateralization-ratio-gcr). This can be done by calling the `create(collateralAmount, numTokens)` function. [Here](/build-walkthrough/minting-etherscan) is a full walkthrough of minting tokens via Etherscan.

View this [documentation](https://docs-dot-uma-protocol.appspot.com/uma/contracts/ExpiringMultiParty.html) for a full explanation of available EMP functionality. 