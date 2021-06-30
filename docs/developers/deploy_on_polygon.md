---
title: Deploying on Polygon
sidebar_label: Deploying on Polygon
---
UMA's infrasturcture is also avalaible on Polygon for developers to make use of the scaling solution. The following will explain some of the details on how to get started on deploying on Polygon. 

Deploying to Polygon follows a near identical launch process as to launching a contract Ethereum by using one of our launchg repo's. 

## Deployment process

At the end of this deployment process, you should have a deployed contract on Polygon mainnet or on Mumbai testnet. The following is an overview of the deployment setps below.

1. Clone the repo
2. Install the dependancies
3. Set your parameters
4. Run the deployment on a local fork
5. Run the deployment on Mumbai testnet
6. Run the deployment on Polygon mainnet  
7. Connect to a financial product library  

## Clone the repo

1. Clone the specific repository contract you need by choosing one of the two below:

    - [launch-lsp](https://github.com/UMAprotocol/launch-lsp)
     ```bash
    git clone https://github.com/UMAprotocol/launch-lsp.git
    ```

    - [launch emp](https://github.com/UMAprotocol/launch-emp)
    ```bash
    git clone https://github.com/UMAprotocol/launch-emp.git
    ```
## Install the dependancies

You will need to install nodejs v12 (we recommend nvm to manage node versions) and yarn.

Note: these additional dependencies are required -- you may or may not have them on your system already:

- libudev
- libusb

These dependencies are installed on MacOSX by installing the XCode Developer Tools. For Linux, the example ubuntu installation command for additional deps is:

```bash
sudo apt-get update && sudo apt-get install -y libudev-dev libusb-1.0-0-dev
```
## Setting your parameters

It is important to understand that each contract type requires the following parameters to be set at the point deployment. 

 `expirationTimestamp`: unix timestamp when the contract will expire.
- `collateralPerPair`: how many units of collateral are required to mint one pair of synthetic tokens.
- `priceIdentifier`: registered DVM price identifier that the long and short pair will track.
- `financialProductLibraryAddress`: Contract providing settlement payout logic. Will typically creates bounds and transform the value returned by the price identifier.
- `longTokenAddress`: ERC20 token used as long in the CFD.
- `shortTokenAddress`: ERC20 token used as short in the CFD.
- `customAncillaryData`: Custom ancillary data to be passed along with the price request. If not needed, this should be left as a 0-length bytes array. This is used to pass parameters other than the request timestamp along with the price request. For an explanation of ancillary data functionality and desired format, refer [here](https://docs.google.com/document/d/1vl1BcIMO3NTNxvR0u6fFQqdUgWtIY8XyjVtx8Hkl8Qk/edit). For an example of a price identifier that uses ancillary data, refer [here](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-83.md#technical-specifications).
- `finderAddress`: UMA protocol Finder contract address used to discover other protocol contracts.