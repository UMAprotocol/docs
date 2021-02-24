---
title: Optimistic Oracle Service
sidebar_label: Optimistic Oracle 
slug: /Welcome
---

Many decentralized applications rely on obtaining off-chain information and recording it on-chain.  The mechanism used to report off-chain information is typically referred to as an oracle.  Oracles feed information to smart contracts as an input for executing pre-configured logic. Every decentralized oracle is corruptible, which means every smart contract that relies on off-chain data is corruptible and manipulatable at some price. UMA's Optimistic Oracle is configured with economic guarantees to ensure it cannot be corrupted. Let's dive into UMA's Optimistic Oracle!

Contracts on UMA are managed and enforced by a network of incentivized parties (liquidators and disputers) to monitor price information off-chain to liquidate under-collateralized positions. If a position is liquidated, it can be disputed before it is finalized. When a dispute is raised, a request is sent to UMA's Optimistic Oracle, known as the Data Verification Mechanism (DVM). 

The DVM is invoked to resolve the dispute and is comprised of UMA token holders to vote on the price of an asset at a given timestamp to determine if the liquidation was valid or invalid. The DVM will aggregate UMA token holder votes to determine the final price of the asset. UMA tokenholders who voted with the majority are rewarded for their services. 

The DVM is powerful because it encompasses an element of human judgment to ensure contracts are securely and correctly managed when issues arise from volatile (and sometimes maniputable) markets. UMA's Optimistic Oracle is constructed with economic guarantees around the cost of corrupting UMA's oracle to ensure that it will always cost more to corrupt the oracle (i.e., obtain 51% or more UMA tokens) that it will be to profit from corrupting the oracle (i.e. stealing funds from the contracts built on UMA). 
