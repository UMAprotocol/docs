---
title: Deploying an LSP Contract
sidebar_label: Deploying an LSP Contract
---
This tutorial will show you how to deploy a Long Short Pair (LSP) contract by using the UMA `launch-lsp` repository. By following these instructions, you will be able to launch a custom LSP on Kovan testnet and Ethereum mainnet.

## Deployment process

At the end of this deployment process, you should have a deployed contract on Kovan testnet and Ethereum mainnet. The following is an overview of the deployment steps below.

1. Clone the repo
2. Install the dependencies
3. Set your parameters
4. Run the deployment on testnet (Kovan)
5. Run the deployment on mainnet (Ethereum)

### Is your desired price identifier and collateral type supported?

Before deploying a contract, you should verify that your desired price identifier and collateral currency are already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [Approved Kovan collateral currencies subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the instructions detailed [here](/uma-tokenholders/adding-price-id).

To add a new price identifier or collateral currency to Kovan, please contact the UMA team in Discord.

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

### Mandatory deployment parameters

- `gasprice:` The gas price used for your contract deployment  
- `url:` your node URL
- `mnemonic:` Your 12 word seed phrase or mnemonic 
- `expirationTimestamp:` Timestamp at which your contract will expire 
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. Default set to `1000000000000000000` 
- `priceIdentifier:` The approved price identifier to be used  
- `collateralToken:` Collateral currency to be used to be deposited 
- `pairName:` The name of token pairs (i.e. both the long and short tokens)
- `longSynthName:` The extended name of the long token
- `longSynthSymbol:` The ticker name of the long token or ticker symbol
- `shortSynthName:` The extended name of the short token
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol

### Optional deployment parameters

- `lspCreatorAddress:` Deployed address of the creator contract you're calling. This will be set based on chain ID if not specified.
- `financialProductLibraryAddress:` Contract providing settlement payout logic. Required if --fpl not included.
- `fpl`: The financial library your contract will use to calculate the payment at expiry. For the list of the available financial product libraries we have available, you can go [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries).
- `customAncillaryData:` Custom ancillary data to be passed along with the price request. If not needed, this should be left as a 0-length bytes array.
- `prepaidProposerReward:` Proposal reward to be forwarded to the created contract to be used to incentivize price proposals.
- `optimisticOracleLivenessTime:` Custom liveness window for disputing optimistic oracle price proposals. Longer provides more security, shorter provides faster settlement.
- `optimisticOracleProposerBond:` Additional bond proposer must post with the optimistic oracle. A higher bond increases rewards to disputers if the price is incorrect.

### FPL deployment parameters

Financial Product Library (FPL) parameters can be set by adding the following parameters to your deployment script depending on the FPL you are using. Please visit [launch-lsp](https://github.com/UMAprotocol/launch-lsp) for FPL descriptions and example deployment scripts for each FPL.

- `lowerBound:` Lower bound of a price range for certain financial product libraries. Cannot be included if strikePrice is specified.
- `strikePrice:` Alias for lowerBound, used for certain financial product libraries with no upper bound. Cannot be included if lowerBound is specified.
- `upperBound:` Upper bound of a price range for certain financial product libraries.
- `basePercentage:` The percentage of collateral per pair used as the floor. This parameter is used with the 'SuccessToken' FPL where the remaining percentage functions like an embedded call option.

## Deploying to Kovan

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to. You should also choose the corresponding financial product library (FPL) that makes sense for your use case. The script has been pre-filled with `CoveredCall` which uses `--strikePrice` to set the FPL parameter.

All the required Kovan addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/42.json) with the most important items in the list for specific launch are:

- `Kovan LongShortPairCreator` 
- `BinaryOptionLongShortPairFinancialProductLibrary` 
- `CoveredCallLongShortPairFinancialProductLibrary` 
- `LinearLongShortPairFinancialProductLibrary` 
- `RangeBondLongShortPairFinancialProductLibrary`
- `CappedYieldDollarLongShortPairFinancialProductLibrary`
- `SimpleSuccessTokenLongShortPairFinancialProductLibrary`
- `SuccessTokenLongShortPairFinancialProductLibrary`

Before deploying, please note that the script will deploy to the network that your node URL is for. If using Infura for a Kovan deployment, `YOUR_NODE_URL` will follow this format:


```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName " Your token pair name" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "long token name" --longSynthSymbol UMA-0821 --shortSynthName "short token name" --shortSynthSymbol UMA-0821s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl CoveredCall --strikePrice 12000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
## Deploying to Ethereum Mainnet

The method to deploy onto mainnet is the exact same as with Kovan, except `url` will need to be amended for use on Ethereum mainnet.

All the required Ethereum Mainnet addresses can be seen on our [Github repo](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/1.json) with the most important items in the list for specific launch are:

- `Ethereum LongShortPairCreator` 
- `BinaryOptionLongShortPairFinancialProductLibrary` 
- `CoveredCallLongShortPairFinancialProductLibrary` 
- `LinearLongShortPairFinancialProductLibrary` 
- `RangeBondLongShortPairFinancialProductLibrary`
- `CappedYieldDollarLongShortPairFinancialProductLibrary`
- `SimpleSuccessTokenLongShortPairFinancialProductLibrary`
- `SuccessTokenLongShortPairFinancialProductLibrary`

Please note that the script will deploy to the network that your node URL is for. If using Infura for mainnet, `YOUR_NODE_URL` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "token pair name" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "long token name" --longSynthSymbol UMA-0821 --shortSynthName "short token name" --shortSynthSymbol UMA-0821s --collateralToken 0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl CoveredCall --strikePrice 12000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 