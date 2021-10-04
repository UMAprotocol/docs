---
title: Development Guide
sidebar_label: Development Guide
---

To immediately start building on the UMA protocol, first check out the [Quick Start guide](/developers/setup) for setting up your environment and deploying your first local [synthetic token](/build-walkthrough/mint-locally).


The tutorials in this section are written to use the ExpiringMultiParty (EMP) contract, which is the first available production ready template of a synthetic token. The EMP allows developers to quickly launch expiring synthetic tokens, such as the [UMA yield dollar](/users/mint-farm-yusd), but is by no means a limitation on the types of financial contracts that a developer could create.


### Complete build process

After following the quick start guide and deploying your first synthetic token, you can follow this general build process to launch and secure a mainnet version of your expiring synthetic token.

1. [Finalize your contract design.](/synthetic-tokens/what-are-synthetic-assets)
2. [Propose a new price identifier or collateral type.](/uma-tokenholders/adding-price-id)
3. [Deploy your contract.](/developers/emp-deployment)
4. [Mint your first synthetic tokens to set the contract GCR.](/build-walkthrough/minting-etherscan)
5. [Deploy liquidator and dispute bots to secure your contract.](/developers/bots)

It is highly recommended that you perform steps 4-6 on Kovan before moving to mainnet.

### UMA Team Support

To receive support in your build process, especially if you wish to receive developer mining rewards, please make sure to reach out in the UMA Discord.
