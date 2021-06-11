###Guidance for the Addition of Collateral Currencies

Collateral currencies can be added through the collateral currency UMIP template available on Github, by adding 
 - the name of the token to the be added 
 - the contract address of the token  together with a link to the address on etherscan
 - the amount that should be added to the store as final fee expressed in units of the intended collateral currency.   This should equate to approximately $400 at the time the UMIP is submitted.

***Note**: rebasing tokens cannot be added as collateral currencies as they do not work with UMA's factory contracts*

____________
The below provides some guidelines when using collateral currencies in an UMA contract

**Stablecoins**
Consider carefully whether to treat stablecoins as their intended peg, or as the current market value.

**Non-traded tokens**
Some tokens, such as interest bearing tokens or liquidity tokens may have no direct market.  

If using such tokens in a contract which requires collateral monitoring, such as the EMP, that there is a clear way for liquidity to be obtained should it be required.  It may be useful to add this to the UMIP, under the security section.

**Volitility**
Where a proposed collateral type has high volitility, a higher store fee than the recommended $400 may be appropriate.

If this is the case, this should be noted in the rationale section.

**Liquidity**
When there is little liquidity for a token, or where there is a low ratio of tokens available on the market compared with protocol treasury stores, care should be taken in using this collateral currency in a contract and developers should investigate the distribution schedule when considering its use.

 **Bridged tokens**
 To be accepted as a collateral currency, there must be some availablilty of the token on the ethereum chain. 
 
 Where the majority of the liquidity is available on another chain, including a sidechain, the UMIP should identify bridges where the collateral currency can be obtained. 

Developers considering using such a currency for a contract that requires collateral monitoring should ensure that these bridges are robust enough to obtain sufficient collateral currency should it be required for liquidations. 

