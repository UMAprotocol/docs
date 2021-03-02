---
title: Deploying an EMP Contract
sidebar_label: Deploying an EMP Contract
---

This tutorial will show you how to deploy an ExpiringMultiParty (EMP) contract by using the UMA `launch-emp` repository. By following these instructions, you will be able to launch a custom EMP on the Kovan testnet or Ethereum mainnet.

This is the high-level EMP deployment process that you will need to follow.

- Verify that your desired [price identifier](/uma-tokenholders/approved-price-identifiers) and collateral type is available on the network you wish to deploy your contract to.
- Clone the UMA Protocol `launch-emp` [repository](https://github.com/UMAprotocol/launch-emp).
- Install system dependencies.
- Customize the deployment script's `empParams` to meet your desired contract design.
- Acquire an Ethereum node url.
- Run the deployment script on a local fork.
- Run the deployment script to deploy to Mainnet or Kovan.

:::danger

Before deploying a mainnet contract, it is highly recommended that you have tested liquidation and dispute bots ready to deploy. Without a network of liquidation and dispute bots, a mainnet contract is vulnerable to attacks.

You should also take care to correctly parameterize your contract. As an example, all contracts using volatile price identifiers or collateral currencies should parameterize a `collateralRequirement` above 1.2.

:::

## Is your desired price identifier and collateral type supported?
Before deploying a contract, you should verify that your desired price identifier and collateral currency is already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [Approved Kovan collateral currencies subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the instructions detailed [here](/uma-tokenholders/adding-price-id).

To add a new price identifier or collateral currency to Kovan, please contact the UMA team in Discord.

## Clone the Launch EMP Repo

The following steps require the git CLI to be installed. If you are on Windows, you can install via Git Bash Shell [(link)](https://gitforwindows.org/).

1. Navigate to the UMA `launch-emp` GitHub repository.
2. Clone the repo in your CLI by running the following command in the directory you wish to work from.

```bash
git clone https://github.com/UMAprotocol/launch-emp.git
```

## Install System Dependencies and Packages

To use this repository, you will need to install [Node.js v12](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/). We recommend using `nvm` to manage node versions.

Note: these additional dependencies are required -- you may or may not have them on your system already:
- `libudev`
- `libusb`
  
Example ubuntu installation command for additional deps:

```bash
sudo apt-get update && sudo apt-get install -y libudev-dev libusb-1.0-0-dev
```

Once these dependencies are installed, you will need to install the repository packages. From within the `launch-emp` directory, run the following:

```bash
yarn
```

## Customize EMP parameters

To customize the type of EMP that you will deploy, you will need to modify your local version of the `launch-emp/index.js` script. Using your favorite text editor, navigate to the `empParams` line within `index.js` and edit the parameters to meet the design of your contract. 

For an in depth explanation of all the EMP parameters, view the EMP Parameterization [instructions](/build-walkthrough/emp-parameters).

Please note the following important parameterization guidance.
- `expirationTimestamp` should be the exact Unix timestamp that your contract should expire at. It is recommended that you set this to 10:00 pm UTC on your desired expiry day. 
- `collateralAddress` lists the token address of an approved collateral currency on the network you are trying to deploy to. As an example, deploying a contract collateralized by WETH to Kovan should use the Kovan WETH address `0xd0a1e359811322d97991e03f863a0c30c2cf029c`.
- `priceFeedIdentifier` matches the exact name of the approved price identifier that you would like to use.
- `collateralRequirement` is not less than "1.2" for volatile assets, and never less than "1.05".
- `minSponsorTokens` should be targeted to approximately $100 of value at your synthetic token's expected price. If your synthetic token is expected to be worth $1, `minSponsorTokens` should be `{ rawValue: toWei("100") }`.
- `liquidationLiveness` and `withdrawalLiveness` should almost always be at least `7200` seconds.
- `excessTokenBeneficiary` should be set to the UMA contract store by default. `0x41AF40Eb92Bec4dD8DA77103597838b3dBBD3B6f` for Kovan and `0x54f44eA3D2e7aA0ac089c4d8F7C93C27844057BF` for Mainnet.

## Deploy an EMP on a Mainnet fork

It's a good idea to try out your deployment on a fork before running it on mainnet. This will allow you to run the deployment in a forked environment and interact with it to ensure it works as expected. Please make sure to verify that your contract parameters match the network fork you are trying to use. As an example, you should use a Kovan collateral currency address if deploying to a Kovan fork.

The type of fork that you are creating will depend upon the node you are referencing in `your.node.url.io`. If using Infura for a Kovan fork, `your.node.url.io` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

If using Infura for a mainnet fork, `your.node.url.io` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

From within the `launch-emp` directory, start ganache.

```bash
yarn ganache-fork your.node.url.io
```

In a separate terminal, run the deployment script (it defaults to using localhost:8545 as the ETH node, which is desired in this case). Note: mnemonic is optional here -- without it, ganache will use its default pre-loaded account.

```bash
node index.js --gasprice 50 --mnemonic "your mnemonic (12 word seed phrase)"
```

Now you should be able to use localhost:8545 to interact with a forked version of mainnet (or kovan) where your contract is deployed.

## Deploy an EMP on Mainnet or Kovan

Now that you have tested your deployment on a fork, you can deploy to mainnet or Kovan.

First verify that your contract parameters within the script match the type of deployment that you are trying to perform. At a minimum, you should verify the following:
- `collateralRequirement` is not less than "1.2" for volatile assets, and never less than "1.05".
- `collateralAddress` lists the token address of an approved collateral currency on the network you are trying to deploy to.

Before deploying, please note that the script will deploy to the network that your node URL is for. If using Infura for a Kovan deployment, `your.node.url.io` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

If using Infura for a mainnet fork, `your.node.url.io` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You should also verify that you have ETH for the network you are trying to deploy to.

You can now run the deployment script. From within the `launch-emp` directory, run:

```bash
node index.js --gasprice 50 --url your.node.url.io --mnemonic "your mnemonic (12 word seed phrase)"
```

Once deployed, the script will list the address of your newly deployed EMP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
```
## Post-Deployment

After following this tutorial, you will have successfully deployed an EMP contract! You will need to navigate to your contract address on Etherscan and mint an initial position to set the [GCR](/synthetic-tokens/glossary#global-collateralization-ratio-gcr). This can be done by calling the `create(collateralAmount, numTokens)` function. [Here](/build-walkthrough/minting-etherscan) is a full walkthrough of minting tokens via Etherscan.

View this [documentation](https://docs-dot-uma-protocol.appspot.com/uma/contracts/ExpiringMultiParty.html) for a full explanation of available EMP functionality. 

<!-- 
To DO: Provide instructions on getting a node url from infura -->