---
title: Propose Price
sidebar_label: Propose Price
---

Once a request has been made, Proposers respond by referencing off-chain price feeds and submitting a value to the Optimistic Oracle contract. The `customAncillaryData` for the contract we deployed is:
```
q: title: NBA: Who will win Heat vs. Hawks, scheduled for April 19, 7:30 PM ET?, p1: 0, p2: 1, p3: 0.5. Where p2 corresponds to Heat, p1 to a Hawks, p3 to unknown
```
After referencing the score for the game, we determine the Heat won. To propose a value, we include the `proposedPrice` of 1 (Heat => p2:1) with the `priceIdentifier`, `timestamp`, and `ancillaryData` parameters from the request.

Note: If using the example below, make sure to input your LSP contract address for the `lspAddress` constant below.
```
// Helper modules
const { getAddress } = require("@uma/contracts-node");
const { getContract, web3 } = require("hardhat");
const { toBN, toWei } = web3.utils;

// Constants to update
const chainId = 42;
const lspAddress = "YOUR_LSP_CONTRACT_ADDRESS";
const proposedValue = toWei(toBN(1));

// Propose a price for OptimisticDepositBox request.
const propose = async () => {
  const accounts = await web3.eth.getAccounts();
  const [deployer] = accounts;
  const optimisticOracleContract = await getContract("OptimisticOracle");
  const optimisticOracleAddress = await getAddress("OptimisticOracle", chainId);
  const optimisticOracle = new web3.eth.Contract(optimisticOracleContract.abi, optimisticOracleAddress);

  // Pull data from the request to use in the proposal
  const latestBlock = await web3.eth.getBlockNumber();
  const fromBlock = latestBlock - 10000;
  const requests = await optimisticOracle.getPastEvents("RequestPrice", { fromBlock: fromBlock });
  const lspRequest = requests
    .filter((request) => request.returnValues.requester === lspAddress)
    .map((request) => {
      return {
        timestamp: request.returnValues.timestamp,
        identifier: request.returnValues.identifier,
        ancillaryData: request.returnValues.ancillaryData,
      };
    });

  console.group("Proposing a value to the Optimistic Oracle for the price request ...");
  await optimisticOracle.methods
    .proposePriceFor(
      accounts[0],
      lspAddress,
      lspRequest[0].identifier,
      lspRequest[0].timestamp,
      lspRequest[0].ancillaryData,
      proposedValue
    )
    .send({ from: deployer });
  console.log(`- Proposed a price of ${proposedValue}`);
};

// Main script.
propose();
```