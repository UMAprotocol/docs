---
title: Running Optimistic Oracle and EMP Bots
sidebar_label: Running Bots
---

## Quick Start: Optimistic Oracle Bot

This section is intended for those who are familiar with Docker and just want to get up and running. The `optimistic-oracle` bot will propose and dispute prices with the Optimistic Oracle and is the most versatile and important bot in UMA's ecosystem. Advanced tutorials for [ExpiringMultiParty](/developers/emp-deployment) bots (`liquidator`, `disputer`, and `monitors`) are included further down in the article, but these bots are not necessary for most use cases.

First, create a file to set the appropriate configuration for your `optimistic-oracle` bot. Please edit the following example with your own values.

```shell title="example.env"
PRIVATE_KEY=0xf7cbade2b9eec8fc83aa70e4b43f480d0ca78b7060737ead2669d095f2035322
COMMON_PRICE_FEED_CONFIG='"commonPriceFeedConfig": {"cryptowatchApiKey": "abcd","tradermadeApiKey": "efg","quandlApiKey": "hijklmnop"}'
COMMAND=yarn optimistic-oracle --network mainnet_privatekey
```

Once you have a properly configured `.env` file, use the following commands to pull the Docker image and run a container with your specified configuration.

```shell
# Pull the latest docker container image
docker pull umaprotocol/protocol:latest

# Start the optimistic oracle bot Docker container
docker run --name optimistic-oracle-bot -d --env-file ./example.env umaprotocol/protocol:latest
# *your container hash should print here*

# List logs from running bot:
docker logs <your container hash>
```

Your `optimistic-oracle` bot should now be running, please read on to find out about how it works and how to [configure](developers/bot-param.md) it.

## Motivation

The bots described below are infrastructure tools that help maintain the overall health of the UMA ecosystem. They can be very useful for project creators, synthetic token holders, and third-party keepers.
* The `optimistic-oracle` bot ([implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/optimistic-oracle)) makes it easy to provide quick and accurate responses to price requests to the Optimistic Oracle, and to dispute incorrect price proposals.
* The `liquidator` bot ([implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/liquidator)) liquidates undercollateralized positions in `ExpiringMultiParty` contracts.
* The `disputer` bot ([implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/disputer)) disputes incorrect liquidations of `ExpiringMultiParty` positions.
* The `monitors` bot ([implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/monitors)) can monitor synthetic prices, collateralization ratios, wallet balances, and other details that may be important to a user.

## Incentives to Running an Optimistic Oracle Bot

Contracts making a price request to the Optimistic Oracle may offer a `proposerReward` paid out to a price proposer, usually a keeper running an `optimistic-oracle` bot. Project creators may also expect to propose their own prices, in which case there may be no proposer reward, but running an `optimistic-oracle` bot can make their lives easier.

The `optimistic-oracle` bot will also automatically dispute any prices that appear to be different from the true price as calculated by the price feed, outside of a user-specified allowable margin of error. A dispute will trigger a vote on the actual price in the DVM. If UMA tokenholders vote in favor of the disputer, the disputer will earn the proposer's bond, which defaults to the collateral's final fee, but is often more, and can be increased or decreased by the price requestor.

## Advanced Section: ExpiringMultiParty Bots

The following sections cover the `liquidator`, `disputer`, and `monitors` bots for interacting with [ExpiringMultiParty](/developers/emp-deployment) contracts.

## Quick Start: Liquidator Bot

This section is intended for those who are familiar with Docker and just want to
get up and running. We strongly suggest you read the entirety of this article to
learn more about the bot ecosystem which also includes a dispute bot as well as
a monitoring bot.

First, create a file to set the appropriate configuration for your liquidation
bot. Please edit the following example with your own values.

```shell title="example.env"
EMP_ADDRESS=0xFb70A4CBD537B36e647553C279a93E969b041DF0
PRIVATE_KEY=0xf7cbade2b9eec8fc83aa70e4b43f480d0ca78b7060737ead2669d095f2035322
COMMAND=yarn liquidator --network mainnet_privatekey
```

Once you have a properly configured `.env` file, use the following commands to
pull the Docker image and run a container with your specified configuration.

```shell
# Pull the latest docker container image
docker pull umaprotocol/protocol:latest

# Start the liquidator bot Docker container
docker run --name liquidator-bot -d --env-file ./example.env umaprotocol/protocol:latest
# *your container hash should print here*

# List logs from running bot:
docker logs <your container hash>
```

