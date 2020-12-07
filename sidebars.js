module.exports = {
  understandingUma: {
    "Understanding UMA": [
      "understanding-uma/welcome",
      "understanding-uma/overview",
      "understanding-uma/synthetic-tokens",
      "understanding-uma/oracle",
      "understanding-uma/developer-mining"
    ],
    "Synthetic Tokens": [
      "understanding-uma/explainer",
      "understanding-uma/glossary",
      "understanding-uma/known-issues",
    ],
    "Oracle (DVM)": [
      "oracle/tech-architecture",
      "oracle/econ-architecture",
      "oracle/dvm-interface",
      "oracle/known-issues",
    ]
  },
  umaTokenholders: {
    "UMA Tokenholders": [
      "uma-tokenholders/uma-holders",
      "uma-tokenholders/adding-price-id",
      "uma-tokenholders/umips",
      "uma-tokenholders/voter-dApp",
      "uma-tokenholders/voting-2key", 
    ],
  },
  developers: {
    "Developers": [
      "developers/setup",
      {
        type: "category",
        label: "Using Existing Contracts",
        items: ["developers/mint-farm-yusd", "developers/mint-farm-yusdbtc", "developers/redeem-tokens", "developers/cli-tool"],
      },
      {
        type: "category",
        label: "Deploying Contracts",
        items: ["developers/contract-deployment", "developers/dvm-integration",],
      },
      {
        type: "category",
        label: "Minting Tokens",
        items: ["developers/mint-locally", "developers/mint-etherscan"],
      },
      {
        type: "category",
        label: "Bots",
        items: ["developers/bots", "developers/bot-param"],
      },
    ],
    "Developer Reference": [
      "developers/subgraphs",
      "developers/bug-bounty",
      "developers/addresses",
      "developers/mainnet-info",
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
  // devRef: {
  //   "Developer Reference": [
  //     "dev-ref/bug-bounty",
  //     "dev-ref/addresses",
  //     {
  //       type: "link",
  //       label: "Contracts (Github)",
  //       href:
  //         "https://github.com/UMAprotocol/protocol/tree/master/packages/core/contracts",
  //     },
  //     {
  //       type: "link",
  //       label: "Contract Documentation",
  //       href:
  //         "https://docs-dot-uma-protocol.appspot.com/uma/index.html",
  //     },
  //   ],
  // },
  community: {
    Community: [
      "community/press",
      "community/blog-posts",
      "community/events",
      "community/liquidation-opportunity-program",
    ],
  },
};
