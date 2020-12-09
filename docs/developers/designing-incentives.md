---
title: Designing an Incentives Program
sidebar_label: Designing an Incentives Program
---

One goal of developer mining program is that you (the developer) will try to attract capital to your contract by designing your own incentives program. Using the rewards that you receive from developer mining, you could grow the usage of their contract by rewarding behavior such as providing liquidity or having the community build specialized dapps. An example split of what you might use your rewards for would be:

- 10% as profit for the core contract development team
- 50% to liquidity mining
- 40% to other developers who build additional dapps or perform marketing

Allocating rewards in such a way would allow you to handle the financial design, contract deployment and initial bare-bones dapp creation, and then use $UMA rewards to incentivize token liquidity and improvements of the synthetic token product/dapp experience. This rewards structure is customizable for every project's requirements and goals - but is intended to increase the overall utility, usability, excitement and total value minted for participating contracts.

Below is an example implementation of how you could implement you own liquidity mining program.

## Implementing a Liquidity Mining Program

To incentivize trading liquidity for your synthetic token, you will likely need to initially incentivize liquidity providers in some way. Below are two example designs and implementations of liquidity mining programs.

UMA's yield dollar liquidity mining program was designed so that any liquidity provider to the uUSDwETH or uUSDrBTC Balancer pool would receive liquidity mining rewards. To calculate and distribute the liquidity mining rewards for uUSDwETH each week, the UMA core team follows this process:

- Receive developer mining rewards based on the total amount of outstanding synthetic token value for the uUSDwETH contract.
- Run the script [here](https://github.com/UMAprotocol/protocol/blob/master/packages/affiliates/liquidity-mining/CalculateBalancerLPRewards.js) to calculate the amount of rewards to distribute to each miner based upon the proportion of the total liquidity pool that they provider over the course of the previous week. [Here](https://github.com/UMAprotocol/protocol/pull/2275) is an example PR that details this process further.
- Using the [dipserse app](https://disperse.app/), send out payment transactions to miners by adding the miner addresses and payout amounts as a json file to disperse.

To re-generate the liquidity mining calculation, follow the developer setup instructions to clone and prepare the UMA protocol repo, and then run the following command from the `affiliates` package. 

```bash
node ./liquidity-mining/CalculateBalancerLPRewards.js --fromBlock 11362985 --toBlock 11408485 --poolAddress="0xcce41676a4624f4a1e33a787a59d6bf96e5067bc" --umaPerWeek=14486 --tokenName="yusdeth" --week=19 --network mainnet_mnemonic
```

This calculation takes snapshots of the liquidity pool every 256 blocks to determine payout amounts. This particular calculation was run from 2020-11-30 23:00:00 UTC (11362985) to 2020-11-7 23:00:00 UTC (11408485).

The uGAS liquidity mining program is performed similarly, but is designed so that only people that minted tokens **AND** provided liquidity would be able to liquidity mine. This design was chosen to reduce the impact on token price, as liquidity miners would not be able to mine by just purchasing tokens. The main uGAS AMM pool was on Uniswap rather than balancer, so a different [script](https://github.com/UMAprotocol/protocol/blob/master/packages/affiliates/liquidity-mining/CalculateUniswapLPRewards.js) was used to calculate Uniswap LM rewards. This Uniswap calculation script by default supports the minters + liquidity provider requirement. [Here](https://github.com/UMAprotocol/protocol/pull/2272) is an example PR that details this calculation further.

<!-- TO DO
## Calculating APY for Liquidity Miners -->


<!-- To DO
## Implementing a dApp Mining Program -->