---
title: Range Tokens Summary
sidebar_label: Summary
---

The range token enables a DAO or nascent project to use its native token as collateral to borrow funds. At maturity, if the debt is not paid, the range token holder is instead compensated with an equivalent amount of the collateral (the native token) using the settlement price of the native token to determine the number of tokens. 

A range token can be viewed similarly to convertible debt. In the venture capital world, convertible debt allows startup companies to receive funding today without issuing equity upfront. The range token holder is effectively short a put option and will have exposure to the downside of the native token below a certain price. To compensate the range token holder for taking on this “default” risk, the holder is rewarded a call option on the native token. A minimum number of native tokens is given to the range token holder no matter how much the native token rallies. The combination of the structure creates a tradeoff between the seller and the buyer.

![](/docs/range-tokens/range_token_formula.png)

## Range Token Example

DAOs have become massive with some treasuries valued in the billions of dollars. However, the majority of these assets are in the native token of the project with only a fraction in liquid assets or stable coins. An example we will use throughout the range token sections is the [UMA range token](https://medium.com/uma-project/uma-raises-2-6mm-in-the-pilot-of-the-range-token-de5be578fa5e) (rtUMA-0821) contract that expired on August 31, 2021. The UMA treasury issued 0.25 $UMA as collateral for each range token with a `lowerBound` of $4 and an `upperBound` of $12.

The `lowerBound` of $4 and `upperBound` of $12 are important parameters for a range token as they determine the payout logic:
- If the $UMA price is above $12, the investor has long exposure to a $12 call option.
- If the $UMA price is below $4, the investor has exposure to a $4 put option.
- If the $UMA price is between $4 and $12, the payout is equivalent to a yield dollar and the number of $UMA shifts to keep the payout in dollar terms equal to the bond notional. 

The following chart demonstrates how the $1 debt will be settled in $UMA for rtUMA-0821 based on the UMAUSD price at expiration. Please note, the current price of $8 is to demonstrate the price between the `lowerBound` and `upperBound`.

![](/docs/range-tokens/uma_range_token_payout_table.png)

This is similar to a yield dollar or a CDP (collateralized debt position); however, a range token seller (the DAO in this case) cannot be liquidated and therefore, the number of tokens given to the range token holder is capped. The payout amount in the native backing token (or UMA in this case) increases as UMA's USD price gets closer to the lower bound and decreases as it gets closer to the upper. When the price is beyond the bounds, the range token holder is exposed to the price of the underlying token. The payout function looks like this:

![](/docs/range-tokens/uma_range_token_payout_example.png)

Another aspect to consider with range tokens is the price the range tokens are sold to investors. A DAO can generate interest from VC investors by selling the range token at a discount. The rtUMA-0821 contract was sold at 0.963 USDC, which is priced to have a 25% APY (annualized yield over the 2 months until expiry). Due to the discount, the following payouts were possible at expiry:
- If the $UMA price is above $12, the investor earns an effective APY higher than 25% (the investor has long exposure to a $12 call option);
- If the $UMA price is below $4, the investor earns an effective APY lower than 25% (the investor has short exposure to a $4 put option).
- If the $UMA price is between $4 and $12, the investor earned 25% APY paid in $UMA;

## Why Should Investors Buy Range Tokens?
Range tokens create a unique risk profile that best suits investors who believe in the long-term success of a project. Range tokens are especially suited for passive investors who are willing to buy the project token on a significant sell-off and potentially earn meaningful yield while waiting in the range. As well, a range token investor is not overly concerned about missing gains in a significant rally because they are rewarded a call option.

The general difference between buying the project token and the range token is that the project token provides immediate upside and downside exposure, whereas buying the range token pays a yield and only provides upside and downside exposure to the project token on significant moves. Investors can also get creative with the risk exposure of a range token by decomposing the parts. 

For example, an investor that is only looking for yield could buy the range token and sell out an equivalent call option to bet that the project token price will be relatively stable and in return, he/she would essentially collect the premium on the put option and earn a sizable yield. It is interesting to highlight that a range token buyer may not even care about the upside exposure to the project and just believes the project will exist until maturity and return a healthy yield. This is almost similar to a traditional finance investor buying a high yield corporate bond in the belief of its strong credit rating. In general, the range token opens up interesting risk profiles that are currently not available in DeFi.

## Why Should DAOs Mint Range Tokens?

There are many reasons why it is beneficial for DAOs to consider range tokens when diversifying their treasury and securing funds for their future operations.

- Range tokens allow DAOs to borrow funds without the risk of liquidation and utilizes their native token which dominates most of their treasury. In contrast, yield dollars and CDPs require borrowers to maintain a certain collateral ratio or face liquidation. Fighting against liquidation would be very detrimental for a DAO if the price of its native token drops aggressively and the DAO is forced to put a significant amount of its native token and treasury at risk. The embedded put in the range token prevents this potential dilution and protects the DAO’s existing token holders and community.
- DAOs should be happy to sell a call option because they are willing to sell their tokens at a higher valuation. Selling that optionality to the range token holder in return for downside protection as described above is a great trade-off for the DAO.
- If the expectation is for the protocol to grow, a DAO would want to delay selling their native token and instead find a way to borrow off of these tokens now and sell fewer of them at a higher price in the future. This is the core strategy and purpose of the range token. The DAO is leveraging its treasury to delay the sale of its native tokens and to bet on its own success. This can be particularly effective for promising new projects who need funds now, but believe their token will be worth more in the future. This buys them time to build out their idea and prove to the market they deserve a premium.