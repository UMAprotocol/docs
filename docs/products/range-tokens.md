---
title: Range Tokens
sidebar_label: Range Tokens
---

The range token enables a DAO or nascent project to use its native token as collateral to borrow funds. At maturity, if the debt is not paid, the range token holder is instead compensated with an equivalent amount of the collateral (the native token) using the settlement price of the native token to determine the number of tokens. 

A range token can be viewed similarly to convertible debt. In the venture capital world, convertible debt allows startup companies to receive funding today without issuing equity upfront.

## Example

For example, if the native token is trading at $25 at settlement, a 100 USDC debt would be settled with 4 tokens (100 / 25). This is similar to a yield dollar or a CDP (collateralized debt position); however, there are a couple of added features.

A range token seller (the DAO in this case) cannot be liquidated and therefore, the number of tokens given to the range token holder is capped. The range token holder is effectively short a put option and will have exposure to the downside of the native token below a certain price. To compensate the range token holder for taking on this “default” risk, the holder is rewarded a call option on the native token. A minimum number of native tokens is given to the range token holder no matter how much the native token rallies. The combination of the structure creates a tradeoff between the seller and the buyer.


## Getting Started

The process to launch and manage a range token on UMA is surprisingly simple.

1. Check to see if the collateral token, that you want to use to back your range token, is added as a supported collateral. You will also need a price identifier in the form of COLLATERAL_TOKEN/USD. Here are the currently supported [collateral types](/uma-tokenholders/approved-collateral-currencies) and [price identifiers](/uma-tokenholders/approved-price-identifiers). If these are not already approved, you can submit two [UMA Improvement Proposals](/uma-tokenholders/umips) (UMIPs) to have these supported.
2. Once these proposals are approved through UMA governance, you can launch your range token contract! This can be done in a few minutes by following the [LSP deployment tutorial](https://github.com/UMAprotocol/launch-lsp)
3. After your expiring contract has been launched, you will be able to mint range tokens by locking collateral in the contract. Once minted, you can sell the long range tokens and hold onto the short range tokens.

## Next Steps & Resources 

- Read these medium articles: [Treasury Diversification with Range Tokens](https://medium.com/uma-project/treasury-diversification-with-range-tokens-145d4b12614e), [Introducing UMA's Long Short Pair Financial Primitive](https://medium.com/uma-project/introducing-umas-long-short-pair-lsp-financial-primitive-84596803864f), [uLABS Range Tokens in Detail](https://medium.com/uma-project/ulabs-range-tokens-in-detail-f24ceffdf90b).
- Reach out to us if you have any questions. We’re available on Discord or at hello@umaproject.org. 