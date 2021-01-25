module.exports = {
    
    "Understanding UMA": [
      "getting-started/welcome_mhairi",
      {
        type: "category",
        label: "Overview",
        items: ["getting-started/priceless_contracts_mhairi", "getting-started/governance_mhairi", "getting-started/oracle_mhairi"],
      },
      {
        type: "category",

        label: "More on Priceless Contracts",

        items: ["synthetic-tokens/synthetic_tokens_mhairi" , "synthetic-tokens/expiring_multiparty_contracts_mhairi",  "perpetuals_mhairi"],
      },

      {
        type: "category",

        label: "More on Governance",

        items: ["governance/umips_mhairi" , "governance/liquidation_disputes_mhairi",  "governance/voting_mhairi"],
      },
      {
        type: "category",
        label: "More on the Optimistic Oracle",
        items: ["oracle/solving_the_oracle_problem_mhairi", "oracle/liquidations_and_disputes_mhairi", "oracle/the_DVM_mhairi",],
      },
      "synthetic-tokens/glossary"
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
      // {
      //   type: "category",
      //   label: "Minting Tokens",
      //   items: ["developers/mint-locally", "developers/mint-etherscan"],
      // },
      {
        type: "category",
        label: "Bots",
        items: ["developers/bots", "developers/bot-param", "developers/liquidation-opportunity-program"],
      },
      {
        type: "category",
        label: "Developer Mining",
        items: ["developers/developer-mining", "developers/devmining-reqs", "developers/designing-incentives", "developers/whitelist-contracts"],
      },
      {
        type: "category",
        label: "Advanced Tutorials",
        items: ["developers/dvm-integration"],
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
          items: ["uma-tokenholders/adding-price-id", "uma-tokenholders/approved-price-identifiers", "uma-tokenholders/approved-collateral-currencies",],
        },
        "uma-tokenholders/umips",
        {
          type: "category",
          label: "Voting Tutorials",
          items: ["uma-tokenholders/voter-dApp", "uma-tokenholders/voting-2key"],
        },
      ],
    "Events & Press": [
      "community/community-overview",
      {
        type: "category",
        label: "Events & Press",
        items: [ "community/press", "community/blog-posts", "community/events"],
      },
      {
        type: "category",
        label: "Farming Tutorials",
        items: ["users/mint-farm-yusd", "users/mint-farm-yusdbtc", "users/redeem-tokens"],
      },
    ],
};
