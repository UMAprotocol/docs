---
title: Mint and Farm YD-BTC-JUN21
sidebar_label: Mint and Farm YD-BTC-JUN21
---

This tutorial will show you how to leverage your `BTC` holdings to earn `BAL` and 
`UMA` tokens.

### Useful Links

- [EMP Tools link for `YD-BTC-JUN21`](https://tools.umaproject.org/?address=0xd9af2d7E4cF86aAfBCf688a47Bd6b95Da9F7c838)
- [Balancer Pool for `YD-BTC-JUN21/USDC`](https://pools.balancer.exchange/#/pool/0x29fcd0d34477f4cac604a525cb5cf1065fe14502/
)


## Step 1: Mint YD-BTC-JUN21

You can now mint yield dollar tokens from two different interfaces.  

- [EMP Tools](http://tools.umaproject.org/) &
- [OpenDAO's Interface](https://ydollar.opendao.io/)

## Minting using EMP Tools 

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/users/emp_connect.png)

Then, select the `YD-BTC-JUN21` contract from the dropdown immediately underneath the
header (above the tabs).

![select EMP](/docs/users/ydbtc_emp-select.png)

Select the "Manage Position" tab.

![manage position tab](/docs/users/ydbtc_emp-manageposition.png)

Scroll down to the "Actions" dropdown and ensure that "Create" is selected.

![position actions dropdown](/docs/users/emp_actions.png)

At this point, make sure you read the text and confirm that:

1. You will be minting at a collateralization ratio above the global
   collateralization ratio (GCR);
2. You will be minting the minimum required number of tokens (100 for `YD-BTC-JUN21`),
   and;
3. You will keep your position collateralized above the minimum required
   collateralization ratio (CR) or else risk getting liquidated (the required CR
   is 125% for `YD-BTC-JUN21`).

If you fully understand the above, and have decided on an appropriate amount of
(1) collateral to supply and (2) tokens to mint, check to make sure you have
enough collateral for minting.

In the case of `YD-BTC-JUN21`, the collateral you need is [renBTC](https://renproject.io/),
which is just BTC with an ERC20 interface. If you do not have a sufficient
balance of renBTC, you can easily convert your BTC to renBTC via [Renproject's Bridge](https://bridge.renproject.io/).

You may skip this step if you already have sufficient renBTC.

Once you have enough renBTC to use as collateral, return to the "Manage Position"
tab and scroll down to the form at the bottom of the page:

![token minting form](/docs/users/ydbtc_emp-form.png)

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `YD-BTC-JUN21` tokens!

## Minting using OpenDAO's Interface 

Navigate to https://ydollar.opendao.io/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/users/ydeth_opendao-connect.png)

Then click `select Btc or Eth` and select the `BTC(YD-BTC-JUN21)` contract from the dropdown.

![select EMP](/docs/users/ydbtc_opendao-select.png)

Select the "Mint Y-Dollars" tab.

![manage position tab](/docs/users/ydbtc_opendao-createmint.png)

At this point, make sure you confirm that you know that:

1. You will be minting at a collateralization ratio above the global
   collateralization ratio (GCR);
2. You will be minting the minimum required number of tokens (100 for `YD-BTC-JUN21`),
   and;
3. You will keep your position collateralized above the minimum required
   collateralization ratio (CR) or else risk getting liquidated (the required CR
   is 125% for `YD-BTC-JUN21`).

If you fully understand the above, and have decided on an appropriate amount of
(1) collateral to supply and (2) tokens to mint, check to make sure you have
enough collateral for minting.

In the case of `YD-BTC-JUN21`, the collateral you need is [renBTC](https://renproject.io/),
which is just BTC with an ERC20 interface. If you do not have a sufficient
balance of renBTC, you can easily convert your BTC to renBTC via the `BTC to renBTC converter`.

You may skip this step if you already have sufficient renBTC.

![weth converter](/docs/users/ydbtc_opendao-renbtc.png)

Once you have enough renBTC to use as collateral, return to "Mint Y-Dollars".

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `YD-BTC-JUN21` tokens!

## Step 2: Farm on Balancer

:::danger

Supplying _only_ `USDC` to the pool will result in auto-purchasing `YD-BTC-JUN21` at the current price. This means you are market-buying `YD-BTC-JUN21`, so be mindful of the trading price of `YD-BTC-JUN21` before doing this.

:::

By supplying liquidity to the `YD-BTC-JUN21` Balancer pool, you have the
opportunity to earn both `BAL` and `UMA` tokens. 

Head to the `YD-BTC-JUN21`
[pool](https://pools.balancer.exchange/#/pool/0x29fcd0d34477f4cac604a525cb5cf1065fe14502/
)
and click on the "Add Liquidity" button. You’ll be asked to Setup Proxy if you
haven’t already

![add liquidity button on balancer](/docs/users/ydeth_bal-addliquidity.png)

Once the proxy is setup, the "Add Liquidity" button will show you a form for
adding liquidity.

At this point, you might want to get some `USDC` so you can supply both assets
to the Balancer pool. Alternatively, Balancer also supports supplying only a
single-asset but that mechanism is out of scope for this tutorial.

Under the "All Pool Assets" tab, you should see something like this:

![deposit assets on balancer](/docs/users/ydbtc_bal-deposit.png)

As with any other ERC20 token, you'll have to "unlock" (i.e. grant approval) for
the dapp to transfer tokens on your behalf. Once you have done that, you can
deposit `YD-BTC-JUN21` and `USDC` into the Balancer pool in exchange for some Balancer
Pool Tokens (i.e. `BPT`) specific to this pool.

This enables you to passively gain `BAL` as well as `UMA`. If you have any questions regarding
this process, please don't hesitate to reach out on
[Discord](https://discord.umaproject.org/).
