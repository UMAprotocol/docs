---
title: Building a Synthetic Asset
sidebar_label: Building a Synthetic Asset
---

Described in this tutorial is a high-level overview of the typical deployment process that a team would need to follow to successfully build a product on the UMA protocol. Steps include:

1. Designing the contract you will build
2. Applying to the UMA developer mining program (Optional)
3. Proposing a new price identifier or collateral type (Optional)
4. Defining a price feed to easily get prices off-chain 
5. Writing your contract's parameters
6. Deploying an EMP to Kovan
7. Minting initial token positions (set your contract's GCR)
8. Deploying liquidator and dispute bots to secure your contract
9. Creating a dApp (Optional)
10. Creating your own incentives program
11. Performing this process again on mainnet
12. Verifying that you meet developer mining criteria and can receive rewards

This process is intended to be followed in order, but is flexible depending on your project's requirements.

### 1. Product Ideation

To kick-off your synthetic asset build, you will need to decide on the product you would like to launch!

Please review the synthetic token [explainer](/synthetic-tokens/explainer) for an in-depth description of what a synthetic token is and how it can be used.

Some product ideas to get you started:

- ETH gas price future
- BTC volatilility tracker (a "crypto VIX")
- San Francisco Real Estate prices tracker
- A gold futures contract

Some important design questions for you to consider:
- What price or index will my synthetic token track?
- How accessible is the price that users will need to access? Could the typical UMA DVM voter get access to and report the price deterministically?
- What currency should contract user's collateralize this contract in?
- What is the desired lifespan of my contract? Does it work financially as a fixed-term expiring contract?

Once you have settled on the synthetic token that you would like to build, you are ready to apply to developer mining.

### 2. Apply to the UMA Developer Mining Program

Once you have an idea for a product to build, you are ready to apply to the UMA developer mining whitelist. Please note that you do not need to have all of your specifications worked out yet - we love to ideate and discuss, so almost any idea is welcome no matter how well formed it is. Please review this developer mining [overview](/developers/developer-mining) to get started.

This step is completely optional, but encouraged, as it potentially gives new developer a source of funding to build and improve on their product.

### 3. Propose Adding a New Price Identifier or Collateral Type 

When generating on a synthetic token idea, you will need to decide on the metric or price that your contract will track and the currency that it will use to mint tokens. The UMA DVM and Contract Store only support price identifiers and collateral types that have been approved by an UMA tokenholders vote, and subsequently added to the `IdentifierWhitelist` or `AddressWhitelist` contract.

It is very possible that your desired price identifier or collateral currency is already approved and usable immediately. Check these lists to determine if you need to move forward with a governance proposal:
- [Approved mainnet collateral currencies](/uma-tokenholders/adding-price-id#list-of-approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/adding-price-id#list-of-approved-price-identifiers)

If your desired price identifier or collateral currency is not already approved, please propose one to UMA voters by following the [UMIP process](/uma-tokenholders/umips). This governance process can take in the realm of 1-4 weeks, depending on the complexity of the proposal, so it is recommended that you move forward with testing the rest of the deployment process on Kovan, as using these price IDs or currencies on Kovan requires no governance vote.

View accessible Kovan price IDs and currencies here:
- [Approved Kovan collateral currencies](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to Kovan, please follow these [instructions](/uma-tokenholders/adding-price-id#adding-a-price-identifier-to-kovan) or contact the UMA core team in Discord.

### 4. Define a Price Feed

When deploying an UMA contract, various requirements will depend on being able to calculate your price identifier off-chain. When submitting a price identifier UMIP, a proposer will need to define a method for:

- DVM voters to determine the price at a given historical timestamp (at a minimum the most recent 72 hours of historical price data needs to be available)
- off-chain infrastructure to get price updates in real-time (at least one update every hour)
- off-chain infrastructure to determine the price at a given historical timestamp (at a minimum the most recent 72 hours of historical price data needs to be available)

### 5. Write Contract Parameters

For an explanation of all EMP contract parameters, go [here](/build-walkthrough/emp-parameters). Once you have written your EMP contructor parameters, use these to deploy an EMP.

### 6. Deploy an EMP to Kovan

Before starting the deployment process, make sure you have prepared your workstation by following the setup instructions.

After you have completed the setup instructions, you can now deploy an EMP using one of the following methods.
- Deploy an EMP using the Truffle console by following this [tutorial](/build-walkthrough/mint-locally).

### 7. Setting the GCR by Minting an Initial Position

Setting the intial GCR by mintin an initial position is an important and mandatory step before using a contract. Creating a GCR that is higher than your EMP's collateralization requirement ensures that all sponsors are correctly collateralized when minting tokens and also have to go through a review period (withdrawal liveness) before 

To mint your initial position, follow this [tutorial](/build-walkthrough/minting-etherscan) to:
- Give approval to your contract's token factory to transfer your collateral type.
- Determine what your GCR should be and determine the token to collateral ratio needed to create that GCR.
- Mint an initial position.

Once finished, you should have a balance of your synthetic token in your address and your EMP contract should have a GCR set. 

### 8. Bot Deployment

Why are bots important:

Follow these steps to deploy a liquidation or dispute bot:
- Create token position and fund your bots.
- Using your price feed created in [step 4](/build-walkthrough/build-process#4-define-a-price-feed), create a bot configuration.
- Test that your bot runs correctly locally
- Deploy your bot to Google Cloud Platform (GCP)

Test bots (war games):

### 9. Create a dApp

The most important EMP methods to interact with are described [here](/build-walkthrough/emp-interface).

An example dApp to interface with EMPs can be seen [here](https://github.com/UMAprotocol/emp-tools).

### 10. Create an Incentives Program

There are various reasons why you may want to design an incentives program to pay out a portion of developer mining rewards that your contract will receive. You may want to attract liquidity to your contract by implementing a liquidity mining program. You may not be focused on dApp development and want to outsource it by creating a dApp mining program. 

An example successful split of developer mining rewards involves

- 10% to contract deployer
- 30% to dApp mining or affiliate marketing
- 60% to liquidity mining

For further elaboration on incentives programs that could be built, refer [here](/developers/designing-incentives).

### 11. Repeat Steps for a Mainnet Contract

After you have deployed your contract to Kovan, have done liquidation bot testing against that contract and optionally have verified that you meet developer mining criteria, you will be ready 

### 12. Fulfill Developer Mining Criteria

For further elaboration on incentives programs that could be built, refer [here](/developers/designing-incentives).

## Post-Deployment

**Seeding an AMM Pool**

**Deploying Monitor Bots**

**Payout any Rewards Structures**