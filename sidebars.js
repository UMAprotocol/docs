module.exports = {

    "Oracle": [
      "getting-started/welcome",
      {
        type: "category",
        label: "Developer Quickstart",
        items: ["dev-quickstart/deploy-lsp", "dev-quickstart/mint-tokens", "dev-quickstart/price-request", "dev-quickstart/propose-price", "dev-quickstart/settle"],
      },
      {
        type: "category",
        label: "Oracle Service",
        items: ["getting-started/oracle", "oracle/econ-architecture", "oracle/tech-architecture", "oracle/known-issues"],
      },
      "dev-ref/bug-bounty",
      "synthetic-tokens/glossary"
    ],
    "DAO Products": [
      "products/dao-products",
      {
        type: "category",
        label: "KPI Options",
        items: ["kpi-options/summary", "kpi-options/deployment-tutorial","kpi-options/kpi-price-identifier", "kpi-options/usage-tutorial","kpi-options/references"],
      },
      {
        type: "category",
        label: "Success Tokens",
        items: ["success-tokens/summary", "success-tokens/deployment-tutorial", "success-tokens/usage-tutorial",  "success-tokens/references"],
      },
      {
        type: "category",
        label: "Range Tokens",
        items: ["range-tokens/summary", "range-tokens/deployment-tutorial", "range-tokens/usage-tutorial",  "range-tokens/references"],
      },
      {
        type: "category",
        label: "Other Products",
        items: ["products/calloption", "products/protected-tokens"],
      },
    ],
    Developers: [
      "build-walkthrough/build-process",
      {
        type: "category",
        label: "LongShortPair (LSP)",
        items: ["synthetic-tokens/long-short-pair", "developers/lsp-prereqs", "developers/deploy-an-lsp"],
      },
      {
        type: "category",
        label: "Bots",
        items: ["developers/setup","developers/bots", "developers/bot-param", "developers/pf-configuration"],
      },
      {
        type: "category",
        label: "Advanced Tutorials",
        items: ["developers/optimistic-oracle-integration", "developers/dvm-integration"],
      },
      {
        type: "category",
        label: "Developer Reference",
        items: ["dev-ref/mainnet-info", "dev-ref/addresses", "dev-ref/subgraphs", "getting-started/scalingsolutions", "oracle/dvm-interface", "oracle/optimistic-oracle-interface",
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
            "https://docs-git-doc-updates-uma.vercel.app/contracts/Contracts",
        },],
      },

    ],
      "UMA Tokenholders": [
        "uma-tokenholders/uma-holders",
        "uma-tokenholders/uma-tokenomics",
        {
          type: "category",
          label: "Price IDs and Collateral Currencies",
          items: ["uma-tokenholders/adding-price-id", "uma-tokenholders/approved-price-identifiers", "uma-tokenholders/approved-collateral-currencies","uma-tokenholders/guidance-on-adding-price-identifiers","uma-tokenholders/guidence-on-collateral-currency-addition",],
        },
        "uma-tokenholders/umips",
        "uma-tokenholders/voter-dApp",
      ],
    "Community": [
      "community/community-overview", "community/superUMAns",
      {
        type: "category",
        label: "Events & Press",
        items: ["community/press", "community/blog-posts", "community/events"],
      },
    ],
    "Contracts": [
      {
        type: "autogenerated",
        dirName: "contracts",
      },
    ],
};
