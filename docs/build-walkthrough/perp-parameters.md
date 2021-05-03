---
title: Perpetual Parameterization
sidebar_label: Perpetual Parameterization
---


## Mandatory EMP Parameters
- `collateralAddress`: Collateral token address.
- `priceFeedIdentifier`: Price identifier to use. E.g. `ETHBTC_FR`
- `fundingRateIdentifier`: Funding rate to use.
- `syntheticName`: The name of your sythetic token in long format. E.g. `Perp Test ETHBTC`
- `syntheticSymbol`: Short name or ticker of the sythetic token. E.g. `ETHBTC_perp`.
- `collateralRequirement`: Set the  collateral requirement for all contract positions. It is recommended to always be above 125%.
- `disputeBondPercentage`: How much of the disputed liquidation has to be put up as a bond scaled to 18 decimals. E.g. 10% dispute bond.
- `disputerDisputeRewardPercentage`: The percentage size of the dispute reward paid to the disputer scaled to 18 decimals. 
- `liquidationLiveness`: 7200, // 2 hour liquidation liveness.
- `withdrawalLiveness`: 7200 // 2 hour withdrawal liveness.
  };