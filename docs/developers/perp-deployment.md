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

TO DO

## Deploy an Perpetual on a Mainnet fork

TO DO

## Deploy an EMP on Mainnet or Kovan

TO DO

## Post-Deployment

TO DO