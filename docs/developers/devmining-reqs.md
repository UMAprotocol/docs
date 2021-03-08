---
title: Program Onboarding Requirements
sidebar_label: Program Onboarding Requirements
---

Before receiving rewards, a new developer mining participant must meet certain criteria. Meeting this criteria is intended to allow the program to allocate developer mining rewards correctly. This process is separate from initial whitelisting, and should be considered when a developer is ready to launch their contract. 

This is the high-level developer mining onboarding process that you will need to follow.

- If you have not done so already, apply to the developer mining [whitelist](https://docs.google.com/forms/d/e/1FAIpQLSdPWOm4pNyqgDhXXr8wblWuSXXGslsGiJaFzrSNjN2RcG2RTQ/viewform).
- Deploy liquidation and dispute bots
- Ensure the availability of your synthetic token's price
- Send deployment information to the UMA core team

### Deploy liquidation and dispute bots

After deploying your contract, you will need to deploy liquidation and dispute bots to ensure the security of that contract. Instructions for bot deployment are [here](/developers/bots).

Currently supported price feeds for bots include:
- [CryptoWatch](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/CryptoWatchPriceFeed.js)
- [Uniswap Pool Price](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/UniswapPriceFeed.js)
- [Balancer Pool Price](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/BalancerPriceFeed.js)

If your contract's price identifier is not supported by the existing price feeds above, you will need to write a custom price feed that works within UMA's bot infrastructure. After writing this price feed, please follow the UMA [contribution guidelines](https://github.com/UMAprotocol/protocol/blob/master/CONTRIBUTING.md) to submit a pull request [here](https://github.com/UMAprotocol/protocol/tree/master/packages/financial-templates-lib/src/price-feed).

### Ensure the availability of your synthetic token's price

To calculate the correct number of rewards, it must be possible to determine the value of each synthetic token in a common base currency. Each synthetic token's value is converted to USD to determine the total value minted (TVM) by each contract. These TVMs are then used to determine how rewards should be allocated.

To perform this process, each synthetic token must have an available price feed in USD. Before receiving rewards, you must ensure that one of the following is available.
- Your synthetic token value in USD on CoinGecko. [Here](https://www.coingecko.com/en/coins/uusdrbtc-synthetic-token-expiring-1-october-2020) is an example for uUSDrBTC.
- Your synthetic token's price identifier and collateral currency on [CryptoWatch](https://cryptowat.ch/). Here is an example for the [ETH/BTC](https://cryptowat.ch/charts/FTX:ETH-BTC) price identifier and for the [BTC/USD](https://cryptowat.ch/charts/BITFINEX:BTC-USD) collateral price. This method is usually available when your price identifier is composed of a widely used cryptopair.

### Send deployment information to the UMA core team

The final step required to be added to developer mining rewards is to alert a member of the UMA core team of your successful deployment. To do this, fill out the google form [here](https://docs.google.com/forms/d/e/1FAIpQLSfhrCopRz7nUSbBQZB75j8yGqnXbOzRW68Oe6-uFuNVSvqrOQ/viewform).

This form will ask for a variety of information including:
- Your deployed contract's address
- The wallet address that you would like developer mining rewards sent to
- Various contract parameters

You are also able to go back and edit your entry at any time. As an example, you are able to change the address that you will receive your developer mining rewards or the estimated contract launch date at any time. It is your responsibility to keep the form up to date to ensure correct payouts and bot support from the core team. 

Please note that to be eligible for developer mining rewards, your contract parameters must meet certain requirements. These include:

- Your `collateralRequirement` must be above 1.2.
- Your price identifier must have a working price feed that has been added to the UMA [price feed directory](https://github.com/UMAprotocol/protocol/tree/master/packages/financial-templates-lib/src/price-feed).
- Your price feed must have a method called `getHistoricalPricePeriods` to calculate historical prices for more than one week of time (example [here](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/CryptoWatchPriceFeed.js#L136)), or your synthetic token must be listed on [CoinGecko](https://www.coingecko.com/en/coins/uusdrbtc-synthetic-token-expiring-1-october-2020).
- Your `minSponsorTokens` must equate to between ~$100 and ~$2,500 in synth value at the time of contract launch.

A few additional parameters should generally be left as the default suggestion. If your contract's parameters do not use the defaults provided below, you may be asked for some additional clarification.
- `disputeBondPct`: 0.1 (10%)
- `sponsorDisputeRewardPct`: 0.05 (5%)
- `disputerDisputeRewardPct`: 0.2 (20%)
- `liquidationLiveness`: 7200
- `withdrawalLiveness`: 7200

Additionally, to be eligible for developer mining, you must deploy with the most recent contract factories available at the time of deployment. You will not be eligible if you deploy with a deprecated factory. Here are the most up to date mainnet [contracts](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/1.json).
