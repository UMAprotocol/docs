---
title: Deploying a Perpetual Contract

sidebar_label: Deploying a Perpetual Contract
---

This tutorial will show you how to deploy a Perpetual (Perp) contract by using the UMA launch-perpetual repository. This tutorial will follow a very similar flow to the [Deploying an EMP Contract](docs/developers/emp-deployment.md) so if you are familiar with the EMP flow, this will be easy to grasp.

## Standard deployment process

This is the high-level Perpetual deployment process.

- Verify that your desired [price identifier](/uma-tokenholders/approved-price-identifiers) and collateral type is available on the network you wish to deploy your contract to.
- Clone the UMA Protocol `launch-perpetual` [repository](https://github.com/UMAprotocol/launch-perpetual).
- Install system dependencies.
- Customize the deployment script's `empParams` to meet your desired contract design.
- Acquire an Ethereum node url.
- Run the deployment script on a local fork.
- Run the deployment script to deploy to Mainnet or Kovan.

## Is your desired price identifier and collateral type supported?
Before deploying a contract, you should verify that your desired price identifier and collateral currency is already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [Approved Kovan collateral currencies subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the instructions detailed [here](/uma-tokenholders/adding-price-id).

To add a new price identifier or collateral currency to Kovan, please contact the UMA team in Discord.

## Clone the Launch Perpetual Repo

The following steps require the git CLI to be installed. If you are on Windows, you can install via Git Bash Shell [(link)](https://gitforwindows.org/).

1. Navigate to the UMA `launch-perpetual` [GitHub repository](https://github.com/UMAprotocol/launch-perpetual).
2. Clone the repo in your CLI by running the following command in the directory you wish to work from.

```bash
git clone https://github.com/UMAprotocol/launch-perpetual
```

## Install system dependencies

To use this repository, you will need to install [Node.js v12](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/). We recommend using `nvm` to manage node versions.

Note: these additional dependencies are required -- you may or may not have them on your system already:
- `libudev`
- `libusb`

These dependencies are installed on MacOSX by installing the XCode Developer Tools. For Linux, the example ubuntu installation command for additional steps is:

```bash
sudo apt-get update && sudo apt-get install -y libudev-dev libusb-1.0-0-dev
```

Once these dependencies are installed, you will need to install the repository packages. From within the `launch-perpetual` directory, run the following:

```bash
yarn
```
## Customize Perpetual parameters

To customize the type of Perp that you will deploy, you will need to modify your local version of the `launch-perpetual/index.js` script. Using your favorite text editor, navigate to the `perpetualParams` line within `index.js` and edit the parameters to meet the design of your contract. 

Please note the following important parameterization guidance:

- `collateralAddress` lists the token address of an approved collateral currency on the network you are trying to deploy to.
- `priceFeedIdentifier` matches the exact name of the approved price identifier that you would like to use.
- ` fundingRateIdentifier` is the rate you want to use for your perpetual
- `collateralRequirement` should always be at or higher than `1.25`.
- `minSponsorTokens` should be targeted to approximately $100 of value at your synthetic token's expected price. If your synthetic token is expected to be worth $1, `minSponsorTokens` should be `{ rawValue: toWei("100") }`.
- `liquidationLiveness` and `withdrawalLiveness` should almost always be at least `7200` seconds.
- `excessTokenBeneficiary` should be set to the UMA contract store by default. `0x41AF40Eb92Bec4dD8DA77103597838b3dBBD3B6f` for Kovan and `0x54f44eA3D2e7aA0ac089c4d8F7C93C27844057BF` for Mainnet.

## Deploy an Perpetual on a Mainnet fork

Since the Perpetual contract won't expire, it is a good idea to test on a mainnet fork before deploying to mainnet directly. This is to make sure the contract is correctly set-up the way you expect it to work.

The type of fork that you are creating will depend upon the node you are referencing in your.node.url.io. If using Infura for a Kovan fork, your.node.url.io will follow this format

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

If using Infura for a mainnet fork, `your.node.url.io` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

From within the `launch-perpetual` directory, start ganache.

```bash
yarn ganache-fork YOUR_NODE_URL
```

In a separate terminal, run the deployment script (it defaults to using localhost:8545 as the ETH node, which is desired in this case). Note: mnemonic is optional here -- without it, ganache will use its default pre-loaded account.

```bash
node index.js --gasprice 50 --url your.node.url.io --mnemonic "your mnemonic (12 word seed phrase)" --priceFeedIdentifier ETHUSD --fundingRateIdentifier "ETH/BTC" --collateralAddress "0xaddress" --syntheticName "Synthetic ETH" --syntheticSymbol uETH --minSponsorTokens .01
```

Now you should be able to use localhost:8545 to interact with a forked version of mainnet (or kovan) where your contract is deployed.

## Deploy an Perpetual on Mainnet or Kovan

Make sure you double check all details before deploying your contract. It is encouraged to check all details before deploying your contract but here are a few we suggest to double check: 
- Please make sure your `YOUR_NODE_URL` is pointing to the right network
- You have enough ETH for the network you are deploying to
- Your collateral requirement is set to the recommended 125% 
- Your collateral currency is approved on the specific network you are deploying to

### Deployment 

Once you have done the needed check you can run the below command in your `launch-perpetual` repo (Remember to change to parameters to your needs).
```bash
node index.js --gasprice 50 --url your.node.url.io --mnemonic "your mnemonic (12 word seed phrase)" --priceFeedIdentifier ETHUSD --fundingRateIdentifier "ETH/BTC" --collateralAddress "0xaddress" --syntheticName "Synthetic ETH" --syntheticSymbol uETH --minSponsorTokens .01
```
Once deployed, the script will list the address of your newly deployed EMP. A successful output the following: 
```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
```