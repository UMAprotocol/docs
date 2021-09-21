---
title: Success Tokens Deployment Tutorial
sidebar_label: Deployment Tutorial
---

The process to launch and manage a success token on UMA is surprisingly simple. This tutorial will show you how to deploy a success token using the Long Short Pair (LSP) contract and the UMA `launch-lsp` repository.

## Deployment process

The following is an overview of the deployment steps below.

1. Install the dependencies
2. Set your parameters
3. Run the deployment on testnet (Kovan)
4. Run the deployment on mainnet (Ethereum)

### Is your desired price identifier and collateral type supported?

Before deploying a contract, you should verify that your desired price identifier and collateral currency are already approved on the network you are trying to deploy to.

View approved price identifiers and currencies here:
- [Approved mainnet collateral currencies](/uma-tokenholders/approved-collateral-currencies)
- [Approved mainnet price identifiers](/uma-tokenholders/approved-price-identifiers)
- [Approved Kovan collateral currencies subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Whitelisted%20Collateral%20Currencies)
- [Approved Kovan price identifiers subgraph query](https://thegraph.com/explorer/subgraph/umaprotocol/uma-kovan?query=Pricefeed%20Identifiers)

To add a new price identifier or collateral currency to mainnet, please propose one to UMA voters by following the instructions detailed [here](/uma-tokenholders/adding-price-id).

To add a new price identifier or collateral currency to Kovan, please contact the UMA team in Discord.

## LSP Prerequisites

Please go [here](/developers/lsp-prereqs) for guidance on LSP prerequisites before deploying a contract.

## Setting your parameters

For our deployment tutorial, we are going to continue using the UMA success token example (stUMA-1221) as a reference when setting the LSP parameters and customizing the deployment script.

### Mandatory deployment parameters

Each deployment requires the following parameters to be set at the point of deployment: 

- `gasprice:` The gas price used for your contract deployment.
- `url:` your node URL.
- `mnemonic:` Your 12 word seed phrase or mnemonic. 
- `expirationTimestamp:` Timestamp at which your contract will expire. The stUMA-1221 contract uses 1640966400 which represents the Unix timestamp for December 31, 2021.
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. The stUMA-1221 contract uses 1 UMA, meaning 1 UMA minted 1 long and 1 short token. If you minted using 4 $UMA as collateral, you would receive 4 long and 4 short tokens.
- `priceIdentifier:` The approved price identifier to be used. The stUMA-1221 contract uses UMAUSD.
- `collateralToken:` Approved collateral currency to be used. The stUMA-1221 contract uses the [UMA token](https://etherscan.io/address/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828) as collateral.
- `pairName:` The desired name of the token pair. The stUMA-1221 contract uses 'UMA Success Token $15 Strike December 2021'.
- `longSynthName:` The full-length name of the long token. The stUMA-1221 contract uses 'UMA Success Token $15 Strike December 2021'.
- `longSynthSymbol:` The ticker name of the long token. The stUMA-1221 contract uses 'stUMA-1221'.
- `shortSynthName:` The full-length name of the short token. The stUMA-1221 contract uses 'UMA Success Short Token $15 Strike December 2021'.
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol. The stUMA-1221 contract uses 'stUMA-1221s'.

### Optional deployment parameters

- `customAncillaryData:` Custom ancillary data to be passed along with the price request. If not needed, this flag can be excluded and will be left as a 0-length bytes array. The stUMA-1221 contract uses 'twapLength:3600'.
- `prepaidProposerReward:` Proposal reward to be forwarded to the created contract to be used to incentivize price proposals.
- `optimisticOracleLivenessTime:` Custom liveness window for disputing optimistic oracle price proposals in seconds. A longer liveness time provides more security, while a shorter one provides faster settlement. By default, this is set to 7200 seconds.
- `optimisticOracleProposerBond:` Additional bond a proposer must post with the optimistic oracle. A higher bond makes incorrect disputes and proposals more costly.

### FPL deployment parameters

The `fpl` parameter is used in the deployment script to designate `SuccessToken` or `SimpleSuccessToken` as the financial library used to calculate the payout at expiry. `SuccessToken` requires `strikePrice` and `basePercentage` parameters to be added to the deployment script while `SuccessToken` only requires `strikePrice`. 

The `basePercentage` parameter is the percentage of collateral per pair used as the floor. This parameter is always set to 50% for `SimpleSuccessToken` but you can set this to a custom value for `SuccessToken`. As an example, if `basePercentage` is set to 40%, then 40% of the success token would act as collateral with 60% functioning as an embedded covered call. The `strikePrice` parameter is used for the strike price of the embedded call option.

The stUMA-1221 contract uses `SuccessToken` as the fpl parameter, `strikePrice` is set to $15, and `basePercentage` is set to 0.5. If the expiration price is below the `strikePrice`, the investor only receives the collateral. If the expiration price is above the strike price, the call option pays investors an additional amount based on the value of the embedded call option.

## Deploying to Kovan

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to. The deployment script has been pre-filled with the parameters for the stUMA-1221 contract.

If using Infura for a Kovan deployment, `YOUR_NODE_URL` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 1 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA Success Token \$15 Strike December 2021" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA Success Token \$15 Strike December 2021" --longSynthSymbol stUMA-1221 --shortSynthName "UMA Success Short Token \$15 Strike December 2021" --shortSynthSymbol stUMA-1221s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl SuccessToken --strikePrice 15000000000000000000 --basePercentage 500000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
## Deploying to Ethereum Mainnet

The method to deploy onto mainnet is the exact same as with Kovan, except `url` will need to be amended for use on Ethereum mainnet.

If using Infura for mainnet, `YOUR_NODE_URL` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA Success Token \$15 Strike December 2021" --expirationTimestamp 1630447200 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA Success Token \$15 Strike December 2021" --longSynthSymbol stUMA-1221 --shortSynthName "UMA Success Short Token \$15 Strike December 2021" --shortSynthSymbol stUMA-1221s --collateralToken 0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828 --customAncillaryData "twapLength:3600" --optimisticOracleLivenessTime 3600 --fpl SuccessToken --strikePrice 15000000000000000000 --basePercentage 500000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 