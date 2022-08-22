---
sidebar_position: 3
title: Sample Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the Uma contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Financial Contracts

```graphql
{
  financialContracts {
    id
    creator {
      id
      isRemoved
      manager
    }
    deployer {
      id
    }
    address
    collateralToken {
      id
      name
    }
    collateralRequirement
    expirationTimestamp
    totalSyntheticTokensBurned
    totalSyntheticTokensCreated
    totalTokensOutstanding
    cumulativeFeeMultiplier
    globalCollateralizationRatio
    rawTotalPositionCollateral
    totalCollateralDeposited
    totalCollateralWithdrawn
    totalPositionCollateral
    rawLiquidationCollateral
    positions {
      id
      rawCollateral
      collateral
      tokensOutstanding
      isEnded
    }
    liquidations {
      id
      status
      amountWithdrawn
    }
  }
}
```

### Liquidations

```graphql
{
  liquidations {
    id
    status
    sponsor {
      id
    }
    liquidator {
      id
    }
    disputer {
      id
    }
    liquidationId
    tokensLiquidated
    lockedCollateral
    liquidatedCollateral
    disputeBondAmount
    disputeSucceeded
    amountWithdrawn
    events {
      __typename
    }
  }
}
```

### Price Requests

```graphql
{
  priceRequests {
    id
    isResolved
    price
    latestRound {
      roundId
      snapshotId
      totalVotesRevealed
      totalRewardsClaimed
      totalSupplyAtSnapshot
      votersAmount
      votersClaimedAmount
      tokenVoteParticipationRatio
      tokenVoteParticipationPercentage
      votersEligibleForRewardsRatio
      votersEligibleForRewardsPercentage
      votersClaimedRatio
      votersClaimedPercentage
      tokensClaimedRatio
      tokensClaimedPercentage
      winnerGroup {
        votersAmount
        totalVoteAmount
      }
      groups {
        price
        totalVoteAmount
        won
        votersAmount
      }
    }
    time
    identifier {
      id
      isSupported
    }
    committedVotes(first: 2) {
      time
    }
    revealedVotes(first: 2) {
      price
      time
    }
  }
}
```
