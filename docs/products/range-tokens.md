---
title: Range Tokens
sidebar_label: Range Tokens
---

The range token enables a DAO or nascent project to use its native token as collateral to borrow funds. At maturity, if the debt is not paid, the range token holder is instead compensated with an equivalent amount of the collateral (the native token) using the settlement price of the native token to determine the number of tokens. 

A range token can be viewed similarly to convertible debt. In the venture capital world, convertible debt allows startup companies to receive funding today without issuing equity upfront.

## Example

For example, if the $UNI token is trading at $25 at settlement, a 100 USDC debt would be settled with 4 UNI (100 / 25). This is similar to a yield dollar or a CDP (collateralized debt position); however, there are a couple of added features.

A range token seller (the DAO in this case) cannot be liquidated and therefore, the number of tokens given to the range token holder is capped. The range token holder is effectively short a put option and will have exposure to the downside of the native token below a certain price. To compensate the range token holder for taking on this “default” risk, the holder is rewarded a call option on the native token. A minimum number of native tokens is given to the range token holder no matter how much the native token rallies. The combination of the structure creates a tradeoff between the seller and the buyer.

![](/docs/range-tokens/range_token_formula.png)

If the bounds of the range token are set to say $20 and $30, the payout amount in the native backing token (or UNI in this case) will increase as UNI's USD price gets closer to the lower bound and increase as it gets closer to the upper. In the previous scenario with a 100 USDC debt, the debt would be settled with 5 UNI if the trading price at settlement was $20 - (100 / 20) - and 3.33 tokens if the price was $30.

Within the bounds, the range token holder would always receive $100 worth of the native token at settlement, but beyond the bounds the range token holder is exposed to the price of the underlying token. The payout function looks like this:

![](/docs/range-tokens/range_token_payout.png)

## Why Should DAOs Mint Range Tokens?

There are many reasons why it is beneficial for DAOs to consider range tokens when diversifying their treasury and securing funds for their future operations.

- Range tokens allow DAOs to borrow funds without the risk of liquidation and utilizes their native token which dominates most of their treasury. In contrast, yield dollars and CDPs require borrowers to maintain a certain collateral ratio or face liquidation. Fighting against liquidation would be very detrimental for a DAO if the price of its native token drops aggressively and the DAO is forced to put a significant amount of its native token and treasury at risk. The embedded put in the range token prevents this potential dilution and protects the DAO’s existing token holders and community.
- DAOs should be happy to sell a call option because they are willing to sell their tokens at a higher valuation. Selling that optionality to the range token holder in return for downside protection as described above is a great trade off for the DAO.
- If the expectation is for the protocol to grow, a DAO would want to delay selling their native token and instead find a way to borrow off of these tokens now and sell fewer of them at a higher price in the future. This is the core strategy and purpose of the range token. The DAO is leveraging its treasury to delay the sale of their native tokens and to bet on its own success. This can be particularly effective for promising new projects who need funds now, but believe their token will be worth more in the future. This buys them time to build out their idea and prove to the market they deserve a premium.

## Getting Started

The process to launch and manage a range token on UMA is surprisingly simple.

1. Check to see if the collateral token, that you want to use to back your range token, is added as a supported collateral. You will also need a price identifier in the form of COLLATERAL_TOKEN/USD. Here are the currently supported [collateral types](/uma-tokenholders/approved-collateral-currencies) and [price identifiers](/uma-tokenholders/approved-price-identifiers). If these are not already approved, you can submit two [UMA Improvement Proposals](/uma-tokenholders/umips) (UMIPs) to have these supported.
2. Once these proposals are approved through UMA governance, you can launch your range token contract! This can be done in a few minutes by following the [LSP deployment tutorial](https://github.com/UMAprotocol/launch-lsp).
3. After your contract has been launched, you will be able to mint range tokens by locking collateral in the contract. Once minted, you can sell the long range tokens and hold onto the short range tokens. Short range tokens are just a tokenized version of overcollateralization in a minted position.

## Next Steps & Resources 

- Read these medium articles: [Treasury Diversification with Range Tokens](https://medium.com/uma-project/treasury-diversification-with-range-tokens-145d4b12614e), [Introducing UMA's Long Short Pair Financial Primitive](https://medium.com/uma-project/introducing-umas-long-short-pair-lsp-financial-primitive-84596803864f), [uLABS Range Tokens in Detail](https://medium.com/uma-project/ulabs-range-tokens-in-detail-f24ceffdf90b).
- Reach out to us if you have any questions. We’re available on Discord or at hello@umaproject.org. 