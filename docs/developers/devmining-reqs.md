---
title: Program Onboarding Requirements
sidebar_label: Program Onboarding Requirements
---

Before receiving rewards, a new developer mining participant must meet certain criteria. Meeting this criteria is intended to allow the program to allocate developer mining rewards correctly. This process is separate from initial whitelisting, and should be considered when a developer is ready to launch their contract. 

This is the high-level developer mining onboarding process that you will need to follow.

- If you have not done so already, apply to the developer mining [whitelist](https://docs.google.com/forms/d/e/1FAIpQLSdPWOm4pNyqgDhXXr8wblWuSXXGslsGiJaFzrSNjN2RcG2RTQ/viewform).
- Deploy liquidation and dispute bots.
- Ensure the availability of your synthetic token's price.
- Send deployment information to the UMA core team.

### Deploy liquidation and dispute bots

After deploying your contract, you will need to deploy liquidation and dispute bots to ensure the security of that contract. Instructions for bot deployment are [here](/developers/bots).

Currently supported price feeds for bots include:
- [CryptoWatch](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/CryptoWatchPriceFeed.js)
- [Uniswap Pool Price](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/UniswapPriceFeed.js)
- [Balancer Pool Price](https://github.com/UMAprotocol/protocol/blob/master/packages/financial-templates-lib/src/price-feed/BalancerPriceFeed.js)

If your contract's price identifier is not supported by the existing price feeds above, you will need to write a custom price feed that works within UMA's bot infrastructure.

### Ensure the availability of your synthetic token's price

To calculate the correct number of rewards, it must be possible to determine the value of each synthetic token in a common base currency. Each synthetic token's value is converted to USD to determine the total value minted (TVM) by each contract. These TVMs are then used to determine how rewards should be allocated.

To perform this process, each synthetic token must have an available price feed in USD. Before receiving rewards, you must ensure that one of the following is available.
- Your synthetic token value in USD on CoinGecko.[Here](https://www.coingecko.com/en/coins/uusdrbtc-synthetic-token-expiring-1-october-2020) is an example for uUSDrBTC.
- Your synthetic token's price identifier and collateral currency on [CryptoWatch](https://cryptowat.ch/). Here is an example for the [ETH/BTC](https://cryptowat.ch/charts/FTX:ETH-BTC) price identifier and for the [BTC/USD](https://cryptowat.ch/charts/BITFINEX:BTC-USD) collateral price. This method is usually available when your price identifier is composed of a widely used cryptopair.

### Send deployment information to the UMA core team

The final step required to be added to developer mining rewards is to alert a member of the UMA core team of your successful deployment. After deploying your contract and deploying your liquidation and dispute bots, you will need to provide the following information to start receiving rewards.

- Your deployed contract's address.
- A [CoinGecko](https://www.coingecko.com/en) price feed for your synthetic token in USD OR a [Cryptowatch](https://cryptowat.ch/) price feed for your price identifier as well as a [Cryptowatch](https://cryptowat.ch/) price feed for your collateral currency type in USD.
- The wallet address that you would like to receive developer mining rewards at.