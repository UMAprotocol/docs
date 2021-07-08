---
title: Optimistic Oracle Interface
sidebar_label: Optimistic Oracle Interface
---

This document explains how different participants can interact with the Optimistic Oracle. To view the most updated mainnet, kovan or L2 deployments of the Optimistic Oracle contracts, refer to the production addresses listed [here](/dev-ref/addresses.md).

The Optimistic Oracle is used by financial contracts or any third party to retrieve prices. Once a price is requested, anyone can propose a price in response. Once proposed, the price goes through a liveness period where anyone can dispute the proposed price and send the disputed price to the UMA DVM for settlement.

There are twelve methods that make up the Optimistic Oracle interface.
-  `requestPrice`
-  `proposePrice`
-  `disputePrice`
-  `settle`
-  `hasPrice`
-  `getRequest`
-  `settleAndGetPrice`
-  `setBond`
-  `setCustomLiveness`
-  `setRefundOnDispute`
-  `proposePriceFor`
-  `disputePriceFor`

### `requestPrice`

Requests a new price. This must be for a registered price identifier. Note that this is called automatically by most financial contracts that are registered in the UMA system, but can be called by anyone for any registered price identifier. For example, the Expiring Multiparty (EMP) contract calls this method when its `expire` method is called.

Parameters:
- `identifier`: price identifier being requested.
- `timestamp`: timestamp of the price being requested.
- `ancillaryData`: ancillary data representing additional args being passed with the price request.
- `currency`: ERC20 token used for payment of rewards and fees. Must be approved for use with the DVM.
- `reward`: reward offered to a successful proposer. Will be paid by the caller. Note: this can be 0.

### `proposePrice`

Proposes a price value for an existing price request.

Parameters:
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.
- `proposedPrice`: price being proposed.

### `disputePrice`

Disputes a price value for an existing price request with an active proposal.

Parameters:
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `settle`

Attempts to settle an outstanding price request. Will revert if it isn’t settleable.

Parameters:
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `hasPrice`

Checks if a given request has resolved or been settled (i.e the optimistic oracle has a price).

Parameters:
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `getRequest`

Gets the current data structure containing all information about a price request.

Parameters:
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `settleAndGetPrice`

Retrieves a price that was previously requested by a caller. Reverts if the request is not settled or settleable. Note: this method is not view so that this call may actually settle the price request if it hasn’t been settled.

Parameters:
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `setBond`

Set the proposal bond associated with a price request.

Parameters:
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.
- `bond`: custom bond amount to set.

### `setCustomLiveness`

Sets a custom liveness value for the request. Liveness is the amount of time a proposal must wait before being auto-resolved.

Parameters:
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.
- `customLiveness`: new custom liveness.

### `setRefundOnDispute`

Sets the request to refund the reward if the proposal is disputed. This can help to "hedge" the caller in the event of a dispute-caused delay. Note: in the event of a dispute, the winner still receives the other’s bond, so there is still profit to be made even if the reward is refunded.

Parameters:
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `disputePriceFor`

Disputes a price request with an active proposal on another address' behalf. Note: this address will receive any rewards that come from this dispute. However, any bonds are pulled from the caller.

Parameters:
- `disputer`: address to set as the disputer.
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.

### `proposePriceFor`

Proposes a price value on another address' behalf. Note: this address will receive any rewards that come from this proposal. However, any bonds are pulled from the caller.

Parameters:
- `proposer`: address to set as the proposer.
- `requester`: sender of the initial price request.
- `identifier`: price identifier to identify the existing request.
- `timestamp`: timestamp to identify the existing request.
- `ancillaryData`: ancillary data of the price being requested.
- `proposedPrice`: price being proposed.

## Resources

Interacting with the Optimistic Oracle is simple and can be used to trustlessly determine almost limitless types of information, enabling the creation of a multitude of different types of financial contracts.

Most registered UMA financial contracts interact with the Optimistic Oracle by default, but to enable anyone to easily request a price from the OO, a simple OO interaction tutorial is coming soon.

View the audited Optimistic Oracle contracts [here](https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts/oracle).

The Optimistic Oracle audit report, performed by OpenZeppelin, is [here](https://blog.openzeppelin.com/uma-audit-phase-4/).

Refer [here](/uma-tokenholders/approved-price-identifiers.md) for all of the registered price identifiers that are supported by the Optimistic Oracle. To register your own with an UMA Improvement Proposal (UMIP), get started [here](/uma-tokenholders/adding-price-id.md).

