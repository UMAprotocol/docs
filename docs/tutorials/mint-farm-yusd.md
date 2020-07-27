---
title: Mint and Farm yUSD
sidebar_label: Mint and Farm yUSD
---

This tutorial will show you how to mint `yUSD` and farm them on a Balancer pool
to get `BAL` and also `UMA` tokens via the experimental UMA liquidity mining
program. It's a simple two-step process and should take you no longer than a few
minutes (subject to network congestion).

### Useful Links

- [EMP Tools link for `yUSD-SEP20`](https://tools.umaproject.org/?address=0xb56C5f1fB93b1Fbd7c473926c87B6B9c4d0e21d5)
- [CoinGecko listing for `yUSD-SEP20`](https://www.coingecko.com/en/coins/yusd-synthetic-token-expiring-1-september-2020)
- [Balancer Pool for `yUSD/USDC`](https://pools.balancer.exchange/#/pool/0x58EF3abAB72c6C365D4D0D8a70039752b9f32Bc9)

## Step 1: Mint yUSD

Minting yUSD tokens is easy with the [EMP Tools](http://tools.umaproject.org/),
UMA's UI for ExpiringMultiParty contracts (EMP) which is what the yUSD token is
minted from.

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/tutorials/emp_connect.png)

Then, select the `yUSD` contract from the dropdown immediately underneath the
header (above the tabs).

![select EMP](/docs/tutorials/emp_select.png)

Select the "Manage Position" tab.

![manage position tab](/docs/tutorials/emp_manage-position.png)

Scroll down to the "Actions" dropdown and ensure that "Create" is selected.

![position actions dropdown](/docs/tutorials/emp_actions.png)

At this point, make sure you read the text and confirm that:

1. You will be minting at a collateralization ratio above the global
   collateralization ratio (GCR);
2. You will be minting the minimum required number of tokens (100 for `yUSD`),
   and;
3. You will keep your position collateralized above the minimum required
   collateralization ratio (CR) or else risk getting liquidated (the required CR
   is 125% for `yUSD`).

If you fully understand the above, and have decided on an appropriate amount of
(1) collateral to supply and (2) tokens to mint, check to make sure you have
enough collateral for minting.

In the case of `yUSD`, the collateral you need is [WETH](https://weth.io/),
which is just ETH with an ERC20 interface. If you do not have a sufficient
balance of WETH, you can easily convert your ETH to WETH via the “Wrap/Unwrap
WETH” tab.

You may skip this step if you already have sufficient WETH.

![weth converter](/docs/tutorials/emp_weth.png)

Once you have enough WETH to use as collateral, return to the "Manage Position"
tab and scroll down to the form at the bottom of the page:

![token minting form](/docs/tutorials/emp_form.png)

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `yUSD` tokens!

## Step 2: Farm on Balancer

:::danger

Supplying _only_ `USDC` to the pool is very dangeorus and is not recommended,
because you are essentially buying `yUSD` on the open market. You should avoid
this because `yUSD` will be worth $1 by the time of expiry and you will lose
money if you are buying `yUSD` above $1.

:::

By supplying liquidity to the `yUSD/USDC` Balancer pool, you have the
opportunity to earn both `BAL` and `UMA` tokens. The `UMA` token distribution is
governed by the experimental UMA liquidity mining program.

Head to the `yUSD/USDC`
[pool](https://pools.balancer.exchange/#/pool/0x58EF3abAB72c6C365D4D0D8a70039752b9f32Bc9)
and click on the "Add Liquidity" button. You’ll be asked to Setup Proxy if you
haven’t already

![add liquidity button on balancer](/docs/tutorials/bal_add-liquidity.png)

Once the proxy is setup, the "Add Liquidity" button will show you a form for
adding liquidity.

At this point, you might want to get some `USDC` so you can supply both assets
to the Balancer pool. Alternatively, Balancer also supports supplying only a
single-asset but that mechanism is out of scope for this tutorial.

Under the "All Pool Assets" tab, you should see something like this:

![deposit assets on balancer](/docs/tutorials/bal_deposit.png)

As with any other ERC20 token, you'll have to "unlock" (i.e. grant approval) for
the dapp to transfer tokens on your behalf. Once you have done that, you can
deposit `yUSD` and `USDC` into the Balancer pool in exchange for some Balancer
Pool Tokens (i.e. `BPT`) specific to this pool.

This enables you to passively gain `BAL` as well as `UMA` in accordance to the
experimental UMA liquidity mining program. If you have any questions regarding
this process, please don't hesitate to reach out on
[Discord](https://discord.umaproject.org/).
