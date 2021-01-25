---
title: Optimistic Oracle Service
sidebar_label: Optimistic Oracle Service
slug: /Welcome
---

UMA’s unique Optimistic Oracle Service is what makes our contracts “priceless”.

Many use cases for blockchains and smart contracts rely on access to off-chain information.  The mechanism used to report these is typically referred to an oracle.  These oracles feed information to the smart contract to let them know when actions need to be taken, but sometimes wrong or manipulated information comes through which causes problems

UMA works slightly differently as the monitoring of the price feed  is performed externally to the UMA systems and it is the responsibility of the token sponsor to ensure that their positions are appropriately collateralised, adding additional collateral if required; and of bots running on the UMA system to identify and liquidate under-collateralised positions.  If a liquidation bot makes an error and improperly liquidates a position, a dispute bot will flag this.  

It is only at this point, when a dispute is raised, that UMA’s oracle service, the Data Verification Mechanism (DVM) is invoked to resolve the dispute, inviting UMA token holders to vote on the correct price and hence whether the liquidation was valid or otherwise.  The DVM is powerful because it has an element of human judgment which ensures contracts are securely and correctly managed.
