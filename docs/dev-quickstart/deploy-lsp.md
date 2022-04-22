---
title: Deploy Contract
sidebar_label: Deploy Contract
---

The following tutorial walks through the lifecycle of the Long Short Pair (LSP) contract and its interactions with the Optimistic Oracle. The LSP contract allows for the creation of unliquidatable capped-payout financial contracts. Go [here](synthetic-tokens/long-short-pair.md) for more information on the LSP contract.

The example below deploys a contract based on whether the Heat or Hawks will win an NBA game on April 19. When collateral is deposited into an LSP contract, "long" and "short" tokens are returned to the caller. After a price has been requested and proposed through the Optimistic Oracle contract, collateral is allocated between the two tokens depending on the outcome of the game.

Different use cases and financial payouts can be achieved by simply adjusting the parameters below. Go [here](developers/deploy-an-lsp.md) to learn more about how to set the parameters for an LSP contract.

The easiest method of running the script below is:
- Clone the [protocol repo](https://github.com/UMAprotocol/protocol) and run `yarn` and `yarn qbuild`
- Create a .env file that includes MNEMONIC and CUSTOM_NODE_URL
- Create a new file in the repo with the code below and run HARDHAT_NETWORK=kovan node ./{file_path}

```
// Helper modules
const { web3 } = require("hardhat");
const { utf8ToHex, padRight, toWei } = web3.utils;
const { getAbi, getAddress } = require("@uma/contracts-node");

// Constants
const chainId = 42;
const startTimestamp = Math.floor(Date.now() / 1000);

// Mandatory LSP Params
const expirationTimestamp = (startTimestamp + 600).toString(); // Set contract to expire 600 seconds after deployment
const priceIdentifier = padRight(utf8ToHex("YES_OR_NO_QUERY"), 64);
const collateralPerPair = toWei("1");
const collateralToken = "0x489Bf230d4Ab5c2083556E394a28276C22c3B580";
const pairName = "Who will win Heat vs. Hawks, April 19";
const longSynthName = "Heat Long Token";
const longSynthSymbol = "Heat-l";
const shortSynthName = "Hawks Short Token";
const shortSynthSymbol = "Hawks-s";

// Optional LSP Params
const ancillaryData =
  "q: title: NBA: Who will win Heat vs. Hawks, scheduled for April 19, 7:30 PM ET?, p1: 0, p2: 1, p3: 0.5. Where p2 corresponds to Heat, p1 to a Hawks, p3 to unknown";
const customAncillaryData = web3.utils.utf8ToHex(ancillaryData);
const optimisticOracleLivenessTime = 60;
const optimisticOracleProposerBond = 0;
const proposerReward = 0;
const enableEarlyExpiration = true;

// FPL Params
const upperBound = toWei("1");
const lowerBound = toWei("0");

// Deploy contract and return its address.
const deploy = async () => {
  const [deployer] = await web3.eth.getAccounts();
  const financialProductLibrary = await getAddress("LinearLongShortPairFinancialProductLibrary", chainId)

  const lspParams = {
    pairName,
    expirationTimestamp,
    collateralPerPair,
    priceIdentifier,
    enableEarlyExpiration,
    longSynthName,
    longSynthSymbol,
    shortSynthName,
    shortSynthSymbol,
    collateralToken,
    financialProductLibrary,
    customAncillaryData,
    proposerReward,
    optimisticOracleLivenessTime,
    optimisticOracleProposerBond,
  };

  const transactionOptions = {
    gas: 10000000,
    gasPrice: 2000000000,
    from: deployer,
  };

  console.log(`Deploying a LSP contract for ` + pairName);
  // Simulate transaction to test before sending to the network.
  const lspAddress = await getAddress("LongShortPairCreator", chainId)
  const lspCreator = new web3.eth.Contract(getAbi("LongShortPairCreator"), lspAddress);
  const address = await lspCreator.methods.createLongShortPair(lspParams).call(transactionOptions);
  console.log(`- The LSP contract address is ` + address);

  // Since the simulated transaction succeeded, send the real one to the network.
  const { transactionHash } = await lspCreator.methods.createLongShortPair(lspParams).send(transactionOptions);
  console.log(`- The contract was deployed in transaction ` + transactionHash);

  console.log("Setting FPL parameters...");
  const deployedFPL = new web3.eth.Contract(
    getAbi("LinearLongShortPairFinancialProductLibrary"),
    financialProductLibrary
  );
  const fplParams = [address, upperBound, lowerBound];
  console.log("- The fpl params are :", {
    address: fplParams[0],
    upperBound: fplParams[1],
    lowerBound: fplParams[2],
  });

  const fpl = await deployedFPL.methods.setLongShortPairParameters(...fplParams).send(transactionOptions);
  console.log("- Financial product library parameters set in transaction: ", fpl.transactionHash);

};

// Run script.
deploy();
```