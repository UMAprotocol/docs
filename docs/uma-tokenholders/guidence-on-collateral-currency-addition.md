---
title: Guidance for the Addition of Collateral Currencies
sidebar_label: Guidance for the Addition of Collateral Currencies
---
Collateral currencies can be added through the collateral currency UMIP template available on Github, by adding 

 - the name of the token to the be added 
 - the contract address of the token  together with a link to the address on etherscan
 - the amount that should be added to the store as final fee expressed in units of the intended collateral currency.   
_This should equate to approximately $1500 at the time the UMIP is submitted.  If the token is not directly listed on Coingecko and/or Coinmarketcap, please add how the estimated dollar value of the token was obtained in the Rationale section._

***Note**: rebasing tokens should not be added as collateral currencies as they do not work with most registered UMA contracts*

____________
Below are some items to consider when using collateral currencies in an UMA contract. Note that these items do not necessarily need to be directly addressed in a collateral currency UMIP.

### Stablecoins

Consider carefully whether to treat stablecoins as their intended peg, or as the current market value.

UMA collateral types within most registered financial contracts are treated pricelessly. That is to say that a financial contract's price identifier does not necessarily take into account the USD denominated value of a stablecoin or other collateral. This means that a price in an UMA financial contract only determines the units of collateral that a synthetic token is worth.

Because of this, if it is wished to use a stablecoin as collateral and account for its fluctuations away from a $1 peg, the price identifier used should also account for the stablecoin's price in USD (or other fiat currency). As an example, an Expiring Multiparty contract that creates synthetic ETH with USDT as collateral will need to define a price identifier similar to the ETHUSD price identifier. With the ETHUSD price identifier defined as is and ETHUSD at 2500, each synthetic token will be worth 2500 USDT. If a contract deployer wishes to reflect the true ETHUSDT price, they will need to define a new price identifier that determines both the ETH/USD and the USD/USDT prices and multiplies the two.

### Non-traded tokens

Some tokens, such as interest bearing tokens or liquidity tokens may have no direct market, information on how the final store fee was calculated should be detailed in the rationale section to inform how a dollar value can be calculated for such a token which does not have a direct market price.    

If using such tokens in a contract which requires collateral monitoring, such as Expiring Multiparty Contracts (EMP), please ensure that there is a clear way for liquidity to be obtained should it be required.  It may be useful to add this information to the UMIP, under the security section.

### Liquidity

When there is little liquidity for a token, or where there is a low ratio of tokens available on the market compared with protocol treasury stores, care should be taken in using this collateral currency in a contract and developers should investigate the distribution schedule when considering its use.

### Bridged tokens
 
To be accepted as a collateral currency, there must be some availability of the token on Ethereum mainnet. 
 
Where the majority of the liquidity is available on another chain, including a sidechain, the UMIP should identify bridges where the collateral currency can be obtained. Note that any token and contract address added should be the ERC20 version, (not the token on the native chain)

Developers considering using such a currency for a contract that requires collateral monitoring should ensure that these bridges are robust enough to obtain sufficient collateral currency should it be required for liquidations. 