Your liquidation bot should now be running, please read on to find out about how
it works and how to [configure](developers/bot-param.md) it.

### Liquidation vs Dispute Bot

The liquidation bot monitors all open positions within a given ExpiringMultiParty contract and liquidates positions if their collateralization ratio, as inferred from off-chain information about the value of the price identifier, drops below a given threshold.

The dispute bot monitors all liquidations occurring within a given ExpiringMultiParty contract and initiates disputes against liquidations it deems invalid, as inferred from off-chain information about the value of the price identifier.
A liquidation is invalid if a position was correctly collateralized at the time of liquidation.

In short, a liquidation bot is to liquidate under-collateralized positions while a dispute bot is used for disputing those liquidations if they incorrectly report a position as under-collateralized. Since a dispute is the only way a price request is triggered in the system, they are very important to the operation of the DVM.

## Incentives to Running a Bot

Details about liquidation and dispute rewards can be found [here](synthetic-tokens/expiring-synthetic-tokens.md).

## Implementation

The liquidation and dispute bots are separate entities. Each has its own wallet and is designed to be be run independently of the other.
This decouples dependencies between the bots to decrease the risk of one impacting the other.
In production, it is suggested to run the bots within Docker containers to isolate the bots and to ensure a reproducible execution environment.

## Technical Tutorial

This tutorial will be broken down into three main sections:

1. [Running the bots directly from your host environment (no Docker) from the command line](#running-the-bots-locally)
2. [Running the bots within a dockerized environment from the official UMA Docker image](#running-the-bots-locally-with-docker)
3. [Deploying bots to production in Google Cloud Compute](#running-the-bots-in-the-cloud-with-gcp)

This tutorial will guide you through setting up an `optimistic-oracle` bot, as well as a `liquidator` and `disputer` to monitor an ExpiringMultiParty deployed on the Kovan test network.
A verified version of the ExpiringMultiParty contract can be found on Kovan [here](https://kovan.etherscan.io/address/0xDe15ae6E8CAA2fDa906b1621cF0F7296Aa79d9f1).
This contract is an ETHBTC synthetic, collateralized in Dai.

## Prerequisites

Before starting this tutorial you need to clone the repo, install the dependencies, and compile the smart contracts.

### Linux users

If you are using Linux, you may need to first install the following packages before `yarn` can complete properly:

```
make gcc libudev-dev g++ linux-headers-generic libusb-1.0-0
```

Note that `libudev-dev`, `linux-headers-generic`, and `libusb-1.0-0` may have different names depending on your Linux distribution.

If you are not using Linux (or if you have installed the above), you can run the following to continue:

```bash
# Clone the repo and navigate into the protocol directory
git clone https://github.com/UMAprotocol/protocol.git
cd ./protocol

# Install dependencies
yarn

# Compile contracts
yarn qbuild

```

### Funding accounts

Bots must be funded with currency to pay for proposer and disputer bonds, liquidations, and disputes.
Specifically, if you want to run an Optimistic Oracle bot, you need to fund the wallet with 1) collateral currency to pay proposal and dispute bonds and DVM final fees and 2) Ether to pay transaction fees.
If you want to run a liquidation bot, you need to fund the wallet with 1) synthetic tokens to close liquidated positions, 2) collateral currency to pay the DVM final fee, and 3) Ether to pay transaction fees.
If you want to run a dispute bot, then this wallet should be funded with 1) collateral currency to pay dispute bonds and the DVM final fee and 2) Ether to pay transaction fees.

At a minimum, the account must have some ETH to pay gas for transactions executed during bot set up, otherwise the bots will crash. If the bots do not have collateral or synthetic tokens, they will not crash but they will not be able to propose and dispute prices with the Optimistic Oracle, or send liquidations or disputes for ExpiringMultiParty contracts.

### Bot private key management

All deployment configurations require a wallet mnemonic (or private key) to be injected into the bots enabling them to submit transactions to perform on-chain liquidations and disputes.
You can either bring your own mnemonic from an existing wallet or generate a fresh one using the `bip39` package installed within the UMA repo.
If you have a wallet mnemonic already you can skip this section.

To generate a new mnemonic you can run the following:

```bash
node -e "console.log(require('bip39').generateMnemonic())"
# your mnemonic should print here
```

You can then load this mnemonic into truffle and view the associated address.
To do this, set the mnemonic as an environment variable by running:

