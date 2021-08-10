---
title: Bot parameterization
sidebar_label: Bot Parameterization
---

The UMA `optimistic-oracle`, `liquidator`, `disputer`, and `monitor` bots are highly configurable enabling their operation to be fine tuned in different deployment environments. Additionally, the bots are designed to be runnable with very little configuration out of the box due to ample use of sensible defaults. This makes the bots simple to setup if you don't need all the settings that come with a more involved configuration.

Note that to propose and dispute prices with the Optimistic Oracle, you will only need to run the `optimistic-oracle` bot. The other bots are specific to liquidatable [ExpiringMultiParty (EMP)](https://docs.umaproject.org/developers/emp-deployment) contracts.

This doc outlines possible configuration options for bot deployment.

## Common configuration settings

All four bots (`optimistic-oracle`, `liquidator`, `disputer`, and `monitor`) share some configuration options, but the EMP bots have bot-specific options as well.

### Common config

- `EMP_ADDRESS`**[required]**: Address of the deployed ExpiringMultiParty contract on the given network you want to connect to. This config will determine the synthetic token that the bot will be concerned with.
- `MNEMONIC`**[required OR `PRIVATE_KEY`]**: Defines the wallet for the bots to use. Generate and seed with Ether & synthetics before running the bot.
- `PRIVATE_KEY`**[required OR `MNEMONIC`]**: Defines the wallet for the bots to use. Generate and seed with Ether & synthetics before running the bot.
- `COMMAND`**[required if using Docker]**: Initial entry point the bot uses when the bot's Docker container starts running.
- `INFURA_API_KEY` [optional]: Specify an Infura API key for the bot to use. By default this uses a shared key stored in the repo. If you experience issues with accessing Infura try adding your own key.
- `CUSTOM_NODE_URL` [optional]: Specify an Ethereum RPC node URL. This can run over `https` or `wss` depending on your preference.
- `POLLING_DELAY`[optional]: How long the bot should wait (in seconds) before running a polling cycle. If excluded the bot defaults to polling every 60 seconds.
- `PRICE_FEED_CONFIG`[optional]: Configuration object used to parameterize the bot's price feed. If excluded then the bot will try and infer the price feed based on the identifier name. Optionally, you can override this. This config, if provided, contains the following:
  - `type` specifies the configuration of the price feed. The `medianizer` provides the median of the price of the identifier over a set of different exchanges.
  - `apiKey` is the key generated in API key section of the Prerequisites.
  - `pair` defines the crypto pair whose price is being fetched as defined in CryptoWatch. Ex: `ethbtc`.
  - `lookback` defines a window size, in seconds, over which historical prices will be made available by the price feed. This parameter should be set to be at least as large as the liquidation liveness period of the EMP contract.
  - `minTimeBetweenUpdates` minimum number of seconds between updates. If update is called more frequently, no new price data will be fetched.
  - `medianizedFeeds` is an array of type `priceFeed` that defines the feeds overwhich the medianizer will take the median of. Each of these have their own components which are defined as:
    - `type` Each instance of the medianizer is also a type. This could be a `medianizer`, `uniswap` or `cryptowatch` depending on the configuration of the bot. The sample bot is using only `cryptowatch` price feeds to compute the median.
    - `exchange` a string identifier for the exchange to pull prices from. This should be the identifier used to identify the exchange in CryptoWatch's REST API.
- `ENVIRONMENT`[optional]: Set to `production` to pipe logs to GCP stackdriver.
- `SLACK_WEBHOOK`[optional]: Can be included to send messages to a slack channel.
- `PAGERDUTY_API_KEY`[optional]: If you want to configure your bot to send pager duty messages(sms, phone calls, or emails) when they crash or have `error` level logs you'll need an API key here.
- `PAGERDUTY_SERVICE_ID`[optional]: Each Pagerduty service has an unique id. This goes here.
- `PAGERDUTY_FROM_EMAIL`[optional] Each Pagerduty service also requires a `from email` to uniquely identify the logger.
- `INFURA_API_KEY`[optional]: Override the default Infura key used by the bot.

## Optimistic Oracle bot

The `optimistic-oracle` bot proposes and disputes prices with the Optimistic Oracle based on off-chain information about the value of the price identifier. By default, the bot will only dispute prices that are off (according to its calculations) by more than 5%.

## Minimum viable optimistic-oracle config:

You can run an `optimistic-oracle` bot by providing a mnemonic with an associated private key that the bot should use and a `COMMON_PRICE_FEED_CONFIG`. No financial product contract addresses are required, since the bot will watch for all active price requests in the Optimistic Oracle.

Price feeds will only be constructed as needed

```bash
MNEMONIC=sail chuckle school attitude symptom tenant fragile patch ring immense main rapid
COMMON_PRICE_FEED_CONFIG='"commonPriceFeedConfig": {"cryptowatchApiKey": "abcd","tradermadeApiKey": "efg","quandlApiKey": "hijklmnop"}'
# Be sure to replace with your mnemonic.
COMMAND=yarn optimistic-oracle --network kovan_mnemonic
```

## Liquidator bot

The liquidator bot monitors all open positions within a given ExpiringMultiParty contract and liquidates positions if their collateralization ratio, as inferred from off-chain information about the value of the price identifier, drops below a given threshold.

### Minimum viable liquidator config:

You can run a liquidator bot by simply providing the EMP address of the contract you want to monitor and a mnemonic with an associated private key that the bot should use. Minimal Docker `.env` is as follows:

```bash
# yUSD-SEP20 contract on Kovan
EMP_ADDRESS=0x834adA34847ff7b9442cF269E0DE3091DC7BB895
MNEMONIC=sail chuckle school attitude symptom tenant fragile patch ring immense main rapid
# Be sure to replace with your mnemonic.
COMMAND=yarn liquidator --network kovan_mnemonic
```

Note that this minimum config will use the free tier crypto watch price feed. Without an account this will run out of credits very quickly. We recommend creating an account and paramaterizing the price feed to use this feed by adding `PRICE_FEED_CONFIG={"apiKey":"YOUR-CRYPTO-WATCH-API-KEY-HERE"}` to your config file.

### Possible liquidator config options

- `LIQUIDATOR_CONFIG` [optional]: enables the override of specific bot settings. Contains the following sub-settings:
  - `crThreshold`: Liquidate if a position's collateral falls more than this % below the min CR requirement.
  - `liquidationDeadline`: Aborts if the transaction is mined this amount of time after the last update (in seconds).
  - `liquidationMinPrice`: Aborts if the amount of collateral in the position per token is below this ratio.
  - `txnGasLimit` Gas limit to set for sending on-chain transactions.
  - `logOverrides`: override specific events log levels. Define each logic action and the associated override level. For example to override liquidation log from `info` to `warn` use:`{"positionLiquidated":"warn"}}`
- `LIQUIDATOR_OVERRIDE_PRICE`[optional]: override the liquidator input price. Can be used if there is an error in the bots price feed to force liquidations at a given price.

## Disputer bots

The disputer bot monitors all liquidations occurring within a given ExpiringMultiParty contract and initiates disputes against liquidations it deems invalid, as inferred from off-chain information about the value of the price identifier.
A liquidation is invalid if a position was correctly collateralized at the time of liquidation.

### Minimum viable disputer config:

You can run a disputer bot by simply providing the EMP address of the contract you want to monitor and a mnemonic with an associated private key that the bot should use. Minimal Docker `.env` is as follows:

```bash
# yUSD-SEP30 contract on Kovan
EMP_ADDRESS=0xFb70A4CBD537B36e647553C279a93E969b041DF0
MNEMONIC=sail chuckle school attitude symptom tenant fragile patch ring immense main rapid
# Be sure to replace with your mnemonic.
COMMAND=yarn disputer --network kovan_mnemonic
```

### Possible disputer config options

- `DISPUTER_CONFIG` [optional]: enables the override of specific bot settings. Contains the following sub-settings:
  - `disputeDelay`: Amount of time (in seconds) to wait after the request timestamp of the liquidation to be disputed. This makes the reading of the historical price more reliable.
  - `txnGasLimit`: Gas limit to set for sending on-chain transactions.
- `DISPUTER_OVERRIDE_PRICE`[optional]: override the disputer input price. Can be used if there is an error in the bots price feed to force disputes at a given price.

## Monitor bots

The monitor bots are used to monitor the UMA ecosystem for key events. They have a number of monitor modules built into them that enable real time reporting on key events for a given EMP contract. The monitor can report on the following:

- **Balance Monitor**: specify a list of addresses to monitor. Send alerts if their collateral synthetic or ether balance drops below defined thresholds.
- **Contract Monitor**: send alerts when liquidation, dispute, and dispute settlement events occur.
- **Collateralization ratio monitor**: monitor a given position's CR and send alerts if it drops below a given threshold.
- **Synthetic peg monitor**: monitor an EMP's synthetic and reports when the synthetic is trading off peg and there is high volatility in the synthetic price or there is high volatility in the reference price.

### Minimum viable monitor config:

The config below will start up a monitor bot that will: (1) send messages when new liquidations, alerts, or disputes occur and (2) fire if there is large volatility in the synthetic or price of the underlying. It wont report on any wallet or CR monitoring as no params have been defined.

```bash
# yUSD-SEP30 contract on Kovan
EMP_ADDRESS=0xFb70A4CBD537B36e647553C279a93E969b041DF0
# Be sure to replace with your mnemonic.
COMMAND=yarn monitors --network kovan_mnemonic
```

### Possible monitor config options

- `STARTING_BLOCK_NUMBER`[optional]: block number to search for events from. If set, acts to offset the search to ignore events in the past. If not set then default to null which indicates that the bot should start at the current block number.
- `ENDING_BLOCK_NUMBER`[optional]: block number to search for events to. If set, acts to limit from where the monitor bot will search for events up until. If not set the default to null which indicates that the bot should search up to 'latest'.
- `MEDIANIZER_PRICE_FEED_CONFIG`[optional]: enable override of the meadinizer price feed configuration. If excluded will infer from the given synthetic identifier. If provided follows the structure outlined in the common settings for the `PRICE_FEED_CONFIG`.
- `UNISWAP_PRICE_FEED_CONFIG`[optional] enable override of the uniswap price feed configuration used to monitor synthetic price difference and volatility.
- `MONITOR_CONFIG` [optional]: config contains all configuration settings for all monitor modules. This includes the following:
  - `botsToMonitor`: array of bot objects to monitor. Each bot's `botName` `address`, `CollateralThreshold` and`syntheticThreshold` must be given. Example:
    `[{ "name": "Liquidator Bot", "address": "0x12345", "collateralThreshold": x1, "syntheticThreshold": x2, "etherThreshold": x3 },..]`
  - `walletsToMonitor`: array of wallets to Monitor. Each wallet's `walletName`, `address`, `crAlert` must be given. Example: `[{ name: "Market Making bot", address: "0x12345", crAlert: 1.50 },...]`
  - `contractMonitorConfigObject` object containing two arrays of monitored liquidator and disputer bots to inform log messages in the Contract monitor. Example: `{"monitoredLiquidators": ["0x1234","0x5678"],"monitoredDisputers": ["0x1234","0x5678"] }`
  - `deviationAlertThreshold`: if deviation in token price exceeds this fire alert.
  - `volatilityWindow`: length of time (in seconds) to snapshot volatility.
  - `pegVolatilityAlertThreshold`: threshold for synthetic peg (identifier) price volatility over `volatilityWindow`.
  - `syntheticVolatilityAlertThreshold`: threshold for synthetic token on uniswap price volatility over `volatilityWindow`.
