module.exports = {
  gettingStarted: {
    "Getting Started": [
      "getting-started/welcome",
      "getting-started/overview",
      "getting-started/synthetic-tokens",
      "getting-started/oracle",
    ],
  },
  tutorials: {
    Tutorials: [
      "tutorials/setup",
      "tutorials/mint-farm-yusd",
      "tutorials/mint-farm-yusdbtc",
      {
        type: "category",
        label: "Minting Tokens",
        items: ["tutorials/mint-locally", "tutorials/mint-etherscan"],
      },
      "tutorials/redeem-tokens",
      "tutorials/cli-tool",
      {
        type: "category",
        label: "Bots",
        items: ["tutorials/bots", "tutorials/bot-param"],
      },
      {
        type: "category",
        label: "Voting",
        items: [
        "tutorials/voting/introduction",
        "tutorials/voting/dapp",
        "tutorials/voting/faq",
        "tutorials/voting/cli",
        "tutorials/voting/2key-contract"],
      },
      "tutorials/dvm-integration",
    ],
  },
  protocol: {
    "Synthetic Tokens": [
      "synthetic-tokens/explainer",
      "synthetic-tokens/glossary",
      "synthetic-tokens/known-issues",
    ],
    "Oracle (DVM)": [
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
    "Developer Reference": [
      "dev-ref/bug-bounty",
      "dev-ref/addresses",
      {
        type: "link",
        label: "Contracts (Github)",
        href:
          "https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts",
      },
    ],
  },
  community: {
    Community: [
      "community/press",
      "community/blog-posts",
      "community/events",
      "community/liquidation-opportunity-program",
    ],
  },
};
