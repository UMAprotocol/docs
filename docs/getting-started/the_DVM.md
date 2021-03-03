title: The Data Verification Mechanism
sidebar_label: The Data Verification Mechanism
slug: /Optimistic Oracle
---

The Data Verification Mechanism (DVM) is used to resolve disputes on UMA protocol.

Priceless contracts on UMA are maintained by ensuring accurate prices are used to determine if a position should be liquidated or not and through ensuring that the cost of corrupting the oracle is always greater than the potential profit that could be made from doing so. 

Token holders who wish to participate in dispute resolution must determine a “true price” at the time of liquidation which can be used to determine whether the liquidation was valid or if it was erroneous.  Congruent voters receive 5% inflationary rewards for participating in the vote, incentivising them to vote correctly. 

The DVM is comprised of two types of fees; regular fees and final fees.  Regular fees must be paid periodically for the lifetime of the contract, while the final fee is a flat fee charged for each price request sent to the DVM. Note -  regular fees are currently set to $0. In the event the profit from corruption gets close to the cost to corrupt the DVM, fees can be increased to buy and burn UMA tokens. This reduces the supply and pushes the market price of UMA token up.  Regular and final fees can be adjusted as necessary to ensure that the cost of corruption is always greater than the potential profit to be made. 