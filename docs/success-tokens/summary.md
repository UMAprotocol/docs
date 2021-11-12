---
title: Success Tokens Summary
sidebar_label: Summary
---

Success tokens offer an alternative way for DAOs to diversify their treasury and sell tokens to investors in an incentive-aligned way. Success tokens are two tokens wrapped in one: a project token with a call option on that token.

This means that instead of offering tokens to the investor at a discount, the investor is offered a call option alongside their token purchase. The option portion is only valuable if the project rallies, which better aligns incentives and the investor only gets their “bonus” if the project performs well, which of course benefits the whole community.

## Success Token Parameters

Before contract deployment, the following parameters should be negotiated between a DAO and investors:
- The strike price of the call option.
- The expiry date.
- The price at which the success token is sold.
- The amount of project tokens that should be sold per success token. In the graphic below, this is referenced as `Number of Project Tokens`. 
- The amount of project tokens backing each covered call option per success token. In the graphic, this is referenced as `Call Option Collateral`.

The success token payout calculation uses these parameters to determine the following payout at expiry:

![](/docs/success-tokens/success-token-payout2.png)

If the expiration price is below the strike price, the investor only receives the project token and does not receive any portion of the collateral backing the covered call option. If the expiration price is above the strike price, the call option pays investors an additional amount demonstrated as the bonus value below: 

![](/docs/success-tokens/success-graph.png)

## Success Token Example

An example contract we will refer to throughout the success token sections is a success token issued by the UMA treasury (stUMA-1221) with several VC investors that agree to create a success token which combines 1 $UMA token with a $15 strike $UMA call option backed by 0.5 $UMA tokens. 

The value of the success token would depend on the UMAUSD price at expiry:
- If the price is less than $15, each long is worth 1 $UMA, because the embedded call option expired worthless.
- If the price expired at $30, the success token value in UMA would be calculated using 1 + (( 0.5 ) \* ( $30 - $15 ) / $30 ) = 1.25 $UMA per success token. In dollar value, 1 stUMA-1221 with a $30 expiry price would be worth $30.00 * 1.25 = $37.50.

## Why Should Investors Buy Success Tokens?

- Success tokens provide investors the kind of risk and upside exposure potential they are looking for without forcing a project or DAO to sell tokens at a discount. Investors are receiving compensation for capital lock up time in the form of a call option instead of a token discount. This provides a strong incentive for investors to participate in the projects growth, while also giving the investor a large amount of upside. This is a win/win situation for both parties involved, where the investor is *only* specially compensated if the project succeeds.
- Success tokens allow more flexibility for investors to negotiate terms with a DAO along with an increased likeliness of the deal being well received by decentralized communities. 

## Why Should DAOs Use Success Tokens?

- DAOs should be happy to sell a call option because they are willing to sell their tokens at a higher valuation. Selling that optionality to the success token holder in return for downside protection is a great trade-off for the DAO.
- Success tokens allow DAOs to borrow funds without the risk of liquidation and utilizes their native token which dominates most of their treasury. In contrast, yield dollars and CDPs require borrowers to maintain a certain collateral ratio or face liquidation. Fighting against liquidation would be very detrimental for a DAO if the price of its native token drops aggressively and the DAO is forced to put a significant amount of its native token and treasury at risk.
- Success tokens can give the DAO access to VC capital and expertise which helps projects succeed without selling their tokens at a discount.