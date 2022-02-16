---
title: Integrating with the DVM
sidebar_label: Integrating with the DVM
---

**IMPORTANT NOTE**: In most cases, it is better to integrate with the Optimistic Oracle rather than integrating with the DVM directly. See the [Optimistic Oracle tutorial](developers/optimistic-oracle-integration.md) for details.

## Toy Integration Example

This example will set up a `DepositBox` contract which custodies a user’s ERC-20 token balance.
On a local testnet blockchain, the user will deposit wETH (Wrapped Ether) into the contract and withdraw wETH corresponding to a desired USD amount.

The user links the `DepositBox` with one of the price identifiers enabled on the DVM.
In this example, the user will deposit wETH into the `DepositBox` and register it with the "ETH/USD" price identifier.
The user can now withdraw a USD-denominated amount of wETH from their `DepositBox` via smart contract calls.
The feature introduced by the DVM is on-chain pricing of the user's ERC-20 balance.
In this example, the user would not have been able to transfer USD-denominated amounts of wETH without referencing an off-chain `ETH-USD` price feed.
The DVM therefore enables the user to "pull" a reference price.

While the example below uses wETH as the currency for deposits to the `DepositBox` and ETH/USD as the price identifier, the code supports use of any ERC-20 token as the currency for deposits.
The code can also be deployed with other price identifiers.
For example, if users wanted to denominate their withdrawals in BTC instead of USD, the price identifier could be set to ETH/BTC.

Note that this toy example would perform poorly as a mainnet product, given the long period of time it would take for the UMA DVM to return the corresponding amount of ETH.
This example is intended to serve as a technical tutorial for how to integrate the DVM into a project.
Moreover, the DepositBox user would be paying for the privilege of having the DVM help them withdraw USD denominated wETH deposits.

The `DepositBox` contract will pay regular fees to the DVM proportional to the amount of collateral deposited into the contract. Additionally, whenever a user makes a withdrawal request, the contract will pay a fixed final fee to the DVM.

Details on these two fees are available [here](oracle/econ-architecture.md#step-3-maintaining-coc--pfc).

## Toy Integration Tutorial

1. Ensure that you have followed all the prerequisite setup steps [here](developers/setup.md).
2. Run a local blockchain instance (i.e. not Kovan/Ropsten/Rinkeby/Mainnet) with `yarn hardhat node --port 9545`
3. In another window, initialize the contracts by running the following commands from the root of the `protocol` repo:

```bash
cd packages/scripts

HARDHAT_NETWORK=localhost ./src/utils/Deploy.js
```

4. To deploy the `DepositBox` contract and go through a simple user flow, run the following script from the `scripts` folder:

```bash
HARDHAT_NETWORK=localhost ./src/demo/DepositBox.js
```

You should see the following output:

```
1. Deploying new DepositBox
 - Using WETH as collateral token
 - Pricefeed identifier for ETH/USD is whitelisted
 - Deployed a MockOracle
 - Deployed a new DepositBox and linked it with the MockOracle
2. Registering DepositBox with DVM
 - Granted DepositBox contract right to register itself with DVM
 - DepositBox is registered
3. Minting ERC20 to user and giving DepositBox allowance to transfer collateral
 - Converted 1000 ETH into WETH
 - User's WETH balance: 1000
 - Increased DepositBox allowance to spend WETH
 - Contract's WETH allowance: 1000
4. Depositing ERC20 into the DepositBox
 - Deposited 200 WETH into the DepositBox
 - User's deposit balance: 200
 - Total deposit balance: 200
 - User's WETH balance: 800
5. Withdrawing ERC20 from DepositBox
 - Submitted a withdrawal request for 10000 USD of WETH
 - Resolved a price of 200 WETH-USD
 - User's deposit balance: 150
 - Total deposit balance: 150
 - User's WETH balance: 850
```
