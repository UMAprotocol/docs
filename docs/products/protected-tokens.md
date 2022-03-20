---
title: Protected Tokens
sidebar_label: Protected Tokens
---
Protected token pairs use the UMA Long-Short Pair contract to wrap any ERC20 asset and create protected and recovery tokens. The protected tokens are put in a wallet or contract address where you want an extra layer of protection and the recovery tokens are held in a secure wallet elsewhere and can be used to recover the underlying assets in the event of a hack, bug, or other cause of lost funds.

Therefore, the protected tokens can be used with confidence that they do not expose your assets to additional smart contract risk beyond the relatively simple (and OpenZeppelin audited) Long-Short Pair contract, which is particularly useful for new protocols or new features added to existing protocols.

## UMA and Hats Finance

Risk Labs has launched an [UMA Hats Vault Protected Token Pair](https://projects.umaproject.org/ethereum/0xd675fF7192dbeC7D3a9B15FCC81E5f290221debD) that uses UMA as collateral and has deposited the protected tokens in a vault with [Hats Finance](https://hats.finance/). The protected tokens will reward whitehat hackers who identify bugs in the UMA and Across protocols.

If funds are lost due to a hack or bug in the Hats vault or user error in the UMA committee multi-sig that reviews reports, the recovery tokens held in a secure wallet elsewhere can be used to recover the underlying UMA. Recipients of rewards through this program will also receive 1:1 matching recovery tokens from Risk Labs so that they can redeem the protected/recovery token pair for the underlying UMA without waiting for contract expiry.

Other UMA holders can even mint protected token pairs of their own and add protected tokens to the Hats UMA vault. We’re working on a helper contract that will make it easier to match protected and recovery tokens 1:1 in a decentralized way. Once that’s ready, you can send the recovery tokens you minted to that contract. In the meantime, remember to deposit the protected tokens in the vault while keeping the recovery tokens in a secure wallet.

## Additional Resources 

- [UMA Launches Hats Finance Vault with Protected Tokens](https://medium.com/uma-project/uma-launches-hats-finance-vault-with-protected-tokens-2ad4587fcdf)
- [Internal Learning Session - Protected tokens](https://www.youtube.com/watch?v=3h5SJVXw9pA)
- [UMA Hats Vault Recovery Token](https://projects.umaproject.org/ethereum/0xd675fF7192dbeC7D3a9B15FCC81E5f290221debD)
