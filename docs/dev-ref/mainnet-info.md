---
title: Mainnet Deployment Information
sidebar_label: Mainnet Info
---

## Current DVM Parameters

The current DVM parameters are as follows. The parameters can be adjusted via
the introduction of a new [UMIP](uma-tokenholders/umips.md).

DVM Parameter  | Value | Description 
------------- | ------------- | ------------- 
Inflation percentage per vote | 0.05% | The token supply is inflated on each resolved vote. If the inflation rate is 5%, then that 5% is split pro-rata amongst those who voted correctly. This means that on a per-voter basis, the rewards are >= 5% (i.e. you get more if fewer people vote).
GAT | 5% | This is the minimum % of tokens that need to participate in a vote for the vote to resolve and not be rolled to the next round of voting. This cannot be changed without upgrading Voting.sol.
Voting phase length | 24 hours | Commit and reveal are phases, so this means a _round_ of voting will take twice as long as a phase. This cannot be changed without upgrading Voting.sol.
Contract tax rate per annum | 0% |
Tax delay penalty per week | 0% |

## Approved Collateral Types and Price Identifiers:

- To view a list of approved price identifiers, go [here](/uma-tokenholders/adding-price-id#list-of-approved-price-identifiers).
- To view a list of approved collateral types, go [here](/uma-tokenholders/adding-price-id#list-of-approved-collateral-currencies).

<!-- ## Approved Financial Contract Templates:

- ExpiringMultiPartyCreator:
  [0xddfC7E3B4531158acf4C7a5d2c3cB0eE81d018A5](https://etherscan.io/address/0xddfC7E3B4531158acf4C7a5d2c3cB0eE81d018A5)
- ExpiringMultiPartyCreator (deprecated):
  [0xB3De1e212B49e68f4a68b5993f31f63946FCA2a6](https://etherscan.io/address/0xB3De1e212B49e68f4a68b5993f31f63946FCA2a6)
- ExpiringMultiPartyCreator (deprecated):
  [0xad8fD1f418FB860A383c9D4647880af7f043Ef39](https://etherscan.io/address/0xad8fD1f418FB860A383c9D4647880af7f043Ef39)
- ExpiringMultiPartyCreator (deprecated):
  [0xdebB91Ab3e473025bb8ce278c02361A3C4f13124](https://etherscan.io/address/0xdebB91Ab3e473025bb8ce278c02361A3C4f13124) -->
