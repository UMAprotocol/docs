---
title: Settle
sidebar_label: Settle
---

After a price has been proposed there is a liveness period before the LSP contract receives the proposed value. During this time Disputers can refute a price submitted. If a proposal is not disputed it is treated as correct.

The proposal liveness period can be customized for each LSP contract using the `optimisticOracleLivenessTime` parameter on deployment. Our example contract uses a `optimisticOracleLivenessTime` of 60 seconds to speed up the development process, however, most contracts use hours or even days for more complex calculations.

For the example contract, if the proposed value of 1 was not disputed `settle` can then be called. The total collateral amount would be allocated to the long token (Heat) and the short token (Hawks) would expire worthless.

Note: If using the example below, make sure to input your LSP contract address for the `lspAddress` constant below.
```
// Helper modules
const { getContract, web3 } = require("hardhat");
const { toWei, fromWei } = web3.utils;

// Constants to update
const lspAddress = "YOUR_LSP_CONTRACT_ADDRESS";
const longTokensToSettle = toWei("1");
const shortTokensToSettle = toWei("1");

// The LSP contract allocates collateral based on the proposed price after the liveness period is complete.
const settle = async () => {
  const [deployer] = await web3.eth.getAccounts();
  const LongShortPair = getContract("LongShortPair");
  const lspContract = new web3.eth.Contract(
    LongShortPair.abi,
    lspAddress
  );

  console.log("Calling settle on the LSP contract...");
  await lspContract.methods.settle(longTokensToSettle, shortTokensToSettle).send({ from: deployer });
  console.log(`- Settled ${fromWei(longTokensToSettle)} long token(s) and ${fromWei(shortTokensToSettle)} short token(s)`);
};

// Run script.
settle()
```