```bash
# Add the new mnemonic to your environment variables. Be sure to replace with your mnemonic.
export MNEMONIC="sail chuckle school attitude symptom tenant fragile patch ring immense main rapid"

# Start the truffle console
yarn truffle console --network kovan_mnemonic

# Print the address of your newly created account
truffle(kovan_mnemonic)> accounts[0]

# should print: `0x45Bc98b00adB0dFe16c85c391B1854B706b7d612`
```

You can now fund this wallet with the associated currency for the type of bot you want to run.
To learn more about creating synthetic tokens to fund a liquidation bot see [this](/build-walkthrough/minting-etherscan) tutorial.

### Creating a price feed API key

All bots require a price feed to inform their liquidation decisions. The bots will work fine without a key but free no account tier will run out of credits within a day. We recommend making a free account to ensure you have sufficient credits.
The easiest price feed to integrate with is [CryptoWatch](https://cryptowat.ch/). To create an API Key do the following:

1. Create an account [here](https://cryptowat.ch/account/create).
2. Generate an API key [here](https://cryptowat.ch/account/api-access).

Keep this key handy. You'll need it when configuring the bots.

You may also wish to create accounts with [TraderMade](https://tradermade.com/) and [Quandl](https://docs.quandl.com/), but we will skip the API key set-up process for those data sources in this tutorial.

## Running the bots locally

This section describes running the `optimistic-oracle`, `liquidator`, and `disputer` bots locally from your machine without Docker or any complex execution environment. This is meant to be the simplest way possible to start up a bot.

**a) Configuring environment**
To start a bot the first step is to configure the bots' configuration settings using environment variables.
Optimistic Oracle bots require a `COMMON_PRICE_FEED_CONFIG`, while liquidation bots require a `PRICE_FEED_CONFIG` and `EMP_ADDRESS`. Both bots require a `MNEMONIC`.
To set this up create a `.env` file in the root directory directory:

```bash
EMP_ADDRESS=0xDe15ae6E8CAA2fDa906b1621cF0F7296Aa79d9f1
MNEMONIC=sail chuckle school attitude symptom tenant fragile patch ring immense main rapid
PRICE_FEED_CONFIG='{"apiKey":"YOUR-CRYPTO-WATCH-API-KEY-HERE"}'
COMMON_PRICE_FEED_CONFIG='{"cryptowatchApiKey":"YOUR-CRYPTO-WATCH-API-KEY-HERE"}'
```

The parameters above, as well as other optional parameters are explained in the appendix of this tutorial. **Be sure to add in your mnemonic and your crypto watch API key.** The parameter in the example above conform to [UMIP-2](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-2.md#implementation)'s specification.

Note that the `EMP_ADDRESS` above currently refers to the ETHBTC synthetic token deployed on Kovan. The EMP refers to the `ExpiringMultiParty` financial contract used here.

Note also that you can leave out the `EMP_ADDRESS` and `PRICE_FEED_CONFIG` if you only plan to run an `optimistic-oracle` bot, or leave out the `COMMON_PRICE_FEED_CONFIG`.

**b) Starting the bots**

Now that your env is set up you can run the bot. Run the following command from the root directory to start the bots on Kovan:

```bash
yarn optimistic-oracle --network kovan_mnemonic
```

This will start the `optimistic-oracle` bot process using the network `kovan` and the wallet `mnemonic`. You should see the following output:

```bash
2020-05-22 08:39:42 [info]: {
  "at": "OptimisticOracle#index",
  "message": "OptimisticOracle proposer started 🌊",
  "optimisticOracleAddress": "0xB1d3A89333BBC3F5e98A991d6d4C1910802986BC",
  "pollingDelay": 60,
  "errorRetries": 3,
  "errorRetriesTimeout": 1,
  "commonPriceFeedConfig": {
    "cryptowatchApiKey": "abcdefg"
  },
  "optimisticOracleProposerConfig": {},
  "oracleType": "Voting"
}
... Rest of bot startup logs and continuous health reports...
```

In a separate terminal you can start a liquidator bot using the same config by running:

```bash
yarn liquidator --network kovan_mnemonic
```

You should see the following output:

```bash
2020-05-22 08:39:42 [info]: {
  "at": "Liquidator#index",
  "message": "liquidator started 🕵️‍♂️",
  "empAddress": "0xFb70A4CBD537B36e647553C279a93E969b041DF0",
  "pollingDelay": "60",
  "priceFeedConfig": {
    "type": "medianizer",
    "pair": "usdeth",
    "lookback": 7200,
    "minTimeBetweenUpdates": 60,
    "medianizedFeeds": [
      {
        "type": "cryptowatch",
        "exchange": "coinbase-pro"
      },
      {
        "type": "cryptowatch",
        "exchange": "binance"
      },
      {
        "type": "cryptowatch",
        "exchange": "kraken"
      }
    ]
  },
}
... Rest of bot startup logs and continuous health reports...
```

In a third terminal you can start a disputer bot using the same config by running:

```bash
yarn disputer --network kovan_mnemonic
```

You should see the following output:

```bash
2020-05-22 08:37:10 [info]: {
  "at": "Disputer#index",
  "message": "Disputer started 🔎",
  "empAddress": "0xFb70A4CBD537B36e647553C279a93E969b041DF0",
  "pollingDelay": "60",
  "priceFeedConfig": {
    "type": "medianizer",
    "pair": "ethbtc",
    "lookback": 7200,
    "minTimeBetweenUpdates": 60,
    "medianizedFeeds": [
      {
        "type": "cryptowatch",
        "exchange": "coinbase-pro"
      },
      {
        "type": "cryptowatch",
        "exchange": "binance"
      },
      {
        "type": "cryptowatch",
        "exchange": "kraken"
      }
    ]
  },
}
  ... Rest of bot startup logs and continuous health reports...
```

The bots are now running! Any price proposal, price dispute, liquidation events or informative logs will be printed here.
If all is operating correctly, you should be able to propose and dispute prices with the Optimistic Oracle, liquidate under-collateralized positions in `ExpiringMultiParty` contracts, and dispute incorrectly liquidated positions.

## Running the bots locally with Docker

Running the bots from your local machine is simple but is not ideal for long term bot execution as you'll need to keep a terminal running the whole time to keep the bot process alive.
What would be better is to run the bots within an isolated Docker container that can be run in the background on your machine.

The steps followed here can also be reproduced on a VPS service like Google Cloud Compute Engine, Digital Ocean or AWS EC2 to host your Dockerized bots in the cloud.
Section 3 of this tutorial will show you how to deploy the bots to GCP. It is recommended that you get the bots running within a local Docker environment before trying to run them on the cloud.

**a) Setting up docker on your local machine**

To be able to run the bots within a Dockerized environment you need to have Docker set up on your local machine. Getting started with Docker is relatively straight forward.
See the official docs for [Mac](https://docs.docker.com/docker-for-mac/), [Linux](https://docs.docker.com/engine/install/ubuntu/) or [Windows](https://docs.docker.com/docker-for-windows/install/).

**b) Creating environment configs for the bots**

In the previous section, the `optimistic-oracle`, `liquidator`, and `disputer` bots used the same `.env` configuration file.
In this section, we will create separate configuration files for each bot.
These scripts will contain all the settings for a given bot, as well as the starting command used to boot the bot.

Start by copying the `.env` you created to make three new env files. This section assumes you are in the root directory directory. Run the following commands:

```bash
# Copy the contents of the .env and add command to run the optimistic-oracle bot.
cp .env optimistic-oracle.env
echo '\nCOMMAND=yarn optimistic-oracle --network kovan_mnemonic' >> optimistic-oracle.env

# Do the same for the liquidator and disputer bots.
cp .env liquidator.env
echo '\nCOMMAND=yarn liquidator --network kovan_mnemonic' >> liquidator.env

cp .env disputer.env
echo '\nCOMMAND=yarn disputer --network kovan_mnemonic' >> disputer.env
```

You should now have three config files (`optimistic-oracle.env`, `liquidator.env`, and `disputer.env`) within the root directory, which contain the original configs defined in the previous section along with a `COMMAND` line which defines the execution command of the bot.
These commands are the same as before.

**c) Starting the Docker containers**

Next, we will start the Docker containers in detached mode on our local machine. To do this run the following:

```bash
# Pull the latest docker container image
docker pull umaprotocol/protocol:latest

# Start the optimistic-oracle bot Docker container
docker run --name optimistic-oracle-bot -d --env-file ./optimistic-oracle.env umaprotocol/protocol:latest

# Start the liquidator bot Docker container
docker run --name liquidator-bot -d --env-file ./liquidator.env umaprotocol/protocol:latest

# Start the disputer bot Docker container
docker run --name disputer-bot -d --env-file ./disputer.env umaprotocol/protocol:latest
```

All three Docker containers should start correctly. To view the running docker containers on your machine you can run:

```bash
docker ps
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS               NAMES
f74d1cdd8892        umaprotocol/protocol:latest   "/bin/bash scripts/r…"   8 seconds ago       Up 7 seconds                            disputer-bot
5c7cea93b65b        umaprotocol/protocol:latest   "/bin/bash scripts/r…"   10 minutes ago      Up 10 minutes                           liquidator-bot
93b65b5c7cea        umaprotocol/protocol:latest   "/bin/bash scripts/r…"   13 minutes ago      Up 13 minutes                           optimistic-oracle-bot
```

You can now view the logs of these Docker containers by running:

```bash
docker logs 93b65b5c7cea # where 93b65b5c7cea is the Docker ID from the previous command
```

This should print the logs of the bot's execution to date.

You can also run in attached mode to view the logs as they are printed as:

```bash
docker attach 93b65b5c7cea
```

If you want to stop the bots from running you can run the following:

```bash
docker stop $(docker ps -a -q)
```

Note this will stop all running Docker containers on your machine.

## Running the bots in the cloud with GCP

In this section of the tutorial you will learn how to spin up `optimistic-oracle`, `liquidator`, and `disputer` bots in Google Cloud Compute.
Note that you can use any cloud hosting platform to run the Docker containers. We simply use GCP as an easy example.
The official GCP docs are a useful reference. For more information and commands see [this](https://cloud.google.com/compute/docs/containers/deploying-containers) official tutorial.

**a) Setting up your `gcloud` environment**

Before running any GCP commands you need to set up an account and configure the `gcloud` utility.
See [this](https://cloud.google.com/compute/docs/gcloud-compute) official documentation on setting this up. Once this is set up you should be able to run the following to view your gcloud email:

```bash
gcloud config list account --format "value(core.account)"
## <your email should print here>
```

**b) Deploying Bots to GCP**

To deploy the bots to GCP we use the `compute instances create-with-container` CLI function which will create a new compute instance within your GCP Compute engine.
This instance will boot up and run a Docker container on execution.
From the root directory, where `optimistic-oracle.env`, `liquidator.env`, and `disputer.env` configs are located, you can run the following to deploy bots to GCP:

```bash
gcloud compute instances create-with-container optimistic-oracle-kovan \
    --container-image docker.io/umaprotocol/protocol:latest \
    --container-env-file ./optimistic-oracle.env
gcloud compute instances create-with-container ethbtc-liquidator-kovan \
    --container-image docker.io/umaprotocol/protocol:latest \
    --container-env-file ./liquidator.env
gcloud compute instances create-with-container ethbtc-disputer-kovan \
    --container-image docker.io/umaprotocol/protocol:latest \
    --container-env-file ./disputer.env
```

Note `optimistic-oracle-kovan`, `ethbtc-liquidator-kovan`, and `ethbtc-disputer-kovan` are the names of the deployed compute instances. You can change these to anything you want. `./optimistic-oracle.env`, `./liquidator.env`, and `./disputer.env` are the environment configuration files created in the previous section of this tutorial.
Logging into gcloud Compute Engine dashboard you should see deployed compute instances called `optimistic-oracle-kovan`, `ethbtc-liquidator-kovan`, and `ethbtc-disputer-kovan`.

**C) Updating container configuration.**

