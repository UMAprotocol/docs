---
title: Request Price
sidebar_label: Request Price
---

When the current timestamp is later than the `expirationTimestamp` parameter, `expire` can be called on the LSP contract to request a price from the Optimistic Oracle.

Another option for an LSP contract is to set `enableEarlyExpiration` to true on deployment. `enableEarlyExpiration` is an optional deployment parameter that enables an LSP contract to be settled before its `expirationTimestamp`. Early expiration was enabled for the example contract we deployed as it can be beneficial to use when the exact timestamp a request will need to be made is uncertain and it can make testing easier.

Note: If using the example below, make sure to input your LSP contract address for the `lspAddress` constant below.

```
// Helper modules
const { getContract, web3 } = require("hardhat");

// Constants to update
const lspAddress = "YOUR_LSP_CONTRACT_ADDRESS";
const requestTimestamp = Math.floor(Date.now() / 1000) - 100;

// Request a price from the Optimistic Oracle contract
const request = async () => {
  const [deployer] = await web3.eth.getAccounts();
  const LongShortPair = getContract("LongShortPair");
  const lspContract = new web3.eth.Contract(
    LongShortPair.abi,
    lspAddress
  );
  console.log(`Requesting a price from the Optimistic Oracle contract...`);
  await lspContract.methods.requestEarlyExpiration(requestTimestamp).send({ from: deployer });
  console.log("- Called expire and requested a price from the Optimistic Oracle");
};

// Main script.
request()
```