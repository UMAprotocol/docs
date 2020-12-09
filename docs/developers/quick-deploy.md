---
title: Deploying a Synthetic Asset on Kovan in 10 Minutes
sidebar_label: Deploying Your First Synthetic
---

This tutorial will show you how to use Etherscan to deploy an Expiring Multi Party (EMP) contract on Kovan in 10 minutes. By the end of this tutorial, you will have deployed a synthetic token that represents an expiring gold future and be able to view your token in MetaMask.

This is the high-level EMP deployment process that you will need to follow.

- Acquire Kovan Eth (KETH). Faucets provided [here](https://kovan-testnet.github.io/website/).
- Review your EMP contructor parameters.
- Deploy your contract with Etherscan.
- Mint your first position.
- View your token to MetaMask.

## Review EMP constructor parameters

These are the constructor parameters object that you will deploy your EMP with.

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

To deploy an EMP, you will need to call the `createExpiringMultiParty()` function of the `ExpiringMultiPartyCreator` contract. We will be interacting with the `ExpiringMultiPartyCreator` through Etherscan, but you can interact with the `ExpiringMultiPartyCreator` contract in any way that you wish.

Follow this process to deploy your EMP:

1. Navigate to the [Kovan](https://kovan.etherscan.io/address/0xF763D367E1302A16716b6c40783A17c1aC754F2E#writeContract) `ExpiringMultiPartyCreator` Write Contract tab.

2. Connect your wallet to Web3, by clicking the Etherscan `Connect to Web3` button.

3. Enter the [parameters object](#review-emp-constructor-parameters) into the `params (tuple)` input.

4. Submit a `createExpiringMultiParty()` transaction by clicking `Write`.


## Mint your first position

Now that you have created your first contract, you will need to mint your initial position to set the contract's GCR and acquire your first synthetic GOLD-JAN24 tokens.

You will first need to give approval to the token minting contract to transfer collateral currency (DAI in this case) on your behalf. To do that, follow these instructions:

1. Find the address of your contract's token minting contract.
2. Find the address of your collateral currency.
3. Go to the Write Contract Tab on the Etherscan token page for the type of collateral currency your contract is using. In this case, we are using [DAI](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f).
4. Search for the approve function.
5. For the first argument, pass in the address of the token minting contract (for ETHBTC it is 0x3f2d9edd9702909cf1f8c4237b7c4c5931f9c944, for yCOMP it is 0x67DD35EaD67FcD184C8Ff6D0251DF4241F309ce1).
6. For the second argument, pass in the maximum amount of collateral you intend to supply or alternatively any sufficiently high number.
    - This will be in units of Wei; use this [converter](http://eth-converter.com/).
    - For example, 100 DAI would be a value of 100000000000000000000.
7. Hit write, and confirm the transaction through your wallet. Once the transaction is mined, your allowance is now set.
8. You can confirm this by going to the Read Contract Tab and looking for the allowance function.
9. Pass in your own address as the first argument and the token minting contract address (from Step 3 above) as the second argument.
10. Hit Query and confirm that you get the resulting DAI allowance you just set.

After approval, you will now be able to mint your tokens. Follow this process to mint:



## Viewing your Synthetic Token in MetaMask

Now that you have successfully minted GOLD-JAN24 synthetic tokens, you can use those tokens with many ERC-20 compatible tools. Follow these directions to add your token to view your token in MetaMask.

1. 

## Next Steps

You have now successfully created your first synthetic asset with UMA on Kovan! A similar process can be followed to deploy a large multitude of expiring contract types on mainnet. For a comprehensive walkthrough on how to create other synthetic assets and how to start receiving UMA developer mining rewards, review our [A to Z Synthetic Tutorial](/build-walkthrough/build-process).