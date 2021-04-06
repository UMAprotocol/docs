---
title: Synthetic Tokens

sidebar_label: Understanding Synthetic Tokens
---

Synthetic tokens are collateral-backed tokens whose value fluctuates depending on the tokens’ reference index. Synthetic tokens blend features of prediction markets, futures markets, and collateralized loans.

Some examples of synthetic tokens include:

* Synthetic real-world assets (eg: gold or Tesla stock price)
* Synthetic cross-chain cryptoassets
* Tracking tokens for various non-tradable indices

Some of the most creative ideas for synthetic tokens fall in the last category. Check out the discussion on Discord for more project ideas like:

* Tokens that track the future usage of DeFi projects (e.g. assets locked in Uniswap)
* Tokens that track the number of downloads of a Chrome extension (e.g. Metamask)
* Tokens that track the success of trade ideas on r/WallStreetBets

By changing the price identifier of a priceless synthetic token, you can create synthetic tokens that behave like tokenized versions of other derivatives, like options.

## Priceless Synthetic Tokens

The first type of priceless contract developers can use on UMA is for creating synthetic tokens.

Priceless synthetic tokens are synthetic tokens that are securely collateralized without an on-chain price feed. These tokens are designed with mechanisms to incentivize token sponsors (those who create synthetic tokens) to properly collateralize their positions. These mechanisms include a liquidation and dispute process that allows individuals running liquidator bots to be rewarded for identifying improperly collateralized [token sponsor](synthetic-tokens/glossary.md#token-sponsor) positions. The dispute process relies on an optimistic oracle, the UMA [DVM](synthetic-tokens/glossary.md#dvm), to settle disputes regarding liquidations.

To ensure that the rewards for liquidations and disputes are economical (i.e. worth the gas/transaction cost to liquidate or dispute), deployers of this financial contract template can set a minimum sponsor size.

This is the minimum number of tokens that a token sponsor must have created against the contract.
Any action that would reduce a token sponsor's position to below this threshold is disallowed and will revert.

This includes partial liquidations that leave the sponsor's position smaller than the minimum size, token redemptions that bring the position below the minimum size, and new position creations that request to mint fewer than the minimum number of tokens.

## Launching a Priceless Synthetic Token

To launch a new type of synthetic token for which an existing market does not yet exist, the synthetic token’s smart contract needs to be be parameterized and deployed.

By using UMA's priceless synthetic token contract template, developers can easily deploy a new synthetic asset by defining a few key parameters and using an approved UMA contract factory. Some parameters to highlight are:

- Token’s [price identifier](synthetic-tokens/glossary.md#price-identifier) (the price feed this token should track)
- Token expiration timestamp
- Token [collateralization requirement](synthetic-tokens/glossary.md#collateralization-requirement) (e.g. a synthetic token must have collateral worth at least 120% of the price indentifier’s current value)

This [tutorial](/build-walkthrough/mint-locally) will show you how to parameterize and deploy the smart contract for a new synthetic token from the command line.


### The ExpiringMultiParty (EMP) Contract Template

One can write priceless financial contract templates to create various kinds of financial products. The first type of synthetic contracts on UMA is used for creating expiring synthetic tokens and is called the ExpiringMultiParty (EMP) contract.

The EMP allows token sponsors (i.e., people who mint new synthetic tokens) to collateralize their position in a defined collateral currency. Anytime after the EMP’s expiration date, any synthetic tokenholder can redeem their tokens for a settlement value, which is denominated in the collateral currency and fixed to the price of the EMP contract’s price identifier at the expiration timestamp. The price determining the settlement value is resolved by UMA’s oracle contract, the “DVM”.

This is only the first example of a synthetic token implementation, and is by no means restrictive on the types of synthetic tokens that could be built on UMA's infrastructure.

View [here](synthetic-tokens/expiring-synthetic-tokens.md) to learn more about UMA's EMP contract.

### The Perpetual Contract Template

Another contract template approved for use on UMA is the perpetual, which can be used to create synthetic tokens that follow the upward and downward price movement of any asset without an expiration date.

Like the EMP, the perpetual allows token sponsors to collateralize their position in a defined collateral currency and track the price of a different asset through a defined price feed. The synthetic token can be redeemed by token sponsors at any time for its value in the underlying collateral, and the synthetic token's value relative to the underlying collateral is nudged up or down through a funding rate mechanism. By changing the value of the synthetic, the funding rate mechanism effectively pays the token sponsor a fee when the price being tracked goes down, and pays the token holder a fee when the price being tracked goes up.

It is important to note that the price of the synthetic will not precisely mirror the price being tracked, just like the price of a gold ETF does not precisely mirror the price of gold. Through the funding rate mechanism, however, the value of the synthetic should go up or down proportionally alongside the price being tracked.

New funding rates can be proposed through the optimistic oracle, and token sponsor liquidations will take into account both the price being tracked and the cumulative funding rate to determine whether the sponsor has enough collateral. Like liquidations, funding rates can be disputed and settled by UMA token holders through the DVM.


## Additional Resources

Here are some additional resources to better understand how the priceless synthetic token contract works:

- [Blog post](https://medium.com/uma-project/priceless-synthetic-tokens-f28e6452c18b)
- [Twitter thread](https://twitter.com/UMAprotocol/status/1242891550872535042?s=20)
- [Github implementation](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/financial-templates/expiring-multiparty)
