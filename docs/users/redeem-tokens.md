---
title: Redeeming Expired Tokens
sidebar_label: Redeeming Expired Tokens
---

Once a token has expired, tokenholders will likely want to redeem the tokens
they hold for the amount of collateral that they are entitled to. The easiest
way to redeem is via [EMP Tools](https://tools.umaproject.org) and this tutorial
will walk you through how to do so.

First, ensure that MetaMask is activated and connected to an account holding the
relevant expired tokens. Then navigate to http://tools.umaproject.org/ and click
the "Connect" button at the top right corner to connect your MetaMask wallet to
the dapp.

![connect](/docs/users/emp_connect.png)

In the dropdown, select the relevant token that you hold.

![select EMP](/docs/users/emp_select.png)

Select the Manage Position tab.

![manage position tab](/docs/users/emp_manage-position.png)

If the token has expired, there should only be one option named "Settle" in the
Actions dropdown.

![manage position tab](/docs/users/redeem_settle.png)

The description here is self-explanatory, but it bears repeating that by
redeeming your tokens, you will get the equivalent amount in collateral, where
the conversion rate (or settlement price) is determined at the point of expiry.

Click the "Settle" button once you are ready to redeem your tokens. This might
require you to approve the smart contract to move your tokens on your behalf. Once the transaction is processed by the Ethereum blockchain, you should no
longer have any more of the expired token but you will have gained the
equivalent in collateral.

The [link](synthetic-tokens/explainer.md#redeeming-after-expiry) in the
screenshot is worth reading if you want to learn more about expiry.
