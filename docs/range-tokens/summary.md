---
title: Range Tokens Summary
sidebar_label: Summary
---

The range token enables a DAO or nascent project to use its native token as collateral to borrow funds. At maturity, if the debt is not paid, the range token holder is instead compensated with an equivalent amount of the collateral (the native token) using the settlement price of the native token to determine the number of tokens. 

A range token can be viewed similarly to convertible debt. In the venture capital world, convertible debt allows startup companies to receive funding today without issuing equity upfront. The range token holder is effectively short a put option and will have exposure to the downside of the native token below a certain price. To compensate the range token holder for taking on this “default” risk, the holder is rewarded a call option on the native token. A minimum number of native tokens is given to the range token holder no matter how much the native token rallies. The combination of the structure creates a tradeoff between the seller and the buyer.

![](/docs/range-tokens/range_token_formula.png)

## Range Token Example

DAOs have become massive with some treasuries valued in the billions of dollars. However, the majority of these assets are in the native token of the project with only a fraction in liquid assets or stable coins. An example of a project using range tokens would be if the Uniswap treasury decided to use $UNI tokens as collateral to borrow USDC. The treasury could create the following terms for the range token contract:
- The Uniswap treasury issues 8 $UNI as collateral for each range token.
- The Uniswap treasury borrows 100 USDC for each range token.
- Parameters are set for the range token to have a lower bound of $12.50 and an upper bound of $40.

If the $UNI token is trading within $12.50 and $40 at settlement, the range token holder will always receive a constant dollar payout of $100 in the native token. The following chart demonstrates how the $100 debt will be settled in $UNI:

![](/docs/range-tokens/range_token_payout_example.png)

This is similar to a yield dollar or a CDP (collateralized debt position); however, a range token seller (the DAO in this case) cannot be liquidated and therefore, the number of tokens given to the range token holder is capped. The payout amount in the native backing token (or UNI in this case) increases as UNI's USD price gets closer to the lower bound and decreases as it gets closer to the upper. When the price is beyond the bounds, the range token holder is exposed to the price of the underlying token. The payout function looks like this:

![](/docs/range-tokens/range_token_payout.png)

## Why Should Investors Buy Range Tokens?
Range tokens create a unique risk profile that best suits investors who believe in the long-term success of a project. Range tokens are especially suited for passive investors who are willing to buy the project token on a significant sell-off and potentially earn meaningful yield while waiting in the range. As well, a range token investor is not overly concerned about missing gains in a significant rally because they are rewarded a call option.

The general difference between buying the project token and the range token is that the project token provides immediate upside and downside exposure, whereas buying the range token pays a yield and only provides upside and downside exposure to the project token on significant moves. Investors can also get creative with the risk exposure of a range token by decomposing the parts. 

For example, an investor that is only looking for yield could buy the range token and sell out an equivalent call option to bet that the project token price will be relatively stable and in return, he/she would essentially collect the premium on the put option and earn a sizable yield. It is interesting to highlight that a range token buyer may not even care about the upside exposure to the project and just believes the project will exist until maturity and return a healthy yield. This is almost similar to a traditional finance investor buying a high yield corporate bond in belief of its strong credit rating. In general, the range token opens up interesting risk profiles that are currently not available in DeFi.

## Why Should DAOs Mint Range Tokens?

There are many reasons why it is beneficial for DAOs to consider range tokens when diversifying their treasury and securing funds for their future operations.

- Range tokens allow DAOs to borrow funds without the risk of liquidation and utilizes their native token which dominates most of their treasury. In contrast, yield dollars and CDPs require borrowers to maintain a certain collateral ratio or face liquidation. Fighting against liquidation would be very detrimental for a DAO if the price of its native token drops aggressively and the DAO is forced to put a significant amount of its native token and treasury at risk. The embedded put in the range token prevents this potential dilution and protects the DAO’s existing token holders and community.
- DAOs should be happy to sell a call option because they are willing to sell their tokens at a higher valuation. Selling that optionality to the range token holder in return for downside protection as described above is a great trade-off for the DAO.
- If the expectation is for the protocol to grow, a DAO would want to delay selling their native token and instead find a way to borrow off of these tokens now and sell fewer of them at a higher price in the future. This is the core strategy and purpose of the range token. The DAO is leveraging its treasury to delay the sale of their native tokens and to bet on its own success. This can be particularly effective for promising new projects who need funds now, but believe their token will be worth more in the future. This buys them time to build out their idea and prove to the market they deserve a premium.