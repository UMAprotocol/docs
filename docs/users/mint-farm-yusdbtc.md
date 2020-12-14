---
title: Mint and Farm uUSDrBTC
sidebar_label: Mint and Farm uUSDrBTC
---

This tutorial will show you how to leverage your `BTC` holdings to earn `BAL` and 
`UMA` tokens.

### Useful Links

- [EMP Tools link for `uUSDrBTC-DEC`](https://tools.umaproject.org/?address=0xaBBee9fC7a882499162323EEB7BF6614193312e3)
- [CoinGecko listing for `uUSDrBTC-DEC`](https://www.coingecko.com/en/coins/uusdrbtc-synthetic-token-expiring-31-december-2020)
- [Balancer Pool for `uUSDrBTC-DEC/USDC`](https://pools.balancer.exchange/#/pool/0x2dd7255b487a62d738110bd10f8bc4b4ea989778/)
- [RenBridge Project](https://bridge.renproject.io/)

This is a three-part process:

1. First you will wrap your `BTC` into `renBTC` so that it is usable on the
   Ethereum blockchain.
2. Then you can use `renBTC` to mint `uUSDrBTC` tokens on the UMA protocol.
3. Depositing `uUSDrBTC` into a Balancer pool will give you the ability to earn
   `BAL` and `UMA` tokens.

## Step 1: Wrapping BTC into renBTC

Wrapping BTC into renBTC is possible using [RenBridge](https://bridge.renproject.io/), a decentralized application (dApp) that allows individuals to mint real BTC, ZEC, and BCH on Ethereum as an ERC20 (renBTC, renZEC, renBCH).

Navigate to https://bridge.renproject.io/ and click the `Connect` button at the top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/users/renBTC_connect.png)

Enter the amount of bitcoin you would like to wrap into renBTC,

![amount](/docs/users/renBTC_enteramount.png)

then, click `Next` 

![next](/docs/users/renBTC_next.png)

then click `confirm`. Before doing this, make sure you verify all the details in the modal.

Check that you are wrapping Bitcoin, as Renbridge allows you to wrap other coins like Zen and BCH.

The `Destination` should be your Metamask wallet address, this is where your renBTC will be sent to.

Also, check the cost (`RenVM fee`, `Bitcoin Network fee`) and the amount of renBTC you will be receiving.

Once you have done all of this, you can then go ahead and click `confirm`.

![confirm](/docs/users/renBTC_confirm.png)

A one-time deposit address is generated for you to send your BTC to. Send the exact amount of BTC you are wrapping to that address, in a single transaction.

![deposit](/docs/users/renBTC_deposit.png)

* Your transaction requires 6 confirmations, which can take up to 1 hour, before the renBTC is sent to your wallet 
* You will need to accept & sign the transaction that sends renBTC to your wallet.



## Step 2: Minting uUSDrBTC with renBTC

Minting uUSDrBTC tokens is easy with the [EMP Tools](http://tools.umaproject.org/),
UMA's UI for ExpiringMultiParty contracts (EMP) which is what the uUSDrBTC token is
minted from.

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/users/emp_connect.png)

Then, select the `uUSDrBTC` contract from the dropdown immediately underneath the
header (above the tabs).

![select EMP](/docs/users/uUSD_selectemp.png)

Select the "Manage Position" tab.

![manage position tab](/docs/users/uUSD_manage-positionemp.png)

Scroll down to the "Actions" dropdown and ensure that "Create" is selected.

![position actions dropdown](/docs/users/emp_actions.png)

At this point, make sure you read the text and confirm that:

1. You will be minting at a collateralization ratio above the global
   collateralization ratio (GCR);
2. You will be minting the minimum required number of tokens (100 for `uUSDrBTC`),
   and;
3. You will keep your position collateralized above the minimum required
   collateralization ratio (CR) or else risk getting liquidated (the required CR
   is 125% for `uUSDrBTC`).

If you fully understand the above, and have decided on an appropriate amount of
(1) collateral to supply and (2) tokens to mint, check to make sure you have
enough collateral for minting.

![token minting form](/docs/users/uUSD_mintingform.png)

In the first field, fill in the number of tokens you want to mint.

In the second field, fill in the amount of collateral you want to supply.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `uUSDrBTC` tokens!

## Step 3: Farming uUSDrBTC on Balancer

:::danger

Supplying _only_ `USDC` to the pool will result in auto-purchasing `uUSD` at the current price. This means you are market-buying `uUSDrBTC`, so be mindful of the trading price of `uUSDrBTC` before doing this.

:::

By supplying liquidity to the `uUSDrBTC/USDC` Balancer pool, you have the
opportunity to earn `BAL` and `UMA` tokens. The `UMA` token distribution
is governed by the experimental UMA liquidity mining program.
Read about this liquidity mining program [here](https://medium.com/uma-project/uma-announcing-the-yield-dollar-on-renbtc-440a1ed0c5d5).


Head to the `uUSDrBTC/USDC` [pool](https://pools.balancer.exchange/#/pool/0x2dd7255b487a62d738110bd10f8bc4b4ea989778/) and click on the "Add Liquidity" button. You’ll
be asked to Setup Proxy if you haven’t already

![add liquidity button on balancer](/docs/users/uUSD_addliquiditybal.png)

Once the proxy is setup, the "Add Liquidity" button will show you a form for
adding liquidity.

At this point, you might want to get some `USDC` so you can supply both assets
to the Balancer pool. Alternatively, Balancer also supports supplying only a
single-asset but that mechanism is out of scope for this tutorial.

Under the "All Pool Assets" tab, you should see something like this:

![deposit assets on balancer](/docs/users/bal_deposit.png)

As with any other ERC20 token, you'll have to "unlock" (i.e. grant approval) for
the dapp to transfer tokens on your behalf. Once you have done that, you can
deposit `uUSDrBTC` and `USDC` into the Balancer pool in exchange for some Balancer
Pool Tokens (i.e. `BPT`) specific to this pool.

This enables you to passively gain `BAL` and `UMA` tokens in accordance
to the experimental UMA liquidity mining program. If you have any questions
regarding this process, please don't hesitate to reach out on
[Discord](https://discord.umaproject.org/).
