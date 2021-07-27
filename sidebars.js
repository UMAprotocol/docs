module.exports = {

    "Understanding UMA": [
      "getting-started/welcome",
      {
        type: "category",
        label: "Overview",
        items: ["getting-started/overview", "getting-started/how-uma-works", "getting-started/synthetic-tokens", "getting-started/oracle"],
      },
      {
        type: "category",
        label: "Synthetic Tokens",
        items: ["synthetic-tokens/what-are-synthetic-assets" , "synthetic-tokens/expiring-synthetic-tokens", "synthetic-tokens/long-short-pair",  "synthetic-tokens/known-issues"],
      },
      {
        type: "category",
        label: "Oracle Service",
        items: ["oracle/econ-architecture", "oracle/tech-architecture", "oracle/dvm-interface", "oracle/optimistic-oracle-interface", "oracle/known-issues"],
      },
      {
        type: "category",
        label: "Featured Products",
        items: ["products/KPI-options", "products/range-tokens", "products/calloption"],
      },
      "getting-started/scalingsolutions", "synthetic-tokens/glossary"
    ],
    Developers: [
      "build-walkthrough/build-process",
      {
        type: "category",
        label: "Quick Start",
        items: ["developers/setup", "build-walkthrough/mint-locally"],
      },
      {
        type: "category",
        label: "ExpiringMultiParty (EMP)",
        items: ["developers/emp-deployment", "build-walkthrough/emp-parameters", "build-walkthrough/minting-etherscan",],
      },
      {
        type: "category",
        label: "LongShortPair (LSP)",
        items: ["developers/deploy-on-polygon"],
      },
      // {
      //   type: "category",
      //   label: "Minting Tokens",
      //   items: ["developers/mint-locally", "developers/mint-etherscan"],
      // },
      {
        type: "category",
        label: "Bots",
        items: ["developers/bots", "developers/bot-param"],
      },
      {
        type: "category",
        label: "Developer Mining",
        items: ["developers/developer-mining", "developers/devmining-reqs", "developers/designing-incentives", "developers/whitelist-contracts"],
      },
      {
        type: "category",
        label: "Advanced Tutorials",
        items: ["developers/optimistic-oracle-integration", "developers/dvm-integration"],
      },
      {
        type: "category",
        label: "Developer Reference",
        items: ["dev-ref/mainnet-info", "dev-ref/addresses", "dev-ref/bug-bounty", "dev-ref/subgraphs",
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
        },],
      },

    ],
      "UMA Tokenholders": [
        "uma-tokenholders/uma-holders",
        {
          type: "category",
          label: "Price IDs and Collateral Currencies",
          items: ["uma-tokenholders/adding-price-id", "uma-tokenholders/approved-price-identifiers", "uma-tokenholders/approved-collateral-currencies","uma-tokenholders/guidance-on-adding-price-identifiers","uma-tokenholders/guidence-on-collateral-currency-addition",],
        },
        "uma-tokenholders/umips",
        {
          type: "category",
          label: "Creating an UMIP PR",
          items: ["uma-tokenholders/gitHub-walkthrough"],
        },
        {
          type: "category",
          label: "Voting Tutorials",
          items: ["uma-tokenholders/voter-dApp"],
        },
      ],
    "Events & Press": [
      "community/community-overview", "community/superUMAns", "community/usingtokens", "community/communityguide", "community/product",
      {
        type: "category",
        label: "Events & Press",
        items: ["community/press", "community/blog-posts", "community/events"],
      },
      {
        type: "category",
        label: "Farming Tutorials",
        items: ["users/mint-farm-yusd", "users/mint-farm-yusdbtc", "users/redeem-tokens"],
      },
      {
        type: "category",
        label: "FAQ",
        items: ["community/uTVLFAQ"],
      },
    ],
};
