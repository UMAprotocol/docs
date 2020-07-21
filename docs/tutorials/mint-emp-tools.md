---
title: Mint and Farm yUSD via EMP Tools
sidebar_label: With EMP Tools
---

Minting yUSD tokens is easy with the [EMP Tools](http://tools.umaproject.org/),
the UI for ExpiringMultiParty contracts (EMP). This tutorial will show you how
to mint some `yUSD` and then farm those tokens on a Balancer pool.

## Minting

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![](/docs/tutorials/emp_connect.png)

Then, select the `yUSD` contract from the dropdown immediately underneath the
header (above the tabs).

![](/docs/tutorials/emp_select.png)

Select the "Manage Position" tab.

![](/docs/tutorials/emp_manage-position.png)

Scroll down to the "Actions" dropdown and ensure that "Create" is selected.

![](/docs/tutorials/emp_actions.png)

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

![](/docs/tutorials/emp_weth.png)

Once you have enough WETH to use as collateral, return to the "Manage Position"
tab and scroll down to the form at the bottom of the page:

![](/docs/tutorials/emp_form.png)

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `yUSD` tokens!

## Farming

Now that you have some `yUSD` tokens, you can farm them on the `yUSD/USDC`
Balancer pool for `BAL`.

In order to this, head to the `yUSD/USDC` pool (link will be here when pool is
ready) and click on the "Add Liquidity" button. You’ll be asked to Setup Proxy
if you haven’t already

![](/docs/tutorials/bal_add-liquidity.png)

Once the proxy is setup, the "Add Liquidity" button will show you a form for
adding liquidity. If you have `USDC` that you want to deposit as well, you can
do it under the "All Pool Assets" tab. Otherwise, you might just want to deposit
`yUSD`, in which case you should choose the "Single Asset" tab:

![](/docs/tutorials/bal_single-asset.png)

As with any other ERC20 token, you'll have to "unlock" (i.e. grant approval) for
the dapp to transfer tokens on your behalf. Once you have done that, you can
deposit liquidity into the Balancer pool and passively gain `BAL`.

## Help

If you have any questions regarding this process, please don't hesitate to reach
out to us on [Discord](https://discord.umaproject.org/).
