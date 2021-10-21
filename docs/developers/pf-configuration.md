---
title: Price Feed Configuration
sidebar_label: Price Feed Configuration
---

Price feeds allow the creation of bots that can programmatically calculate prices off-chain and use this information to propose on optimistic price requests, dispute price proposals, monitor and liquidate sponsor positions or dispute liquidations. In the event of disputes being brought up to DVM for resolution price feeds can also assist UMA voters in their initial evaluation, though voters should always use human judgement to interpret obtained results.

Availability of price feed is an absolute must for liquidable contracts and they should also generally be used by any other contracts expecting quick settlement if price fetching is relatively straightforward. The only exceptions where implementing a price feed might not be practical are KPI options or tracking more complex index data requiring involved manual calculation.

## Selecting a Price Feed

Product developers should document their price feed implementation choice and configuration when writing UMIP for new price identifier or passing price feed configuration as ancillary data for a generic price identifier. [UMA protocol repo](https://github.com/UMAprotocol/protocol/tree/master/packages/financial-templates-lib/src/price-feed) contains number of price feed implementations and this documentation guides on selecting and configuring those that could be more generally applicable for most applications.

Most popular price feed implementations used by financial products build on UMA currently are [CryptoWatch](/developers/pf-configuration.md#cryptowatch) for fetching cryptocurrency pricing from centralized exchanges, [Uniswap](/developers/pf-configuration.md#uniswap) covering AMM pricing (includes Uniswap v2/v3 and SushiSwap) and [Expression](/developers/pf-configuration.md#expression)/[Medianizer](/developers/pf-configuration.md#medianizer) for combining/aggregating data from other price feeds.

If the tracked asset is traded on Balancer pools one might use [Balancer](/developers/pf-configuration.md#balancer) price feed. Also [Liquidity Provider](/developers/pf-configuration.md#liquidity-provider) price feed can be used to price any liquidity pool token where the pool contract holds the underlying asset. Some financial products might require foreign exchange rate data that could use [TraderMade](/developers/pf-configuration.md#tradermade) price feed. When multiple price feeds should be combined in a fallback mode one can also use the [FallBack](/developers/pf-configuration.md#fallback) price feed.

## Price Feed Configuration Syntax

Price feed configuration contains parameters stored as key-value pairs in a JavaScript object. All supported price identifiers are stored as `defaultConfigs` object in [DefaultPriceFeedConfigs.js](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/DefaultPriceFeedConfigs.ts) where each key should be named after the price identifier and its value should be the respective configuration object for such price identifier. In case price identifier name contains any other character than allowed ones (letters, numbers, underscores and dollar signs) or it starts with a number, its key should be enclosed in double quotes in the price feed configuration. As an example, please see below the configuration for ETH/BTC identifier where key is `"ETH/BTC"` and the configuration is enclosed in curly braces:

```
  "ETH/BTC": {
    type: "medianizer",
    pair: "ethbtc",
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro" },
      { type: "cryptowatch", exchange: "binance" },
      { type: "cryptowatch", exchange: "bitstamp" },
    ],
  }
```

Also note that when aggregating/combining multiple price feeds the nested objects inherit its parameters from its parent object, except for price feed `type` parameter and when the parameter is explicitly set in the child object. So in the example above both the `pair` and `minTimeBetweenUpdates` parameter values are applied to all three nested `cryptowatch` price feeds.

## Common Configuration Parameters

Most of price feed implementations share the following configuration parameters:

 * `type`: This mandatory parameter selects which price feed implementation should be used. Please see the required value in each of discussed price feed implementations in sections below.
* `lookback`: Number of seconds how far in the past the historical prices will be fetched. This is mostly application specific parameter and can be overridden by the user of the price feed. For most of use cases in the price feed configuration it could be set to 7200 seconds that corresponds to default liveness period in the deployed Optimistic Oracle contract. Still price feed configuration writers should test it on actual data and increase the `lookback` parameter in case the used data source has missing data for considerable time periods (e.g. due to low trading activity).
* `minTimeBetweenUpdates`: Minimum number of seconds between the application using the price feed can effectively update new price data. This should be generally aligned with data update frequency of particular data source since there is no need to generate unnecessary requests if the source would return the same data. For most of applications it is appropriate to set this parameter at 60 seconds as long as the data source supports this granularity.
* `priceFeedDecimals`: This parameter is only for supporting backwards compatibility with older contracts that needed the price being scaled at collateral decimals. For all new price identifiers there is no need to set it as all price feed implementations default this parameter to 18 decimals.

## Application Specific Parameters

If the application requires setting custom price feed parameters they can be configured by the user to override default price feed configuration. Most common use cases include setting custom `lookback` parameters or providing API keys for data sources. In order to set overriding parameters one has to provide them in `.env` file assigned to `PRICE_FEED_CONFIG` variable as JSON string. As an example, DVM voters might want to set `lookback` to 300000 seconds in order to ensure that prices can be looked up historically with [getHistoricalPrice.js](https://github.com/UMAprotocol/protocol/blob/master/packages/scripts/src/local/getHistoricalPrice.js) script during the maximum DVM resolvement period of 72 hours plus added reserve for any required TWAP start period before that:

```
PRICE_FEED_CONFIG={"lookback":300000}
```

## Price Feed Specific Parameters

### CryptoWatch

Select [CryptoWatch](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/CryptoWatchPriceFeed.ts) price feed by setting `type: "cryptowatch"` in the configuration to fetch cryptocurrency pricing data from CryptoWatch. Supported configuration parameters are listed below:

* Common `lookback`, `minTimeBetweenUpdates` and `priceFeedDecimals` parameters.
* `cryptowatchApiKey` (optional): This is an application specific parameter, where the user would provide its CryptoWatch account API key. Due to security considerations this parameter should be set in user's `PRICE_FEED_CONFIG` environment variable and not published in [DefaultPriceFeedConfigs.js](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/DefaultPriceFeedConfigs.ts) or passed in the price feed configuration as ancillary data.
* `exchange`: Identifier for the exchange to pull prices from. One can check supported exchange symbols [here](https://api.cryptowat.ch/exchanges).
* `pair`: Representation of the pair the price feed is tracking. This pair should be available on the provided exchange. One can check supported pairs for each exchange [here](https://api.cryptowat.ch/markets).
* `ohlcPeriod` (optional): Number of seconds interval between OHLC prices requested from CryptoWatch. If not provided it defaults to 60 seconds.
* `invertPrice` (optional): Boolean indicating if prices should be inverted before returned. If not provided it defaults to `false`.
* `twapLength` (optional): Duration in seconds of the time weighted average computation applied by the price feed. If not provided it defaults to 0 (spot price).
* `historicalTimestampBuffer` (optional): Number of seconds +/- beyond a price period's open and close window that determines whether a historical timestamp falls "within" that price period. If not provided it defaults to 0, but it might be required to set this parameter when due to limited trading activity fetching the price for the requested timestamp is failing.

### Uniswap

Select [Uniswap](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/UniswapPriceFeed.ts) price feed by setting `type: "uniswap"` in the configuration to fetch pricing data from Uniswap type AMM pools. Supported configuration parameters are listed below:

* Common `lookback` and `priceFeedDecimals` parameters.
* `version` (optional): `"v2"` indicates Uniswap v2 or SushiSwap pool, while `"v3"` should be used for Uniswap v3 pools. If not provided it defaults to `"v2"`.
* `uniswapAddress`: Address of the Uniswap/SushiSwap pool the price feed is monitoring.
* `twapLength`: Duration in seconds of the time weighted average computation applied by the price feed. Uniswap price feed works only with positive non-zero TWAP values.
* `invertPrice` (optional): Boolean indicating if the Uniswap pair should be computed as `reserve1 / reserve0` (when set to `false`) or `reserve0 / reserve1` (when set to `true`). If not provided it defaults to `false`.

### Balancer

Select [Balancer](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/BalancerPriceFeed.ts) price feed by setting `type: "balancer"` in the configuration to fetch pricing data from Balancer pools. Supported configuration parameters are listed below:

* Common `lookback` and `priceFeedDecimals` parameters.
* `balancerAddress`: Address of the Balancer pool the price feed is monitoring.
* `balancerTokenOut`: Base token address (it should be part of `balancerAddress` pool). This price feed will return the price of base token expressed in units of quote token.
* `balancerTokenIn`: Quote token address (it should be part of `balancerAddress` pool).
* `twapLength`: Duration in seconds of the time weighted average computation applied by the price feed. When set to 0 this would return spot price for the requested timestamp.
* `poolDecimals` (optional): Represents the number of decimals that Balancer pool prices are returned in. If not provided it defaults to 18 that is appropriate when both base and quote tokens have the same scaling decimals. If base token has more decimals than quote tokens then their difference should be deducted from 18 in the `poolDecimals`, while for base token having less decimals than quote token this difference should be added to 18. As an illustration, YD-ETH-SEPT (base) has 18 decimals and USDC (quote) has 6 decimals, so deducting their difference of 12 from 18 should leave `poolDecimals: 6`.

### Liquidity Provider

Select [Liquidity Provider](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/LPPriceFeed.ts) price feed by setting `type: "lp"` in the configuration to fetch pricing data of pool tokens expressed in underlying tokens. Note that in order to calculate full LP token value one has to combine price feeds from all pool reserve tokens. Supported configuration parameters are listed below:

* Common `minTimeBetweenUpdates` and `priceFeedDecimals` parameters.
* `poolAddress`: Address of the LP pool to monitor.
* `tokenAddress`: Address of the per-share token balance that should be tracked within the pool.

### TraderMade

Select [TraderMade](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/TraderMadePriceFeed.ts) price feed by setting `type: "tradermade"` in the configuration to fetch forex pricing data from TraderMade. Supported configuration parameters are listed below:

* Common `minTimeBetweenUpdates` and `priceFeedDecimals` parameters.
* `minuteLookback` (optional if `hourlyLookback` is provided): Number of seconds how far in the past the historical minute interval prices will be fetched. Maximum allowed value is 172800 seconds (2 days).
* `hourlyLookback` (optional): Number of seconds how far in the past the historical hourly prices will be fetched. Hourly historical prices can be used as a fallback to the minute time-series if no minute data is available (e.g. on weekends). Maximum allowed value is 5184000 seconds (2 months).
* `tradermadeApiKey`: This is an application specific parameter, where the user should provide its TraderMade account API key. Due to security considerations this parameter should be set in user's `PRICE_FEED_CONFIG` environment variable and not published in [DefaultPriceFeedConfigs.js](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/DefaultPriceFeedConfigs.ts) or passed in the price feed configuration as ancillary data.
* `pair`: Representation of the pair the price feed is tracking. One can check supported pairs [here](https://marketdata.tradermade.com/historical-currencies-list).
* `ohlcPeriod` (optional): Number of minutes interval between OHLC prices requested from TraderMade. Valid values for supported intervals are 1, 5, 10, 15 or 30. If not provided it defaults to 1 minute.

### Expression

Select [Expression](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/ExpressionPriceFeed.ts) price feed by setting `type: "expression"` in the configuration to combine the results of other price feeds in mathematical expression. Supported configuration parameters are listed below:

* Common `priceFeedDecimals` parameter.
* `expression`: Mathematical expression to use for combining results of multiple price feeds. Other price feed names can be referenced as variables and any special characters in price feed names must be escaped by double backslash (`\\`). Please consult [mathjs documentation](https://mathjs.org/docs/expressions/syntax.html) for supported expression syntax. Note that for multi-line expressions this price feed will only take the result of the last line as a price, hence, any lines computing intermediary variables should be ended with semi-column (`;`) in order to skip them from output.
* `customFeeds` (optional): Instead of referencing other named price feeds from default configuration one can also define other custom price feeds in the `customFeeds` parameter with the same syntax as `defaultConfigs` object in [DefaultPriceFeedConfigs.js](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/DefaultPriceFeedConfigs.ts). When referring to  custom price feeds in the `expression` with the same name as found in the default price feed configuration, the custom price feed will take precedence.

As an illustration, please see the default ETH/BTC funding rate configuration below:

```
  ETHBTC_FR: {
    type: "expression",
    expression: `
        ETHBTC_FV = ETH\\/BTC * PERP_FRM;
        round(max(-0.00001, min(0.00001, (ETHBTC_FV - ETHBTC_PERP) / ETHBTC_FV / 86400)), 9)
    `,
    lookback: 7200,
    minTimeBetweenUpdates: 60,
    twapLength: 3600,
    customFeeds: {
      ETHBTC_PERP: { type: "uniswap", invertPrice: true, uniswapAddress: "0x899a45ee5a03d8cc57447157a17ce4ea4745b199" },
      PERP_FRM: { type: "frm", perpetualAddress: "0x32f0405834c4b50be53199628c45603cea3a28aa" },
    },
  },
```

In the example above one can observe how multi-line `expression` syntax works with having `ETHBTC_FV` as intermediary variable. ETH/BTC is referenced as `ETH\\/BTC` in order to escape `/` in price identifier name. ETHBTC_PERP and PERP_FRM are custom price identifiers defined in the `customFeeds` parameter. Also note that all parameters that are not explicitly stated in the referenced price feeds will be inherited from the parent `expression` price feed parameters, so that TWAP period of 3600 seconds will be applied also to ETH/BTC, ETHBTC_PERP and PERP_FRM identifiers.

### Medianizer

Select [Medianizer](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/MedianizerPriceFeed.ts) price feed by setting `type: "medianizer"` in the configuration to calculate median/mean from included price feeds. Note that this price feed implementation was developed before the [Expression](/developers/pf-configuration.md#expression) price feed that can also effectively achieve the same result by using [median](https://mathjs.org/docs/reference/functions/median.html)/[mean](https://mathjs.org/docs/reference/functions/mean.html) functions from `mathjs`. Supported configuration parameters are listed below:

* `medianizedFeeds`: An array of price feed configuration objects to medianize. The list should include at least one price feed configuration element.
* `computeMean` (optional): If this boolean variable is set to `true` then the result will be calculated as arithmetic mean from provided price feeds. If not provided it defaults to `false` so that median value is calculated.

### FallBack

Select [FallBack](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/FallBackPriceFeed.ts) price feed by setting `type: "fallback"` in the configuration to combine multiple price feeds in a fallback mode. The only configuration parameter is `orderedFeeds` that should be set as an array of price feed configuration objects. Ordered price feeds will fall back from the begining of the array to the end so that the first working configuration will be used to calculate the requested price. The list should include at least one price feed configuration element.
