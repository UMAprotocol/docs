---
title: Development Guide
sidebar_label: Development Guide
---

To immediately start building on the UMA protocol, first check out the [Quick Start guide](/developers/setup) for setting up your environment and deploying your first local [synthetic token](/build-walkthrough/mint-locally).

The tutorials in this section are written to use the Expiring MultiParty (EMP) contract, which is the first available production ready template of a synthetic token. The EMP allows developers to quickly launch expiring synthetic tokens, such as the [UMA yield dollar](/users/mint-farm-yusd), but is by no means a limitation on the types of synthetic tokens that a developer could create.

### Complete build process

After following the quick start guide and deploying your first synthetic token, you can follow this general build process to launch and secure a mainnet version of your expiring synthetic token.

1. [Finalize your contract design.](/synthetic-tokens/what-are-synthetic-assets)
2. [Apply to the UMA developer mining program.](/developers/developer-mining)
3. [Propose a new price identifier or collateral type.](/uma-tokenholders/adding-price-id)
4. [Deploy your contract.](/developers/emp-deployment)
5. [Mint your first synthetic tokens to set the contract GCR.](/build-walkthrough/minting-etherscan)
6. [Deploy liquidator and dispute bots to secure your contract.](/developers/bots)
7. [Finalize your developer mining and start receiving rewards.](/developers/devmining-reqs)

It is highly recommended that you perform steps 4-6 on Kovan before moving to mainnet.