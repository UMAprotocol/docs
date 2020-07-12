module.exports = {
  gettingStarted: {
    "Getting Started": [
      "getting-started/welcome",
      "getting-started/overview",
      "getting-started/synthetic-tokens",
      "getting-started/oracle",
    ],
  },
  syntheticTokens: {
    "Synthetic Tokens": [
      "synthetic-tokens/explainer",
      "synthetic-tokens/glossary",
      "synthetic-tokens/known-issues",
    ],
  },
  oracle: {
    "Oracle Solution (DVM)": [
      "oracle/tech-architecture",
      "oracle/econ-architecture",
      "oracle/dvm-interface",
      "oracle/known-issues",
      "oracle/mainnet-info",
    ],
    Governance: [
      "governance/uma-holders",
      "governance/umips",
      "governance/adding-price-id",
    ],
  },
  devRef: {
    "Developer Reference": ["dev-ref/addresses", "dev-ref/bug-bounty"],
  },
  tutorials: {
    Tutorials: [
      "tutorials/setup",
      {
        type: "category",
        label: "Minting Tokens",
        items: ["tutorials/mint-locally", "tutorials/mint-etherscan"],
      },
      "tutorials/cli-tool",
      "tutorials/bots",
      {
        type: "category",
        label: "Voting",
        items: ["tutorials/voting-uma", "tutorials/voting-2key"],
      },
      "tutorials/dvm-integration",
    ],
  },
};
