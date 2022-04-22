module.exports = {
  title: "Docs",
  logo: {
    alt: "UMA Logo",
    src: "img/UMA_square_red_logo.png",
  },
  items: [
    {
      to: "/",
      label: "Oracle",
      position: "left",
      activeBaseRegex: "(/$|econ-architecture|dev-quickstart|bug-bounty|oracle/tech-architecture|oracle/known-issues|getting-started/oracle|getting-started/oracle|synthetic-tokens/glossary)",
    },
    {
      to: "products/dao-products",
      label: "DAO Products",
      position: "left",
      activeBaseRegex: "(products|range-tokens|success-tokens|kpi-options|synthetic-tokens/what-are-synthetic-assets|synthetic-tokens/expiring-synthetic-tokens|synthetic-tokens/known-issues)",
    },
    // {
    //   label: "Understanding UMA",
    //   to: "synthetic-tokens/explainer",
    //   position: "left",
    //   activeBaseRegex: "(synthetic-tokens|oracle)",
    //   // items: [
    //   //   {
    //   //     to: "synthetic-tokens/explainer",
    //   //     label: "Synthetic Tokens",
    //   //     activeBasePath: "synthetic-tokens",
    //   //   },
    //   //   {
    //   //     to: "oracle/tech-architecture",
    //   //     label: "Oracle (DVM)",
    //   //     activeBasePath: "oracle",
    //   //   },
    //   // ],
    // },
    {
      to: "build-walkthrough/build-process",
      label: "Developers",
      position: "left",
      activeBaseRegex: "(developers|build-walkthrough|getting-started/scalingsolutions|oracle/dvm-interface|oracle/optimistic-oracle-interface|synthetic-tokens/long-short-pair|dev-ref/mainnet-info|dev-ref/addresses|dev-ref/subgraphs)",
    },
    {
      to: "uma-tokenholders/uma-holders",
      label: "Tokenholders",
      position: "left",
      activeBasePath: "uma-tokenholders",
    },
    // {
    //   to: "dev-ref/addresses",
    //   label: "Developer Reference",
    //   position: "left",
    //   activeBasePath: "dev-ref",
    // },
    { to: "community/community-overview",
      label: "Community",
      position: "left",
      activeBaseRegex: "(users|community)" },
    { to: "contracts/Contracts",
      label: "Contracts",
      position: "left",
      activeBaseRegex: "(Contracts)" },
    {
        href: "https://umaproject.org",
        className: "header-web-link",
        position: "right",
    },
    {
      href: "https://github.com/UMAprotocol/protocol",
      className: "header-github-link",
      position: "right",
    },
    {
      href: "https://twitter.com/UMAprotocol",
      className: "header-twitter-link",
      position: "right",
    },
    {
      href: "https://discord.umaproject.org/",
      className: "header-discord-link",
      position: "right",
    },
    {
      href: "https://discourse.umaproject.org/",
      className: "header-discourse-link",
      position: "right",
    },
  ],
};
