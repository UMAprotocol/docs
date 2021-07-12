---
title: Guidance for the Addition of Price Identifiers
sidebar_label: Guidance for the Addition of Price Identifiers
---

Formulating a real-life problem and use case is a good starting point for designing a product to fit market requirements. One can get highly valued feedback by initiating community discussion before the launch of the product. Involve your project community and discuss your idea at UMA Discourse [Ideas Bank](https://discourse.umaproject.org/c/ideas-bank/23) to get started.

This guide covers relevant design considerations and standard practices useful when writing a price identifier UMIP for your product.

## Design Considerations

Even though technically, a price identifier is not tied to any specific application and once approved, can be used by any requester contract - it still might be a good idea to consider the requirements of the application, plan how all the building blocks would fit together and how that should be reflected in the particular price identifier UMIP.

Depending on the type of product one could choose among financial contract templates developed by UMA (e.g. [EMP contracts](/synthetic-tokens/expiring-synthetic-tokens.md) for liquidatable sponsor positions or [LSP contracts](/synthetic-tokens/long-short-pair.md) for un-liquidatable capped-payout applications) or develop Optimistic Oracle integration customized for the particular product. LSP contracts coupled with application-specific financial product libraries as well as Optimistic Oracle integration contracts currently allow for greater customization options that can handle all payout logic; hence the price identifier UMIP can be more lightweight focusing only on how to resolve raw input data (e.g., asset price for call options or TVL or another metric for KPI options). When multiple resolvable input parameters are required (e.g., for expected volatility index calculations), the application logic should still be detailed in the UMIP.

Whenever possible, it is advised to avoid putting hardcoded parameters in the price identifier UMIP and utilize the ability of LSP contracts to set custom ancillary data. This would allow building sequential products (e.g., repeating KPI options campaigns) or even multiple similar products without the need to go through the UMIP approval process for each product launch. While EMP contracts currently cannot use custom ancillary data, they still can be coupled with a financial product library to either switch among different price identifiers (e.g., based on timestamp) or add some post processing logic to resolved price (e.g., deriving call option payout based on underlying price). To generalize, ancillary data should be used for input parameters (e.g., time, processing method, specific data sources to use, etc.) that guide voters on how to arrive at raw pricing value, while financial product library can be used for any calculation logic that should be applied on top of the result resolved by the voters.

## Detail of Instructions

Depending on the product use case, one might choose among different levels of detail for voter instructions on arriving at the requested price. To ensure that voters can resolve the requested price and do it at the required precision level (e.g. for trading products), it is advised to precisely layout all the data sources, suggested API endpoints, detailed instructions for any calculation logic, and result processing. On the other hand, some of the products might require a more flexible approach or even allow for voter subjectivity (e.g., insurance products). However, it might be helpful to include some guidance on resolving the request and providing a default response if the request cannot be resolved conclusively.

## Markets

When evaluating the reliability of markets, liquidity and volume should be considered. Where applicable and available, it is advised to include at least three reliable markets for voters to fetch raw pricing data to ensure a proper redundancy level. Still, one should also check the exchange reputation in question as there have been reports on some crypto exchanges over-reporting their volumes so that only genuine market data is used for serving price requests. All the considerations on selecting particular markets should be discussed in the "Rationale" section of the price identifier UMIP.

When launching a product that relies on relatively new underlying asset pricing, it might be the case that fewer than suggested reliable markets are available. This should then be thoroughly discussed in the "Security considerations" section of the price identifier UMIP and voters, should be provided with a path forward on the possibility to redefine the particular price identifier markets once the liquidity migrates across other platforms. Any re-definition can be done via off-chain social consensus by UMA holders and ultimately reflected in how they vote upon the relevant price requests. To ensure smooth re-definition of markets, UMIP writers could also include some guidance on choosing alternative markets. Note that this also could apply to established underlying asset markets if liquidity flows to other markets over time. As it might be impossible to predict all possible development scenarios, one could provide more general guidance to voters, giving them leeway to evaluate external events and determine whether the calculated price from specified sources differs from broad market consensus.

## Data Access Points

Generally, it is advised to include original data sources voters should use when processing the price request. In cases where it might be more convenient to use information aggregators (e.g., due to complex computation logic or need to provide a caching server for historical data), it can be done by being transparent on the methodology used by any centralized data access points used. It will also be viewed favorably by the UMA community (and increase guarantees of resolving a price request) if the UMIP reviewers and voters are empowered to access the source code to verify that any aggregator API server provides correct results.

## Price Protection Processing

Under illiquid market conditions, an attacker could attempt to manipulate the price and exploit liquidatable financial contracts by either withdrawing more collateral than usually allowed or triggering liquidations of well-collateralized positions. Even though UMA DVM can override attempted market manipulation, there is no guarantee that it would spot a well-masqueraded attack and distinguish it from genuine market movement. To mitigate the risk of attempted price manipulation, one could introduce some processing mechanism like calculating a TWAP or VWAP, imposing price bands, etc. For example, with TWAP, an attacker would have to manipulate the trading price of an asset for an extended amount of time, making these attacks ineffective and requiring the attacker to use significantly more capital and take more risk to exploit any vulnerabilities.

Though one should be wary of applying TWAP or using it for extended time periods, any genuine market movement could put the calculated TWAP out of sync with spot price and create attack opportunities on liquidatable financial contracts. Also, one should be careful when calculating price through other assets as any mismatch in TWAP periods could introduce unintended side effects. Hence, when there is only ETH market for the token and ETH/USD pricing is required to derive token USD price, it has been common practice in approved UMIPs to multiply ETH/USD spot price with token price in ETH with short TWAP periods (maximum 5 to 15 minutes).

Whenever the liquidity of available markets allows it, it is generally advisable to use reliable spot prices and avoid price protection processing (e.g., TWAP) as that would put the burden on DVM voters to perform complex calculations and diminish the guarantees of efficient price resolution. It has been common practice in approved UMIPs to use TWAP processing only for crypto pairs in AMM pools and limit that to 1 to 60 minutes depending on pool size except for self-referential price identifiers primarily using two-hour TWAP periods.

## Rounding

When deciding on rounding precision, it is suggested to target an acceptable margin of error for the product and then derive rounding decimal places based on the current pricing value (also consider its inverse value if covered by the price identifier). Normally 0.01% margin of error should be more than sufficient. Adding unnecessary precision could potentially complicate reaching consensus in voting, especially if human intervention is required where the result from defined data sources differs from broad market consensus. It has been common practice in approved UMIPs to use between 6 and 8 decimals for crypto pairs, with the exception of some AMM pool tokens that require greater precision. For some of the KPI option price identifiers tracking total value locked, it might also be suitable to either scale down raw USD value or round the value to the closest thousands/millions/billions/etc. in order to avoid unnecessary precision.

## Self-referential Price Identifiers

UMA-based products can create tokenized futures contracts on the expected spot price (or expected median/weighted average price over some defined period) that require the use of a self-referential price identifier that tracks the price from AMM pool for the minted synthetic token using the same price identifier. Some of earlier UMIPs had to include the switching logic on the price calculation instructions pre/post-expiration; UMA’s latest financial product template versions now allow to split them into different price identifiers using the switching logic in the financial product library.

One should be cautioned that even with more extended TWAP periods and high collateralization ratios, self-referential price identifiers are somewhat dangerous by design. Without a large amount of starting liquidity in the referenced synth's pool, the product could become risky sponsors could be quickly liquidated. Hence, if the product does not require liquidatable positions (e.g., covered call options), it is advised to avoid a self-referential price identifier and use LSP contracts to settle payout based on expiration pricing.

## Ancillary Data Specification

Suppose the intended financial contract template supports setting custom ancillary data (e.g., LSP contracts). In that case, it is preferable to use this functionality to avoid hardcoding specific parameters (e.g., crypto pair or markets to resolve) that allow building multiple products utilizing the same price identifier UMIP.

Even though technically, ancillary data can be set to anything provided it fits into the 8192 bytes limit enforced by the Voting smart contract, it should still be parsable by Voter dApps, and voters should interpret it to resolve the price request effectively. Hence UMIP writers should follow the ancillary data specification listed below:

* It must display an arbitrary # of price request parameters that can be used to instruct voters how to resolve a given price request for an identifier and timestamp.
* It must be easily appendable at the smart contract level so that different smart contracts can append data to the ancillary data. For example, if the initial ancillary data is `competition:World Cup,date:07-09-2024,match:FRA-ESP`, then the financial contract might want to append `requester:<CONTRACT-ADDRESS>`. This stamping of the requester address allows the DVM to combat parasitic usage.
* It should be parsed in bytes and, if any step fails, then voter dApps will default to displaying raw byte data:
  * Convert bytes to UTF8;
  * Delimit UTF8 string by "," (commas) into a list of key-value pairs;
  * Each key-value pair can be further delimited by ":", colons. The author of the UMIP for the associated identifier is free to define how the values in these key-value pairs should be formatted in UTF8. For example, one identifier might want dates in MM/DD/YYYY format, and another might want them in UNIX time;
  * Key-value pairs, where keys are only different by trailing incrementing natural numbers, can be combined into arrays;

