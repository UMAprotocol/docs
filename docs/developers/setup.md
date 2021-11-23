---
title: Setup
sidebar_label: Setup
---

After completing these set up steps, we'll be ready to start developing with the UMA system locally.

The following steps require the `git` CLI to be installed. If you are on Windows, you can install via Git Bash Shell ([link](https://gitforwindows.org/)).

## Core

Clone the UMA [repo](https://github.com/UMAprotocol/protocol). Start in the top-level directory in this repository, `protocol/`.

1. Install version 14.x of [Node.js](https://nodejs.org/) and [Yarn](https://classic.yarnpkg.com/) is installed along with it.
2. Run the following in the root of the repo to install all packages from the UMA mono repo:
```bash
yarn
```


We should be able to compile the smart contracts:

```bash
yarn qbuild
```

If everything worked, we should see the line "> Compiled successfully using:" in the output.

## Ganache

Ganache-CLI was already installed via `yarn` and now we will use it to run a test-chain with this command:

```bash
npx ganache-cli -p 9545 -e 1000000 -l 10000000
```

Here, we are running Ganache:

- On localhost port `9545`
- Initializing the test accounts with 1000000 ETH
- Setting a maximum gas limit of 10 million

This will make sure we have enough ETH and a high enough gas limit to deploy our larger contracts.

If everything was set up correctly, we should be able to run automated tests from `protocol/packages/core`. In a separate terminal, run the following commands:

```bash
cd packages/core
npx hardhat test
```

These tests will take a while to finish, but if set up correctly, all tests should pass (with the possible exception of a few that depend on the Intrinio API).

## Keys and Networks

When using UMA infrastructure, you often have to open the Hardhat console using `npx hardhat console` or run a script using `npx hardhat run <script>`. When using Hardhat in the context of this repository, it's important to understand what to specify for the `--network` argument and how to set up your `hardhat.config.js` file.

### Public Networks

Public networks include the Ethereum mainnet and any public testnets, like Rinkeby, Kovan, or Ropsten. A list of UMA supported networks is available [here](https://github.com/UMAprotocol/protocol/blob/master/packages/common/src/PublicNetworks.ts).

The `--network` parameter is used in Hardhat commands to connect to a specific network. Generally, the network argument is structured as `--network [NETWORK_NAME]`. 

Here's an example of how to tell Hardhat to use the Rinkeby testnet:

```bash
npx hardhat console --network rinkeby
```

### Wallet Configuration

When Hardhat is run, it searches for the closest `hardhat.config.js` file starting from the Current Working Directory. This file normally lives in the root of your project.

To use an HD Wallet with Hardhat you should set your network's accounts field to an object with the following fields:

- mnemonic: A required string with the mnemonic phrase of the wallet.
- path: The HD parent of all the derived keys. Default value: "m/44'/60'/0'/0".
- initialIndex: The initial index to derive. Default value: 0.
- count: The number of accounts to derive. Default value: 20.

See the [Hardhat documentation](https://hardhat.org/config/#hd-wallet-config) for more information on setting up your `hardhat.config.js` file and using the Hardhat console.