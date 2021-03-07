
## HEADERS
| UMIP [#]     |                                                                                                                                  |
|------------|------------------------------------------------------------------------------------------------------------------------------------------|
| UMIP Title | [Key Performance Indicator; Total Value Locked UMA Price Identifier                                                                                                  |
| Authors    | [Mhairi McAlpine mhairi@umaproject.org]
| Status     | [Draft]                                                                                                                                   |
| Created    | [4th March 2021] 
| Link to Discourse    | [LINK to be added]                                                                               
<br>
<br>
<br>

# SUMMARY 

Key Performance Indicator(KPI) options are synthetic tokens that redeem to protocol tokens with the redemption value determined by performance against that indicator. One example of a KPI is Total Value Locked (TVL).  

This UMIP enables the DVM to support price requests based on the TVL of UMA

A synthetic option is minted against a base collateral, in this case UMA, which expires at 00.00(UTC) June 30th 2021.

Options are redeemed on the basis of TVL/10^8, with a floor of 0.1 and a ceiling of 2.

The value locked is calculated using the available existing TVL dashboards.  


# MOTIVATION

The primary motivation for the development of KPI options is to allow protocols to incentivise Defi users to assist them to reach the protocol's identified targets by leveraging their community resources by sharing their value with their community members.  

Total Value Locked(TVL) is a frequently quoted key performance indicator and one which has a level of prominence in key Defi dashboards as an indicator of the health of a protocol.  Within UMA, TVL plays the additional function of being the lower floor for the value of 0,5 $UMA, due to the design of UMA and the COC>POC inequality.

1. What are the financial positions enabled by creating this synthetic that do not already exist?

  - The DVM does not currently support any form of KPI options.  This synthetic token will allow the creation of tokens which expire to a set rate of the collateral asset tokens based on a pre-identified bounded ratio as determined by the TVL of the protocol at the time of expiry.

2. Please provide an example of a person interacting with a contract that uses this price identifier. 

 - A protocol may choose to leverage its community and/or its reputation by minting TVL Options for its token which can be redeemed to a token amount as determined by the TVL of the protocol at the expiry point.
 - A protocol community member, tokenholder, voter or proximal Defi prtocol participant may be gifted a TVL option by a protocol as an incentive to build the TVL of the protocol within the option timeframe and redeem at expiry.
 - Any user may purchase a TVL Option for a protocol that they believe has the potential for growth in TVL prior to expiry.   

3. The current TVL of UMA is approximately $83m as at 21.30(UTC) 5th March 2021.

<br> 

# MARKETS & DATA SOURCES

There are a variety of assets approved as Collateral within UMA's priceless contracts.
A list of these assets is [available on our docs site](https://docs.umaproject.org/uma-tokenholders/approved-collateral-currencies). 

There are currently two dashboards which are tracking the TVL of UMA contracts. 
[Simple ID](https://monitor.simpleid.xyz/d/x4CYPILGk/uma?orgId=1)
[Yuen] (https://docs.google.com/spreadsheets/d/e/2PACX-1vSEMURxiVQuu6jSDp2zmI7kdKKaJjgmhWNiVjwStyJekDx9hWgclKzm_yv9iyj82IRP4d9dZ8rgvCCB/pubhtml#)

These dashboards already query the contracts to determine the collateral locked, calculate a dollar value for each of the collateral types and sum the locked capital.





 **Required questions**

1. What markets should the price be queried from? It is recommended to have at least 3 markets.

No need to directly query markets as SimpleID dashboard and Yuen already track these

2.  Which specific pairs should be queried from each market?
	The “total value locked” statistic should be queried.  This will return a dollar value.

3. Provide recommended endpoints to query for real-time prices from each market listed. 

	No need to query markets directly

4. How often is the provided price updated?
	Simple ID - 15 seconds
	YUEN - 10 minutes.

5. Provide recommended endpoints to query for historical prices from each market listed. 

    	No need to directly query markets.

6.  Do these sources allow for querying up to 74 hours of historical data? 

No, however there is no requirement for ongoing data.

7.  How often is the provided price updated?

   Simple ID - 15 seconds
YUEN - 10 minutes.

8. Is an API key required to query these sources? 
NO.




9. Is there a cost associated with usage? 

NO

10. If there is a free tier available, how many queries does it allow for?

    - Unlimited

11.  What would be the cost of sending 15,000 queries?

Free

<br>

# PRICE FEED IMPLEMENTATION

As there is no requirement for ongoing monitoring through liquidation or dispute bots, a price feed is not required.  The only requirement is a query of the UMA TVL statistic at the timestamp 00.00(UTC) on 30th June according to the data and markets as defined above.

<br>

# TECHNICAL SPECIFICATIONS

**1. Price Identifier Name** - uTVL_KPI_UMA

**2. Base Currency** - uTVL_UMA. 

**3. Quote currency** - There is no quote currency, the denominator is fixed at 10^8 (100 Million)

- If your price identifier is a currency pair, your quote currency will be the
denominator of your currency pair. If your price identifier does not have a quote currency, please explain the reasoning behind this.

This price identifier does not have a quote currency as it is designed not to be tied to a currency price metric,.

- Please be aware that the value of any UMA synthetic token is the value of the price identifier in units of the collateral currency used. If a contract’s price identifier returns 1, and is collateralized in renBTC, each synthetic will be worth 1 renBTC. In most cases, the value of your quote currency and intended collateral currency should be equal.

- The collateral redemption is designed to be tied to the value of the TVL of the protocol by design.

**4. Intended Collateral Currency** - UMA

- Does the value of this collateral currency match the standalone value of the listed quote currency? 

    - No.  This is a design feature.

- Is your collateral currency already approved to be used by UMA financial contracts? If no, submit a UMIP to have the desired collateral currency approved for use. 

YES - UMA was approved as a collateral currency in[UMIP 56](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-56.md) 

**5. Collateral Decimals** - 18


**6. Rounding** - Round to 2 decimal places.

 - If the price is 1.025, then this would be rounded up to 1.03. If the price is 1.0249999, then this would be rounded down to 1.02.
 - if the value returned is less than 0.05 round up to 0.1 to provide a floor price.
 - if the value returned is greater that 2 round down to 2 to provide a ceiling price. 

<BR>

# RATIONALE

- This synthetic is designed as an incentivisation mechanism to leverage the UMA community, our partners and the wider Defi userbase to grow our protocol as measured by our identified Key Performance Indicator of Total Value Locked. 

This price identifier offers a guarantee that these options will be of value, even if this key metric is poor through the floor price mechanism, however the nature of UMA is such that the amount of value that can be locked in the protocol is potentially limitless and consequently a ceiling price is required to limit provide a cap.

The TVL is obtained through third party dashboards which are tracking UMA contracts.  Direct calculation of the calculation of the dollar value of collateral contracts is onerous.  There are two dashboards already publicly available which monitor TVL.  Although they calculate the dollar value slightly differently, the difference is negligible and will have minimal impact. 

Direct calculations of dollar value based on the processing method set out in previous price identifier UMIPs was considered but rejected as onerous and overly precise.  However UMA will work with Yuen and SimpleID to encourage them to monitor all contracts and obtain the dollar value of the collateral locked in a way that is consistent with pre-existing UMIPs. 



<br>

# IMPLEMENTATION

If there is a dispute as to the accuracy of the figures from the SimpleID or Yuen pricefeed, these can be confirmed through on-chain queries of the amount of value locked in each of the contracts running on UMA, calculating the dollar value as laid out in the relevant UMIPs and summing the results to obtain the total value locked.



1. **What prices should be queried for and from which markets?**

  -Total Value Locked (TVL), obtained from the SimpleID Dashboard
 - Total Value Locked (TVL) obtained from the Yuen Dashboard.



2. **Pricing interval**

    - 15 seconds.

3. **Input processing**

    - The mean of the TVL from the SimpleID Dashboard and the Yuen Dashboad should be taken to obtain a final TVL statistic.  There should not be a high discrepancy between them.

4. **Result processing** 

    - TVL/10^8

<br>

# Security considerations

1. Where could manipulation occur?

Manipulation could occur at the SimpleID dashboard level or on the Yuen dashboard level, either in the amount of collateral locked or in the dollar calculation of the value of that collateral
This can be checked on-chain in the case of a dispute.

2. How could this price ID be exploited?

 - It is possible that as expiry approaches, a user may be able to purchase a large number of TVL option on the open market, should the TVL be significantly below the level required to achieve the ceiling level, then add large amounts of collateral to an UMA contract slightly before expiry to temporarily drive up the TVL, redeem the synthetic tokens, then withdraw liquidity immediately afterwards.

 - It is also possible that a user may purchase UMATVL at a low price, lock substantial amounts of collateral in UMA contracts causing the TVLUMA price to rise, then sell the UMATVL tokens at a profit and withdraw the liquidity.
  

3. Do the instructions for determining the price provide people with enough certainty?

YES

4. What are current or future concern possibilities with the way the price identifier is defined?

It appears that neither of the dashboards are monitoring all of the contracts currently running on UMA, and that they calculate the dollar value of the TVL slightly differently
It is likely that new forms of collateral will be approved prior to the expiry date.  These need to be added into the Yuen or SimpleID Dashboards.

5. Are there any concerns around if the price identifier implementation is deterministic?