You might want to update Docker environment variables or push new code to the compute instances. The easiest way to update env variables is from the GCP dashboard.
The official docs explain the process to do this [here](https://cloud.google.com/compute/docs/containers/configuring-options-to-run-containers#setting_environment_variables).

Alternatively if you want to push a new local config file you can do this by running the following command (assuming we are updating the `optimistic-oracle-kovan` initialized in the previous code block)

```bash
 gcloud compute instances update-container optimistic-oracle-kovan \
        --container-image docker.io/umaprotocol/protocol:latest \
        --container-env-file ./optimistic-oracle.env
```

## Bot health monitoring

Once your bots are running on GCP you want to know when they are properly proposing prices, disputing prices, and executing liquidations, or if any errors occur. The bots by default provide a few useful monitoring avenues. These are now discussed.

### GCP StackDriver integration

Once your containers are running within compute engine you probably want to see the log messages in the same way you did when running `docker attach` in the previous section.
To make this process easier the bot logger configuration includes Google Stackdriver integration.
This enables GCP logging to pick up the log messages generated from the bots. To enable this add the following environment variable to the docker containers:

```bash
ENVIRONMENT=production
```

This will tell the bot's logger to pipe logs to GCP logging. For more information on this GCP logging and how to access it within Gcloud see the official doc [here](https://cloud.google.com/logging).

### Slack integration

The bots by default also come with built-in Slack integration to send Slack messages when events occur (price proposed, price disputed, bot liquidates a position, wallet is running low on capital, or something has failed).
To use this integration you must first generate a Slack webhook.
Information on generating a webhook can be found on the Slack docs [here](https://slack.com/intl/en-za/help/articles/115005265063-Incoming-Webhooks-for-Slack).

Once you've set up a Slack webhook you can add it to the bots by adding the following environment variable:

```bash
SLACK_WEBHOOK=<your slack webhook>
```

The bots will now automatically start sending log messages in Slack.

## Running a liquidator bot on mainnet

The tutorial thus far assumed you are running Kovan Optimistic Oracle, liquidation, and dispute bots. Next, we will discuss how to move the deployment onto Ethereum mainnet. This involves three main steps which are outlined below.

**1) Funding your bots on mainnet**

Running on mainnet involves first repeating the [funding accounts](#funding-accounts) section on the main Ethereum network to acquire collateral to fund the `optimistic-oracle`, `liquidator`, and `disputer` bots.

**2) [EMP Only] Updating the EMP address to point to mainnet ExpiringMultiParty contract**

Update your environment configuration `EMP_ADDRESS` to refer to the mainnet address of the ExpiringMultiParty contract you want to monitor.

Note that this step is unnecessary if you only plan to run an `optimistic-oracle` bot on mainnet and not the EMP bots.

<!-- TODO: add a link to another docs page that outlines the EMP address for all mainnet deployments -->

**3) Update the `COMMAND` used to start the bots to point at mainnet, rather than kovan.**
This is as simple as changing your `COMMAND` to the following for the `optimistic-oracle`, `liquidator`, and `disputer` bots respectively.

