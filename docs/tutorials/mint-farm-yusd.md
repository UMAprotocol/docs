---
title: Mint yUSD tokens
sidebar_label: Mint yUSD tokens
---

This tutorial will show you how to mint `yUSD` tokens. It's a simple process and
should take you no longer than a few minutes (subject to network congestion).

## Using the EMP Tools UI

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

## What now?

Once you have some `yUSD`, you can trade them on Balancer
[here](https://balancer.exchange/#/swap/0x81ab848898b5ffd3354dbbefb333d5d183eedcb5/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).

If you have any questions regarding this process, please don't hesitate to reach
out on [Discord](https://discord.umaproject.org/).
