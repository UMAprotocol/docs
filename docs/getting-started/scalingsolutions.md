---
title: Scaling UMA 
sidebar_label: Scaling Solutions
---
This section explains the how UMA is scaling to the Polygon network. Polygon is the first scaling solution enabled with more to follow soon.

## How scaling UMA works on Polygon

The UMA ecosystem comprises a dispute resolution layer — the Data Verification Mechanism (DVM), and the financial contracts it secures. UMA’s architecture has from conception been decoupled, meaning the dispute layer and the contract layer do not need to live on the same chain.

Having a decoupled architecture gives the advantage of being able to deploy to any EVM chain efficiently. Our scaling strategy allows the contract layer on Polygon or any EVM scaling solution to access the same DVM any contract native to Ethereum has access to.

UMA makes use of an arbitrary message bridge that allows for two-way messages to pass between the Polygon network and Ethereum mainet. The message bridge uses the Polygon Arbitrary Message system, meaning it can be as trusted as the Polygon network itself. 

UMA's Optimistic Oracle is used as the arbiter of price requests natively on the Polygon network. A price request will first be sent the Polygon Optimistic Oracle. If the responding price proposal goes undisputed, then the result is deemed the accepted outcome. 

If the event is disputed, then the following steps will be taken to bridge the disputed result back to the final arbitator, the DVM:
1. A Polygon contract, such as a prediction market, needs a price to settle a payout. The contract expects to get this price from an optimistic oracle `Polygon Oracle`.
2. For some reason, a user disagrees with the price returned by the `Polygon Oracle` and disputes the price.
3. The disputed price request is passed from the Polygon Oracle to a contract called the `Oracle Child Tunnel`, whose sole responsibility is to communicate with an `Oracle Root Tunnel` on the Ethereum network. 
4. The `Oracle Child Tunnel` relays the dispute to Ethereum mainnet to the `Oracle Root Tunnel`.
5. The `Oracle Root Tunnel` has special permission to request a price from the DVM, where the familiar voting and resolution process is performed by UMA voting token holders.
Once the DVM has resolved a price request, the outcome of the vote is pushed to `Oracle Root Tunnel`. It is important to note that the DVM is not aware of which chain the request came from, nor does it need to.
6. Like before, the `Oracle Root Tunnel` relays the result from the DVM to the `Child Tunnel` on Polygon.
7. Finally, the `Oracle Child Tunnel` then sends a message back to the `Polygon Oracle`.
8. The outcome of the dispute is resolved and Polygon based contracts can now used the resolved price.

![](/img/PolygonDispute.png)

## Resources

For more information on how to laucnh a contract to Polygon, you can follow the [tutorial](developers/deploy-on-polygon.md).

If you want to know more about how to UMA plans to scale to more scaling solutions you can read out [article](https://medium.com/uma-project/uma-is-scaling-to-every-evm-compatible-chain-18ca2404698d).
