---
title: Deploying the LSP on Polygon
sidebar_label: Deploying the LSP on Polygon
---
UMA's infrasturcture is also available on Polygon for developers to make use of the scaling solution. The following will explain the details on how to deploy on Polygon. 

Deploying to Polygon follows a near identical launch process as to launching any UMA contract on Ethereum. By using one of our launch repo's and amending the destination network, you can quickly deploy your contracts on Polygon.

## Deployment process

At the end of this deployment process, you should have a deployed contract on Polygon mainnet or on Mumbai testnet. The following is an overview of the deployment setps below.

1. Clone the repo
2. Install the dependancies
3. Set your parameters
5. Run the deployment on Mumbai testnet
6. Run the deployment on Polygon mainnet  
7. Connect to a financial product library  

## Clone the repo

1. Clone the specific repository contract you need by choosing one of the two below:

 - [launch-lsp](https://github.com/UMAprotocol/launch-lsp)
```bash
 git clone https://github.com/UMAprotocol/launch-lsp.git
```
## Install the dependencies

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

### Long-Short-Pair parameters

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
- `financialProductLibrary:` The financial library your contract will use to calculate the payment at expiry. For the list of the available financial product libraries we have available, you can go [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries).

## Deploying on Mumbai

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to and the `LongShortPairCreator` value should be substituted with the creator address on that same network. Added to that you should also choose the corresponding financial product library (FPL) that makes sense for your use case. The script has been pre-filled with the FPL for the covered call options

All the required Mumbai addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/80001.json) however to give you a quick reference here are a few key contracts to use. 

- `Mumbai LongShortPairCreator:` 0x6883FeB1c131F58C1Cd629289Da3dE0051d2aa0d
- `BinaryOptionLongShortPairFinancialProductLibrary:` 0x2158C256b2d9B2b58D90D3ddA1b6a90d64498F7d
- `CoveredCallLongShortPairFinancialProductLibrary:` 0xc19B7EF43a6eBd393446F401d1eCFac01B181ac0
- `LinearLongShortPairFinancialProductLibrary:` 0x2aBf1Bd76655de80eDB3086114315Eec75AF500c
- `RangeBondLongShortPairFinancialProductLibrary:` 0xb53A60f595EE2418be9F6057121EE77f0249AC28

Before deploying, please note that the script will deploy to the network that your node URL is for. If using Infura for a Mumbai deployment, `YOUR_NODE_URL` will follow this format:


```bash
wss://polygon-mumbai.infura.io/v3/{projectId}
```

If using Infura for a mainnet fork, `YOUR_NODE_URL` will follow this format:

```bash
https://polygon-mumbai.infura.io/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 1 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x6883FeB1c131F58C1Cd629289Da3dE0051d2aa0d --expirationTimestamp 1643678287 --collateralPerPair 1000000000000000000 --priceIdentifier ETHUSD --collateralToken 0xd0a1e359811322d97991e03f863a0c30c2cf029c --syntheticName "ETH 9000 USD Call [December 2021]" --syntheticSymbol ETHc9000-1221 --financialProductLibrary 0xc19B7EF43a6eBd393446F401d1eCFac01B181ac0
```
## Deploying to Polygon Mainnet

The method to deploy onto mainnet is the exact same as with Mumbai, with a few key items to note. Your `url`, `lspCreatorAddress` and `financialProductLibrary` will need to be amended for use on Polygon mainnet. Since the library addresses are different between the networks. 

All the required Polygon Mainnet addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/137.json) however to give you a quick reference here are a few key contracts to use. 

- `Polygon LongShortPairCreator:` 0x3e665D15425fAee14eEF53B9caaa0762b243911a
- `BinaryOptionLongShortPairFinancialProductLibrary:` 0xda768D869f1e89ea005cde7e1dBf630ff9307F33
- `CoveredCallLongShortPairFinancialProductLibrary:` 0x3F62D7F4Be7671cc93BCDFE7A3Dd900FEC4b5025
- `LinearLongShortPairFinancialProductLibrary:` 0xcFF28e9E83cEc1BCa8D8619dC7eA60244b433502
- `RangeBondLongShortPairFinancialProductLibrary:` 0x7A9Bbd278b40f90F1269cB3a9D94a63333febdD4

Please note that the script will deploy to the network that your node URL is for. If using Infura for a Polygon deployment, `YOUR_NODE_URL` will follow this format:


```bash
wss://polygon-mainnet.infura.io/v3/{projectId}
```

If using Infura for a mainnet fork, `YOUR_NODE_URL` will follow this format:

```bash
https://polygon-mainnet.infura.io/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 20 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x3e665D15425fAee14eEF53B9caaa0762b243911a --expirationTimestamp 1643678287 --collateralPerPair 1000000000000000000 --priceIdentifier ETHUSD --collateralToken 0xd0a1e359811322d97991e03f863a0c30c2cf029c --syntheticName "ETH 9000 USD Call [December 2021]" --syntheticSymbol ETHc9000-1221 --financialProductLibrary 0x3F62D7F4Be7671cc93BCDFE7A3Dd900FEC4b5025
```
Once deployed, the script will list the address of your newly deployed EMP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 
## Linking your Financial Product Library

Once your contract is deployed, you can head over the the specific Financial Product Library your contract wants to use on [Polygonscan](https://polygonscan.com/). You need to link your newly deployed contract to the Financial Product Library. 

In the case of this launch demo, we used the `CoveredCallLongShortPairFinancialProductLibrary:` 0x3F62D7F4Be7671cc93BCDFE7A3Dd900FEC4b5025 and will link the new contract with a given strike price. 

![](/img/PolygonFPL.png)