---
title: Deploying the LSP on Polygon
sidebar_label: Deploying the LSP on Polygon
---
UMA's infrastructure is also available on Polygon for developers to make use of as a scaling solution. The following will explain the details on how to deploy on Polygon. 

Deploying to Polygon follows a near-identical launch process as to launching any UMA contract on Ethereum. Using one of our launch repo's and amending the destination network, you can quickly deploy your contracts on Polygon.

## How UMA works on Polygon

UMA makes use of an arbitrary message bridge that allows for two-way messages to pass between the Polygon network and Ethereum mainet. The message bridge makes use of the Polygon Arbitrary Message system, meaning it can be as trusted as the Polygon network itself. 

UMA's Optimistic Oracle is used as the arbiter of price requests natively on the Polygon network. A request will ask the Polygon Optimitic Oracle. If the proposal goes undisputed, then the result is deemed the accepted outcome. 

If the event is disputed, then the following steps will be taken to bridge the disputed result back to the final arbitator, the DVM:
1. A Polygon contract, such as a prediction market, needs a price to settle a payout. The contract expects to get this price from an optimistic oracle `Polygon Oracle`.
2. For some reason, a user disagrees with the price returned by the `Polygon Oracle` and disputes the price.
3. The disputed price request is passed from the Polygon Oracle to a contract called the `Oracle Child Tunnel`, whose sole responsibility is to communicate with an `Oracle Root Tunnel` on the Ethereum network. 
4. The `Oracle Child Tunnel` relays the dispute to Ethereum mainnet to the `Oracle Root Tunnel`.
5. The `Oracle Root Tunnel` has special permission to request a price from the DVM, where the familiar voting and resolution process is performed by UMA voting token holders.
Once the DVM has resolved a price request, the outcome of the vote is pushed to `Oracle Root Tunnel`. It is important to note that the DVM is not aware of which chain the request came from, nor does it need to.
6. Like before, the `Oracle Root Tunnel` relays the result from the DVM to the `Child Tunnel` on Polygon.
7. Finally, the `Oracle Child Tunnel` then sends a message back to the `Polygon Oracle`.
8. The outcome of the dispute is resolved and Polygon based contracts can now used the resolved price.

![](/img/PolygonDispute.png)

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
- `syntheticName:` The long name of the token
- `syntheticSymbol:` The short name of the token or ticker symbol
- `financialProductLibrary:` The financial library your contract will use to calculate the payment at expiry. For the list of the available financial product libraries we have available, you can go [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries).

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
node index.js --gasprice 1 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x6883FeB1c131F58C1Cd629289Da3dE0051d2aa0d --expirationTimestamp 1643678287 --collateralPerPair 1000000000000000000 --priceIdentifier ETHUSD --collateralToken 0xd0a1e359811322d97991e03f863a0c30c2cf029c --syntheticName "ETH 9000 USD Call [December 2021]" --syntheticSymbol ETHc9000-1221 --financialProductLibrary 0xc19B7EF43a6eBd393446F401d1eCFac01B181ac0
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
node index.js --gasprice 20 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --lspCreatorAddress 0x3e665D15425fAee14eEF53B9caaa0762b243911a --expirationTimestamp 1643678287 --collateralPerPair 1000000000000000000 --priceIdentifier ETHUSD --collateralToken 0xd0a1e359811322d97991e03f863a0c30c2cf029c --syntheticName "ETH 9000 USD Call [December 2021]" --syntheticSymbol ETHc9000-1221 --financialProductLibrary 0x3F62D7F4Be7671cc93BCDFE7A3Dd900FEC4b5025
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 
## Linking your Financial Product Library

Once your contract is deployed, you can head over the specific Financial Product Library your contract wants to use on [Polygonscan](https://polygonscan.com/). You need to link your newly deployed contract to the Financial Product Library. 

In the case of this launch demo, we used the `CoveredCallLongShortPairFinancialProductLibrary:` 0x3F62D7F4Be7671cc93BCDFE7A3Dd900FEC4b5025 and will link the new contract with a given strike price. 

In the `longShortPair address` field, you can put in your newly created LSP contract (output from the deployment script) and in the `strikePrice` you can put the strike price that the financial product library will use to calculate the valeu fo the long and short tokens (note: the stoke price should be converted to an 18 decimal number)

![](/img/PolygonFPL.png)
