---
title: Mint and Farm uUSDwETH
sidebar_label: Mint and Farm uUSDwETH
---

This tutorial will show you how to mint `uUSDwETH` and farm them on a Balancer pool
to get `BAL` and also `UMA` tokens via the experimental UMA liquidity mining
program. It's a simple two-step process and should take you no longer than a few
minutes (subject to network congestion).

### Useful Links

- [EMP Tools link for `uUSDwETH-DEC`](https://tools.umaproject.org/?address=0x3605Ec11BA7bD208501cbb24cd890bC58D2dbA56)
- [CoinGecko listing for `uUSDwETH-DEC`](https://www.coingecko.com/en/coins/uusd-synthetic-token-expiring-31-december-2020)
- [Balancer Pool for `uUSDwETH-DEC/USDC`](https://pools.balancer.exchange/#/pool/0xcce41676a4624f4a1e33a787a59d6bf96e5067bc/)

## Step 1: Mint uUSDwETH

Minting uUSDwETH tokens is easy with the [EMP Tools](http://tools.umaproject.org/),
UMA's UI for ExpiringMultiParty contracts (EMP) which is what the yUSD token is
minted from.

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/users/emp_connect.png)

Then, select the `uUSDwETH` contract from the dropdown immediately underneath the
header (above the tabs).

![select EMP](/docs/users/emp_select.png)

Select the "Manage Position" tab.

![manage position tab](/docs/users/emp_manage-position.png)

Scroll down to the "Actions" dropdown and ensure that "Create" is selected.

![position actions dropdown](/docs/users/emp_actions.png)

At this point, make sure you read the text and confirm that:

1. You will be minting at a collateralization ratio above the global
   collateralization ratio (GCR);
2. You will be minting the minimum required number of tokens (100 for `uUSDwETH`),
   and;
3. You will keep your position collateralized above the minimum required
   collateralization ratio (CR) or else risk getting liquidated (the required CR
   is 125% for `uUSDwETH`).

If you fully understand the above, and have decided on an appropriate amount of
(1) collateral to supply and (2) tokens to mint, check to make sure you have
enough collateral for minting.

In the case of `uUSDwETH`, the collateral you need is [WETH](https://weth.io/),
which is just ETH with an ERC20 interface. If you do not have a sufficient
balance of WETH, you can easily convert your ETH to WETH via the “Wrap/Unwrap
WETH” tab.

You may skip this step if you already have sufficient WETH.

![weth converter](/docs/users/emp_weth.png)

Once you have enough WETH to use as collateral, return to the "Manage Position"
tab and scroll down to the form at the bottom of the page:

![token minting form](/docs/users/emp_form.png)

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `uUSDwETH` tokens!

## Step 2: Farm on Balancer

:::danger

Supplying _only_ `USDC` to the pool will result in auto-purchasing `uUSDwETH` at the current price. This means you are market-buying `uUSDwETH`, so be mindful of the trading price of `uUSDwETH` before doing this.

:::

By supplying liquidity to the `uUSDwETH/USDC` Balancer pool, you have the
opportunity to earn both `BAL` and `UMA` tokens. The `UMA` token distribution is
governed by the experimental UMA liquidity mining program.

Head to the `uUSDwETH/USDC`
[pool](https://pools.balancer.exchange/#/pool/0xcce41676a4624f4a1e33a787a59d6bf96e5067bc/)
and click on the "Add Liquidity" button. You’ll be asked to Setup Proxy if you
haven’t already

![add liquidity button on balancer](/docs/users/bal_add-liquidity.png)

Once the proxy is setup, the "Add Liquidity" button will show you a form for
adding liquidity.

At this point, you might want to get some `USDC` so you can supply both assets
to the Balancer pool. Alternatively, Balancer also supports supplying only a
single-asset but that mechanism is out of scope for this tutorial.

Under the "All Pool Assets" tab, you should see something like this:

![deposit assets on balancer](/docs/users/bal_deposit.png)

As with any other ERC20 token, you'll have to "unlock" (i.e. grant approval) for
the dapp to transfer tokens on your behalf. Once you have done that, you can
deposit `uUSDwETH` and `USDC` into the Balancer pool in exchange for some Balancer
Pool Tokens (i.e. `BPT`) specific to this pool.

This enables you to passively gain `BAL` as well as `UMA` in accordance to the
experimental UMA liquidity mining program. If you have any questions regarding
this process, please don't hesitate to reach out on
[Discord](https://discord.umaproject.org/).

NB: The screenshots are outdated but the same logic applies. There has been a name change from yUSD to uUSDwETH.
