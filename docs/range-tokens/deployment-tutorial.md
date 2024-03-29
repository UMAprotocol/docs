---
title: Range Tokens Deployment Tutorial
sidebar_label: Deployment Tutorial
---

The process to launch and manage a range token on UMA is surprisingly simple. This tutorial will show you how to deploy a range token using the Long Short Pair (LSP) contract and the UMA `launch-lsp` repository.

## Deployment process

The following is an overview of the deployment steps below.

1. Set up LSP deployment prerequisites
2. Decide on your contract design
3. Run the deployment on testnet (Kovan)
4. Run the deployment on mainnet (Ethereum)

## LSP Prerequisites

Please go [here](/developers/lsp-prereqs) for guidance on LSP prerequisites before deploying a contract.

## Setting your parameters

For this deployment tutorial, we are going to continue using the [UMA Range Token contract](https://umaverse.vercel.app/0x372802d8A2D69bB43872a1AABe2bd403a0FafA1F) (rtUMA-0821) as a reference when setting the LSP parameters and customizing the deployment script.

### Mandatory deployment parameters

Each LSP contract requires the following parameters to be set at the point of deployment:

- `gasprice:` The gas price used for your contract deployment.
- `url:` your node URL.
- `mnemonic:` Your 12 word seed phrase.
- `expirationTimestamp:` Timestamp at which your contract will expire. The rtUMA-0821 token used 1630447200 which represents the Unix timestamp for August 31, 2021.
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. The rtUMA-0821 token used 0.25 UMA, meaning 0.25 UMA minted 1 long and 1 short token. If 1 $UMA was used as collateral to mint, the minter would receive 4 long and 4 short tokens.
- `priceIdentifier:` The approved price identifier to be used. The rtUMA-0821 contract used UMAUSD.
- `collateralToken:` Approved collateral currency to be used. The rtUMA-0821 contract used the [UMA token](https://etherscan.io/address/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828) as collateral.
- `pairName:` The desired name of the token pair. The rtUMA-0821 contract used 'UMA $4-12 Range Token August 2021'.
- `longSynthName:` The full-length name of the long token. The rtUMA-0821 contract used 'UMA $4-12 Range Token August 2021'.
- `longSynthSymbol:` The ticker name of the long token. The rtUMA-0821 contract used 'rtUMA-0821'.
- `shortSynthName:` The full-length name of the short token. The rtUMA-0821 contract used 'UMA $4-12 Range Short Token August 2021'.
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol. The rtUMA-0821 contract used 'rtUMA-0821s'.

### Optional deployment parameters

- `enableEarlyExpiration:` If set to true, the LSP contract can request to be settled early by calling the optimistic oracle. If not needed, the parameter will be set to false.
- `customAncillaryData:` Custom ancillary data to be passed along with the price request. If not needed, this flag can be excluded and will be left as a 0-length bytes array. The rtUMA-0821 contract used 'twapLength:3600'.
- `proposerReward:` Proposal reward to be forwarded to the created contract to be used to incentivize price proposals.
- `optimisticOracleLivenessTime:` Custom liveness window for disputing optimistic oracle price proposals in seconds. A longer liveness time provides more security, while a shorter one provides faster settlement. By default, this is set to 7200 seconds.
- `optimisticOracleProposerBond:` Additional bond a proposer must post with the optimistic oracle. A higher bond makes incorrect disputes and proposals more costly.

### FPL deployment parameters

The `fpl` parameter is used in the deployment script to designate `RangeBond` as the financial library used to calculate the payout at expiry. `RangeBond` requires `lowerBound` and `upperBound` parameters to be added to the deployment script.

A price at expiry inside the `lowerBound` and `upperBound` parameters gives a payout equivalent to a yield dollar. Above the `upperBound`, holders of the long token are entitled to a fixed, minimum number of collateral and below the `lowerBound` each range token is worth the number of collateral that is set using `collateralPerPair`.

The payout structure of a range token using the `upperBound` of $12 and `lowerBound` of $4 used by the rtUMA-0821 token is:
- If the $UMA price is above $12, the investor has long exposure to a $12 call option.
- If the $UMA price is below $4, the investor has exposure to a $4 put option.
- If the $UMA price is between $4 and $12, the payout is equivalent to a yield dollar and shifts to keep the payout in dollar terms equal to the bond notional.

## Deploying to Kovan

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to. The deployment script has been pre-filled with the parameters for the rtUMA-0821 token with `RangeBond` as the fpl parameter, the `lowerBound` set to $4, and the `upperBound` set to $12. 

Please note: the example deployment scripts below use '1661979600' as the `expirationTimestamp` and the naming has been adjusted to use 2022 since a past timestamp is unable to be used with the launch-lsp repo to deploy a new contract.

If using Infura for a Kovan deployment, `YOUR_NODE_URL` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 5 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA \$4-12 Range Token Pair August 2022" --expirationTimestamp 1661979600 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA \$4-12 Range Token August 2022" --longSynthSymbol rtUMA-0822 --shortSynthName "UMA \$4-12 Range Short Token August 2022" --shortSynthSymbol rtUMA-0822s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --fpl RangeBond --lowerBound 4000000000000000000 --upperBound 12000000000000000000 --proposerReward 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
## Deploying to Ethereum Mainnet

The method to deploy onto mainnet is the exact same as with Kovan, except `url` will need to be amended for use on Ethereum mainnet.

If using Infura for mainnet, `YOUR_NODE_URL` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA \$4-12 Range Token Pair August 2022" --expirationTimestamp 1661979600 --collateralPerPair 250000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA \$4-12 Range Token August 2022" --longSynthSymbol rtUMA-0822 --shortSynthName "UMA \$4-12 Range Short Token August 2022" --shortSynthSymbol rtUMA-0822s --collateralToken 0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828 --fpl RangeBond --lowerBound 4000000000000000000 --upperBound 12000000000000000000 --proposerReward 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
```
