---
title: How UMA Works
sidebar_label: How UMA works
---

To create a synthetic token, developers use UMA's priceless synthetic contract templates to easily deploy the new contract. To manage and enforce contracts, the contracts leverage UMA's optimistic oracle known as the Data Verification Mechanism (DVM). Below explains how contracts are managed and enforced on UMA. 

## Managing Token Sponsor Positions

During the lifetime of the synthetic token, token sponsors (people who create new synthetic tokens) may want to deposit additional collateral to their positions to avoid liquidation. Sponsors may also want to withdraw excess collateral if the position has moved in their favor.

Token sponsors can deposit additional collateral at any time.

![](/docs/synthetic-tokens/st_add_collateral.png)

Token sponsors can withdraw excess collateral in one of two ways: a “fast” withdrawal or “slow” withdrawal.

### “Fast” withdrawal:

A “fast” withdrawal allows a token sponsor to withdraw excess collateral from his position immediately, so long as the resulting position is collateralized by at least as much as the [global collateralization ratio](synthetic-tokens/glossary.md#global-collateralization-ratio-gcr) (GCR). Requiring withdrawals to result in collateralization at least as high as the GCR provides some assurances that so long as the other token sponsors collateralized below the GCR have not yet been liquidated, this token sponsor should not be liquidated after making this withdrawal.

![](/docs/synthetic-tokens/st_withdraw_collateral.png)

### “Slow” withdrawal:

If the token sponsor wishes to withdraw collateral from his position that would bring his collateralization below the global collateralization ratio, he can do so via a “slow” withdrawal. Because withdrawing this amount of collateral could potentially jeopardize the solvency of the fungible synthetic tokens, this “slow”, 2-part, withdrawal process allows other tokenholders to flag if a withdrawal would render the token sponsor insolvent.

In a “slow” withdrawal, there are two parts:
The token sponsor submits a withdrawal request to the contract indicating the amount of collateral he wishes to withdraw and the timestamp of the request.

During this period, any tokenholder can liquidate the token sponsor’s position if they believe a withdrawal of the amount indicated in the withdrawal request would bring the token sponsor’s collateralization below the “[collateralization requirement](synthetic-tokens/glossary.md#collateralization-requirement)” at the time of liquidation.
If the “[withdrawal liveness period](synthetic-tokens/glossary.md#withdrawal-liveness-period)” passes without a tokenholder liquidating the token sponsor, the token sponsor may withdraw collateral from his position up to the amount requested.

## Liquidation and Dispute

At any time, a tokenholder may liquidate a token sponsor’s position. Liquidations happen immediately without calling the oracle. Anyone may dispute a liquidation within the “[liquidation liveness period](synthetic-tokens/glossary.md#liquidation-liveness-period)”.

To liquidate a token sponsor position, a tokenholder submits tokens to the contract and posts a liquidation bond.
The liquidation bond covers the cost of calling the DVM if the liquidation is disputed.
If the liquidation is not disputed, the liquidation bond is returned to the liquidator.
The tokens are submitted for 3 purposes: to indicate the size of the position to be liquidated, to close the token sponsor’s position, and to attest to the liquidator’s belief that the token sponsor’s position should be liquidated.
The liquidator will lose a portion of the collateral corresponding to the tokens if their liquidation is disputed and found to be invalid.

Here are three ways in which a liquidation can be resolved:

1. No one disputes the liquidation during the liquidation liveness period. After the liquidation liveness period ends, collateral deposited by the token sponsor is returned to the liquidator, proportional to the number of synthetic tokens the liquidator has submitted in liquidation. As a numerical example, assume a token sponsor has deposited 150 DAI of collateral to create 100 synthetic tokens, which they then sold to the market. Later, a liquidator submits 30 synthetic tokens to liquidate the token sponsor. If no one disputes the liquidation, the liquidator will receive 30% of the token sponsor’s collateral, or 45 DAI.

![](/docs/synthetic-tokens/st_liquidation_1.png)

2. Someone disputes the liquidation during the liquidation liveness period. To do this, the disputer must post a bond. Once the dispute is raised, a price request is made to the UMA [DVM](synthetic-tokens/glossary.md#dvm). This price request will return the value of the price identifier at the time of the liquidation, which will determine if the token sponsor was undercollateralized and resolve the "dispute".

- If the price returned by the DVM indicates that the token sponsor was undercollateralized at the time of the liquidation:
  - The disputer will lose their bond.
  - The liquidator will receive all of the token sponsor position’s collateral.
  - The token sponsor will not receive any of the collateral they have previously deposited into the position.
    ![](/docs/synthetic-tokens/st_liquidation_2.png)
- If the price returned by the [DVM](synthetic-tokens/glossary.md#dvm) indicates that the token sponsor was not undercollateralized at the time of the liquidation:
  - The disputer will receive back their dispute bond and a dispute reward.
  - The liquidator will receive collateral equalling: (i) the value of the token at the time of liquidation as determined by the DVM, less (ii) the dispute reward paid to the disputer, less (iii) the improper liquidation reward paid to the original token sponsor.
  - The token sponsor will receive any remaining collateral and a reward for the improper liquidation.
    ![](/docs/synthetic-tokens/st_liquidation_3.png)

A table summarizing these payouts is below:

|                                        | Token Sponsor                                                              | Liquidator                                                     | Disputer                      |
| -------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------- |
| Liquidation was not disputed           | 0                                                                          | Token Sponsor's collateral + Liquidator bond                   | 0                             |
| Token Sponsor was over-collateralized  | Token Sponsor's collateral - Value of tokens + Improper liquidation reward | Value of tokens - Dispute reward - Improper liquidation reward | Dispute bond + Dispute reward |
| Token Sponsor was under-collateralized | 0                                                                          | Token Sponsor's collateral + Dispute bond + Liquidator bond    | 0                             |

## Redeeming Tokens

Before the expiration date of the token, tokens may only be redeemed by token sponsors. A token sponsor redeems a token by submitting it to the contract to be burned and receiving collateral proportional to the total amount of collateral that the token sponsor has deposited to the contract.

![](/docs/synthetic-tokens/st_redeem_token.png)

Consider the following example. Assume a token sponsor has deposited 150 DAI of collateral to create 100 synthetic tokens, which they then sold to the market. Later, the token sponsor repurchases 30 tokens and decides to redeem them. These 30 tokens represent 30% of the token sponsors original position, so by redeeming them the token sponsor receives 30% of their initial collateral, or 45 DAI (since 30% \* 150 = 45).

### Redeeming After Expiry

After the expiration timestamp for the synthetic tokens, anyone may settle the contract. This calls on the UMA [DVM](synthetic-tokens/glossary.md#dvm) to return the value of the token’s price identifier at the expiration timestamp.

After this value is returned to the contract and the contract is settled, any tokenholder can redeem the tokens against the contract. Redemption of the tokens returns the tokenholder collateral equal to the [price identifier](synthetic-tokens/glossary.md#price-identifier) value returned by the UMA DVM.

![](/docs/synthetic-tokens/st_expiration.png)