---
title: KPI Options
sidebar_label: KPI Options
---

Key Performance Indicator (KPI) options are synthetic tokens that will pay out more rewards if a project’s KPI reaches predetermined targets before a given expiry date. Every KPI option holder has an incentive to improve that KPI because their option will be worth more. This is intended to align individual token holder interests with the collective interests of the protocol.

Using UMA’s [Expiring Multi Party](/synthetic-tokens/what-are-synthetic-assets#the-expiringmultiparty-emp-contract-template) (EMP) contract template and [Optimistic Oracle](/getting-started/oracle.md), any project can create their own KPI Option tokens. These can be backed by any approved ERC-20 token and can be valued against any KPI that a project wants to improve! 

## Getting Started

The process to launch a KPI options contract on UMA is surprisingly simple. No on-chain price feed or smart contract development is ever required. This is the typical process that you will need to follow to launch your own.

1. You should submit two [UMA Improvement Proposals](/uma-tokenholders/umips) (UMIPs). The first should add your governance token as a supported collateral type. The second should define a methodology for how the UMA Optimistic Oracle should price your KPI options.
2. Once these proposals are approved through UMA governance, you can launch your expiring KPI Options contract! This can be done in a few minutes by following the [EMP deployment tutorial](/developers/emp-deployment).
3. After your expiring contract has been launched, you will be able to mint KPI tokens by locking collateral in the contract. Once minted, you can airdrop these KPI tokens in whatever manner and to whoever you wish.
4. Upon contract expiry, the KPI Options will be redeemable for an amount determined by your KPI’s progress. Alternatively, your project could decide to “roll over” into new KPI options to attempt to compound your KPI’s growth.

## Why UMA?

- UMA has a flexible expiring contract template which allows anyone to launch a large variety of expiring contracts with little to no development work.
- Our unique [oracle solution](/getting-started/oracle) allows for an optimistic and economically incentivized decentralized solution to an otherwise, corruptible centralized oracle. It also offers a large amount of flexibility, where not all prices need to be programmatically retrieved!
- You get paid to build on UMA! As part of UMA’s developer mining program, you will be paid $UMA rewards for any value locked in your KPI Options contract. This could be passed on as extra rewards to airdrop recipients, or used to fund future development work.

## Next Steps & Resources 

- Read this [medium article](https://medium.com/uma-project/uma-kpi-options-and-airdrop-bae86be16ce4) which explains UMA’s TVL Options experiment. 
- Watch this KPI Options explainer [video](https://www.youtube.com/watch?v=U1xNkCbuiPA&amp%3Bfeature=youtu.be).
- Start exploring which performance metrics you would like your community to work towards.
- Reach out to us along the way if you have any questions. We’re available on Discord or at hello@umaproject.org  