```bash
# optimistic-oracle.env update
COMMAND=yarn optimistic-oracle --network mainnet_mnemonic

# liquidator.env update
COMMAND=yarn liquidator --network mainnet_mnemonic

# disputer.env update
COMMAND=yarn disputer --network mainnet_mnemonic
```

## Specifying price dispute sensitivity parameters

Due to the design of the UMA DVM and price dispute process, a bot operator might only want to dispute prices that are `x` percentage off of the price they calculated. For example, a proposed price is `$100`, a highly conservative operator might only want to raise a dispute if their calculation is `< $90` or `> $110` to reduce the risk of losing the dispute.

To facilitate this configuration, the UMA `optimistic-oracle` bot has an optional configuration object that can be used to specify a `disputePriceErrorPercent` which defines how far off a proposed price must be from the bot's calculation to raise a dispute. To enable this configuration with a 10% threshold, add the following to your `optimistic-oracle.env`:

```
OPTIMISTIC_ORACLE_PROPOSER_CONFIG={"disputePriceErrorPercent":0.1}
```

By default, the dispute threshold is `0.05` or `5%`.

## Specifying liquidation sensitivity parameters

Due to the design of the UMA DVM and liquidation process, a bot operator might only want to liquidate positions that are `x` percentage under-collateralized. For example if the Collateralization Requirement (CR) of a contract is 120%, a conservative operator might only want to liquidate positions that are at 115% to remove any risk of being disputed.

To facilitate this configuration, the UMA liquidator bots have an optional configuration object that can be used to specify a `crThreshold` which defines how far below the given CR ratio a position must fall before the bot will initiate the liquidation. To enable this configuration with a 5% threshold, add the following to your `liquidator.env`:

```
LIQUIDATOR_CONFIG={"crThreshold":0.05}
```

This configuration object has additional options including:

1. `liquidationDeadline` (in seconds) which aborts the liquidation if the transaction is mined this amount of time after the EMP client's last update time. Defaults to 5 minutes.
2. `liquidationMinPrice` (in Wei, as a `FixedPoint` type) which aborts the liquidation if the amount of collateral in the position per token outstanding is below this ratio. Defaults to 0.

These configurations can be added to the config in the same way the `crThreshold` was added (i.e. as part of the JSON object in the same line).

## Bot configuration parameters

For a more detailed document on bot-specific parameters see this [doc](developers/bot-param.md).
