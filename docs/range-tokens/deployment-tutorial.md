---
title: Range Tokens Deployment Tutorial
sidebar_label: Deployment Tutorial
---

The process to launch and manage a range token on UMA is surprisingly simple. This tutorial will show you how to deploy a range token using the Long Short Pair (LSP) contract and the UMA `launch-lsp` repository. By following these instructions, you will be able to launch a custom LSP on Kovan testnet and Ethereum mainnet.

## Deployment process

The following is an overview of the deployment steps below.

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

- `gasprice:` The gas price used for your contract deployment.
- `url:` your node URL.
- `mnemonic:` Your 12 word seed phrase or mnemonic. 
- `expirationTimestamp:` Timestamp at which your contract will expire. 
- `collateralPerPair:` The amount of collateral required to mint each long and short pair.
- `priceIdentifier:` The approved price identifier to be used.
- `collateralToken:` Approved collateral currency to be used.
- `pairName:` The desired name of the token pair.
- `longSynthName:` The full-length name of the long token.
- `longSynthSymbol:` The ticker name of the long token.
- `shortSynthName:` The full-length name of the short token.
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol.

### Optional deployment parameters

- `customAncillaryData:` Custom ancillary data to be passed along with the price request. If not needed, this flag can be excluded and will be left as a 0-length bytes array.
- `prepaidProposerReward:` Proposal reward to be forwarded to the created contract to be used to incentivize price proposals.
- `optimisticOracleLivenessTime:` Custom liveness window for disputing optimistic oracle price proposals in seconds. A longer liveness time provides more security, while a shorter one provides faster settlement. By default, this is set to 7200 seconds.
- `optimisticOracleProposerBond:` Additional bond a proposer must post with the optimistic oracle. A higher bond makes incorrect disputes and proposals more costly.

### FPL deployment parameters

The `fpl` parameter is used in the deployment script to designate `RangeBond` as the financial library used to calculate the payout at expiry. `RangeBond` requires `lowerBound` and `upperBound` parameters to be added to the deployment script. A price at expiry inside these bounds gives a payout equivalent to a yield dollar. Above the `upperBound`, holders of the long token are entitled to a fixed, minimum number of collateral and below the `lowerBound` each range bond is worth the number of collateral that is set using `collateralPerPair`.

## Deploying to Kovan

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to. The deployment script has been pre-filled with `RangeBond` as the fpl parameter and `lowerBound` and `upperBound` have been included.

If using Infura for a Kovan deployment, `YOUR_NODE_URL` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName " Your token pair name" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "long token name" --longSynthSymbol UMA-0821 --shortSynthName "short token name" --shortSynthSymbol UMA-0821s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl RangeBond --lowerBound 4000000000000000000 --upperBound 12000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
## Deploying to Ethereum Mainnet

The method to deploy onto mainnet is the exact same as with Kovan, except `url` will need to be amended for use on Ethereum mainnet.

If using Infura for mainnet, `YOUR_NODE_URL` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "token pair name" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "long token name" --longSynthSymbol UMA-0821 --shortSynthName "short token name" --shortSynthSymbol UMA-0821s --collateralToken 0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl RangeBond --lowerBound 4000000000000000000 --upperBound 12000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 