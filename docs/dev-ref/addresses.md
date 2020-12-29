---
title: Contract Addresses
sidebar_label: Contract Addresses
---

Below is where you can find smart contract addresses and descriptions for UMA-supported mainnet and testnet deployments of the DVM and financial contracts infrastructure.

## UMA Tokenholders

If you are a UMA tokenholder, you will probably only interact with `Voting`, `Finder`, `DesignatedVotingFactory`, and `Governor`.
These are the relevant contracts used to vote on price requests and UMIPs.

## Financial Contract Developers

If you are building your own financial contract template, you will probably interact with `Store`, `Voting`, `Finder`, `IdentifierWhitelist`, and `Registry`.
These contracts are used by the DVM to keep track of which financial contracts depend on it, how they impact the economic guarantee of the oracle, and which price identifiers UMA tokenholders need to be prepared to vote on.

## Contract Addresses

- [Mainnet (network id: 1)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/1.json)
- [Rinkeby (network id: 4)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/4.json)
- [Kovan (network id: 42)](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/42.json)

## Key Contracts

**IdentifierWhitelist**

This contract stores all supported plaintext price identifiers. During a vote for a new price identifier, an `addSupportedIdentifier()` transaction call is submitted. 

| [Mainnet Address](https://etherscan.io/address/0xcF649d9Da4D1362C4DAEa67573430Bd6f945e570)         | [Kovan Address](https://kovan.etherscan.io/address/0xeF9c374b7976941fCAf5e501eaB531E430463fC6)      | [Docs](https://docs-dot-uma-protocol.appspot.com/uma/contracts/IdentifierWhitelist.html)  | [Source Code](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/oracle/implementation/IdentifierWhitelist.sol)
| ----------------------- | ------------------ | ---------------------- | ---------------------- |

**AddressWhitelist**

This contract stores the address and final fee for all supported collateral currency types. During a vote for a new collateral currency, an `addToWhitelist()` transaction call is submitted. 

| [Mainnet Address](https://etherscan.io/address/0xdBF90434dF0B98219f87d112F37d74B1D90758c7)         | [Kovan Address](https://kovan.etherscan.io/address/0xf8bdAb5d675F76eD863fF9Fa35B129A6e43e71cA)      | [Docs](https://docs-dot-uma-protocol.appspot.com/uma/contracts/AddressWhitelist.html)  | [Source Code](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/common/implementation/AddressWhitelist.sol)
| ----------------------- | ------------------ | ---------------------- | ---------------------- |

**ExpiringMultiPartyCreator**

This is the factory contract that provides a template for all Expiring Multi Party (EMP) contracts. To create a new Expiring Multi Party contract, a deployer only needs to call `createExpiringMultiParty()`.

| [Mainnet Address](https://etherscan.io/address/0x9A077D4fCf7B26a0514Baa4cff0B481e9c35CE87)         | [Kovan Address](https://kovan.etherscan.io/address/0xF763D367E1302A16716b6c40783A17c1aC754F2E)      | [Docs](https://docs-dot-uma-protocol.appspot.com/uma/contracts/ExpiringMultiPartyCreator.html)  | [Source Code](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/expiring-multiparty/ExpiringMultiPartyCreator.sol)
| ----------------------- | ------------------ | ---------------------- | ---------------------- |

**Voting**

This is the contract that voters interact with to provide prices and vote on new governor transactions. To vote, a voter will need to call `commitVote()` and `revealVote()`.

| [Mainnet Address](https://etherscan.io/address/0x1d847fb6e04437151736a53f09b6e49713a52aad)         | [Kovan Address](https://kovan.etherscan.io/address/0x03fe668862a0BFa9d3706A0ebA18007464343FdD)      | [Docs](https://docs-dot-uma-protocol.appspot.com/uma/contracts/Voting.html)  | [Source Code](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/oracle/implementation/Voting.sol)
| ----------------------- | ------------------ | ---------------------- | ---------------------- |

**Governor**

The governor contract is used to propose new protocol upgrade votes. To propose an upgrade, a participant would need to call `propose()`.

| [Mainnet Address](https://etherscan.io/address/0x592349F7DeDB2b75f9d4F194d4b7C16D82E507Dc)         | [Kovan Address](https://kovan.etherscan.io/address/0xca4575EE197308c9D2aBF813A5f064f44898b7a4)      | [Docs](https://docs-dot-uma-protocol.appspot.com/uma/contracts/Governor.html)  | [Source Code](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/oracle/implementation/Governor.sol)
| ----------------------- | ------------------ | ---------------------- | ---------------------- |

<!-- # Deployed Synthetic Tokens

You can also find a list of supported deployments of the priceless synthetic token contract template on various networks.

## Kovan (network id: 42)

- [Kovan Synthetic Tokens](https://docs.google.com/spreadsheets/d/1gLjt58hFh-l5SDhoRyz4t8oQCYx74tYRypMmIuYwJ1c/edit?usp=sharing) -->
