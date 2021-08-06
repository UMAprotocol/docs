---
title: Launching Generalized KPI Options
sidebar_label: Launching Generalized KPI Options
---
With the introduction of the General_KPI price identifier specified in [UMIP-117](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-117.md), project teams no longer need to go through the UMIP governance process for their specific KPI options price identifier. However, project tokens should still be approved as a supported collateral type. While this reduces some friction in the launch process, project teams should still carefully design and document their KPI options program to launch it using the General_KPI price identifier.

This document accompanies the General_KPI identifier and will outline the requirements needed to use the identifier and best practices. A few illustrative examples are provided, indicating various common ways this identifier can be used.

The primary purpose of the generalized KPI option identifier is to allow flexibility in reporting KPI metrics to UMA tokens holders. Many projects have specific KPI metrics, which can either be on-chain or off-chain. In both cases, the generalized KPI identifier can price KPI options as long as sufficient information is provided to resolve a price correctly. The data sources and methodology for determining the price request should be passed through ancillary data supported by [LSP](/synthetic-tokens/long-short-pair.md) contracts.

## Main Launch Parameters

When launching contracts with the [LSP launch package](https://github.com/UMAprotocol/launch-lsp) main parameters to consider for generalized KPI options are listed below:

* `expirationTimestamp`: UNIX timestamp when the KPI options should expire that should be aligned with your program objectives.
* `collateralPerPair`: This sets the maximum amount of collateral tokens that could be paid out per one KPI options token. The amount should be scaled up by 10^18 when passed as a parameter to the [LSP launch script](https://github.com/UMAprotocol/launch-lsp/blob/master/index.js).
* `priceIdentifier`: Should be set to `General_KPI`.
* `customAncillaryData`: This should include the KPI options target metric, data sources and calculation methods as detailed in the [Ancillary Data](/uma-tokenholders/general-kpi.md#ancillary-data-parameters) section.
* `optimisticOracleLivenessTime`: Time in seconds, the proposed expiration price can be disputed. This generally should be at least a couple of hours for KPI options but might require longer time for more complex KPI options target metric calculations.
* `fpl`: Choose the type of financial product library (FPL) that will determine the payout function based on resolved target KPI metric. Most applicable FPLs for KPI options might be:
  * `BinaryOption` to select [Binary Options](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/BinaryOptionLongShortPairFinancialProductLibrary.sol) type that would either pay out nothing or maximum amount (set in `collateralPerPair`) to KPI options token holders depending on whether the target metric threshold is met.
  * `Linear` to select [Linear](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/common/financial-product-libraries/long-short-pair-libraries/LinearLongShortPairFinancialProductLibrary.sol) type that would pay out nothing when lower bound of target metric threshold is not met, a maximum amount (set in `collateralPerPair`) when upper bound of target metric threshold is met, and proportional payout when target metric is between its lower and upper bounds.

## Ancillary Data Parameters

Below are the parameters that are required when using the generalized KPI options. A short description of the parameters and a few examples illustrate the flexibility in using the generalized KPI option identifier. Please consult [UMIP-117](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-117.md) for ancillary data formatting syntax.

### Metric

A short description and units of the KPI or metric you wish to incentivize. The metric is what is considered the actual number when setting your KPI options. This description should be short and to the point.

#### Metric Examples

* `Protocol TVL in USD.`
* `Liquidity Pool Value in USD.`
* `The number of integrations a team can deliver.`

### Endpoint

An end-point can be considered the location of where the KPI option metric is displayed. The endpoint is a catch-all description of where individuals can find the source of truth for your specific metric. It is important to note that this endpoint should be publicly available for anyone to reference.

A specific requirement for the endpoint is that it should quickly tell the historical values at a given point in time. It is essential for when the KPI options expire, the settlement of what the metric was at the specific expiry time will be needed to ensure the price resolution is correct.

#### Endpoint Examples

An API endpoint or a page on a website that reports the target metric. DefiLlama or DeFi Pulse are examples of this, but this can be housed on your project site:

* `"https://project/measures/metric"`
* `"https://api.llama.fi/protocol/project-slug"`
* `"https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?project=project-slug"`

### Method

The method document is essential for contextual awareness of the KPI options purpose, its target metric and some of the calculation mechanics. Projects should put up some documentation around this for two reasons. The first is that it is best practice to communicate the incentive program with stakeholders and ensure clarity on how to arrive at a price. The methodology should be as explicit as possible.

The methodology should also encompass any post-processing on the raw metric. Post-processing can include TWAP’s, averaging, or any additional calculation that needs to be applied to the metric to arrive at a price. If the data processing is involved, it is also advisable to ensure that the endpoint displays this as supporting information.

To support independent verification of target metric value, the method document should also include a link to the source code repository for the backend providing measured values to the endpoint API. The methodology document and the linked source code repository should be on a platform providing the entire versioning history to detect any modifications.

#### Method Examples

Method parameter should include the link to the hosted method document:
* `"https://github.com/Project/KPI/blob/master/README.md"`.

Within the linked method document, one could also point to DefiLlama project adapter if that is applicable for the given target metric:
* API endpoint calculation source code: `https://github.com/DefiLlama/DefiLlama-Adapters/blob/main/projects/project-slug/index.js`

On your website, add a specific section related to your program details so that your option holders are fully aware of the program.

### Fallback

An optional fallback method if a price cannot be determined by the contract expiry or if the given source of truth has been tampered with. The fallback is optional to the team wanting to use this information.

#### Fallback Examples

* `"If Subgraph query is down, fall back to DeFi Lama measure."`
* `"If Dune Analytics is reporting false figures, fall back to custom logic created by the team."`

### Key

To guide voters on which value from the endpoint to take for resolving the metric, this parameter should define the key parameter from the endpoint response.

#### Key Examples

* `totalLiquidityUSD` from DefiLlama endpoint.
* `tvlUSD` from DeFi Pulse endpoint.

### Interval

Indicate the period granularity for resolving your target metric. Not all metrics have the same required accuracy, but make sure that it is not more frequent than the granularity provided by your data endpoint.

#### Interval Examples

* `Resolve to last available block from request.`
* `Resolve to exact request timestamp in full seconds.`
* `Resolve to the last available daily data updated at midnight UTC.`
* `Resolve to the end of last month from request.`

### Aggregation

If time-series data processing is required, this optional parameter shortly describes the method and sets the start timestamp or period for such aggregation.

#### Aggregation Examples

* `1-hour TWAP before the request timestamp.`
* `Peak value of hourly TVL from 1627776000 till request timestamp.`
* `Positive increase in user count compared to 1 month before the request timestamp (set to 0 if user count has decreased).`

### Rounding

Rounding eases reaching consensus on target metrics as it tolerates a certain level of error that individual voters might have. When selecting this parameter, the KPI options launcher should weigh the requirement of payout accuracy against the risk that voters would not resolve the target metric due to differing interpretations of the provided method.

Suppose the raw metric post aggregation (if applicable) should be rounded to an integer, then provide 0 for this parameter value in the ancillary data. If putting it to a positive number, voters will round the metric, leaving the provided number of digits to the right of the decimal delimiter. The generalized KPI options launcher can also ensure rounding to complete thousands, millions, etc., by providing negative rounding parameters.

By default, the target metric is rounded up if the next digit after rounding equals more significant than 5. Otherwise, it would be rounded down. If the KPI options launcher requires any other rounding method (e.g., rounding down to the closest integer), this should be clearly articulated in the linked method document.

#### Rounding Examples

* `0` would round raw TVL of 123,456.789 USD to 123,457 USD.
* `2` would round raw project market share of 67.97556547% to 67.98%.
* `-6` would round raw daily trading volume of 987,654.321 USD to total millions (as 10^6 represents 1 million): 1,000,000 USD.

### Scaling

Scaling is an optional parameter since scaling options strike price or upper/lower bounds in the financial product library can achieve the same effect. Still, if project teams want to use it for some reason, it is possible to set it as an integer number defining the power of 10 scalings to be applied after rounding. When using the scaling parameter, one also has to consider the same scaling when setting FPL parameters.

#### Scaling Examples

* `-6` would scale down rounded TVL of 777,780,000 USD to 777.78 million USD.
* `2` would scale up project domination share originally expressed as decimal 0.5678 to 56.78 percent.


### Unresolved

An essential factor of using the generalized KPI options identifier is to note that the responsibility of reporting the metric clearly and understandably falls on the team using the identifier.

Suppose the UMA tokens holders cannot arrive at a result for the KPI options. In that case, the default General_KPI price identifier instructs them to return 0 as a metric value unless an unresolved parameter was passed. Some use cases would result in KPI options expiring in a worthless state that could be the desired outcome. If the project team still wants to ensure non-zero payout or FPL has non-standard calculation logic, one might need to set this optional unresolved parameter.

Note that this unresolved parameter should represent the target metric value. If applied, one should always model if the FPL would result in an expected payout to KPI option holders in this scenario.

#### Unresolved examples

* Setting unresolved to `110` representing scaled millions of USD TVL when FPL had `lowerBound` of 100 and `upperBound` of 200 would result in KPI options holders receiving (110 - 100) / (200 - 100) = 10% of maximum payout in the unresolved state.
* If the target metric represents the USD value of lending protocol liquidations that should be minimized, then the project team might want to distribute the short side of LSP synthetic tokens to its KPI options program recipients. If setting unresolved to `47500000` when FPL had `lowerBound` of 0 and `upperBound` of 50,000,000, then short KPI options holders would receive 1 - 47,500,000 / 50,000,000 = 5% of maximum payout in the unresolved state.
