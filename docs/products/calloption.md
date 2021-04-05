---
title: Call Options
sidebar_label: Call Options
---
A call options is a building block for the derivatives market. It gives the buyer the right but not the obligation to buy the asset at a specific price (strike) at a specific time. 

This page will detail how to create your own call options and layout a few reasons why you would want to create call options.

## How options work

A trader buys a call option with a strike price of 2,000 USD for 0.05 ETH. Now he has the right to buy 1 ETH for 2,000 USD. At the expiry, ETH/USD is at 2,500 USD, and the delivery price is 2,500 USD.

In this case, the option is settled for 500 USD per 1 ETH. At the expiry, the trader’s account is credited with 0.2 ETH (500/2,500), and the seller’s account is debited with 0.2 ETH. The initial purchase price was 0.05 ETH; therefore, the trader’s profit is 0.15 ETH.
Any call option with an exercise price (strike price) above 2,500 USD will expire worthless.

If the price of the option was less than $2000 the option will expire worthless. The payout function can be seen as:

![Diagram](/img/option_payout.png)


## Create your own options

Using UMA's infrastructure a team can create a call option using our EMP contract template. These would allow a team to create European style options which are only redeemable at the time of expiry. 

To create your own options you can make use of one of the currently approved [price identifiers](/uma-tokenholders/approved-price-identifiers.md) and [collateral types](uma-tokenholders/approved-collateral-currencies.md). 

With the contracts being cash settled and the terms of the contract being constant throughout, the need to manage your position or run liquidation bots is not needed. 

## Reasons to use call options

There are a number of reasons for call options in the traditional financial world. Some of the reasons translate to the DeFi space as well as open new uses cases such as: 

**Leveraged Speculation** — The simplest use for a long call position is the ability to speculate on the appreciation of an asset with leverage while also limiting your downside. To obtain the right to be long 1 ETH at a price of 2000 in our example above, the token holder only needs to pay 5% of an ETH. However, the flip side to that is the value of the option will depreciate or decay very quickly to zero if it does not trade above the strike price.

**Strategic DeFi Project Uses** — Many DeFi projects have distributed their governance tokens either via air drops or through liquidity mining or developer mining programs. The one downside is many recipients of the tokens may not be long term community members and instead are just looking to sell (or dump) the tokens which cause a depression in the token price. Distributing a mix of governance tokens and call options tokens instead could help prevent that immediate selling and also incentivize holders of the options to become a member of the community and help support the project.

**Better Airdrops and Farms** - Options are a popular form of compensation because they align incentives. A token economics benefit is that they only result in sell pressure if the market is bullish. A certain price target is set by the deployer, and option recipients can only cash out if the token price exceeds the strike price at expiry.

**Better Bounties** - Community managers can control a “slush fund” of call options to pay out to community contributors. The same is true for bounty payouts. Some combination of options and base tokens would guarantee a minimum payout with variable upside. Because these tokens expire, they are well suited to gig work that requires re-upping.

## Additional Resources 

- [Call Options Part 1](https://medium.com/uma-project/ulabs-building-call-options-on-uma-part-1-efd3188714c5)
- [Call Options Par 2](https://medium.com/uma-project/uma-call-options-now-live-da8dcf080319)
- [Call options the 2x4 lego block](https://medium.com/uma-project/call-options-on-uma-the-2x4-lego-3b63e0d489f3)
- Reach out to us along the way if you have any questions. We’re available on Discord or at hello@umaproject.org