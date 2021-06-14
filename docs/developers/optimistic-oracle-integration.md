---
title: Integrating with the Optimistic Oracle
sidebar_label: Integrating with the Optimistic Oracle
---

## Integration Example Contract

This example will set up an `OptimisticDepositBox` contract which custodies a user’s ERC-20 token balance.

On a local testnet blockchain, the user will deposit wETH (Wrapped Ether) into the contract and withdraw wETH corresponding to a desired USD amount.

The user links the `OptimisticDepositBox` with one of the price identifiers enabled on the DVM.

In this example, the user will deposit wETH into the `OptimisticDepositBox` and register it with the `ETH/USD` price identifier.

The user can now withdraw a USD-denominated amount of wETH from their `DepositBox` via smart contract calls. The feature introduced by the Optimistic Oracle is optimistic on-chain pricing of the user's ERC-20 balance.

In this example, the user would not have been able to transfer USD-denominated amounts of wETH without referencing an off-chain `ETH/USD` price feed.

The Optimistic Oracle therefore enables the user to "pull" a reference price.

Unlike price requests to the DVM, a price request to the Optimistic Oracle can be resolved within a specified liveness window if there are no disputes, which can be significantly shorter than the DVM voting period. The price requestor is not currently required to pay fees to the DVM.

The requestor can offer a reward for the proposer who responds to a price request, but the reward value is set to `0` in this tutorial example.

The price proposer posts a bond along with their price, which will be refunded if the price is not disputed, or if a dispute is resolved in the proposer's favor. Otherwise, this bond is used to pay the final fee to the DVM and pay a reward to a successful disputer.

While the example below uses wETH as the currency for deposits to the `OptimisticDepositBox` and ETH/USD as the price identifier, the code supports use of any ERC-20 token as the currency for deposits.

The code can also be deployed with other price identifiers.

For example, if users wanted to denominate their withdrawals in BTC instead of USD, the price identifier could be set to ETH/BTC.

This example is intended to serve as a basic technical tutorial for how to integrate the Optimistic Oracle into a new contract. Some interesting ideas for extending the tutorial contract include:

- Limiting withdrawals unless ETH is above a certain USD price, which would enforce a "HODL" strategy for depositors.
- Allowing a user to request a price and propose a price in the same transaction.
- Only allowing withdrawals after a specified future timestamp.
- Allowing partial withdrawals denominated in USD that must be spaced out over time.

The Optimistic Oracle is a powerful tool for smart contracts that need quick and secure resolution of any kind of off-chain data, and this tutorial is only scratching the surface.

To learn more, see the [full contract documentation](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html), and if you have ideas or questions about something you'd like to build, join our community on [Discord](https://discord.com/invite/jsb9XQJ).

## Running the Demo

1. Ensure that you have followed all the prerequisite setup steps [here](developers/setup.md).
2. Run a local Ganache instance (i.e. not Kovan/Ropsten/Rinkeby/Mainnet) with `ganache-cli --port 9545`
3. In another window, migrate the contracts by running the following command:

```bash
yarn truffle migrate --reset --network test
```

1. To deploy the `OptimisticDepositBox` contract and go through a simple user flow, run the following demo script from the root of the repo:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

You should see the following output:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```
