module.exports = {
  title: "Docs",
  logo: {
    alt: "UMA Logo",
    src: "img/UMA_square_red_logo.png",
  },
  items: [
    {
      to: "/",
      label: "Understanding UMA",
      position: "left",
      activeBaseRegex: "(getting-started/|/$|synthetic-tokens|oracle|products)",
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
      activeBaseRegex: "(developers|build-walkthrough|dev-ref)",
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
