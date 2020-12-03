module.exports = {
  gettingStarted: {
    "Getting Started": [
      "getting-started/welcome",
      "getting-started/overview",
      "getting-started/synthetic-tokens",
      "getting-started/oracle",
      "getting-started/developer-mining"
    ],
  },
  tutorials: {
    Tutorials: [
      "tutorials/setup",
      {
        type: "category",
        label: "Using Existing Contracts",
        items: ["tutorials/mint-farm-yusd", "tutorials/mint-farm-yusdbtc", "tutorials/redeem-tokens", "tutorials/cli-tool"],
      },
      {
        type: "category",
        label: "Deploying Contracts",
        items: ["tutorials/contract-deployment"],
      },
      {
        type: "category",
        label: "Minting Tokens",
        items: ["tutorials/mint-locally", "tutorials/mint-etherscan"],
      },
      {
        type: "category",
        label: "Bots",
        items: ["tutorials/bots", "tutorials/bot-param"],
      },
      {
        type: "category",
        label: "Voting",
        items: ["tutorials/voting-uma", "tutorials/voting-2key", "tutorials/voter-dApp"],
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
    "UMA Tokenholders": [
      "uma-tokenholders/uma-holders",
      "uma-tokenholders/umips",
      "uma-tokenholders/adding-price-id",
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
      {
        type: "link",
        label: "Contract Documentation",
        href:
          "https://docs-dot-uma-protocol.appspot.com/uma/index.html",
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
