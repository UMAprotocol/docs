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

### Long-Short-Pair

- `gasprice:` The gas pricec used for your contract deployment  
- `url:` your node URL. In the case for Polygon deployments, you can use the Polygon Node URL.
- `mnemonic:` Your 12 word seed phrase or mnemonic 
- `lspCreatorAddress:` The address used in deploying your LSP. The default is set to: `0x3e665D15425fAee14eEF53B9caaa0762b243911a`
- `expirationTimestamp:` Timestanp your your contrac will expire at 
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. Default set to `1000000000000000000` 
- `priceIdentifier"` The approached price identifier to be used in your contract 
- `collateralToken:` Collateral currency to be used to be deposited 
- `syntheticName:` The long name of the token
- `syntheticSymbol:` The short name of the token or ticker symbol
- `financialProductLibrary:` The financial library your contract will use to calculate the payment at expiry

### Expiring Multiparty 

- `gasprice:` The gas pricec used for your contract deployment  
- `url:` your node URL 
- `mnemonic:` Your 12 word seed phrase or mnemonic 
- `expirationTimestamp:` Timestanp your your contrac will expire at 
- `priceIdentifier"` The approached price identifier to be used in your contract 
- `collateralAddress:` Collateral currency to be used to be deposited 
- `syntheticName:` The long name of the token
- `syntheticSymbol:` The short name of the token or ticker symbol
- `minSponsorTokens:` The minimum number of token required to mint


## Run the deployment on a local fork

It's a good idea to try out your deployment on a fork before running it on mainnet. This will allow you to run the deployment in a forked environment and interact with it to ensure it works as expected. To do this, you will use Ganache, a tool that allows for the creation of local Ethereum test networks.

You should replace YOUR_NODE_URL with the URL of whatever Polygon or Mumbai that you wish to use. Infura provides easy access to Ethereum and is one method that you could use to get your node URL.

### Long-Short-Pair

Start ganache.

```bash
yarn ganache-fork YOUR_NODE_URL
```
Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to and the lspCreatorAddress value should be substituted with the creator address on that same network. These creator addresses can be found in the Contract Addresses section. It is prefilled with the Kovan LongShortPairCreator address.

```bash
node index.js --gasprice 20 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x4C68829DBD07FEbB250B90f5624d4a5C30BBeC2c --expirationTimestamp 1643678287 --collateralPerPair 1000000000000000000 --priceIdentifier ETHUSD --collateralToken 0xd0a1e359811322d97991e03f863a0c30c2cf029c --syntheticName "ETH 9000 USD Call [December 2021]" --syntheticSymbol ETHc9000-1221 --financialProductLibrary 0x2CcA11DbbDC3E028D6c293eA5d386eE887071C59
```
Once you have deplyed your contract you need to link it to a financial product library. 

### Expiring Multiparty 

## Run the deployment on a local fork