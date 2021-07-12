---
title: Deploying the LSP on Polygon
sidebar_label: Deploying the LSP on Polygon
---
UMA's infrastructure is also available on Polygon for developers to make use of as a scaling solution. The following will explain the details on how to deploy on Polygon. 

Deploying to Polygon follows a near-identical launch process as to launching any UMA contract on Ethereum. Using one of our launch repo's and amending the destination network, you can quickly deploy your contracts on Polygon.

## Deployment process

At the end of this deployment process, you should have a deployed contract on Polygon mainnet or Mumbai testnet. The following is an overview of the deployment steps below.

1. Clone the repo
2. Install the dependencies
3. Set your parameters
5. Run the deployment on Mumbai testnet
6. Run the deployment on Polygon mainnet  
7. Connect to a financial product library  

### Is your desired price identifier and collateral type supported?

Please check with the UMA team if your collateral and price identifiers have been approved for use on Polygon. There will be a subset of commomly used collaterals that will be available on Polygon at launch. 

To add a new price identifier or collateral currency to Mumbai testnet, please contact the UMA team in Discord.

## Clone the repo

1. Clone the repo:

 - [launch-lsp](https://github.com/UMAprotocol/launch-lsp)
```bash
 git clone https://github.com/UMAprotocol/launch-lsp.git
```
## Install the dependencies

You will need to install nodejs v14 (we recommend nvm to manage node versions) and yarn.

Note: these additional dependencies are required -- you may or may not have them on your system already:

- libudev
- libusb

These dependencies are installed on MacOS by installing the XCode Developer Tools. For Linux, the example ubuntu installation command for additional deps is:

```bash
sudo apt-get update && sudo apt-get install -y libudev-dev libusb-1.0-0-dev
```
## Setting your parameters

Each deployment requires the following parameters to be set at the point of deployment. 

### Deployment parameters

- `gasprice:` The gas price used for your contract deployment  
- `url:` your node URL. In the case for Polygon deployments, you can use the Polygon Node URL.
- `mnemonic:` Your 12 word seed phrase or mnemonic 
- `lspCreatorAddress:` The contract factory address used to deploy your LSP.
- `expirationTimestamp:` Timestamp at which your contract will expire 
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. Default set to `1000000000000000000` 
- `priceIdentifier"` The approved price identifier to be used  
- `collateralToken:` Collateral currency to be used to be deposited 
- `pairName"` The name of token pairs (i.e. both the long and short tokens)
- `longSynthName:` The extended name of the long token
- `longSynthSymbol` The ticker name of the long token or ticker symbol
- `shortSynthName:` The extended name of the short token
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol
- `customAncillaryData"` Set the format of the ancillary data 
- `optimisticOracleLivenessTime:` the time, set in seconds, for how long each Optimistic Oracle request can be disputed 
- `fpl:` The financial library your contract will use to calculate the payment at expiry. For the list of the available financial product libraries we have available, you can go [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries).

## Deploying on Mumbai

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to and the `LongShortPairCreator` value should be substituted with the creator address on that same network. Added to that you should also choose the corresponding financial product library (FPL) that makes sense for your use case. The script has been pre-filled with the FPL for the covered call options

All the required Mumbai addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/80001.json) with the most important items in the list for specific launch are:

- `Mumbai LongShortPairCreator` 
- `BinaryOptionLongShortPairFinancialProductLibrary` 
- `CoveredCallLongShortPairFinancialProductLibrary` 
- `LinearLongShortPairFinancialProductLibrary` 
- `RangeBondLongShortPairFinancialProductLibrary` 

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
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x566f98ECadE3EF95a6c5840621C43F15f403274c --pairName "UMA \$4-12 Range Token Pair August 2021" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA \$4-12 Range Token August 2021" --longSynthSymbol rtUMA-0821 --shortSynthName "UMA \$4-12 Range Short Token August 2021" --shortSynthSymbol rtUMA-0821s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl RangeBond
```
## Deploying to Polygon Mainnet

The method to deploy onto mainnet is the exact same as with Mumbai, with a few key items to note. Your `url`, `lspCreatorAddress` and `financialProductLibrary` will need to be amended for use on Polygon mainnet. Since the library addresses are different between the networks. 

All the required Polygon Mainnet addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/137.json) with the most important items in the list for specific launch are:

- `Polygon LongShortPairCreator` 
- `BinaryOptionLongShortPairFinancialProductLibrary` 
- `CoveredCallLongShortPairFinancialProductLibrary` 
- `LinearLongShortPairFinancialProductLibrary` 
- `RangeBondLongShortPairFinancialProductLibrary` 

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
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x566f98ECadE3EF95a6c5840621C43F15f403274c --pairName "UMA \$4-12 Range Token Pair August 2021" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA \$4-12 Range Token August 2021" --longSynthSymbol rtUMA-0821 --shortSynthName "UMA \$4-12 Range Short Token August 2021" --shortSynthSymbol rtUMA-0821s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl RangeBond
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 
## Linking your Financial Product Library

Once your contract is deployed, you can head over the specific Financial Product Library your contract wants to use on [Polygonscan](https://polygonscan.com/). You need to link your newly deployed contract to the Financial Product Library. 

In the case of this launch demo, we used the `CoveredCallLongShortPairFinancialProductLibrary` to link the new LSP contract with a strike price. 

In the `longShortPair address` field, you can put in your newly created LSP contract (output from the deployment script) and in the `strikePrice` you can put the strike price that the financial product library will use to calculate the valeu fo the long and short tokens (note: the stoke price should be converted to an 18 decimal number)

![](/img/PolygonFPL.png)
