---
title: Securing the Oracle
sidebar_label: Securing the Oracle
slug: /Optimistic Oracle
---

Successful liquidations and disputes are rewarded, incentivizing bots to run on the UMA system continually checking the collateralisation ratios of token sponsors.

To initiate a liquidation, a liquidator must post a predefined bond to indicate the size of the position to be liquidated and close the token sponsor’s position, as well as to cover the cost of calling the DVM should the liquidation be disputed.  If it is not disputed, the bond is returned to the liquidator together with the liquidated token sponsor’s collateral.

After a liquidation event has occurred, there is a defined period of time in which a dispute over the liquidation can be raised.  In such an instance, a disputer would post a dispute bond, indicating that they wished this liquidation to be resolved by the DVM.

Should the DVM determine that the position was under-collateralised and the liquidation was correct, the liquidator would receive both the liquidation bond, the dispute bond and the token holders’ collateral.   If it is determined that the position was properly collateralised and the liquidation was correct, the dispute bond would be returned together with a dispute reward, while the liquidator received the value of the tokens less the dispute reward and improper liquidation reward, and the token sponsor would receive their collateral, less the value of the tokens, together with an additional improper liquidation reward.
