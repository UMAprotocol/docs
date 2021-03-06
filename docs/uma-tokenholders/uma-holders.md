---
title: UMA Tokenholders
sidebar_label: Overview
---

## What are UMA tokens?

UMA token is used to operate UMA's optimistic oracle, known as the Data Verification Mechanism (DVM). Owning UMA gives you the ability to contribute price information to the DVM and govern UMA protocol.  


The benefits of owning UMA include:

1. Earning rewards for voting on price requests from financial contracts using the DVM

2. Earning rewards for governing the UMA ecosystem by voting on parameter changes and approving system upgrades

     - System upgrades can include supporting new price identifiers or collateral types

Voters who participate and vote correctly earn an inflationary reward (currently 0.05% of total network token supply), distributed pro-rata by stake.

As the total value of collateral locked in UMA grows, UMA token is required to increase in value to ensure the security of the DVM. The DVM is designed with an economic guarantee around the cost it would take to corrupt the oracle and the profit someone would receive from corrupting the oracle.  The cost of corrupting the DVM is as measured by the cost of obtaining 51% of UMA voting tokens. 

The DVM ensures the price to obtain 51% of UMA tokens is greater than the profit from corrupting the DVM, as measured by the collateral stored in the financial contracts that are registered with it. To ensure this inequality holds, the DVM may charge fees to financial contracts which the DVM would use to buy UMA tokens. 

## Voting on price requests

Owners of UMA tokens will occasionally be asked to vote on price requests from financial contracts in a 2-stage (commit and reveal) voting period. Each stage is open for 24 hours, so each voting period is 48 hours. 

- UMA Tokenholders can discuss their votes in the #voting channel of the [UMA Discord](https://discord.umaproject.org/) before voting

- UMA tokenholders can use the [Voter dApp](https://vote.umaproject.org/) to vote on price requests
    - A tutorial on how to vote on price requests from the Voting dApp is [here](uma-tokenholders/voter-dApp.md) 

## Governing the UMA ecosystem

UMA tokenholders govern two areas of the UMA ecosystem:

1. Financial contracts using the DVM
2. The UMA DVM

All governance proposals will be addressed via the UMIP process. The UMIP process is detailed [here](uma-tokenholders/umips.md).

Examples of governance proposals include:

- Approving new [price identifiers and collateral currencies](/uma-tokenholders/adding-price-id) 
- Upgrading the core DVM protocol and / or modify DVM parameters
- Registering and de-registering contract templates
- Shutting down contract instantiations (in rare circumstances)

## Voting rebate

Voting requires a voter to spend gas to commit, reveal their vote and then claim voting rewards. Since voting takes place irrelevant to the current gas price, there is a rebate for the gas spent in the voting process. The rebate is designed to ensure voter turnout even during high gas fee spikes and make it more attractive for voters with smaller balances to participate.

The rebate will be sent to voters monthly in $UMA. You will be rebated the dollar for dollar amount of gas you spent. For example, if you spent $20 in gas to commit and reveal, you will be rebated $20 in $UMA tokens. Only votes that successfully revealed their vote will receive the rebate. It is important to note that, your vote does not have to be the correct to receive the gas rebate.

If you would like to read more about the rebate program, we have an [article](https://medium.com/uma-project/voter-gas-fee-rebate-program-f9cce3391cb5) with more details

