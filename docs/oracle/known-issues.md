---
title: Known Issues
sidebar_label: Known Issues
---
### Unimplemented Features

As described in section “M03” of the [audit report](https://blog.openzeppelin.com/uma-audit-phase-1/), there are mechanisms described in the whitepaper that are not yet implemented in the mainnet deployment of the DVM.
These mechanisms are described below.

#### Median Calculation

After a price request is made and DVM voters submit their votes on the correct value of the price identifier, the DVM calculates the value that should be returned to the requesting contract.
This is also used to determine what inflationary rewards, in the form of newly minted UMA tokens, should be paid to voters.

The whitepaper describes a method for the DVM to calculate this value via a median calculation:

- If the distribution of votes is highly unimodal (frequency of the mode >50%), the mode is returned as the verified price. Tokenholders who voted for the mode are rewarded; all other tokenholders are penalized.
- If the frequency of the mode of the votes is <50%, the median price is returned as the verified price. Tokenholders who submitted votes between the 25th and 75th percentile are rewarded; all other tokenholders are penalized.

However, this is not reflected in the v1 implementation of the DVM. The v1 implementation of the DVM instead conducts the following calculation:

- If the distribution of votes is highly unimodal (frequency of the mode >50%), the mode is returned as the verified price. Tokenholders who voted for the mode are rewarded; all other tokenholders are penalized.
- If the frequency of the mode of the votes is <50%, the vote is delayed until the next round.

#### Automated Buy and Burn Program

The whitepaper describes a method to calculate, collect, and use fees from contracts registered with the DVM and to “buy and burn” UMA tokens.
This program should be automated in the future, but is currently executed manually.

As described in [this section](oracle/econ-architecture.md), \$UMA tokenholders currently manually observe the PfC and CoC to determine the regular and final fee rates.
The Risk Labs Foundation manually withdraws the fees that have been collected and uses them to manually “buy and burn” UMA tokens to increase the CoC.

### Areas of Research

#### Parasitic Usage

Step 2 of the mechanism described [here](oracle/econ-architecture.md) shows that the profit from corruption (PfC) must be known at all times.
This is calculated by summing the PfC of each financial contract that is reliant on the UMA DVM.
This requires all financial contracts that rely on the DVM to be registered with the UMA DVM.

The problem of “parasitic usage” arises if there are financial contracts that are dependent on the UMA DVM but are not registered with it.
These contracts would cause the PfC of the UMA DVM to be higher than what is calculated, and the economic guarantee of the UMA DVM may not hold.

A proposed solution to the parasitic usage problem is to “fuzz” the information returned by the DVM.
Below is a simplified example of one solution, with some caveats that follow.

Alice and Bob are trying to settle a contract which contains $100 of collateral. The contract requests a resolution from the UMA DVM and transfers the $100 of collateral with that request.

Pre-vote phase:

- The DVM begins a new voting round, starting with a pre-vote phase.
- During the pre-vote phase, anyone can deposit money into the DVM contract along with a commit that’s constructed as follows: `hash(salt, payout_dest)`. The `payout_dest` is the party to which the money should go (either Alice’s or Bob’s address).
- Charlie (a friend of Alice) deposits \$50 with the commit `hash(salt, alice_address)`.
- Charlie sends his `(salt, alice_address)` pair to a trusted server. He provides instructions to the DVM voters for how to access this server. Note: this could be multiple servers or even be a trusted set of voters - there just needs to be some party he trusts to perform the proof on demand, but not reveal the salt.

Vote phase:

- DVM voters communicate with this server off chain. The voters each request an interactive zero knowledge proof (zk-proof) session with the server. The server systematically proves to each voter that the `payout_dest` that Charlie committed is Alice’s address without revealing the salt.
- Instead of voting on the underlying price, voters vote on Alice’s payout. Bob’s payout will be computed by subtracting Alice’s payout from the total that was paid in by the contract and pre-vote deposits.
- Each voter sees that the underlying price is $50. Assume that in this example, an underlying price of $50 would have normally resulted in a payout to Alice of $50. However, each voter commits on-chain to a value of $100, since this nets the usual payout of $50 with the $50 deposit that should go to Alice according to the interactive zk-proof.
- After all the voters reveal their votes, the underlying price resolves to $50 but the DVM does not reveal this number, only indicating that a payout of $100 to Alice and \$50 to Bob should be made.
- Alice and Bob are free to withdraw their payouts.

It would appear to a parasitic contract relying on these payouts that the price was $67 (because Alice got 2/3 of the money), when it was really $50.
Unless Charlie reveals his salt, there’s no way to prove on chain that Charlie requested his funds be paid out to Alice’s address.
If Charlie notices that voters have gone against his wishes, he is free to reveal his salt to demonstrate this publicly.

Noting that interactive zk proofs are costly, this “fuzzing” solution may inadvertently create avenues through which the DVM voting system could be DoS’d.
The contract and Charlie also need not send collateral to the DVM to escrow during the resolution process.
This collateral may be stored in a separate account and the DVM may instead only return the payments to be made from that account to each party.

#### Bribery Attack

The economic guarantees of the UMA system as described [here](oracle/econ-architecture.md) require that the cost of corruption (CoC) stays above the profit from corruption (PfC).
A “bribery attack” arises if the cost of controlling 50% of the participating UMA tokens is a small bribe relative to the cost of purchasing UMA tokens.
This would cause the CoC of the UMA DVM to be lower than the PfC, and the economic guarantee of the UMA DVM may not hold.

This bribery attack is a variation on the "P + Epsilon attack" Vitalik Buterin described [here](https://blog.ethereum.org/2015/01/28/p-epsilon-attack/).
Our version of this attack (and solution) is formalized in this research [note](https://github.com/UMAprotocol/research/blob/master/notes/bribe_attack/BribeAttack.pdf) and is summarized below.

##### Overview of Attack

The DVM uses a Schelling-Point style voting system with tokenized voting rights that pays a reward to voters who vote with the majority (described [here](oracle/econ-architecture.md)).

In a bribery attack, assume that there exists a 3rd party individual who would like to corrupt the DVM by bribing any UMA tokenholder who puts in a corrupted vote with a reward of `x`.

Assume each UMA token is worth 1 unit of value and entitles the tokenholder to submit 1 vote.
Each voter must decide whether to submit a corrupted vote (“be corrupted”) or an uncorrupted vote (“not be corrupted”).
The system is considered corrupted if the majority of UMA tokenholders submit the corrupted vote.

We assume that if the system is corrupted, the UMA voting token becomes worthless — the UMA token that was previously worth 1 unit of value goes to 0.

To compel voters to submit accurate votes, the UMA system issues `r` newly minted UMA tokens, to be distributed proportionally to all voters who voted with the majority.
We label that the fraction of voters who are honest (not corrupted) as `p` (this means `p` is between 0 and 1).
The reward that an honest voter receives is therefore scaled by how many tokenholders vote honestly—the reward paid to an honest voter is `r/p`.
If `p=1` and all voters are honest, the reward received is `r`; if `p=0.5` and only half of the voters are honest, the reward received is `2*r`.

The payout for each voter depends both on the vote they submit and the votes that all other voters submit.
We can construct the following payout matrix:

|                         | Voter is corrupted | Voter is not corrupted |
| ----------------------- | ------------------ | ---------------------- |
| System is corrupted     | x                  | 0                      |
| System is not corrupted | 1+x                | 1+r/p                  |

Reasoning the above matrix, it follows that if bribe `x` is greater than the reward `r/p` paid to honest voters, a rational voter will vote to corrupt the system.

Since successfully corrupting the system requires convincing more than half of the voters to submit corrupt votes, the boundary scenario we care most about is when `p = 0.5`.
Substituting `p = 0.5` into the `x > r/p` relationship means that we need `x > 2*r` to convince half the voters to submit corrupt votes.
An attacker can successfully bribe the system by promising to pay 2 times the reward offered. This is problematic.

##### Proposed Solution to Bribery Problem

In the previous game, the “rules” were fixed and defined before-hand; it was a static game. In reality, the DVM has a protocol for governance, which includes updating and changing the rules of the game.

If there were an outside party that proposed a bribe of `x` in order to try and convince voters to submit corrupt votes, the token-holders could vote to increase the reward offered by the DVM such that `x < 2*r`.
By doing so, tokenholders can continuously stay ahead of any bribes.

It’s worth remembering that tokenholders do not want to be successfully bribed. In the event of a successful bribe, the token they own collapses in value.
As such, tokenholders have a large incentive to change the rules to prevent any bribe.
Because attackers know this, it means even attempting to bribe the tokenholders is futile—tokenholders will just quickly increase the reward `r` to thwart the bribe attempt.
