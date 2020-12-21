---
title: UMA Tokenholder Responsibilities
sidebar_label: Responsibilities
---

Owners of UMA tokens have 2 categories of responsibilities:

1. Vote on price requests from financial contracts using the DVM
2. Govern the UMA ecosystem by voting on parameter changes and approving system upgrades. System upgrades can include supporting new price identifiers or collateral types.

UMA tokenholders can use the [Voter dApp](https://vote.umaproject.org/) to vote on price requests. A tutorial on how to vote on price requests from the Voting dApp is [here](uma-tokenholders/voter-dApp.md). 

Voters who participate and vote correctly earn an inflationary reward (currently 0.05% of total network token supply), distributed pro-rata by stake.

## Voting on price requests

Owners of UMA tokens will occasionally be asked to vote on price requests from financial contracts in a 2-stage (commit and reveal) voting period. Tokenholders must reveal their votes or it will not be counted! Each stage is open for 24 hours, so each voting period is 48 hours. 

UMA Tokenholders can discuss their votes in the #voting channel of the [UMA Discord](https://discord.umaproject.org/) before voting.

## Governing the UMA ecosystem

UMA tokenholders govern two areas of the UMA ecosystem:

1. Financial contracts using the DVM
2. The UMA DVM

All governance issues will be addressed via an UMIP process. The UMIP process is detailed [here](uma-tokenholders/umips.md).

Because UMA tokenholders will be responsible for voting on price requests from financial contracts using the DVM, they need to:

- Approve mainnet [price identifiers and collateral currencies](/uma-tokenholders/adding-price-id) 
- Upgrade the core DVM protocol and / or modify DVM parameters
- Register and de-register contract templates
- Shut down contract instantiations (in rare circumstances)
