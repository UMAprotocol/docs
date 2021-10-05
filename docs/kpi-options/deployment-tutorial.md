---
title: KPI Options Deployment Tutorial
sidebar_label: Deployment Tutorial
---

The process to launch and manage KPI Options on UMA is surprisingly simple. This tutorial will demonstrate how to deploy a KPI Option using the Long Short Pair (LSP) contract and the UMA `launch-lsp` repository.

## Deployment process

The following is an overview of the deployment steps below.

1. Setup LSP Deployment Prerequisites
2. Set your parameters
3. Run the deployment on testnet (Kovan)
4. Run the deployment on mainnet (Ethereum)

## LSP Prerequisites

Please go [here](/developers/lsp-prereqs) for guidance on LSP prerequisites before deploying a contract.

## Setting your parameters

For our deployment tutorial, we are going to continue using the example KPI Option based on UMA's TVL (UMA-TVL-1221) as a reference when setting the LSP parameters and customizing the deployment script.

### Mandatory deployment parameters

Each deployment requires the following parameters to be set at the point of deployment: 

- `gasprice:` The gas price used for your contract deployment.
- `url:` your node URL.
- `mnemonic:` Your 12 word seed phrase or mnemonic. 
- `expirationTimestamp:` Unix timestamp when the KPI Options expire that should be aligned with your program objectives. The UMA treasury wants to incentivize a TVL over $500 million by the end of 2021. Therefore, the UMA-TVL-1221 contract uses 1640966400 which represents the Unix timestamp for December 31, 2021.
- `collateralPerPair:` The amount of collateral required to mint each long and short pair. The UMA-TVL-1221 contract uses 1 $UMA, meaning 1 $UMA mints 1 long and 1 short token. If 4 $UMA was used as collateral to mint, the minter would receive 4 long and 4 short tokens.
- `priceIdentifier:` Should be set to `General_KPI`.
- `collateralToken:` Approved collateral currency to be used. The UMA-TVL-1221 contract uses the [UMA token](https://etherscan.io/address/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828) as collateral.
- `pairName:` The desired name of the token pair. The UMA-TVL-1221 contract uses 'UMA TVL KPI Option December 2021'.
- `longSynthName:` The full-length name of the long token. The UMA-TVL-1221 contract uses 'UMA TVL KPI Option December 2021'.
- `longSynthSymbol:` The ticker name of the long token. The UMA-TVL-1221 contract uses 'UMA-TVL-1221'.
- `shortSynthName:` The full-length name of the short token. The UMA-TVL-1221 contract uses 'UMA TVL KPI Option Short Token December 2021'.
- `shortSynthSymbol:` The ticker name of the short token or ticker symbol. The UMA-TVL-1221 contract uses 'UMA-TVL-1221s'.

### Optional deployment parameters

- `prepaidProposerReward:` Proposal reward to be forwarded to the created contract to be used to incentivize price proposals.
- `optimisticOracleLivenessTime:` Time in seconds, the proposed expiration price can be disputed. This generally should be at least a couple of hours for KPI options but might require longer time for more complex KPI options target metric calculations.
- `optimisticOracleProposerBond:` Additional bond a proposer must post with the optimistic oracle. A higher bond makes incorrect disputes and proposals more costly.

### Ancillary Data Specifications

The `customAncillaryData` parameter is used for KPI Options to instruct voters on how to resolve a price request for the price identifier and request timestamp. For more details on using the KPI Options price identifier and ancillary data, please see the next section on [Using the Generalized KPI Options Price Identifier](/kpi-options/kpi-price-identifier.md).

Below is a description of ancillary data parameters along with the parameters used for the UMA-TVL-1221 contract:

- `Metric`: Short description reflecting the metric and units to be measured. The UMA-TVL-1221 contract uses 'TVL in UMA financial contracts measured in millions of USD'.
- `Endpoint`: Link to data endpoint that should return the `Metric` at request timestamp. The response format should comply with the linked document from the `Method` parameter. The data endpoint should either allow passing the timestamp as a parameter or returned data should include the timestamp value for each returned data point. The UMA-TVL-1221 contract uses [https://api.umaproject.org/uma-tvl](https://api.umaproject.org/uma-tvl) as a data endpoint. Please note, this endpoint is not actively updated and should not be used for active contracts.
- `Method`: Link to a descriptive source covering the objective and methodology for calculating a particular metric. This methodology should include how the calculation of the metric is measured. Links to repositories and explainer documentation are strongly recommended. Clearly articulate any post-processing required. If the UMA-TVL-1221 contract was being deployed as a live contract, an implementation document on calculating the TVL for UMA would need to be created. [Here](https://github.com/UMAprotocol/UMIPs/tree/master/Implementations) are implementation files that have been created that can be used as a reference.
- `Fallback` (optional): In the event of the end-point not working or reporting false outcomes, a fallback ensures that UMA token holders can arrive at the proper result. If the methodology source demonstrates a fallback alternative, this field can be optional. For the UMA-TVL-1221 contract, if we included a detailed implementation section in our `Method` parameter, the `Fallback` parameter would not need to be included.
- `Key`: Which key value from the `Endpoint` response should be used by voters for further processing of the price request. The UMA-TVL-1221 contract uses 'currentTvl' which can be referenced in the `Endpoint` response.
- `Interval`: This describes how request timestamps for pricing queries should be rounded and what is the granularity of historical data update frequency. The UMA-TVL-1221 contract uses 'Updated every 10 minutes' as this is the update frequency of the data endpoint.
- `Aggregation` (optional): In case any time series data processing is required, this describes the processing method used (e.g. calculating TWAP, finding peak value, etc.) and also sets the start timestamp for such aggregation. This parameter is not applicable to the UMA-TVL-1221 contract.
- `Rounding`: This is an integer number defining how many digits should be left to the right of the decimal delimiter after rounding. The UMA-TVL-1221 contract uses -6 as it rounds to the nearest million. Therefore, 456,987,654.32 USD would round to 457,000,000 USD.
- `Scaling` (optional): This is integer number defining power of 10 scaling to be applied after rounding. This is not to be confused with additional scaling performed by voting dApp, and it is just an optional transformation for scaling reported metric from the `Endpoint` instead (e.g. transforming USD to millions of USD). The UMA-TVL-1221 contract uses -6 as the `Metric` states TVL is measured in millions of USD. This would scale 457,000,000 USD to 457.0 million USD.
- `Unresolved` (optional): This is a numeric value that voters should return for unresolvable price requests (defaults to zero if omitted). Since the UMA-TVL-1221 contract is not specifying a value for this parameter, 0 would be used if a price request is unable to be resolved.

When deploying KPI options, arbitrary ancillary data fields can also be added as long as they are clearly documented in the linked `Method` document and voters are instructed on how to interpret them for price processing. When designing the ancillary data KPI options deployer, you should be aware that the total size of ancillary data cannot exceed 8192 bytes also accounting for any ancillary data stamping by Optimistic Oracle. This limit is checked by the LSP creator contract upon deployment.

Below is the ancillary data used for our UMA-TVL-1221 KPI Option. When converting ancillary data to UTF8 string it must contain price request parameters expressed as a list of key-value pairs delimited by `,` (commas) and each key-value pair further delimited by `:` (colons). If a value should contain `,` or `:` characters, such value should be enclosed in double quotes.

```
Metric:TVL in UMA financial contracts measured in millions of USD,
Endpoint:"https://api.umaproject.org/uma-tvl",
Method:"https://github.com/UMAprotocol/UMIPs/blob/master/Implementations/uma-tvl.md",
Key:currentTvl,
Interval:Updated every 10 minutes,
Rounding:-6,
Scaling:-6
```
Key-value pairs above are separated by newlines just for readability, but no newlines should be used in real application. When this ancillary data dictionary (without newlines) is stored as bytes, the result would be:
```
4d65747269633a54564c20696e20554d412066696e616e6369616c20636f6e747261637473206d6561737572656420696e206d696c6c696f6e73206f66205553442c456e64706f696e743a68747470733a2f2f6170692e756d6170726f6a6563742e6f72672f756d612d74766c2c4d6574686f643a68747470733a2f2f6769746875622e636f6d2f554d4170726f746f636f6c2f554d4950732f626c6f622f6d61737465722f496d706c656d656e746174696f6e732f756d612d74766c2e6d642c4b65793a63757272656e7454766c2c496e74657276616c3a55706461746564206576657279203130206d696e757465732c526f756e64696e673a2d362c5363616c696e673a2d36
```

### FPL deployment parameters

The `fpl` parameter determines the type of financial product library (FPL) used for the payout function based on a resolved target KPI metric. The most applicable FPLs for KPI options might be:
  * `BinaryOption` to select [Binary Options](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/BinaryOptionLongShortPairFinancialProductLibrary.sol) type that would either pay out nothing or maximum amount (set in `collateralPerPair`) to KPI options token holders depending on whether the target metric threshold is met.
  * `Linear` to select [Linear](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/LinearLongShortPairFinancialProductLibrary.sol) type that would pay out nothing when lower bound of target metric threshold is not met, a maximum amount (set in `collateralPerPair`) when upper bound of target metric threshold is met, and proportional payout when target metric is between its lower and upper bounds.

The UMA-TVL-1221 contract uses `Linear` as the FPL parameter which instructs voters on how to resolve a price request for the price identifier and request timestamp. An implementation file linked to the contract with the `Method` parameter should provide the methodology for calculating the TVL for UMA contracts. 

At or above $500 million TVL at expiry, each long token is worth 1 $UMA and below $500 million TVL at expiry each long token is worth 0.5 $UMA. The `Linear` FPL requires `lowerBound` and `upperBound` parameters to be set to determine the payout function. The `lowerBound` could be set to 0 and the `upperBound` could be set to 1 in order for the following payout logic to result at expiry (should be detailed in the implementation document):
- TVL < $500 million, 0.5 would be returned and each long token would be worth 0.5 $UMA. 
- TVL > $500 million, 1  would be returned and each long token would be worth 1 $UMA.
- If the price request is unable to be resolved, 0 would be returned as specified in the `Unresolved` parameter in the ancillary data.

## Deploying to Kovan

Before running this command, you should customize the parameters to your needs. YOUR_NODE_URL should be filled in with a url for the network that you wish to deploy to. The deployment script has been pre-filled with the parameters for the UMA-TVL-1221 contract.

If using Infura for a Kovan deployment, `YOUR_NODE_URL` will follow this format:

```bash
wss://kovan.infura.io/ws/v3/{projectId}
```

Run the deployment script with your specific parameters.
```bash
node index.js --gasprice 1 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA TVL KPI Option December 2021" --expirationTimestamp 1640966400 --collateralPerPair 1000000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA TVL KPI Option December 2021" --longSynthSymbol UMA-KPI-1221 --shortSynthName "UMA TVL KPI Option Short Token December 2021" --shortSynthSymbol UMA-KPI-1221s --collateralToken 0x489Bf230d4Ab5c2083556E394a28276C22c3B580 --customAncillaryData "Metric:TVL in UMA financial contracts measured in millions of USD,Endpoint:"https://api.umaproject.org/uma-tvl",Method:"https://github.com/UMAprotocol/UMIPs/blob/master/Implementations/uma-tvl.md",Key:currentTvl,Interval:Updated every 10 minutes,Rounding:-6,Scaling:-6" --optimisticOracleLivenessTime 3600 --fpl Linear --lowerBound 0 --upperBound 1000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```

## Deploying to Ethereum Mainnet

The method to deploy onto mainnet is the exact same as with Kovan, except `url` will need to be amended for use on Ethereum mainnet.

If using Infura for mainnet, `YOUR_NODE_URL` will follow this format:

```bash
wss://mainnet.infura.io/ws/v3/{projectId}
```

You can now run the deployment script. From within the `launch-lsp` directory, run:
```bash
node index.js --gasprice 80 --url YOUR_NODE_URL --mnemonic "your mnemonic (12 word seed phrase)" --pairName "UMA TVL KPI Option December 2021" --expirationTimestamp 1640966400 --collateralPerPair 1000000000000000000 --priceIdentifier UMAUSD --longSynthName "UMA TVL KPI Option December 2021" --longSynthSymbol UMA-KPI-1221 --shortSynthName "UMA TVL KPI Option Short Token December 2021" --shortSynthSymbol UMA-KPI-1221s --collateralToken 0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828 --customAncillaryData "Metric:TVL in UMA financial contracts measured in millions of USD,Endpoint:"https://api.umaproject.org/uma-tvl",Method:"https://github.com/UMAprotocol/UMIPs/blob/master/Implementations/uma-tvl.md",Key:currentTvl,Interval:Updated every 10 minutes,Rounding:-6,Scaling:-6" --optimisticOracleLivenessTime 3600 --fpl Linear --lowerBound 0 --upperBound 1000000000000000000 --prepaidProposerBond 20000000000000000000 --optimisticOracleProposerBond 40000000000000000000
```
Once deployed, the script will list the address of your newly deployed LSP. A successful output will look like this:

```bash
Simulating Deployment...
Simulation successful. Expected Address: 0x44978157afE92c926619EBB54599bbc483eBe871
``` 