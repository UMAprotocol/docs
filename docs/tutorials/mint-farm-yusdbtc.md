---
title: Mint and Farm yUSDBTC
sidebar_label: Mint and Farm yUSDBTC
---

This tutorial will show you how to leverage your `BTC` holdings to earn `BAL`,
`UMA`, and `REN` tokens.

### Useful Links

- [EMP Tools link for `yUSDBTC-NOV20`]()
- [CoinGecko listing for `yUSDBTC-NOV20`]()
- [Balancer Pool for `yUSDBTC-NOV20/USDC`]()
- [RenBridge Project](https://bridge.renproject.io/)

This is a three-part process:

1. First you will wrap your `BTC` into `renBTC` so that it is usable on the
   Ethereum blockchain.
2. Then you can use `renBTC` to mint `yUSD` tokens on the UMA protocol.
3. Depositing `yUSD` into a Balancer pool will give you the ability to earn
   `BAL`, `REN`, and `UMA` tokens.

## Step 1: Wrapping BTC into renBTC

Wrapping BTC into renBTC is possible using [RenBridge](https://bridge.renproject.io/), a decentralized application (dApp) that allows individuals to mint real BTC, ZEC, and BCH on Ethereum as an ERC20 (renBTC, renZEC, renBCH).

Navigate to https://bridge.renproject.io/ and click the `Connect` button at the top right corner to connect your MetaMask wallet to the dapp.

![connect](https://github.com/henrystats/docs/blob/master/static/img/renBTC%20guide%20pic%201.png)

Enter the amount of bitcoin you would like to wrap into renBTC,

![amount](https://github.com/henrystats/docs/blob/master/static/img/renBTC%20guide%202.png)

then, click `Next` 

![next](https://github.com/henrystats/docs/blob/master/static/img/renBTC%20guide%204.png)

then click `confirm`. Before doing this, make sure you verify all the details in the modal.

Check that you are minting(wrapping) BTC, as Renbridge allows you to wrap other coins like Zen and BCH

`Destination` should be your Metamask wallet address, this is where your renBTC will be sent to.

Also check the cost (`RenVM fee`, `Bitcoin Network fee`) and the amount of renBTC you will be receiving.

Once you have done all of this, you can then go ahead and click `confirm`.

![confirm](https://github.com/henrystats/docs/blob/master/static/img/renBTC%20guide%203.png)

A one-time deposit address is generated for you to send your BTC to. Send the exact amount of BTC you are wrapping to that address, in a single transaction.

![deposit](https://github.com/henrystats/docs/blob/master/static/img/Screenshot%20(142).png)

* Your transaction requires 6confirmations(can take up to 1hour) before renBTC is sent to your wallet 
* You will need to accept & sign the transaction that sends renBTC to your wallet.



## Step 2: Minting yUSD with renBTC

Minting yUSD tokens is easy with the [EMP Tools](http://tools.umaproject.org/),
UMA's UI for ExpiringMultiParty contracts (EMP) which is what the yUSD token is
minted from.

Navigate to http://tools.umaproject.org/ and click the "Connect" button at the
top right corner to connect your MetaMask wallet to the dapp.

![connect](/docs/tutorials/emp_connect.png)

Then, select the `yUSDBTC` contract from the dropdown immediately underneath the
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

![token minting form](/docs/tutorials/emp_form.png)

In the first field, fill in the amount of collateral you want to supply.

In the second field, fill in the number of tokens you want to mint.

If these values are appropriate, you can then click the "Create" button which
will trigger a transaction with MetaMask. Once that is confirmed and the
transaction is mined, you shall have your `yUSD` tokens!

## Step 3: Farming yUSD on Balancer

:::danger

Supplying _only_ `USDC` to the pool is very dangeorus and is not recommended,
because you are essentially buying `yUSD` on the open market. You should avoid
this because `yUSD` will be worth
$1 by the time of expiry and you will lose
money if you are buying `yUSD` above $1.

:::

By supplying liquidity to the `yUSD/USDC` Balancer pool, you have the
opportunity to earn `BAL`, `REN` and `UMA` tokens. The `UMA` token distribution
is governed by the experimental UMA liquidity mining program.

[INSERT LINK TO RENBTC LIQUIDITY MINING PROGRAM BLOG POST]

Head to the `yUSD/USDC` [pool]() and click on the "Add Liquidity" button. You’ll
be asked to Setup Proxy if you haven’t already

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

This enables you to passively gain `BAL`, `REN` and `UMA` tokens in accordance
to the experimental UMA liquidity mining program. If you have any questions
regarding this process, please don't hesitate to reach out on
[Discord](https://discord.umaproject.org/).
