module.exports = [
  {
    to: "/",
    from: ["/uma/index.html", "/uma/community/connecting_with_UMA.html"],
  },
  // getting started
  {
    to: "/getting-started/overview",
    from: ["/uma/getting_started/architecture_overview.html"],
  },
  {
    to: "/getting-started/synthetic-tokens",
    from: ["/uma/getting_started/priceless_defi_contracts.html"],
  },
  {
    to: "/getting-started/oracle",
    from: ["/uma/getting_started/uma_oracle_design.html"],
  },
  // synthetic tokens

  {
    to: "/synthetic-tokens/explainer",
    from: ["/uma/synthetic_tokens/explainer.html"],
  },
  {
    to: "/synthetic-tokens/glossary",
    from: ["/uma/synthetic_tokens/glossary.html"],
  },
  {
    to: "/synthetic-tokens/known-issues",
    from: ["/uma/synthetic_tokens/known_issues.html"],
  },
  // developers (synthetic tokens)
  {
    to: "/developers/setup",
    from: ["/uma/synthetic_tokens/prerequisites.html"],
  },
  {
    to: "/build-walkthrough/mint-locally",
    from: ["/uma/synthetic_tokens/creating_from_truffle.html"],
  },
  {
    to: "/developers/bots",
    from: ["/uma/synthetic_tokens/liquidation.html"],
  },
  {
    to: "/developers/bot-param",
    from: ["/uma/synthetic_tokens/bot_parameterization.html"],
  },
  {
    to: "/build-walkthrough/minting-etherscan",
    from: ["/uma/synthetic_tokens/mint_tokens_via_etherscan.html"],
  },
  // oracle
  {
    to: "/oracle/tech-architecture",
    from: ["/uma/oracle/technical_architecture.html"],
  },
  {
    to: "/oracle/econ-architecture",
    from: ["/uma/oracle/economic_architecture.html"],
  },
  {
    to: "/oracle/dvm-interface",
    from: ["/uma/oracle/dvm_interfaces.html"],
  },
  {
    to: "/oracle/known-issues",
    from: ["/uma/oracle/known_issues.html"],
  },
  // developers (oracle)  
  {
    to: "/developers/dvm-integration",
    from: ["/uma/oracle/integrating_the_dvm.html"],
  },
  // UMA Tokenholders
  {
    to: "/uma-tokenholders/uma-holders",
    from: ["/uma/oracle/UMA_token_holder_responsibilities.html"],
  },
  {
    to: "/uma-tokenholders/umips",
    from: ["/uma/oracle/UMIPs.html"],
  },
  {
    to: "/uma-tokenholders/adding-price-id",
    from: ["/uma/oracle/adding_a_price_identifier.html"],
    
  },

  {
    to: "/uma-tokenholders/voting-2key",
    from: ["/uma/oracle/voting_with_UMA_2-key_contract.html"],
  },
  // developer reference
  {
    to: "/dev-ref/addresses",
    from: ["/uma/developer_reference/contract_addresses.html"],
  },
  {
    to: "/dev-ref/bug-bounty",
    from: ["/uma/developer_reference/bug_bounty.html"],
  },
  {
    to: "/dev-ref/subgraphs",
    from: ["/uma/developer_reference/subgraphs.html"],
  },
  {
    to: "/dev-ref/mainnet-info",
    from: ["/uma/developer_reference/mainnet_deployment_info.html"],
  },
  // community
  {
    to: "/community/events",
    from: ["/uma/community/previous_and_upcoming_events.html"],
  },
  {
    to: "/community/press",
    from: ["/uma/community/interviews_and_press.html"],
  },
  {
    to: "/community/blog-posts",
    from: ["/uma/community/blog_posts.html"],
  },
];
