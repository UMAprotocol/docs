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
- The percentage issued as collateral versus the embedded call option. The `basePercentage` parameter is set on deployment and determines the percentage of collateral that is set as the floor versus the embedded call option. If `basePercentage` is set to 40%, then 40% of the success token would act as collateral with 60% functioning as an embedded covered call.

The success token payout calculation uses these parameters to determine the following payout at expiry:

![](/docs/success-tokens/success-token-payout.png)

If the expiration price is below the strike price, the investor only receives the collateral. If the expiration price is above the strike price, the call option pays investors an additional amount demonstrated as the bonus value below: 

![](/docs/success-tokens/success-graph.png)

## Success Token Example

An example contract we will refer to throughout the success token sections is a success token issued by the UMA treasury (stUMA-1221) with several VC investors that agree to create a success token which combines 1 $UMA token with 1 $15 strike $UMA call option using a `basePercentage` of 50%. 

The value of the success token would depend on the UMAUSD price at expiry:
- If the price is less than $15, each long is worth 0.5 $UMA because the embedded call option expires worthless.
- If the price expired at $20, the success token would be calculated using 0.5 + ( 1 - 0.5 ) \* ( $20 - $15 ) / $20 ) = 0.625 $UMA per success token. Therefore, 1 $UMA with a $20 expiry price would be worth $12.50 ( $20 \* .625 ) which is equivalent to 0.5 $UMA plus the value of the $15 strike embedded call. If instead the price at expiry was $30, the success token would be calculated using 0.5 + ( 1 - 0.5 ) \* (( $30 - $15 ) / $30 ) = 0.75 $UMA per success token. Therefore, 1 $UMA with a $30 expiry price would be worth $22.50 ( $30 * .75 ).

## Why Should Investors Buy Success Tokens?

- Success tokens provide VC investors the kind of risk and upside exposure potential they are looking for without forcing a DAO to sell tokens at a discount. With DAOs paying the VC investor a bonus in the form of a call option, it provides a strong incentive for VC investors.
- Success tokens allow more flexibility for VC investors to negotiate terms with a DAO along with an increased likeliness of the deal being well received by communities. 

## Why Should DAOs Mint Success Tokens?

- DAOs should be happy to sell a call option because they are willing to sell their tokens at a higher valuation. Selling that optionality to the success token holder in return for downside protection is a great trade-off for the DAO.
- Success tokens allow DAOs to borrow funds without the risk of liquidation and utilizes their native token which dominates most of their treasury. In contrast, yield dollars and CDPs require borrowers to maintain a certain collateral ratio or face liquidation. Fighting against liquidation would be very detrimental for a DAO if the price of its native token drops aggressively and the DAO is forced to put a significant amount of its native token and treasury at risk.
- Success tokens can give the DAO access to VC capital and expertise which helps projects succeed without selling their tokens at a discount.